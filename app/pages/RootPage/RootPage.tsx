import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteChildrenProps } from 'react-router-dom';
import { RootStoreData } from '../../shared/types/redux-types';
import {
  testServiceLoadedDataOneSelector,
  testServiceLoadedDataTwoSelector,
  testServiceLoadedDataThreeSelector,
  testServiceLoadedDataFourSelector,
} from '../../shared/services/testService/selectors';
import { getDataFour, getDataOne, getDataThree, getDataTwo } from '../../shared/services/testService/async-actions';

type Props = PropsFromRedux;

export class RootPage extends React.Component<Props> {
  componentDidMount() {
    const { getDataOne, getDataTwo, getDataThree, getDataFour } = this.props;

    getDataOne();
    getDataTwo();
    getDataThree();
    getDataFour();
  }

  render() {
    const { isLoadedDataOne, isLoadedDataTwo, isLoadedDataThree, isLoadedDataFour } = this.props;

    return (
      <div>
        <div>Root page</div>
        <div>Data 1: {!isLoadedDataOne ? '-' : 'Success'}</div>
        <div>Data 2: {!isLoadedDataTwo ? '-' : 'Success'}</div>
        <div>Data 3: {!isLoadedDataThree ? '-' : 'Success'}</div>
        <div>Data 4: {!isLoadedDataFour ? '-' : 'Success'}</div>
      </div>
    );
  }
}

const mapState = (state: RootStoreData, ownProps: RouteChildrenProps) => {
  return {
    ...ownProps,
    isLoadedDataOne: testServiceLoadedDataOneSelector(state),
    isLoadedDataTwo: testServiceLoadedDataTwoSelector(state),
    isLoadedDataThree: testServiceLoadedDataThreeSelector(state),
    isLoadedDataFour: testServiceLoadedDataFourSelector(state),
  };
};

const mapDispatch = {
  getDataOne,
  getDataTwo,
  getDataThree,
  getDataFour,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(RootPage);
