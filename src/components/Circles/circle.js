
import React from 'react';
import styled from 'styled-components'

const CircleComponent = ({...props}) => {
    return (
        <Circle id={props.id} onClick={(e)=> props.onClick(e)} {...props} />
    )
}

const Circle = styled.div`
border-radius: 50%;
height: ${props => props.height}px;
background: #405663;
width: ${props => props.width}px;
position: absolute;
left: ${props => props.ejeX}px;
top: ${props => props.ejeY}px;
`

export default CircleComponent