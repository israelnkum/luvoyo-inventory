import React, {useEffect, useState} from 'react'
import {Button, Space, Table, Typography} from 'antd'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import TlaTableWrapper from "../../commons/table/tla-table-wrapper";
import {useOutletContext} from 'react-router'
import ViewAllWrapper from "../../commons/view-all-wrapper";
import {handleGetAllReceivedOrders} from '../../actions/received-orders/ReceivedOrdersAction';
import TlaPrint from "../../commons/tla-print";
import PrintReceivedOrder from "./print-received-order";
import {FiInfo} from "react-icons/fi";
import {Link} from "react-router-dom";


const { Column } = Table
function AllReceivedOrders (props) {
    const { getReceivedOrders, receivedOrders } = props
    const { data, meta }= receivedOrders
    const [loading, setLoading] = useState(true)
    const { setPageInfo } = useOutletContext();
    useEffect(() => {
        setPageInfo({ title: 'Received Orders', addLink: '/received-orders/add', buttonText: 'Received Orders' })
        getReceivedOrders().then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <ViewAllWrapper loading={loading} noData={data.length === 0}>
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
                />
                <Column title="Supplier"
                        render={({supplier}) => (
                            <Space>
                                <Typography.Text>{supplier.name}</Typography.Text>
                            </Space>
                        )}
                />
                <Column title="Action"
                        render={(record) => (
                            <Space>
                                <Link to={`${record.invoice_no}`}>
                                    <Button title={'Detail'} icon={<FiInfo/>}/>
                                </Link>
                                <TlaPrint>
                                    <PrintReceivedOrder data={record}/>
                                </TlaPrint>
                            </Space>
                        )}
                />
            </TlaTableWrapper>
        </ViewAllWrapper>
    )
}

AllReceivedOrders.propTypes = {
    pageInfo: PropTypes.object,
    getReceivedOrders: PropTypes.func,
    receivedOrders: PropTypes.object,
}

const mapStateToProps = (state) => ({
    receivedOrders: state.receivedOrdersReducer.receivedOrders
})

const mapDispatchToProps = (dispatch) => ({
    getReceivedOrders: (payload) => dispatch(handleGetAllReceivedOrders(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllReceivedOrders)
