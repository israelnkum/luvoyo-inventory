import React from 'react'
import PropTypes from 'prop-types'
import {Image} from "antd";
import Logo from '../../../assets/img/logo.jpeg'
import '../../../assets/css/print-invoice.css'
import {connect} from "react-redux";
import {createGlobalStyle} from "styled-components";

const PrintStyles = createGlobalStyle`
    .print-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 10mm 10mm 5mm;
        color: #000;
        background: #f4f4f4;
    }

    .company-info p {
        font-size: 12px;
        margin: 0;
    }

    .print-header div h2 {
        color: #000;
        font-family: 'Poppins';
    }
`
function PrintHeader ({ business }) {

    return (
        <div className={'print-header'}>
            <PrintStyles/>
            <div>
                {/*<h2>Invoice</h2>*/}
                <Image src={Logo} width={150} preview={false} alt={'Logo'}/>
            </div>

            <div className='company-info'>
                <div>
                    <h3>{business.name}</h3>
                    <p><b>Phone:</b> {business.phone_number}</p>
                    {/*<p><b>Website:</b> techlineafrica.com</p>*/}
                    <p><b>Email:</b> {business.email}</p>
                    <p><b>Address:</b> {business.address}</p>
                </div>
            </div>
        </div>
    )
}

PrintHeader.defaultProps = {

}

PrintHeader.propTypes = {
    business: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    business: state.businessReducer.businessDetail
})


export default connect(mapStateToProps)(PrintHeader)
