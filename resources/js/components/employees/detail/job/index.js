import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {Col, List, Row} from "antd";
import TlaEdit from "../../../../commons/tla-edit";

const Item = ({ title, value }) => (
    <List.Item>
        <List.Item.Meta
            title={`${title}:`}
            description={value}
        />
    </List.Item>
)
Item.propTypes = {
    title: PropTypes.string,
    value: PropTypes.string,
}
function Job () {
    return (
        <Row gutter={10} justify={'space-between'}>
            <Col span={24}>
                <div align={'right'}>
                    <TlaEdit icon link={'#'} text={'Edit'} />
                </div>
            </Col>
            <Col span={11}>
                <List size="small" itemLayout="horizontal">
                    <Item title={'Job Title'} value={'1463400'}/>
                    <Item title={'Employment Status'} value={'Proffesionals'}/>
                    <Item title={'Joined Date'} value={'Male'}/>
                    <Item title={'Sub Unit'} value={'Ghanaian'}/>
                    <Item title={'Location'} value={'Single'}/>
                </List>
            </Col>
            <Col span={11}>
                <List size="small" itemLayout="horizontal">
                    <Item title={'Start Date'} value={'Computer Science'}/>
                    <Item title={'End Date'} value={'Amos Appiah Nkum'}/>
                    <Item title={'Contract Details'} value={'Male'}/>
                </List>
            </Col>
        </Row>
    )
}

Job.propTypes = {

}

export default connect()(Job)
