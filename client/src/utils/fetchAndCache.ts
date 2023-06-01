const cacheSupport = 'caches' in self;
const validInstance = self.caches instanceof CacheStorage;

//todo:

export async function fetchAndCache<T = any>(
  cacheName: string,
  url: string,
  options?: RequestInit
): Promise<T> {
  let data: T;
  console.log({ options });

  if (!cacheSupport && !validInstance) {
    const res = await fetch(url, options);
    data = await res.json();
    return data;
  } // normal fetch;

  const open = await caches.open(cacheName);
  const cacheData = await open.match(url, { ignoreMethod: true });

  if (cacheData) {
    const cc = cacheData.headers.get('Cache-Control');
    const lm = cacheData.headers.get('Last-Modified');
    // if now is greater than cache set + max-age

    if (
      lm &&
      cc &&
      Date.now() >
        Number(cc.split(',')[1].split('=')[1]) + new Date(lm).getTime()
    ) {
      //refetch cache;
      open.delete(url);
      const res = await fetch(url, options);
      open.put(url, res.clone());
      console.log('REFETCH');
      return (data = await res.json());
    }

    data = await cacheData.json();
    console.log('FROM CACHE');
    return data;
  } else {
    const res = await fetch(url, options);
    open.put(url, res.clone());
    console.log('FROM FETCH');

    data = await res.json();
  }

  return data;
}
