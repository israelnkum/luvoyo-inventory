import React, {useEffect, useState} from 'react'
import {Button, Space, Table, Typography} from 'antd'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import TlaTableWrapper from "../../commons/table/tla-table-wrapper";
import {useOutletContext} from 'react-router'
import ViewAllWrapper from "../../commons/view-all-wrapper";
<<<<<<< HEAD
import TlaImage from "../../commons/tla-image";
import TlaEdit from "../../commons/tla-edit"; 
import TlaAddNew from '../../commons/tla-add-new';
import TlaConfirm from '../../commons/TlaConfirm';
import { handleGetAllReceivedOrders } from '../../actions/receivedOrders/ReceivedOrdersAction';

=======
import {handleGetAllReceivedOrders} from '../../actions/received-orders/ReceivedOrdersAction';
import TlaPrint from "../../commons/tla-print";
import PrintReceivedOrder from "./print-received-order";
>>>>>>> 1bf0667050ecd40a247c02e9b063d13644cc79ec


const { Column } = Table
function AllReceivedOrders (props) {
<<<<<<< HEAD
    const { getRceivedOrders, receivedOrders } = props
=======
    const { getReceivedOrders, receivedOrders } = props
>>>>>>> 1bf0667050ecd40a247c02e9b063d13644cc79ec
    const { data, meta }= receivedOrders
    const [loading, setLoading] = useState(true)
    const { setPageInfo } = useOutletContext();
    useEffect(() => {
        setPageInfo({ title: 'Received Orders', addLink: '/received-orders/add', buttonText: 'Received Orders' })
<<<<<<< HEAD
        getRceivedOrders().then(() => {
=======
        getReceivedOrders().then(() => {
>>>>>>> 1bf0667050ecd40a247c02e9b063d13644cc79ec
            setLoading(false)
        })
    }, [])

    return (
        <ViewAllWrapper loading={loading} noData={data.length === 0}>
<<<<<<< HEAD
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
=======
            <PrintReceivedOrder/>
            <TlaTableWrapper callbackFunction={getReceivedOrders} data={data} meta={meta}>
                <Column title="Invoice No." dataIndex={'invoice_no'}/>
                <Column title="Date" dataIndex={'date'}/>
                <Column title="Total" dataIndex={'total'}/>
                <Column title="damaged total" dataIndex={'damaged_total'}/>
                <Column title="Items count"
                        render={({order_items}) => (
                            <Space>
                                <Typography.Text>{order_items.length}</Typography.Text>
                            </Space>
                        )}
>>>>>>> 1bf0667050ecd40a247c02e9b063d13644cc79ec
                />
                <Column title="Supplier"
                        render={({supplier}) => (
                            <Space>
                                <Typography.Text>{supplier.name}</Typography.Text>
                            </Space>
                        )}
                />
<<<<<<< HEAD
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
=======
                <Column title="Action"
                        render={(record) => (
                            <Space>
                                <Button type={'primary'}>Details</Button>
                                <TlaPrint content={<PrintReceivedOrder data={record}/>}/>
                            </Space>
                        )}
>>>>>>> 1bf0667050ecd40a247c02e9b063d13644cc79ec
                />
            </TlaTableWrapper>
        </ViewAllWrapper>
    )
}

AllReceivedOrders.propTypes = {
    pageInfo: PropTypes.object,
<<<<<<< HEAD
    getRceivedOrders: PropTypes.func,
=======
    getReceivedOrders: PropTypes.func,
>>>>>>> 1bf0667050ecd40a247c02e9b063d13644cc79ec
    receivedOrders: PropTypes.object,
}

const mapStateToProps = (state) => ({
    receivedOrders: state.receivedOrdersReducer.receivedOrders
})

const mapDispatchToProps = (dispatch) => ({
<<<<<<< HEAD
    getRceivedOrders: (payload) => dispatch(handleGetAllReceivedOrders(payload))
=======
    getReceivedOrders: (payload) => dispatch(handleGetAllReceivedOrders(payload))
>>>>>>> 1bf0667050ecd40a247c02e9b063d13644cc79ec
})

export default connect(mapStateToProps, mapDispatchToProps)(AllReceivedOrders)
