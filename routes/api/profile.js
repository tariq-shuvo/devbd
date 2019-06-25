const express = require('express')
const router = express.Router()

const config = require('config')
const request = require('request')
const {check, validationResult} = require('express-validator/check')

const auth = require('../../middleware/auth')
const User = require('../../models/User')
const Post = require('../../models/Post')
const Profile = require('../../models/Profile')

// @route GET api/profile/me
// @description Fetch User Profile Info
// @access Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar'])

    if (!profile) {
      return res.status(400).json({
        msg: 'There are no profile info of this user'
      })
    }

    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({
      msg: 'Server error'
    })
  }
})

// @route POST api/profile
// @description Create or update user profile
// @access Private
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required')
        .not()
        .isEmpty(),
      check('skills', 'Skills is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      })
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body

    const profileFields = {}
    profileFields.user = req.user.id

    if (company) profileFields.company = company
    if (location) profileFields.location = location
    if (website) profileFields.website = website
    if (bio) profileFields.bio = bio
    if (status) profileFields.status = status
    if (githubusername) profileFields.githubusername = githubusername
    if (skills) {
      profileFields.skills = skills.split(',').map(skill => skill.trim())
    }

    profileFields.social = {}

    if (youtube) profileFields.social.youtube = youtube
    if (facebook) profileFields.social.facebook = facebook
    if (twitter) profileFields.social.twitter = twitter
    if (instagram) profileFields.social.instagram = instagram
    if (linkedin) profileFields.social.linkedin = linkedin

    try {
      let profile = await Profile.findOne({
        user: req.user.id
      })

      if (profile) {
        profile = await Profile.findOneAndUpdate(
          {
            user: req.user.id
          },
          {
            $set: profileFields
          },
          {
            new: true
          }
        )
        return res.json(profile)
      }

      console.log(profileFields)
      profile = new Profile(profileFields)
      await profile.save()
      res.json(profile)
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server error')
    }
  }
)

// @route GET api/profile
// @description Find all profiles
// @access Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar'])

    if (!profiles) {
      return res.json(400).json({
        msg: 'No profile informations found.'
      })
    }
    res.json(profiles)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
})

// @route GET api/profile/:user_id
// @description Find specific profile
// @access Public
router.get('/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar'])

    if (!profile) {
      return res.status(400).json({
        msg: 'Profile informations not found.'
      })
    }
    res.json(profile)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
})

// @route DELETE api/profile
// @description Delete specific user profile & post
// @access Private
router.delete('/', auth, async (req, res) => {
  try {
    await Post.deleteMany({user: req.user.id})
    await Profile.findOneAndRemove({
      user: req.user.id
    })
    await User.findOneAndRemove({
      _id: req.user.id
    })

    res.json({
      msg: 'User deleted'
    })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
})

// @route PUT api/profile/experience
// @description Add new experience
// @access Private
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Titile is required')
        .not()
        .isEmpty(),
      check('company', 'Company is required')
        .not()
        .isEmpty(),
      check('from', 'From date is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      })
    }

    const {title, company, location, from, to, current, description} = req.body

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    }

    try {
      let profile = await Profile.findOne({
        user: req.user.id
      })
      profile.experience.unshift(newExp)
      await profile.save()
      res.json(profile)
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server error')
    }
  }
)

// @route DELETE api/profile/experience/:exp_id
// @description Remove experience
// @access Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({
      user: req.user.id
    })
    const removeIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.params.exp_id)

    profile.experience.splice(removeIndex, 1)

    await profile.save()

    res.json(profile)
  } catch (error) {
    cconsole.error(error.message)
    res.status(500).send('Server error')
  }
})

// @route PUT api/profile/education
// @description Add new education
// @access Private
router.put(
  '/education',
  [
    auth,
    [
      check('school', 'Shool is required')
        .not()
        .isEmpty(),
      check('degree', 'Degree is required')
        .not()
        .isEmpty(),
      check('fieldofstudy', 'Field of study is required')
        .not()
        .isEmpty(),
      check('from', 'From date is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      })
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    }

    try {
      let profile = await Profile.findOne({
        user: req.user.id
      })
      profile.education.unshift(newEdu)
      await profile.save()
      res.json(profile)
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server error')
    }
  }
)

// @route DELETE api/profile/education/:edu_id
// @description Remove education
// @access Private
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({
      user: req.user.id
    })
    const removeIndex = profile.education
      .map(item => item.id)
      .indexOf(req.params.edu_id)

    profile.education.splice(removeIndex, 1)

    await profile.save()

    res.json(profile)
  } catch (error) {
    cconsole.error(error.message)
    res.status(500).send('Server error')
  }
})

// @route GET api/profile/github/:username
// @description Get github projects
// @access Public
router.get('/github/:username', async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        'githubClient'
      )}&client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: {
        'user-agent': 'node.js'
      }
    }

    request(options, (error, response, body) => {
      if (error) console.error(error)

      if (response.statusCode !== 200) {
        return res.status(404).json({
          msg: 'No Github profile found'
        })
      }

      res.json(JSON.parse(body))
    })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
})

module.exports = router
