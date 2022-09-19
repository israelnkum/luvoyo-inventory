import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {handleGetCommonProducts} from "../../actions/commons/CommonAction";
import SearchItems from "./search";
import {addOrRemoveItem} from "../../utils";

function Products(props) {
    const {getProducts, onChange} = props
    return (
        <SearchItems
            search={getProducts} onChangeCallback={(product) => {
            if (product !== undefined) {
                const items = JSON.parse(localStorage.getItem('items')) || []
                localStorage.setItem('items', JSON.stringify(addOrRemoveItem(items, {
                    id: product.id, name: product.name, cost_price: product.cost_price
                })))
                onChange(items.findIndex(itm => itm.id === product.id) > -1)
            }
        }}/>
    )
}

Products.propTypes = {
    getProducts: PropTypes.func.isRequired,
    onChange: PropTypes.func,
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProducts: (query) => dispatch(handleGetCommonProducts(query))
    }
}

export default connect(null, mapDispatchToProps)(Products)
