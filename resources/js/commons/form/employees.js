import React from 'react'
import {connect} from 'react-redux'
import {Form} from 'antd'
import PropTypes from 'prop-types'
import {handleGetCommonEmployees} from "../../actions/commons/CommonAction";
import SearchItems from "./search";

function Employees(props) {
    const {getEmployees, form} = props
    return (
        <Form.Item
            name="employee_id"
            label="Employee"
            rules={[
                {
                    required: true,
                    message: "Employee is Required",
                },
            ]}
        >
            <SearchItems search={getEmployees} displayField={'name'}
                         text={'Search by truck code or vehicle type or license plate'}
                         onChangeCallback={({ id }) => {
                             getEmployees()
                             form.setFieldsValue({
                                 employee_id: id
                             })
                         }}/>
        </Form.Item>
    )
}

Employees.propTypes = {
    getEmployees: PropTypes.func.isRequired,
    form: PropTypes.any.isRequired,
}

const mapDispatchToProps = (dispatch) => {
    return {
        getEmployees: (query) => dispatch(handleGetCommonEmployees(query))
    }
}

export default connect(null, mapDispatchToProps)(Employees)
