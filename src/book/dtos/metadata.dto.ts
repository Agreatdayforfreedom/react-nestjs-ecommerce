import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateMetadataDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  pages: number;

  @IsString()
  @IsNotEmpty()
  publisher: string;

  @IsString()
  @IsNotEmpty()
  language: string;

  book: any;
}

export class UpdateMetadataDto extends PartialType(CreateMetadataDto) {}
