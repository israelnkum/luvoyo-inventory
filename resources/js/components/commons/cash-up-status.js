import React from 'react'
import {Tag, Typography} from 'antd'
import PropTypes from 'prop-types'

function CashUpStatus ({cash_up}) {
    return (
        cash_up > 0 ?
            <Typography.Text>{cash_up}</Typography.Text>
            : <Tag color='darkred'>No Cash Up</Tag>
    )
}

CashUpStatus.defaultProps = {
    cash_up: 0
}
CashUpStatus.propTypes = {
    cash_up: PropTypes.number,
}

export default CashUpStatus
