import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {Col, List, Row} from "antd";
import TlaEdit from "../../../commons/tla-edit";
import {handleGetSingleEmployee} from "../../../actions/employee/EmployeeAction";
import ViewAllWrapper from "../../../commons/view-all-wrapper";
import {useParams} from "react-router";

const Item = ({ title, value }) => (
    <List.Item>
        <List.Item.Meta
            title={`${title}:`}
            description={value}
        />
    </List.Item>
)

Item.propTypes = {
    title: PropTypes.string,
    value: PropTypes.string,
}
function PersonalDetails (props) {
    const { getEmployee, employee } = props
    const {id} = useParams()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getEmployee(id).then(() => setLoading(false))
    }, [])
    return (
        <ViewAllWrapper loading={loading} noData={false}>
            <Row gutter={10} justify={'space-between'}>
                <Col span={24}>
                    <div align={'right'}>
                        <TlaEdit data={employee} icon link={`/pim/employees/${employee.name}/personal-details/edit`} text={'Edit'} />
                    </div>
                </Col>
                <Col span={11}>
                    <List size="small" itemLayout="horizontal">
                        <Item title={'Employee ID'} value={employee.staff_id}/>
                        <Item title={'Name'} value={employee.name}/>
                        <Item title={'Gender'} value={employee.name}/>
                        <Item title={'Nationality'} value={employee.nationality}/>
                        <Item title={'Marital Status'} value={employee.marital_status}/>
                        <Item title={'Date of Birth'} value={employee.dob}/>
                    </List>
                </Col>
                <Col span={11}>
                    <List size="small" itemLayout="horizontal">
                        <Item title={'Department'} value={employee.department}/>
                        <Item title={'GTEC Placement'} value={employee.gtech_placement}/>
                        <Item title={'Qualification'} value={'Male'}/>
                        <Item title={'Rank'} value={employee.rank}/>
                        <Item title={'SSNIT No'} value={employee.ssnit_number}/>
                        <Item title={'Status'} value={''}/>
                    </List>
                </Col>
            </Row>
        </ViewAllWrapper>
    )
}

PersonalDetails.propTypes = {
    getEmployee: PropTypes.func,
    employee: PropTypes.object,
}

const mapStateToProps = (state) => ({
    employee: state.employeeReducer.employee
})

const mapDispatchToProps = (dispatch) => ({
    getEmployee: (payload) => dispatch(handleGetSingleEmployee(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetails)
