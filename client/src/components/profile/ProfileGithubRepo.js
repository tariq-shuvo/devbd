import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'

import {connect} from 'react-redux'
import {getGithubRepos} from '../../actions/profile'
import Spinner from '../layout/Spinner'

const ProfileGithubRepo = ({
  username,
  getGithubRepos,
  profile: {repos, loading}
}) => {
  useEffect(() => {
    getGithubRepos(username)
  }, [getGithubRepos, username])

  return (
    <Fragment>
      {repos === null ? (
        <Spinner />
      ) : (
        repos.map((repo, index) => (
          <div className='repo bg-white p-1 my-1' key={index}>
            <div>
              <h4>
                <a
                  href={'https://github.com/' + repo.full_name}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {repo.name}
                </a>
              </h4>
              {repo.description && <p>{repo.description}</p>}
            </div>
            <div>
              <ul>
                <li className='badge badge-primary'>
                  Stars: {repo.stargazers_count}{' '}
                </li>
                <li className='badge badge-dark'>
                  Watchers: {repo.watchers_count}{' '}
                </li>
                <li className='badge badge-light'>
                  Forks: {repo.forks_count}{' '}
                </li>
              </ul>
            </div>
          </div>
        ))
      )}
    </Fragment>
  )
}

ProfileGithubRepo.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  profile: PropTypes.array
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(
  mapStateToProps,
  {getGithubRepos}
)(ProfileGithubRepo)
