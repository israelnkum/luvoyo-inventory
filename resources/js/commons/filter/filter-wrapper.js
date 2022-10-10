import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Button, Card, Form, Input, Space} from "antd";
import {FiPrinter} from "react-icons/fi";

function FilterWrapper (props) {
    const { submitFilter, exportFilter, children, initialValue } = props
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()

    const onFinish = (values) => {
        setLoading(true)
        values.export = false
        values.print = false
        submitFilter(new URLSearchParams(values)).then(() =>  setLoading(false))
    }

    const completeExport = (values) => {
        setLoading(true)
        exportFilter(new URLSearchParams(values)).then(() =>  setLoading(false))
    }

    return (
        <Card
            extra={[
                <Button style={{ background: "darkgreen", color: "white", borderColor: "darkgreen" }} key={'export'} loading={loading} onClick={() => {
                    form.setFieldsValue({export: true, print: false })
                    completeExport(form.getFieldsValue())
                }}>
                    Export
                </Button>,
                <Button style={{ marginLeft: 5 }} icon={<FiPrinter/>} key={'print'} danger loading={loading} onClick={() => {
                    form.setFieldsValue({print: true, export: false})
                    completeExport(form.getFieldsValue())
                }}>
                    &nbsp;Print
                </Button>
            ]}
            size={'small'}
        >

            <Form form={form} onFinish={onFinish} layout={'vertical'} initialValues={{ ...initialValue, export: false}}>
                <Form.Item hidden name="export" label="export">
                    <Input/>
                </Form.Item>
                <Form.Item hidden name="print" label="print">
                    <Input/>
                </Form.Item>
                {
                    children &&
                    <Space align={'center'} wrap>
                        {children}
                        <div>
                            <Button loading={loading} htmlType={'submit'} type={'primary'}>Filter</Button>
                        </div>
                    </Space>
                }

            </Form>
        </Card>
    )
}

FilterWrapper.propTypes = {
    submitFilter: PropTypes.func,
    exportFilter: PropTypes.func,
    children: PropTypes.any,
    initialValue: PropTypes.object,
}


export default (FilterWrapper)
