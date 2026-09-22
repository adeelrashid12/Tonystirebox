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
  { id: 'greer', name: 'Greer', address: '3574 Brown Rd, Greer, SC 29651', phone: '864-395-5393', hours: '8:00 AM - 8:00 PM', isPopular: true, image: '/container_greer.png' },
  { id: 'greenville', name: 'Greenville', address: '2490 New Easley Hwy, Greenville, SC 29611', phone: '864-395-5393', hours: '8:00 AM - 8:00 PM', isPopular: true, image: '/container_greer.png' },
  { id: 'aiken', name: 'Aiken', address: '1693 Edgefield Hwy, Aiken, SC 29801', phone: '864-395-5393', hours: '8:00 AM - 8:00 PM', image: '/container_aiken.png' },
  { id: 'fountain-inn', name: 'Fountain Inn', address: '2431 Greenpond Rd, Fountain Inn, SC 29644', phone: '864-395-5393', hours: '8:00 AM - 8:00 PM', isPopular: true, image: '/container_fountain_inn.png' },
  { id: 'little-river', name: 'Little River', address: '2329 Old Sanders Dr, Little River, SC 29566', phone: '864-395-5393', hours: '8:00 AM - 8:00 PM', image: '/container_little_river.png' },
  { id: 'longs', name: 'Longs', address: '1870 Hwy 9 East, Longs, SC 29568 (Tippy Toes RV)', phone: '864-395-5393', hours: '8:00 AM - 8:00 PM', image: '/container_little_river.png' },
  { id: 'columbia', name: 'Columbia', address: '3223 Platt Springs Rd, West Columbia, SC 29170', phone: '864-395-5393', hours: '8:00 AM - 8:00 PM', image: '/container_fountain_inn.png' },
  { id: 'hickory', name: 'Hickory', address: '1045 2nd Ave NW, Hickory, NC 28601 (The Xtra Space)', phone: '864-395-5393', hours: '8:00 AM - 8:00 PM', image: '/container_hickory.png' },
];

