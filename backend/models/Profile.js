const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {

  },
  handle: {
    type: String,
    required: true
  },
  company: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  bio: {
    type: String,
  },
  status: {
    type: String,
  },
  githubusername: {
    type: String,
  },
  skills: {
    type: String,
    required: true
  },
  social: {
    youtube: {
      type: String,
    },
    instagram: {
      type: String,
    },
    facebook: {
      type: String,
    },
    twitter: {
      type: String,
    },
    linkedin: {
      type: String,
    }
  },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String,
      },
      from: {
        type: String,
        required: true
      },
      to: {
        type: String,
      },
      current: {
        type: Boolean,
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
      },
      fieldOfStudy: {
        type: String,
      },
      from: {
        type: String,
        required: true
      },
      to: {
        type: String,
      },
      current: {
        type: Boolean,
      },
      description: {
        type: String
      }
    }
  ],
})

module.exports = Profile = mongoose.model('profiles', ProfileSchema)