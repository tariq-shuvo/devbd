import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({
  profile: {
    user: {name},
    bio,
    skills
  }
}) => {
  return (
    <Fragment>
      <div className='profile-about bg-light p-2'>
        <h2 class='text-primary'>{name}'s Bio</h2>
        <p>{bio && <span>{bio}</span>}</p>
        <div class='line' />
        <h2 class='text-primary'>Skill Set</h2>
        <div class='skills'>
          {skills.map((skill, index) => (
            <div class='p-1' key={index}>
              <i class='fa fa-check' /> {skill}
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  )
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileAbout
