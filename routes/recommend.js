import express from 'express';
import cars from  '../data/cars.json' with { type: 'json' };

const router = express.Router();

router.get('/recommend', (req, res) => {
    const { fuelType, familySize, usageType, budget } = req.query;

    const recommendedCars = cars.filter(car => {
        return (!fuelType || car.fuelType.toLocaleLowerCase() === fuelType.toLocaleLowerCase()) &&
               (!familySize || car.seatingCapacity >= Number(familySize)) &&
               (!usageType || car.usage.includes(usageType.toLocaleLowerCase())) &&
               (!budget || car.price <= Number(budget));
    });

    res.json(recommendedCars);
});

export default router;
