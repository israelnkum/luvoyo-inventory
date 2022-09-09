import React from 'react'
import {Route, Routes} from 'react-router-dom'
import {Outlet, useLocation} from 'react-router'
import {ModalRoutes} from "./ModalRoutes";
import Dashboard from "../../components/dashboard";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import PageWrapper from "../../components/admin/page-wrapper";
import AllEmployees from "../../components/employees/all-employees";
import Configs from "../../components/admin/config";
import Departments from "../../components/admin/config/departments";
import Users from "../../components/admin/config/users";
import TerminationReasons from "../../components/admin/config/termination-reasons";
import EmployeeDetail from "../../components/employees/detail/employee-detail";
import PersonalDetail from "../../components/employees/detail/personal-details";
import ContactDetails from "../../components/employees/detail/contact-details";
import EmergencyContact from "../../components/employees/detail/emergency-contact";
import Dependants from "../../components/employees/detail/dependants";
import Job from "../../components/employees/detail/job";
import Salary from "../../components/employees/detail/salary";
import ReportsTo from "../../components/employees/detail/reports-to";
import Qualifications from "../../components/employees/detail/qualifications";
import AllExpenses from "../../components/exepenses/all-expenses";

const ProtectedRoutes = (props) => {
    const {activeRoles} = props
    const location = useLocation()
    const background = location.state && location.state.background

    return (
        <>
            <Routes location={background || location}>
                <Route exact element={<Dashboard/>} path='/'/>
                <Route exact element={<Dashboard/>} path='/js/*'/>
                <Route path='*' element={<PageWrapper/>}>
                   <Route path='staff' element={<AllEmployees/>}/>
                   <Route path='expenses' element={<AllExpenses/>}/>
                    {/*<Route path='employees/:id/:name' element={<EmployeeDetail/>}>
                        <Route path='' element={<PersonalDetail/>}/>
                        <Route path='personal-details' element={<PersonalDetail/>}/>
                        <Route path='contact-details' element={<ContactDetails/>}/>
                        <Route path='emergency-contacts' element={<EmergencyContact/>}/>
                        <Route path='dependents' element={<Dependants/>}/>
                        <Route path='job' element={<Job/>}/>
                        <Route path='salary' element={<Salary/>}/>
                        <Route path='reports-to' element={<ReportsTo/>}/>
                        <Route path='qualifications' element={<Qualifications/>}/>
                    </Route>*/}
                </Route>
                <Route exact>
                    <>not found</>
                </Route>
            </Routes>
            {background && (<><ModalRoutes/> <Outlet /></>)}
        </>
    )
}

ProtectedRoutes.propTypes = {
    activeRoles: PropTypes.array.isRequired
}
const mapStateToProps = (state) => ({
    activeRoles: state.userReducer.activeRoles
})
export default connect(mapStateToProps)(ProtectedRoutes)
