import React from 'react'
import styled from 'styled-components'
import Container from '../Container'
import { ButtonLink } from '../ButtonX'
import estilos_home from './Home_styles'
import {ICol} from '../Grid'



const Home_base = function ({...props}) { // se le pasan las props para recibir los styled components

    return (
        <Container {...props}  row bgImage="src/bg.png">

                    <div className='bloque-izquierdo'>
                        <div className='bloque-izquierdo-container'>
                            <h1> Academic experiences </h1>
                            <p>Read the texts about two people talking about their academic experiences. Match the images with the corresponding person.
                            <span className='negrilla'> <br/> <br/>¡Time to practice your reading skill!</span></p>
                            <ButtonLink to='/actividad1'>Start</ButtonLink>
                        </div>
                    </div>
                    <ICol className='bloque-derecho' mt={6}>
                        <figure>
                            <img src='./src/cover.png' alt='Logo' />    
                        </figure>

                    </ICol>

        </Container>
    )
}

const Home = styled(Home_base)`
    ${ estilos_home }
`

export default Home