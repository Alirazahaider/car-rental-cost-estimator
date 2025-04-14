export type CarType = 'economy' | 'suv' | 'luxury' | 'van' | 'sports';
export type FuelPlan = 'fullToFull' | 'prepaid' | 'postpaid';

export interface AddOns {
    gps: boolean;
    babySeat: boolean;
    additionalDriver: boolean;
    insurance: boolean;
}

export interface CarTypeDetails {
    id: CarType;
    name: string;
    dailyRate: number;
    image: string;
    icon: string;
}

export interface FuelPlanDetails {
    id: FuelPlan;
    name: string;
    description: string;
    image: string;
    priceModifier: number;
}