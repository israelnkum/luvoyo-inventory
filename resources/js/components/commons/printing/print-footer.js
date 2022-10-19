import React from 'react'
import PropTypes from 'prop-types'
import {createGlobalStyle} from "styled-components";
import {Space} from "antd";

const PrintStyles = createGlobalStyle`

.summary .note {
    padding: 10mm 10mm 5mm;
    background-color: #fff;
    height: 150px;
}
.summary .total-amount {
    background-color: #f4f4f4;
    padding: 10mm 10mm 5mm;
    height: 100px;
    text-align: center;
}
.total-amount h5, .total-amount h3 {
    color: #000;
    font-weight: 700;
}
.signature-title{
    font-size: 12px;
}
`
function PrintFooter (props) {
    const { total } = props

    return (
        <>
            <PrintStyles/>
            <div className='summary'>
                <div className='total-amount'>
                    <div>
                        <h6>TOTAL</h6>
                        {/*GH&#8373;*/}
                        <h6>R{total}</h6> <br/>
                    </div>
                </div>
                <div className={'note'}>
                    <Space size={'large'} style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center'}}>
                        <div>
                            <p>........................................</p>
                            <p className={'signature-title'}>Entry Clerk</p>
                        </div>
                        <div>
                            <p>........................................</p>
                            <p className={'signature-title'}>Dispatch Supervisor</p>
                        </div>
                        <div>
                            <p>........................................</p>
                            <p className={'signature-title'}>Truck Driver</p>
                        </div>
                    </Space> <br/>
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
