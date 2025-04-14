"use client";
import { motion } from 'framer-motion';

interface AgeSliderProps {
    value: number;
    onChange: (value: number) => void;
}

export default function AgeSlider({ value, onChange }: AgeSliderProps) {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Driver Age: {value}</h2>
            <div className="px-2">
                <input
                    type="range"
                    min="18"
                    max="80"
                    value={value}
                    onChange={(e) => onChange(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>18</span>
                    <span>25</span>
                    <span>30</span>
                    <span>40</span>
                    <span>50+</span>
                </div>
            </div>
            {value < 25 && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm"
                >
                    {value < 21
                        ? 'Young driver fee (50%) applied'
                        : 'Young driver fee (20%) applied'}
                </motion.div>
            )}
        </div>
    );
}