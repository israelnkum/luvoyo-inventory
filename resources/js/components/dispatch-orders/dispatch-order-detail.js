import React from 'react'
import {Descriptions} from 'antd'
import PropTypes from 'prop-types'
import CashUpStatus from "../commons/cash-up-status";

function DispatchOrderDetail({data}) {
    return (
        <Descriptions size={'small'} bordered
                      column={{
                          xxl: 2,
                          xl: 1,
                          lg: 1,
                          md: 1,
                          sm: 1,
                          xs: 1,
                      }}>
            <Descriptions.Item label="order no">{data.order_no}</Descriptions.Item>
            <Descriptions.Item label="Total">{data.total}</Descriptions.Item>
            <Descriptions.Item label="Qty">{data.qty}</Descriptions.Item>
            <Descriptions.Item label="Cash Up">
                <CashUpStatus cash_up={data.cash_up}/>
            </Descriptions.Item>
        </Descriptions>
    )
}


DispatchOrderDetail.defaultProps = {
    data: null
}

DispatchOrderDetail.propTypes = {
    data: PropTypes.object
}

export default DispatchOrderDetail
