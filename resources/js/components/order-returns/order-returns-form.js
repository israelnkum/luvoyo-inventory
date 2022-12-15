import React from 'react'
import PropTypes from 'prop-types'
import {Button, Card, Col, Form, Input, InputNumber, notification, Row} from 'antd'
import {connect} from 'react-redux'
import {TlaModal} from "../../commons/tla-modal";
import {useNavigate} from "react-router-dom";
import CloseModal from "../../commons/close-modal";
import {FiTrash2} from "react-icons/fi";
import {handleAddNewOrderReturns} from "../../actions/order-returns/OrderReturnsAction";


function OrderReturnsForm (props) {
    const navigate = useNavigate()
    const { addOrderReturn } = props
    const [form] = Form.useForm()
    const formValues = {
        id: 0,
        products: JSON.parse(localStorage.getItem('dispatched_order')) || []
    }

    const submit = (values) => {
        addOrderReturn(values) .then(() => {
            localStorage.removeItem('dispatched_order')
            notification.success({
                message: 'Success',
                description: 'Return Created'
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
        <>
            <TlaModal
                width={'70%'}
                title={(formValues.id === 0 ? "New" : "Edit") + " Return"}
            >
                <Form
                    form={form}
                    onFinish={submit}
                    layout="vertical"
                    name="createStaffForm"
                    initialValues={formValues}
                >
                    <Card title={'Products'} size={'small'}>
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
                                                                           message: 'Dispatch Order Item ID',
                                                                       },
                                                                   ]}
                                                        >
                                                            <Input disabled placeholder="Product ID" />
                                                        </Form.Item>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'item']}
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
                                                            help={<small style={{ color: 'red'}}>Qty Returned</small>}
                                                            {...restField}
                                                            initialValue={0}
                                                            name={[name, 'qty_returned']}
                                                            rules={[{
                                                                required: true,
                                                                message: 'Qty',
                                                            },]}>
                                                            <InputNumber type={'number'} style={{ width: '100%' }} min={0} placeholder="Qty" />
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
                                                            const items = JSON.parse(localStorage.getItem('dispatched_order')) || []
                                                            localStorage.setItem('dispatched_order', JSON.stringify(items.filter((itm, index) => index !== name)))
                                                        }}>
                                                            <FiTrash2/>
                                                        </Button>
                                                    </Col>
                                                </React.Fragment>
                                            ))
                                        }
                                    </Row>
                                </>
                            )}
                        </Form.List>
                    </Card>
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
OrderReturnsForm.propTypes = {
    addOrderReturn: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
    addOrderReturn: (payload) => dispatch(handleAddNewOrderReturns(payload)),
})

export default connect(null, mapDispatchToProps)(OrderReturnsForm)
