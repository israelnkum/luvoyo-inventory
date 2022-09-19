import React from 'react'
import {connect} from 'react-redux'
import {Form} from 'antd'
import PropTypes from 'prop-types'
import {handleGetCommonTrucks} from "../../actions/commons/CommonAction";
import SearchItems from "./search";

function Trucks(props) {
    const {getTrucks} = props
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
            <SearchItems search={getTrucks}/>
        </Form.Item>
    )
}

Trucks.propTypes = {
    getTrucks: PropTypes.func.isRequired,
    trucks: PropTypes.array.isRequired,
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTrucks: (query) => dispatch(handleGetCommonTrucks(query))
    }
}

export default connect(null, mapDispatchToProps)(Trucks)
