import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'

import Spinner from '../layout/Spinner'
import ProfileItem from './ProfileItem'

import {getProfiles} from '../../actions/profile'
import {connect} from 'react-redux'

const Profiles = ({getProfiles, profile: {profiles, loading}}) => {
  useEffect(() => {
    getProfiles()
  }, [getProfiles])

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Developers</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop' /> Browse and connect with
            developers
          </p>
          <div className='profiles'>
            {profiles.length > 0 ? (
              profiles.map(profile => (
                <ProfileItem id={profile.id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired
}

const propStateToProps = state => ({
  profile: state.profile
})

export default connect(
  propStateToProps,
  {getProfiles}
)(Profiles)
