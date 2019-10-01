const express = require('express');
const router = express.Router();
const User = require('./schema');


//GETS ALL MEMBERS
router.get('/', async (req,res) => {
    const result = await User.find().exec();
    res.json(result);
})

//get single member
router.get('/:id', async (req,res) => {
    const passedId = req.params.id;
    await User.findByIdAndUpdate(passedId,{$set:req.body}, (err,result) => {
        if(err) {
            console.log(err);
        }
        res.json(result);
    });
});

//create member 
router.post('/', (req,res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    const testUser = new User({
        name: req.body.name,
        surname: req.body.surname,
        login: req.body.login  || req.body.name,
        password: req.body.password || "user123",
    });
    if(!testUser.name || !testUser.surname) {
        res.status(400).json({ msg: 'WRONG DATA' });
    }else {
        testUser.save();
        res.status(200).json({ msg: 'User added' })
    }
});

//Update Member
router.put('/:id', async (req,res) => {
    const passedId = req.params.id;
    await User.findByIdAndUpdate(passedId,{$set:req.body}, (err,result) => {
        if(err) {
            console.log(err);
        }
        res.status(200).json({ msg: "User changed" })
    });
});

router.delete('/:id', async (req,res) => {
    const passedId = req.params.id;
    await User.findByIdAndDelete({_id: passedId}, (err,result) => {
        if(err) {
            console.log(err)
        }
        res.status(200).json({ msg: "User deleted" })
    });
})

module.exports = router;