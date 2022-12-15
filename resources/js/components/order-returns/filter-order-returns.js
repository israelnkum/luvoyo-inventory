import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import { DatePicker, Form } from "antd";
import moment from "moment";
import FilterWrapper from "../../commons/filter/filter-wrapper";
import { handleExportOrderReturns, handleGetAllOrderReturns } from "../../actions/order-returns/OrderReturnsAction";

function FilterOrderReturns (props) {
    const { submitFilter, filter, exportFilter } = props
    const formatDate = filter.date.split(',')
    const initials = {...filter,
        date: formatDate.length === 1 ? null : [
            moment(formatDate[0]),
            moment(formatDate[1]),
        ], export: false}

    return (
       <FilterWrapper initialValue={initials} submitFilter={submitFilter} exportFilter={exportFilter}>
           <div>
               <Form.Item name="date" label="Date">
                   <DatePicker.RangePicker />
               </Form.Item>
           </div>
       </FilterWrapper>
    )
}

FilterOrderReturns.propTypes = {
    submitFilter: PropTypes.func,
    exportFilter: PropTypes.func,
    filter: PropTypes.object,
}

const mapStateToProps = (state) => ({
    filter: state.returnOrdersReducer.filter
})

const mapDispatchToProps = (dispatch) => ({
    submitFilter: (params) => dispatch(handleGetAllOrderReturns(params)),
    exportFilter: (search, pageNumber) => dispatch(handleExportOrderReturns(search,pageNumber)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterOrderReturns)
