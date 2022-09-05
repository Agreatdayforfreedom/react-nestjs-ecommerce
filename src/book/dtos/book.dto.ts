import { PartialType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  readonly review?: string;

  @IsString()
  readonly author: string;

  @IsNumber()
  @IsPositive()
  readonly price: number;

  @IsNumber()
  @IsPositive()
  readonly stock: number;

  @IsArray()
  @IsNotEmpty()
  readonly categories: any[];

  @IsNumber()
  @IsNotEmpty()
  readonly user: any;
}

export class UpdateBookDto extends PartialType(CreateBookDto) {}
