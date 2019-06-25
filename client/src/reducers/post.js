import {
  GET_POST,
  POST_ERROR,
  GET_POST_BY_ID,
  ADD_COMMENT,
  REMOVE_COMMENT,
  ADD_POST,
  REMOVE_POST,
  UPDATE_LIKE
} from '../actions/types'

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
}

export default function(state = initialState, action) {
  const {type, payload} = action
  switch (type) {
    case GET_POST:
      return {
        ...state,
        posts: payload,
        loading: false
      }
    case GET_POST_BY_ID:
      return {
        ...state,
        post: payload,
        loading: false
      }
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    case ADD_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: payload
        },
        loading: false
      }
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            comment => comment._id !== payload
          )
        },
        loading: false
      }

    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false
      }
    case REMOVE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload),
        loading: false
      }
    case UPDATE_LIKE:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.id ? {...post, likes: payload.likes} : post
        ),
        loading: false
      }
    default:
      return state
  }
}
