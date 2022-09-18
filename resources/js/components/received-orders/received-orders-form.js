import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Button, Checkbox, Col, Form, Input, DatePicker, notification, Row, Select} from 'antd'
import {connect} from 'react-redux'
import {TlaModal} from "../../commons/tla-modal";
import {useLocation, useNavigate} from "react-router-dom";
import CloseModal from "../../commons/close-modal";
import ChangePicture from "../commons/change-picture";
import {handleAddEmployee, handleUpdateEmployee} from "../../actions/employee/EmployeeAction";
import {nationalities} from "../../utils/nationalities";


function RecievedOrdersForm (props) {
    const navigate = useNavigate()
    const [selectedFile, setSelectedFile] = useState(null)
    const { addEmployee, updateEmployee } = props
    const [form] = Form.useForm()
    const { state } = useLocation()
    const formValues = {
        id: 0, create_account: false, staff_id: null, ...state.data
    }

    const submit = (values) => {

        const formData = new FormData()
        values.id !== 0 && formData.append('_method', 'PUT')
        for (const key in values) {
            if (Object.prototype.hasOwnProperty.call(values, key)) {
                formData.append(key, values[key])
            }
        }
        (values.id === 0 ? addEmployee(formData) : updateEmployee(formData)).then(() => {
            notification.success({
                message: 'Success',
                description: 'Product ' + (values.id === 0 ? 'Created' : 'Updated')
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

    const Render = ({ children, editing = true }) => (
        (editing === false ? formValues.id !== 0 : formValues === 0) && children
    )
    return (
        <TlaModal
            width={800}
            title={(formValues.id === 0 ? "New" : "Edit") + " Received Order"}
        >
            <Form
                form={form}
                onFinish={submit}
                layout="vertical"
                name="createStaffForm"
                initialValues={formValues}
            >
                <Row gutter={10}>
                    <Col span={12}>
                        <Form.Item
                            name="invoice_number"
                            label="Invoice No."
                            rules={[
                                {
                                    required: true,
                                    message: "Invoice Number is Required",
                                },
                            ]}
                        >
                            <Input size={"large"} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="date"
                            label="Date"
                            rules={[
                                {
                                    required: true,
                                    message: "Date is Required",
                                },
                            ]}
                        >
                            <DatePicker size={'large'} style={{ width: '100%'}} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="total"
                            label="Total"
                            rules={[
                                {
                                    required: true,
                                    message: "Total is Required",
                                },
                            ]}
                        >
                            <Input size={"large"} type='number' />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="supplier_id"
                            label="Supplier ID"
                            rules={[
                                {
                                    required: true,
                                    message: "Supplier ID is Required",
                                },
                            ]}
                        >
                            <Select size={"large"}>
                                <Select.Option value={"1"}>
                                    1
                                </Select.Option>
                                <Select.Option value={"2"}>
                                    2
                                </Select.Option>
                                <Select.Option value={"3"}>
                                    3
                                </Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <div align={"right"}>
                        <CloseModal />
                        &nbsp;
                        <Button size={"large"} type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </TlaModal>
    );
}
RecievedOrdersForm.propTypes = {
    addEmployee: PropTypes.func.isRequired,
    updateEmployee: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
    addEmployee: (payload) => dispatch(handleAddEmployee(payload)),
    updateEmployee: (payload) => dispatch(handleUpdateEmployee(payload))
})

export default connect(null, mapDispatchToProps)(RecievedOrdersForm)
