import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import { useOutletContext, useParams } from "react-router";
import {Card, Col, Row} from "antd";
import OrderItems from "./order-items";
import OrderDetailContent from "./order-detail-content";

function ReceivedOrderDetail({ receivedOrders }) {
    const [order, setOrder] = useState({})
    const { invoiceNumber } = useParams()
    const { setPageInfo } = useOutletContext();

    useEffect(() => {
        const foundOrder = receivedOrders.data.find((order) => order.invoice_no === invoiceNumber)
        setOrder(foundOrder)
        localStorage.setItem('dispatched_order' , JSON.stringify(foundOrder.order_items))
        setPageInfo({ title: `${invoiceNumber}`, addLink: `/received-orders/add`, buttonText: 'Order' })
    }, [])
    return (
        <Row gutter={[20, 20]}>
           <Col span={24}>
               <OrderDetailContent data={order}/>
           </Col>
            <Col span={24}>
               <Card size={'small'} bordered={false} title={'ITEMS IN ORDER'}>
                   <OrderItems data={order.order_items}/>
               </Card>
           </Col>
        </Row>
    )
}


ReceivedOrderDetail.defaultProps = {

}

ReceivedOrderDetail.propTypes = {
    receivedOrders: PropTypes.object
}

const mapStateToProps = (state) => ({
    receivedOrders: state.receivedOrdersReducer.receivedOrders
})

const mapDispatchToProps = () => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ReceivedOrderDetail)
