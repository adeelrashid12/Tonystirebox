export interface Location {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  isPopular?: boolean;
  image: string;
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
  images?: string[];
  stock: Record<string, number>;
}

export const LOCATIONS: Location[] = [
  { id: 'greer', name: 'Greer', address: '102 Highway 29, Greer, SC', phone: '864-395-5393', hours: '8:00 AM - 8:00 PM', isPopular: true, image: '/container_greer.png' },
  { id: 'greenville', name: 'Greenville', address: '450 Laurens Rd, Greenville, SC', phone: '864-395-5393', hours: '8:00 AM - 8:00 PM', isPopular: true, image: '/container_greer.png' },
  { id: 'aiken', name: 'Aiken', address: '120 Richland Ave, Aiken, SC', phone: '864-395-5393', hours: '8:00 AM - 8:00 PM', image: '/container_fountain_inn.png' },
  { id: 'fountain-inn', name: 'Fountain Inn', address: '305 N Main St, Fountain Inn, SC', phone: '864-395-5393', hours: '8:00 AM - 8:00 PM', image: '/container_fountain_inn.png' },
  { id: 'little-river', name: 'Little River', address: '1540 Highway 17 E, Little River, SC', phone: '864-395-5393', hours: '8:00 AM - 8:00 PM', image: '/container_little_river.png' },
  { id: 'longs', name: 'Longs', address: '890 Highway 9, Longs, SC', phone: '864-395-5393', hours: '8:00 AM - 8:00 PM', image: '/container_little_river.png' },
  { id: 'columbia', name: 'Columbia', address: '2210 Broad River Rd, Columbia, SC', phone: '864-395-5393', hours: '8:00 AM - 8:00 PM', image: '/container_fountain_inn.png' },
  { id: 'hickory', name: 'Hickory', address: '540 Hwy 70 SW, Hickory, NC', phone: '864-395-5393', hours: '8:00 AM - 8:00 PM', image: '/container_hickory.png' },
];

