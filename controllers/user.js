const knex = require('../middleware/db/sqlShell');

exports.get = async (req, res, next) => {
  try {
    const users = await knex('users').select('users');

    return res.json(users);
  } catch(e) {
    next(e);
  }
};

exports.new = async (req, res, next) => {
  try {
    const { FullName, DOB, Gender } = req.body;

    if (!FullName) {
      return res.json({
        success: false,
        text: 'Not all parameters sent'
      });
    }

    await knex('users')
      .insert({ FullName, DOB, Gender });

    return res.json({ success: true });
  } catch(e) {
    next(e)
  }
};

exports.update = async (req, res, next) => {
  try {
    const { FullName, DOB, Gender } = req.body;

    if (!FullName) {
      return res.json({
        success: false,
        text: 'FullName not sent'
      });
    }

    await knex('users')
      .where({ FullName })
      .update({ DOB, Gender }, ['id', 'DOB', Gender]);

    return res.json({ success: true });
  } catch(e) {
    next(e)
  }
};

exports.init = async (req, res, next) => {
  try {
    await knex.schema
      .createTable('users', table => {
          table.string('FullName');
          table.string('DOB');
          table.string('Gender');
        });

    return res.json({ success: true });
  } catch(e) {
    next(e);
  }
};
