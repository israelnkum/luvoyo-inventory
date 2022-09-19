import React, {useEffect, useState} from 'react'
import {Space, Table, Typography} from 'antd'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import TlaTableWrapper from "../../commons/table/tla-table-wrapper";
import {useOutletContext} from 'react-router'
import ViewAllWrapper from "../../commons/view-all-wrapper";
import {handleGetAllCashUps} from "../../actions/cashUps/CashUpsAction";
import TlaEdit from "../../commons/tla-edit";
import TlaImage from "../../commons/tla-image";
import StaffName from "../../commons/staff-name";

const { Column } = Table
function AllCashUps (props) {
    const { getCashUps, cashUps } = props
    const { data, meta }= cashUps
    const [loading, setLoading] = useState(true)
    const { setPageInfo } = useOutletContext();
    useEffect(() => {
        setPageInfo({ title: 'CashUps', addLink: 'cash-ups/add', buttonText: 'CashUps' })
        getCashUps().then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <ViewAllWrapper loading={loading} noData={data.length === 0}>
            <TlaTableWrapper callbackFunction={getCashUps} data={data} meta={meta}>
                <Column title="Ref ID" dataIndex={'ref_id'}/>
                <Column title="truck code" dataIndex={['truck','truck_code']}/>
                <Column title="Employee" render={({employee}) => (
                   <StaffName name={employee.name} photo={employee.photo}/>
                )}/>
                <Column title="expected amount" dataIndex={'expected_amount'}/>
                <Column title="received amount" dataIndex={'received_amount'}/>
                <Column title="balance" dataIndex={'balance'}/>
                <Column title="Description" dataIndex={'description'}/>
                <Column title="Actions" render={(record) => (
                    <TlaEdit data={record} icon link={'edit'}/>
                )}/>
            </TlaTableWrapper>
        </ViewAllWrapper>
    )
}

AllCashUps.propTypes = {
    pageInfo: PropTypes.object,
    getCashUps: PropTypes.func,
    cashUps: PropTypes.object,
}

const mapStateToProps = (state) => ({
    cashUps: state.cashUpsReducer.cashUps
})

const mapDispatchToProps = (dispatch) => ({
    getCashUps: (payload) => dispatch(handleGetAllCashUps(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllCashUps)
