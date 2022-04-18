const express = require('express');

const MemberController = require('../controller/member');

const router = express.Router();

router.get('/', MemberController.getAllMembers);

router.post('/', MemberController.postMember);

router.patch('/', MemberController.putMember);

router.delete('/:Id', MemberController.deleteMember);

module.exports = router;
