import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import FilterWrapper from "../../commons/filter/filter-wrapper";
import {
    handleExportDispatchOrders,
    handleGetAllDispatchOrders
} from "../../actions/dispatch-orders/DisptachOrderAction";

function FilterDispatchOrders (props) {
    const { submitFilter, filter, exportFilter } = props

    return (
        <FilterWrapper initialValue={filter} submitFilter={submitFilter} exportFilter={exportFilter}/>
    )
}

FilterDispatchOrders.propTypes = {
    submitFilter: PropTypes.func,
    exportFilter: PropTypes.func,
    filter: PropTypes.object,
}

const mapStateToProps = (state) => ({
    filter: state.suppliersReducer.filter
})

const mapDispatchToProps = (dispatch) => ({
    submitFilter: (params) => dispatch(handleGetAllDispatchOrders(params)),
    exportFilter: (search, pageNumber) => dispatch(handleExportDispatchOrders(search,pageNumber)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterDispatchOrders)
