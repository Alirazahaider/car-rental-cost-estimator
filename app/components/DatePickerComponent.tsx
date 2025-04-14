"use client";
import { motion } from 'framer-motion';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerComponentProps {
    label: string;
    value: Date | null;
    onChange: (date: Date | null) => void;
    minDate?: Date | null;
}

export default function DatePickerComponent({
                                                label,
                                                value,
                                                onChange,
                                                minDate,
                                            }: DatePickerComponentProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
        >
            <label className="block text-sm font-medium text-blue-800 mb-2">
                {label}
            </label>
            <ReactDatePicker
                selected={value}
                onChange={onChange}
                minDate={minDate ?? undefined}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                dateFormat="MMMM d, yyyy"
                placeholderText="Select date"
            />
        </motion.div>
    );
}