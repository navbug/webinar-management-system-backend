import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AttendeeDocument = Attendee & Document;

@Schema({ timestamps: true })
export class Attendee {
  @Prop({ type: Types.ObjectId, ref: 'Webinar', required: true })
  webinarId: Types.ObjectId;

  @Prop({ required: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true, trim: true })
  fullName: string;

  @Prop({ default: Date.now })
  joinedAt: Date;
}

export const AttendeeSchema = SchemaFactory.createForClass(Attendee);

// Compound unique index to prevent duplicate registrations using same email more than once for a webinar
AttendeeSchema.index({ webinarId: 1, email: 1 }, { unique: true });