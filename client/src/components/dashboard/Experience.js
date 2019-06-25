import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import moment from 'moment'
import {deleteExprience} from '../../actions/profile'
import {connect} from 'react-redux'

const Experience = ({experience, deleteExprience}) => {
  const educations = experience.map(exp => (
    <tr id={exp._id}>
      <td>{exp.company}</td>
      <td className='hide-sm'>{exp.title}</td>
      <td className='hide-sm'>
        <Moment format='YYYY/MM/DD'>{moment.utc(exp.from)}</Moment> -{' '}
        {exp.to === null ? (
          'Now'
        ) : (
          <Moment format='YYYY/MM/DD'>{moment.utc(exp.to)}</Moment>
        )}
      </td>
      <td>
        <button
          className='btn btn-danger'
          onClick={() => deleteExprience(exp._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ))
  return (
    <Fragment>
      <h2 className='my-2'>Experience Credentials</h2>
      <table className='table text-center'>
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
            <th className='hide-sm'>Action</th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  )
}

Experience.propTypes = {
  experience: PropTypes.array.isRequired
}

export default connect(
  null,
  {deleteExprience}
)(Experience)
