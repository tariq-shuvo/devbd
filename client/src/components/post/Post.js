import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'

import {connect} from 'react-redux'
import {getPosts} from '../../actions/post'

import AddPost from './AddPost'
import PostItem from './PostItem'
import Spinner from '../layout/Spinner'

const Post = ({getPosts, post: {posts, loading}}) => {
  useEffect(() => {
    getPosts()
  }, [getPosts])

  return (
    <Fragment>
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome to the community!
      </p>
      <div className='posts'>
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <AddPost />
            {posts.map((post, index) => (
              <PostItem postInfo={post} key={index} />
            ))}
          </Fragment>
        )}
      </div>
    </Fragment>
  )
}

Post.propTypes = {
  getPosts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(
  mapStateToProps,
  {getPosts}
)(Post)
