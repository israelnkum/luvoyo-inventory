import React from 'react'
import PropTypes from 'prop-types'
import {Image, Space, Table, Typography} from "antd";
import Logo from '../../assets/img/defalut-logo.png'
function PrintReceivedOrder (props) {
    const { data } = props
    return (
        <div style={{ background: "white" }}>
            <div className={'tla-print-header'}>
                <div>
                    <h3>Invoice</h3>
                </div>
                <div/>
                <div>
                    <Typography.Text className={'print-company-name'}>LOXION BUSINESS</Typography.Text>
                </div>
            </div>
            <div className={'tla-print-header'}>
                <div>
                    <Space direction={'vertical'}>
                        <Typography.Text><b>Invoice Number:</b> 0544513074</Typography.Text>
                        <Typography.Text><b>Date:</b> 2002-20-02</Typography.Text>
                        <Typography.Text><b>Supplier:</b> techlineafri</Typography.Text>
                    </Space>
                </div>
                <div>
                    <Image preview={false} width={150} src={Logo} alt={'Logo'}/>
                </div>
                <div>

                    <Space direction={'vertical'}>
                        <Typography.Text><b>Phone:</b> 0544513074</Typography.Text>
                        <Typography.Text><b>Website:</b> techlineafrica.com</Typography.Text>
                        <Typography.Text><b>Email:</b> info@techlineafri.com</Typography.Text>
                        <Typography.Text><b>Address:</b> 6 Araba Hinson, Takoradi Ghana</Typography.Text>
                    </Space>
                </div>
            </div>
            <table>
                <tbody>
                <tr>
                    <td>

                    </td>
                    <td>

                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

PrintReceivedOrder.defaultProps = {
    data: {}
}
PrintReceivedOrder.propTypes = {
    data: PropTypes.object
}



export default PrintReceivedOrder
