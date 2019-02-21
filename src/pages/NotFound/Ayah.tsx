import React from 'react';
import {Helmet} from "react-helmet";
import {InjectedIntl, injectIntl} from "react-intl"
import {Link} from "react-router-dom";
import styled from 'styled-components';
import Icon from 'react-icons-kit'
import {sad} from 'react-icons-kit/icomoon/sad'

import T from "../../components/T";
import KEYS from "../../locale/keys";
import Navbar from "../../components/Navbar";
import logScreen from "../../helpers/logScreen";


interface IProps {
  intl: InjectedIntl;
}

class AyahNotFound extends React.Component<IProps> {
  componentDidMount() {
    logScreen();
  }
  public render() {
    const {intl} = this.props;

    return (
      <Container>
        <Helmet>
          <title>
            { intl.formatMessage({id: KEYS.NOT_FOUND_PAGE_TEMPLATE_TITLE}) }
          </title>
        </Helmet>
        <Navbar />
        <div className="content">
          <Icon icon={sad} size={50} className={'icon'} />
          <h1>
            <T id={KEYS.AYAH_NOT_FOUND_PAGE_TEXT} />
          </h1>
          <Link to="/surahs">
            <b>
              <T id={KEYS.PICK_DIFFERENT_AYAH} />
            </b>
          </Link>
        </div>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
  padding: 1em;
  box-sizing: border-box;
  
  .content {
    padding-top: 5em;
    display: flex;
    align-items: center;
    flex-flow: column;
    flex: 1;
    
    .icon {
      margin-bottom: 1em;
    }
    h1 {
      margin-bottom: 1em;
    }
    a {
      color: ${props => props.theme.colors.linkColor};
    }
  }
`;

export default injectIntl(AyahNotFound);
