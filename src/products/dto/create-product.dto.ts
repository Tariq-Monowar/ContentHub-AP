import { IsNotEmpty, IsNumber, IsString, IsEnum, Min } from 'class-validator';
import { Availability } from '../enums/availability.enum';

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price: number;

    @IsNotEmpty()
    @IsEnum(Availability)
    availability: Availability;
}