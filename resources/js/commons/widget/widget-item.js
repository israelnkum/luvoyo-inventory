import React from 'react'
import { createGlobalStyle } from 'styled-components'
import PropTypes from 'prop-types'
import {Card, Space, Typography} from 'antd'
import { connect } from 'react-redux'
import {FiUser} from "react-icons/fi";

const GlobalStyles = createGlobalStyle`
  .widget-title {
    font-family: var(--Popins);
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: var(--Gray-500);
    margin-bottom: 0;
  }

  .widget-value {
    font-family: var(--Popins);
    font-style: normal !important;
    font-weight: 600 !important;
    font-size: 30px !important;
    line-height: 38px !important;
    color: var(--Gray-900) !important;
    margin-top: 10px !important;
  }

  .widget-cover {
    height: 114px;
    border: 1px solid var(--Gray-100);
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 8px;
  }
  .widget-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
  }
`

function WidgetItem({title, value}) {
    return (
        <Card className={'widget-cover'}>
            <GlobalStyles/>
            <Space className={'widget-inner'}>
                <div>
                    <Typography.Text className={'widget-title'}>{title}</Typography.Text>
                    <Typography.Title className={'widget-value'}>{value}</Typography.Title>
                </div>
                <FiUser style={{ fontSize: 25 }}/>
            </Space>
        </Card>
    )
}

WidgetItem.propTypes = {
    title: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
}

const mapStateToProps = () => {
    return {
    }
}

export default connect(mapStateToProps)(WidgetItem)
