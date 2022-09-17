import React, {useEffect, useState} from 'react'
import {Table} from 'antd'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import TlaTableWrapper from "../../commons/table/tla-table-wrapper";
import {useOutletContext} from 'react-router'
import {handleGetAllEmployees} from "../../actions/employee/EmployeeAction";
import ViewAllWrapper from "../../commons/view-all-wrapper";
import TlaImage from "../../commons/tla-image";
import TlaEdit from "../../commons/tla-edit";

const { Column } = Table
function AllTrucks (props) {
    const { getEmployees, employees } = props
    const { data, meta }= employees
    const [loading, setLoading] = useState(true)
    const { setPageInfo } = useOutletContext();
    useEffect(() => {
        setPageInfo({ title: 'Trucks', addLink: '/trucks/add', buttonText: 'Trucks' })
        getEmployees().then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <ViewAllWrapper loading={loading} noData={data.length === 0}>
            <TlaTableWrapper callbackFunction={getEmployees} data={data} meta={meta}>
                <Column title="Photo" render={({name}) => (
                    <TlaImage size={40} src={'Avatar'} name={name}/>
                )}/>
                <Column title="Name" dataIndex={'name'}/>
                <Column title="Name" dataIndex={'name'}/>
                <Column title="D.o.B" dataIndex={'dob'}/>
                <Column title="Phone" dataIndex={'telephone'}/>
                <Column title="Phone" render={(record) => (
                    <TlaEdit data={record} icon link={'edit'}/>
                )}/>
            </TlaTableWrapper>
        </ViewAllWrapper>
    )
}

AllTrucks.propTypes = {
    pageInfo: PropTypes.object,
    getEmployees: PropTypes.func,
    employees: PropTypes.object,
}

const mapStateToProps = (state) => ({
    employees: state.employeeReducer.employees
})

const mapDispatchToProps = (dispatch) => ({
    getEmployees: (payload) => dispatch(handleGetAllEmployees(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllTrucks)
