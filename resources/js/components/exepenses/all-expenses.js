import React, {useEffect, useState} from 'react'
import {Table} from 'antd'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import TlaTableWrapper from "../../commons/table/tla-table-wrapper";
import {useOutletContext} from 'react-router'
import ViewAllWrapper from "../../commons/view-all-wrapper";
import {handleGetAllExpenses} from "../../actions/expenses/ExpensesAction";

const { Column } = Table
function AllExpenses (props) {
    const { getExpenses, expenses } = props
    const { data, meta }= expenses
    const [loading, setLoading] = useState(true)
    const { setPageInfo } = useOutletContext();
    useEffect(() => {
        setPageInfo({ title: 'Expenses', addLink: 'expenses/add', buttonText: 'Expenses' })
        getExpenses().then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <ViewAllWrapper loading={loading} noData={data.length === 0}>
            <TlaTableWrapper callbackFunction={getExpenses} data={data} meta={meta}>
                <Column title="Transaction No." dataIndex={'transaction_no'}/>
                <Column title="Category" dataIndex={'category'}/>
                <Column title="Date Time" dataIndex={'date_time'}/>
                <Column title="Amount" dataIndex={'amount'}/>
                <Column title="description" dataIndex={'description'}/>
            </TlaTableWrapper>
        </ViewAllWrapper>
    )
}

AllExpenses.propTypes = {
    pageInfo: PropTypes.object,
    getExpenses: PropTypes.func,
    expenses: PropTypes.object,
}

const mapStateToProps = (state) => ({
    expenses: state.expensesReducer.expenses
})

const mapDispatchToProps = (dispatch) => ({
    getExpenses: (pageNumber) => dispatch(handleGetAllExpenses(pageNumber))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllExpenses)
