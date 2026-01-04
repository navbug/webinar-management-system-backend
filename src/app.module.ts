import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { WebinarsModule } from './webinars/webinars.module';
import { AttendeesModule } from './attendees/attendees.module';

const uri = process.env.MONGODB_URI;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(uri!),
    WebinarsModule,
    AttendeesModule,
  ],
})
export class AppModule {}