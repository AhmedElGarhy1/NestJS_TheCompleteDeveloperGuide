import {
  IsNumber,
  IsString,
  Min,
  Max,
  IsLongitude,
  IsLatitude,
  IsOptional,
} from 'class-validator';

export class UpdateReportDto {
  @IsNumber()
  @Min(0)
  @Max(1000_000)
  @IsOptional()
  price: number;

  @IsOptional()
  @IsString()
  make: string;

  @IsOptional()
  @IsString()
  model: string;

  @IsOptional()
  @IsNumber()
  @Min(1930)
  @Max(2025)
  year: number;

  @IsOptional()
  @IsLongitude()
  lng: number;

  @IsOptional()
  @IsLatitude()
  lat: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1000_000)
  mileage: number;
}
