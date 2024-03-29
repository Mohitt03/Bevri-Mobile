const express = require('express')
const mongoose = require('mongoose')


const UserData = require('../models/Reservations')
const LoginData = require('../models/User')
const ProductsData = require('../models/Products')
const ParkingData = require('../models/Parking')

const app = express()
const masterKey = "123456789"
var port = "5000"

app.use(express.json())
app.use(express.urlencoded({ extended: false }))




// Reservation Data

app.get('/TableBookingComplete', async (req, res) => {
    try {
        const userData = await UserData.find(
            {
                "$or": [
                    { username: { $regex: "Mohit" } }
                ]
            });
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})




app.get('/Data', async (req, res) => {
    const userKey = (req.query.key)
    if (userKey === masterKey) {
        try {
            const userData = await UserData.find();
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




// Users Data





app.get('/Udata', async (req, res) => {
    const userKey = (req.query.key)
    if (userKey === masterKey) {
        try {
            const loginData = await LoginData.find({});
            res.status(200).json(loginData);
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

app.get('/Udata/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const loginData = await LoginData.findById(id);
        res.status(200).json(loginData);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


app.post('/Udata', async (req, res) => {
    try {
        const loginData = await LoginData.create(req.body)
        res.status(200).json(userData);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

app.post("/Udata", (req, res) => {
    const user = {
        id: newId,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    };
    lastId = newId;
    LoginData.push(user);
    res.status(201).json(user);
});

// update a Data
app.put('/Udata/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const loginData = await LoginData.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if (!loginData) {
            return res.status(404).json({ message: `cannot find ${id}` })
        }
        const updatedloginData = await LoginData.findById(id);
        res.status(200).json(updatedloginData);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


// delete a product

app.delete('/Udata/:id', async (req, res) => {


    try {
        const userKey = (req.query.key)
        const { id } = req.params;
        const loginData = await LoginData.findByIdAndDelete(id);
        if (!loginData) {
            return res.status(404).json({ message: `cannot find any Parking Data with ID ${id}` })
        }
        res.status(200).json(loginData);

    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})





// Products Data






app.get('/Pdata', async (req, res) => {
    const userKey = (req.query.key)
    if (userKey === masterKey) {
        try {
            const productsData = await ProductsData.find({});
            res.status(200).json(productsData);
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
app.get('/SmallPlates', async (req, res) => {
    try {
        const productsData = await ProductsData.find(
            {
                "$or": [
                    { type: { $regex: "Small Plates" } }
                ]
            });
        res.status(200).json(productsData);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


app.get('/SoupsandSalads', async (req, res) => {
    try {
        const productsData = await ProductsData.find(
            {
                "$or": [
                    { type: { $regex: "Soups and Salads" } }
                ]
            });
        res.status(200).json(productsData);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


app.get('/Essentials', async (req, res) => {
    try {
        const productsData = await ProductsData.find(
            {
                "$or": [
                    { type: { $regex: "Essentials" } }
                ]
            });
        res.status(200).json(productsData);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


app.get('/MeatandFish', async (req, res) => {
    try {
        const productsData = await ProductsData.find(
            {
                "$or": [
                    { type: { $regex: "Meat and Fish" } }
                ]
            });
        res.status(200).json(productsData);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


app.get('/SoftDrinks', async (req, res) => {
    try {
        const productsData = await ProductsData.find(
            {
                "$or": [
                    { type: { $regex: "Soft Drinks" } }
                ]
            });
        res.status(200).json(productsData);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


app.get('/Desserts', async (req, res) => {
    try {
        const productsData = await ProductsData.find(
            {
                "$or": [
                    { type: { $regex: "Desserts" } }
                ]
            });
        res.status(200).json(productsData);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/Wine', async (req, res) => {
    try {
        const productsData = await ProductsData.find(
            {
                "$or": [
                    { type: { $regex: "Wine" } }
                ]
            });
        res.status(200).json(productsData);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/Pdata/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const productsData = await ProductsData.findById(id);
        res.status(200).json(productsData);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


app.post('/Pdata', async (req, res) => {
    // try {
    //     const productsData = await ProductsData.create(req.body)
    //     res.status(200).json(ProductsData);

    // } catch (error) {
    //     console.log(error.message);
    //     res.status(500).json({ message: error.message })
    // }
    try {
        const product = await ProductsData.create({
            name: req.body.name,
            type: req.body.type,
            price: req.body.price,
            brief: req.body.brief,
            img: req.body.img,
            img2: req.body.img2
        });
        // res.redirect("/products");
        res.status(201).json(product);
    } catch (error) {
        console.log(error.message);
    }
})

// update a Data
app.patch('/Pdata/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const productsData = await ProductsData.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if (!productsData) return res.status(404).json({ message: `cannot find any product with ID ${id}` })

        if (req.body.name) productsData.name = req.body.name;
        if (req.body.type) productsData.type = req.body.type;
        if (req.body.price) productsData.price = req.body.price;
        if (req.body.brief) productsData.brief = req.body.brief;
        if (req.body.img) productsData.img = req.body.img;
        if (req.body.img2) productsData.img2 = req.body.img2;

        res.status(200).json(productsData);

    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
})


// delete a product

app.delete('/Pdata/:id', async (req, res) => {
    const userKey = (req.query.key)
    if (userKey === masterKey) {
        try {
            const userKey = (req.query.key)
            const { id } = req.params;
            const productsData = await ProductsData.findByIdAndDelete(id);
            if (!productsData) {
                return res.status(404).json({ message: `cannot find any Parking Data with ID ${id}` })
            }
            res.status(200).json(productsData);
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

// Parking Area Data



app.get('/parking/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const parking = await ParkingData.findById(id);
        res.status(200).json(parking);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})





app.get('/Parking', async (req, res) => {
    // const userKey = (req.query.key)
    // if (userKey === masterKey) {
        try {
            const parkingData = await ParkingData.find({});
            res.status(200).json(parkingData);
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    // }
    // else {
    //     res
    //         .status(404)
    //         .json({ error: "You are not authorized" })
    // }

})

app.get('/Parking/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const parkingData = await ParkingData.findById(id);
        res.status(200).json(parkingData);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


app.post('/Parking', async (req, res) => {
    try {
        const parkingData = await ParkingData.create(req.body)
        res.status(200).json(parkingData);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

// update a product
app.put('/Parking/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const parkingData = await ParkingData.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if (!parkingData) {
            return res.status(404).json({ message: `cannot find any product with ID ${id}` })
        }
        const updatedparkingData = await ParkingData.findById(id);
        res.status(200).json(updatedparkingData);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


// delete a product

app.delete('/Parking/:id', async (req, res) => {
    const userKey = (req.query.key)
    if (userKey === masterKey) {

        try {
            const userKey = (req.query.key)
            const { id } = req.params;
            const parkingData = await ParkingData.findByIdAndDelete(id);
            if (!parkingData) {
                return res.status(404).json({ message: `cannot find any Parking Data with ID ${id}` })
            }
            res.status(200).json(parkingData);

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
        app.listen(process.env.PORT || port, () => {
            console.log(`Node API app is running on port 5000`)
        });
    }).catch((error) => {
        console.log(error)
    })