import React from 'react'
import { useNavigate } from 'react-router-dom'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import { createGlobalStyle } from 'styled-components'
import {Button, Col, Row, Space} from 'antd'
import CloseModal from "./close-modal";


const GlobalStyles = createGlobalStyle`
      .tla-modal-content {
        background: #FFFFFF !important;
        box-shadow: 0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03) !important;
        border-radius: 12px !important;

      }
      .tla-modal-header {
        border-radius: 12px 12px 0 0;
      }

      .save-button {
        background: var(--Primary-400);
        border: 1px solid var(--Primary-400);
        box-shadow: var(--Shadow-xm);
        border-radius: 8px;
        height: 44px;
      }

      .cancel-button {
        background: var(--White);
        border: 1px solid var(--Gray-300);
        box-shadow: var(--Shadow-xm);
        border-radius: 8px;
        height: 44px;
      }
    `


export const TlaModal = ({ title, children, width, extra }) => {
    const navigate = useNavigate()
    return ReactDom.createPortal(
        <div className="ant-modal-root tla-modal">
            <GlobalStyles/>
            <div className="ant-modal-mask"></div>
            <div tabIndex="-1" className="ant-modal-wrap" aria-labelledby="rc_unique_0">
                <div role="dialog" aria-modal="true" className="ant-modal" style={{ width: width, transformOrigin: '29px 262px', borderRadius: 'px' }}>
                    <div className="ant-modal-content tla-modal-content">
                        <button type="button" onClick={() => { navigate(-1) }} aria-label="Close" className="ant-modal-close">
                                  <span className="ant-modal-close-x">
                                  <span role="img" aria-label="close" className="anticon anticon-close ant-modal-close-icon">
                                      <svg viewBox="64 64 896 896" focusable="false" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                          <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
                                      </svg>
                                  </span>
                                  </span>
                        </button>
                        <div className="ant-modal-header tla-modal-header">
                            <Space style={{ display: 'flex', justifyContent: 'space-between', paddingRight: 20}}>
                                <div className="ant-modal-title" id="rc_unique_0">{title}</div>
                                {extra}
                            </Space>
                        </div>

                        <div className="ant-modal-body">
                            {children}
                            {/*<div>*/}
                            {/*    <CloseModal/>*/}
                            {/*    {modalAction}*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById('portal')
    )
}
TlaModal.defaultProps = {
    title: 'Modal Title',
    type: 'text',
    width: 520,
    icon: true,
    extra: null
}
TlaModal.propTypes = {
    width: PropTypes.any,
    type: PropTypes.string,
    children: PropTypes.any,
    extra: PropTypes.any,
}
