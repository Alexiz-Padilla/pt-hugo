
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Window from '../Window'
import { Form, Row, Col } from 'react-bootstrap'
import { setCelsiusAction, setFahrenheitAction } from '../../action/temperatureAction'
import { withRouter } from 'react-router-dom';

const InputCelsius = ({ ...props }) => (
    <Form.Control type="text" value={props.celsiusVal} onChange={(val) => props.handleCelsius(val)}></Form.Control>
)
const InputFahrenheit = ({ ...props }) => (
    <Form.Control type="text" value={props.fahrenheitVal} onChange={(val) => props.handleFahrenheit(val)}></Form.Control>
)
const TemperatureForm = ({ ...props }) => (
    <Row>
        <Col md={3}>
            <InputCelsius {...props} />
        </Col>
        <Col md={3}>
            <Form.Label>Celsius =</Form.Label>
        </Col>
        <Col md={3}>
            <InputFahrenheit {...props} />
        </Col>
        <Col md={3}>
            <Form.Label>Fahrenheit</Form.Label>
        </Col>
    </Row>
)

class Temperature extends Component {
    state = {
        fahrenheit: "",
        celsius: ""
    }

    handleFahrenheit = (val) => {
        const { dispatchFahrenheit } = this.props;
        const valCurated = val.target.value
        this.setState({
            fahrenheit: valCurated,
        })
        dispatchFahrenheit(valCurated).then(() => {
            const { celsius } = this.props;
            this.setState({
                celsius,
            })
        })
    }
    handleCelsius = (val) => {
        const { dispatchCelsius } = this.props;
        const valCurated = val.target.value
        this.setState({
            celsius: valCurated
        })
        dispatchCelsius(valCurated).then(() => {
            const { fahrenheit } = this.props;
            this.setState({
                fahrenheit,
            })
        })
    }
    render() {
        const { celsius, fahrenheit } = this.state;
        return (
            <Window title={"Temperature"} Component={<TemperatureForm celsiusVal={celsius} fahrenheitVal={fahrenheit} handleCelsius={(val) => this.handleCelsius(val)} handleFahrenheit={(val) => this.handleFahrenheit(val)} />}></Window>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    fahrenheit: state.TemperatureReducer.Fahrenheit,
    celsius: state.TemperatureReducer.Celsius,
})

const mapDispatchToProps = dispatch => ({
    dispatchCelsius(celsius) {
        return dispatch(setCelsiusAction(celsius))
    },
    dispatchFahrenheit(fahrenheit ) {
        return dispatch(setFahrenheitAction(fahrenheit))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Temperature))

