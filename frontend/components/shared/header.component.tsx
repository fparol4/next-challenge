import styled from 'styled-components'
import { theme } from '../../styles/theme.style'

const Header = styled.div`
    display: flex; 
    align-items: center; 
    justify-content: center; 
    background: ${theme.colors.white};

    height: ${theme.sizes.headerHeigth};
    
    img { 
        height: 80%;  
    }
`

export default () => {
    return (
        <Header >
            <img src="/logo.png" />
        </Header>
    )
}