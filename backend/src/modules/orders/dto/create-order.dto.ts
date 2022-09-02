import { IsDateString, IsNotEmpty, IsString } from 'class-validator'

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    protocol: string

    @IsString()
    @IsNotEmpty()
    presentant: string

    @IsString()
    @IsNotEmpty()
    type: string

    @IsString()
    @IsNotEmpty()
    avatar: string

    @IsDateString()
    entry_date: Date

    @IsDateString()
    due_date: Date
}