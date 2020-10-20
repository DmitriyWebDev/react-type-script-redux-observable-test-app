import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteChildrenProps } from 'react-router-dom';

type Props = PropsFromRedux;

export class RootPage extends React.Component<Props> {
  render() {
    return (
      <div>
        <div>Root page</div>
      </div>
    );
  }
}

const mapState = (state: any, ownProps: RouteChildrenProps) => {
  console.log(ownProps);

  return {
    ...ownProps,
  };
};

const mapDispatch = {};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(RootPage);
