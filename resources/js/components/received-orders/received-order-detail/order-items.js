import React from 'react'
import PropTypes from 'prop-types'
import {Table} from "antd";

function OrderItems (props) {
    const { data } = props

    return (
        <Table dataSource={data} pagination={false} rowKey={'id'}>
            <Table.Column title={'#'} dataIndex={'id'}/>
            <Table.Column title={'Item'} dataIndex={'item'}/>
            <Table.Column title={'qty'} dataIndex={'qty'}/>
            <Table.Column title={'price'} dataIndex={'selling_price'}/>
            <Table.Column title={'sub Total'} dataIndex={'sub_total'}/>
        </Table>
    )
}

OrderItems.defaultProps = {
    data: []
}
OrderItems.propTypes = {
    data: PropTypes.array
}



export default OrderItems
