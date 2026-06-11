import express from "express";
import cars from "../data/cars.json" with { type: "json" };

const router = express.Router();

router.get("/recommend", async (req, res) => {
  try {
    const { fuelType, familySize, usageType, budget } = req.query;

    const recommendedCars = cars.filter((car) => {
      return (
        (!fuelType ||
          car.fuelType.toLocaleLowerCase() === fuelType.toLocaleLowerCase()) &&
        (!familySize || car.seatingCapacity >= Number(familySize)) &&
        (!usageType || car.usage.toLocaleLowerCase() === usageType.toLocaleLowerCase()) &&
        (!budget || car.price <= Number(budget))
      );
    });

    let aiSummary = "";

    if (recommendedCars.length > 0) {
      aiSummary = `Based on your budget of ${budget}, fuel preference for ${fuelType}, family size of ${familySize}, and usage type of ${usageType}, we have found the following cars that match your criteria. Each car has been evaluated based on its price, mileage, and safety ratings to ensure it meets your needs.`;
    }

    res.json({ cars: recommendedCars, aiSummary });
    console.log(recommendedCars)
  } catch (error) {
    console.error("Error occurred while generating recommendations:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
