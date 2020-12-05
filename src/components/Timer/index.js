
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Window from '../Window'
import { Form, Row, Col, Button, ProgressBar } from 'react-bootstrap'
import { setFlightReturnAction, setFlightOneWayAction } from '../../action/flightAction'
import { withRouter } from 'react-router-dom';
import { } from '../../helpers/helpersFunctions'

const MAX = 30000

const TimerProgess = ({ ...props }) => (
    <Row>
        <Col md={2}>
            <Form.Label>Elapsed Time: </Form.Label>
        </Col>
        <Col md={10}>
            <ProgressBar variant="success" now={props.timerProgress} max={props.maxVal} />
        </Col>
    </Row>
)
const TimerRange = ({ ...props }) => (
    <Row>
        <Col md={2}>
            <Form.Label>Range: </Form.Label>
        </Col>
        <Col md={10}>
            <Form.Control value={props.maxVal} type="range" max={MAX} min={0} onChange={e => props.handleRange(e)} />
        </Col>
    </Row>
)
const ButtonReset = ({ ...props }) => (
    <Button variant="info" onClick={(e) => props.reset(e)}>Reset Timer</Button>
)
const Timer = ({ ...props }) => {
    const value = props.timerProgress
    const seconds = Math.floor(value / 1000)
    const dezipart = Math.floor(value / 100) % 10
    const formatted = `${seconds}.${dezipart}s`
    return (
        <Form.Label>{`${formatted}`}</Form.Label>
    )
}
const TimerForm = ({ ...props }) => (
    <Row >
        <Col md={12}>
            <TimerProgess {...props} />
        </Col>
        <Col md={12}>
            <Timer {...props} />
        </Col>
        <Col md={12}>
            <TimerRange {...props} />
        </Col>
        <Col md={12} className="text-center">
            <ButtonReset {...props} />
        </Col>
    </Row>
)
function clamp(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
}

class Flight extends Component {
    state = {
        maxVal: 0,
        timerProgress: 0
    }
    reset = (e) => {
        const {maxVal} = this.state;
       const start = new Date().getTime()
       if (new Date().getTime() - start >= maxVal) {
           this.setState({ maxVal })
       } else {
        this.setState({ timerProgress: clamp(100 - start, 0, maxVal)  })
       }
    }
    handleRange = (val) => {
        const curatedVal = Math.max(1, parseInt(val.target.value));
        this.setState({
            maxVal:curatedVal 
        })
    }
    render() {
        const { maxVal, timerProgress } = this.state;
        return (
            <Window title={"Timer"} Component={
                <TimerForm
                    timerProgress={timerProgress}
                    maxVal={maxVal}
                    reset={(e) => this.reset(e)}
                    handleRange={(val) => this.handleRange(val)} />
            }></Window>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    flightOneWayVal: state.FlightReducer.flight_one_way,
    flightReturnVal: state.FlightReducer.flight_return,
})

const mapDispatchToProps = dispatch => ({
    dispatchFlightReturn(date) {
        return dispatch(setFlightReturnAction(date))
    },
    dispatchFlightOneWay(date) {
        return dispatch(setFlightOneWayAction(date))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Flight))

