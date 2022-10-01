import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import { useOutletContext, useParams } from "react-router";
import {Card, Col, Row} from "antd";
import OrderDetailContent from "../order-detail-content";
import OrderItems from "./order-items";

function DispatchOrderDetail({ dispatchOrders }) {
    const [order, setOrder] = useState({})
    const { orderNumber } = useParams()
    const { setPageInfo } = useOutletContext();

    useEffect(() => {
        const foundOrder = dispatchOrders.data.find((order) => order.order_no === orderNumber)
        setOrder(foundOrder)
        localStorage.setItem('dispatched_order' , JSON.stringify(foundOrder.order_items))
        setPageInfo({ title: `${orderNumber}`, modalLink: true, addLink: `/dispatch-orders/${orderNumber}/returns`, buttonText: 'Returns' })
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


DispatchOrderDetail.defaultProps = {

}

DispatchOrderDetail.propTypes = {
    dispatchOrders: PropTypes.object
}

const mapStateToProps = (state) => ({
    dispatchOrders: state.dispatchOrderReducer.dispatchOrders
})

const mapDispatchToProps = () => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(DispatchOrderDetail)
