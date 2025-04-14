"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';

const locations = [
    'Downtown Office',
    'City Airport',
    'Suburb Station',
    'Central Train Station',
    'Northside Mall',
];

interface LocationSelectorProps {
    value: string;
    onChange: (value: string) => void;
}

export default function LocationSelector({ value, onChange }: LocationSelectorProps) {
    const [inputValue, setInputValue] = useState(value);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const filteredLocations = locations.filter((loc) =>
        loc.toLowerCase().includes(inputValue.toLowerCase())
    );

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 relative">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Pickup & Drop-off Location</h2>
            <div className="relative">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                        onChange(e.target.value);
                        setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    placeholder="Enter location"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
                {showSuggestions && filteredLocations.length > 0 && (
                    <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto"
                    >
                        {filteredLocations.map((location) => (
                            <li
                                key={location}
                                className="p-3 hover:bg-blue-50 cursor-pointer transition-colors"
                                onMouseDown={() => {
                                    setInputValue(location);
                                    onChange(location);
                                    setShowSuggestions(false);
                                }}
                            >
                                {location}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </div>
        </div>
    );
}