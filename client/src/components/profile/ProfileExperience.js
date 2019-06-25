import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

import Moment from 'react-moment'
import moment from 'moment'

const ProfileExperience = ({
  experience: {current, _id, title, company, location, from, to, description}
}) => {
  return (
    <Fragment>
      <div>
        <h3 class='text-dark'>{company}</h3>
        <p>
          <Moment format='YYYY/MM/DD'>{moment.utc(from)}</Moment> -{' '}
          {to !== null ? (
            <Moment format='YYYY/MM/DD'>{moment.utc(to)}</Moment>
          ) : (
            'now'
          )}
        </p>
        <p>
          <strong>Position: </strong>
          {title}
        </p>
        <p>
          <strong>Location: </strong>
          {location}
        </p>
        <p>
          <strong>Description: </strong>
          {description}
        </p>
      </div>
    </Fragment>
  )
}

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired
}

export default ProfileExperience
