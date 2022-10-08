import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {handleExportExpenses, handleGetAllExpenses} from "../../actions/expenses/ExpensesAction";
import {DatePicker, Form, Input, Select} from "antd";
import {expensesCategories} from "../../utils";
import moment from "moment";
import FilterWrapper from "../../commons/filter/filter-wrapper";

function FilterExpenses (props) {
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
           <div style={{ width: 220 }}>
               <Form.Item name="category" label="Category">
                   <Select placeholder={'Select Category'}>
                       <Select.Option value={'all'}>All</Select.Option>
                       {expensesCategories.map((expenses, index) => (
                           <Select.Option key={index} value={expenses}>{expenses}</Select.Option>
                       ))}
                   </Select>
               </Form.Item>
           </div>
       </FilterWrapper>
    )
}

FilterExpenses.propTypes = {
    submitFilter: PropTypes.func,
    exportFilter: PropTypes.func,
    filter: PropTypes.object,
}

const mapStateToProps = (state) => ({
    filter: state.expensesReducer.filter
})

const mapDispatchToProps = (dispatch) => ({
    submitFilter: (search, pageNumber) => dispatch(handleGetAllExpenses(search,pageNumber)),
    exportFilter: (search, pageNumber) => dispatch(handleExportExpenses(search,pageNumber)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterExpenses)
