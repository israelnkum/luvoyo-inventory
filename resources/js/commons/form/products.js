import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Form, Select} from 'antd'
import PropTypes from 'prop-types'
import {handleGetCommonProducts} from "../../actions/commons/CommonAction";

function Products(props) {
    const [loading, setLoading] = useState(true)
    const {getProducts, products, onChange} = props

    useEffect(() => {
        getProducts().then(() => setLoading(false))
    }, [])


    return (
        <Form.Item>
            <Select size={'large'}
                    onChange={(value) => {onChange(value)}}
                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                    placeholder="Select Product" allowClear showSearch>
                {
                    products.map((product) => (
                        <Select.Option key={product.id}
                                       value={product.id}>{product.name}</Select.Option>
                    ))
                }
            </Select>
        </Form.Item>
    )
}

Products.propTypes = {
    getProducts: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired,
    onChange: PropTypes.func,
}

const mapStateToProps = (state) => ({
    products: state.commonReducer.products,
})
const mapDispatchToProps = (dispatch) => {
    return {
        getProducts: () => dispatch(handleGetCommonProducts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
