import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import FilterWrapper from "../../commons/filter/filter-wrapper";
import {
    handleExportReceivedOrders,
    handleGetAllReceivedOrders
} from "../../actions/received-orders/ReceivedOrdersAction";

function FilterReceivedOrders (props) {
    const { submitFilter, filter, exportFilter } = props

    return (
        <FilterWrapper initialValue={filter} submitFilter={submitFilter} exportFilter={exportFilter}/>
    )
}

FilterReceivedOrders.propTypes = {
    submitFilter: PropTypes.func,
    exportFilter: PropTypes.func,
    filter: PropTypes.object,
}

const mapStateToProps = (state) => ({
    filter: state.suppliersReducer.filter
})

const mapDispatchToProps = (dispatch) => ({
    submitFilter: (params) => dispatch(handleGetAllReceivedOrders(params)),
    exportFilter: (search, pageNumber) => dispatch(handleExportReceivedOrders(search,pageNumber)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterReceivedOrders)
