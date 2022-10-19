import React from 'react'
import PropTypes from 'prop-types'
import {Table} from "antd";
import '../../assets/css/print-invoice.css'
import PrintHeader from "../commons/printing/print-header";
import PrintFooter from "../commons/printing/print-footer";

function PrintReceivedOrder (props) {
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
                        <h5>INVOICE TO</h5>
                        <p><b>Supplier:</b> {data.supplier.name}</p>
                        <p><b>Phone:</b> {data.supplier.phone}</p>
                    </div>

                    <div className={'invoice-info'}>
                        <div>
                            <p><b>INVOICE #:</b> {data.invoice_no}</p>
                            <p><b>DATE:</b> {data.date}</p>
                        </div>
                    </div>
                </div>

                {/* Invoice Details Table */}
                <Table className={'print-table'} dataSource={data.order_items} pagination={false} rowKey={'id'}>
                    <Table.Column title={'#'} dataIndex={'id'}/>
                    <Table.Column title={'Item'} dataIndex={'item'}/>
                    <Table.Column title={'qty'} dataIndex={'qty'}/>
                    <Table.Column title={'price'} dataIndex={'price'}/>
                    <Table.Column title={'sub Total'} dataIndex={'sub_total'}/>
                </Table>
            </div>
            <PrintFooter total={data.total - data.damaged_total}/>
        </div>
        </>
    )
}

PrintReceivedOrder.defaultProps = {
    data: {
        supplier: {},
        order_items: [],
        total: 0
    }
}
PrintReceivedOrder.propTypes = {
    data: PropTypes.object
}



export default PrintReceivedOrder
