import { useEffect, useState } from 'react'
import { MainLayout } from '../../components/layouts/main-layout.component'
import { ordersClient, Order } from '../../client/orders.api'

import styled from 'styled-components'
import { theme } from '../../styles/theme.style'

import { AiFillEdit as EditIcon } from "react-icons/ai"

const TitleContainer = styled.div`
    height: 150px; 
    color: white; 
    display: flex; 
    justify-content: center; 
    align-items: center; 
     
`

const TitlePageName = styled.span`
    font-size: 2rem; 
`

const TitlePageDescription = styled.span`
    margin: 0 10px; 
    text-align: center; 
`

const TitleButton = styled.button`
    width: 180px; 
    height: 60px; 
    background: ${theme.colors.green}; 
    border: none; 
    color: white; 
    font-weight: bold; 
    cursor: pointer; 
`


const OrderAvatar = styled.div`
    width: 60px; 
    height: 60px; 
    display: flex; 
    justify-content: center; 
    align-items: center; 
    border-radius: 200px;
    overflow: hidden; 
    background: ${theme.colors.green};  
    border: 2px solid black;
    img {
        width: 60px; 
    }
`

const OrderData = styled.div` 
    display: flex; 
    flex-direction: column; 
    align-itens: center; 
    font-size: 1.3rem; 

    position: relative; 

    .order-protocol {
        font-weight: bold; 
    }

    .order-icon {
        width: 30px;
        height: 30px;
    }
`


const OrdersContainer = styled.div`
    background: white; 
    width: 55%; 
    height: 70%;
    border-radius: 4px; 
    margin: auto;
    margin-top: 0; 
    margin-bottom: 40px;  

    position: relative; 

    .orders-list {
        height: 100%; 
        overflow-y: auto; 
    }
`


const Tooltip = styled.div`
    position: absolute; 
    left: -40%; 
    background: white;
    width: 200px; 
    height: 80px; 
    visibility: hidden; 
    display: flex; 
    flex-direction: column; 
   

    .title {
        background: ${theme.colors.green};
        text-align: center; 
        font-weight: bold; 
    }

    .info {
        padding-left: 10px; 
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        flex-grow: 1; 
    }
`


const OrderItem = styled.div` 
    display: flex; 
    justify-content: space-around;
    align-items: center; 
    height: 15%; 
    border-bottom: 1px solid rgb(0 0 0 / 40%); 

    .tooltip {
        width: 100px; 
        height: 100px; 
        background: white; 
        position: absolute; 
    }

    &:hover {
        ${Tooltip} {
            visibility: initial;
        }
    }
`

const SUAMAE = styled.div` 
    width: 100%; 
    height: 100%; 
    display: flex; 
    flex-direction: column; 

    img {
        width: 50px; 
    }
`

export default () => {
    const [orders, setOrders] = useState<Order[]>([])

    useEffect(() => {
        ordersClient
            .getOrders()
            .then(({ content }) => setOrders(content))
    }, [])

    return <MainLayout>
        <SUAMAE>
            <TitleContainer>
                <TitlePageName>Pedidos</TitlePageName>
                <TitlePageDescription>| últimos pedidos</TitlePageDescription>
                <TitleButton type='button'>Novo Pedido</TitleButton>
            </TitleContainer>

            <OrdersContainer>
                <div className="orders-list">
                    {orders.map((order, index) => (

                        <OrderItem key={index}>
                            <Tooltip>
                                <div className='title'>Informações Adicionais</div>
                                <div className="info">
                                    <span>{order.presentant}</span>
                                    <span>{order.type}</span>
                                </div>
                            </Tooltip>
                            <OrderAvatar>
                                <img src={order.avatar} />
                            </OrderAvatar>
                            <OrderData>
                                <span className='order-protocol'>{order.protocol}</span>
                                <span className='order-entry_date'>{order.entry_date}</span>
                                <span className='order-due_date'>{order.due_date}</span>
                            </OrderData>
                            <EditIcon style={{
                                width: '30px',
                                height: '30px',
                                color: theme.colors.green
                            }}>Edit!</EditIcon>
                        </OrderItem>
                    ))}
                </div>
            </OrdersContainer>
        </SUAMAE>
    </MainLayout >
}