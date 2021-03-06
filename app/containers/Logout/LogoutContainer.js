import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Logout } from 'components';
import { logoutAndUnauth } from 'redux/modules/users';
const { func } = PropTypes;

class LogoutContainer extends React.Component {
  componentDidMount() {
    this.props.dispatch(logoutAndUnauth());
  }

  render() {
    return <Logout />;
  }
}

LogoutContainer.propTypes = {
  dispatch: func.isRequired,
};

// const LogoutContainer = React.createClass({
//   propTypes: {
//     dispatch: PropTypes.func.isRequired,
//   },
//   componentDidMount () {
//     this.props.dispatch(logoutAndUnauth())
//   },
//   render () {
//     return (
//       <Logout />
//     )
//   }
// })

export default connect()(LogoutContainer);
