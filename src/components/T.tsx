import React, { ReactNode } from 'react';
import {
  FormattedHTMLMessage,
  InjectedIntlProps,
  injectIntl, // eslint-disable-line
} from 'react-intl';
import config from '../../config';
import LOCALE_KEYS from '../locale/keys';

interface IProps {
  id: LOCALE_KEYS;
  values?: { [key: string]: string };
  children?: (...formattedMessage: Array<string | JSX.Element>) => ReactNode;
}

const { en } = config('localeMessages');

const T: React.SFC<IProps> = ({
  id,
  values,
  children,
  ...rest
}: IProps & InjectedIntlProps) => {
  return (
    <FormattedHTMLMessage
      id={id}
      defaultMessage={en.messages[id]}
      values={values}
      {...rest}
    >
      {children}
    </FormattedHTMLMessage>
  );
};

// T.propTypes = {
//   id: PropTypes.string.isRequired,
//   values: PropTypes.object, // eslint-disable-line
//   children: PropTypes.node, // eslint-disable-line
// };

export const KEYS = LOCALE_KEYS;

export default injectIntl(T);
