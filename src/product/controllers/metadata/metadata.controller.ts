import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Role } from '../../../auth/models/role.model';
import {
  CreateMetadataDto,
  UpdateMetadataDto,
} from '../../../product/dtos/metadata.dto';
import { MetadataService } from '../../services/metadata/metadata.service';

@UseGuards(RolesGuard)
@Controller('metadata')
export class MetadataController {
  constructor(private metadataService: MetadataService) {}

  @Roles(Role.SELLER)
  @Post()
  create(@Body() payload: CreateMetadataDto) {
    return this.metadataService.create(payload);
  }

  @Roles(Role.SELLER)
  @Put(':id')
  update(
    @Body() payload: UpdateMetadataDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.metadataService.update(id, payload);
  }

  @Roles(Role.SELLER)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.metadataService.delete(id);
  }
}
