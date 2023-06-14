
const cacheSupport = 'caches' in self;
const validInstance = self.caches instanceof CacheStorage;


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
    const cl = cacheData.headers.get('Content-Length');
    console.log({cl, cacheData})
    // if now is greater than cache set + max-age
    
    if (
      (lm &&
      cc &&
      Date.now() >
      Number(cc.split(',')[1].split('=')[1]) + new Date(lm).getTime())
      || cl === "0"
      ) {
      //refetch cache;
      open.delete(url);                                   //to avoid getting the response from local cache 
      const res = await fetch(url, {...options, headers: {'Cache-Control': 'no-cache' }});
      open.put(url, res.clone());
      console.log('REFETCH');
      return (data = await res.json());
    }

      console.log("FROM CACHE");
      data = await cacheData.json();
  } else {
    const res = await fetch(url, {...options});
    open.put(url, res.clone());
    console.log('FROM FETCH');

    data = await res.json();
  }

  console.log({data})
  return data;
}
