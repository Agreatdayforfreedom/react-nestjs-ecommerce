import { InjectRepository } from '@nestjs/typeorm';
import { parse } from 'csv-parse';
import { createReadStream } from 'fs';
import { Book } from './book/entities/book.entity';
import { Repository } from 'typeorm';
import { Transform, pipeline } from 'stream';
import { DataSource } from 'typeorm';
import * as readline from 'node:readline';
import { Category } from './book/entities/categories.entity';
const cvsParse = parse({ columns: true });
const csv = './main_dataset.csv';

export class Populate {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {
    this.exec();
  }

  populate(dataSource: DataSource) {
    const categories: Array<string> = [];
    const books: Array<any> = [];
    let totalBooks: number = 0;

    return new Transform({
      defaultEncoding: 'utf-8',
      objectMode: true,
      async transform(chunk, enc, cb) {
        //adding stock and totalSold fields
        if (!categories.includes(chunk.category)) {
          categories.push(chunk.category);
        }
        //save categories;
        const stock = Math.floor(Math.random() * 100);
        const totalSold = Math.floor(Math.random() * 100);

        if (!parseInt(chunk['book_depository_stars'], 10)) {
          chunk['book_depository_stars'] = parseInt(
            (Math.random() * 4 + 1).toFixed(1),
            10,
          );
        }

        if (!parseInt(chunk['price'], 10)) {
          chunk['price'] = parseInt((Math.random() * 4 + 1).toFixed(1), 10);
        }

        chunk['stock'] = stock;
        chunk['price'] = parseInt(chunk['price'], 10);
        chunk['totalSold'] = totalSold;
        chunk['stars'] = parseInt(chunk['book_depository_stars'], 10); //renaming book_depository_stars -> stars
        chunk['categories'] = [chunk['category']];
        delete chunk['old_price'];
        delete chunk['category'];
        delete chunk['book_depository_stars'];
        delete chunk['img_paths'];

        totalBooks += 1;
        books.push(chunk);

        cb();
      },
      async flush(cb) {
        console.log(`${totalBooks} books read`);
        const toObject = categories.map((x) => ({ name: x }));
        const catSaved = await dataSource
          .createQueryBuilder()
          .insert()
          .into(Category)
          .values(toObject)
          .execute();

        console.log(`${catSaved.identifiers.length} categories saved`);
        let i: number = 1;
        for (const chunk of books) {
          try {
            let calc = (i++ * 100) / totalBooks;
            process.stdout.write(
              'Insterting...' + ' ' + calc.toFixed(1).toString() + '%\n',
            );

            readline.clearLine(process.stdout, 0);
            readline.clearLine(process.stdout, 0);
            readline.moveCursor(process.stdout, 0, -1);
            const data = await dataSource
              .createQueryBuilder()
              .insert()
              .into(Book)
              .values(chunk)
              .execute();
            const category = await dataSource
              .getRepository(Category)
              .createQueryBuilder()
              .where('name IN (:...names)', { names: chunk['categories'] })
              .getMany();
            await dataSource
              .createQueryBuilder()
              .relation(Book, 'categories')
              .of(data.raw[0].id)
              .add(category[0].id);
          } catch (error) {
            await dataSource.createQueryBuilder().delete().from(Book).execute();
            await dataSource
              .createQueryBuilder()
              .delete()
              .from(Category)
              .execute();
            console.log(chunk);
            break;
          }
        }
        readline.clearLine(process.stdout, 1);
        console.log(`\n${totalBooks} books saved.`);
        cb();
      },
    });
  }

  async exec() {
    const exists = await this.dataSource
      .getRepository(Category)
      .createQueryBuilder()
      .getMany();
    const exists2 = await this.dataSource
      .getRepository(Book)
      .createQueryBuilder()
      .getOne();
    if (!exists && !exists2) {
      console.log('Starting process...');
      pipeline(
        createReadStream(csv),
        cvsParse,
        this.populate(this.dataSource),
        (err) => {
          if (err) console.log(err);
        },
      );
    } else console.log('--------- Everything is ready --------');
  }
}
