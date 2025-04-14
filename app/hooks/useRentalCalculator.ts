import { CarType, FuelPlan, AddOns } from '@/app/types';

export const useRentalCalculator = () => {
    const calculateCost = (
        carType: CarType,
        pickupDate: Date | null,
        dropoffDate: Date | null,
        location: string,
        addOns: AddOns,
        fuelPlan: FuelPlan,
        driverAge: number
    ) => {
        if (!pickupDate || !dropoffDate) return null;

        // Car type rates
        const carRates: Record<CarType, number> = {
            economy: 45,
            suv: 75,
            luxury: 120,
            van: 90,
            sports: 150,
        };

        // Calculate days
        const timeDiff = dropoffDate.getTime() - pickupDate.getTime();
        const days = Math.ceil(timeDiff / (1000 * 3600 * 24)) || 1;

        // Base car cost
        const baseRate = carRates[carType];
        const baseCost = baseRate * days;

        // Location modifier (example: +10% for airports, -5% for suburbs)
        let locationModifier = 1;
        if (location.toLowerCase().includes('airport')) locationModifier = 1.1;
        if (location.toLowerCase().includes('downtown')) locationModifier = 1.05;
        if (location.toLowerCase().includes('suburb')) locationModifier = 0.95;

        // Age modifier (young driver fee)
        let ageModifier = 1;
        if (driverAge < 25) ageModifier = 1.2;
        if (driverAge < 21) ageModifier = 1.5;

        // Add-ons
        const addOnsCost = {
            gps: addOns.gps ? 5 * days : 0,
            babySeat: addOns.babySeat ? 3 * days : 0,
            additionalDriver: addOns.additionalDriver ? 10 * days : 0,
            insurance: addOns.insurance ? 15 * days : 0,
        };
        const totalAddOns = Object.values(addOnsCost).reduce((a, b) => a + b, 0);

        // Fuel plan
        const fuelPlanModifiers: Record<FuelPlan, number> = {
            fullToFull: 0,
            prepaid: 50,
            postpaid: 60,
        };
        const fuelCost = fuelPlanModifiers[fuelPlan];

        // Subtotal before taxes
        const subtotal = (baseCost * locationModifier * ageModifier) + totalAddOns + fuelCost;

        // Taxes and fees (10%)
        const taxes = subtotal * 0.1;

        // Total
        const total = subtotal + taxes;

        return {
            days,
            baseRate,
            baseCost,
            locationModifier: (locationModifier - 1) * 100,
            ageModifier: (ageModifier - 1) * 100,
            addOnsCost,
            totalAddOns,
            fuelCost,
            subtotal,
            taxes,
            total,
        };
    };

    return { calculateCost };
};