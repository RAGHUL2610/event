const express = require('express');
const multer = require('multer');
const Event = require('../models/Events');
const fs = require('fs-extra');

const app = express.Router();


const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    try {
      const dir = "EventFiles/" + req.body.eventName;
      await fs.ensureDir(dir); // Ensure directory existence, creating it if it doesn't exist
      cb(null, dir);
    } catch (error) {
      console.error('Error creating directory:', error);
      cb(error, null);
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
console.log(__dirname);

const upload = multer({ storage: storage });

app.get('/eventsdata/:id', async function (req, res) {
  try {
    const events = await Event.findById(req.params.id);

    app.use("/eventfiles", express.static("EventFiles/" + events.Ename))

    res.send(events);
    console.log(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/events', async function (req, res) {
  try {
    const event = await Event.find();
    console.log(event);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.send(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/events', upload.fields([
  { name: 'permissionLetter', maxCount: 1 },
  { name: 'chiefProfile', maxCount: 1 },
  { name: 'agenda', maxCount: 1 },
  { name: 'requestLetter', maxCount: 1 },
  { name: 'attendance', maxCount: 1 },
  { name: 'feedbackStudents', maxCount: 1 },
  { name: 'chiefFeedback', maxCount: 1 }
]), async function (req, res) {
  console.log(req.files);

  try {
    // Create a new event object with data from the request body
    const newEvent = new Event({
      Ename: req.body.eventName,
      EDate: req.body.eventDate,
      EChiefName: req.body.chiefName,
    });

    // Add file paths if files were uploaded
    if (req.files) {
      if (req.files['permissionLetter'] && req.files['permissionLetter'][0]) {
        newEvent.EPermission = req.files['permissionLetter'][0].filename;
      }
      if (req.files['chiefProfile'] && req.files['chiefProfile'][0]) {
        newEvent.EChiefProfile = req.files['chiefProfile'][0].filename;
      }
      if (req.files['agenda'] && req.files['agenda'][0]) {
        newEvent.EChiefAgenda = req.files['agenda'][0].filename;
      }
      if (req.files['requestLetter'] && req.files['requestLetter'][0]) {
        newEvent.ERequestLetter = req.files['requestLetter'][0].filename;
      }
      if (req.files['attendance'] && req.files['attendance'][0]) {
        newEvent.EAttendance = req.files['attendance'][0].filename;
      }
      if (req.files['feedbackStudents'] && req.files['feedbackStudents'][0]) {
        newEvent.EFeedback = req.files['feedbackStudents'][0].filename;
      }
      if (req.files['chiefFeedback'] && req.files['chiefFeedback'][0]) {
        newEvent.EChiefFeedback = req.files['chiefFeedback'][0].filename;
      }
    }

    // Save the new event to the database
    const savedEvent = await newEvent.save();

    // Respond with the saved event data
    res.status(201).json(savedEvent);
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(400).json({ message: error.message });
  }
});

app.put('/events/:id', upload.fields([
  { name: 'permissionLetter', maxCount: 1 },
  { name: 'chiefProfile', maxCount: 1 },
  { name: 'agenda', maxCount: 1 },
  { name: 'requestLetter', maxCount: 1 },
  { name: 'attendance', maxCount: 1 },
  { name: 'feedbackStudents', maxCount: 1 },
  { name: 'chiefFeedback', maxCount: 1 }
]), async function (req, res) {
  try {
    // Find the event by ID
    const event = await Event.findById(req.params.id);

    // If event not found, return 404
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Delete existing files if they exist
    const filesToDelete = [
      event.EAttendance,
      event.EChiefAgenda,
      event.EChiefFeedback,
      event.EChiefProfile,
      event.EFeedback,
      event.EPermission,
      event.ERequestLetter
    ];
    for (const file of filesToDelete) {
      if (file) {
        fs.unlinkSync(`EventFiles/${event.Ename}/${file}`);
      }
    }

    // Update event properties
    event.Ename = req.body.eventName;
    event.EDate = req.body.eventDate;
    event.EChiefName = req.body.chiefName;

    // Set file paths if files were uploaded
    if (req.files) {
      event.EPermission = req.files['permissionLetter'] ? req.files['permissionLetter'][0].filename : null;
      event.EChiefProfile = req.files['chiefProfile'] ? req.files['chiefProfile'][0].filename : null;
      event.EChiefAgenda = req.files['agenda'] ? req.files['agenda'][0].filename : null;
      event.ERequestLetter = req.files['requestLetter'] ? req.files['requestLetter'][0].filename : null;
      event.EAttendance = req.files['attendance'] ? req.files['attendance'][0].filename : null;
      event.EFeedback = req.files['feedbackStudents'] ? req.files['feedbackStudents'][0].filename : null;
      event.EChiefFeedback = req.files['chiefFeedback'] ? req.files['chiefFeedback'][0].filename : null;
    }

    // Save updated event to the database
    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (error) {
    // Handle errors
    res.status(400).json({ message: error.message });
  }
});

app.delete('/events/:id', async function (req, res) {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const dir = "EventFiles/" + event.Ename;

    // First, remove all files in the directory before deleting the directory itself
    fs.readdirSync(dir).forEach(file => {
      fs.unlinkSync(dir + '/' + file);
    });

    // Then, remove the directory itself
    fs.rmdirSync(dir);

    // Finally, remove the event from the database
    await event.remove();

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = app;