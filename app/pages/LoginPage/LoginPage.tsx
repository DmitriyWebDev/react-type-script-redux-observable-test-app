import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

type Props = any;

export class LoginPage extends React.Component<Props> {
  render() {
    return (
      <div>
        <div>Login page</div>
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

export default connector(LoginPage);
