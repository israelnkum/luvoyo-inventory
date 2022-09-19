import React from 'react'
import PropTypes from 'prop-types'
import {Button, Col, Form, Input, notification, Row} from 'antd'
import {connect} from 'react-redux'
import {TlaModal} from "../../commons/tla-modal";
import {useLocation, useNavigate} from "react-router-dom";
import CloseModal from "../../commons/close-modal";
import {handleAddProduct, handleUpdateProduct} from "../../actions/products/ProductAction";
import Suppliers from "../../commons/form/suppliers";


function ProductsForm (props) {
    const navigate = useNavigate()
    const { addProduct, updateProduct } = props
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
        (values.id === 0 ? addProduct(formData) : updateProduct(formData)).then(() => {
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
    return (
        <TlaModal
            title={(formValues.id === 0 ? "New" : "Edit") + " Product"}
        >
            <Form
                form={form}
                onFinish={submit}
                layout="vertical"
                name="createStaffForm"
                initialValues={formValues}
            >
                <Row gutter={10}>
                    <Col span={24}>
                        <Form.Item
                            name="name"
                            label="Item Name"
                            rules={[
                                {
                                    required: true,
                                    message: "Item Name is Required",
                                },
                            ]}
                        >
                            <Input size={'large'} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="selling_price"
                            label="Selling Price"
                            rules={[
                                {
                                    required: true,
                                    message: "Selling Price is Required",
                                },
                            ]}
                        >
                            <Input size={"large"} type='number' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="cost_price"
                            label="Cost Price"
                            rules={[
                                {
                                    required: true,
                                    message: "Cost Price is Required",
                                },
                            ]}
                        >
                            <Input size={"large"} type='number' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="quantity"
                            label="Quantity"
                            rules={[
                                {
                                    required: true,
                                    message: "Quantity is Required",
                                },
                            ]}
                        >
                            <Input size={"large"} type='number' />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="brand"
                            label="Brand"
                            rules={[
                                {
                                    required: true,
                                    message: "Item Brand is Required",
                                },
                            ]}
                        >
                            <Input size={"large"} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Suppliers/>
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
ProductsForm.propTypes = {
    addProduct: PropTypes.func.isRequired,
    updateProduct: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
    addProduct: (payload) => dispatch(handleAddProduct(payload)),
    updateProduct: (payload) => dispatch(handleUpdateProduct(payload))
})

export default connect(null, mapDispatchToProps)(ProductsForm)
