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
function AllEmployees (props) {
    const { getEmployees, employees } = props
    const { data, meta }= employees
    const [loading, setLoading] = useState(true)
    const { setPageInfo } = useOutletContext();
    useEffect(() => {
        setPageInfo({ title: 'Staff', addLink: '/staff/add', buttonText: 'Staff' })
        getEmployees().then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <ViewAllWrapper loading={loading} noData={data.length === 0}>
            <TlaTableWrapper callbackFunction={getEmployees} data={data} meta={meta}>
                <Column title="Photo" render={({name, photo}) => (
                    <TlaImage size={40} src={photo} name={name}/>
                )}/>
                <Column title="Name" dataIndex={'name'}/>
                <Column title="Name" dataIndex={'name'}/>
                <Column title="D.o.B" dataIndex={'dob'}/>
                <Column title="Phone" dataIndex={'telephone'}/>
                <Column title="Actions" render={(record) => (
                    <TlaEdit data={record} icon link={'edit'}/>
                )}/>
            </TlaTableWrapper>
        </ViewAllWrapper>
    )
}

AllEmployees.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(AllEmployees)
