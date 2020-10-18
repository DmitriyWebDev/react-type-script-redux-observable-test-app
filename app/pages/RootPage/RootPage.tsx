import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

type Props = any;

export class RootPage extends React.Component<Props> {
  render() {
    return (
      <div>
        <div>Root page</div>
      </div>
    );
  }
}

const mapState = (state: any) => {
  return {};
};

const mapDispatch = {};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(RootPage);
