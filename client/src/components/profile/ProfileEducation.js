import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

import Moment from 'react-moment'
import moment from 'moment'

const ProfileEducation = ({
  education: {current, _id, school, degree, fieldofstudy, from, to, description}
}) => {
  return (
    <Fragment>
      <div>
        <h3 class='text-dark'>{school}</h3>
        <p>
          <Moment format='YYYY/MM/DD'>{moment.utc(from)}</Moment> -{' '}
          {to !== null ? (
            <Moment format='YYYY/MM/DD'>{moment.utc(to)}</Moment>
          ) : (
            'now'
          )}
        </p>
        <p>
          <strong>Degree: </strong>
          {degree}
        </p>
        <p>
          <strong>Field Of Study: </strong>
          {fieldofstudy}
        </p>
        <p>
          <strong>Description: </strong>
          {description}
        </p>
      </div>
    </Fragment>
  )
}

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired
}

export default ProfileEducation
