import React, {useEffect, useState} from 'react'
import {Table, Button, Space} from 'antd'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import TlaTableWrapper from "../../commons/table/tla-table-wrapper";
import {useOutletContext} from 'react-router'
import ViewAllWrapper from "../../commons/view-all-wrapper";
import TlaImage from "../../commons/tla-image";
import TlaEdit from "../../commons/tla-edit"; 
import TlaAddNew from '../../commons/tla-add-new';
import TlaConfirm from '../../commons/TlaConfirm';
import { handleGetAllReceivedOrders } from '../../actions/receivedOrders/ReceivedOrdersAction';



const { Column } = Table
function AllReceivedOrders (props) {
    const { getRceivedOrders, receivedOrders } = props
    const { data, meta }= receivedOrders
    const [loading, setLoading] = useState(true)
    const { setPageInfo } = useOutletContext();
    useEffect(() => {
        setPageInfo({ title: 'Received Orders', addLink: '/received-orders/add', buttonText: 'Received Orders' })
        getRceivedOrders().then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <ViewAllWrapper loading={loading} noData={data.length === 0}>
            <TlaTableWrapper 
                callbackFunction={getRceivedOrders} 
                data={data} 
                meta={meta}
            >
                <Column 
                    title="Invoice No." 
                    render={({invoice_no}) => (
                        <Space size={0} direction={'vertical'}>
                        {invoice_no}
                        </Space>
                    )}
                />
                <Column 
                    title="Date" 
                    render={({date}) => (
                        <Space size={0} direction={'vertical'}>
                        {date}
                        </Space>
                    )}
                />
                <Column 
                    title="Total" 
                    dataIndex={'total'}
                />
                <Column 
                    title="Supplier ID" 
                    dataIndex={'supplier_id'}
                />
                <Column  
                    title="Action" 
                    render={() => (
                        <Space size={0}>
                            <TlaEdit icon data={{}} link={'#'} type={'text'}/>
                            <TlaConfirm title={'Received Orders'} callBack={()=>{}}/>
                        </Space>
                    )}
                />
            </TlaTableWrapper>
        </ViewAllWrapper>
    )
}

AllReceivedOrders.propTypes = {
    pageInfo: PropTypes.object,
    getRceivedOrders: PropTypes.func,
    receivedOrders: PropTypes.object,
}

const mapStateToProps = (state) => ({
    receivedOrders: state.receivedOrdersReducer.receivedOrders
})

const mapDispatchToProps = (dispatch) => ({
    getRceivedOrders: (payload) => dispatch(handleGetAllReceivedOrders(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllReceivedOrders)
