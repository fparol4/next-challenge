import { unix2Date } from '@/modules/core/helpers/unix-2-date'
import { Transform, Type } from 'class-transformer'
import { IsDateString, IsNumber, IsString } from 'class-validator'

export class UpdateOrderDto {
    @IsString()
    protocol: string

    @IsString()
    presentant: string

    @IsString()
    type: string

    @IsString()
    avatar: string

    @IsDateString()
    entry_date: Date

    @IsDateString()
    due_date: Date
}
