import { MainLayout } from "../../../components/layouts/main-layout.component"
import orders, { Title } from '../index'
import { useRouter } from 'next/router'
import { TextField, } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import styled from 'styled-components'
import { yupResolver } from '@hookform/resolvers/yup';

import { SubmitHandler, useForm } from "react-hook-form";
import { theme } from "../../../styles/theme.style";

import * as yup from "yup";
import { useEffect, useState } from "react";
import { Order, ordersClient } from "../../../client/orders.api";

const Form = styled.form`
    width: 50%; 
    margin: auto; 

    .input {
        background: white; 
        width: 100%; 
        label {
            color: black;
        }
    }

    .line {
        width: 100%; 
        margin: 2rem 0;
    }

    .line + .dates {
        display: flex; 

        .input {
            background: white; 
        }

        .input + .right {
            margin-left: 10px; 
        }

        label {
            color: white; 
            margin: -8px; 
            font-weight: bold; 
        }
    }
`

const Footer = styled.div`
    display: flex; 
    justify-content: end; 
    font-size: 1.2rem; 
    font-weight: bold; 

    button {
        width: 8rem; 
        height: 3rem; 
        color: white; 
        border-radius: 4px; 
    }

    .btn-cancel {
        border: 1px solid ${theme.colors.green}; 
        background: none; 
    }

    .btn-save {
        background: ${theme.colors.green}; 
        margin-left: 1rem; 
        border: none;
    }
`

interface Form {
    protocol: string
    presentant: string
    type: string
    entry_date: string
    due_date: string
}

const schema = yup.object({
    protocol: yup.string().required(),
    presentant: yup.string().required(),
    type: yup.string().required(),
    entry_date: yup.date().required(),
    due_date: yup.date().required()
})

const formResolver = yupResolver(schema)

interface OrderFormProps {
    order_id?: string
}

const OrderForm = (props: OrderFormProps) => {
    const { order_id } = props
    const [order, setOrder] = useState<Partial<Order>>({})

    useEffect(() => {
        if (order_id) {
            ordersClient.getOrderById(order_id)
                .then(order => setOrder(order))
        }
    }, [order_id])

    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm<Form>({ resolver: formResolver })

    const onSubmit: SubmitHandler<Form> = async data => {
        const payload = {
            ...data,
            avatar: ''
        }

        const order = await ordersClient.createOrder(payload)
        setOrder(order)
    }

    const today = new Date()

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="line">
                <TextField
                    {...register("protocol")}
                    label="Protocolo"
                    className="input"
                    variant="filled"
                    value={order.protocol || ''}
                    onChange={e => setOrder({ protocol: e.target.value })}
                    error={!!errors.protocol}
                />
            </div>
            <div className="line dates">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                        {...register("entry_date")}
                        inputFormat="DD/MM/YYYY"
                        label='Data vencimento'
                        className="input"
                        value={order.entry_date ? new Date(order.entry_date) : today}
                        onChange={date => setOrder({ entry_date: date?.toString() })}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <DesktopDatePicker
                        {...register("due_date")}
                        label="Data entrada"
                        inputFormat="MM/DD/YYYY"
                        className="input right"
                        value={order.due_date ? new Date(order.due_date) : today}
                        onChange={date => setOrder({ entry_date: date?.toString() })}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>
            <div className="line">
                <TextField
                    {...register("presentant")}
                    value={order.presentant || ''}
                    onChange={e => setOrder({ presentant: e.target.value })}
                    error={!!errors.presentant}
                    label="Apresentante"
                    className="input"
                    variant="filled"
                />
            </div>
            <div className="line">
                <TextField
                    {...register("type")}
                    value={order.type || ''}
                    onChange={e => setOrder({ type: e.target.value })}
                    error={!!errors.type}
                    label="Tipo"
                    className="input"
                    variant="filled"
                />
            </div>
            <Footer>
                <button className="btn-cancel">Cancelar</button>
                <button className="btn-save">Salvar</button>
            </Footer>
        </Form>
    )
}

export default () => {
    const router = useRouter()
    const { order_id } = router.query

    return (
        <MainLayout>
            <Title.TitleContainer>
                <Title.TitlePageName>Pedidos</Title.TitlePageName>
                <Title.TitleContainer>| últimos pedidos</Title.TitleContainer>
            </Title.TitleContainer>
            <OrderForm></OrderForm>
        </MainLayout >
    )
}