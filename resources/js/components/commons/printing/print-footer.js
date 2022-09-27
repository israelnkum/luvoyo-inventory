import React from 'react'
import PropTypes from 'prop-types'
import {createGlobalStyle} from "styled-components";

const PrintStyles = createGlobalStyle`

.summary {
    display: flex;
    align-items: center;
}
.summary .note {
    padding: 10mm 10mm 5mm;
    background-color: #fff;
    height: 150px;
    width: 60%;
}
.summary .total-amount {
    background-color: #f4f4f4;
    padding: 10mm 10mm 5mm;
    width: 40%;
    height: 150px;
    display: flex;
    justify-content: right;
    align-items: center;
}
.total-amount h5, .total-amount h3 {
    color: #000;
    font-weight: 700;
    text-align: right;
}

`
function PrintFooter (props) {
    const { total } = props

    return (
        <>
            <PrintStyles/>
            <div className='summary'>
                <div className={'note'}>
                    <p>.........................................................</p>
                    <p>Authorized Signature</p>
                </div>
                <div className='total-amount'>
                    <div>
                        <h5>TOTAL</h5>
                        {/*GH&#8373;*/}
                        <h3>{total}</h3>
                    </div>
                </div>
            </div>
        </>
    )
}

PrintFooter.defaultProps = {
    total: 0
}
PrintFooter.propTypes = {
    total: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ])
}



export default PrintFooter
