import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsPositive } from 'class-validator';

export class AddCartDto {
  @IsPositive()
  @IsNumber()
  readonly bookId: number;

  @IsPositive()
  @IsNumber()
  readonly quantity: number;
}

export class UpdateCartDto extends PartialType(AddCartDto) {}
