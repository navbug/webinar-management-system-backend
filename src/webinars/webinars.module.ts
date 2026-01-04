import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebinarsService } from './webinars.service';
import { WebinarsController } from './webinars.controller';
import { Webinar, WebinarSchema } from './schemas/webinar.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Webinar.name, schema: WebinarSchema }]),
  ],
  controllers: [WebinarsController],
  providers: [WebinarsService],
  exports: [WebinarsService],
})
export class WebinarsModule {}
