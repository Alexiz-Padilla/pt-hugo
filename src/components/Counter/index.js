import React, { Component } from 'react'
import { connect } from 'react-redux'
import Window from '../Window'
import {Form, Button, Row, Col} from 'react-bootstrap'
import { setCounterAction } from '../../action/counterAction'
import { withRouter } from 'react-router-dom';
const Input = ({...props}) => (
    <Form.Control type="text" value={props.currentCount} onChange={(val)=> props.newStart(val)}></Form.Control>
)
const ButtonCounter = ({...props}) => (
    <Button variant="info" onClick={(e)=> props.count(e)}>Counter</Button>
)
const CounterForm = ({...props}) => (
    <Row>
        <Col md={8}>
            <Input {...props}/>
        </Col>
        <Col md={4}>
            <ButtonCounter {...props}/>
        </Col>
    </Row>
)

class Counter extends Component {
  state = {
    counter: 0,
  }

  handlerCount = (e) => {
    const { dispatchCounter } = this.props;
    const { counter: counterState } = this.state;
    dispatchCounter(counterState).then(()=>{
        const { counter: counterPropsState } = this.props;
        this.setState({
            counter: counterPropsState
        })
    })
  }

  handleInput = (val) => {
    this.setState({
        counter: parseInt(val.target.value) || 0
    })
  } 
  render() {
    const { counter } = this.state;
    return (
        <Window title={"Counter"} Component={<CounterForm count={(e)=> this.handlerCount(e)} currentCount={counter} newStart={(val)=> this.handleInput(val)}/> }></Window>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
    counter: state.CounterReducer.count
})

const mapDispatchToProps = dispatch => ({
    dispatchCounter(counter){
        return dispatch(setCounterAction(counter))
    } 
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Counter))

