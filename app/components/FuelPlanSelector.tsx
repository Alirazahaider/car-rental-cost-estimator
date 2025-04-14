"use client";
import { motion } from 'framer-motion';
import { FuelPlan, FuelPlanDetails } from '@/app/types';
import Image from 'next/image';

const fuelPlans: FuelPlanDetails[] = [
    {
        id: 'fullToFull',
        name: 'Full-to-Full',
        description: 'Return with same amount of fuel',
        image: '/full-to-full.png',
        priceModifier: 0,
    },
    {
        id: 'prepaid',
        name: 'Prepaid Fuel',
        description: 'Pay upfront for a full tank',
        image: '/prepaid-fuel.png',
        priceModifier: 50,
    },
    {
        id: 'postpaid',
        name: 'Postpaid Fuel',
        description: 'Pay for used fuel at return',
        image: '/postpaid-fule.png',
        priceModifier: 60,
    },
];

interface FuelPlanSelectorProps {
    value: FuelPlan;
    onChange: (value: FuelPlan) => void;
}

export default function FuelPlanSelector({ value, onChange }: FuelPlanSelectorProps) {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Fuel Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {fuelPlans.map((plan) => (
                    <motion.div
                        key={plan.id}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <label className="cursor-pointer">
                            <input
                                type="radio"
                                name="fuelPlan"
                                value={plan.id}
                                checked={value === plan.id}
                                onChange={() => onChange(plan.id)}
                                className="hidden"
                            />
                            <div
                                className={`p-4 rounded-lg border-2 transition-all duration-200 h-full ${
                                    value === plan.id
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 hover:border-blue-300'
                                }`}
                            >
                                <div className="flex items-center mb-3">
                                    <Image
                                        width={48}
                                        height={48}
                                        src={plan.image}
                                        alt={plan.name}
                                        className="w-12 h-12 object-contain mr-3"
                                    />
                                    <div>
                                        <h3 className="font-medium text-gray-800">{plan.name}</h3>
                                        <p className="text-sm text-blue-600">
                                            {plan.priceModifier > 0
                                                ? `+$${plan.priceModifier}`
                                                : 'No extra charge'}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600">{plan.description}</p>
                            </div>
                        </label>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}