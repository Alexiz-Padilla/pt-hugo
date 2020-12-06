import React, { Component } from 'react'
import { connect } from 'react-redux'
import Window from '../Window'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { getUserAction, createUserAction, updateUserAction, deleteUserAction, searchUserAction } from '../../action/crudAction'
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

const Search = ({ ...props }) => (
    <Row>
        <Col md={4}>
            <Form.Label>
                Filter prefix:
            </Form.Label>
        </Col>
        <Col md={8}>
            <Form.Control type="text" onChange={(val) => props.handleSearch(val)}>
            </Form.Control>
        </Col>
    </Row>
)
const TableData = ({ ...props }) => (
    <Form.Control as="select" multiple onChange={(val) => props.handleTable(val)}>
        {
            props.data && props.data.map((item, index) => (
                <option key={item.value} value={item.value}>
                    {item.label}
                </option>
            ))
        }
    </Form.Control>
)
const InputName = ({ ...props }) => (
    <Row>
        <Col md={3}>
            <Form.Label>Name</Form.Label>
        </Col>
        <Col md={9}>
            <Form.Control className="mb-2" type="text" value={props.txtName} onChange={(val) => props.handleName(val)}></Form.Control>
        </Col>
    </Row>
)
const InputSurname = ({ ...props }) => (
    <Row>
        <Col md={3}>
            <Form.Label>Surname</Form.Label>
        </Col>
        <Col md={9}>
            <Form.Control className="mb-2" type="text" value={props.txtSurname} onChange={(val) => props.handleSurname(val)}></Form.Control>
        </Col>
    </Row>
)
const ButtonCreate = ({ ...props }) => (
    <Button variant="info" onClick={(e) => props.create(e)}>Create</Button>
)
const ButtonUpdate = ({ ...props }) => (
    <Button variant="info" onClick={(e) => props.update(e)}>Update</Button>
)
const ButtonDelete = ({ ...props }) => (
    <Button variant="info" onClick={(e) => props.delete(e)}>Delete</Button>
)
const CRUDForm = ({ ...props }) => (
    <Row>
        <Col md={12} className="mb-2">
            <Search {...props} />
        </Col>
        <Col md={6} className="mb-2">
            <TableData {...props} />
        </Col>
        <Col md={6} className="mb-2">
            <InputName {...props} />
            <InputSurname {...props} />
        </Col>
        <Col md={4} xs={4} className="mb-2 text-center">
            <ButtonCreate {...props} />
        </Col>
        <Col md={4} xs={4} className="mb-2  text-center">
            <ButtonUpdate {...props} />
        </Col>
        <Col md={4} xs={4} className="mb-2  text-center">
            <ButtonDelete {...props} />
        </Col>
    </Row>
)

class CRUD extends Component {
    state = {
        txtName: '',
        txtSurname: '',
        txtSearch: '',
        data: []
    }

    componentDidMount() {
        const { dispatchGetUser } = this.props;
        dispatchGetUser().then(() => {
            const { users } = this.props;
            this.setState({
                data: users
            });
        });
    }

    handleTable = (val) => {
        const curatedVal = val.target.value
        this.setState({
            selected: curatedVal
        });
    }
    handleName = (val) => {
        const curatedVal = val.target.value
        this.setState({
            txtName: curatedVal
        })
    }
    handleSurname = (val) => {
        const curatedVal = val.target.value
        this.setState({
            txtSurname: curatedVal
        })
    }
    handleSearch = (val) => {
        const { dispatchSearchUser } = this.props;
        const curatedVal = val.target.value
        this.setState({
            txtSearch: curatedVal,
        })
        dispatchSearchUser(curatedVal).then(() => {
            const { userFilterData } = this.props;
            this.setState({
                data: userFilterData
            })
        });
    }
    onCreate = (e) => {
        const { dispatchCreateUser } = this.props;
        const { txtSurname, txtName } = this.state;
        const data = {
            Surname: txtSurname,
            Name: txtName
        }
        dispatchCreateUser(data).then(() => {
            const { users } = this.props;
            this.setState({
                data: users,
                txtName: '',
                txtSurname: ''
            })
        });
    }
    onUpdate = (e) => {
        const { dispatchUpdateUser } = this.props;
        const { txtSurname, txtName, selected } = this.state;
        const data = {
            Surname: txtSurname,
            Name: txtName
        }
        if (selected) {
            dispatchUpdateUser(selected, data).then(() => {
                const { users } = this.props;
                this.setState({
                    data: users,
                    txtName: '',
                    txtSurname: ''
                })
            });
        }
    }
    onDelete = (e) => {
        const { dispatchDeleteUser } = this.props;
        const { selected } = this.state;
        dispatchDeleteUser(selected).then(() => {
            const { users } = this.props;
            this.setState({
                data: users,
                txtName: '',
                txtSurname: ''
            })
        });
    }
    render() {
        const { data, txtName, txtSurname } = this.state;
        return (
            <Window title={"CRUD"} Component={
                <CRUDForm
                    data={data}
                    txtName={txtName}
                    txtSurname={txtSurname}
                    handleTable={(val) => this.handleTable(val)}
                    handleName={(val) => this.handleName(val)}
                    handleSurname={(val) => this.handleSurname(val)}
                    handleSearch={(val) => this.handleSearch(val)}
                    create={(e) => this.onCreate(e)}
                    update={(e) => this.onUpdate(e)}
                    delete={(e) => this.onDelete(e)}
                />}></Window>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    users: _.values(state.CrudReducer.users),
    userFilterData: state.CrudReducer.filterData
})

const mapDispatchToProps = dispatch => ({
    dispatchGetUser() {
        return dispatch(getUserAction())
    },
    dispatchCreateUser(data) {
        return dispatch(createUserAction(data))
    },
    dispatchUpdateUser(user, data) {
        return dispatch(updateUserAction(user, data))
    },
    dispatchDeleteUser(user) {
        return dispatch(deleteUserAction(user))
    },
    dispatchSearchUser(search) {
        return dispatch(searchUserAction(search))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CRUD))

