import React from 'react';
import { Helmet } from 'react-helmet';

import config from '../../../config';
import { Container } from './styles';
import Navbar from '../../components/Navbar';
import { InjectedIntl, injectIntl } from 'react-intl';
import { IDataset } from '../../types/GlobalState';
import T from '../../components/T';
import KEYS from '../../locale/keys';

interface IProps {
  dataset: IDataset;
  intl: InjectedIntl;
}

class DataSet extends React.Component<IProps, never> {
  render() {
    const { intl } = this.props;

    return (
      <Container>
        <Helmet>
          <title>
            {intl.formatMessage({ id: KEYS.TARTEEL_DATASET_PAGE_TITLE })}
          </title>
        </Helmet>
        <Navbar />
        <div className="content">
          <h1>
            <T id={KEYS.DATASET_DOWNLOAD_TEXT} />
          </h1>
          <p>
            <T id={KEYS.DATASET_DOWNLOAD_PARAGRAPH} />
          </p>
          <ul>
            <li>
              <a href={`${config('cdnURL')}/datasets/tarteel_v1.0.csv`}>
                <T id={KEYS.CURRENT_APPLICATION_VERSION} />
              </a>
              &nbsp;
              <T id={KEYS.DATASET_DOWNLOAD_DETAILS} />
            </li>
          </ul>
          <h2>
            <T id={KEYS.DATASET_DOWNLOAD_SAMPLE_RECORDINGS_TEXT} />
          </h2>
          <p>
            <T id={KEYS.DATASET_DOWNLOAD_SAMPLE_RECORDINGS_PARAGRAPH} />
          </p>
          <div className="recordings">
            {this.props.dataset.sample.map((url: string, i: number) => {
              return (
                <audio key={i} controls={true}>
                  <source src={url} type="audio/mp3" />
                </audio>
              );
            })}
          </div>
        </div>
      </Container>
    );
  }
}

export default injectIntl(DataSet);
