import React from 'react'
import {TlaModal} from "../../commons/tla-modal";
import {useLocation} from "react-router-dom";
import OrderDetailContent from "./order-detail-content";
import CloseModal from "../../commons/close-modal";


function OrderDetailModal () {
    const { state } = useLocation()
    return (
        <TlaModal title={'Dispatch Order'}>
            <OrderDetailContent data={state.data}/>
            <div align={'right'} style={{ marginTop: 15 }}>
                <CloseModal btnText={'Close'}/>
            </div>
        </TlaModal>
    )
}
OrderDetailModal.propTypes = {

}

export default OrderDetailModal
