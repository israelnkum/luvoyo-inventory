import React from 'react'
import {Descriptions} from 'antd'
import PropTypes from 'prop-types'

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
            <Descriptions.Item label="invoice no">{data.invoice_no}</Descriptions.Item>
            <Descriptions.Item label="Total">R{data.total - data.damaged_total}</Descriptions.Item>

            {/*<Descriptions.Item label="Qty">{data.order_items.length}</Descriptions.Item>
            <Descriptions.Item label="Supplier">{data.supplier.name}</Descriptions.Item>*/}
            <Descriptions.Item label="damaged total">R{data.damaged_total}</Descriptions.Item>
            <Descriptions.Item label="date">{data.date}</Descriptions.Item>
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
