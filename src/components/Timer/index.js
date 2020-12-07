
import React, { Component } from 'react'
import Window from '../Window'
import { Form, Row, Col, Button, ProgressBar } from 'react-bootstrap'
import { withRouter } from 'react-router-dom';

const MAX = 30000;
const TimerProgess = ({ ...props }) => (
    <Row>
        <Col md={2}>
            <Form.Label>Elapsed Time: </Form.Label>
        </Col>
        <Col md={10}>
            <ProgressBar variant="success" now={props.isEnd ? MAX : props.timerProgress} max={props.isEnd ? MAX : props.max} />
        </Col>
    </Row>
)
const TimerRange = ({ ...props }) => (
    <Row>
        <Col md={2}>
            <Form.Label>Range: </Form.Label>
        </Col>
        <Col md={10}>
            <Form.Control value={props.max} type="range" max={MAX} min={0} onChange={e => props.handleRange(e)} />
        </Col>
    </Row>
)
const ButtonReset = ({ ...props }) => (
    <Button variant="info" onClick={(e) => props.reset(e)}>Reset Timer</Button>
)
const LineTimer = ({ ...props }) => {
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
            <LineTimer {...props} />
        </Col>
        <Col md={12}>
            <TimerRange {...props} />
        </Col>
        <Col md={12} className="text-center">
            <ButtonReset {...props} />
        </Col>
    </Row>
)

class Timer extends Component {
    state = {
        max: 15000,
        startVal: 0,
        timerProgress: 0,
        isEnd: false
    }
    componentDidMount() {
        this.myInterval = setInterval(() => {
            this.timer();
        }, 500)
    }
    componentDidUpdate() {
        const { timerProgress, max, isEnd } = this.state
        if (timerProgress >= max) {
            clearInterval(this.myInterval);
            if (!isEnd) {
                this.setState({
                    isEnd: true
                })
            }
        }
    }
    timer = () => {
        const { timerProgress } = this.state;
        const newCurrentTime = timerProgress + 500;
        this.setState({
            timerProgress: newCurrentTime
        })
    }
    reset = (e) => {
        this.setState({
            startVal: 0,
            timerProgress: 0,
            isEnd: false
        })
        this.myInterval = setInterval(() => {
            this.timer();
        }, 500)
    }
    handleRange = (val) => {
        const { isEnd } = this.state;
        const curatedVal = Math.max(1, parseInt(val.target.value));
        if (isEnd === false) {
            this.setState({
                max: curatedVal,
            })
        } else {
            this.setState({
                max: curatedVal,
                timerProgress: curatedVal,
            })
        }
    }
    render() {
        const { startVal, timerProgress, max, isEnd } = this.state;
        return (
            <Window title={"Timer"} Component={
                <TimerForm
                    isEnd={isEnd}
                    max={max}
                    timerProgress={timerProgress}
                    startVal={startVal}
                    reset={(e) => this.reset(e)}
                    handleRange={(val) => this.handleRange(val)} />
            }></Window>
        )
    }
}

export default withRouter(Timer);

