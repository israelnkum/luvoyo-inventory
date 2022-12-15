import React from 'react'
import { Route, Routes } from 'react-router-dom'
import EmployeeForm from "../../components/employees/employee-form";
import ExpensesForm from "../../components/exepenses/expenses-form";
import SupplierForm from "../../components/suppliers/supplier-form";
import TruckForm from "../../components/trucks/truck-form";
import CashUpForm from "../../components/cash-ups/cash-up-form";
import DispatchOrderForm from "../../components/dispatch-orders/dispatch-order-form";
import OrderReturnsForm from "../../components/order-returns/order-returns-form";
import ProductsForm from "../../components/products/products-form";
import ReceivedOrdersForm from "../../components/received-orders/received-orders-form";
import OrderDetailModal from "../../components/dispatch-orders/order-detail-modal";
import OrderReturnItems from "../../components/order-returns/order-return-items";

export const ModalRoutes = () => {
  return (
        <Routes>
            <Route exact path="staff">
                <Route exact path="add" element={<EmployeeForm/>}/>
                <Route exact path="edit" element={<EmployeeForm/>}/>
            </Route>
            <Route exact path="suppliers">
                <Route exact path="add" element={<SupplierForm/>}/>
                <Route exact path="edit" element={<SupplierForm/>}/>
            </Route>
            <Route exact path="expenses">
                <Route exact path="add" element={<ExpensesForm/>}/>
                <Route exact path="edit" element={<ExpensesForm/>}/>
            </Route>
            <Route exact path="cash-ups">
                <Route exact path="add" element={<CashUpForm/>}/>
                <Route exact path="edit" element={<CashUpForm/>}/>
                <Route exact path="dispatch-order" element={<OrderDetailModal/>}/>
            </Route>
            <Route exact path="dispatch-order-returns">
                <Route exact path="add" element={<OrderReturnsForm/>}/>
                <Route exact path="edit" element={<OrderReturnsForm/>}/>
            </Route>
            <Route exact path="dispatch-orders">
                <Route exact path="add" element={<DispatchOrderForm/>}/>
                <Route exact path="edit" element={<DispatchOrderForm/>}/>
                <Route exact path=":orderId/return" element={<OrderReturnsForm/>}/>
                <Route exact path=":orderId/returns/items" element={<OrderReturnItems/>}/>
            </Route>
            <Route exact path="received-orders">
                <Route exact path="add" element={<ReceivedOrdersForm/>}/>
                <Route exact path="edit" element={<ReceivedOrdersForm/>}/>
            </Route>
            <Route exact path="products">
                <Route exact path="add" element={<ProductsForm/>}/>
                <Route exact path="edit" element={<ProductsForm/>}/>
            </Route>
            <Route exact path="trucks">
                <Route exact path="add" element={<TruckForm/>}/>
                <Route exact path="edit" element={<TruckForm/>}/>
            </Route>
            <Route exact path="businesses">
                <Route exact path="add" element={<EmployeeForm/>}/>
                <Route exact path="edit" element={<EmployeeForm/>}/>
            </Route>
        </Routes>
  )
}
