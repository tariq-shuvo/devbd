import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import {deletePost, likePost, unlikePost} from '../../actions/post'

import Moment from 'react-moment'
import moment from 'moment'

const PostItem = ({
  postInfo: {_id, text, user, name, avatar, likes, comments, date},
  auth,
  deletePost,
  likePost,
  unlikePost
}) => {
  const removePost = postId => {
    deletePost(postId)
  }

  const likeThePost = postId => {
    likePost(postId)
  }

  const unlikeThePost = postId => {
    unlikePost(postId)
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
          <button
            type='button'
            className='btn btn-light'
            onClick={() => likeThePost(_id)}
          >
            <i className='fas fa-thumbs-up' /> <span>{likes.length}</span>
          </button>
          <button
            type='button'
            className='btn btn-light'
            onClick={() => unlikeThePost(_id)}
          >
            <i className='fas fa-thumbs-down' />{' '}
          </button>
          <Link to={`/post/${_id}`} className='btn btn-primary'>
            Discussion <span className='comment-count'>{comments.length}</span>
          </Link>
          {user === auth.user._id && (
            <button
              type='button'
              className='btn btn-danger'
              onClick={() => removePost(_id)}
            >
              <i className='fas fa-times' />
            </button>
          )}
        </div>
      </div>
    </Fragment>
  )
}

PostItem.propTypes = {
  postInfo: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  {deletePost, likePost, unlikePost}
)(PostItem)
