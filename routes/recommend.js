import express from 'express';
import cars from  '../data/cars.json' with { type: 'json' };

const router = express.Router();

router.get('/recommend', (req, res) => {
    const { fuelType, seatingCapacity, usage } = req.query;

    const recommendedCars = cars.filter(car => {
        return (!fuelType || car.fuelType === fuelType) &&
               (!seatingCapacity || car.seatingCapacity === Number(seatingCapacity)) &&
               (!usage || car.usage.includes(usage));
    });

    res.json(recommendedCars);
});

export default router;
