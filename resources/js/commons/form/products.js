import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {handleGetCommonProducts} from "../../actions/commons/CommonAction";
import SearchItems from "./search";
import {addOrRemoveItem} from "../../utils";

function Products(props) {
    const {getProducts, onChange, localKey} = props
    return (
        <SearchItems
            search={getProducts} onChangeCallback={(product) => {
            if (product !== undefined) {
                const items = JSON.parse(localStorage.getItem(localKey)) || []
                localStorage.setItem(localKey, JSON.stringify(addOrRemoveItem(items, {
                    id: product.id, name: product.name, selling_price: product.selling_price
                })))
                onChange(items.findIndex(itm => itm.id === product.id) > -1)
            }
        }}/>
    )
}

Products.propTypes = {
    getProducts: PropTypes.func.isRequired,
    onChange: PropTypes.func,
    localKey: PropTypes.string.isRequired,
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProducts: (query) => dispatch(handleGetCommonProducts(query))
    }
}

export default connect(null, mapDispatchToProps)(Products)
