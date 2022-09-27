import React from 'react'
import PropTypes from 'prop-types'
import {Image, Space, Table, Typography, Button} from "antd";
import {PrinterOutlined } from '@ant-design/icons'
import Logo from '../../assets/img/defalut-logo.png'
import '../../assets/css/print-invoice.css'

function PrintReceivedOrder (props) {
    const { data } = props

    const Columns = [
        { title: 'ITEMS', dataIndex: {} },
        { title: 'DESCRIPTION', dataIndex: {} },
        { title: 'QUANTITY', dataIndex: {} },
        { title: 'PRICE', dataIndex: {} },
        { title: 'SUBTOTAL', dataIndex: {} },
    ]

    return (
        <>
         {/* begin::New PrintPreview */}
        <div className={'print-wrapper'}>
            {/* Header Section */}
            <div className={'print-header'}>
                <div>
                    <Image src={Logo} width={150} preview={false} alt={'Logo'}></Image>
                    <h2>Invoice</h2>
                </div>

                <div className='company-info'>
                    <Space direction='vertical'>
                        <h3 style={{color: '#fff'}}>TechLineAfrica</h3>

                        <p><b>Phone:</b> 0544513074</p>
                        <p><b>Website:</b> techlineafrica.com</p>
                        <p><b>Email:</b> info@techlineafri.com</p>
                        <p><b>Address:</b> 6 Araba Hinson, Takoradi Ghana</p>
                    </Space>
                </div>
            </div>

            {/* Billing Address Section */}
            <div className='billing-info'>
                <div className={'bill-to'}>
                    <Space direction='vertical'>
                        <h5>BILL TO</h5>

                        <Typography.Text><b>Company Name:</b> </Typography.Text>
                        <Typography.Text><b>City:</b> </Typography.Text>
                        <Typography.Text><b>Address:</b> </Typography.Text>
                        <Typography.Text><b>Postal:</b> </Typography.Text>
                    </Space>
                </div>

                <div className={'invoice-info'}>
                    <Space direction='vertical'>
                        <h6><b>INVOICE #</b> </h6>
                        <p>22001</p>

                        <h6><b>DATE</b> </h6>
                        <p>2022-09-26</p>

                        <h6><b>INVOICE DUE DATE</b> </h6>
                        <p>2022-09-26</p>
                    </Space>
                </div>
            </div>

            {/* Invoice Details Table */}
            <Table columns={Columns}>
                
            </Table>

            {/* Total Amount Section */}
            <div className='summary'>
                <div className={'note'}>
                    <h5>NOTE</h5>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam laboriosam quo error vero nihil adipisci at delectus odio cupiditate deleniti. Quasi laudantium assumenda accusantium aliquam?</p>
                </div>
                <div className='total-amount'>
                    <div>
                        <h5>TOTAL</h5>
                        <h3>GH&#8373; 0000.00</h3>
                    </div>
                </div>
            </div>
        </div>
         {/* end::New PrintPreview */}

        {/* Print Button */}
        <div className="print-btn">
        <Button 
            icon={<PrinterOutlined />}
            size={'large'}
        >Print</Button>
        </div>
        </>
    )
}

PrintReceivedOrder.defaultProps = {
    data: {}
}
PrintReceivedOrder.propTypes = {
    data: PropTypes.object
}



export default PrintReceivedOrder
