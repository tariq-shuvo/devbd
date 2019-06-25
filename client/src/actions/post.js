import axios from 'axios'
import {setAlert} from './alerts'
import {
  GET_POST,
  POST_ERROR,
  GET_POST_BY_ID,
  ADD_COMMENT,
  REMOVE_COMMENT,
  REMOVE_POST,
  ADD_POST,
  UPDATE_LIKE
} from './types'

// GET Posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts')

    dispatch({
      type: GET_POST,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status}
    })
  }
}

// Get Single post
export const getPostById = postId => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${postId}`)

    dispatch({
      type: GET_POST_BY_ID,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status}
    })
  }
}

// Add New Comment
export const addComment = (formDtata, postId) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post(
      `/api/posts/comment/${postId}`,
      formDtata,
      config
    )

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    })
    dispatch(setAlert('Comment Added Successfully', 'success'))
  } catch (error) {
    const errors = error.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: POST_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status}
    })
  }
}

// Delete Comment
export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    await axios.delete(`/api/posts/comment/${postId}/${commentId}`, config)

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    })
    dispatch(setAlert('Comment Deleted Successfully', 'success'))
  } catch (error) {
    const errors = error.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: POST_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status}
    })
  }
}

// Add New Post
export const addPost = formDtata => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post('/api/posts/', formDtata, config)

    dispatch({
      type: ADD_POST,
      payload: res.data
    })
    dispatch(setAlert('New Post Added Successfully', 'success'))
  } catch (error) {
    const errors = error.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: POST_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status}
    })
  }
}

// Delete Post
export const deletePost = postId => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    await axios.delete(`/api/posts/${postId}`, config)

    dispatch({
      type: REMOVE_POST,
      payload: postId
    })
    dispatch(setAlert('Post Deleted Successfully', 'success'))
  } catch (error) {
    const errors = error.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: POST_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status}
    })
  }
}

// Like Post
export const likePost = postId => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.put(`/api/posts/like/${postId}`, config)

    dispatch({
      type: UPDATE_LIKE,
      payload: {id: postId, likes: res.data}
    })
    dispatch(setAlert('You liked the post.', 'success'))
  } catch (error) {
    const errors = error.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: POST_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status}
    })
  }
}

// Unlike Post
export const unlikePost = postId => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.put(`/api/posts/unlike/${postId}`, config)

    dispatch({
      type: UPDATE_LIKE,
      payload: {id: postId, likes: res.data}
    })
    dispatch(setAlert('You like removed from the post.', 'success'))
  } catch (error) {
    const errors = error.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: POST_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status}
    })
  }
}
