import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AttendeesService } from './attendees.service';
import { AttendeesController } from './attendees.controller';
import { Attendee, AttendeeSchema } from './schemas/attendee.schema';
import { WebinarsModule } from '../webinars/webinars.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Attendee.name, schema: AttendeeSchema },
    ]),
    WebinarsModule,
  ],
  controllers: [AttendeesController],
  providers: [AttendeesService],
})
export class AttendeesModule {}
