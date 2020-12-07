
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Window from '../Window'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { setFlightReturnAction, setFlightOneWayAction } from '../../action/flightAction'
import { withRouter } from 'react-router-dom';
import { validateDate } from '../../helpers/helpersFunctions'
import moment from 'moment';

const flightTypes = [{
    value: 1, label: "one-way flight",
}, {
    value: 2, label: "return flight"
}];

const SelectTypeFlight = ({ ...props }) => (
    <Form.Control as="select" onChange={(val) => props.handleTypeFlight(val)} >
        {
            flightTypes.map(item => (
                <option key={item.value} value={item.value}>
                    {item.label}
                </option>
            ))
        }
    </Form.Control>
)
const InputFlightOneWay = ({ ...props }) => (
    <Form.Control type="text" value={props.flightOneWayVal} onChange={(val) => props.handleFlightOneWay(val)} style={{background: !props.isFlightOneWayValid ? 'coral' : undefined}}></Form.Control>
)
const InputFlightReturn = ({ ...props }) => (
    <Form.Control type="text" disabled={props.isFlightReturnDisabled} value={props.flightReturnVal} onChange={(val) => props.handleFlightReturn(val)} style={{background: !props.isFlightReturnValid ? 'coral' : undefined}}></Form.Control>
)
const ButtonFlight = ({ ...props }) => (
    <Button variant="info" disabled={props.isBookDisabled} onClick={(e) => props.book(e)}>Book</Button>
)
const FlightForm = ({ ...props }) => (
    <Col md={12}>
        <Row className="mb-2">
            <SelectTypeFlight {...props} />
        </Row>
        <Row className="mb-2">
            <InputFlightOneWay {...props} />
        </Row>
        <Row className="mb-2">
            <InputFlightReturn {...props} />
        </Row>
        <Row className="mb-2 justify-content-md-center">
            <ButtonFlight {...props} />
        </Row>
    </Col>
)

class Flight extends Component {
    state = {
        isFlightReturnDisabled: true,
        isBookDisabled: false,
        isFlightOneWayValid: true,
        isFlightReturnValid: true,
        flightOneWay: moment().format('DD.MM.YYYY'),
        flightReturn: moment().format('DD.MM.YYYY')
    } 
    componentDidMount(){
        const {dispatchFlightOneWay, dispatchFlightReturn}= this.props;
        const date = moment().format('DD.MM.YYYY');
        dispatchFlightOneWay(date)
        dispatchFlightReturn(date)
    }
    book = (e) => {
        const {flightOneWayVal, flightReturnVal} = this.props;
        const {isFlightReturnDisabled} = this.state;
        if(isFlightReturnDisabled) { 
            alert(`You have booked a one-way flight for ${flightOneWayVal}`)
            return;
        } 
        alert(`You have booked a return flight from ${flightOneWayVal} to ${flightReturnVal}`)
        return;
    }
    handleFlightOneWay = (val) => {
        const {flightReturn} = this.state;
        const {dispatchFlightOneWay}= this.props;
        const valCurated = val.target.value
        const isValidDate = moment(flightReturn).isBefore(valCurated);
        this.setState({
            flightOneWay: valCurated
        });
        dispatchFlightOneWay(valCurated).then(()=>{
            const {flightOneWayVal} = this.props;
            if (!validateDate(flightOneWayVal)) {
                this.setState({
                    isFlightOneWayValid: false,
                    isBookDisabled: true
                });
            } else {
                this.setState({
                    isFlightOneWayValid: true,
                    isBookDisabled: isValidDate
                }); 
            }
        })
    }
    handleFlightReturn = (val) => {
        const { flightOneWay } = this.state;
        const { dispatchFlightReturn } = this.props;
        const valCurated = val.target.value;
        const isValidDate = moment(flightOneWay).isAfter(valCurated);
        this.setState({
            flightReturn: valCurated
        })
        dispatchFlightReturn(valCurated).then(()=>{
            const {flightReturnVal} = this.props;
            if (!validateDate(flightReturnVal)) {
                this.setState({
                    isFlightReturnValid: false,
                    isBookDisabled: true
                });
            } else {
                this.setState({
                    isFlightReturnValid: true,
                    isBookDisabled: isValidDate
                }); 
            }
        })
    }
    handleTypeFlight = (val) => {
        const valCurated = val.target.value
        if (valCurated === 2) {
            this.setState({
                isFlightReturnDisabled: false
            });
        } else {
            this.setState({
                isFlightReturnDisabled: true
            }); 
        }
    }
    render() {
        const { flightOneWay, flightReturn, isFlightReturnDisabled, isFlightOneWayValid, isFlightReturnValid, isBookDisabled} = this.state;
        return (
            <Window title={"Flight"} Component={
                <FlightForm
                    isFlightOneWayValid={isFlightOneWayValid}
                    isFlightReturnValid={isFlightReturnValid}
                    isBookDisabled={isBookDisabled}
                    isFlightReturnDisabled={isFlightReturnDisabled}
                    flightReturnVal={flightReturn}
                    flightOneWayVal={flightOneWay}
                    handleTypeFlight={(e) => this.handleTypeFlight(e)}
                    book={(e) => this.book(e)} 
                    handleFlightOneWay={(val) => this.handleFlightOneWay(val)}
                    handleFlightReturn={(val) => this.handleFlightReturn(val)} />
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

