import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import FilterWrapper from "../../commons/filter/filter-wrapper";
import {handleExportEmployees, handleGetAllEmployees} from "../../actions/employee/EmployeeAction";

function FilterEmployees (props) {
    const { submitFilter, filter, exportFilter } = props

    return (
        <FilterWrapper initialValue={filter} submitFilter={submitFilter} exportFilter={exportFilter}/>
    )
}

FilterEmployees.propTypes = {
    submitFilter: PropTypes.func,
    exportFilter: PropTypes.func,
    filter: PropTypes.object,
}

const mapStateToProps = (state) => ({
    filter: state.employeeReducer.filter
})

const mapDispatchToProps = (dispatch) => ({
    submitFilter: (params) => dispatch(handleGetAllEmployees(params)),
    exportFilter: (search, pageNumber) => dispatch(handleExportEmployees(search,pageNumber)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterEmployees)
