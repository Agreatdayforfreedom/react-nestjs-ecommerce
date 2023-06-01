import { PartialType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  isNumber,
  isString,
} from 'class-validator';
import { format } from 'path';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly review?: string;

  @IsString()
  readonly author: string;

  @IsString()
  readonly format: string;

  @IsString()
  readonly isbn: string;

  @IsNumber()
  readonly stars: number;

  @IsNumber()
  @IsPositive()
  readonly price: number;

  @IsNumber()
  @IsPositive()
  readonly stock: number;

  @IsBoolean()
  readonly isNew: boolean;

  @IsNumber()
  @IsPositive()
  readonly totalSold: number;

  @IsArray()
  @IsNotEmpty()
  readonly categories: any[];

  @IsNumber()
  @IsNotEmpty()
  readonly user: any;
}

export class UpdateBookDto extends PartialType(CreateBookDto) {}
