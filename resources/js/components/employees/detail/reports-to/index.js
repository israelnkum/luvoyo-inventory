import React from 'react'
import {Col, Row} from 'antd'
import {connect} from "react-redux";
import Supervisors from "./supervisors";
import Subordinates from "./subordinates";

function ReportsTo () {
    return (
        <Row gutter={10} justify={'space-between'}>
           <Col span={12}>
               <Supervisors/>
           </Col>
           <Col span={12}>
               <Subordinates/>
           </Col>
        </Row>
    )
}

ReportsTo.propTypes = {
}

export default connect()(ReportsTo)
