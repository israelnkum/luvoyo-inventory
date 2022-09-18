import React from 'react'
import PropTypes from 'prop-types'
import {Button, Card, Col, DatePicker, Form, Input, notification, Row, Select, Space, TimePicker} from 'antd'
import {connect} from 'react-redux'
import {TlaModal} from "../../commons/tla-modal";
import {useLocation, useNavigate} from "react-router-dom";
import CloseModal from "../../commons/close-modal";
import {handleAddDispatchOrder, handleUpdateDispatchOrder} from "../../actions/dispatch-orders/DisptachOrderAction";
import moment from "moment";
import Products from "../../commons/form/products";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";


function DispatchOrderForm (props) {
    const navigate = useNavigate()
    const { addDispatchOrder, updateDispatchOrder } = props
    const [form] = Form.useForm()
    const { state } = useLocation()
    const formValues = {
        id: 0,
        staff_id: null,
        ...{...state.data, dob: state?.data ? moment(state?.data.dob) : ''}
    }

    const submit = (values) => {
        console.log(values)
      /*  const formData = new FormData()
        values.id !== 0 && formData.append('_method', 'PUT')

        for (const key in values) {
            if (Object.prototype.hasOwnProperty.call(values, key)) {
                formData.append(key, values[key])
            }
        }
        (values.id === 0 ? addDispatchOrder(formData) : updateDispatchOrder(formData)).then(() => {
            notification.success({
                message: 'Success',
                description: 'Dispatch Order ' + (values.id === 0 ? 'Created' : 'Updated')
            })
            form.resetFields()
            navigate(-1)
        }).catch((error) => {
            notification.warning({
                message: 'Warning',
                description: error.response.data.message
            })
        })*/
    }

    return (
        <TlaModal width={'90%'} title={(formValues.id === 0 ? 'New' : 'Edit') + ' Dispatch Order'}>
            <Form
                form={form}
                onFinish={submit}
                layout="vertical"
                name="createDispatchOrderForm"
                initialValues={formValues}>
                <Row gutter={10}>
                    <Col span={8} xs={24} sm={8} md={8}>
                        <Card>
                            <Row gutter={10}>
                                <Col span={24}>
                                    <Form.Item name="truck_id" label="Truck"  rules={[
                                        {
                                            required: true,
                                            message: 'Truck is Required'
                                        }
                                    ]}>
                                        <Select size={'large'}>
                                            <Select.Option value={'Male'}>Male</Select.Option>
                                            <Select.Option value={'Female'}>Female</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item name="employee_id" label="Employee"  rules={[
                                        {
                                            required: true,
                                            message: 'Employee is Required'
                                        }
                                    ]}>
                                        <Select size={'large'}>
                                            <Select.Option value={'Male'}>Male</Select.Option>
                                            <Select.Option value={'Female'}>Female</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item name="dispatch_date" label="Dispatch Date"
                                               rules={[
                                                   {
                                                       required: true,
                                                       message: 'Date of Birth is Required'
                                                   }
                                               ]}>
                                        <DatePicker size={'large'}  style={{ width: '100%' }}/>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="dispatch_time" label="Dispatch Time"
                                               rules={[
                                                   {
                                                       required: true,
                                                       message: 'Dispatch Time is Required'
                                                   }
                                               ]}>
                                        <TimePicker format={'hh:mm'} size={'large'}  style={{ width: '100%' }}/>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="return_time" label="Return Time"
                                               rules={[
                                                   {
                                                       required: true,
                                                       message: 'Return Time is Required'
                                                   }
                                               ]}>
                                        <TimePicker format={'hh:mm'} size={'large'} style={{ width: '100%' }}/>
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
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
                        </Card>
                    </Col>
                    <Col span={16} xs={24} sm={16} md={16}>
                        <Card>
                            <Form.List name="products">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => (
                                            <Space
                                                key={key}
                                                style={{
                                                    display: 'flex',
                                                    marginBottom: 8,
                                                }}
                                                align="baseline"
                                            >
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'name']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Product Name',
                                                        },
                                                    ]}
                                                >
                                                    <Input placeholder="Product Name" />
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'qty']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Qty',
                                                        },
                                                    ]}
                                                >
                                                    <Input placeholder="Qty" />
                                                </Form.Item>
                                                <MinusCircleOutlined onClick={() => remove(name)} />
                                            </Space>
                                        ))}
                                        <Products onChange={(value) => add(value)}/>
                                    </>
                                )}
                            </Form.List>
                        </Card>
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
DispatchOrderForm.propTypes = {
    addDispatchOrder: PropTypes.func.isRequired,
    updateDispatchOrder: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
    addDispatchOrder: (payload) => dispatch(handleAddDispatchOrder(payload)),
    updateDispatchOrder: (payload) => dispatch(handleUpdateDispatchOrder(payload)),
})

export default connect(null, mapDispatchToProps)(DispatchOrderForm)
