import React from 'react'
import {connect} from 'react-redux'
import {Form} from 'antd'
import PropTypes from 'prop-types'
import {handleGetCommonEmployees} from "../../actions/commons/CommonAction";
import SearchItems from "./search";

function Employees(props) {
    const { getEmployees, form, editing } = props
    return (
        <Form.Item
            name="employee_id"
            label="Employee"
            rules={[
                {
                    required: editing,
                    message: "Employee is Required",
                },
            ]}
        >
            <SearchItems search={getEmployees} displayField={'name'}
                         text={'Search by surname'}
                         onChangeCallback={({ id }) => {
                             getEmployees()
                             form.setFieldsValue({
                                 employee_id: id
                             })
                         }}/>
        </Form.Item>
    )
}

Employees.defaultProps = {
    editing: false
}

Employees.propTypes = {
    getEmployees: PropTypes.func.isRequired,
    form: PropTypes.any.isRequired,
    editing: PropTypes.bool,

}

const mapDispatchToProps = (dispatch) => {
    return {
        getEmployees: (query) => dispatch(handleGetCommonEmployees(query))
    }
}

export default connect(null, mapDispatchToProps)(Employees)
