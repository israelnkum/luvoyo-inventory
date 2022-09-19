import React, {useEffect, useState} from 'react'
import {Space, Table, Typography} from 'antd'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import TlaTableWrapper from "../../commons/table/tla-table-wrapper";
import {useOutletContext} from 'react-router'
import ViewAllWrapper from "../../commons/view-all-wrapper";
import TlaImage from "../../commons/tla-image";
import TlaEdit from "../../commons/tla-edit";
import {handleGetAllDispatchOrders} from "../../actions/dispatch-orders/DisptachOrderAction";

const { Column } = Table
function AllDispatchOrders (props) {
    const { getDispatchOrders, dispatchOrders } = props
    const { data, meta }= dispatchOrders
    const [loading, setLoading] = useState(true)
    const { setPageInfo } = useOutletContext();
    useEffect(() => {
        setPageInfo({ title: 'Dispatch Orders', addLink: '/dispatch-orders/add', buttonText: 'Dispatch Order' })
        getDispatchOrders().then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <ViewAllWrapper loading={loading} noData={data.length === 0}>
            <TlaTableWrapper callbackFunction={getDispatchOrders} data={data} meta={meta}>
                <Column title="Order No." dataIndex={'order_no'}/>
                <Column title="Truck" render={({truck}) => (
                    <Typography.Text>{truck.truck_code}</Typography.Text>
                )}/>
                <Column title="Total" dataIndex={'total'}/>
                <Column title="Qty" dataIndex={'qty'}/>
                <Column title="Dispatch Date" dataIndex={'date_time'}/>
                <Column title="Return time" dataIndex={'return_time'}/>
                <Column title="Staff" render={({employee}) => (
                   <Space wrap>
                       <TlaImage size={30} preview={true} src={employee.photo} name={employee.name}/>
                       <Typography.Text>{employee.name}</Typography.Text>
                   </Space>
                )}/>
                <Column title="Actions" render={(record) => (
                    <TlaEdit data={record} icon link={'edit'}/>
                )}/>
            </TlaTableWrapper>
        </ViewAllWrapper>
    )
}

AllDispatchOrders.propTypes = {
    pageInfo: PropTypes.object,
    getDispatchOrders: PropTypes.func,
    dispatchOrders: PropTypes.object,
}

const mapStateToProps = (state) => ({
    dispatchOrders: state.dispatchOrderReducer.dispatchOrders
})

const mapDispatchToProps = (dispatch) => ({
    getDispatchOrders: (payload) => dispatch(handleGetAllDispatchOrders(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllDispatchOrders)
