import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {handleGetBusinessDetail} from "../../actions/businesses/BusinessAction";
import {Spin} from "antd";

function Dashboard (props) {
    const { getBusinessDetail } = props
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getBusinessDetail().then(() => setLoading(false))
    })
    return (
        <Spin spinning={loading}>
           Dashboard
        </Spin>
    )
}

Dashboard.propTypes = {
    activeRoles: PropTypes.array.isRequired,
    getBusinessDetail: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        activeRoles : state.userReducer.activeRoles
    }
}

const mapDispatchDispatchToProps = (dispatch) => ({
    getBusinessDetail: () => dispatch(handleGetBusinessDetail())
})

export default connect(mapStateToProps, mapDispatchDispatchToProps)(Dashboard)
