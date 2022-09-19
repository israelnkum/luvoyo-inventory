import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Button, Checkbox, Col, DatePicker, Form, Input, notification, Row, Select} from 'antd'
import {connect} from 'react-redux'
import {TlaModal} from "../../commons/tla-modal";
import {useLocation, useNavigate} from "react-router-dom";
import CloseModal from "../../commons/close-modal";
import ChangePicture from "../commons/change-picture";
import {handleAddEmployee, handleUpdateEmployee} from "../../actions/employee/EmployeeAction";
import moment from "moment";


function EmployeeForm (props) {
    const navigate = useNavigate()
    const [selectedFile, setSelectedFile] = useState(null)
    const { addEmployee, updateEmployee } = props
    const [form] = Form.useForm()
    const { state } = useLocation()
    const formValues = {
        id: 0,
        create_account: false,
        staff_id: null,
        ...{...state.data, dob: state?.data ? moment(state?.data.dob) : ''}
    }

    const submit = (values) => {

        const formData = new FormData()
        values.id !== 0 && formData.append('_method', 'PUT')
        formData.append('file', selectedFile);
        for (const key in values) {
            if (Object.prototype.hasOwnProperty.call(values, key)) {
                formData.append(key, values[key])
            }
        }
        (values.id === 0 ? addEmployee(formData) : updateEmployee(formData)).then(() => {
            notification.success({
                message: 'Success',
                description: 'Employee ' + (values.id === 0 ? 'Created' : 'Updated')
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
    const uploadProps = {
        beforeUpload: (file) => {
            setSelectedFile(file)
            return true
        },
        listType: 'picture-card',
        maxCount: 1,
        onRemove: () => {
            setSelectedFile(null)
        },
        accept: 'image/*',
        method: 'get'
    }

    return (
        <TlaModal title={(formValues.id === 0 ? 'New' : 'Edit') + ' Staff'}>
            <Form
                form={form}
                onFinish={submit}
                layout="vertical"
                name="createStaffForm"
                initialValues={formValues}>
                <Row gutter={10}>
                    <Col span={24}>
                        <ChangePicture uploadProps={uploadProps} selectedFile={selectedFile}/>
                    </Col>
                    {
                        formValues.id === 0 &&
                        <Col span={24}>
                            <Form.Item name="create_account" valuePropName="checked">
                                <Checkbox>Create user account</Checkbox>
                            </Form.Item>
                        </Col>
                    }
                    <Col span={8}>
                        <Form.Item name="surname" label="Surname"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Surname is Required'
                                       }
                                   ]}>
                            <Input size={'large'}/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="other_names" label="Other Names"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Surname is Required'
                                       }
                                   ]}>
                            <Input size={'large'}/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="gender" label="Gender"  rules={[
                            {
                                required: true,
                                message: 'Gender is Required'
                            }
                        ]}>
                            <Select size={'large'}>
                                <Select.Option value={'Male'}>Male</Select.Option>
                                <Select.Option value={'Female'}>Female</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="telephone" label="Mobile No."
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Mobile No. is Required'
                                       }
                                   ]}>
                            <Input size={'large'}/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="id_type" label="ID Type"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'ID Type is Required'
                                       }
                                   ]}>
                            <Select size={'large'}>
                                <Select.Option value={'ID Number'}>ID Number</Select.Option>
                                <Select.Option value={'Passport'}>Passport</Select.Option>
                                <Select.Option value={'Drivers License'}>Drivers License</Select.Option>
                                <Select.Option value={'Other'}>Other</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="id_number" label="ID Number"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'ID Number is Required'
                                       }
                                   ]}>
                            <Input size={'large'}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="dob" label="Date of Birth"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Date of Birth is Required'
                                       }
                                   ]}>
                            <DatePicker size={'large'}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="email" label="Email"
                                   rules={[
                                       {
                                           type: 'email',
                                           required: true,
                                           message: 'Email is Required'
                                       }
                                   ]}>
                            <Input size={'large'}/>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
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
                    <Col span={12}>
                        <Form.Item name="home_address" label="Home Address">
                            <Input.TextArea size={'large'}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="remarks" label="Remarks">
                            <Input.TextArea size={'large'}/>
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
EmployeeForm.propTypes = {
    addEmployee: PropTypes.func.isRequired,
    updateEmployee: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
    addEmployee: (payload) => dispatch(handleAddEmployee(payload)),
    updateEmployee: (payload) => dispatch(handleUpdateEmployee(payload))
})

export default connect(null, mapDispatchToProps)(EmployeeForm)
