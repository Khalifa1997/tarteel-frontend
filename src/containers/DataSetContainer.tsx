import {connect} from "react-redux";

import {getDatasetRecordings} from "../api";
import DataSet from "../pages/DataSet";
import ReduxState, {IDataset, IProfile} from "../types/GlobalState";
import { injectIntl } from 'react-intl';
import {setDatasetRecordings} from "../store/actions/dataset";


interface IStateProps {
  profile: IProfile;
  dataset: IDataset;
}

const mapStateToProps = (state: ReduxState): IStateProps => {
  return {
    profile: state.profile,
    dataset: state.dataset,
  }
};

export const DataSetContainer = {
  component: injectIntl(connect(mapStateToProps)(DataSet)),
  loadData: (store: any, req: any) => {
    return getDatasetRecordings(req)
      .then((sampleList: string[]) => {
        return store.dispatch(setDatasetRecordings(sampleList))
      })
  },
};
