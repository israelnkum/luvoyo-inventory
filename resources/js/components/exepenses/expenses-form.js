import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Button, Col, DatePicker, Form, Input, InputNumber, notification, Row, Select} from 'antd'
import {connect} from 'react-redux'
import {TlaModal} from "../../commons/tla-modal";
import {useLocation, useNavigate} from "react-router-dom";
import CloseModal from "../../commons/close-modal";
import {handleAddNewExpenses, handleUpdateExpenses} from "../../actions/expenses/ExpensesAction";
import {expensesCategories} from "../../utils";
import moment from "moment";
import AllowEditing from "../../commons/allow-editing";


function ExpensesForm (props) {
    const navigate = useNavigate()
    const { addExpenses, updateExpenses } = props
    const [form] = Form.useForm()
    const { state } = useLocation()

    const formValues = {
        id: 0, description: '', date_time: moment(), ...state.data
    }
    const [editing, setEditing] = useState(formValues.id !== 0)

    const submit = (values) => {
        const formData = new FormData()
        values.id !== 0 && formData.append('_method', 'PUT')
        values.date_time = values.date_time.format('YYYY-MM-DD h:m')
        for (const key in values) {
            if (Object.prototype.hasOwnProperty.call(values, key)) {
                formData.append(key, values[key])
            }
        }
        (values.id === 0 ? addExpenses(formData) : updateExpenses(formData)).then(() => {
            notification.success({
                message: 'Success',
                description: 'Expenses ' + (values.id === 0 ? 'Created' : 'Updated')
            })
            form.resetFields()
            navigate(-1)
        }).catch((error) => {
            notification.warning({
                message: 'Warning',
                description: error.response.data.message
            })
        })
    }

    return (
        <TlaModal title={(formValues.id === 0 ? 'New' : 'Edit') + ' Expenses'}
                  extra={ formValues.id !== 0  && <AllowEditing editing={editing} setEditing={setEditing}/>}
        >
            <Form
                disabled={editing}
                form={form}
                onFinish={submit}
                layout="vertical"
                name="createExpensesForm"
                initialValues={formValues}>
                <Row gutter={10}>
                    <Col span={24}>
                        <Form.Item name="date_time" label="Date Time"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Date Time is Required'
                                       }
                                   ]}>
                            <DatePicker disabled size={'large'} showTime={{
                                format: 'HH:mm',
                            }}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="category" label="Category" rules={[{
                                           required: true,
                                           message: 'Category is Required'
                                       }]}>
                            <Select size={'large'} allowClear>
                                {expensesCategories.map((expenses, index) => (
                                    <Select.Option key={index} value={expenses}>{expenses}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="amount" label="Amount" rules={[
                            {
                                required: true,
                                message: 'Amount is Required'
                            }
                        ]}>
                            <InputNumber style={{ width: '100%'}} step={0.01} size={'large'}/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name="description" label="Description">
                            <Input.TextArea rows={4}/>
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item hidden name="id" label="ID"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Required'
                                       }
                                   ]}>
                            <Input size={'large'}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <div align={'right'}>
                        <CloseModal/>&nbsp;
                        <Button size={'large'} type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </TlaModal>
    )
}
ExpensesForm.propTypes = {
    addExpenses: PropTypes.func.isRequired,
    updateExpenses: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
    addExpenses: (payload) => dispatch(handleAddNewExpenses(payload)),
    updateExpenses: (payload) => dispatch(handleUpdateExpenses(payload))
})

export default connect(null, mapDispatchToProps)(ExpensesForm)
