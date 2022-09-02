import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { Order } from './order.entity';
import { differenceInDays } from 'date-fns'

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>
    ) { }

    async list() {
        const orders = await this.ordersRepository.find()

        const sorted = orders.sort((first, second) => {
            const [firstDiff, secondDiff] = [
                differenceInDays(new Date(first.due_date), new Date(first.entry_date)),
                differenceInDays(new Date(second.due_date), new Date(second.entry_date))
            ]
            return secondDiff - firstDiff
        })

        return sorted
    }

    async create(payload: CreateOrderDto) {
        return this.ordersRepository.save(payload)
    }

    async update(id: number, payload: UpdateOrderDto) {
        return this.ordersRepository.update({ id }, payload)
    }

    async findById(id: number) {
        const [order] = await this.ordersRepository.findBy({ id })
        return order
    }
}