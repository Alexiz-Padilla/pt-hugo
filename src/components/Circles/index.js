import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import ReactDOM from 'react-dom'
import { Toast, Form, Row, CardColumns, Button, Col } from 'react-bootstrap'
import Window from '../Window'
import Circle from './circle'
import Panel from './panel'
import _ from 'lodash'
import { setCircleAction, updateCircleAction, undoAction, redoAction } from '../../action/circlesAction'

const ButtonUndo = ({ ...props }) => (
    <Button variant="info" onClick={(e) => props.onUndo(e)}>Undo</Button>
)
const ButtonRedo = ({ ...props }) => (
    <Button variant="info" onClick={(e) => props.onRedo(e)}>Redo</Button>
)
class Circles extends Component {
    state = {
        circles: [],
        selected: 0,
    }
    onClick = (e) => {
        this.setState({
            selected: parseInt(e.target.id)
        })
        ReactDOM.render(
            <Row>
                <Col md={6}>
                    <Form.Label> Adjust Diameter: </Form.Label>
                </Col>
                <Col md={6}>
                    <Form.Control type="range" onChange={(val) => this.onChangeRange(val)} />
                </Col>
            </Row>
            , document.querySelector('#toast'))
    }
    onChangeRange = (val) => {
        const { dispatchUpdateCircle } = this.props;
        const { selected } = this.state;
        const range = val.target.value;
        const data = {
            id: selected,
            height: range,
            width: range,
        }
        dispatchUpdateCircle(data).then(() => {
            const { circles } = this.props;
            console.log(circles)
            const curatedData = _.values(circles)
            this.setState({
                circles: curatedData
            })
            ReactDOM.render(<>{curatedData.map((item) => <Circle height={item.height} width={item.width} id={item.id} onClick={(e) => this.onClick(e)} ejeX={item.x} ejeY={item.y}></Circle>)}</>, document.querySelector('#panel'))
        })
    }
    onMouseDown = (e) => {
        const { dispatchSetCircle } = this.props;
        const data = {
            x: e.pageX - e.target.offsetWidth / 1.7,
            y: e.pageY - e.target.offsetHeight / 1.7,
            height: 50,
            width: 50
        }
        dispatchSetCircle(data).then(() => {
            const { circles } = this.props;
            const curatedData = _.values(circles)
            this.setState({
                circles: curatedData
            })
            ReactDOM.render(<>{curatedData.map((item) => <Circle height={item.height} width={item.width} id={item.id} onClick={(e) => this.onClick(e)} ejeX={item.x} ejeY={item.y}></Circle>)}</>, document.querySelector('#panel'))
        })
    }
    onUndo = (e) => {
        const { dispatchUndo } = this.props;
        dispatchUndo().then(()=>{
            const { circlesUndo } = this.props;
            console.log(circlesUndo)
            this.setState({
                circles: circlesUndo
            })
            ReactDOM.render(<>{circlesUndo.map((item) => <Circle height={item.height} width={item.width} id={item.id} onClick={(e) => this.onClick(e)} ejeX={item.x} ejeY={item.y}></Circle>)}</>, document.querySelector('#panel'))
        })
    }
    onRedo = (e) => {
        const { dispatchRedo } = this.props;
        dispatchRedo().then(()=>{
            const { circlesRedo } = this.props;
            this.setState({
                circles: circlesRedo
            })
            ReactDOM.render(<>{circlesRedo.map((item) => <Circle height={item.height} width={item.width} id={item.id} onClick={(e) => this.onClick(e)} ejeX={item.x} ejeY={item.y}></Circle>)}</>, document.querySelector('#panel'))
        })
    }
    render() {
        console.log("render")
        return (
            <Window title={"Circle"} Component={
                <>
                    <ButtonUndo onUndo={(e) => this.onUndo(e)}></ButtonUndo>
                    <ButtonRedo onRedo={(e) => this.onRedo(e)}></ButtonRedo>
                    <Panel id={"panel"} onMouseDown={(e) => this.onMouseDown(e)} />
                    <Toast id={"toast"} className="p-5 justify-content-md-center"></Toast>
                </>
            }>
            </Window>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    circles: state.CircleReducer.circles,
    circlesUndo: state.CircleReducer.undoCircle,
    circlesRedo: state.CircleReducer.redoCircle
})

const mapDispatchToProps = dispatch => ({
    dispatchSetCircle(data) {
        return dispatch(setCircleAction(data))
    },
    dispatchUpdateCircle(data) {
        return dispatch(updateCircleAction(data))
    },
    dispatchUndo() {
        return dispatch(undoAction())
    },
    dispatchRedo() {
        return dispatch(redoAction())
    },

});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Circles))

