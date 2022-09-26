import React, {useEffect, useState} from 'react'
import {Table} from 'antd'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import TlaTableWrapper from "../../commons/table/tla-table-wrapper";
import {useOutletContext} from 'react-router'
import ViewAllWrapper from "../../commons/view-all-wrapper";
import {handleGetAllTrucks} from "../../actions/trucks/TrucksAction";
import TlaEdit from "../../commons/tla-edit";

const { Column } = Table
function AllTrucks (props) {
    const { getTrucks, trucks } = props
    const { data, meta }= trucks
    const [loading, setLoading] = useState(true)
    const { setPageInfo } = useOutletContext();
    useEffect(() => {
        setPageInfo({ title: 'Trucks', addLink: 'trucks/add', buttonText: 'Truck' })
        getTrucks().then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <ViewAllWrapper loading={loading} noData={data.length === 0}>
            <TlaTableWrapper callbackFunction={getTrucks} data={data} meta={meta}>
                <Column title="Truck Code" dataIndex={'truck_code'}/>
                <Column title="License Plate" dataIndex={'license_plate'}/>
                <Column title="Vehicle Type" dataIndex={'vehicle_type'}/>
                <Column title="Vin Number" dataIndex={'vin_number'}/>
                <Column title="Description" dataIndex={'description'}/>
                <Column title="Actions" render={(record) => (
                    <TlaEdit data={record} icon link={'edit'}/>
                )}/>
            </TlaTableWrapper>
        </ViewAllWrapper>
    )
}

AllTrucks.propTypes = {
    pageInfo: PropTypes.object,
    getTrucks: PropTypes.func,
    trucks: PropTypes.object,
}

const mapStateToProps = (state) => ({
    trucks: state.trucksReducer.trucks
})

const mapDispatchToProps = (dispatch) => ({
    getTrucks: (pageNumber) => dispatch(handleGetAllTrucks(pageNumber))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllTrucks)
