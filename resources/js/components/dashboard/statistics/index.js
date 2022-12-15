import React, {useEffect, useState} from 'react'
import {Col, Row} from 'antd'
import {connect} from 'react-redux'
import WidgetItem from '../../../commons/widget/widget-item'
import {handleGetDashboardData} from "../../../actions/dashboard/DashboardAction";
import PropTypes from "prop-types";
import {capitalize} from "../../../utils";

function Statistics({ statistics, handleGetDashboardData }) {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        handleGetDashboardData().then(() => setLoading(false))
    }, [])
    return (
        <Row gutter={[20, 20]} justify={'space-between'} style={{ marginBottom: 15}}>
            {
                Object.keys(statistics).map((stats) => (
                    <Col key={stats} span={6} xs={24} sm={6} md={6} lg={6}>
                        <WidgetItem title={`Total ${capitalize(stats.replaceAll('_', ' '))}`} value={statistics[stats]}/>
                    </Col>
                ))
            }
        </Row>
    )
}

Statistics.propTypes = {
    statistics: PropTypes.object.isRequired,
    handleGetDashboardData: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    statistics: state.dashboardReducer.statistics
})

const mapDispatchToProps = (dispatch) => ({
    handleGetDashboardData: () => dispatch(handleGetDashboardData())
})

export default connect(mapStateToProps, mapDispatchToProps)(Statistics)