export const INITIAL_TIRES: TireItem[] = [
  {
    id: 'col-1',
    brand: 'Michelin',
    model: 'Touring Radial',
    size: '175/65R14',
    rimSize: 14,
    condition: 'Good (70%+ tread)',
    price: 45,
    image: '/tires/image1.jpeg',
    stock: { columbia: 6, greer: 2, greenville: 4, 'fountain-inn': 3 }
  },
  {
    id: 'col-2',
    brand: 'Goodyear',
    model: 'All-Season Radial',
    size: '175/65R15',
    rimSize: 15,
    condition: 'Good (70%+ tread)',
    price: 45,
    image: '/tires/image2.jpeg',
    stock: { columbia: 6, greer: 3, greenville: 5, 'fountain-inn': 2 }
  },
  {
    id: 'col-3',
    brand: 'Michelin',
    model: 'Defender T+H',
    size: '185/55R15',
    rimSize: 15,
    condition: 'Like New (90%+ tread)',
    price: 45,
    image: '/tires/image3.jpeg',
    stock: { columbia: 6, greer: 4, greenville: 2, 'fountain-inn': 4 }
  },
  {
    id: 'col-4',
    brand: 'Bridgestone',
    model: 'Ecopia EP422',
    size: '195/55R15',
    rimSize: 15,
    condition: 'Good (70%+ tread)',
    price: 45,
    image: '/tires/image4.jpeg',
    stock: { columbia: 7, greer: 3, greenville: 6, 'fountain-inn': 5 }
  },
  {
    id: 'col-5',
    brand: 'Continental',
    model: 'ProContact TX',
    size: '195/60R15',
    rimSize: 15,
    condition: 'Good (70%+ tread)',
    price: 45,
    image: '/tires/image5.jpeg',
    stock: { columbia: 11, greer: 5, greenville: 8, 'fountain-inn': 6 }
  },
  {
    id: 'col-6',
    brand: 'Goodyear',
    model: 'Assurance MaxLife',
    size: '195/65R15',
    rimSize: 15,
    condition: 'Like New (90%+ tread)',
    price: 45,
    image: '/tires/image6.jpeg',
    stock: { columbia: 17, greer: 8, greenville: 10, 'fountain-inn': 8 }
  },
  {
    id: 'col-7',
    brand: 'Pirelli',
    model: 'P4 Four Seasons',
    size: '205/65R15',
    rimSize: 15,
    condition: 'Good (70%+ tread)',
    price: 45,
    image: '/tires/image7.jpeg',
    stock: { columbia: 12, greer: 6, greenville: 4, 'fountain-inn': 7 }
  },
  {
    id: 'col-8',
    brand: 'Michelin',
    model: 'Energy Saver A/S',
    size: '205/55R16',
    rimSize: 16,
    condition: 'Good (70%+ tread)',
    price: 45,
    image: '/tires/image8.jpeg',
    stock: { columbia: 20, greer: 12, greenville: 15, 'fountain-inn': 10 }
  },
  {
    id: 'col-9',
    brand: 'Hankook',
    model: 'Kinergy GT',
    size: '205/60R16',
    rimSize: 16,
    condition: 'Good (70%+ tread)',
    price: 45,
    image: '/tires/image9.jpeg',
    stock: { columbia: 9, greer: 4, greenville: 7, 'fountain-inn': 5 }
  },
  {
    id: 'col-10',
    brand: 'Yokohama',
    model: 'Avid Ascend LX',
    size: '205/65R16',
    rimSize: 16,
    condition: 'Good (70%+ tread)',
    price: 45,
    image: '/tires/image10.jpeg',
    stock: { columbia: 9, greer: 5, greenville: 6, 'fountain-inn': 4 }
  },
  {
    id: 'col-11',
    brand: 'Toyo',
    model: 'Extensa A/S II',
    size: '215/60R16',
    rimSize: 16,
    condition: 'Like New (90%+ tread)',
    price: 50,
    image: '/tires/image11.jpeg',
    stock: { columbia: 9, greer: 7, greenville: 8, 'fountain-inn': 6 }
  },
  {
    id: 'col-12',
    brand: 'Continental',
    model: 'TrueContact Tour',
    size: '215/65R16',
    rimSize: 16,
    condition: 'Good (70%+ tread)',
    price: 45,
    image: '/tires/image12.jpeg',
    stock: { columbia: 2, greer: 4, greenville: 3, 'fountain-inn': 2 }
  },
  {
    id: 'col-13',
    brand: 'Bridgestone',
    model: 'Turanza QuietTrack',
    size: '225/55R16',
    rimSize: 16,
    condition: 'Good (70%+ tread)',
    price: 50,
    image: '/tires/image13.jpeg',
    stock: { columbia: 7, greer: 6, greenville: 5, 'fountain-inn': 4 }
  },
  {
    id: 'col-14',
    brand: 'Goodyear',
    model: 'Eagle Sport A/S',
    size: '225/50R16',
    rimSize: 16,
    condition: 'Like New (90%+ tread)',
    price: 300,
    image: '/tires/image14.jpeg',
    stock: { columbia: 4, greer: 4, greenville: 4, 'fountain-inn': 4 }
  },
  {
    id: 'col-15',
    brand: 'Pirelli',
    model: 'Cinturato P7',
    size: '205/45R17',
    rimSize: 17,
    condition: 'Good (70%+ tread)',
    price: 45,
    image: '/tires/image15.jpeg',
    stock: { columbia: 7, greer: 3, greenville: 4, 'fountain-inn': 2 }
  },
  {
    id: 'col-16',
    brand: 'Michelin',
    model: 'Primacy MXM4',
    size: '215/55R17',
    rimSize: 17,
    condition: 'Good (70%+ tread)',
    price: 45,
    image: '/tires/image16.jpeg',
    stock: { columbia: 1, greer: 5, greenville: 4, 'fountain-inn': 3 }
  },
  {
    id: 'col-17',
    brand: 'Hankook',
    model: 'Ventus V2 Concept2',
    size: '225/50R17',
    rimSize: 17,
    condition: 'Good (70%+ tread)',
    price: 45,
    image: '/tires/image17.jpeg',
    stock: { columbia: 3, greer: 4, greenville: 6, 'fountain-inn': 5 }
  },
  {
    id: 'col-18',
    brand: 'BFGoodrich',
    model: 'g-Force COMP-2 A/S',
    size: '225/55R17',
    rimSize: 17,
    condition: 'Good (70%+ tread)',
    price: 45,
    image: '/tires/image18.jpeg',
    stock: { columbia: 2, greer: 6, greenville: 3, 'fountain-inn': 4 }
  },
  {
    id: 'col-19',
    brand: 'Continental',
    model: 'PureContact LS',
    size: '235/45R17',
    rimSize: 17,
    condition: 'Like New (90%+ tread)',
    price: 50,
    image: '/tires/image19.jpeg',
    stock: { columbia: 1, greer: 4, greenville: 5, 'fountain-inn': 3 }
  },
  {
    id: 'col-20',
    brand: 'Goodyear',
    model: 'Wrangler SR-A',
    size: '245/65R17',
    rimSize: 17,
    condition: 'Good (70%+ tread)',
    price: 50,
    image: '/tires/image20.jpeg',
    stock: { columbia: 1, greer: 3, greenville: 4, 'fountain-inn': 2 }
  },
  {
    id: 'col-21',
    brand: 'Toyo',
    model: 'Open Country A/T III',
    size: '35x12.50R17',
    rimSize: 17,
    condition: 'Like New (90%+ tread)',
    price: 75,
    image: '/tires/image21.jpeg',
    stock: { columbia: 4, greer: 4, greenville: 2, 'fountain-inn': 4 }
  },
  {
    id: 'col-22',
    brand: 'Nitto',
    model: 'Ridge Grappler',
    size: '37x12.50R17',
    rimSize: 17,
    condition: 'Like New (90%+ tread)',
    price: 75,
    image: '/tires/image22.jpeg',
    stock: { columbia: 4, greer: 2, greenville: 4, 'fountain-inn': 2 }
  },
  {
    id: 'col-23',
    brand: 'Michelin',
    model: 'Pilot Sport AS4',
    size: '215/55R18',
    rimSize: 18,
    condition: 'Good (70%+ tread)',
    price: 45,
    image: '/tires/image23.jpeg',
    stock: { columbia: 3, greer: 5, greenville: 4, 'fountain-inn': 3 }
  },
  {
    id: 'col-24',
    brand: 'Bridgestone',
    model: 'Dueler H/L Alenza',
    size: '225/60R18',
    rimSize: 18,
    condition: 'Good (70%+ tread)',
    price: 40,
    image: '/tires/image24.jpeg',
    stock: { columbia: 5, greer: 6, greenville: 7, 'fountain-inn': 4 }
  },
  {
    id: 'col-25',
    brand: 'Continental',
    model: 'CrossContact LX25',
    size: '235/55R18',
    rimSize: 18,
    condition: 'Good (70%+ tread)',
    price: 45,
    image: '/tires/image25.jpeg',
    stock: { columbia: 10, greer: 8, greenville: 9, 'fountain-inn': 6 }
  },
  {
    id: 'col-26',
    brand: 'Goodyear',
    model: 'Assurance WeatherReady',
    size: '235/60R18',
    rimSize: 18,
    condition: 'Good (70%+ tread)',
    price: 45,
    image: '/tires/image26.jpeg',
    stock: { columbia: 9, greer: 7, greenville: 8, 'fountain-inn': 5 }
  },
  {
    id: 'col-27',
    brand: 'Pirelli',
    model: 'P Zero All Season',
    size: '255/35R18',
    rimSize: 18,
    condition: 'Like New (90%+ tread)',
    price: 65,
    image: '/tires/image27.jpeg',
    stock: { columbia: 1, greer: 3, greenville: 2, 'fountain-inn': 1 }
  },
  {
    id: 'col-28',
    brand: 'BFGoodrich',
    model: 'All-Terrain T/A KO2',
    size: '275/65R18',
    rimSize: 18,
    condition: 'Like New (90%+ tread)',
    price: 50,
    image: '/tires/image28.jpeg',
    stock: { columbia: 8, greer: 6, greenville: 7, 'fountain-inn': 4 }
  },
  {
    id: 'col-29',
    brand: 'Michelin',
    model: 'Pilot Sport 4S',
    size: '235/45R19',
    rimSize: 19,
    condition: 'Like New (90%+ tread)',
    price: 55,
    image: '/tires/image29.jpeg',
    stock: { columbia: 1, greer: 4, greenville: 3, 'fountain-inn': 2 }
  },
  {
    id: 'col-30',
    brand: 'Hankook',
    model: 'Ventus S1 Noble2',
    size: '255/35R19',
    rimSize: 19,
    condition: 'Good (70%+ tread)',
    price: 50,
    image: '/tires/image30.jpeg',
    stock: { columbia: 6, greer: 5, greenville: 4, 'fountain-inn': 3 }
  },
  {
    id: 'col-31',
    brand: 'Continental',
    model: 'ExtremeContact DWS06',
    size: '275/35R19',
    rimSize: 19,
    condition: 'Like New (90%+ tread)',
    price: 75,
    image: '/tires/image31.jpeg',
    stock: { columbia: 6, greer: 4, greenville: 5, 'fountain-inn': 3 }
  },
  {
    id: 'col-32',
    brand: 'Pirelli',
    model: 'P Zero Sport',
    size: '245/40R20',
    rimSize: 20,
    condition: 'Good (70%+ tread)',
    price: 50,
    image: '/tires/image32.jpeg',
    stock: { columbia: 3, greer: 5, greenville: 4, 'fountain-inn': 2 }
  },
  {
    id: 'col-33',
    brand: 'Goodyear',
    model: 'Eagle F1 Asymmetric',
    size: '255/40R20',
    rimSize: 20,
    condition: 'Good (70%+ tread)',
    price: 50,
    image: '/tires/image33.jpeg',
    stock: { columbia: 14, greer: 8, greenville: 10, 'fountain-inn': 6 }
  },
  {
    id: 'col-34',
    brand: 'Bridgestone',
    model: 'Dueler H/L 400',
    size: '275/55R20',
    rimSize: 20,
    condition: 'Good (70%+ tread)',
    price: 50,
    image: '/tires/image34.jpeg',
    stock: { columbia: 12, greer: 9, greenville: 7, 'fountain-inn': 8 }
  },
  {
    id: 'col-35',
    brand: 'Custom / Performance',
    model: 'Brand New Performance Set',
    size: '305/35R24',
    rimSize: 24,
    condition: 'Like New (90%+ tread)',
    price: 650,
    image: '/tires/image35.jpeg',
    stock: { columbia: 6, greer: 4, greenville: 2, 'fountain-inn': 2 }
  }
];
