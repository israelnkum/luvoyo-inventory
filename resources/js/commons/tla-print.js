import React, {useRef} from 'react';
import {useReactToPrint} from 'react-to-print';
import {Button} from "antd";
import PropTypes from "prop-types";

export const ComponentToPrint = React.forwardRef((props, ref) => (
    <div style={{ background: "white", fontSize: 25 }} ref={ref}>{props.children}</div>
))
ComponentToPrint.displayName = 'ComponentToPrint'

ComponentToPrint.propTypes = {
    children: PropTypes.any
}


const TlaPrint = ({ content }) => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    return (
        <React.Fragment>
            <Button onClick={handlePrint}>Print this out!</Button>
            <div style={{ display: "none" }} >
                <ComponentToPrint ref={componentRef}>
                    {content}
                </ComponentToPrint>
            </div>
        </React.Fragment>
    );
};

TlaPrint.propTypes = {
    content: PropTypes.any
}
export default TlaPrint
