import React from 'react'
import {Tag, Typography} from 'antd'
import PropTypes from 'prop-types'

function CashUpStatus ({cash_up}) {
    return (
        cash_up ?
            <Typography.Text>{cash_up.received_amount}</Typography.Text>
            : <Tag color='darkred'>No Cash Up</Tag>
    )
}

CashUpStatus.defaultProps = {
    cash_up: null
}
CashUpStatus.propTypes = {
    cash_up: PropTypes.object,
}

export default CashUpStatus
