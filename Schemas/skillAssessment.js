const mongoose = require('mongoose');

const skillAssessmentSchema = mongoose.Schema({
  question: {
    type: String,
    require: true,
    options: [
      {
        option1: {
          type: String,
          require: true,
          isCorrect: {
            type: Boolean,
            require: true,
          },
        },
      },
      {
        option2: {
          type: String,
          require: true,
          isCorrect: {
            type: Boolean,
            require: true,
          },
        },
      },
      {
        option3: {
          type: String,
          require: true,
          isCorrect: {
            type: Boolean,
            require: true,
          },
        },
      },
      {
        option4: {
          type: String,
          require: true,
          isCorrect: {
            type: Boolean,
            require: true,
          },
        },
      },
    ],
  },
});

module.exports = mongoose.model('SkillAssessment', skillAssessmentSchema);
