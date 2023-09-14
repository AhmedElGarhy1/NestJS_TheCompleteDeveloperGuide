import {
  IsNumber,
  IsString,
  Min,
  Max,
  IsLatLong,
  IsLatitude,
} from 'class-validator';

export class CreateReportDto {
  @IsNumber()
  @Min(0)
  @Max(1000_000)
  price: number;

  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsNumber()
  @Min(1930)
  @Max(2025)
  year: number;

  @IsLatLong()
  lng: number;

  @IsLatitude()
  lat: number;

  @IsNumber()
  @Min(0)
  @Max(1000_000)
  mileage: number;
}
