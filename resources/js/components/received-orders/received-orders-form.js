import React from 'react'
import PropTypes from 'prop-types'
<<<<<<< HEAD
import {Button, Col, Form, Input, DatePicker, notification, Row, InputNumber} from 'antd'
=======
import {Button, Card, Col, DatePicker, Form, Input, InputNumber, notification, Row} from 'antd'
>>>>>>> 1bf0667050ecd40a247c02e9b063d13644cc79ec
import {connect} from 'react-redux'
import {TlaModal} from "../../commons/tla-modal";
import {useNavigate} from "react-router-dom";
import CloseModal from "../../commons/close-modal";
<<<<<<< HEAD
import ChangePicture from "../commons/change-picture";
import {handleAddEmployee, handleUpdateEmployee} from "../../actions/employee/EmployeeAction";
import {nationalities} from "../../utils/nationalities";
import Suppliers from '../../commons/form/suppliers';
=======
import Suppliers from '../../commons/form/suppliers';
import Products from "../../commons/form/products";
import {FiTrash2} from "react-icons/fi";
import {handleAddNewReceivedOrders} from "../../actions/received-orders/ReceivedOrdersAction";
>>>>>>> 1bf0667050ecd40a247c02e9b063d13644cc79ec


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
<<<<<<< HEAD
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
=======
                    <Col span={18} xs={24} sm={18} md={18}>
                        <Card title={'Products'}>
                            <Form.List name="products">
                                {(fields, { add, remove }) => (
                                    <>
                                        <Row gutter={10}>
                                            {
                                                fields.map(({ key, name, ...restField }) => (
                                                    <React.Fragment key={key}>
                                                        <Col span={13} xs={24} sm={13} md={13} lg={13}>
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
                                                        <Col span={3} xs={12} sm={3} md={3} lg={3}>
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'qty']}
                                                                rules={[{
                                                                    required: true,
                                                                    message: 'Qty',
                                                                },]}>
                                                                <InputNumber style={{ width: '100%' }} min={1} placeholder="Qty" />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={3} xs={12} sm={3} md={3} lg={3}>
                                                            <Form.Item help={<small style={{ color: 'red'}}>Qty Damaged</small>} initialValue={0}
                                                                {...restField}
                                                                name={[name, 'qty_damaged']}>
                                                                <InputNumber style={{ width: '100%' }} min={0} placeholder="Qty Damaged" />
                                                            </Form.Item>
                                                        </Col>

                                                        <Col span={2} xs={12} sm={2} md={2} lg={2}>
                                                            <Button danger onClick={() => {
                                                                remove(name)
                                                                const items = JSON.parse(localStorage.getItem('received_items')) || []
                                                                localStorage.setItem('received_items', JSON.stringify(items.filter((itm, index) => index !== name)))
                                                            }}>
                                                                <FiTrash2/>
                                                            </Button>
                                                        </Col>
                                                    </React.Fragment>
                                                ))
                                            }
                                        </Row>

                                        <Products localKey={'received_items'} onChange={(value) =>{
                                            form.setFieldsValue({
                                                products: JSON.parse(localStorage.getItem('received_items')) || []
                                            })
                                            !value && add()
                                        }}/>
                                    </>
                                )}
                            </Form.List>
                        </Card>
>>>>>>> 1bf0667050ecd40a247c02e9b063d13644cc79ec
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
