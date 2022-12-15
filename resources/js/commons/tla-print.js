import React, {useEffect, useRef, useState} from 'react';
import {useReactToPrint} from 'react-to-print';
import {Button} from "antd";
import PropTypes from "prop-types";
import {FiPrinter} from "react-icons/fi";

export const ComponentToPrint = React.forwardRef((props, ref) => (
    <div style={{ background: "white", fontSize: 25 }} ref={ref}>{props.children}</div>
))
ComponentToPrint.displayName = 'ComponentToPrint'

ComponentToPrint.propTypes = {
    children: PropTypes.any
}


const TlaPrint = ({ children, printOnMount }) => {
    const [printing, setPrinting] = useState(false)
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        onBeforePrint: () => setPrinting(true),
        content: () => componentRef.current,
        onAfterPrint: () => setPrinting(false)
    });

    useEffect(() => {
        printOnMount && handlePrint()
    }, [])
    return (
        <React.Fragment>
            {
                !printOnMount && <Button loading={printing} title={'Print'} onClick={handlePrint} icon={<FiPrinter/>}/>
            }
            <div style={{ display: "none" }} >
                <ComponentToPrint ref={componentRef}>
                    {children}
                </ComponentToPrint>
            </div>
        </React.Fragment>
    );
};

TlaPrint.defaultProps = {
    printOnMount: false
}

TlaPrint.propTypes = {
    children: PropTypes.any,
    printOnMount: PropTypes.bool,
}
export default TlaPrint
