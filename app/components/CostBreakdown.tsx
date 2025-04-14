"use client";
import { motion } from 'framer-motion';
import { useRentalCalculator } from '@/app/hooks/useRentalCalculator';
import { CarType, FuelPlan, AddOns } from '@/app/types';

interface CostBreakdownProps {
    carType: CarType;
    pickupDate: Date | null;
    dropoffDate: Date | null;
    location: string;
    addOns: AddOns;
    fuelPlan: FuelPlan;
    driverAge: number;
}

export default function CostBreakdown({
                                          carType,
                                          pickupDate,
                                          dropoffDate,
                                          location,
                                          addOns,
                                          fuelPlan,
                                          driverAge,
                                      }: CostBreakdownProps) {
    const { calculateCost } = useRentalCalculator();
    const costDetails = calculateCost(
        carType,
        pickupDate,
        dropoffDate,
        location,
        addOns,
        fuelPlan,
        driverAge
    );

    if (!costDetails) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 sticky top-6"
            >
                <h2 className="text-xl font-semibold text-blue-800 mb-4">Cost Breakdown</h2>
                <p className="text-gray-500">Please select dates to see pricing</p>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 sticky top-6"
        >
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Cost Breakdown</h2>
            <div className="space-y-4">
                <div className="flex justify-between">
          <span className="text-gray-600">
            Base rate ({costDetails.days} days × ${costDetails.baseRate}/day)
          </span>
                    <span className="font-medium">${costDetails.baseCost.toFixed(2)}</span>
                </div>

                {costDetails.locationModifier !== 0 && (
                    <div className="flex justify-between">
            <span className="text-gray-600">
              Location {costDetails.locationModifier > 0 ? 'fee' : 'discount'} (
                {Math.abs(costDetails.locationModifier)}%)
            </span>
                        <span
                            className={`font-medium ${
                                costDetails.locationModifier > 0 ? 'text-red-500' : 'text-green-500'
                            }`}
                        >
              {costDetails.locationModifier > 0 ? '+' : ''}
                            {(
                                (costDetails.baseCost * costDetails.locationModifier) /
                                100
                            ).toFixed(2)}
            </span>
                    </div>
                )}

                {costDetails.ageModifier > 0 && (
                    <div className="flex justify-between">
            <span className="text-gray-600">
              Young driver fee ({costDetails.ageModifier}%)
            </span>
                        <span className="font-medium text-red-500">
              +{((costDetails.baseCost * costDetails.ageModifier) / 100).toFixed(2)}
            </span>
                    </div>
                )}

                {costDetails.totalAddOns > 0 && (
                    <>
                        <div className="pt-2 border-t border-gray-100">
                            <h3 className="text-sm font-medium text-gray-500 mb-2">Add-ons</h3>
                            {Object.entries(costDetails.addOnsCost).map(([key, value]) => (
                                value > 0 && (
                                    <div key={key} className="flex justify-between text-sm">
                    <span className="text-gray-600 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                                        <span>${value.toFixed(2)}</span>
                                    </div>
                                )
                            ))}
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Total Add-ons</span>
                            <span className="font-medium">
                ${costDetails.totalAddOns.toFixed(2)}
              </span>
                        </div>
                    </>
                )}

                {costDetails.fuelCost > 0 && (
                    <div className="flex justify-between">
                        <span className="text-gray-600">Fuel plan</span>
                        <span className="font-medium">${costDetails.fuelCost.toFixed(2)}</span>
                    </div>
                )}

                <div className="pt-2 border-t border-gray-200">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">
              ${costDetails.subtotal.toFixed(2)}
            </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Taxes & fees (10%)</span>
                        <span className="font-medium">${costDetails.taxes.toFixed(2)}</span>
                    </div>
                </div>

                <div className="pt-4 border-t-2 border-gray-200">
                    <div className="flex justify-between text-lg font-bold text-blue-800">
                        <span>Total Estimated Cost</span>
                        <span>${costDetails.total.toFixed(2)}</span>
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                    Continue to Book
                </motion.button>
            </div>
        </motion.div>
    );
}