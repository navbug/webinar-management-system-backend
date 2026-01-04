import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Webinar, WebinarDocument } from './schemas/webinar.schema';
import { CreateWebinarDto } from './dto/create-webinar.dto';

@Injectable()
export class WebinarsService {
  constructor(
    @InjectModel(Webinar.name) private webinarModel: Model<WebinarDocument>,
  ) {}

  async create(createWebinarDto: CreateWebinarDto): Promise<Webinar> {
    const webinar = new this.webinarModel(createWebinarDto);
    return webinar.save();
  }

  async findAll(): Promise<Webinar[]> {
    return this.webinarModel
      .find()
      .select('title scheduledAt attendeeCount createdAt')
      .sort({ scheduledAt: -1 })
      .exec();
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid webinar ID');
    }

    // Using aggregation to fetch webinar details with attendee list
    const result = await this.webinarModel.aggregate([
      {
        $match: { _id: new Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: 'attendees',
          localField: '_id',
          foreignField: 'webinarId',
          as: 'attendees',
        },
      },
      {
        $project: {
          title: 1,
          description: 1,
          scheduledAt: 1,
          attendeeCount: 1,
          createdAt: 1,
          attendees: {
            _id: 1,
            email: 1,
            fullName: 1,
            joinedAt: 1,
          },
        },
      },
    ]);

    if (!result || result.length === 0) {
      throw new NotFoundException('Webinar not found');
    }

    return result[0];
  }

  async incrementAttendeeCount(id: string): Promise<void> {
    await this.webinarModel.findByIdAndUpdate(id, {
      $inc: { attendeeCount: 1 },
    });
  }
}