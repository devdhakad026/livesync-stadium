import { StadiumState } from './types';

export const initialMockState: StadiumState = {
  facilities: [
    { id: 'b1', name: 'North Restrooms (Sec 101)', type: 'bathroom', crowdDensity: 45, queueMinutes: 5, isRecommended: true },
    { id: 'b2', name: 'South Restrooms (Sec 120)', type: 'bathroom', crowdDensity: 85, queueMinutes: 15, isRecommended: false },
    { id: 'b3', name: 'East Restrooms (Sec 110)', type: 'bathroom', crowdDensity: 20, queueMinutes: 2, isRecommended: true },
    { id: 'g1', name: 'Gate 1 (Main)', type: 'gate', crowdDensity: 90, queueMinutes: 20, isRecommended: false },
    { id: 'g2', name: 'Gate 2 (East)', type: 'gate', crowdDensity: 30, queueMinutes: 4, isRecommended: true },
    { id: 'g3', name: 'Gate 3 (West)', type: 'gate', crowdDensity: 60, queueMinutes: 10, isRecommended: false },
  ],
  activeAlerts: []
};

export const concessionMenu = [
  { id: 'f1', name: 'Classic Hot Dog', price: 6.50, prepTimeMinutes: 2 },
  { id: 'f2', name: 'Nachos with Cheese', price: 5.00, prepTimeMinutes: 3 },
  { id: 'f3', name: 'Premium Burger', price: 12.00, prepTimeMinutes: 8 },
  { id: 'f4', name: 'Cold Beer (Pint)', price: 9.00, prepTimeMinutes: 1 },
  { id: 'f5', name: 'Soda Large', price: 4.50, prepTimeMinutes: 1 },
];
