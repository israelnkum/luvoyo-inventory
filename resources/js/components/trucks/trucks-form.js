import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Button, Checkbox, Col, Form, Input, notification, Row, Select} from 'antd'
import {connect} from 'react-redux'
import {TlaModal} from "../../commons/tla-modal";
import {useLocation, useNavigate} from "react-router-dom";
import CloseModal from "../../commons/close-modal";
import ChangePicture from "../commons/change-picture";
import {handleAddEmployee, handleUpdateEmployee} from "../../actions/employee/EmployeeAction";
import {nationalities} from "../../utils/nationalities";


function TrucksForm (props) {
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
                description: 'Truck ' + (values.id === 0 ? 'Created' : 'Updated')
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
            title={(formValues.id === 0 ? "New" : "Edit") + " Truck"}
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
                                    name="truck_code"
                                    label="Truck Code"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Truck code is Required",
                                        },
                                    ]}
                                >
                                    <Input size={"large"} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="vehicle_type"
                                    label="Vehicle Type"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vehicle Type is Required",
                                        },
                                    ]}
                                >
                                    <Select size={"large"}>
                                        <Select.Option value={"Pickup"}>
                                            Pickup
                                        </Select.Option>
                                        <Select.Option value={"Minivan"}>
                                            Minivan
                                        </Select.Option>
                                        <Select.Option value={"Long Vehicle"}>
                                            Long Vehicle
                                        </Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="vin_number"
                                    label="VIN Number"
                                    rules={[
                                        {
                                            required: true,
                                            message: "VIN Number is Required",
                                        },
                                    ]}
                                >
                                    <Input size={"large"} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="licence_plate"
                                    label="License Plate"
                                    rules={[
                                        {
                                            required: true,
                                            message: "License Plate is Required",
                                        },
                                    ]}
                                >
                                    <Input size={"large"} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item name="description" label="Description">
                                    <Input.TextArea size={'large'} rows='4' />
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
TrucksForm.propTypes = {
    addEmployee: PropTypes.func.isRequired,
    updateEmployee: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
    addEmployee: (payload) => dispatch(handleAddEmployee(payload)),
    updateEmployee: (payload) => dispatch(handleUpdateEmployee(payload))
})

export default connect(null, mapDispatchToProps)(TrucksForm)
