import {
  IsString,
  IsUrl,
  IsOptional,
  IsNumber,
  IsDateString,
} from 'class-validator';

export class CreateEvidenceDto {
  @IsString()
  signalId: string;

  @IsString()
  source: string;

  @IsUrl()
  url: string;

  @IsOptional()
  @IsString()
  headline?: string;

  @IsOptional()
  @IsString()
  summary?: string;

  @IsOptional()
  @IsDateString()
  publishedAt?: string;

  @IsOptional()
  @IsNumber()
  credibility?: number;
}