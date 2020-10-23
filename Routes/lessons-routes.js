const express = require('express');
const Lessons = require('../models/dbHelpers');

const router = express.Router();


router.post('/',(req,res) => {
    const newPost = req.body;
    Lessons.add(newPost).then(lesson => {
        res.status(200).json(lesson);
    })
    .catch(error => {
        res.status(404).json({message : "cannot add lessons"})
    })
});

router.get('/', (req,res) => {
    Lessons.find().then(lessons => {
        res.status(200).json(lessons);
    })
    .catch(error => {
        res.status(404).json({message : "cannot get lessons"});
    })
})

router.get('/:id',(req,res) => {
    const {id} = req.params;
    Lessons.findById(id).then(lesson => {
        if(lesson) {
            res.status(200).json(lesson);
        }
        else{
            res.status(404).json({message:"record not found"});
        }
    })
    .catch(error => {
        res.status(500).json({message: "Unable to perform operations"});
    })
});

router.delete('/:id',(req,res) => {
    const {id} = req.params;
    Lessons.remove(id).then(count => {
        if(count > 0){
            res.status(200).json({message:"Successfully Deleted"});
        }
        else{
            res.status(404).json({message:"Record does not exists"});
        }
    })
    .catch(error => {
        res.status(500).json({message: "Unable to perform operations"});
    })
});

router.patch('/:id',(req,res) => {
    const {id} = req.params;
    const change = req.body;
    Lessons.update(id,change).then(lesson => {
        if(lesson) {
            res.status(200).json(lesson);
        }
        else{
            res.status(404).json({message:"Record does not exists"});
        }
    }).catch(error => {
        res.status(500).json({message: "Error updating record"});
    })
});

router.post('/:id/messages',(req,res) => {
    const {id} = req.params;
    const msg = req.body;
    
    if(!msg.lesson_id) {
        msg["lesson_id"] = parseInt(id, 10);
    }

    Lessons.findById(id).then(lesson => {
        if (!lesson) {
            res.status(404).json({message: "Invalid id"});
        }
        // check for all required field
        if (!msg.sender || !msg.text){
            res.status(400).json({message:"Must provide both sender and Text"});
        }

        Lessons.addMessage(msg, id).then(message => {
            if(message) {
                res.status(200).json(message);
            }
        })
        .catch(error => {
            res.status(500).json({message:"failed to add message"});
        })
    })
    .catch(error => {
        res.status(500).json({message:"error finding lesson"})
    })
});

router.get('/:id/messages', (req,res) => {
    const {id} = req.params;

    Lessons.findLessonMessages(id).then(lessons => {
        res.status(200).json(lessons);
    })
    .catch(error => {
        res.status(500).json({message:"Error retrieving messages"});
    })
});

module.exports = router;