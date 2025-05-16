import { JwtAuthGuard } from '@/authentication/guards/jwt-auth.guard';
import { RolesGuard } from '@/authentication/guards/role-auth.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { Role } from '@/types';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { GetLocationsDto } from './dto/get-locations.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationService } from './location.service';

@Controller('/location')
export class LocationController {
  constructor(private readonly locationService: LocationService) { }

  @Get('/')
  @UseGuards(JwtAuthGuard)
  async findAll(@Query() query: GetLocationsDto) {
    return await this.locationService.findAll(query);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return await this.locationService.findOne(id);
  }

  @Post('/')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async create(@Body() body: CreateLocationDto) {
    return await this.locationService.create(body);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async update(@Param('id') id: string, @Body() body: UpdateLocationDto) {
    return await this.locationService.update(id, body);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async delete(@Param('id') id: string) {
    return await this.locationService.delete(id);
  }
}
