import I1 from '../assets/I1.jpeg';
import I2 from '../assets/I2.jpeg';
import I3 from '../assets/I3.jpeg';
import I4 from '../assets/I4.jpeg';
import I5 from '../assets/I5.jpeg';
import I7 from '../assets/I7.jpg';
import I6 from '../assets/I6.jpg';

import C1 from '../assets/C1.jpeg';
import C2 from '../assets/C2.jpeg';
import C3 from '../assets/C3.jpeg';
import C4 from '../assets/C4.jpeg';
import C5 from '../assets/C5.jpeg';
import D1 from '../assets/D1.jpeg';
import D2 from '../assets/D2.jpeg';
import D3 from '../assets/D3.jpeg';
import D5 from '../assets/D5.jpeg';

export const menuData = {
  canvas: [
    { 
      id: 201, 
      name: "The Glazed Masterpiece", 
      price: 450, // Converted to Rs.
      desc: "A classic donut reimagined with a gold-leaf honey glaze.", 
      image: D1, 
    },
    { 
      id: 202, 
      name: "Confetti Symphony", 
      price: 480, // Converted to Rs.
      desc: "Multi-colored sprinkles harmonized with vanilla frosting.", 
      image: D2,
    },
    { 
      id: 203, 
      name: "Velvet Night", 
      price: 520, // Converted to Rs.
      desc: "Dark chocolate ganache finished with a silver dusting.", 
      image: D3,
    }
  ],

  palettes: [
    { 
      id: 301, 
      name: "The Founder’s Palette", 
      price: 850, // Converted to Rs.
      desc: "Four mini-scoops hand-picked by Awais Ijaz.", 
      image: "https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?w=400" 
    },
    { 
      id: 302, 
      name: "Contrast Study", 
      price: 600, // Converted to Rs.
      desc: "Bitter dark chocolate paired with sweet Madagascar vanilla.", 
      image: D5,
    }
  ],

  iceCream: [
    { id: 1, name: "Chocolate Velvet", price: 550, image: I1, desc: "A smooth, deep cocoa texture for the serious purist." },
    { id: 2, name: "Vanilla Bean", price: 400, image: I2, desc: "Pure aromatic beans blended into a creamy white canvas." },
    { id: 3, name: "Strawberry Bliss", price: 500, image: I3, desc: "Fresh garden harvests turned into a vibrant pink swirl." },
    { id: 4, name: "Mint Choco Chip", price: 550, image: I4, desc: "Cooling mentha profiles accented by dark chocolate shards." },
    { id: 5, name: "Pistachio Dream", price: 650, image: I5, desc: "Earthy nut tones meets a rich, buttery finish." },
    { id: 6, name: "Mango Tango", price: 550, image: I6, desc: "A tropical explosion of Pakistani sun-ripened mangoes." },
    { id: 7, name: "Dark Chocolate", price: 650, image: I7, desc: "A rich, indulgent treat for dark chocolate lovers." },
  ],

  coffee: [
    { id: 101, name: "Classic Cold Brew", price: 450, image: C1, desc: "24-hour steeped brew for a smooth, low-acid experience." },
    { id: 102, name: "Caramel Frappe", price: 600, image: C2, desc: "A frozen masterpiece drizzled with golden caramel streaks." },
    { id: 103, name: "Oreo Coffee Shake", price: 750, image: C3, desc: "A textured blend of dark cookies and bold espresso." },
    { id: 104, name: "Iced Vanilla Latte", price: 550, image: C4, desc: "Elegant layers of milk and coffee harmonized with vanilla." },
    { id: 105, name: "Espresso Tonic", price: 500, image: C5, desc: "A sharp, bubbly contrast of bitter and citrus notes." },
    { id: 106, name: "Hazelnut Mocha", price: 650, image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400" }
  ]
};