"use client";
import { motion } from 'framer-motion';
import { AddOns } from '@/app/types';

interface AddOnsSelectorProps {
    value: AddOns;
    onChange: (value: AddOns) => void;
}

export default function AddOnsSelector({ value, onChange }: AddOnsSelectorProps) {
    const toggleAddOn = (key: keyof AddOns) => {
        onChange({
            ...value,
            [key]: !value[key],
        });
    };

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Add-ons</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                    { id: 'gps', label: 'GPS Navigation', price: '$5/day', icon: '📍' },
                    { id: 'babySeat', label: 'Baby Seat', price: '$3/day', icon: '👶' },
                    { id: 'additionalDriver', label: 'Additional Driver', price: '$10/day', icon: '👤' },
                    { id: 'insurance', label: 'Insurance', price: '$15/day', icon: '🛡️' },
                ].map((item) => (
                    <motion.div
                        key={item.id}
                        whileHover={{ y: -2 }}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 flex items-center justify-between ${
                            value[item.id as keyof AddOns]
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-blue-300'
                        }`}
                        onClick={() => toggleAddOn(item.id as keyof AddOns)}
                    >
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">{item.icon}</span>
                            <div>
                                <h3 className="font-medium text-gray-800">{item.label}</h3>
                                <p className="text-sm text-blue-600">{item.price}</p>
                            </div>
                        </div>
                        <input
                            type="checkbox"
                            checked={value[item.id as keyof AddOns]}
                            onChange={() => {}}
                            className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}