import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {handleExportExpenses, handleGetAllExpenses} from "../../actions/expenses/ExpensesAction";
import {Button, Card, DatePicker, Form, Input, Select, Space} from "antd";
import {expensesCategories} from "../../utils";
import moment from "moment";

function FilterExpenses (props) {
    const { submitFilter, filter, exportFilter } = props
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()

    const formatDate = filter.date.split(',')
    const initials = {...filter,
        date: formatDate.length === 1 ? null : [
            moment(formatDate[0]),
            moment(formatDate[1]),
        ], export: false}

    const onFinish = (values) => {
        setLoading(true)
        values.export = false
        submitFilter(new URLSearchParams(values)).then(() =>  setLoading(false))
    }

    const completeExport = (values) => {
        setLoading(true)
        exportFilter(new URLSearchParams(values)).then(() =>  setLoading(false))
    }

    return (
        <Card
            extra={<Button loading={loading} onClick={() => {
                form.setFieldsValue({export: true})
                completeExport(form.getFieldsValue())
            }}>Export</Button>}
            size={'small'}
        >
            <Form form={form} onFinish={onFinish} layout={'vertical'} initialValues={initials}>
                <Space align={'center'} wrap>
                    <div>
                        <Form.Item name="date" label="Date">
                            <DatePicker.RangePicker />
                        </Form.Item>
                    </div>
                    <div style={{ width: 220 }}>
                        <Form.Item name="category" label="Category">
                            <Select placeholder={'Select Category'}>
                                <Select.Option value={'all'}>All</Select.Option>
                                {expensesCategories.map((expenses, index) => (
                                    <Select.Option key={index} value={expenses}>{expenses}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item hidden name="export" label="export">
                            <Input/>
                        </Form.Item>
                    </div>
                    <div>
                        <Button loading={loading} htmlType={'submit'} type={'primary'}>Filter</Button>
                    </div>
                </Space>
            </Form>
        </Card>
    )
}

FilterExpenses.propTypes = {
    submitFilter: PropTypes.func,
    exportFilter: PropTypes.func,
    filter: PropTypes.object,
}

const mapStateToProps = (state) => ({
    filter: state.expensesReducer.filter
})

const mapDispatchToProps = (dispatch) => ({
    submitFilter: (search, pageNumber) => dispatch(handleGetAllExpenses(search,pageNumber)),
    exportFilter: (search, pageNumber) => dispatch(handleExportExpenses(search,pageNumber)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterExpenses)
