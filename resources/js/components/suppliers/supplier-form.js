import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Button, Col, Form, Input, notification, Row} from 'antd'
import {connect} from 'react-redux'
import {TlaModal} from "../../commons/tla-modal";
import {useLocation, useNavigate} from "react-router-dom";
import CloseModal from "../../commons/close-modal";
import {handleAddNewSuppliers, handleUpdateSuppliers} from "../../actions/suppliers/SuppliersAction";
import ChangePicture from "../commons/change-picture";
import AllowEditing from "../../commons/allow-editing";


function SupplierForm (props) {
    const navigate = useNavigate()
    const [selectedFile, setSelectedFile] = useState(null)
    const { addSuppliers, updateSuppliers } = props
    const [form] = Form.useForm()
    const { state } = useLocation()
    const formValues = {
        id: 0, description: '', ...state.data
    }
    const [editing, setEditing] = useState(formValues.id !== 0)
    const submit = (values) => {
        const formData = new FormData()
        formData.append('file', selectedFile);
        values.id !== 0 && formData.append('_method', 'PUT')
        for (const key in values) {
            if (Object.prototype.hasOwnProperty.call(values, key)) {
                formData.append(key, values[key])
            }
        }
        (values.id === 0 ? addSuppliers(formData) : updateSuppliers(formData)).then(() => {
            notification.success({
                message: 'Success',
                description: 'Supplier ' + (values.id === 0 ? 'Created' : 'Updated')
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
        <TlaModal title={(formValues.id === 0 ? 'New' : 'Edit') + ' Supplier'}
                  extra={ formValues.id !== 0  && <AllowEditing editing={editing} setEditing={setEditing}/>}>
            <Form
                form={form}
                disabled={editing}
                onFinish={submit}
                layout="vertical"
                name="createSupplierForm"
                initialValues={formValues}>
                <Row gutter={10}>
                    <Col span={24}>
                        <ChangePicture editing={editing} setSelectedFile={setSelectedFile} selectedFile={selectedFile}/>
                    </Col>
                    <Col span={24}>
                        <Form.Item name="name" label="Business Name"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Name is Required'
                                       }
                                   ]}>
                            <Input size={'large'}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="contact_person" label="Contact Person"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Contact Person is Required'
                                       }
                                   ]}>
                            <Input size={'large'}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="location" label="Location"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Location is Required'
                                       }
                                   ]}>
                            <Input size={'large'}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="phone" label="Phone"
                                   rules={[
                                       {
                                           max: 10,
                                           min: 10,
                                           required: true,
                                           message: 'Phone is Required'
                                       }
                                   ]}>
                            <Input size={'large'}/>
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
SupplierForm.propTypes = {
    addSuppliers: PropTypes.func.isRequired,
    updateSuppliers: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
    addSuppliers: (payload) => dispatch(handleAddNewSuppliers(payload)),
    updateSuppliers: (payload) => dispatch(handleUpdateSuppliers(payload))
})

export default connect(null, mapDispatchToProps)(SupplierForm)
