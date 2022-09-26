import React from 'react'
import {TlaModal} from "../../commons/tla-modal";
import {useLocation} from "react-router-dom";
import DispatchOrderDetail from "./dispatch-order-detail";
import CloseModal from "../../commons/close-modal";


function OrderDetailModal () {
    const { state } = useLocation()
    return (
        <TlaModal title={'Dispatch Order'}>
            <DispatchOrderDetail data={state.data}/>
            <div align={'right'} style={{ marginTop: 2 }}>
                <CloseModal/>
            </div>
        </TlaModal>
    )
}
OrderDetailModal.propTypes = {

}

export default OrderDetailModal
