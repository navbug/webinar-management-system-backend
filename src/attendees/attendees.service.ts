import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Attendee, AttendeeDocument } from './schemas/attendee.schema';
import { RegisterAttendeeDto } from './dto/register-attendee.dto';
import { WebinarsService } from '../webinars/webinars.service';

@Injectable()
export class AttendeesService {
  constructor(
    @InjectModel(Attendee.name) private attendeeModel: Model<AttendeeDocument>,
    private webinarsService: WebinarsService,
  ) {}

  async register(
    webinarId: string,
    registerAttendeeDto: RegisterAttendeeDto,
  ): Promise<Attendee> {
    if (!Types.ObjectId.isValid(webinarId)) {
      throw new NotFoundException('Invalid webinar ID');
    }

    // Verify webinar exists
    const webinar = await this.webinarsService.findOne(webinarId);
    if (!webinar) {
      throw new NotFoundException('Webinar not found');
    }

    const attendee = new this.attendeeModel({
      webinarId: new Types.ObjectId(webinarId),
      ...registerAttendeeDto,
    });

    const savedAttendee = await attendee.save();

    await this.webinarsService.incrementAttendeeCount(webinarId);

    return savedAttendee;
  }

  async findByWebinar(webinarId: string): Promise<Attendee[]> {
    if (!Types.ObjectId.isValid(webinarId)) {
      throw new NotFoundException('Invalid webinar ID');
    }

    return this.attendeeModel
      .find({ webinarId: new Types.ObjectId(webinarId) })
      .select('email fullName joinedAt')
      .sort({ joinedAt: -1 })
      .exec();
  }
}