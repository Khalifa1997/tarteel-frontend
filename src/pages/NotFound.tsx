import React from 'react';
import {Helmet} from "react-helmet";
import {InjectedIntl, injectIntl} from "react-intl"
import {Link} from "react-router-dom";

import T from "../components/T";
import KEYS from "../locale/keys";


interface IProps {
  intl: InjectedIntl;
}

class NotFound extends React.Component<IProps> {
  public render() {
    const {intl} = this.props;
    return (
      <div>
        <Helmet>
          <title>
            { intl.formatMessage({id: KEYS.NOT_FOUND_PAGE_TEMPLATE_TITLE}) }
          </title>
        </Helmet>
        <T id={KEYS.NOT_FOUND_PAGE_TEXT}/>
        <Link to="/">Go Home</Link>
      </div>
    );
  }
}

export default injectIntl(NotFound);
