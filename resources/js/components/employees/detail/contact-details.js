import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {Col, List, Row} from "antd";
import TlaEdit from "../../../commons/tla-edit";

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
function ContactDetails () {
    return (
        <Row gutter={10} justify={'space-between'}>
            <Col span={24}>
                <div align={'right'}>
                    <TlaEdit icon link={'#'} text={'Edit'} />
                </div>
            </Col>
            <Col span={11}>
                <List size="small" itemLayout="horizontal">
                    <Item title={'Address'} value={'1463400'}/>
                    <Item title={'City'} value={'Amos Appiah Nkum'}/>
                    <Item title={'Region'} value={'Male'}/>
                    <Item title={'Zip/Postal Code'} value={'Ghanaian'}/>
                    <Item title={'Country'} value={'Single'}/>
                </List>
            </Col>
            <Col span={11}>
                <List size="small" itemLayout="horizontal">
                    <Item title={'Home Telephone'} value={'0542360978'}/>
                    <Item title={'Mobile'} value={'0542360978'}/>
                   <Item title={'Work Telephone'} value={'0542360978'}/>
                    <Item title={'Work Email'} value={'amos.nkum@ttu.edu.gh'}/>
                    <Item title={'Other Email'} value={'israelnkum@gmail.com'}/>
                </List>
            </Col>
        </Row>
    )
}

ContactDetails.propTypes = {

}

export default connect()(ContactDetails)
