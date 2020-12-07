
import React from 'react';
import styled from 'styled-components'

const PanelComponent = ({Component, ...props}) => {
    return (
        <Panel id={props.id} onMouseDown={(e) => props.onMouseDown(e)}>
            {Component}
        </Panel>
    )
}

const Panel = styled.div`
height: 400px;
background: rgba(0,0,0,0.1);
border-width: 1px;
border-color: #000;
border-style: solid;
margin: 0 auto;
width: 100%;
content-visibility: auto;
`


export default PanelComponent