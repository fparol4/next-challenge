import axios from 'axios'
import { settings } from '../settings/api.settings'

export interface Order {
    protocol: string,
    presentant: string,
    type: string,
    avatar: string,
    entry_date: string,
    due_date: string
}

interface UpdateOrderDto extends Partial<Order> { }

export const OrdersClient = () => {
    const base = `${settings.API_HOST}/orders`
    const client = axios.create({ baseURL: base })

    const getOrders = async () => {
        const { data: orders } = await client.get('')
        return orders
    }

    const createOrder = async (payload: Order) => {
        const { data: order } = await client.post('', payload)
        return order
    }

    const updateOrder = async (payload: UpdateOrderDto) => {
        const { data: order } = await client.post('', payload)
        return order
    }

    return {
        getOrders,
        createOrder,
        updateOrder
    }
}

export const ordersClient = OrdersClient()