import React from 'react'
import {connect} from 'react-redux'
import {Form} from 'antd'
import PropTypes from 'prop-types'
import {handleGetCommonTrucks} from "../../actions/commons/CommonAction";
import SearchItems from "./search";

function Trucks(props) {
    const {getTrucks, form, editing} = props
    return (
        <Form.Item
            name="truck_id"
            label="Truck"
            rules={[
                {
                    required: editing,
                    message: "Truck is Required",
                },
            ]}
        >
            <SearchItems search={getTrucks} displayField={'truck_code'}
                         text={'Search by truck code'}
                         onChangeCallback={({ id }) => {
                             getTrucks()
                             form.setFieldsValue({
                                 truck_id: id
                             })
                         }}/>
        </Form.Item>
    )
}

Trucks.defaultProps = {
    editing: false
}
Trucks.propTypes = {
    getTrucks: PropTypes.func.isRequired,
    form: PropTypes.any.isRequired,
    editing: PropTypes.bool,
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTrucks: (query) => dispatch(handleGetCommonTrucks(query))
    }
}

export default connect(null, mapDispatchToProps)(Trucks)
