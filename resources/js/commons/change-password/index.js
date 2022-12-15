import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Button, Card, Col, Form, Input, message, Row, Spin} from 'antd'
import {handleChangePassword} from '../../actions/users/UserAction'
import {useNavigate} from "react-router-dom";

const ChangePassword = (props) => {
    const { changePassword } = props
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const [form] = Form.useForm()
    const [, forceUpdate] = useState({})
    const onFinish = (values) => {
        setLoading(true)
        changePassword(values).then(() => {
            message.success('Password Changed Successfully')
            navigate('/home')
        }).catch((err) => {
            message.error(err.response.data.message)
            setLoading(false)
        })
    }
    useEffect(() => {
        forceUpdate({})
    }, [])
    return (
        <Row justify={'center'} align={'middle'} style={{ height: '100vh' }}>
            <Col span={10} sm={24} xs={24} md={10} lg={10} xl={10}>
                <Card title={'Change Password'}>
                    <Spin spinning={loading}>
                        <Form
                            labelCol={{
                                span: 8
                            }}
                            wrapperCol={{
                                span: 16
                            }}
                            form={form}
                            name="basic"
                            onFinish={onFinish}
                        >
                            <Row>
                                <Col span={24}>
                                    <Form.Item
                                        hasFeedback
                                        label="Current Password"
                                        name="currentPassword"
                                        rules={[{ required: true, message: 'Current password is required!' }]}
                                    >
                                        <Input.Password />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item
                                        hasFeedback
                                        label="New Password"
                                        name="password"
                                        rules={[{ required: true, message: 'New password is required!' }]}
                                    >
                                        <Input.Password />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item
                                        name="password_confirmation"
                                        label="Confirm Password"
                                        dependencies={['password']}
                                        hasFeedback
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please confirm your password!'
                                            },
                                            ({ getFieldValue }) => ({
                                                validator (_, value) {
                                                    if (!value || getFieldValue('password') === value) {
                                                        return Promise.resolve()
                                                    }
                                                    return Promise.reject(new Error('Passwords mismatch!'))
                                                }
                                            })
                                        ]}
                                    >
                                        <Input.Password />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item
                                        wrapperCol={{
                                            offset: 8,
                                            span: 16
                                        }}
                                        shouldUpdate>
                                        {() => (
                                            <Button
                                                loading={loading}
                                                block
                                                type="primary"
                                                htmlType="submit"
                                                disabled={
                                                    !form.isFieldsTouched(true) ||
                                                    !!form.getFieldsError().filter(({ errors }) => errors.length).length
                                                }
                                            >
                                                Change Password
                                            </Button>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Spin>
                </Card>
            </Col>
        </Row>
    )
}

ChangePassword.propTypes = {
    changePassword: PropTypes.func.isRequired,
    authUser: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        authUser: state.userReducer.loggedInUser
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changePassword: (data) => dispatch(handleChangePassword(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
