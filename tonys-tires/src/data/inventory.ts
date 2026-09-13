export interface Location {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  isPopular?: boolean;
}

export interface TireItem {
  id: string;
  brand: string;
  model: string;
  size: string;
  rimSize: number;
  condition: 'Good (70%+ tread)' | 'Like New (90%+ tread)';
  price: number;
  image: string;
  stock: Record<string, number>;
}

export const LOCATIONS: Location[] = [
  { id: 'greer', name: 'Greer', address: '102 Highway 29, Greer, SC', phone: '864-395-5393', hours: '8:00 AM - 8:00 PM', isPopular: true },
  { id: 'greenville', name: 'Greenville', address: '450 Laurens Rd, Greenville, SC', phone: '864-395-5393', hours: '8:00 AM - 8:00 PM', isPopular: true },
  { id: 'aiken', name: 'Aiken', address: '120 Richland Ave, Aiken, SC', phone: '864-395-5393', hours: '8:00 AM - 8:00 PM' },
  { id: 'fountain-inn', name: 'Fountain Inn', address: '305 N Main St, Fountain Inn, SC', phone: '864-395-5393', hours: '8:00 AM - 8:00 PM' },
  { id: 'little-river', name: 'Little River', address: '1540 Highway 17 E, Little River, SC', phone: '864-395-5393', hours: '8:00 AM - 8:00 PM' },
  { id: 'longs', name: 'Longs', address: '890 Highway 9, Longs, SC', phone: '864-395-5393', hours: '8:00 AM - 8:00 PM' },
  { id: 'columbia', name: 'Columbia', address: '2210 Broad River Rd, Columbia, SC', phone: '864-395-5393', hours: '8:00 AM - 8:00 PM' },
  { id: 'hickory', name: 'Hickory', address: '540 Hwy 70 SW, Hickory, NC', phone: '864-395-5393', hours: '8:00 AM - 8:00 PM' },
];

export const INITIAL_TIRES: TireItem[] = [
  {
    id: 't-15-1',
    brand: 'Michelin',
    model: 'Defender T+H',
    size: '195/65R15',
    rimSize: 15,
    condition: 'Like New (90%+ tread)',
    price: 40,
    image: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&q=80&w=400',
    stock: { greer: 8, greenville: 4, aiken: 0, 'fountain-inn': 12, 'little-river': 2, longs: 6, columbia: 10, hickory: 4 }
  },
  {
    id: 't-16-1',
    brand: 'Goodyear',
    model: 'Assurance MaxLife',
    size: '205/55R16',
    rimSize: 16,
    condition: 'Good (70%+ tread)',
    price: 45,
    image: 'https://images.unsplash.com/photo-1543785734-4b6e564642f8?auto=format&fit=crop&q=80&w=400',
    stock: { greer: 14, greenville: 18, aiken: 5, 'fountain-inn': 0, 'little-river': 8, longs: 4, columbia: 12, hickory: 9 }
  },
  {
    id: 't-17-1',
    brand: 'Bridgestone',
    model: 'Turanza QuietTrack',
    size: '225/50R17',
    rimSize: 17,
    condition: 'Like New (90%+ tread)',
    price: 50,
    image: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&q=80&w=400',
    stock: { greer: 6, greenville: 0, aiken: 11, 'fountain-inn': 4, 'little-river': 7, longs: 2, columbia: 8, hickory: 15 }
  },
  {
    id: 't-18-1',
    brand: 'Continental',
    model: 'ExtremeContact DWS06',
    size: '235/40R18',
    rimSize: 18,
    condition: 'Good (70%+ tread)',
    price: 55,
    image: 'https://images.unsplash.com/photo-1543785734-4b6e564642f8?auto=format&fit=crop&q=80&w=400',
    stock: { greer: 2, greenville: 9, aiken: 4, 'fountain-inn': 8, 'little-river': 0, longs: 5, columbia: 3, hickory: 6 }
  },
  {
    id: 't-20-1',
    brand: 'Pirelli',
    model: 'Scorpion Verde All Season',
    size: '275/55R20',
    rimSize: 20,
    condition: 'Like New (90%+ tread)',
    price: 65,
    image: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&q=80&w=400',
    stock: { greer: 10, greenville: 12, aiken: 3, 'fountain-inn': 6, 'little-river': 9, longs: 0, columbia: 14, hickory: 8 }
  },
  {
    id: 't-22-1',
    brand: 'Toyo',
    model: 'Open Country A/T III',
    size: '305/45R22',
    rimSize: 22,
    condition: 'Like New (90%+ tread)',
    price: 75,
    image: 'https://images.unsplash.com/photo-1543785734-4b6e564642f8?auto=format&fit=crop&q=80&w=400',
    stock: { greer: 4, greenville: 2, aiken: 7, 'fountain-inn': 3, 'little-river': 5, longs: 8, columbia: 0, hickory: 6 }
  }
];
