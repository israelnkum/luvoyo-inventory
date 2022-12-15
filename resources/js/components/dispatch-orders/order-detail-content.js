import React from 'react'
import {Descriptions} from 'antd'
import PropTypes from 'prop-types'
import CashUpStatus from "../commons/cash-up-status";

function OrderDetailContent({data, cols}) {
    return (
        <Descriptions size={'small'} bordered
                      column={{
                          xxl: 2,
                          xl: cols,
                          lg: cols,
                          md: cols,
                          sm: cols,
                          xs: cols,
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


OrderDetailContent.defaultProps = {
    data: null,
    cols: 1
}

OrderDetailContent.propTypes = {
    data: PropTypes.object,
    cols: PropTypes.number,
}

export default OrderDetailContent