export const INITIAL_TIRES: TireItem[] = [
  {
    "id": "col-1",
    "brand": "Michelin",
    "model": "Touring Radial",
    "size": "175/65R14",
    "rimSize": 14,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/fountain/image31.jpeg",
    "stock": {
      "columbia": 6
    }
  },
  {
    "id": "col-2",
    "brand": "Goodyear",
    "model": "All-Season Radial",
    "size": "175/65R15",
    "rimSize": 15,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/fountain/image38.jpeg",
    "stock": {
      "columbia": 6
    }
  },
  {
    "id": "col-3",
    "brand": "Michelin",
    "model": "Defender T+H",
    "size": "185/55R15",
    "rimSize": 15,
    "condition": "Like New (90%+ tread)",
    "price": 45,
    "image": "/tires/fountain/image73.jpeg",
    "stock": {
      "columbia": 6
    }
  },
  {
    "id": "col-4",
    "brand": "Bridgestone",
    "model": "Ecopia EP422",
    "size": "195/55R15",
    "rimSize": 15,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/image24.jpeg",
    "stock": {
      "columbia": 7
    }
  },
  {
    "id": "col-5",
    "brand": "Continental",
    "model": "ProContact TX",
    "size": "195/60R15",
    "rimSize": 15,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/image10.jpeg",
    "stock": {
      "columbia": 11
    }
  },
  {
    "id": "col-6",
    "brand": "Goodyear",
    "model": "Assurance MaxLife",
    "size": "195/65R15",
    "rimSize": 15,
    "condition": "Like New (90%+ tread)",
    "price": 45,
    "image": "/tires/image19.jpeg",
    "stock": {
      "columbia": 17
    }
  },
  {
    "id": "col-7",
    "brand": "Pirelli",
    "model": "P4 Four Seasons",
    "size": "205/65R15",
    "rimSize": 15,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/fountain/image27.jpeg",
    "stock": {
      "columbia": 12
    }
  },
  {
    "id": "col-8",
    "brand": "Michelin",
    "model": "Energy Saver A/S",
    "size": "205/55R16",
    "rimSize": 16,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/image51.jpeg",
    "stock": {
      "columbia": 20
    }
  },
  {
    "id": "col-9",
    "brand": "Hankook",
    "model": "Kinergy GT",
    "size": "205/60R16",
    "rimSize": 16,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/image35.jpeg",
    "stock": {
      "columbia": 9
    }
  },
  {
    "id": "col-10",
    "brand": "Yokohama",
    "model": "Avid Ascend LX",
    "size": "205/65R16",
    "rimSize": 16,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/fountain/image74.jpeg",
    "stock": {
      "columbia": 9
    }
  },
  {
    "id": "col-11",
    "brand": "Toyo",
    "model": "Extensa A/S II",
    "size": "215/60R16",
    "rimSize": 16,
    "condition": "Like New (90%+ tread)",
    "price": 50,
    "image": "/tires/image70.jpeg",
    "stock": {
      "columbia": 9
    }
  },
  {
    "id": "col-12",
    "brand": "Continental",
    "model": "TrueContact Tour",
    "size": "215/65R16",
    "rimSize": 16,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/fountain/image29.jpeg",
    "stock": {
      "columbia": 2
    }
  },
  {
    "id": "col-13",
    "brand": "Bridgestone",
    "model": "Turanza QuietTrack",
    "size": "225/55R16",
    "rimSize": 16,
    "condition": "Good (70%+ tread)",
    "price": 50,
    "image": "/tires/image38.jpeg",
    "stock": {
      "columbia": 7
    }
  },
  {
    "id": "col-14",
    "brand": "Goodyear",
    "model": "Eagle Sport A/S",
    "size": "225/50R16",
    "rimSize": 16,
    "condition": "Like New (90%+ tread)",
    "price": 300,
    "image": "/tires/image3.jpeg",
    "stock": {
      "columbia": 4
    }
  },
  {
    "id": "col-15",
    "brand": "Pirelli",
    "model": "Cinturato P7",
    "size": "205/45R17",
    "rimSize": 17,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/image49.jpeg",
    "stock": {
      "columbia": 7
    }
  },
  {
    "id": "col-16",
    "brand": "Michelin",
    "model": "Primacy MXM4",
    "size": "215/55R17",
    "rimSize": 17,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/fountain/image5.jpeg",
    "stock": {
      "columbia": 1
    }
  },
  {
    "id": "col-17",
    "brand": "Hankook",
    "model": "Ventus V2 Concept2",
    "size": "225/50R17",
    "rimSize": 17,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/fountain/image76.jpeg",
    "stock": {
      "columbia": 3
    }
  },
  {
    "id": "col-18",
    "brand": "BFGoodrich",
    "model": "g-Force COMP-2 A/S",
    "size": "225/55R17",
    "rimSize": 17,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/fountain/image5.jpeg",
    "stock": {
      "columbia": 2
    }
  },
  {
    "id": "col-19",
    "brand": "Continental",
    "model": "PureContact LS",
    "size": "235/45R17",
    "rimSize": 17,
    "condition": "Like New (90%+ tread)",
    "price": 50,
    "image": "/tires/fountain/image34.jpeg",
    "stock": {
      "columbia": 1
    }
  },
  {
    "id": "col-20",
    "brand": "Goodyear",
    "model": "Wrangler SR-A",
    "size": "245/65R17",
    "rimSize": 17,
    "condition": "Good (70%+ tread)",
    "price": 50,
    "image": "/tires/image6 (1).jpeg",
    "stock": {
      "columbia": 1
    }
  },
  {
    "id": "col-21",
    "brand": "Toyo",
    "model": "Open Country A/T III",
    "size": "35x12.50R17",
    "rimSize": 17,
    "condition": "Like New (90%+ tread)",
    "price": 75,
    "image": "/tires/fountain/image76.jpeg",
    "stock": {
      "columbia": 4
    }
  },
  {
    "id": "col-22",
    "brand": "Nitto",
    "model": "Ridge Grappler",
    "size": "37x12.50R17",
    "rimSize": 17,
    "condition": "Like New (90%+ tread)",
    "price": 75,
    "image": "/tires/image41.jpeg",
    "stock": {
      "columbia": 4
    }
  },
  {
    "id": "col-23",
    "brand": "Michelin",
    "model": "Pilot Sport AS4",
    "size": "215/55R18",
    "rimSize": 18,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/fountain/image36.jpeg",
    "stock": {
      "columbia": 3
    }
  },
  {
    "id": "col-24",
    "brand": "Bridgestone",
    "model": "Dueler H/L Alenza",
    "size": "225/60R18",
    "rimSize": 18,
    "condition": "Good (70%+ tread)",
    "price": 40,
    "image": "/tires/fountain/image74.jpeg",
    "stock": {
      "columbia": 5
    }
  },
  {
    "id": "col-25",
    "brand": "Continental",
    "model": "CrossContact LX25",
    "size": "235/55R18",
    "rimSize": 18,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/image54.jpeg",
    "stock": {
      "columbia": 10
    }
  },
  {
    "id": "col-26",
    "brand": "Goodyear",
    "model": "Assurance WeatherReady",
    "size": "235/60R18",
    "rimSize": 18,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/fountain/image21.jpeg",
    "stock": {
      "columbia": 9
    }
  },
  {
    "id": "col-27",
    "brand": "Pirelli",
    "model": "P Zero All Season",
    "size": "255/35R18",
    "rimSize": 18,
    "condition": "Like New (90%+ tread)",
    "price": 65,
    "image": "/tires/image9.jpeg",
    "stock": {
      "columbia": 1
    }
  },
  {
    "id": "col-28",
    "brand": "BFGoodrich",
    "model": "All-Terrain T/A KO2",
    "size": "275/65R18",
    "rimSize": 18,
    "condition": "Like New (90%+ tread)",
    "price": 50,
    "image": "/tires/fountain/image26.jpeg",
    "stock": {
      "columbia": 8
    }
  },
  {
    "id": "col-29",
    "brand": "Michelin",
    "model": "Pilot Sport 4S",
    "size": "235/45R19",
    "rimSize": 19,
    "condition": "Like New (90%+ tread)",
    "price": 55,
    "image": "/tires/fountain/image20.jpeg",
    "stock": {
      "columbia": 1
    }
  },
  {
    "id": "col-30",
    "brand": "Hankook",
    "model": "Ventus S1 Noble2",
    "size": "255/35R19",
    "rimSize": 19,
    "condition": "Good (70%+ tread)",
    "price": 50,
    "image": "/tires/fountain/image2.jpeg",
    "stock": {
      "columbia": 6
    }
  },
  {
    "id": "col-31",
    "brand": "Continental",
    "model": "ExtremeContact DWS06",
    "size": "275/35R19",
    "rimSize": 19,
    "condition": "Like New (90%+ tread)",
    "price": 75,
    "image": "/tires/fountain/image74.jpeg",
    "stock": {
      "columbia": 6
    }
  },
  {
    "id": "col-32",
    "brand": "Pirelli",
    "model": "P Zero Sport",
    "size": "245/40R20",
    "rimSize": 20,
    "condition": "Good (70%+ tread)",
    "price": 50,
    "image": "/tires/image21.jpeg",
    "stock": {
      "columbia": 3
    }
  },
  {
    "id": "col-33",
    "brand": "Goodyear",
    "model": "Eagle F1 Asymmetric",
    "size": "255/40R20",
    "rimSize": 20,
    "condition": "Good (70%+ tread)",
    "price": 50,
    "image": "/tires/image34.jpeg",
    "stock": {
      "columbia": 14
    }
  },
  {
    "id": "col-34",
    "brand": "Bridgestone",
    "model": "Dueler H/L 400",
    "size": "275/55R20",
    "rimSize": 20,
    "condition": "Good (70%+ tread)",
    "price": 50,
    "image": "/tires/fountain/image36.jpeg",
    "stock": {
      "columbia": 12
    }
  },
  {
    "id": "col-35",
    "brand": "Custom / Performance",
    "model": "Brand New Performance Set",
    "size": "305/35R24",
    "rimSize": 24,
    "condition": "Like New (90%+ tread)",
    "price": 650,
    "image": "/tires/fountain/image69.jpeg",
    "stock": {
      "columbia": 6
    }
  },
  {
    "id": "fnt-1",
    "brand": "Michelin",
    "model": "Defender T+H",
    "size": "175/80R13",
    "rimSize": 13,
    "condition": "Like New (90%+ tread)",
    "price": 40,
    "image": "/tires/fountain/image4.jpeg",
    "stock": {
      "fountain-inn": 2
    }
  },
  {
    "id": "fnt-2",
    "brand": "Goodyear",
    "model": "Assurance All-Season",
    "size": "185/70R13",
    "rimSize": 13,
    "condition": "Good (70%+ tread)",
    "price": 35,
    "image": "/tires/image38.jpeg",
    "stock": {
      "fountain-inn": 1
    }
  },
  {
    "id": "fnt-3",
    "brand": "Bridgestone",
    "model": "Ecopia EP422 Plus",
    "size": "185/65R14",
    "rimSize": 14,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/fountain/image25.jpeg",
    "stock": {
      "fountain-inn": 1
    }
  },
  {
    "id": "fnt-4",
    "brand": "Continental",
    "model": "ProContact TX",
    "size": "175/65R15",
    "rimSize": 15,
    "condition": "Like New (90%+ tread)",
    "price": 40,
    "image": "/tires/fountain/image22.jpeg",
    "stock": {
      "fountain-inn": 5
    }
  },
  {
    "id": "fnt-5",
    "brand": "Carlisle",
    "model": "Radial Trail HD (Trailer)",
    "size": "205/75R14 ST",
    "rimSize": 14,
    "condition": "Good (70%+ tread)",
    "price": 40,
    "image": "/tires/fountain/image12.jpeg",
    "stock": {
      "fountain-inn": 2
    }
  },
  {
    "id": "fnt-6",
    "brand": "Pirelli",
    "model": "Cinturato P7",
    "size": "185/60R15",
    "rimSize": 15,
    "condition": "Good (70%+ tread)",
    "price": 40,
    "image": "/tires/fountain/image29.jpeg",
    "stock": {
      "fountain-inn": 8
    }
  },
  {
    "id": "fnt-7",
    "brand": "Hankook",
    "model": "Kinergy ST",
    "size": "185/65R15",
    "rimSize": 15,
    "condition": "Like New (90%+ tread)",
    "price": 40,
    "image": "/tires/fountain/image12.jpeg",
    "stock": {
      "fountain-inn": 5
    }
  },
  {
    "id": "fnt-8",
    "brand": "Toyo",
    "model": "Proxes R88R (Pair)",
    "size": "195/50R15",
    "rimSize": 15,
    "condition": "Good (70%+ tread)",
    "price": 100,
    "image": "/tires/fountain/image22.jpeg",
    "stock": {
      "fountain-inn": 2
    }
  },
  {
    "id": "fnt-9",
    "brand": "Yokohama",
    "model": "Avid Ascend GT",
    "size": "195/55R15",
    "rimSize": 15,
    "condition": "Good (70%+ tread)",
    "price": 40,
    "image": "/tires/image3.jpeg",
    "stock": {
      "fountain-inn": 8
    }
  },
  {
    "id": "fnt-10",
    "brand": "Michelin",
    "model": "Energy Saver A/S",
    "size": "195/60R15",
    "rimSize": 15,
    "condition": "Like New (90%+ tread)",
    "price": 40,
    "image": "/tires/image41.jpeg",
    "stock": {
      "fountain-inn": 16
    }
  },
  {
    "id": "fnt-11",
    "brand": "Goodyear",
    "model": "Assurance MaxLife",
    "size": "195/65R15",
    "rimSize": 15,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/image15.jpeg",
    "stock": {
      "fountain-inn": 15
    }
  },
  {
    "id": "fnt-12",
    "brand": "Continental",
    "model": "TrueContact Tour",
    "size": "205/55R15",
    "rimSize": 15,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/image34.jpeg",
    "stock": {
      "fountain-inn": 4
    }
  },
  {
    "id": "fnt-13",
    "brand": "Bridgestone",
    "model": "Turanza QuietTrack",
    "size": "205/65R15",
    "rimSize": 15,
    "condition": "Like New (90%+ tread)",
    "price": 45,
    "image": "/tires/fountain/image32.jpeg",
    "stock": {
      "fountain-inn": 9
    }
  },
  {
    "id": "fnt-14",
    "brand": "Goodyear",
    "model": "Endurance Trailer Set",
    "size": "205/75R15 ST",
    "rimSize": 15,
    "condition": "Like New (90%+ tread)",
    "price": 200,
    "image": "/tires/fountain/image73.jpeg",
    "stock": {
      "fountain-inn": 4
    }
  },
  {
    "id": "fnt-15",
    "brand": "BFGoodrich",
    "model": "Radial T/A",
    "size": "215/75R15",
    "rimSize": 15,
    "condition": "Good (70%+ tread)",
    "price": 55,
    "image": "/tires/image6 (1).jpeg",
    "stock": {
      "fountain-inn": 7
    }
  },
  {
    "id": "fnt-16",
    "brand": "Dunlop",
    "model": "Enasave EC300",
    "size": "185/55R16",
    "rimSize": 16,
    "condition": "Like New (90%+ tread)",
    "price": 45,
    "image": "/tires/image17.jpeg",
    "stock": {
      "fountain-inn": 1
    }
  },
  {
    "id": "fnt-17",
    "brand": "Michelin",
    "model": "Defender2",
    "size": "205/55R16",
    "rimSize": 16,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/fountain/image11.jpeg",
    "stock": {
      "fountain-inn": 9
    }
  },
  {
    "id": "fnt-18",
    "brand": "Goodyear",
    "model": "Eagle Sport A/S",
    "size": "205/60R16",
    "rimSize": 16,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/fountain/image37.jpeg",
    "stock": {
      "fountain-inn": 1
    }
  },
  {
    "id": "fnt-19",
    "brand": "Continental",
    "model": "PureContact LS",
    "size": "215/60R16",
    "rimSize": 16,
    "condition": "Like New (90%+ tread)",
    "price": 50,
    "image": "/tires/fountain/image36.jpeg",
    "stock": {
      "fountain-inn": 3
    }
  },
  {
    "id": "fnt-20",
    "brand": "Michelin",
    "model": "Agilis CrossClimate Heavy Stack",
    "size": "225/75R16",
    "rimSize": 16,
    "condition": "Good (70%+ tread)",
    "price": 450,
    "image": "/tires/image33.jpeg",
    "stock": {
      "fountain-inn": 8
    }
  },
  {
    "id": "fnt-21",
    "brand": "Firestone",
    "model": "Transforce HT2",
    "size": "235/80R16",
    "rimSize": 16,
    "condition": "Good (70%+ tread)",
    "price": 150,
    "image": "/tires/image9.jpeg",
    "stock": {
      "fountain-inn": 3
    }
  },
  {
    "id": "fnt-22",
    "brand": "Pirelli",
    "model": "P Zero All Season Plus",
    "size": "215/45R17",
    "rimSize": 17,
    "condition": "Like New (90%+ tread)",
    "price": 50,
    "image": "/tires/image76.jpeg",
    "stock": {
      "fountain-inn": 1
    }
  },
  {
    "id": "fnt-23",
    "brand": "Bridgestone",
    "model": "Turanza EL440",
    "size": "205/55R17",
    "rimSize": 17,
    "condition": "Good (70%+ tread)",
    "price": 50,
    "image": "/tires/image37.jpeg",
    "stock": {
      "fountain-inn": 1
    }
  },
  {
    "id": "fnt-24",
    "brand": "Hankook",
    "model": "Ventus V12 evo2 (Pair)",
    "size": "215/50R17",
    "rimSize": 17,
    "condition": "Good (70%+ tread)",
    "price": 100,
    "image": "/tires/image73.jpeg",
    "stock": {
      "fountain-inn": 2
    }
  },
  {
    "id": "fnt-25",
    "brand": "Michelin",
    "model": "Primacy Tour A/S",
    "size": "215/55R17",
    "rimSize": 17,
    "condition": "Like New (90%+ tread)",
    "price": 50,
    "image": "/tires/fountain/image69.jpeg",
    "stock": {
      "fountain-inn": 4
    }
  },
  {
    "id": "fnt-26",
    "brand": "Continental",
    "model": "ExtremeContact DWS06",
    "size": "225/50R17",
    "rimSize": 17,
    "condition": "Good (70%+ tread)",
    "price": 50,
    "image": "/tires/image22.jpeg",
    "stock": {
      "fountain-inn": 2
    }
  },
  {
    "id": "fnt-27",
    "brand": "Goodyear",
    "model": "Assurance WeatherReady",
    "size": "225/55R17",
    "rimSize": 17,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/fountain/image34.jpeg",
    "stock": {
      "fountain-inn": 5
    }
  },
  {
    "id": "fnt-28",
    "brand": "Yokohama",
    "model": "Geolandar A/T G015",
    "size": "225/65R17",
    "rimSize": 17,
    "condition": "Like New (90%+ tread)",
    "price": 45,
    "image": "/tires/fountain/image51.jpeg",
    "stock": {
      "fountain-inn": 2
    }
  },
  {
    "id": "fnt-29",
    "brand": "BFGoodrich",
    "model": "g-Force COMP-2 A/S PLUS",
    "size": "245/45R17",
    "rimSize": 17,
    "condition": "Good (70%+ tread)",
    "price": 50,
    "image": "/tires/fountain/image75.jpeg",
    "stock": {
      "fountain-inn": 1
    }
  },
  {
    "id": "fnt-30",
    "brand": "Falken",
    "model": "Wildpeak A/T3W Singles",
    "size": "285/70R17",
    "rimSize": 17,
    "condition": "Good (70%+ tread)",
    "price": 75,
    "image": "/tires/fountain/image22.jpeg",
    "stock": {
      "fountain-inn": 2
    }
  },
  {
    "id": "fnt-31",
    "brand": "Toyo",
    "model": "Open Country M/T Set of 5",
    "size": "35x12.50R17",
    "rimSize": 17,
    "condition": "Like New (90%+ tread)",
    "price": 650,
    "image": "/tires/image9.jpeg",
    "stock": {
      "fountain-inn": 5
    }
  },
  {
    "id": "fnt-32",
    "brand": "Michelin",
    "model": "CrossClimate2",
    "size": "215/55R18",
    "rimSize": 18,
    "condition": "Good (70%+ tread)",
    "price": 55,
    "image": "/tires/image6.jpeg",
    "stock": {
      "fountain-inn": 1
    }
  },
  {
    "id": "fnt-33",
    "brand": "Bridgestone",
    "model": "Dueler H/L Alenza Plus Pair",
    "size": "225/55R18",
    "rimSize": 18,
    "condition": "Good (70%+ tread)",
    "price": 100,
    "image": "/tires/fountain/image5.jpeg",
    "stock": {
      "fountain-inn": 3
    }
  },
  {
    "id": "fnt-34",
    "brand": "Goodyear",
    "model": "Assurance ComfortDrive Set",
    "size": "225/60R18",
    "rimSize": 18,
    "condition": "Like New (90%+ tread)",
    "price": 200,
    "image": "/tires/image27.jpeg",
    "stock": {
      "fountain-inn": 4
    }
  },
  {
    "id": "fnt-35",
    "brand": "Pirelli",
    "model": "Cinturato WeatherActive",
    "size": "235/40R18",
    "rimSize": 18,
    "condition": "Good (70%+ tread)",
    "price": 50,
    "image": "/tires/image32.jpeg",
    "stock": {
      "fountain-inn": 1
    }
  },
  {
    "id": "fnt-36",
    "brand": "Continental",
    "model": "CrossContact LX25",
    "size": "235/55R18",
    "rimSize": 18,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/image6.jpeg",
    "stock": {
      "fountain-inn": 1
    }
  },
  {
    "id": "fnt-37",
    "brand": "Hankook",
    "model": "Dynapro HP2",
    "size": "235/60R18",
    "rimSize": 18,
    "condition": "Like New (90%+ tread)",
    "price": 40,
    "image": "/tires/fountain/image1.jpeg",
    "stock": {
      "fountain-inn": 2
    }
  },
  {
    "id": "fnt-38",
    "brand": "Michelin",
    "model": "Pilot Sport All Season 4",
    "size": "245/50R18",
    "rimSize": 18,
    "condition": "Good (70%+ tread)",
    "price": 50,
    "image": "/tires/fountain/image73.jpeg",
    "stock": {
      "fountain-inn": 3
    }
  },
  {
    "id": "fnt-39",
    "brand": "Toyo",
    "model": "Open Country Q/T",
    "size": "245/60R18",
    "rimSize": 18,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/image28.jpeg",
    "stock": {
      "fountain-inn": 4
    }
  },
  {
    "id": "fnt-40",
    "brand": "Yokohama",
    "model": "Advan Sport A/S+ Pair",
    "size": "255/40R18",
    "rimSize": 18,
    "condition": "Like New (90%+ tread)",
    "price": 100,
    "image": "/tires/image73.jpeg",
    "stock": {
      "fountain-inn": 2
    }
  },
  {
    "id": "fnt-41",
    "brand": "Bridgestone",
    "model": "Dueler A/T Revo 3",
    "size": "265/60R18",
    "rimSize": 18,
    "condition": "Good (70%+ tread)",
    "price": 55,
    "image": "/tires/fountain/image28.jpeg",
    "stock": {
      "fountain-inn": 3
    }
  },
  {
    "id": "fnt-42",
    "brand": "Bridgestone",
    "model": "Dueler H/T 685 Set",
    "size": "255/70R18",
    "rimSize": 18,
    "condition": "Like New (90%+ tread)",
    "price": 200,
    "image": "/tires/image51.jpeg",
    "stock": {
      "fountain-inn": 4
    }
  },
  {
    "id": "fnt-43",
    "brand": "Goodyear",
    "model": "Wrangler Fortitude HT",
    "size": "265/70R18",
    "rimSize": 18,
    "condition": "Like New (90%+ tread)",
    "price": 40,
    "image": "/tires/image33.jpeg",
    "stock": {
      "fountain-inn": 1
    }
  },
  {
    "id": "fnt-44",
    "brand": "BFGoodrich",
    "model": "All-Terrain T/A KO2",
    "size": "275/70R18",
    "rimSize": 18,
    "condition": "Good (70%+ tread)",
    "price": 65,
    "image": "/tires/image7.jpeg",
    "stock": {
      "fountain-inn": 1
    }
  },
  {
    "id": "fnt-45",
    "brand": "Toyo",
    "model": "Celsius CUV",
    "size": "225/55R19",
    "rimSize": 19,
    "condition": "Good (70%+ tread)",
    "price": 50,
    "image": "/tires/image21.jpeg",
    "stock": {
      "fountain-inn": 1
    }
  },
  {
    "id": "fnt-46",
    "brand": "Michelin",
    "model": "Latitude Tour HP Set",
    "size": "235/55R19",
    "rimSize": 19,
    "condition": "Like New (90%+ tread)",
    "price": 45,
    "image": "/tires/image32.jpeg",
    "stock": {
      "fountain-inn": 5
    }
  },
  {
    "id": "fnt-47",
    "brand": "Pirelli",
    "model": "Scorpion Verde All Season",
    "size": "245/50R19",
    "rimSize": 19,
    "condition": "Good (70%+ tread)",
    "price": 50,
    "image": "/tires/image27.jpeg",
    "stock": {
      "fountain-inn": 3
    }
  },
  {
    "id": "fnt-48",
    "brand": "Continental",
    "model": "4x4 Contact",
    "size": "265/50R19",
    "rimSize": 19,
    "condition": "Good (70%+ tread)",
    "price": 50,
    "image": "/tires/image5.jpeg",
    "stock": {
      "fountain-inn": 1
    }
  },
  {
    "id": "fnt-49",
    "brand": "Michelin",
    "model": "Pilot Sport 4S Set",
    "size": "245/40R20",
    "rimSize": 20,
    "condition": "Like New (90%+ tread)",
    "price": 350,
    "image": "/tires/image51.jpeg",
    "stock": {
      "fountain-inn": 4
    }
  },
  {
    "id": "fnt-50",
    "brand": "Goodyear",
    "model": "Eagle Touring Set of 5",
    "size": "245/50R20",
    "rimSize": 20,
    "condition": "Like New (90%+ tread)",
    "price": 375,
    "image": "/tires/fountain/image12.jpeg",
    "stock": {
      "fountain-inn": 5
    }
  },
  {
    "id": "fnt-51",
    "brand": "Bridgestone",
    "model": "Alenza AS Ultra",
    "size": "255/45R20",
    "rimSize": 20,
    "condition": "Good (70%+ tread)",
    "price": 50,
    "image": "/tires/fountain/image6.jpeg",
    "stock": {
      "fountain-inn": 1
    }
  },
  {
    "id": "fnt-52",
    "brand": "Pirelli",
    "model": "Scorpion Zero All Season Pair",
    "size": "255/55R20",
    "rimSize": 20,
    "condition": "Like New (90%+ tread)",
    "price": 150,
    "image": "/tires/fountain/image26.jpeg",
    "stock": {
      "fountain-inn": 2
    }
  },
  {
    "id": "fnt-53",
    "brand": "Michelin",
    "model": "Defender LTX M/S",
    "size": "275/55R20",
    "rimSize": 20,
    "condition": "Good (70%+ tread)",
    "price": 50,
    "image": "/tires/fountain/image34.jpeg",
    "stock": {
      "fountain-inn": 2
    }
  },
  {
    "id": "fnt-54",
    "brand": "Hankook",
    "model": "Dynapro AT2 Set",
    "size": "275/60R20",
    "rimSize": 20,
    "condition": "Like New (90%+ tread)",
    "price": 450,
    "image": "/tires/fountain/image15.jpeg",
    "stock": {
      "fountain-inn": 15
    }
  },
  {
    "id": "fnt-55",
    "brand": "Goodyear",
    "model": "Wrangler Ultraterrain A/T Set",
    "size": "275/65R20",
    "rimSize": 20,
    "condition": "Like New (90%+ tread)",
    "price": 400,
    "image": "/tires/image34.jpeg",
    "stock": {
      "fountain-inn": 4
    }
  },
  {
    "id": "fnt-56",
    "brand": "Nitto",
    "model": "Ridge Grappler Pair",
    "size": "35x12.50R20",
    "rimSize": 20,
    "condition": "Good (70%+ tread)",
    "price": 250,
    "image": "/tires/image37.jpeg",
    "stock": {
      "fountain-inn": 2
    }
  },
  {
    "id": "fnt-57",
    "brand": "Pirelli",
    "model": "P Zero PZ4 Luxury Set",
    "size": "275/35R21",
    "rimSize": 21,
    "condition": "Like New (90%+ tread)",
    "price": 450,
    "image": "/tires/image20.jpeg",
    "stock": {
      "fountain-inn": 4
    }
  },
  {
    "id": "fnt-58",
    "brand": "Continental",
    "model": "CrossContact RX Pair",
    "size": "275/40R21",
    "rimSize": 21,
    "condition": "Like New (90%+ tread)",
    "price": 225,
    "image": "/tires/image8.jpeg",
    "stock": {
      "fountain-inn": 2
    }
  },
  {
    "id": "fnt-59",
    "brand": "Michelin",
    "model": "Primacy MXM4 Pair",
    "size": "275/45R21",
    "rimSize": 21,
    "condition": "Good (70%+ tread)",
    "price": 250,
    "image": "/tires/fountain/image28.jpeg",
    "stock": {
      "fountain-inn": 2
    }
  },
  {
    "id": "fnt-60",
    "brand": "Pirelli",
    "model": "P Zero Performance Pair",
    "size": "315/35R21",
    "rimSize": 21,
    "condition": "Good (70%+ tread)",
    "price": 450,
    "image": "/tires/image70.jpeg",
    "stock": {
      "fountain-inn": 2
    }
  },
  {
    "id": "fnt-61",
    "brand": "Bridgestone",
    "model": "Alenza Sport A/S Set",
    "size": "275/50R22",
    "rimSize": 22,
    "condition": "Like New (90%+ tread)",
    "price": 300,
    "image": "/tires/image73.jpeg",
    "stock": {
      "fountain-inn": 4
    }
  },
  {
    "id": "fnt-62",
    "brand": "Goodyear",
    "model": "Eagle Touring 3+1 Set",
    "size": "285/45R22",
    "rimSize": 22,
    "condition": "Like New (90%+ tread)",
    "price": 300,
    "image": "/tires/image38.jpeg",
    "stock": {
      "fountain-inn": 4
    }
  },
  {
    "id": "fnt-63",
    "brand": "Continental",
    "model": "SportContact 6 Set",
    "size": "295/40R22",
    "rimSize": 22,
    "condition": "Like New (90%+ tread)",
    "price": 450,
    "image": "/tires/fountain/image1.jpeg",
    "stock": {
      "fountain-inn": 4
    }
  },
  {
    "id": "fnt-64",
    "brand": "Lexani",
    "model": "LX-Twenty Performance Set",
    "size": "305/35R24",
    "rimSize": 24,
    "condition": "Like New (90%+ tread)",
    "price": 575,
    "image": "/tires/image76.jpeg",
    "stock": {
      "fountain-inn": 4
    }
  },
  {
    "id": "grr-1",
    "brand": "Michelin",
    "model": "Touring Radial",
    "size": "175/65R14",
    "rimSize": 14,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/fountain/image36.jpeg",
    "stock": {
      "greer": 8
    }
  },
  {
    "id": "grr-2",
    "brand": "Goodyear",
    "model": "Assurance All-Season",
    "size": "185/65R15",
    "rimSize": 15,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/image29.jpeg",
    "stock": {
      "greer": 13
    }
  },
  {
    "id": "grr-3",
    "brand": "Bridgestone",
    "model": "Ecopia EP422",
    "size": "195/55R15",
    "rimSize": 15,
    "condition": "Like New (90%+ tread)",
    "price": 45,
    "image": "/tires/image17.jpeg",
    "stock": {
      "greer": 8
    }
  },
  {
    "id": "grr-4",
    "brand": "Continental",
    "model": "ProContact TX",
    "size": "195/60R15",
    "rimSize": 15,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/fountain/image29.jpeg",
    "stock": {
      "greer": 7
    }
  },
  {
    "id": "grr-5",
    "brand": "Goodyear",
    "model": "Assurance MaxLife",
    "size": "195/65R15",
    "rimSize": 15,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/fountain/image28.jpeg",
    "stock": {
      "greer": 7
    }
  },
  {
    "id": "grr-6",
    "brand": "Goodyear",
    "model": "Assurance (Clearance Single)",
    "size": "195/65R15",
    "rimSize": 15,
    "condition": "Good (70%+ tread)",
    "price": 35,
    "image": "/tires/image21.jpeg",
    "stock": {
      "greer": 1
    }
  },
  {
    "id": "grr-7",
    "brand": "Pirelli",
    "model": "P4 Four Seasons",
    "size": "205/65R15",
    "rimSize": 15,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/fountain/image31.jpeg",
    "stock": {
      "greer": 7
    }
  },
  {
    "id": "grr-8",
    "brand": "Michelin",
    "model": "Energy Saver A/S",
    "size": "205/50R16",
    "rimSize": 16,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/image36.jpeg",
    "stock": {
      "greer": 1
    }
  },
  {
    "id": "grr-9",
    "brand": "Continental",
    "model": "TrueContact Tour",
    "size": "205/55R16",
    "rimSize": 16,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/fountain/image55.jpeg",
    "stock": {
      "greer": 6
    }
  },
  {
    "id": "grr-10",
    "brand": "Hankook",
    "model": "Kinergy GT",
    "size": "205/60R16",
    "rimSize": 16,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/image73.jpeg",
    "stock": {
      "greer": 7
    }
  },
  {
    "id": "grr-11",
    "brand": "Yokohama",
    "model": "Avid Ascend LX",
    "size": "205/65R16",
    "rimSize": 16,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/image35.jpeg",
    "stock": {
      "greer": 8
    }
  },
  {
    "id": "grr-12",
    "brand": "Bridgestone",
    "model": "Turanza QuietTrack (Single)",
    "size": "215/55R16",
    "rimSize": 16,
    "condition": "Good (70%+ tread)",
    "price": 35,
    "image": "/tires/fountain/image11.jpeg",
    "stock": {
      "greer": 1
    }
  },
  {
    "id": "grr-13",
    "brand": "Toyo",
    "model": "Extensa A/S II",
    "size": "215/60R16",
    "rimSize": 16,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/image12.jpeg",
    "stock": {
      "greer": 8
    }
  },
  {
    "id": "grr-14",
    "brand": "Michelin",
    "model": "Defender2",
    "size": "215/65R16",
    "rimSize": 16,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/fountain/image2.jpeg",
    "stock": {
      "greer": 5
    }
  },
  {
    "id": "grr-15",
    "brand": "Goodyear",
    "model": "Wrangler ST",
    "size": "235/65R16",
    "rimSize": 16,
    "condition": "Like New (90%+ tread)",
    "price": 50,
    "image": "/tires/fountain/image16.jpeg",
    "stock": {
      "greer": 6
    }
  },
  {
    "id": "grr-16",
    "brand": "Pirelli",
    "model": "Cinturato P7",
    "size": "205/45R17",
    "rimSize": 17,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/fountain/image27.jpeg",
    "stock": {
      "greer": 3
    }
  },
  {
    "id": "grr-17",
    "brand": "Michelin",
    "model": "Primacy MXM4 (Single)",
    "size": "215/55R17",
    "rimSize": 17,
    "condition": "Good (70%+ tread)",
    "price": 35,
    "image": "/tires/image1 (1).jpeg",
    "stock": {
      "greer": 1
    }
  },
  {
    "id": "grr-18",
    "brand": "Hankook",
    "model": "Ventus V2 Concept2",
    "size": "225/45R17",
    "rimSize": 17,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/fountain/image17.jpeg",
    "stock": {
      "greer": 10
    }
  },
  {
    "id": "grr-19",
    "brand": "BFGoodrich",
    "model": "g-Force COMP-2 A/S",
    "size": "225/55R17",
    "rimSize": 17,
    "condition": "Good (70%+ tread)",
    "price": 35,
    "image": "/tires/fountain/image4.jpeg",
    "stock": {
      "greer": 1
    }
  },
  {
    "id": "grr-20",
    "brand": "Yokohama",
    "model": "Geolandar A/T (Set of 4 + 1)",
    "size": "225/60R17",
    "rimSize": 17,
    "condition": "Good (70%+ tread)",
    "price": 100,
    "image": "/tires/fountain/image69.jpeg",
    "stock": {
      "greer": 5
    }
  },
  {
    "id": "grr-21",
    "brand": "Goodyear",
    "model": "Assurance Pair",
    "size": "225/65R17",
    "rimSize": 17,
    "condition": "Good (70%+ tread)",
    "price": 35,
    "image": "/tires/fountain/image21.jpeg",
    "stock": {
      "greer": 2
    }
  },
  {
    "id": "grr-22",
    "brand": "Firestone",
    "model": "Transforce HT Heavy Duty",
    "size": "235/80R17",
    "rimSize": 17,
    "condition": "Good (70%+ tread)",
    "price": 50,
    "image": "/tires/image27.jpeg",
    "stock": {
      "greer": 10
    }
  },
  {
    "id": "grr-23",
    "brand": "Goodyear",
    "model": "Wrangler SR-A Pair",
    "size": "245/65R17",
    "rimSize": 17,
    "condition": "Good (70%+ tread)",
    "price": 35,
    "image": "/tires/image76.jpeg",
    "stock": {
      "greer": 2
    }
  },
  {
    "id": "grr-24",
    "brand": "BFGoodrich",
    "model": "All-Terrain KO2 (3 Sets)",
    "size": "265/70R17",
    "rimSize": 17,
    "condition": "Like New (90%+ tread)",
    "price": 250,
    "image": "/tires/image25.jpeg",
    "stock": {
      "greer": 12
    }
  },
  {
    "id": "grr-25",
    "brand": "Falken",
    "model": "Wildpeak A/T3W Set",
    "size": "285/70R17",
    "rimSize": 17,
    "condition": "Good (70%+ tread)",
    "price": 175,
    "image": "/tires/fountain/image55.jpeg",
    "stock": {
      "greer": 4
    }
  },
  {
    "id": "grr-26",
    "brand": "Nitto",
    "model": "Ridge Grappler Set",
    "size": "295/70R17",
    "rimSize": 17,
    "condition": "Like New (90%+ tread)",
    "price": 375,
    "image": "/tires/fountain/image25.jpeg",
    "stock": {
      "greer": 4
    }
  },
  {
    "id": "grr-27",
    "brand": "Toyo",
    "model": "Open Country M/T Pair",
    "size": "35x12.50R17",
    "rimSize": 17,
    "condition": "Like New (90%+ tread)",
    "price": 150,
    "image": "/tires/fountain/image9.jpeg",
    "stock": {
      "greer": 2
    }
  },
  {
    "id": "grr-28",
    "brand": "Commercial HD",
    "model": "Trailer Duty Set",
    "size": "215/75R17.5",
    "rimSize": 17,
    "condition": "Good (70%+ tread)",
    "price": 75,
    "image": "/tires/image10.jpeg",
    "stock": {
      "greer": 5
    }
  },
  {
    "id": "grr-29",
    "brand": "Michelin",
    "model": "Primacy Tour A/S Set",
    "size": "225/60R18",
    "rimSize": 18,
    "condition": "Good (70%+ tread)",
    "price": 180,
    "image": "/tires/image6.jpeg",
    "stock": {
      "greer": 4
    }
  },
  {
    "id": "grr-30",
    "brand": "Continental",
    "model": "CrossContact LX25",
    "size": "235/60R18",
    "rimSize": 18,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/image1.jpeg",
    "stock": {
      "greer": 3
    }
  },
  {
    "id": "grr-31",
    "brand": "Bridgestone",
    "model": "Dueler H/T 685 (2 Sets & Pair)",
    "size": "255/70R18",
    "rimSize": 18,
    "condition": "Good (70%+ tread)",
    "price": 200,
    "image": "/tires/fountain/image13.jpeg",
    "stock": {
      "greer": 10
    }
  },
  {
    "id": "grr-32",
    "brand": "Goodyear",
    "model": "Eagle Touring Set",
    "size": "255/60R18",
    "rimSize": 18,
    "condition": "Good (70%+ tread)",
    "price": 180,
    "image": "/tires/image37.jpeg",
    "stock": {
      "greer": 4
    }
  },
  {
    "id": "grr-33",
    "brand": "Michelin",
    "model": "Defender LTX M/S (2 Sets)",
    "size": "265/60R18",
    "rimSize": 18,
    "condition": "Good (70%+ tread)",
    "price": 240,
    "image": "/tires/image20.jpeg",
    "stock": {
      "greer": 8
    }
  },
  {
    "id": "grr-34",
    "brand": "Goodyear",
    "model": "Wrangler All-Terrain Set",
    "size": "275/65R18",
    "rimSize": 18,
    "condition": "Good (70%+ tread)",
    "price": 175,
    "image": "/tires/image70.jpeg",
    "stock": {
      "greer": 4
    }
  },
  {
    "id": "grr-35",
    "brand": "Nitto",
    "model": "Terra Grappler Set",
    "size": "295/70R18",
    "rimSize": 18,
    "condition": "Like New (90%+ tread)",
    "price": 200,
    "image": "/tires/image1.jpeg",
    "stock": {
      "greer": 4
    }
  },
  {
    "id": "grr-36",
    "brand": "Toyo",
    "model": "Open Country A/T III Set",
    "size": "33x12.50R18",
    "rimSize": 18,
    "condition": "Like New (90%+ tread)",
    "price": 250,
    "image": "/tires/image29.jpeg",
    "stock": {
      "greer": 4
    }
  },
  {
    "id": "grr-37",
    "brand": "Toyo",
    "model": "Celsius CUV (2 Pairs)",
    "size": "225/55R19",
    "rimSize": 19,
    "condition": "Good (70%+ tread)",
    "price": 50,
    "image": "/tires/image36.jpeg",
    "stock": {
      "greer": 4
    }
  },
  {
    "id": "grr-38",
    "brand": "Michelin",
    "model": "Pilot Sport 4S (3+1)",
    "size": "235/40R19",
    "rimSize": 19,
    "condition": "Like New (90%+ tread)",
    "price": 50,
    "image": "/tires/image35.jpeg",
    "stock": {
      "greer": 2
    }
  },
  {
    "id": "grr-39",
    "brand": "Continental",
    "model": "CrossContact LX",
    "size": "235/55R19",
    "rimSize": 19,
    "condition": "Good (70%+ tread)",
    "price": 35,
    "image": "/tires/fountain/image21.jpeg",
    "stock": {
      "greer": 3
    }
  },
  {
    "id": "grr-40",
    "brand": "Pirelli",
    "model": "P Zero Performance Pair",
    "size": "255/35R19",
    "rimSize": 19,
    "condition": "Like New (90%+ tread)",
    "price": 320,
    "image": "/tires/image48.jpeg",
    "stock": {
      "greer": 2
    }
  },
  {
    "id": "grr-41",
    "brand": "Hankook",
    "model": "Ventus S1 Noble2 Pair",
    "size": "255/40R19",
    "rimSize": 19,
    "condition": "Good (70%+ tread)",
    "price": 120,
    "image": "/tires/image4.jpeg",
    "stock": {
      "greer": 2
    }
  },
  {
    "id": "grr-42",
    "brand": "Michelin",
    "model": "Pilot Super Sport",
    "size": "275/40R19",
    "rimSize": 19,
    "condition": "Like New (90%+ tread)",
    "price": 75,
    "image": "/tires/image28.jpeg",
    "stock": {
      "greer": 7
    }
  },
  {
    "id": "grr-43",
    "brand": "Continental",
    "model": "ExtremeContact DWS06 Pair",
    "size": "285/30R19",
    "rimSize": 19,
    "condition": "Like New (90%+ tread)",
    "price": 320,
    "image": "/tires/fountain/image36.jpeg",
    "stock": {
      "greer": 2
    }
  },
  {
    "id": "grr-44",
    "brand": "Pirelli",
    "model": "P Zero All Season",
    "size": "245/40R20",
    "rimSize": 20,
    "condition": "Good (70%+ tread)",
    "price": 60,
    "image": "/tires/image11.jpeg",
    "stock": {
      "greer": 5
    }
  },
  {
    "id": "grr-45",
    "brand": "Goodyear",
    "model": "Eagle F1 Asymmetric (Set & Singles)",
    "size": "245/45R20",
    "rimSize": 20,
    "condition": "Good (70%+ tread)",
    "price": 60,
    "image": "/tires/image55.jpeg",
    "stock": {
      "greer": 6
    }
  },
  {
    "id": "grr-46",
    "brand": "Goodyear",
    "model": "Eagle Touring Set",
    "size": "245/50R20",
    "rimSize": 20,
    "condition": "Like New (90%+ tread)",
    "price": 250,
    "image": "/tires/image73.jpeg",
    "stock": {
      "greer": 4
    }
  },
  {
    "id": "grr-47",
    "brand": "Bridgestone",
    "model": "Dueler H/L Alenza Set",
    "size": "245/60R20",
    "rimSize": 20,
    "condition": "Good (70%+ tread)",
    "price": 200,
    "image": "/tires/fountain/image20.jpeg",
    "stock": {
      "greer": 4
    }
  },
  {
    "id": "grr-48",
    "brand": "Michelin",
    "model": "Pilot Sport EV",
    "size": "255/40R20",
    "rimSize": 20,
    "condition": "Good (70%+ tread)",
    "price": 60,
    "image": "/tires/image25.jpeg",
    "stock": {
      "greer": 7
    }
  },
  {
    "id": "grr-49",
    "brand": "Continental",
    "model": "CrossContact Set",
    "size": "255/50R20",
    "rimSize": 20,
    "condition": "Good (70%+ tread)",
    "price": 220,
    "image": "/tires/fountain/image28.jpeg",
    "stock": {
      "greer": 4
    }
  },
  {
    "id": "grr-50",
    "brand": "Bridgestone",
    "model": "Alenza Sport (3 Sets)",
    "size": "265/50R20",
    "rimSize": 20,
    "condition": "Good (70%+ tread)",
    "price": 250,
    "image": "/tires/fountain/image69.jpeg",
    "stock": {
      "greer": 12
    }
  },
  {
    "id": "grr-51",
    "brand": "Pirelli",
    "model": "P Zero PZ4 Pair",
    "size": "275/40R20",
    "rimSize": 20,
    "condition": "Good (70%+ tread)",
    "price": 100,
    "image": "/tires/image16.jpeg",
    "stock": {
      "greer": 2
    }
  },
  {
    "id": "grr-52",
    "brand": "Goodyear",
    "model": "Wrangler SR-A (4 Sets & Pair)",
    "size": "275/55R20",
    "rimSize": 20,
    "condition": "Good (70%+ tread)",
    "price": 250,
    "image": "/tires/fountain/image37.jpeg",
    "stock": {
      "greer": 15
    }
  },
  {
    "id": "grr-53",
    "brand": "Hankook",
    "model": "Dynapro AT2 Pair",
    "size": "275/60R20",
    "rimSize": 20,
    "condition": "Good (70%+ tread)",
    "price": 120,
    "image": "/tires/image16.jpeg",
    "stock": {
      "greer": 2
    }
  },
  {
    "id": "grr-54",
    "brand": "Goodyear",
    "model": "Wrangler Ultraterrain Set of 5",
    "size": "275/65R20",
    "rimSize": 20,
    "condition": "Like New (90%+ tread)",
    "price": 175,
    "image": "/tires/image34.jpeg",
    "stock": {
      "greer": 5
    }
  },
  {
    "id": "grr-55",
    "brand": "Nitto",
    "model": "Ridge Grappler Set",
    "size": "295/55R20",
    "rimSize": 20,
    "condition": "Like New (90%+ tread)",
    "price": 350,
    "image": "/tires/fountain/image35.jpeg",
    "stock": {
      "greer": 4
    }
  },
  {
    "id": "grr-56",
    "brand": "Michelin",
    "model": "Pilot Sport Supercar Pair",
    "size": "345/25R21",
    "rimSize": 21,
    "condition": "Like New (90%+ tread)",
    "price": 350,
    "image": "/tires/fountain/image22.jpeg",
    "stock": {
      "greer": 2
    }
  },
  {
    "id": "grr-57",
    "brand": "Bridgestone",
    "model": "Alenza Sport A/S Set",
    "size": "275/50R22",
    "rimSize": 22,
    "condition": "Good (70%+ tread)",
    "price": 250,
    "image": "/tires/image35.jpeg",
    "stock": {
      "greer": 10
    }
  },
  {
    "id": "grr-58",
    "brand": "Goodyear",
    "model": "Eagle Touring Set",
    "size": "285/45R22",
    "rimSize": 22,
    "condition": "Like New (90%+ tread)",
    "price": 250,
    "image": "/tires/fountain/image76.jpeg",
    "stock": {
      "greer": 4
    }
  },
  {
    "id": "grr-59",
    "brand": "Continental",
    "model": "SportContact 6 Pair",
    "size": "285/40R22",
    "rimSize": 22,
    "condition": "Like New (90%+ tread)",
    "price": 600,
    "image": "/tires/fountain/image51.jpeg",
    "stock": {
      "greer": 2
    }
  },
  {
    "id": "grr-60",
    "brand": "Pirelli",
    "model": "P Zero Performance Pair",
    "size": "325/35R22",
    "rimSize": 22,
    "condition": "Like New (90%+ tread)",
    "price": 600,
    "image": "/tires/image16.jpeg",
    "stock": {
      "greer": 2
    }
  },
  {
    "id": "grr-61",
    "brand": "Nitto",
    "model": "Terra Grappler Single",
    "size": "325/50R22",
    "rimSize": 22,
    "condition": "Good (70%+ tread)",
    "price": 50,
    "image": "/tires/fountain/image17.jpeg",
    "stock": {
      "greer": 1
    }
  },
  {
    "id": "grr-62",
    "brand": "Lexani",
    "model": "LX-Twenty Performance Set",
    "size": "305/35R24",
    "rimSize": 24,
    "condition": "Like New (90%+ tread)",
    "price": 599,
    "image": "/tires/image28.jpeg",
    "stock": {
      "greer": 4
    }
  },
  {
    "id": "lng-1",
    "brand": "Quality Used Tire",
    "model": "185/65R15",
    "size": "185/65R15",
    "rimSize": 15,
    "condition": "Good (70%+ tread)",
    "price": 40,
    "image": "/tires/image24.jpeg",
    "stock": {
      "longs": 6
    }
  },
  {
    "id": "lng-2",
    "brand": "Quality Used Tire",
    "model": "195/60R15",
    "size": "195/60R15",
    "rimSize": 15,
    "condition": "Good (70%+ tread)",
    "price": 40,
    "image": "/tires/image76.jpeg",
    "stock": {
      "longs": 7
    }
  },
  {
    "id": "lng-3",
    "brand": "Quality Used Tire",
    "model": "195/65R15",
    "size": "195/65R15",
    "rimSize": 15,
    "condition": "Good (70%+ tread)",
    "price": 40,
    "image": "/tires/image1.jpeg",
    "stock": {
      "longs": 10
    }
  },
  {
    "id": "lng-4",
    "brand": "Quality Used Tire",
    "model": "205/65R15",
    "size": "205/65R15",
    "rimSize": 15,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/image37.jpeg",
    "stock": {
      "longs": 8
    }
  },
  {
    "id": "lng-5",
    "brand": "Quality Used Tire",
    "model": "205/55R16",
    "size": "205/55R16",
    "rimSize": 16,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/fountain/image74.jpeg",
    "stock": {
      "longs": 1
    }
  },
  {
    "id": "lng-6",
    "brand": "Quality Used Tire",
    "model": "205/60R16",
    "size": "205/60R16",
    "rimSize": 16,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/fountain/image16.jpeg",
    "stock": {
      "longs": 8
    }
  },
  {
    "id": "lng-7",
    "brand": "Quality Used Tire",
    "model": "205/65R16",
    "size": "205/65R16",
    "rimSize": 16,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/fountain/image15.jpeg",
    "stock": {
      "longs": 4
    }
  },
  {
    "id": "lng-8",
    "brand": "Quality Used Tire",
    "model": "215/55R16",
    "size": "215/55R16",
    "rimSize": 16,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/fountain/image75.jpeg",
    "stock": {
      "longs": 1
    }
  },
  {
    "id": "lng-9",
    "brand": "Quality Used Tire",
    "model": "215/60R16",
    "size": "215/60R16",
    "rimSize": 16,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/fountain/image17.jpeg",
    "stock": {
      "longs": 3
    }
  },
  {
    "id": "lng-10",
    "brand": "Quality Used Tire",
    "model": "215/65R16",
    "size": "215/65R16",
    "rimSize": 16,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/image41.jpeg",
    "stock": {
      "longs": 2
    }
  },
  {
    "id": "lng-11",
    "brand": "Quality Used Tire",
    "model": "225/75R16",
    "size": "225/75R16",
    "rimSize": 16,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/fountain/image20.jpeg",
    "stock": {
      "longs": 1
    }
  },
  {
    "id": "lng-12",
    "brand": "Quality Used Tire",
    "model": "235/70R16",
    "size": "235/70R16",
    "rimSize": 16,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/image7.jpeg",
    "stock": {
      "longs": 1
    }
  },
  {
    "id": "lng-13",
    "brand": "Quality Used Tire",
    "model": "205/45R17",
    "size": "205/45R17",
    "rimSize": 17,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/image25.jpeg",
    "stock": {
      "longs": 1
    }
  },
  {
    "id": "lng-14",
    "brand": "Quality Used Tire",
    "model": "205/55R17 Set",
    "size": "205/55R17",
    "rimSize": 17,
    "condition": "Like New (90%+ tread)",
    "price": 200,
    "image": "/tires/fountain/image55.jpeg",
    "stock": {
      "longs": 4
    }
  },
  {
    "id": "lng-15",
    "brand": "Quality Used Tire",
    "model": "215/45R17",
    "size": "215/45R17",
    "rimSize": 17,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/image36.jpeg",
    "stock": {
      "longs": 1
    }
  },
  {
    "id": "lng-16",
    "brand": "Quality Used Tire",
    "model": "215/50R17",
    "size": "215/50R17",
    "rimSize": 17,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/fountain/image71.jpeg",
    "stock": {
      "longs": 1
    }
  },
  {
    "id": "lng-17",
    "brand": "Quality Used Tire",
    "model": "215/55R17",
    "size": "215/55R17",
    "rimSize": 17,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/image7.jpeg",
    "stock": {
      "longs": 5
    }
  },
  {
    "id": "lng-18",
    "brand": "Quality Used Tire",
    "model": "215/65R17 Pair",
    "size": "215/65R17",
    "rimSize": 17,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/image4.jpeg",
    "stock": {
      "longs": 2
    }
  },
  {
    "id": "lng-19",
    "brand": "Quality Used Tire",
    "model": "225/45R17",
    "size": "225/45R17",
    "rimSize": 17,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/fountain/image5.jpeg",
    "stock": {
      "longs": 1
    }
  },
  {
    "id": "lng-20",
    "brand": "Quality Used Tire",
    "model": "225/65R17",
    "size": "225/65R17",
    "rimSize": 17,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/fountain/image1.jpeg",
    "stock": {
      "longs": 7
    }
  },
  {
    "id": "lng-21",
    "brand": "Quality Used Tire",
    "model": "235/65R17",
    "size": "235/65R17",
    "rimSize": 17,
    "condition": "Good (70%+ tread)",
    "price": 40,
    "image": "/tires/image15.jpeg",
    "stock": {
      "longs": 1
    }
  },
  {
    "id": "lng-22",
    "brand": "Quality Used Tire",
    "model": "255/75R17 (2 Sets)",
    "size": "255/75R17",
    "rimSize": 17,
    "condition": "Good (70%+ tread)",
    "price": 50,
    "image": "/tires/fountain/image74.jpeg",
    "stock": {
      "longs": 8
    }
  },
  {
    "id": "lng-23",
    "brand": "Quality Used Tire",
    "model": "225/40R18",
    "size": "225/40R18",
    "rimSize": 18,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/image22.jpeg",
    "stock": {
      "longs": 1
    }
  },
  {
    "id": "lng-24",
    "brand": "Quality Used Tire",
    "model": "225/45R18 Pair",
    "size": "225/45R18",
    "rimSize": 18,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/fountain/image30.jpeg",
    "stock": {
      "longs": 2
    }
  },
  {
    "id": "lng-25",
    "brand": "Quality Used Tire",
    "model": "225/50R18 Set",
    "size": "225/50R18",
    "rimSize": 18,
    "condition": "Like New (90%+ tread)",
    "price": 200,
    "image": "/tires/image74.jpeg",
    "stock": {
      "longs": 4
    }
  },
  {
    "id": "lng-26",
    "brand": "Quality Used Tire",
    "model": "225/55R18 Set",
    "size": "225/55R18",
    "rimSize": 18,
    "condition": "Like New (90%+ tread)",
    "price": 200,
    "image": "/tires/fountain/image71.jpeg",
    "stock": {
      "longs": 4
    }
  },
  {
    "id": "lng-27",
    "brand": "Quality Used Tire",
    "model": "235/40R18",
    "size": "235/40R18",
    "rimSize": 18,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/image20.jpeg",
    "stock": {
      "longs": 1
    }
  },
  {
    "id": "lng-28",
    "brand": "Quality Used Tire",
    "model": "235/45R18 Pair",
    "size": "235/45R18",
    "rimSize": 18,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/fountain/image34.jpeg",
    "stock": {
      "longs": 2
    }
  },
  {
    "id": "lng-29",
    "brand": "Quality Used Tire",
    "model": "235/50R18",
    "size": "235/50R18",
    "rimSize": 18,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/fountain/image31.jpeg",
    "stock": {
      "longs": 1
    }
  },
  {
    "id": "lng-30",
    "brand": "Quality Used Tire",
    "model": "235/60R18 Set + Single",
    "size": "235/60R18",
    "rimSize": 18,
    "condition": "Good (70%+ tread)",
    "price": 40,
    "image": "/tires/fountain/image75.jpeg",
    "stock": {
      "longs": 5
    }
  },
  {
    "id": "lng-31",
    "brand": "Quality Used Tire",
    "model": "235/65R18 Set",
    "size": "235/65R18",
    "rimSize": 18,
    "condition": "Good (70%+ tread)",
    "price": 50,
    "image": "/tires/image22.jpeg",
    "stock": {
      "longs": 4
    }
  },
  {
    "id": "lng-32",
    "brand": "Quality Used Tire",
    "model": "245/35R18 Set",
    "size": "245/35R18",
    "rimSize": 18,
    "condition": "Like New (90%+ tread)",
    "price": 60,
    "image": "/tires/fountain/image3.jpeg",
    "stock": {
      "longs": 5
    }
  },
  {
    "id": "lng-33",
    "brand": "Quality Used Tire",
    "model": "245/45R18",
    "size": "245/45R18",
    "rimSize": 18,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/image48.jpeg",
    "stock": {
      "longs": 1
    }
  },
  {
    "id": "lng-34",
    "brand": "Quality Used Tire",
    "model": "255/60R18 Pair",
    "size": "255/60R18",
    "rimSize": 18,
    "condition": "Good (70%+ tread)",
    "price": 40,
    "image": "/tires/fountain/image9.jpeg",
    "stock": {
      "longs": 2
    }
  },
  {
    "id": "lng-35",
    "brand": "Quality Used Tire",
    "model": "265/60R18 Pair",
    "size": "265/60R18",
    "rimSize": 18,
    "condition": "Good (70%+ tread)",
    "price": 50,
    "image": "/tires/image48.jpeg",
    "stock": {
      "longs": 2
    }
  },
  {
    "id": "lng-36",
    "brand": "Quality Used Tire",
    "model": "275/65R18",
    "size": "275/65R18",
    "rimSize": 18,
    "condition": "Good (70%+ tread)",
    "price": 50,
    "image": "/tires/image2.jpeg",
    "stock": {
      "longs": 6
    }
  },
  {
    "id": "lng-37",
    "brand": "Quality Used Tire",
    "model": "275/70R18",
    "size": "275/70R18",
    "rimSize": 18,
    "condition": "Good (70%+ tread)",
    "price": 125,
    "image": "/tires/fountain/image32.jpeg",
    "stock": {
      "longs": 6
    }
  },
  {
    "id": "lng-38",
    "brand": "Quality Used Tire",
    "model": "225/55R19 Set",
    "size": "225/55R19",
    "rimSize": 19,
    "condition": "Good (70%+ tread)",
    "price": 50,
    "image": "/tires/image5.jpeg",
    "stock": {
      "longs": 4
    }
  },
  {
    "id": "lng-39",
    "brand": "Quality Used Tire",
    "model": "235/55R19",
    "size": "235/55R19",
    "rimSize": 19,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/image74.jpeg",
    "stock": {
      "longs": 5
    }
  },
  {
    "id": "lng-40",
    "brand": "Quality Used Tire",
    "model": "235/60R19 Set",
    "size": "235/60R19",
    "rimSize": 19,
    "condition": "Like New (90%+ tread)",
    "price": 450,
    "image": "/tires/image41.jpeg",
    "stock": {
      "longs": 4
    }
  },
  {
    "id": "lng-41",
    "brand": "Quality Used Tire",
    "model": "245/45R19",
    "size": "245/45R19",
    "rimSize": 19,
    "condition": "Good (70%+ tread)",
    "price": 55,
    "image": "/tires/image10.jpeg",
    "stock": {
      "longs": 3
    }
  },
  {
    "id": "lng-42",
    "brand": "Quality Used Tire",
    "model": "245/50R19 Set",
    "size": "245/50R19",
    "rimSize": 19,
    "condition": "Like New (90%+ tread)",
    "price": 450,
    "image": "/tires/image2.jpeg",
    "stock": {
      "longs": 5
    }
  },
  {
    "id": "lng-43",
    "brand": "Quality Used Tire",
    "model": "255/45R19",
    "size": "255/45R19",
    "rimSize": 19,
    "condition": "Good (70%+ tread)",
    "price": 50,
    "image": "/tires/fountain/image35.jpeg",
    "stock": {
      "longs": 7
    }
  },
  {
    "id": "lng-44",
    "brand": "Quality Used Tire",
    "model": "235/55R20 Set",
    "size": "235/55R20",
    "rimSize": 20,
    "condition": "Good (70%+ tread)",
    "price": 50,
    "image": "/tires/image1 (1).jpeg",
    "stock": {
      "longs": 4
    }
  },
  {
    "id": "lng-45",
    "brand": "Quality Used Tire",
    "model": "245/45R20",
    "size": "245/45R20",
    "rimSize": 20,
    "condition": "Good (70%+ tread)",
    "price": 50,
    "image": "/tires/image1 (1).jpeg",
    "stock": {
      "longs": 0
    }
  },
  {
    "id": "lng-46",
    "brand": "Quality Used Tire",
    "model": "245/50R20",
    "size": "245/50R20",
    "rimSize": 20,
    "condition": "Good (70%+ tread)",
    "price": 50,
    "image": "/tires/image8.jpeg",
    "stock": {
      "longs": 3
    }
  },
  {
    "id": "lng-47",
    "brand": "Quality Used Tire",
    "model": "255/45R20",
    "size": "255/45R20",
    "rimSize": 20,
    "condition": "Good (70%+ tread)",
    "price": 50,
    "image": "/tires/image23.jpeg",
    "stock": {
      "longs": 3
    }
  },
  {
    "id": "lng-48",
    "brand": "Quality Used Tire",
    "model": "255/60R20 Set",
    "size": "255/60R20",
    "rimSize": 20,
    "condition": "Like New (90%+ tread)",
    "price": 200,
    "image": "/tires/fountain/image16.jpeg",
    "stock": {
      "longs": 4
    }
  },
  {
    "id": "lng-49",
    "brand": "Quality Used Tire",
    "model": "265/50R20",
    "size": "265/50R20",
    "rimSize": 20,
    "condition": "Good (70%+ tread)",
    "price": 40,
    "image": "/tires/fountain/image9.jpeg",
    "stock": {
      "longs": 7
    }
  },
  {
    "id": "lng-50",
    "brand": "Quality Used Tire",
    "model": "265/60R20",
    "size": "265/60R20",
    "rimSize": 20,
    "condition": "Good (70%+ tread)",
    "price": 50,
    "image": "/tires/image30.jpeg",
    "stock": {
      "longs": 8
    }
  },
  {
    "id": "lng-51",
    "brand": "Quality Used Tire",
    "model": "275/55R20",
    "size": "275/55R20",
    "rimSize": 20,
    "condition": "Good (70%+ tread)",
    "price": 45,
    "image": "/tires/image11.jpeg",
    "stock": {
      "longs": 11
    }
  },
  {
    "id": "lng-52",
    "brand": "Quality Used Tire",
    "model": "275/60R20",
    "size": "275/60R20",
    "rimSize": 20,
    "condition": "Good (70%+ tread)",
    "price": 50,
    "image": "/tires/fountain/image23.jpeg",
    "stock": {
      "longs": 6
    }
  },
  {
    "id": "lng-53",
    "brand": "Quality Used Tire",
    "model": "275/65R20 Set",
    "size": "275/65R20",
    "rimSize": 20,
    "condition": "Like New (90%+ tread)",
    "price": 250,
    "image": "/tires/image1.jpeg",
    "stock": {
      "longs": 10
    }
  },
  {
    "id": "lng-54",
    "brand": "Quality Used Tire",
    "model": "285/60R20 Pair",
    "size": "285/60R20",
    "rimSize": 20,
    "condition": "Good (70%+ tread)",
    "price": 65,
    "image": "/tires/fountain/image18.jpeg",
    "stock": {
      "longs": 2
    }
  },
  {
    "id": "lng-55",
    "brand": "Quality Used Tire",
    "model": "285/65R20 Set",
    "size": "285/65R20",
    "rimSize": 20,
    "condition": "Like New (90%+ tread)",
    "price": 250,
    "image": "/tires/fountain/image18.jpeg",
    "stock": {
      "longs": 4
    }
  },
  {
    "id": "lng-56",
    "brand": "Quality Used Tire",
    "model": "295/55R20 Set",
    "size": "295/55R20",
    "rimSize": 20,
    "condition": "Like New (90%+ tread)",
    "price": 450,
    "image": "/tires/image6 (1).jpeg",
    "stock": {
      "longs": 4
    }
  },
  {
    "id": "lng-57",
    "brand": "Quality Used Tire",
    "model": "35x12.50R20 Single",
    "size": "35x12.50R20",
    "rimSize": 20,
    "condition": "Good (70%+ tread)",
    "price": 50,
    "image": "/tires/fountain/image21.jpeg",
    "stock": {
      "longs": 1
    }
  },
  {
    "id": "lng-58",
    "brand": "Quality Used Tire",
    "model": "275/45R21 Set",
    "size": "275/45R21",
    "rimSize": 21,
    "condition": "Like New (90%+ tread)",
    "price": 450,
    "image": "/tires/image6.jpeg",
    "stock": {
      "longs": 4
    }
  },
  {
    "id": "lng-59",
    "brand": "Quality Used Tire",
    "model": "285/45R22",
    "size": "285/45R22",
    "rimSize": 22,
    "condition": "Good (70%+ tread)",
    "price": 50,
    "image": "/tires/image10.jpeg",
    "stock": {
      "longs": 3
    }
  }
];
