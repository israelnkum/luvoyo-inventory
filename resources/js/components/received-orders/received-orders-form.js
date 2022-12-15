import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Button, Card, Col, DatePicker, Form, Input, InputNumber, notification, Row} from 'antd'
import {connect} from 'react-redux'
import {TlaModal} from "../../commons/tla-modal";
import {useNavigate} from "react-router-dom";
import CloseModal from "../../commons/close-modal";
import Suppliers from '../../commons/form/suppliers';
import Products from "../../commons/form/products";
import {FiTrash2} from "react-icons/fi";
import {handleAddNewReceivedOrders} from "../../actions/received-orders/ReceivedOrdersAction";
import PrintReceivedOrder from "./print-received-order";
import TlaPrint from "../../commons/tla-print";


function ReceivedOrdersForm (props) {
    const navigate = useNavigate()
    const [printData, setPrintData] = useState(null)
    const { addReceivedOrder } = props
    const [form] = Form.useForm()
    const formValues = {
        id: 0,
        products: JSON.parse(localStorage.getItem('received_items')) || []
    }

    const submit = (values) => {
        addReceivedOrder(values) .then((res) => {
            localStorage.removeItem('received_items')
            notification.success({
                message: 'Success',
                description: 'Received OrderCreated'
            })
            setPrintData(res.data)
            form.resetFields()
            navigate(-1)
        }).catch((error) => {
            notification.warning({
                message: 'Warning',
                description: error.response.data.message
            })
        })
    }

    const onFieldsChange = (changedFields, allFields) => {
        const allItems =  JSON.parse(localStorage.getItem('received_items')) || []
        const {name, value} = changedFields[0]
        const item = allItems[name[1]]
        if (item !== undefined){
            item[name[2]] = value
        }

        localStorage.setItem('received_items', JSON.stringify(allItems))
    }

    return (
        <>
            {
                printData !== null &&
                <TlaPrint printOnMount={true}>
                    <PrintReceivedOrder data={printData}/>
                </TlaPrint>
            }

            <TlaModal
                width={'90%'}
                title={(formValues.id === 0 ? "New" : "Edit") + " Received Order"}
            >
                <Form
                    onFieldsChange={onFieldsChange}
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
                                        <Suppliers form={form} />
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
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
                                                                    <InputNumber type={'number'} style={{ width: '100%' }} min={1} placeholder="Qty" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col span={3} xs={12} sm={3} md={3} lg={3}>
                                                                <Form.Item help={<small style={{ color: 'red'}}>Qty Damaged</small>} initialValue={0}
                                                                           {...restField}
                                                                           name={[name, 'qty_damaged']}>
                                                                    <InputNumber type={'number'} style={{ width: '100%' }} min={0} placeholder="Qty Damaged" />
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
        </>
    );
}
ReceivedOrdersForm.propTypes = {
    addReceivedOrder: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
    addReceivedOrder: (payload) => dispatch(handleAddNewReceivedOrders(payload)),
})

export default connect(null, mapDispatchToProps)(ReceivedOrdersForm)
