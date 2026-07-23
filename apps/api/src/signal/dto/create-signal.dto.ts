import { IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';

export class CreateSignalDto {
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  source?: string;

  @IsOptional()
  @IsUrl()
  url?: string;
}