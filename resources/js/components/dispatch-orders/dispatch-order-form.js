import React from 'react'
import PropTypes from 'prop-types'
import {Button, Card, Col, DatePicker, Form, Input, InputNumber, notification, Row} from 'antd'
import {connect} from 'react-redux'
import {TlaModal} from "../../commons/tla-modal";
import {useNavigate} from "react-router-dom";
import CloseModal from "../../commons/close-modal";
import {handleAddDispatchOrder, handleUpdateDispatchOrder} from "../../actions/dispatch-orders/DisptachOrderAction";
import Products from "../../commons/form/products";
import Trucks from "../../commons/form/trucks";
import Employees from "../../commons/form/employees";
import moment from "moment/moment";


function DispatchOrderForm (props) {
    const navigate = useNavigate()
    const { addDispatchOrder, updateDispatchOrder } = props
    const [form] = Form.useForm()
    const formValues = {
        id: 0,
        dispatch_date: moment(),
        products: JSON.parse(localStorage.getItem('items')) || []
    }

    const submit = (values) => {
        if (values.id !== 0){
            values._method = 'PUT'
        }
        (values.id === 0 ? addDispatchOrder(values) : updateDispatchOrder(values)).then(() => {
            localStorage.removeItem('items')
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
        })
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
                                    <Trucks form={form}/>
                                </Col>
                                <Col span={24}>
                                    <Employees form={form}/>
                                </Col>
                                <Col span={24}>
                                    <Form.Item name="dispatch_date" label="Dispatch Date"
                                               rules={[
                                                   {
                                                       required: true,
                                                       message: 'Date of Birth is Required'
                                                   }
                                               ]}>
                                        <DatePicker disabled size={'large'}  style={{ width: '100%' }}/>
                                    </Form.Item>
                                </Col>
                                {/*<Col span={12} xs={24} sm={24} md={12} lg={12}>
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
                                <Col span={12} xs={24} sm={24} md={12} lg={12}>
                                    <Form.Item name="return_time" label="Return Time"
                                               rules={[
                                                   {
                                                       required: true,
                                                       message: 'Return Time is Required'
                                                   }
                                               ]}>
                                        <TimePicker format={'hh:mm'} size={'large'} style={{ width: '100%' }}/>
                                    </Form.Item>
                                </Col>*/}
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
                        <Card title={'Products'}>
                            <Form.List name="products">
                                {(fields, { add, remove }) => (
                                    <>
                                        <Row gutter={10}>
                                            {
                                                fields.map(({ key, name, ...restField }) => (
                                                    <React.Fragment key={key}>
                                                        <Col span={16} xs={24} sm={16} md={16} lg={16}>
                                                            <Form.Item hidden
                                                                       {...restField}
                                                                       name={[name, 'id']}
                                                                       rules={[
                                                                           {
                                                                               required: true,
                                                                               message: 'Product ID',
                                                                           },
                                                                       ]}
                                                            >
                                                                <Input disabled placeholder="Product ID" />
                                                            </Form.Item>
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
                                                                <Input disabled placeholder="Product Name" />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={4} xs={12} sm={4} md={4} lg={4}>
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'qty']}
                                                                rules={[{
                                                                    required: true,
                                                                    message: 'Qty',
                                                                },]}>
                                                                <InputNumber style={{ width: '100%' }} min={1} placeholder="Qty" />
                                                            </Form.Item>
                                                            <Form.Item
                                                                {...restField}
                                                                hidden
                                                                name={[name, 'selling_price']}
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: 'Cost Price',
                                                                    },
                                                                ]}
                                                            >
                                                                <InputNumber style={{ width: '100%' }} min={1} placeholder="Cost Price" />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={4} xs={12} sm={4} md={4} lg={4}>
                                                            <Button danger onClick={() => {
                                                                remove(name)
                                                                const items = JSON.parse(localStorage.getItem('items')) || []
                                                                localStorage.setItem('items', JSON.stringify(items.filter((itm, index) => index !== name)))
                                                            }}>
                                                                Remove
                                                            </Button>
                                                        </Col>
                                                    </React.Fragment>
                                                ))
                                            }
                                        </Row>
                                        <Products localKey={'items'} onChange={(value) =>{
                                            form.setFieldsValue({
                                                products: JSON.parse(localStorage.getItem('items')) || []
                                            })
                                            !value && add()
                                        }}/>
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
