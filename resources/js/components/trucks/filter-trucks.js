import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import FilterWrapper from "../../commons/filter/filter-wrapper";
import {handleExportTrucks, handleGetAllTrucks} from "../../actions/trucks/TrucksAction";

function FilterTrucks (props) {
    const { submitFilter, filter, exportFilter } = props

    return (
        <FilterWrapper initialValue={filter} submitFilter={submitFilter} exportFilter={exportFilter}/>
    )
}

FilterTrucks.propTypes = {
    submitFilter: PropTypes.func,
    exportFilter: PropTypes.func,
    filter: PropTypes.object,
}

const mapStateToProps = (state) => ({
    filter: state.trucksReducer.filter
})

const mapDispatchToProps = (dispatch) => ({
    submitFilter: (params) => dispatch(handleGetAllTrucks(params)),
    exportFilter: (params) => dispatch(handleExportTrucks(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterTrucks)
