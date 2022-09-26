import React from 'react'
import PropTypes from 'prop-types'
import {Button, Col, Form, Input, InputNumber, notification, Row} from 'antd'
import {connect} from 'react-redux'
import {TlaModal} from "../../commons/tla-modal";
import {useLocation, useNavigate} from "react-router-dom";
import CloseModal from "../../commons/close-modal";
import {handleAddNewCashUps, handleUpdateCashUps} from "../../actions/cashUps/CashUpsAction";
import DispatchOrders from "../../commons/form/dispatch-orders";
import moment from "moment/moment";

function CashUpForm (props) {
    const navigate = useNavigate()
    const { addCashUps, updateCashUps } = props
    const [form] = Form.useForm()
    const { state } = useLocation()
    const formValues = {
        id: 0, description: '',
        ...{...state.data, date_time: state?.data ? moment(state?.data.date_time) : ''}
    }

    const submit = (values) => {
        const formData = new FormData()
        values.id !== 0 && formData.append('_method', 'PUT')
        for (const key in values) {
            if (Object.prototype.hasOwnProperty.call(values, key)) {
                formData.append(key, values[key])
            }
        }
        (values.id === 0 ? addCashUps(formData) : updateCashUps(formData)).then(() => {
            notification.success({
                message: 'Success',
                description: 'CashUps ' + (values.id === 0 ? 'Created' : 'Updated')
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
        <TlaModal title={(formValues.id === 0 ? 'New' : 'Edit') + ' Cash Up'}>
            <Form
                form={form}
                onFinish={submit}
                layout="vertical"
                name="createCashUpForm"
                initialValues={formValues}>
                <Row gutter={10}>
                    <Col span={24}>
                        <DispatchOrders displayContent={true} form={form} editing={formValues.id === 0}/>
                    </Col> <br/>
                    <Col span={24}>
                        <Form.Item name="received_amount" label="Received Amount"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Received Amount is Required'
                                       }
                                   ]}>
                            <InputNumber style={{ width: '100%'}} size={'large'}/>
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
                    {/*<Col span={12}>
                        <Row gutter={10}>
                           <Col span={12}>
                                <Trucks form={form} editing={formValues.id === 0}/>
                            </Col>
                            <Col span={12}>
                                <Employees form={form} editing={formValues.id === 0}/>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="date_time" label="Dispatch Date"
                                           rules={[
                                               {
                                                   required: true,
                                                   message: 'Date is Required'
                                               }
                                           ]}>
                                    <DatePicker showTime={{
                                        format: 'HH:mm',
                                    }} size={'large'}  style={{ width: '100%' }}/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>*/}
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
    addCashUps: PropTypes.func.isRequired,
    updateCashUps: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
    addCashUps: (payload) => dispatch(handleAddNewCashUps(payload)),
    updateCashUps: (payload) => dispatch(handleUpdateCashUps(payload))
})

export default connect(null, mapDispatchToProps)(CashUpForm)
