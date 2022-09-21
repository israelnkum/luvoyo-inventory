import React from 'react'
import {connect} from 'react-redux'
import {Form} from 'antd'
import PropTypes from 'prop-types'
import {handleGetCommonDispatchOrder} from "../../actions/commons/CommonAction";
import SearchItems from "./search";

function DispatchOrder(props) {
    const { getDispatchOrder, form, editing } = props
    return (
        <Form.Item
            name="dispatch_order_id"
            label="Dispatch Order"
            rules={[
                {
                    required: editing,
                    message: "Dispatch Order is Required",
                },
            ]}
        >
            <SearchItems search={getDispatchOrder} displayField={'order_no'}
                         text={'Eg: 22001'}
                         onChangeCallback={({ id }) => {
                             getDispatchOrder()
                             form.setFieldsValue({
                                 dispatch_order_id: id
                             })
                         }}/>
        </Form.Item> 
    )
}


DispatchOrder.defaultProps = {
    editing: false
}

DispatchOrder.propTypes = {
    getDispatchOrder: PropTypes.func.isRequired,
    form: PropTypes.any.isRequired,
    editing: PropTypes.bool,
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDispatchOrder: (query) => dispatch(handleGetCommonDispatchOrder(query))
    }
}

export default connect(null, mapDispatchToProps)(DispatchOrder)
