import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    content: string;

    @IsBoolean()
    @IsOptional()
    published?: boolean;
}