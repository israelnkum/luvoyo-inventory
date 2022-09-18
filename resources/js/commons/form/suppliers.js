import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Form, Select} from 'antd'
import PropTypes from 'prop-types'
import {handleGetCommonSuppliers} from "../../actions/commons/CommonAction";

function Suppliers(props) {
    const [loading, setLoading] = useState(true)
    const {getSuppliers, suppliers} = props

    useEffect(() => {
        getSuppliers().then(() => setLoading(false))
    }, [])


    return (
        <Form.Item
            name="supplier_id"
            label="Supplier"
            rules={[
                {
                    required: true,
                    message: "Supplier is Required",
                },
            ]}
        >
            <Select size={'large'}
                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                    placeholder="Select Supplier" allowClear showSearch>
                {
                    suppliers.map((supplier) => (
                        <Select.Option key={supplier.id}
                                       value={supplier.id}>{supplier.name}</Select.Option>
                    ))
                }
            </Select>
        </Form.Item>
    )
}

Suppliers.propTypes = {
    getSuppliers: PropTypes.func.isRequired,
    suppliers: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
    suppliers: state.commonReducer.suppliers,
})
const mapDispatchToProps = (dispatch) => {
    return {
        getSuppliers: () => dispatch(handleGetCommonSuppliers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Suppliers)
