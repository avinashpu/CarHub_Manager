const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');


router.post('/car', carController.createCar);
router.get('/car', carController.getAllCars);
router.get('/car/:id', carController.getCarById);
router.put('/car/:id', carController.updateCar);
router.delete('/car/:id', carController.deleteCar);

module.exports = router;
