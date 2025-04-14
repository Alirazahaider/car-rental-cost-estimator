"use client";
import { motion } from 'framer-motion';
import { CarType, CarTypeDetails } from '@/app/types';

const carTypes: CarTypeDetails[] = [
    {
        id: 'economy',
        name: 'Economy',
        dailyRate: 45,
        image: '/images/economy-car.png',
        icon: '🚗',
    },
    {
        id: 'suv',
        name: 'SUV',
        dailyRate: 75,
        image: '/images/suv.png',
        icon: '🚙',
    },
    {
        id: 'luxury',
        name: 'Luxury',
        dailyRate: 120,
        image: '/images/luxury-car.png',
        icon: '🏎️',
    },
    {
        id: 'van',
        name: 'Van',
        dailyRate: 90,
        image: '/images/van.png',
        icon: '🚐',
    },
    {
        id: 'sports',
        name: 'Sports',
        dailyRate: 150,
        image: '/images/sports-car.png',
        icon: '🚕',
    },
];

interface CarTypeSelectorProps {
    value: CarType;
    onChange: (value: CarType) => void;
}

export default function CarTypeSelector({ value, onChange }: CarTypeSelectorProps) {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Select Car Type</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {carTypes.map((car) => (
                    <motion.div
                        key={car.id}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <label className="cursor-pointer">
                            <input
                                type="radio"
                                name="carType"
                                value={car.id}
                                checked={value === car.id}
                                onChange={() => onChange(car.id)}
                                className="hidden"
                            />
                            <div
                                className={`p-3 rounded-lg border-2 transition-all duration-200 flex flex-col items-center ${
                                    value === car.id
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 hover:border-blue-300'
                                }`}
                            >
                                <span className="text-3xl mb-2">{car.icon}</span>
                                <span className="font-medium text-gray-800">{car.name}</span>
                                <span className="text-sm text-blue-600 mt-1">${car.dailyRate}/day</span>
                            </div>
                        </label>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}