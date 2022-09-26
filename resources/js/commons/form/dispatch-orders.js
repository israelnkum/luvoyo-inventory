import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Form} from 'antd'
import PropTypes from 'prop-types'
import {handleGetCommonDispatchOrder} from "../../actions/commons/CommonAction";
import SearchItems from "./search";
import DispatchOrderDetail from "../../components/dispatch-orders/dispatch-order-detail";

function DispatchOrder(props) {
    const { getDispatchOrder, form, editing, displayContent } = props
    const [data, setData] = useState({})
    return (
<<<<<<< HEAD
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
=======
        <>
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
                             onChangeCallback={({ id, ...rest }) => {
                                 setData(rest)
                                 getDispatchOrder()
                                 form.setFieldsValue({
                                     dispatch_order_id: id
                                 })
                             }}/>
            </Form.Item>
            {
                (displayContent && Object.keys(data).length > 0) &&
                <DispatchOrderDetail data={data}/>
            }
        </>
>>>>>>> 1bf0667050ecd40a247c02e9b063d13644cc79ec
    )
}


DispatchOrder.defaultProps = {
    editing: false,
    displayContent: false,
}

DispatchOrder.propTypes = {
    getDispatchOrder: PropTypes.func.isRequired,
    form: PropTypes.any.isRequired,
    editing: PropTypes.bool,
    displayContent: PropTypes.bool,
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDispatchOrder: (query) => dispatch(handleGetCommonDispatchOrder(query))
    }
}

export default connect(null, mapDispatchToProps)(DispatchOrder)
