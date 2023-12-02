const express = require('express')
const mongoose = require('mongoose')


const UserData = require('../models/Reservations')
const app = express()
const masterKey = "123456789"

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/Data', async (req, res) => {
    const userKey = (req.query.key)
    if (userKey === masterKey) {
        try {
            const userData = await UserData.find({});
            res.status(200).json(userData);
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    else {
        res
            .status(404)
            .json({ error: "You are not authorized" })
    }

})

app.get('/Data/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userData = await UserData.findById(id);
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


app.post('/Data', async (req, res) => {
    try {
        const userData = await UserData.create(req.body)
        res.status(200).json(userData);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

// update a Data
app.put('/Data/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userData = await UserData.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if (!userData) {
            return res.status(404).json({ message: `cannot find any product with ID ${id}` })
        }
        const updateduserData = await UserData.findById(id);
        res.status(200).json(updateduserData);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


// delete a product

app.delete('/Data/:id', async (req, res) => {
    const userKey = (req.query.key)
    if (userKey === masterKey) {

        try {
            const userKey = (req.query.key)
            const { id } = req.params;
            const userData = await UserData.findByIdAndDelete(id);
            if (!userData) {
                return res.status(404).json({ message: `cannot find any Parking Data with ID ${id}` })
            }
            res.status(200).json(userData);

        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    else {
        res
            .status(404)
            .json({ error: "You are not authorized" })
    }

})

mongoose.set("strictQuery", false)
mongoose.
    connect('mongodb+srv://admin:1234@api.w1sen0x.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('connected to MongoDB')
        app.listen(2000, () => {
            console.log(`Node API app is running on port 2000`)
        });
    }).catch((error) => {
        console.log(error)
    })