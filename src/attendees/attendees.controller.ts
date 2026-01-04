import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { AttendeesService } from './attendees.service';
import { RegisterAttendeeDto } from './dto/register-attendee.dto';

@Controller('webinars')
export class AttendeesController {
  constructor(private readonly attendeesService: AttendeesService) {}

  @Post(':id/register')
  register(
    @Param('id') id: string,
    @Body() registerAttendeeDto: RegisterAttendeeDto,
  ) {
    return this.attendeesService.register(id, registerAttendeeDto);
  }

  @Get(':id/attendees')
  findByWebinar(@Param('id') id: string) {
    return this.attendeesService.findByWebinar(id);
  }
}