import React from 'react'
import { Route, Routes } from 'react-router-dom'
import EmployeeForm from "../../components/employees/employee-form";
import ExpensesForm from "../../components/exepenses/expenses-form";
import TrucksForm from "../../components/trucks/trucks-form";

export const ModalRoutes = () => {
  return (
        <Routes>
            <Route exact path="staff">
                <Route exact path="add" element={<EmployeeForm/>}/>
                <Route exact path="edit" element={<EmployeeForm/>}/>
            </Route>
            <Route exact path="suppliers">
                <Route exact path="add" element={<EmployeeForm/>}/>
                <Route exact path="edit" element={<EmployeeForm/>}/>
            </Route>
            <Route exact path="expenses">
                <Route exact path="add" element={<ExpensesForm/>}/>
                <Route exact path="edit" element={<ExpensesForm/>}/>
            </Route>
            <Route exact path="cash-up">
                <Route exact path="add" element={<EmployeeForm/>}/>
                <Route exact path="edit" element={<EmployeeForm/>}/>
            </Route>
            <Route exact path="dispatch-order-returns">
                <Route exact path="add" element={<EmployeeForm/>}/>
                <Route exact path="edit" element={<EmployeeForm/>}/>
            </Route>
            <Route exact path="dispatch-orders">
                <Route exact path="add" element={<EmployeeForm/>}/>
                <Route exact path="edit" element={<EmployeeForm/>}/>
            </Route>
            <Route exact path="received-orders">
                <Route exact path="add" element={<EmployeeForm/>}/>
                <Route exact path="edit" element={<EmployeeForm/>}/>
            </Route>
            <Route exact path="products">
                <Route exact path="add" element={<EmployeeForm/>}/>
                <Route exact path="edit" element={<EmployeeForm/>}/>
            </Route>
            <Route exact path="trucks">
                <Route exact path="add" element={<TrucksForm/>}/>
                <Route exact path="edit" element={<EmployeeForm/>}/>
            </Route>
            <Route exact path="businesses">
                <Route exact path="add" element={<EmployeeForm/>}/>
                <Route exact path="edit" element={<EmployeeForm/>}/>
            </Route>
        </Routes>
  )
}
