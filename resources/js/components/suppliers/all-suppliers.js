import React, {useEffect, useState} from 'react'
import {Table} from 'antd'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import TlaTableWrapper from "../../commons/table/tla-table-wrapper";
import {useOutletContext} from 'react-router'
import ViewAllWrapper from "../../commons/view-all-wrapper";
import {handleGetAllSuppliers} from "../../actions/suppliers/SuppliersAction";
import TlaEdit from "../../commons/tla-edit";

const { Column } = Table
function AllSuppliers (props) {
    const { getSuppliers, suppliers } = props
    const { data, meta }= suppliers
    const [loading, setLoading] = useState(true)
    const { setPageInfo } = useOutletContext();
    useEffect(() => {
        setPageInfo({ title: 'Suppliers', addLink: 'trucks/add', buttonText: 'Suppliers' })
        getSuppliers().then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <ViewAllWrapper loading={loading} noData={data.length === 0}>
            <TlaTableWrapper callbackFunction={getSuppliers} data={data} meta={meta}>
                <Column title="Name" dataIndex={'name'}/>
                <Column title="Contact Person" dataIndex={'contact_person'}/>
                <Column title="Phone" dataIndex={'phone'}/>
                <Column title="Location" dataIndex={'location'}/>
                <Column title="Actions" render={(record) => (
                    <TlaEdit data={record} icon link={'edit'}/>
                )}/>
            </TlaTableWrapper>
        </ViewAllWrapper>
    )
}

AllSuppliers.propTypes = {
    pageInfo: PropTypes.object,
    getSuppliers: PropTypes.func,
    suppliers: PropTypes.object,
}

const mapStateToProps = (state) => ({
    suppliers: state.suppliersReducer.suppliers
})

const mapDispatchToProps = (dispatch) => ({
    getSuppliers: (payload) => dispatch(handleGetAllSuppliers(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllSuppliers)
