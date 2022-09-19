import React, {useEffect, useState} from 'react'
import {Table, Button, Space} from 'antd'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import TlaTableWrapper from "../../commons/table/tla-table-wrapper";
import {useOutletContext} from 'react-router'
import {handleGetAllEmployees} from "../../actions/employee/EmployeeAction";
import ViewAllWrapper from "../../commons/view-all-wrapper";
import TlaImage from "../../commons/tla-image";
import TlaEdit from "../../commons/tla-edit"; 
import TlaAddNew from '../../commons/tla-add-new';
import TlaConfirm from '../../commons/TlaConfirm';

//dummy table data
const testData = [
    {
        id: 1,
        date: '2022-21-11',
        total: 154,
        supplier_id: 2,
    },
];

const { Column } = Table
function AllReceivedOrders (props) {
    const { getEmployees, employees } = props
    const { data, meta }= employees
    const [loading, setLoading] = useState(true)
    const { setPageInfo } = useOutletContext();
    useEffect(() => {
        setPageInfo({ title: 'Products', addLink: '/products/add', buttonText: 'Products' })
        getEmployees().then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <ViewAllWrapper loading={loading} noData={testData.length === 0}>
            <TlaTableWrapper 
                callbackFunction={() => {}} 
                data={testData} 
                meta={meta}
            >
                <Column 
                    title="Invoice No." 
                    render={({id}) => (
                        <Space size={0} direction={'vertical'}>
                        {id}
                        </Space>
                    )}
                />
                <Column 
                    title="Date" 
                    render={({date}) => (
                        <Space size={0} direction={'vertical'}>
                        {date}
                        </Space>
                    )}
                />
                <Column 
                    title="Total" 
                    dataIndex={'total'}
                />
                <Column 
                    title="Supplier ID" 
                    dataIndex={'supplier_id'}
                />
                <Column  
                    title="Action" 
                    render={() => (
                        <Space size={0}>
                            <TlaEdit icon data={{}} link={'#'} type={'text'}/>
                            <TlaConfirm title={'Dependant'} callBack={()=>{}}/>
                        </Space>
                    )}
                />
            </TlaTableWrapper>
        </ViewAllWrapper>
    )
}

AllReceivedOrders.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(AllReceivedOrders)
