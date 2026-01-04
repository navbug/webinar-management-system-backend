import { IsString, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateWebinarDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  title: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  description?: string;

  @IsDateString()
  @IsNotEmpty()
  scheduledAt: string;
}