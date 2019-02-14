import React from 'react';

import config from '../../../config';
import {Container} from './styles';
import Navbar from "../../components/Navbar";
import {IDataset} from "../../types/GlobalState";

interface IProps {
  dataset: IDataset;
}

class DataSet extends React.Component<IProps, never> {
  render() {
    return (
      <Container>
        <Navbar />
        <div className="content">
          <h1>
            Download Tarteel Datasets
          </h1>
          <p>
            The full dataset is available in CSV format. Audio files can be downloaded from the accompanying URLs in the CSV.
          </p>
          <ul>
            <li>
              <a href={`${config('cdnURL')}/datasets/tarteel_v1.0.csv`}>
                Tarteel version 1.0
              </a>
              &nbsp;
              (.csv, 5.6 MB) -- approximately 25,000 recordings without evaluations
            </li>
          </ul>
          <h2>
            Download Sample Recordings
          </h2>
          <p>
            Here are some sample audio files that have been submitted by Tarteel users:
          </p>
          <div className="recordings">
            {
              this.props.dataset.sample.map((url: string, i: number) => {
                return (
                  <audio key={i} controls={true}>
                    <source src={url} type="audio/mp3" />
                  </audio>
                )
              })
            }
          </div>
        </div>
      </Container>
    )
  }
}

export default DataSet;
