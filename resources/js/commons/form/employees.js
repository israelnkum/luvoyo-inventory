import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Form, Select} from 'antd'
import PropTypes from 'prop-types'
import {handleGetCommonEmployees} from "../../actions/commons/CommonAction";

function Employees(props) {
    const [loading, setLoading] = useState(true)
    const {getEmployees, employees} = props

    useEffect(() => {
        getEmployees().then(() => setLoading(false))
    }, [])


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
            <Select size={'large'}
                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                    placeholder="Select Employee" allowClear showSearch>
                {
                    employees.map((employee) => (
                        <Select.Option key={employee.id}
                                       value={employee.id}>{employee.name}</Select.Option>
                    ))
                }
            </Select>
        </Form.Item>
    )
}

Employees.propTypes = {
    getEmployees: PropTypes.func.isRequired,
    employees: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
    employees: state.commonReducer.employees,
})
const mapDispatchToProps = (dispatch) => {
    return {
        getEmployees: () => dispatch(handleGetCommonEmployees())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Employees)
