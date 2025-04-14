'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Footer from '@/app/components/Footer';
import CarTypeSelector from '@/app/components/CarTypeSelector';
import DatePickerComponent from '@/app/components/DatePickerComponent';
import LocationSelector from '@/app/components/LocationSelector';
import AddOnsSelector from '@/app/components/AddOnsSelector';
import FuelPlanSelector from '@/app/components/FuelPlanSelector';
import AgeSlider from '@/app/components/AgeSlider';
import CostBreakdown from '@/app/components/CostBreakdown';
import { CarType, FuelPlan, AddOns } from '@/app/types';

export default function Home() {
  const [carType, setCarType] = useState<CarType>('economy');
  const [pickupDate, setPickupDate] = useState<Date | null>(new Date());
  const [dropoffDate, setDropoffDate] = useState<Date | null>(() => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date;
  });
  const [location, setLocation] = useState<string>('');
  const [addOns, setAddOns] = useState<AddOns>({
    gps: false,
    babySeat: false,
    additionalDriver: false,
    insurance: false,
  });
  const [fuelPlan, setFuelPlan] = useState<FuelPlan>('fullToFull');
  const [driverAge, setDriverAge] = useState<number>(30);

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <main className="container mx-auto px-4 py-8">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-6xl mx-auto"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-2">
              Car Rental Cost Estimator
            </h1>
            <p className="text-center text-blue-600 mb-8">
              Get an instant quote for your perfect rental car
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Input Section */}
              <div className="lg:col-span-2 space-y-6">
                <CarTypeSelector value={carType} onChange={setCarType} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DatePickerComponent
                      label="Pick-up Date"
                      value={pickupDate}
                      onChange={setPickupDate}
                  />
                  <DatePickerComponent
                      label="Drop-off Date"
                      value={dropoffDate}
                      onChange={setDropoffDate}
                      minDate={pickupDate || new Date()}
                  />
                </div>

                <LocationSelector value={location} onChange={setLocation} />

                <AddOnsSelector value={addOns} onChange={setAddOns} />

                <FuelPlanSelector value={fuelPlan} onChange={setFuelPlan} />

                <AgeSlider value={driverAge} onChange={setDriverAge} />
              </div>

              {/* Results Section */}
              <div className="lg:col-span-1">
                <CostBreakdown
                    carType={carType}
                    pickupDate={pickupDate}
                    dropoffDate={dropoffDate}
                    location={location}
                    addOns={addOns}
                    fuelPlan={fuelPlan}
                    driverAge={driverAge}
                />
              </div>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
  );
}