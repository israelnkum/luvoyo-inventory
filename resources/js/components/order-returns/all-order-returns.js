import React, {useEffect, useState} from 'react'
import {Space, Table} from 'antd'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import TlaTableWrapper from "../../commons/table/tla-table-wrapper";
import {useOutletContext} from 'react-router'
import ViewAllWrapper from "../../commons/view-all-wrapper";
import TlaEdit from "../../commons/tla-edit";
import StaffName from "../../commons/staff-name";
import CashUpStatus from "../commons/cash-up-status";
import {handleGetAllOrderReturns} from "../../actions/order-returns/ReceivedOrdersAction";

const { Column } = Table
function AllOrderReturns (props) {
    const { getReturnOrders, returnOrders } = props
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
                <Column title="Order No." dataIndex={'order_no'}/>
                <Column title="Truck" dataIndex={['truck', 'truck_code']}/>
                <Column title="Cash Up" render={({cash_up}) => (
                    <CashUpStatus cash_up={cash_up}/>
                )}/>
                <Column title="Total" dataIndex={'total'}/>
                <Column title="Qty" dataIndex={'qty'}/>
                <Column title="Dispatch Date" dataIndex={'date_time'}/>
                <Column title="Return time" dataIndex={'return_time'}/>
                <Column title="Staff" render={({employee}) => (
                    <StaffName name={employee.name} photo={employee.photo}/>
                )}/>
                <Column title="Actions" render={(record) => (
                    <Space>
                        <TlaEdit type={'default'} data={record} icon link={'edit'}/>
                        {/*<TlaPrint>*/}
                        {/*    <PrintReturnOrder data={record}/>*/}
                        {/*</TlaPrint>*/}
                    </Space>
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
