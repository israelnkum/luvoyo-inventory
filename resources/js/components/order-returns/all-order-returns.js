import React, {useEffect, useState} from 'react'
import {Button, Col, Row, Space, Table} from 'antd'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import TlaTableWrapper from "../../commons/table/tla-table-wrapper";
import {useOutletContext} from 'react-router'
import ViewAllWrapper from "../../commons/view-all-wrapper";
import TlaEdit from "../../commons/tla-edit";
import {handleGetAllOrderReturns} from "../../actions/order-returns/OrderReturnsAction";
import TlaAddNew from "../../commons/tla-add-new";

const { Column } = Table
function AllOrderReturns (props) {
    const { getReturnOrders, returnOrders } = props
    const [colSize, setColSize] = useState(24)
    const { data, meta }= returnOrders
    const [loading, setLoading] = useState(true)
    const { setPageInfo } = useOutletContext();
    useEffect(() => {
        setPageInfo({ title: 'Dispatch Order Return', addLink: '/dispatch-order-returns/add', buttonText: 'Return' })
        getReturnOrders().then(() => {
            setLoading(false)
        })
    }, [])


    return (
        <ViewAllWrapper loading={loading} noData={data.length === 0}>
            <TlaTableWrapper callbackFunction={getReturnOrders} data={data} meta={meta}>
                <Column title="Order No." dataIndex={['dispatch_order','order_no']}/>
                <Column title="Total Items" render={(record) => (
                    <>{record.order_items.length}</>
                )}/>
                <Column title="Actions" render={(record) => (
                   /* <TlaEdit data={record} link={`/dispatch-orders/${record.dispatch_order.order_no}/returns/items`}>
                        <Button>View Items</Button>
                    </TlaEdit>*/
                   <TlaAddNew data={record} link={`/dispatch-orders/${record.dispatch_order.order_no}/returns/items`}>
                       <Button>View Items</Button>
                   </TlaAddNew>
                )}/>
            </TlaTableWrapper>
        </ViewAllWrapper>
    )
}

AllOrderReturns.propTypes = {
    pageInfo: PropTypes.object,
    getReturnOrders: PropTypes.func,
    returnOrders: PropTypes.object,
}

const mapStateToProps = (state) => ({
    returnOrders: state.returnOrdersReducer.returnOrders
})

const mapDispatchToProps = (dispatch) => ({
    getReturnOrders: (payload) => dispatch(handleGetAllOrderReturns(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllOrderReturns)
