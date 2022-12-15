import React, {useEffect, useState} from 'react'
import {Space, Table, Tag, Typography} from 'antd'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import TlaTableWrapper from "../../commons/table/tla-table-wrapper";
import {useOutletContext} from 'react-router'
import {handleGetAllProducts} from "../../actions/products/ProductAction";
import ViewAllWrapper from "../../commons/view-all-wrapper";
import TlaEdit from "../../commons/tla-edit";
import FilterProducts from "./filter-products";

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
        <>
            <FilterProducts/>
            <ViewAllWrapper loading={loading} noData={data.length === 0}>
                <TlaTableWrapper callbackFunction={getProducts} data={data} meta={meta}>
                    <Column title="Item Name"
                            render={({name, code}) => (
                                <Space direction={'vertical'}>
                                    <Typography.Text>{name}</Typography.Text>
                                    <Tag>{code}</Tag>
                                </Space>
                            )}
                    />
                    <Column title="Selling Price" dataIndex={'selling_price'}/>
                    <Column title="Cost Price" dataIndex={'cost_price'}/>
                    <Column title="Profit" dataIndex={'profit'}/>
                    <Column title="Brand" dataIndex={'brand'}/>
                    <Column title="Quantity" dataIndex={'quantity'}/>
                    <Column title="Supplier" dataIndex={'supplier'}/>
                    <Column title="Product Level"
                            render={({quantity}) => (
                                <div>
                                    {quantity <= 0 && <Tag color={'darkred'}>Empty</Tag>}
                                    {(quantity > 0 && quantity < 200 )&& <Tag color={'#106369'}>Low</Tag>}
                                    {quantity > 200 && <Tag color={'darkgreen'}>OK</Tag>}
                                </div>
                            )}
                    />
                    <Column title="Action"
                            render={(record) => (
                                <Space>
                                    <TlaEdit icon data={record} link={'edit'} type={'text'}/>
                                </Space>
                            )}
                    />
                </TlaTableWrapper>
            </ViewAllWrapper>
        </>
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
    getProducts: (params) => dispatch(handleGetAllProducts(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllTrucks)
