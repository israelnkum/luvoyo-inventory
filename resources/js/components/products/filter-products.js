import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import FilterWrapper from "../../commons/filter/filter-wrapper";
import {handleExportProducts, handleGetAllProducts} from "../../actions/products/ProductAction";

function FilterProducts (props) {
    const { submitFilter, filter, exportFilter } = props

    return (
        <FilterWrapper initialValue={filter} submitFilter={submitFilter} exportFilter={exportFilter}/>
    )
}

FilterProducts.propTypes = {
    submitFilter: PropTypes.func,
    exportFilter: PropTypes.func,
    filter: PropTypes.object,
}

const mapStateToProps = (state) => ({
    filter: state.productReducer.filter
})

const mapDispatchToProps = (dispatch) => ({
    submitFilter: (params) => dispatch(handleGetAllProducts(params)),
    exportFilter: (search, pageNumber) => dispatch(handleExportProducts(search,pageNumber)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterProducts)
