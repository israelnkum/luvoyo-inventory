import React, {useEffect, useState} from 'react'
import {Button, Space, Table, Typography} from 'antd'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import TlaTableWrapper from "../../commons/table/tla-table-wrapper";
import {useOutletContext} from 'react-router'
import ViewAllWrapper from "../../commons/view-all-wrapper";
import {handleGetAllCashUps} from "../../actions/cashUps/CashUpsAction";
import TlaEdit from "../../commons/tla-edit";
import StaffName from "../../commons/staff-name";
import TlaAddNew from "../../commons/tla-add-new";
import FilterCashUp from "./filter-cash-up";

const { Column } = Table
function AllCashUps (props) {
    const { getCashUps, cashUps, filter } = props
    const { data, meta }= cashUps
    const [loading, setLoading] = useState(true)
    const { setPageInfo } = useOutletContext();
    useEffect(() => {
        setPageInfo({ title: 'Cash Ups', addLink: 'cash-ups/add', buttonText: 'Cash Up' })
        getCashUps(new URLSearchParams(filter)).then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <>
            <FilterCashUp/>
            <ViewAllWrapper loading={loading} noData={data.length === 0}>
                <TlaTableWrapper filterObj={filter} callbackFunction={getCashUps} data={data} meta={meta}>
                    <Column title="Ref ID" render={({ref_id, dispatch_order}) => (
                        <Space direction={'vertical'}>
                            <Typography.Text>{ref_id}</Typography.Text>
                            <TlaAddNew data={dispatch_order} link={'dispatch-order'}>
                                <Button type={'primary'} size={'small'}>View Order</Button>
                            </TlaAddNew>
                        </Space>
                    )}/>
                    <Column title="Employee" render={({dispatch_order}) => (
                        <StaffName name={dispatch_order.employee.name} photo={dispatch_order.employee.photo}/>
                    )}/>
                    <Column title="expected amount" dataIndex={'expected_amount'}/>
                    <Column title="received amount" dataIndex={'received_amount'}/>
                    <Column title="balance" dataIndex={'balance'}/>
                    <Column title="Actions" render={(record) => (
                        <TlaEdit data={record} icon link={'edit'}/>
                    )}/>
                </TlaTableWrapper>
            </ViewAllWrapper>
        </>
    )
}

AllCashUps.propTypes = {
    pageInfo: PropTypes.object,
    getCashUps: PropTypes.func,
    cashUps: PropTypes.object,
    filter: PropTypes.object,
}

const mapStateToProps = (state) => ({
    cashUps: state.cashUpsReducer.cashUps,
    filter: state.cashUpsReducer.filter,
})

const mapDispatchToProps = (dispatch) => ({
    getCashUps: (payload) => dispatch(handleGetAllCashUps(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllCashUps)
