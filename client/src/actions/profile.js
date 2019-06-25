import axios from 'axios'

import {setAlert} from './alerts'
import {
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  CLEAR_PROFILE
} from './types'

// Get current user profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('api/profile/me')

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status}
    })
  }
}

// Get all users profile
export const getProfiles = () => async dispatch => {
  dispatch({type: CLEAR_PROFILE})
  try {
    const res = await axios.get('/api/profile')

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status}
    })
  }
}

// Get specific user profile
export const getProfileById = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/${userId}`)

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status}
    })
  }
}

// Get github repos
export const getGithubRepos = username => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`)

    dispatch({
      type: GET_REPOS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status}
    })
  }
}

// Create or Update Profile
export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post('/api/profile', formData, config)

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'))

    if (!edit) {
      history.push('/dashboard')
    }
  } catch (error) {
    const errors = error.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status}
    })
  }
}

// Add Experances

export const addExperience = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.put('/api/profile/experience', formData, config)

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Experience Added', 'success'))

    history.push('/dashboard')
  } catch (error) {
    const errors = error.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status}
    })
  }
}

// Add Educations

export const addEducation = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.put('/api/profile/education', formData, config)

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Education Added', 'success'))

    history.push('/dashboard')
  } catch (error) {
    const errors = error.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status}
    })
  }
}

// Delete Educations

export const deleteEducation = id => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.delete(`/api/profile/education/${id}`, config)

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Education Removed', 'success'))
  } catch (error) {
    const errors = error.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status}
    })
  }
}

// Delete Experience

export const deleteExprience = id => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.delete(`/api/profile/experience/${id}`, config)

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Education Removed', 'success'))
  } catch (error) {
    const errors = error.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status}
    })
  }
}

// Delete Account & Profile
export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure? This can NOT be undo!')) {
    try {
      await axios.delete('/api/profile')

      dispatch({type: CLEAR_PROFILE})
      dispatch({type: ACCOUNT_DELETED})

      dispatch(setAlert('Your account has been permanantly deleted'))
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {msg: err.response.statusText, status: err.response.status}
      })
    }
  }
}
