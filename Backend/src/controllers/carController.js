const Car = require('../models/car.model');


const createCar = async (req, res) => {
    const { carName, manufacturingYear, price } = req.body;
    try {
        console.log("Creating car:", { carName, manufacturingYear, price });
        const newCar = new Car({ carName, manufacturingYear, price });
        await newCar.save();
        console.log("Car created:", newCar);
        res.status(201).json(newCar);
    } catch (err) {
        console.error("Error creating car:", err.message);
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

const getAllCars = async (req, res) => {
    try {
        console.log("Fetching all cars");
        const cars = await Car.find();
        console.log("Cars found:", cars);
        res.status(200).json(cars);
    } catch (err) {
        console.error("Error fetching cars:", err.message);
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

const getCarById = async (req, res) => {
    try {
        console.log("Fetching car with ID:", req.params.id);
        const car = await Car.findById(req.params.id);
        if (!car) {
            console.log("Car not found with ID:", req.params.id);
            return res.status(404).json({ msg: 'Car not found' });
        }
        console.log("Car found:", car);
        res.status(200).json(car);
    } catch (err) {
        console.error("Error fetching car:", err.message);
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

const updateCar = async (req, res) => {
    const { carName, manufacturingYear, price } = req.body;
    try {
        console.log("Updating car with ID:", req.params.id);
        const car = await Car.findById(req.params.id);
        if (!car) {
            console.log("Car not found with ID:", req.params.id);
            return res.status(404).json({ msg: 'Car not found' });
        }

        car.carName = carName;
        car.manufacturingYear = manufacturingYear;
        car.price = price;

        await car.save();
        console.log("Car updated:", car);
        res.status(200).json(car);
    } catch (err) {
        console.error("Error updating car:", err.message);
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

const deleteCar = async (req, res) => {
    try {
        console.log("Deleting car with ID:", req.params.id);
        const car = await Car.findById(req.params.id);
        if (!car) {
            console.log("Car not found with ID:", req.params.id);
            return res.status(404).json({ msg: 'Car not found' });
        }

        await Car.deleteOne({ _id: req.params.id });
        console.log("Car removed with ID:", req.params.id);
        res.status(200).json({ msg: 'Car removed' });
    } catch (err) {
        console.error("Error deleting car:", err.message);
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};


module.exports = {
    createCar,
    getAllCars,
    getCarById,
    updateCar,
    deleteCar,
};
