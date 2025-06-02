const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST - Create
router.post('/', async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.status(201).json(contact);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET - All Contacts
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET - Single Contact
router.get('/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ error: "Not found" });
        res.json(contact);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT - Update Contact
router.put('/:id', async (req, res) => {
    try {
        const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: "Not found" });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE - Delete Contact
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Contact.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Not found" });
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
