import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

import {deleteComment} from '../../actions/post'

import Moment from 'react-moment'
import moment from 'moment'

import {connect} from 'react-redux'

const Comment = ({
  comment: {_id, user, text, name, avatar, date},
  auth,
  postId,
  deleteComment
}) => {
  const removeComment = (postId, commentId) => {
    deleteComment(postId, commentId)
  }

  return (
    <Fragment>
      <div className='post bg-white p-1 my-1'>
        <div>
          <a href='profile.html'>
            <img className='round-img' src={avatar} alt='' />
            <h4>{name}</h4>
          </a>
        </div>
        <div>
          <p className='my-1'>{text}</p>
          <p className='post-date'>
            Posted on <Moment format='YYYY/MM/DD'>{moment.utc(date)}</Moment>
          </p>
          {user === auth.user._id && (
            <button type='button' className='btn btn-danger'>
              <i
                className='fas fa-times'
                onClick={() => removeComment(postId, _id)}
              />
            </button>
          )}
        </div>
      </div>
    </Fragment>
  )
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  {deleteComment}
)(Comment)
