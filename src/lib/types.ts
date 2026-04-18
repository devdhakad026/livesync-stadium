export type FacilityType = 'bathroom' | 'gate' | 'concession';

export interface StadiumFacility {
  id: string;
  name: string;
  type: FacilityType;
  crowdDensity: number; // 0 to 100
  queueMinutes: number;
  isRecommended: boolean;
}

export interface Alert {
  id: string;
  message: string;
  severity: 'info' | 'warning' | 'critical';
  isActive: boolean;
  timestamp: number;
}

export interface ConcessionItem {
  id: string;
  name: string;
  price: number;
  prepTimeMinutes: number;
}

export interface Order {
  id: string;
  items: ConcessionItem[];
  status: 'pending' | 'preparing' | 'ready' | 'completed';
  pickupTime: number; // timestamp
}

export interface StadiumState {
  facilities: StadiumFacility[];
  activeAlerts: Alert[];
}
