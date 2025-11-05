// Carbon emission factors (kg CO2 per unit)
const emissionFactors = {
  transport: {
    car: 0.21, // kg CO2 per km
    bus: 0.089,
    train: 0.041,
    bike: 0,
    walk: 0,
    flight_short: 0.255, // per km
    flight_long: 0.195,
  },
  energy: {
    electricity: 0.5, // kg CO2 per kWh (mixed grid)
    gas: 0.185, // kg CO2 per kWh
    renewable: 0.02,
  },
  food: {
    beef: 27, // kg CO2 per kg
    lamb: 39,
    pork: 12,
    chicken: 6.9,
    fish: 6,
    eggs: 4.8,
    dairy: 3.2,
    vegetables: 2,
    grains: 2.5,
    vegan_meal: 1.5, // per meal
    vegetarian_meal: 2.5,
    omnivore_meal: 5.5,
  },
  waste: {
    landfill: 0.5, // kg CO2 per kg waste
    recycled: 0.02,
    composted: 0.01,
  },
};

const calculateTransportEmission = (mode, distance) => {
  const factor = emissionFactors.transport[mode] || 0;
  return factor * distance;
};

const calculateEnergyEmission = (energyType, usage) => {
  const factor = emissionFactors.energy[energyType] || 0.5;
  return factor * usage;
};

const calculateFoodEmission = (mealType) => {
  const factor = emissionFactors.food[mealType] || emissionFactors.food.omnivore_meal;
  return factor;
};

const calculateWasteEmission = (wasteType, amount) => {
  const factor = emissionFactors.waste[wasteType] || 0.5;
  return factor * amount;
};

const calculateTotalEmission = (activities) => {
  return activities.reduce((total, activity) => {
    return total + (activity.carbonEmission || 0);
  }, 0);
};

module.exports = {
  emissionFactors,
  calculateTransportEmission,
  calculateEnergyEmission,
  calculateFoodEmission,
  calculateWasteEmission,
  calculateTotalEmission,
};