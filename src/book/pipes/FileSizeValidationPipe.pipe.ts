import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const onBytes = 1000000;
    if (value.size > onBytes) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}
