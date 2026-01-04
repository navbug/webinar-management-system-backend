import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { WebinarsModule } from './webinars/webinars.module';
import { AttendeesModule } from './attendees/attendees.module';

const uri = process.env.MONGODB_URI || "mongodb+srv://naveen:naveen@cluster0.k7a72lu.mongodb.net/?appName=Cluster0";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(uri),
    WebinarsModule,
    AttendeesModule,
  ],
})
export class AppModule {}