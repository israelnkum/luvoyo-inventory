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
        quantity: 132,
    },
];

const { Column } = Table
function AllOrderReturns (props) {
    const { getEmployees, employees } = props
    const { data, meta }= employees
    const [loading, setLoading] = useState(true)
    const { setPageInfo } = useOutletContext();
    useEffect(() => {
        setPageInfo({ title: 'Dispatch Order Returns', addLink: '/dispatch-order-returns/add', buttonText: 'Returns' })
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
                    title="Dispatch ID" 
                    render={({id}) => (
                        <Space size={0} direction={'vertical'}>
                        {id}
                        </Space>
                    )}
                />
                <Column 
                    title="Item ID" 
                    render={({supplier_id}) => (
                        <Space size={0} direction={'vertical'}>
                        {supplier_id}
                        </Space>
                    )}
                />
                <Column 
                    title="Quantity" 
                    dataIndex={'quantity'}
                />
                <Column 
                    title="Damaged Item ID" 
                    dataIndex={'supplier_id'}
                />
                <Column 
                    title="Damaged Item Qty" 
                    dataIndex={'supplier_id'}
                />
                <Column 
                    title="Subtotal" 
                    dataIndex={'quantity'}
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

AllOrderReturns.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(AllOrderReturns)
