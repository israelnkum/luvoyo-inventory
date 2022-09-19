import React from 'react'
import {connect} from 'react-redux'
import {Form} from 'antd'
import PropTypes from 'prop-types'
import {handleGetCommonTrucks} from "../../actions/commons/CommonAction";
import SearchItems from "./search";

function Trucks(props) {
    const {getTrucks, form} = props
    return (
        <Form.Item
            name="truck_id"
            label="Truck"
            rules={[
                {
                    required: true,
                    message: "Truck is Required",
                },
            ]}
        >
            <SearchItems search={getTrucks} displayField={'truck_code'}
                         text={'Search by truck code or vehicle type or license plate'}
                         onChangeCallback={({ id }) => {
                             getTrucks()
                             form.setFieldsValue({
                                 truck_id: id
                             })
                         }}/>
        </Form.Item>
    )
}

Trucks.propTypes = {
    getTrucks: PropTypes.func.isRequired,
    form: PropTypes.any.isRequired,
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTrucks: (query) => dispatch(handleGetCommonTrucks(query))
    }
}

export default connect(null, mapDispatchToProps)(Trucks)
