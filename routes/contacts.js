const express = require('express');
const { createContact, editContact, searchContact } = require('../controllers/contactController');
const router = express.Router();

router.post('/create', createContact);
router.put('/edit', editContact);
router.post('/search', searchContact);

module.exports = router;
