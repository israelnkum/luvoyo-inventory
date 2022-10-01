import React from 'react'
import PropTypes from 'prop-types'
import '../../assets/css/print-invoice.css'
import PrintHeader from "../commons/printing/print-header";
import PrintFooter from "../commons/printing/print-footer";
import CashUpStatus from "../commons/cash-up-status";
import OrderItems from "./dispatch-order-detail/order-items";

function PrintDispatchOrder (props) {
    const { data } = props

    return (
        <>
         {/* begin::New PrintPreview */}
        <div className={'print-wrapper'}>
            {/* Header Section */}
           <PrintHeader/>

            <div className={'print-content'}>
                {/* Billing Address Section */}
                <div className='billing-info'>
                    <div className={'bill-to'}>
                        <p><b>Truck:</b> {data.truck.truck_code}</p>
                        <p><b>Staff:</b> {data.employee.name}</p>
                        <p><b>Cash:</b>   <CashUpStatus cash_up={data.cash_up}/></p>
                    </div>

                    <div className={'invoice-info'}>
                        <div>
                            <p><b>Order No.:</b> {data.order_no}</p>
                            <p><b>Date:</b> {data.date_time}</p>
                            <p><b>Return Time:</b> {data.return_time}</p>
                        </div>
                    </div>
                </div>

                {/* Invoice Details Table */}
                <OrderItems data={data.order_items}/>
            </div>
            <PrintFooter total={data.total}/>
        </div>
        </>
    )
}

PrintDispatchOrder.defaultProps = {
    data: {
        supplier: {},
        order_items: [],
        total: 0
    }
}
PrintDispatchOrder.propTypes = {
    data: PropTypes.object
}



export default PrintDispatchOrder
