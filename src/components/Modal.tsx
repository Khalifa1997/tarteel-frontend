import React, {CSSProperties} from 'react';
import ReactModal from 'react-modal';
import {Icon} from "react-icons-kit";
import {close as closeIcon} from 'react-icons-kit/ionicons/close'

import ModalClose from "./ModalClose";

interface IProps {
  handleCloseModal?(): void;
  isOpen: boolean;
  style?: CSSProperties;
  closable?: boolean;
  [key:string]: any;
}

class Modal extends React.Component<IProps> {
  render() {
    return (
      <ReactModal
        {...this.props}
        isOpen={this.props.isOpen}
        onRequestClose={this.props.handleCloseModal}
        ariaHideApp={false}
        style={{
          content: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 100,
            margin: 'auto',
            overflow: 'visible',
            ...this.props.style
          },
          overlay: {
            zIndex: 100,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          }
        }}
      >
        {
          this.props.closable ?
            <ModalClose onClick={this.props.handleCloseModal}>
              <div className="icon">
                <Icon icon={closeIcon} size={15}/>
              </div>
            </ModalClose>
            : null
        }
        {
          this.props.children
        }
      </ReactModal>
    )
  }
}

export default Modal;
