import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {Button, Col, DatePicker, Form, Row} from "antd";
import PropTypes from "prop-types";

function Filter (props) {
    const { callback, setLoading } = props
    const onFinish = (values) => {
        setLoading(true)
        callback(values).then(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        setLoading(true)
        callback({}).then(() => {
            setLoading(false)
        })
    }, [])
    const [form] = Form.useForm()
    return (
        <Form onFinish={onFinish}
              form={form}>
            <Row justify={'center'} gutter={[5,0]}>
                <Col span={14} xs={18} sm={24} md={14} lg={14}>
                    <Form.Item rules={[
                        {
                            required: true,
                            message: 'Required'
                        }
                    ]} name={'range'}>
                        <DatePicker.RangePicker />
                    </Form.Item>
                </Col>
                <Col span={2} xs={24} sm={24} md={2} lg={2}>
                    <Button htmlType={"submit"} type={'primary'}>Filter</Button>
                </Col>
            </Row>
        </Form>
    )
}

Filter.propTypes = {
    callback: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired,
}

export default connect()(Filter)
