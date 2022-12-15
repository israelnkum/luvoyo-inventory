import React, {useEffect, useState} from 'react'
import {Button, Table} from 'antd'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import TlaTableWrapper from "../../commons/table/tla-table-wrapper";
import {useMatch, useOutletContext, useParams} from 'react-router'
import ViewAllWrapper from "../../commons/view-all-wrapper";
import {handleGetAllOrderReturns, handleGetDispatchReturnOrders} from "../../actions/order-returns/OrderReturnsAction";
import TlaAddNew from "../../commons/tla-add-new";
import FilterOrderReturns from "./filter-order-returns";

const { Column } = Table
function AllOrderReturns (props) {
    const { getDispatchOrderReturns, getAllReturnOrders, returnOrders } = props
    const match = useMatch('/return-orders')
    const { orderNumber } = useParams()
    const { data, meta }= returnOrders
    const [loading, setLoading] = useState(true)
    const { setPageInfo } = useOutletContext();

    useEffect(() => {
        setPageInfo({
            title: 'Return Orders',
            addLink: match ? null : '/dispatch-order-returns/add',
            buttonText: 'Return'
        })

        if (match){
            getAllReturnOrders().then(() => setLoading(false))
        }else {
            getDispatchOrderReturns(orderNumber).then(() => setLoading(false))
        }

    }, [])

    return (
        <>
            <FilterOrderReturns/>
            <ViewAllWrapper loading={loading} noData={data.length === 0}>
                <TlaTableWrapper callbackFunction={getDispatchOrderReturns} data={data} meta={meta}>
                    <Column title="Order No." dataIndex={['dispatch_order','order_no']}/>
                    <Column title="Item Count" render={(record) => (
                        <>{record.order_items.length}</>
                    )}/>
                    <Column title="Actions" render={(record) => (
                        <TlaAddNew data={record} link={`/dispatch-orders/${record.dispatch_order.order_no}/returns/items`}>
                            <Button>View Items</Button>
                        </TlaAddNew>
                    )}/>
                </TlaTableWrapper>
            </ViewAllWrapper>
        </>
    )
}

AllOrderReturns.propTypes = {
    pageInfo: PropTypes.object,
    getDispatchOrderReturns: PropTypes.func,
    getAllReturnOrders: PropTypes.func,
    returnOrders: PropTypes.object,
}

const mapStateToProps = (state) => ({
    returnOrders: state.returnOrdersReducer.returnOrders
})

const mapDispatchToProps = (dispatch) => ({
    getAllReturnOrders: (params) => dispatch(handleGetAllOrderReturns(params)),
    getDispatchOrderReturns: (orderNumber) => dispatch(handleGetDispatchReturnOrders(orderNumber))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllOrderReturns)
