import React, {useEffect, useState} from 'react'
import {Space, Table} from 'antd'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import TlaTableWrapper from "../../commons/table/tla-table-wrapper";
import {useOutletContext} from 'react-router'
import {handleGetAllProducts} from "../../actions/products/ProductAction";
import ViewAllWrapper from "../../commons/view-all-wrapper";
import TlaEdit from "../../commons/tla-edit";
import TlaConfirm from '../../commons/TlaConfirm';

const { Column } = Table
function AllTrucks (props) {
    const { getProducts, products } = props
    const { data, meta }= products
    const [loading, setLoading] = useState(true)
    const { setPageInfo } = useOutletContext();
    useEffect(() => {
        setPageInfo({ title: 'Products', addLink: '/products/add', buttonText: 'Product' })
        getProducts().then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <ViewAllWrapper loading={loading} noData={data.length === 0}>
            <TlaTableWrapper callbackFunction={getProducts} data={data} meta={meta}>
                <Column title="Item Name" dataIndex={'name'} />
                <Column title="Selling Price" dataIndex={'selling_price'}/>
                <Column title="Cost Price" dataIndex={'cost_price'}/>
                <Column title="Profit" dataIndex={'profit'}/>
                <Column title="Brand" dataIndex={'brand'}/>
                <Column title="Quantity" dataIndex={'quantity'}/>
                <Column title="Supplier" dataIndex={'supplier'}/>
                <Column title="Action"
                    render={(record) => (
                        <Space>
                            <TlaEdit icon data={record} link={'edit'} type={'text'}/>
                        </Space>
                    )}
                />
            </TlaTableWrapper>
        </ViewAllWrapper>
    )
}

AllTrucks.propTypes = {
    pageInfo: PropTypes.object,
    getProducts: PropTypes.func,
    products: PropTypes.object,
}

const mapStateToProps = (state) => ({
    products: state.productReducer.products
})

const mapDispatchToProps = (dispatch) => ({
    getProducts: (payload) => dispatch(handleGetAllProducts(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllTrucks)
