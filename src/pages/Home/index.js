import React, {useContext} from 'react'
import { Container } from 'react-bootstrap'
import AdicionarMes from './AdicionarMes'

import Meses from './Meses'
import { AuthContext } from '../../auth'
import {Navigate} from 'react-router-dom'


const Home = () => {
    const auth = useContext(AuthContext)
    if(auth.loading && auth.user === null){
        return <Navigate to ='/login'/>
    }
    return (
        <Container>
            <AdicionarMes/>
            <Meses/>
        </Container>
    )
}

export default Home
