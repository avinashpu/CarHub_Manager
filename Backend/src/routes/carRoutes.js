const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const upload = require('../middleware/upload');

router.post('/car', upload.single('carImage'), carController.createCar);
router.get('/car', carController.getAllCars);
router.get('/car/:id', carController.getCarById);
router.put('/car/:id', upload.single('carImage'), carController.updateCar);
router.delete('/car/:id', carController.deleteCar);

module.exports = router;
