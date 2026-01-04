import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { WebinarsService } from './webinars.service';
import { CreateWebinarDto } from './dto/create-webinar.dto';

@Controller('webinars')
export class WebinarsController {
  constructor(private readonly webinarsService: WebinarsService) {}

  @Post()
  create(@Body() createWebinarDto: CreateWebinarDto) {
    return this.webinarsService.create(createWebinarDto);
  }

  @Get()
  findAll() {
    return this.webinarsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.webinarsService.findOne(id);
  }
}
