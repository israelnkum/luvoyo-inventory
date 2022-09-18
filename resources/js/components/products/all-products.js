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
        item_name: 'Milo Tin',
        selling_price: 25.50,
        cost_price: 30.50,
        profit: 5.00,
        item_brand: 'Nestle',
        quantity: 154,
        supplier_id: 2,
    },
];

const { Column } = Table
function AllTrucks (props) {
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
                    title="Item ID" 
                    render={({id}) => (
                        <Space size={0} direction={'vertical'}>
                        {id}
                        </Space>
                    )}
                />
                <Column 
                    title="Item Name" 
                    render={({item_name}) => (
                        <Space size={0} direction={'vertical'}>
                        {item_name}
                        </Space>
                    )}
                />
                <Column 
                    title="Selling Price" 
                    render={({selling_price}) => (
                        <Space size={0} direction={'vertical'}>
                        {selling_price}
                        </Space>
                    )}
                />
                <Column 
                    title="Cost Price" 
                    render={({cost_price}) => (
                        <Space size={0} direction={'vertical'}>
                        {cost_price}
                        </Space>
                    )}
                />
                <Column 
                    title="Item Brand" 
                    render={({item_brand}) => (
                        <Space size={0} direction={'vertical'}>
                        {item_brand}
                        </Space>
                    )}
                />
                <Column 
                    title="Profit" 
                    render={({profit}) => (
                        <Space size={0} direction={'vertical'}>
                        {profit}
                        </Space>
                    )}
                />
                <Column 
                    title="Quantity" 
                    dataIndex={'quantity'}
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
