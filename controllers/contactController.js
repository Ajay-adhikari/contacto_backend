const jwt = require('jsonwebtoken');
const Contact = require('../models/Contact');
const crypto = require('crypto');

const SECRET_KEY = 'as2809';

const encrypt = (text) => {
    const cipher = crypto.createCipher('aes-256-cbc', SECRET_KEY);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};

const decrypt = (text) => {
    const decipher = crypto.createDecipher('aes-256-cbc', SECRET_KEY);
    let decrypted = decipher.update(text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (err) {
        return null;
    }
};

const createContact = async (req, res) => {
    const { token, name, phone, email, linkedin, twitter } = req.body;
    const decoded = verifyToken(token);

    if (!decoded) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    const newContact = new Contact({
        name: encrypt(name),
        phone,
        email: email ? encrypt(email) : null,
        linkedin: linkedin ? encrypt(linkedin) : null,
        twitter: twitter ? encrypt(twitter) : null
    });

    try {
        await newContact.save();
        res.json({ message: 'Contact created successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error creating contact' });
    }
};

const editContact = async (req, res) => {
    const { token, name, email, linkedin, twitter } = req.body;
    const decoded = verifyToken(token);

    if (!decoded) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    try {
        const contact = await Contact.findOne({ name: encrypt(name) });

        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }

        if (email) contact.email = encrypt(email);
        if (linkedin) contact.linkedin = encrypt(linkedin);
        if (twitter) contact.twitter = encrypt(twitter);

        await contact.save();
        res.json({ message: 'Contact updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error updating contact' });
    }
};

const searchContact = async (req, res) => {
    const { token, search_token } = req.body;
    const decoded = verifyToken(token);
console.log(search_token)
    if (!decoded) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    try {
        const contacts = await Contact.find();
        const results = contacts.filter(contact => decrypt(contact.name).includes(search_token))
                                .map(contact => ({
                                    name: decrypt(contact.name),
                                    phone: contact.phone,
                                    email: contact.email ? decrypt(contact.email) : null,
                                    linkedin: contact.linkedin ? decrypt(contact.linkedin) : null,
                                    twitter: contact.twitter ? decrypt(contact.twitter) : null
                                }));

        res.json(results);
    } catch (err) {
        res.status(500).json({ error: 'Error searching contacts' });
    }
};

module.exports = { createContact, editContact, searchContact };
