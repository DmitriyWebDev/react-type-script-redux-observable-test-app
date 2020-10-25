import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootStoreData } from '../../shared/types/redux-types';
import { RouteChildrenProps } from 'react-router-dom';

type Props = PropsFromRedux;

export class LoginPage extends React.Component<Props> {
  render() {
    return (
      <div>
        <div>Login page</div>
      </div>
    );
  }
}

const mapState = (state: RootStoreData, ownProps: RouteChildrenProps) => {
  return {
    ...ownProps,
  };
};

const mapDispatch = {};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(LoginPage);
