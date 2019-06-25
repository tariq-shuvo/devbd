import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import Spinner from '../layout/Spinner'
import {Link} from 'react-router-dom'

import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGithubRepo from './ProfileGithubRepo'

import {getProfileById} from '../../actions/profile'

const Profile = ({
  getProfileById,
  profile: {profile, loading},
  auth,
  match
}) => {
  useEffect(() => {
    getProfileById(match.params.id)
  }, [getProfileById, match.params.id])
  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-light'>
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to='/edit-profile' className='btn btn-light'>
                Edit Profile
              </Link>
            )}
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />

            <div class='profile-exp bg-white p-2'>
              <h2 class='text-primary'>Experience</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map((experience, index) => (
                    <ProfileExperience
                      key={experience.id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                <div>
                  <h4>No experience added yet</h4>
                </div>
              )}
            </div>

            <div class='profile-edu bg-white p-2'>
              <h2 class='text-primary'>Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((education, index) => (
                    <ProfileEducation
                      key={education.id}
                      education={education}
                    />
                  ))}
                </Fragment>
              ) : (
                <div>
                  <h4>No education added yet</h4>
                </div>
              )}
            </div>

            <div class='profile-github'>
              <h2 class='text-primary my-1'>
                <i class='fab fa-github' /> Github Repos
              </h2>
              {profile.githubusername ? (
                <Fragment>
                  <ProfileGithubRepo username={profile.githubusername} />
                </Fragment>
              ) : (
                <div>
                  <h4>No github username provided yet.</h4>
                </div>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  {getProfileById}
)(Profile)
