import { v2 as cloudinary } from 'cloudinary';
import { Book } from '../../entities/book.entity';

export const uploadFromBuffer = (buffer: Buffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: 'ecommerce' }, (err, result) => {
        if (err) {
          console.log('Error in cloudinary.uploader.upload_stream\n', err);
          reject(err);
        } else {
          resolve(result);
        }
      })
      .end(buffer);
  });
};

export const destroyUpload = async (book: Book): Promise<void> => {
  const splitUrl = book.image.split('/');
  const toDestroy = splitUrl
    .at(-2)
    .concat('/')
    .concat(splitUrl.at(-1).split('.').at(0));
  await cloudinary.uploader.destroy(toDestroy);
};
