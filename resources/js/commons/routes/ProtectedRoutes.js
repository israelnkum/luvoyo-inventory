import React from 'react'
import {Route, Routes} from 'react-router-dom'
import {Outlet, useLocation} from 'react-router'
import {ModalRoutes} from "./ModalRoutes";
import Dashboard from "../../components/dashboard";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import PageWrapper from "../../components/admin/page-wrapper";
import AllEmployees from "../../components/employees/all-employees";
import AllExpenses from "../../components/exepenses/all-expenses";
import AllSuppliers from "../../components/suppliers/all-suppliers";
import AllTrucks from "../../components/trucks/all-trucks";
import AllCashUps from "../../components/cash-ups/all-cash-ups";
import AllDispatchOrders from "../../components/dispatch-orders/all-dispatch-orders";
import AllProducts from "../../components/products/all-products";
import AllReceivedOrders from "../../components/received-orders/all-received-orders";
import PrintReceivedOrder from '../../components/received-orders/print-received-order';
import AllOrderReturns from "../../components/order-returns/all-order-returns";
import DispatchOrderDetail from "../../components/dispatch-orders/dispatch-order-detail";
import ReceivedOrderDetail from "../../components/received-orders/received-order-detail";

const ProtectedRoutes = () => {
    const location = useLocation()
    const background = location.state && location.state.background

    return (
        <>
            <Routes location={background || location}>
                <Route exact element={<Dashboard/>} path='/'>
                    <Route exact path='js/*'  element={<Dashboard/>}/>
                    <Route exact path='home'  element={<Dashboard/>}/>
                </Route>

                <Route path='*' element={<PageWrapper/>}>
                    <Route path='staff' element={<AllEmployees/>}/>
                    <Route path='expenses' element={<AllExpenses/>}/>
                    <Route path='suppliers' element={<AllSuppliers/>}/>
                    <Route path='trucks' element={<AllTrucks/>}/>
                    <Route path='cash-ups' element={<AllCashUps/>}/>
                    <Route path='return-orders' element={<AllOrderReturns/>}/>
                    <Route path='dispatch-orders' element={<AllDispatchOrders/>}/>
                    <Route path='dispatch-orders/:orderNumber' element={<DispatchOrderDetail/>}/>
                    <Route path='dispatch-orders/:orderNumber/returns' element={<AllOrderReturns/>}/>
                    <Route path='received-orders' element={<AllReceivedOrders />} />
                    <Route path='received-orders/:invoiceNumber' element={<ReceivedOrderDetail />} />
                    <Route path='print-invoice' element={<PrintReceivedOrder />} />
                    <Route path='products' element={<AllProducts/>}/>
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
