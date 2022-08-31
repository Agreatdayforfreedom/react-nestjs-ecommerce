import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateMetadataDto,
  UpdateMetadataDto,
} from '../../../product/dtos/metadata.dto';
import { Metadata } from '../../../product/entities/metadata.entity';
import { Product } from '../../../product/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MetadataService {
  constructor(
    @InjectRepository(Metadata) private metadataRepo: Repository<Metadata>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async getMetadata(): Promise<Metadata> {
    return await this.metadataRepo.find()[0];
  }

  async create(payload: CreateMetadataDto): Promise<Metadata> {
    if (!payload.product) throw new HttpException('There was a error', 400);

    const metadata = this.metadataRepo.create(payload);
    const [product] = await this.productRepo.find({
      where: { id: payload.product },
    });

    if (!product) throw new HttpException('There was a error', 400);

    metadata.product = product;

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
