const SkillAssessment = require('../Schemas/skillAssessment');

exports.get = async (req, res) => {
  const questions = await SkillAssessment.find({});
  res.status(201).json(questions);
};
