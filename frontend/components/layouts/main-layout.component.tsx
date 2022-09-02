import React from "react";
import Header from '../shared/header.component'
import styled from 'styled-components'

import { theme } from '../../styles/theme.style'

const Wrapper = styled.div`
    width: 100%; 
    min-height: calc(100vh - 72px); 
    max-width: 768px;
    margin: auto;     
`

const Layout = styled.div`
    display: flex;
    background: ${theme.colors.blue};  
    flex-direction: column;
`

interface IMainLayout {
    children: any
}

export const MainLayout: React.FC<IMainLayout> = ({ children }) => {
    return (
        <Layout>
            <Header />
            <Wrapper>
                {children}
            </Wrapper>
        </Layout>
    )
}