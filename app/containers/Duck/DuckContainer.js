import React from 'react';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Duck } from 'components';
import * as usersLikesAction from 'redux/modules/usersLikes';
const { func, object, bool, number } = PropTypes;

class DuckContainer extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.goToProfile = this.goToProfile.bind(this);
  }

  goToProfile(e) {
    e.stopPropagation();
    this.context.router.push('/' + this.props.duck.get('uid'));
  }

  handleClick(e) {
    e.preventDefault();
    this.context.router.push('/duckDetail/' + this.props.duck.get('duckId'));
  }

  render() {
    return (
      <Duck
        goToProfile={this.goToProfile}
        onClick={this.props.hideReplyBtn === true ? null : this.handleClick}
        {...this.props}
      />
    );
  }
}

DuckContainer.propTypes = {
  duck: object.isRequired,
  handleClick: func,
  hideLikeCount: bool.isRequired,
  hideReplyBtn: bool.isRequired,
  isLiked: bool.isRequired,
  numberOfLikes: number,
  addAndHandleLike: func.isRequired,
  handleDeleteLike: func.isRequired,
};

DuckContainer.contextTypes = {
  router: object.isRequired,
};

DuckContainer.defaultProps = {
  hideReplyBtn: false,
  hideLikeCount: true,
};

// const DuckContainer = React.createClass({
//   propTypes: {
//     duck: object.isRequired,
//     handleClick: func,
//     hideLikeCount: bool.isRequired,
//     hideReplyBtn: bool.isRequired,
//     isLiked: bool.isRequired,
//     numberOfLikes: number,
//     addAndHandleLike: func.isRequired,
//     handleDeleteLike: func.isRequired,
//   },
//   contextTypes: {
//     router: PropTypes.object.isRequired,
//   },
//   getDefaultProps () {
//     return {
//       hideReplyBtn: false,
//       hideLikeCount: true,
//     }
//   },
//   goToProfile (e) {
//     e.stopPropagation()
//     this.context.router.push('/' + this.props.duck.get('uid'))
//   },
//   handleClick (e) {
//     e.preventDefault()
//     this.context.router.push('/duckDetail/' + this.props.duck.get('duckId'))
//   },
//   render () {
//     return (
//       <Duck
//         goToProfile={this.goToProfile}
//         onClick={this.props.hideReplyBtn === true ? null : this.handleClick}
//         {...this.props} />
//     )
//   },
// })

function mapStateToProps({ ducks, likeCount, usersLikes }, props) {
  return {
    duck: ducks.get(props.duckId),
    hideLikeCount: props.hideLikeCount,
    hideReplyBtn: props.hideReplyBtn,
    isLiked: usersLikes[props.duckId] === true,
    numberOfLikes: likeCount[props.duckId],
  };
}

export default connect(
  mapStateToProps,
  dispatch => bindActionCreators(usersLikesAction, dispatch)
)(DuckContainer);
