import React from 'react'
import PropTypes from 'prop-types'
import {Button, Col, Form, Input, notification, Row} from 'antd'
import {connect} from 'react-redux'
import {TlaModal} from "../../commons/tla-modal";
import {useLocation, useNavigate} from "react-router-dom";
import CloseModal from "../../commons/close-modal";
import {handleAddNewTrucks, handleUpdateTrucks} from "../../actions/trucks/TrucksAction";


function CashUpForm (props) {
    const navigate = useNavigate()
    const { addTrucks, updateTrucks } = props
    const [form] = Form.useForm()
    const { state } = useLocation()
    const formValues = {
        id: 0, description: '', ...state.data
    }

    const submit = (values) => {
        const formData = new FormData()
        values.id !== 0 && formData.append('_method', 'PUT')
        for (const key in values) {
            if (Object.prototype.hasOwnProperty.call(values, key)) {
                formData.append(key, values[key])
            }
        }
        (values.id === 0 ? addTrucks(formData) : updateTrucks(formData)).then(() => {
            notification.success({
                message: 'Success',
                description: 'Trucks ' + (values.id === 0 ? 'Created' : 'Updated')
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
        <TlaModal title={(formValues.id === 0 ? 'New' : 'Edit') + ' Truck'}>
            <Form
                form={form}
                onFinish={submit}
                layout="vertical"
                name="createTruckForm"
                initialValues={formValues}>
                <Row gutter={10}>
                    <Col span={12}>
                        <Form.Item name="truck_code" label="Truck Code"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Truck Code is Required'
                                       }
                                   ]}>
                            <Input size={'large'}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="vehicle_type" label="Vehicle Type"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Vehicle Type is Required'
                                       }
                                   ]}>
                            <Input size={'large'}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="vin_number" label="Vin Number"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Vin Number is Required'
                                       }
                                   ]}>
                            <Input size={'large'}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="license_plate" label="License Plate"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'License Plate is Required'
                                       }
                                   ]}>
                            <Input size={'large'}/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name="description" label="Description"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Phone is Required'
                                       }
                                   ]}>
                            <Input.TextArea rows={4} size={'large'}/>
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
CashUpForm.propTypes = {
    addTrucks: PropTypes.func.isRequired,
    updateTrucks: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
    addTrucks: (payload) => dispatch(handleAddNewTrucks(payload)),
    updateTrucks: (payload) => dispatch(handleUpdateTrucks(payload))
})

export default connect(null, mapDispatchToProps)(CashUpForm)
