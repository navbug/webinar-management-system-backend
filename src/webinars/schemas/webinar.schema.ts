import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WebinarDocument = Webinar & Document;

@Schema({ timestamps: true })
export class Webinar {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ trim: true, default: '' })
  description: string;

  @Prop({ required: true })
  scheduledAt: Date;

  @Prop({ default: 0 })
  attendeeCount: number;
}

export const WebinarSchema = SchemaFactory.createForClass(Webinar);