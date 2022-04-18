const Member = require('../model/member');

exports.getAllMembers = async (req, res, next) => {
  try {
    const [allmembers] = await Member.fetchAll();
    res.status(200).json(allmembers);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postMember = async (req, res, next) => {
  try {
    const postResponse = await Member.post(req.body.Id, req.body.Name);
    res.status(201).json(postResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.putMember = async (req, res, next) => {
  try {
    const putResponse = await Member.update(req.body.Id, req.body.Name);
    res.status(200).json(putResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteMember = async (req, res, next) => {
  try {
    const deleteResponse = await Member.delete(req.params.Id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
