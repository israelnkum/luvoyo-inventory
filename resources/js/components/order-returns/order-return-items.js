import React from 'react'
import {connect} from 'react-redux'
import {TlaModal} from "../../commons/tla-modal";
import {useLocation} from "react-router";
import CloseModal from "../../commons/close-modal";
import {Table, Tag} from "antd";


function OrderReturnItems () {
    const location = useLocation()

    return (
        <>
            <TlaModal width={'70%'} title={"Return Items"}>
                <Table dataSource={location.state?.data.order_items} pagination={false} rowKey={'id'}>
                    <Table.Column title={'Item'} dataIndex={'item'}/>
                    <Table.Column title={'Qty'} dataIndex={'qty'}/>
                    <Table.Column title={'Sub Total'} dataIndex={'sub_total'}/>
                    <Table.Column title={'Damaged'} render={({damaged}) => (
                        damaged ? <Tag color={'darkred'}>Damaged</Tag> :<Tag color={'darkgreen'}>Not Damaged</Tag>
                    )}/>
                    <Table.Column title={'Damaged Qty'} dataIndex={'damaged_qty'}/>
                    <Table.Column title={'Damaged Sub Total'} dataIndex={'damaged_sub_total'}/>
                </Table> <br/>
                <CloseModal btnText={'Close'}/>
            </TlaModal>
        </>
    );
}
OrderReturnItems.propTypes = {
}

const mapDispatchToProps = () => ({

})

export default connect(null, mapDispatchToProps)(OrderReturnItems)
