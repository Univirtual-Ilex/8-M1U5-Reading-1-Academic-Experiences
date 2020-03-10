import React, { useEffect, useRef, useState } from 'react'
//Components
import Container from '../Container'
import MainTitle from '../MainTitle'
import ButtonUi from '../ButtonControlUI'
import {ICol, IRow} from '../Grid'
import PersonaHover from '../PersonaHover'
import ButtonCheck from '../ButtonCheck'
// Styles
import styled from 'styled-components'
import styles, { UiButtonsContainer } from './Actividad_styles'
import Ilex from '../../App/variables'

// Data
import data from './Actividad_data'
import img from './Actividad_imgs'


import DraggableItem from '../Draggable'
import Tooltip from '../Tooltip'

import Modal from '../Generales/Modal'




const Actividad_base =  ({staticContext,...props}) => {


    const [visible0, mostrarTooltip0] = useState(false)
    const [visible1, mostrarTooltip1] = useState(false)
    const [visible2, mostrarTooltip2] = useState(false)
    const [visible3, mostrarTooltip3] = useState(false)
    
    const [modalFlag, setModal] = useState(false)
    const [ok, setOk] = useState(false)
    const [err, setErr] = useState(false)
    // Refs de las areas
    const area_0_1 = useRef()
    const area_0_2 = useRef()
    const area_0_3 = useRef()
    const area_0_4 = useRef()
    const area_1_1 = useRef()
    const area_1_2 = useRef()
    const area_1_3 = useRef()
    const area_1_4 = useRef()
    const area_1_5 = useRef()


    const setStatusCheck = (id, status, target) => {
        var data = img[id]
        data.status = status

        if(target){
            if(data.answers.indexOf(target) !== -1){
                data.right = 1
            }else{
                data.right = 0
            }
        }else{
            data.right = 0
        }
        console.log(img)
    }

    const checkActivity = () => {
        var count = 0
        img.map((image, i) => {
            if(image.right === 1){
                count ++
            }else{
                setErr(true)
                setModal(true)
            }

            if(count === img.length){
                setOk(true)
                setModal(true)
            }
        })
    }

    const mostrar = (index) => {
        eval('mostrarTooltip' + index)(!eval('visible' + index))
        for (var i = 0 ; i < 4; i++) {
            if( i !== index)
                eval('mostrarTooltip' + i)(false)
        }
    }
    const images = img.map((item, index) => {
                            return(
                                <DraggableItem elementId={index} key={index} setStatus={setStatusCheck} draggable={'draggable_' + index} idArr={index} areaDrag={'#area'} target={item.belongsTo}  ref={[area_0_1, area_0_2, area_0_3, area_0_4, area_1_1, area_1_2, area_1_3, area_1_4, area_1_5]}>
                                    <div className="boxes"  >
                                        <img src={item.img} alt="Img para arrastrar" />
                                    </div>
                                </DraggableItem>
                            )
                        })
    
    const personas = data.map((item, index) => {
                        return(
                                <ICol className={"square float_" + index} key={index} w={45} >
                                    <div className={'person ' + item.student } onClick={() => mostrar(index)}>
                                    </div>
                                    <IRow className={'float_'} >
                                        {
                                            item.targets.map((target, i) => {
                                                return (
                                                    <ICol  key={i} className="box" data-selected={''} data-target={'area_' + index + '_' + target}   target={'area_' + index + '_' +target} id={'area_' + index + '_' +target} ref={eval('area_' + index + '_' +target)}>
                                                    </ICol>
                                                )
                                            })
                                        }
                                    </IRow>
                                    <div >
                                        <Tooltip visible={eval('visible' + index)} onClick={() => mostrar(index)} > {item.tooltip} </Tooltip>
                                    </div>
                                </ICol>
                                   
                            
                            )
                    })
    return (
        <Container bgImage='./src/bg_actividad1.png' id="area" {...props} h={40} w={85} >
            
            <UiButtonsContainer>
                <ButtonUi icon='ilx-ayuda' tooltip='click on each of the characters, read the description and locate the images' />
                <ButtonUi icon='ilx-volver' tooltip='Start Again' />
            </UiButtonsContainer>
            <IRow pt={1.5}>
                <ICol py={ 3 }>
                    <MainTitle color={Ilex.violeta2} size={1.5}>
                    READ THE ROUTINES OF DIFFERENT STUDENTS AND THEN ASSOCIATE THE IMAGES CORRESPONDINGLY
                    </MainTitle>  
                </ICol>
            </IRow>

            <IRow justify='center' align='center' w={100} gutters={0.5}>
                <IRow w={90} className="mlFirstChild" pl={5} >
                    {personas}
                </IRow>
                <IRow pl={2} pt={3} gutters={1} >
                    {images}
                </IRow>
                <IRow>
                    <ICol pt={2.5}><ButtonCheck onClick={checkActivity} /></ICol>
                </IRow>

            </IRow>
            <Modal visible={modalFlag} ok={ok} err={err} w={25} repeatUrl={'/actividad1'} finished={ok} />
        </Container>
    )

}

const Actividad = styled(Actividad_base)`
    ${ styles.mistyles }
`


export default Actividad