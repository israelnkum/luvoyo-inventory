import React from 'react'
import {connect} from 'react-redux'
import {Form} from 'antd'
import PropTypes from 'prop-types'
import {handleGetCommonDispatchOrder} from "../../actions/commons/CommonAction";
import SearchItems from "./search";

function DispatchOrder(props) {
    const {getDispatchOrder, form} = props
    return (
        <Form.Item
            name="dispatch_order_id"
            label="Dispatch Order"
            rules={[
                {
                    required: true,
                    message: "Dispatch Order is Required",
                },
            ]}
        >
            <SearchItems search={getDispatchOrder} displayField={'order_no'}
                         text={'Search by order number'}
                         onChangeCallback={({ id }) => {
                             getDispatchOrder()
                             form.setFieldsValue({
                                 dispatch_order_id: id
                             })
                         }}/>
        </Form.Item>
    )
}

DispatchOrder.propTypes = {
    getDispatchOrder: PropTypes.func.isRequired,
    form: PropTypes.any.isRequired,
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDispatchOrder: (query) => dispatch(handleGetCommonDispatchOrder(query))
    }
}

export default connect(null, mapDispatchToProps)(DispatchOrder)
