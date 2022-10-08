import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {Form, Input} from "antd";
import FilterWrapper from "../../commons/filter/filter-wrapper";
import {handleExportCashUps, handleGetAllCashUps} from "../../actions/cashUps/CashUpsAction";

function FilterCashUp (props) {
    const { submitFilter, filter, exportFilter } = props

    return (
       <FilterWrapper initialValue={filter} submitFilter={submitFilter} exportFilter={exportFilter}>
           <div>
               <Form.Item name="truck_code" label="Truck Code">
                  <Input />
               </Form.Item>
           </div>
       </FilterWrapper>
    )
}

FilterCashUp.propTypes = {
    submitFilter: PropTypes.func,
    exportFilter: PropTypes.func,
    filter: PropTypes.object,
}

const mapStateToProps = (state) => ({
    filter: state.cashUpsReducer.filter
})

const mapDispatchToProps = (dispatch) => ({
    submitFilter: (search, pageNumber) => dispatch(handleGetAllCashUps(search,pageNumber)),
    exportFilter: (search, pageNumber) => dispatch(handleExportCashUps(search,pageNumber)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterCashUp)
