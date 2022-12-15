import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Button, Col, Form, Input, InputNumber, notification, Row, Space, Typography} from 'antd'
import {connect} from 'react-redux'
import {TlaModal} from "../../commons/tla-modal";
import {useLocation, useNavigate} from "react-router-dom";
import CloseModal from "../../commons/close-modal";
import {handleAddNewCashUps, handleUpdateCashUps} from "../../actions/cashUps/CashUpsAction";
import DispatchOrders from "../../commons/form/dispatch-orders";
import moment from "moment/moment";
import AllowEditing from "../../commons/allow-editing";
import {formatAmount} from "../../utils";

function CashUpForm (props) {
    const navigate = useNavigate()
    const { addCashUps, updateCashUps } = props
    const [searchResults, setSearchResults] = useState(null)
    const [form] = Form.useForm()
    const { state } = useLocation()
    const formValues = {
        id: 0, description: '',
        ...{...state.data, date_time: state?.data ? moment(state?.data.date_time) : ''}
    }
    const [editing, setEditing] = useState(formValues.id !== 0)
    const submit = (values) => {
        const formData = new FormData()
        values.id !== 0 && formData.append('_method', 'PUT')
        for (const key in values) {
            if (Object.prototype.hasOwnProperty.call(values, key)) {
                formData.append(key, values[key])
            }
        }
        (values.id === 0 ? addCashUps(formData) : updateCashUps(formData)).then(() => {
            notification.success({
                message: 'Success',
                description: 'CashUps ' + (values.id === 0 ? 'Created' : 'Updated')
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
        <TlaModal title={(formValues.id === 0 ? 'New' : 'Edit') + ' Cash Up'}
                  extra={ formValues.id !== 0  && <AllowEditing editing={editing} setEditing={setEditing}/>}
        >
            <Form
                disabled={editing}
                form={form}
                onFinish={submit}
                layout="vertical"
                name="createCashUpForm"
                initialValues={formValues}>
                <Row gutter={[10, 10]}>
                    <Col span={24}>
                        <DispatchOrders setSearchResults={setSearchResults} displayContent={true} form={form} editing={formValues.id === 0}/>
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
                    {
                        (searchResults?.cash_up  < searchResults?.total) &&
                        <>
                            <Col span={24}>
                                <Form.Item name="received_amount" label="Received Amount"
                                           rules={[
                                               {
                                                   required: true,
                                                   message: 'Received Amount is Required'
                                               },
                                               {
                                                   min: 1,
                                                   type: 'number',
                                                   message: 'Amount is less'
                                               }, {
                                                   max: formatAmount(searchResults?.total),
                                                   type: 'number',
                                                   message: 'Amount is High'
                                               }
                                           ]}>
                                    <InputNumber type={'number'} step={0.01} style={{ width: '100%'}} size={'large'}/>
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item>
                                    <div align={'right'}>
                                        <CloseModal/>&nbsp;
                                        <Button size={'large'} type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                    </div>
                                </Form.Item>
                            </Col>
                        </>
                    }
                    {
                        (searchResults?.cash_up  >= searchResults?.total) &&
                        <Col span={24}>
                            <Space style={{justifyContent: 'space-between', display: 'flex'}}>
                                <Typography.Text type={'danger'}>CashUp already added</Typography.Text>
                                <CloseModal btnText={'Close'}/>
                            </Space>
                        </Col>
                    }
                </Row>
            </Form>
        </TlaModal>
    )
}
CashUpForm.propTypes = {
    addCashUps: PropTypes.func.isRequired,
    updateCashUps: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
    addCashUps: (payload) => dispatch(handleAddNewCashUps(payload)),
    updateCashUps: (payload) => dispatch(handleUpdateCashUps(payload))
})

export default connect(null, mapDispatchToProps)(CashUpForm)
