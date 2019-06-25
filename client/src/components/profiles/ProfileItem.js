import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

const ProfileItem = ({
  profile: {
    user: {_id, name, avatar},
    status,
    company,
    location,
    skills
  }
}) => {
  return (
    <Fragment>
      <div className='profile bg-light'>
        <img className='round-img' src={avatar} alt='' />
        <div>
          <h2>{name}</h2>
          <p>{status}</p>
          <p>{company}</p>
          <Link to={`/profile/${_id}`} className='btn btn-primary'>
            View Profile
          </Link>
        </div>

        <ul>
          {skills.splice(0, 4).map(skill => (
            <li className='text-primary'>
              <i className='fas fa-check' /> {skill}
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  )
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileItem
