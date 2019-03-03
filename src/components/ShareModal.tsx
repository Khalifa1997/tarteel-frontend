import React from 'react';
import {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  VKShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  GooglePlusIcon,
  LinkedinIcon,
  VKIcon,
  WhatsappIcon,
  EmailIcon,
} from 'react-share';
import { ModalContent } from '../pages/Evaluator/styles';
import Modal from './Modal';
import styled from 'styled-components';
import Icon from 'react-icons-kit';
import { ic_insert_link } from 'react-icons-kit/md/ic_insert_link';
import { ic_content_copy } from 'react-icons-kit/md/ic_content_copy';
import { ic_close } from 'react-icons-kit/md/ic_close';
import copy from 'copy-to-clipboard';
import Tippy from '@tippy.js/react';
import { Instance } from 'tippy.js';
import { isMobileOnly } from 'react-device-detect';

interface IProps {
  url: string;
  quote: string;
  show: boolean;
  handleCloseModal(): void;
}

class ShowModal extends React.Component<IProps> {
  tooltip: Instance;

  handleCloseModal = () => {
    this.props.handleCloseModal();
  };
  handleCopy = () => {
    copy(this.props.url);
    this.tooltip.show();
    setTimeout(this.tooltip.hide, 1500);
  };
  render() {
    const { url, quote } = this.props;

    return (
      <Modal
        isOpen={this.props.show}
        handleCloseModal={this.handleCloseModal}
        style={styledModal}
      >
        <Container>
          <div className={'close'} onClick={this.handleCloseModal}>
            <Icon icon={ic_close} size={25} />
          </div>
          <div className="url-input">
            <span className={'icon'}>
              <Icon icon={ic_insert_link} size={20} />
            </span>
            {url}
            <Tippy
              onCreate={(instance: Instance) => {
                this.tooltip = instance;
              }}
              content={'Copied!'}
              trigger={'manual'}
            >
              <span className={'copy'} onClick={this.handleCopy}>
                <Icon icon={ic_content_copy} size={20} />
              </span>
            </Tippy>
          </div>
          <div className="share-buttons">
            <FacebookShareButton quote={quote} url={url}>
              <FacebookIcon size={isMobileOnly ? 25 : 50} round={true} />
            </FacebookShareButton>
            <TwitterShareButton quote={quote} url={url}>
              <TwitterIcon size={isMobileOnly ? 25 : 50} round={true} />
            </TwitterShareButton>
            <GooglePlusShareButton quote={quote} url={url}>
              <GooglePlusIcon size={isMobileOnly ? 25 : 50} round={true} />
            </GooglePlusShareButton>
            <LinkedinShareButton quote={quote} url={url}>
              <LinkedinIcon size={isMobileOnly ? 25 : 50} round={true} />
            </LinkedinShareButton>
            <WhatsappShareButton quote={quote} url={url}>
              <WhatsappIcon size={isMobileOnly ? 25 : 50} round={true} />
            </WhatsappShareButton>
            <VKShareButton quote={quote} url={url}>
              <VKIcon size={isMobileOnly ? 25 : 50} round={true} />
            </VKShareButton>
            <EmailShareButton quote={quote} url={url}>
              <EmailIcon size={isMobileOnly ? 25 : 50} round={true} />
            </EmailShareButton>
          </div>
        </Container>
      </Modal>
    );
  }
}

const styledModal = {
  height: '35%',
  width: isMobileOnly ? '75%' : '50%',
  left: isMobileOnly ? '20px' : '40px',
  right: isMobileOnly ? '20px' : '40px',
};

const Container = styled(ModalContent)`
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-evenly;

  .close {
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
  }

  .url-input {
    background-color: #efefef;
    border: 2px solid #c7c7c7;
    border-radius: 5px;
    padding: 8px 0;
    position: relative;

    span {
      background-color: #dedede;
      height: 100%;
      padding: 0 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      cursor: pointer;
    }
    .icon {
      position: absolute;
      left: 0;
      top: 0;
    }
    .copy {
      position: absolute;
      right: 0;
      top: 0;
    }
  }

  .share-buttons {
    display: flex;

    .SocialMediaShareButton {
      margin: 0 5px;
      cursor: pointer;
    }
  }
`;

export default ShowModal;
