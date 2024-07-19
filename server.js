const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://pyqplatform:yhFFWBt5j9H1fbSR@education.4kiisgz.mongodb.net/Course?retryWrites=true&w=majority&appName=education', {
  
});
//yhFFWBt5j9H1fbSR

// Models
const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    years: [{
        year: String,
        subjects: [{
            name: String,
            questions: [{
                type: { type: String }, // 'text', 'image', 'video'
                content: String,
                like: { type: Number, default: 0 },
                dislike: { type: Number, default: 0 }
            }]
        }]
    }]
}));

// Routes
app.post('/course', async (req, res) => {
    const course = new Course(req.body);
    await course.save();
    res.send(course);
});

app.get('/courses', async (req, res) => {
    const courses = await Course.find();
    res.send(courses);
});

app.post('/course/:courseId/year', async (req, res) => {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    course.years.push(req.body);
    await course.save();
    res.send(course);
});

app.post('/course/:courseId/year/:yearId/subject', async (req, res) => {
    const { courseId, yearId } = req.params;
    const course = await Course.findOne({ _id: courseId, 'years._id': yearId });
    const year = course.years.id(yearId);
    year.subjects.push(req.body);
    await course.save();
    res.send(course);
});

app.post('/course/:courseId/year/:yearId/subject/:subjectId/question', async (req, res) => {
    const { courseId, yearId, subjectId } = req.params;
    const course = await Course.findOne({ _id: courseId, 'years._id': yearId });
    const year = course.years.id(yearId);
    const subject = year.subjects.id(subjectId);
    subject.questions.push(req.body);
    await course.save();
    res.send(course);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
