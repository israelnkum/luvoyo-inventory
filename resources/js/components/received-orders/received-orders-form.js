import React from 'react'
import PropTypes from 'prop-types'
import {Button, Card, Col, Form, Input, DatePicker, notification, Row, InputNumber} from 'antd'
import {connect} from 'react-redux'
import {TlaModal} from "../../commons/tla-modal";
import {useNavigate} from "react-router-dom";
import CloseModal from "../../commons/close-modal";
import Suppliers from '../../commons/form/suppliers';


function ReceivedOrdersForm (props) {
    const navigate = useNavigate()
    const { addReceivedOrder } = props
    const [form] = Form.useForm()
    const formValues = {
        id: 0,
        products: JSON.parse(localStorage.getItem('received_items')) || []
    }

    const submit = (values) => {
        addReceivedOrder(values) .then(() => {
            localStorage.removeItem('received_items')
            notification.success({
                message: 'Success',
                description: 'Received Order ' + (values.id === 0 ? 'Created' : 'Updated')
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
        <TlaModal
            width={'90%'}
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
                    <Col span={6} xs={24} sm={6} md={6}>
                        <Card>
                            <Row gutter={10}>
                                <Col span={24}>
                                    <Form.Item
                                        name="invoice_no"
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
                                <Col span={24}>
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
                                        <DatePicker
                                            size={'large'}
                                            style={{ width: '100%'}}
                                            showTime={{
                                                format: 'HH:mm',
                                            }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item
                                        name="supplier_id"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Supplier ID is Required",
                                            },
                                        ]}
                                    >
                                        <Suppliers form={form} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>
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
                            <DatePicker 
                                size={'large'} 
                                style={{ width: '100%'}}
                                showTime={{
                                    format: 'HH:mm',
                                }} 
                            />
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
                            <InputNumber style={{ width: '100%'}} size={'large'}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="supplier_id"
                            rules={[
                                {
                                    required: true,
                                    message: "Supplier ID is Required",
                                },
                            ]}
                        >
                            <Suppliers form={form} />
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
ReceivedOrdersForm.propTypes = {
    addReceivedOrder: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
    addReceivedOrder: (payload) => dispatch(handleAddNewReceivedOrders(payload)),
})

export default connect(null, mapDispatchToProps)(ReceivedOrdersForm)
