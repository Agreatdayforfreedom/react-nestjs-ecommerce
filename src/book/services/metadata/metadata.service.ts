import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMetadataDto, UpdateMetadataDto } from '../../dtos/metadata.dto';
import { Metadata } from '../../entities/metadata.entity';
import { Book } from '../../entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MetadataService {
  constructor(
    @InjectRepository(Metadata) private metadataRepo: Repository<Metadata>,
    @InjectRepository(Book) private bookRepo: Repository<Book>,
  ) {}

  async getMetadata(): Promise<Metadata> {
    return await this.metadataRepo.find()[0];
  }

  async create(payload: CreateMetadataDto): Promise<Metadata> {
    if (!payload.book) throw new HttpException('There was a error', 400);

    const metadata = this.metadataRepo.create(payload);
    const [book] = await this.bookRepo.find({
      where: { id: payload.book },
    });

    if (!book) throw new HttpException('Not found', 400);

    metadata.book = book;

    return await this.metadataRepo.save(metadata);
  }

  async update(id: number, payload: UpdateMetadataDto): Promise<Metadata> {
    const [metadata] = await this.metadataRepo.find({ where: { id: id } });
    if (!metadata) throw new HttpException('There was a error', 404);

    const metadataMerged = this.metadataRepo.merge(metadata, payload);
    return await this.metadataRepo.save(metadataMerged);
  }

  async delete(id: number): Promise<any> {
    return await this.metadataRepo.delete(id);
  }
}
