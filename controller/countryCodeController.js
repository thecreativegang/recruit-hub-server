const CountryCode = require('../Schemas/countrySchema');

exports.get = async (req, res) => {
  const countries = await CountryCode.find();
  res.status(201).send(countries);
};
