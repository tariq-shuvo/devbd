import React, {Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types'

import {Link} from 'react-router-dom'
import {getPostById, addComment} from '../../actions/post'

import {connect} from 'react-redux'

import Spinner from '../layout/Spinner'
import Comment from './Comment'

const SinglePost = ({
  match,
  getPostById,
  addComment,
  post: {post, loading},
  auth
}) => {
  const [formData, setFormData] = useState({
    text: ''
  })

  const {text} = formData

  const onChangeData = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = e => {
    e.preventDefault()
    addComment(formData, match.params.id)
    setFormData({
      text: ''
    })
  }

  useEffect(() => {
    getPostById(match.params.id)
  }, [getPostById, match.params.id])
  return (
    <Fragment>
      <Link to='/post' className='btn'>
        Back To Posts
      </Link>
      {post === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='post bg-white p-1 my-1'>
            <div>
              <a href='profile.html'>
                <img className='round-img' src={post.avatar} alt='' />
                <h4>{post.name}</h4>
              </a>
            </div>
            <div>
              <p className='my-1'>{post.text}</p>
            </div>
          </div>

          <div className='post-form'>
            <div className='bg-primary p'>
              <h3>Leave A Comment</h3>
            </div>
            <form className='form my-1' onSubmit={e => onSubmit(e)}>
              <textarea
                cols='30'
                rows='5'
                placeholder='Comment on this post'
                name='text'
                value={text}
                onChange={e => onChangeData(e)}
                required
              />
              <input
                type='submit'
                className='btn btn-dark my-1'
                value='Submit'
              />
            </form>
          </div>

          <div className='comments'>
            {post.comments.length > 0 ? (
              post.comments.map((comment, index) => (
                <Comment comment={comment} key={index} postId={post._id} />
              ))
            ) : (
              <Fragment>
                <h4>No comments on this post yet</h4>
              </Fragment>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

SinglePost.propTypes = {
  getPostById: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  {getPostById, addComment}
)(SinglePost)
