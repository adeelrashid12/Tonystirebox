export interface Location {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  isPopular?: boolean;
  image: string;
  type?: 'Container' | 'Storage Unit';
}

export interface TireItem {
  id: string;
  brand: string;
  model: string;
  size: string;
  rimSize: number;
  condition: string;
  price: number;
  image: string;
  images?: string[];
  stock: Record<string, number>;
}

export const LOCATIONS: Location[] = [
  { id: 'greer', name: 'Greer', address: '3574 Brown Rd, Greer, SC 29651', phone: '864-395-5393', hours: '8:00 AM - 8:00 PM', isPopular: true, image: '/container_greer.png', type: 'Container' },
  { id: 'greenville', name: 'Greenville', address: '2490 New Easley Hwy, Greenville, SC 29611', phone: '864-395-5393', hours: '8:00 AM - 8:00 PM', isPopular: true, image: '/container_greenville.png', type: 'Container' },
  { id: 'aiken', name: 'Aiken', address: '1693 Edgefield Hwy, Aiken, SC 29801', phone: '864-395-5393', hours: '8:00 AM - 8:00 PM', image: '/container_aiken.png', type: 'Storage Unit' },
  { id: 'fountain-inn', name: 'Fountain Inn', address: '2431 Greenpond Rd, Fountain Inn, SC 29644', phone: '864-395-5393', hours: '8:00 AM - 8:00 PM', isPopular: true, image: '/container_fountain_inn.png', type: 'Container' },
  { id: 'little-river', name: 'Little River', address: '2329 Old Sanders Dr, Little River, SC 29566', phone: '864-395-5393', hours: '8:00 AM - 8:00 PM', image: '/container_little_river.png', type: 'Container' },
  { id: 'longs', name: 'Longs', address: '1870 Hwy 9 East, Longs, SC 29568 (Tippy Toes RV)', phone: '864-395-5393', hours: '8:00 AM - 8:00 PM', image: '/container_longs.png', type: 'Container' },
  { id: 'columbia', name: 'Columbia', address: '3223 Platt Springs Rd, West Columbia, SC 29170', phone: '864-395-5393', hours: '8:00 AM - 8:00 PM', image: '/container_columbia.png', type: 'Container' },
  { id: 'hickory', name: 'Hickory', address: '1045 2nd Ave NW, Hickory, NC 28601 (The Xtra Space)', phone: '864-395-5393', hours: '8:00 AM - 8:00 PM', image: '/container_hickory.png', type: 'Storage Unit' },
];

export const INITIAL_TIRES: TireItem[] = [];
