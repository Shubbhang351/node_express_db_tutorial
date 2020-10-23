const express = require('express');
const Lessons = require('../models/dbHelpers');

const router = express.Router();

router.delete('/:id', (req,res) => {
    const {id} = req.params;

    Lessons.removeMessage(id).then(count => {
        if(count > 0){
            res.status(200).json({message:`Messages with id ${id} succesfully deleted`});
        }
        else{
            res.status(404).json({message : "No mesages with that Id"});
        }
    })
    .catch(error => {
        res.status(500).json({message : "Error in deleting messages"});
    })
});

module.exports = router;