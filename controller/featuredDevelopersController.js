const FeaturedDeveloper = require('../Schemas/featuredDevelopers');

exports.create = async (req, res) => {
  const { name, expertise } = req.body;

  const developer = new FeaturedDeveloper({ name, expertise });
  await developer.save();

  res.status(201).json({
    user: {
      name: developer.name,
      expertise: developer.expertise,
    },
  });
};
