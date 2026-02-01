# EventFlow — Event Ticketing Platform
### Complete Production-Grade React + Vite + Tailwind v4 Application

---

## 1. Folder Structure

```
eventflow-ticketing/
├── .env
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── data/
    │   └── events.js
    ├── context/
    │   ├── AuthContext.jsx
    │   ├── CartContext.jsx
    │   └── ToastContext.jsx
    ├── hooks/
    │   ├── useLocalStorage.js
    │   ├── useDebounce.js
    │   └── useAnalytics.js
    ├── utils/
    │   ├── currency.js
    │   ├── validation.js
    │   ├── filters.js
    │   └── stripe.js
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── Skeleton.jsx
    │   ├── Breadcrumb.jsx
    │   ├── StarRating.jsx
    │   ├── ProtectedRoute.jsx
    │   ├── EventCard.jsx
    │   ├── FilterSidebar.jsx
    │   ├── CartDrawer.jsx
    │   └── CompareModal.jsx
    └── pages/
        ├── Home.jsx
        ├── Listing.jsx
        ├── Detail.jsx
        ├── Cart.jsx
        ├── Checkout.jsx
        ├── Login.jsx
        ├── Signup.jsx
        ├── Account.jsx
        └── NotFound.jsx
```

---

## 2. All Files — Full Code


---

### `package.json`

```json
{
  "name": "eventflow-ticketing",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.25.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.0.0",
    "@vitejs/plugin-react": "^4.3.4",
    "tailwindcss": "^4.0.0",
    "vite": "^6.0.0"
  }
}

```

---

### `vite.config.js`

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})

```

---

### `.env`

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51example_YOUR_KEY_HERE

```

---

### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>EventFlow — Live Event Tickets</title>
  <meta name="description" content="Discover and book tickets for the best live events near you. Concerts, comedy, workshops, sports, and theatre." />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>

```

---

### `src/index.css`

```css
@import "tailwindcss";

@theme {
  --font-family-display: 'Playfair Display', Georgia, serif;
  --font-family-body: 'DM Sans', system-ui, sans-serif;
  --color-brand-50: #f0fdf4;
  --color-brand-100: #dcfce7;
  --color-brand-200: #bbf7d0;
  --color-brand-300: #86efac;
  --color-brand-400: #4ade80;
  --color-brand-500: #22c55e;
  --color-brand-600: #16a34a;
  --color-brand-700: #15803d;
  --color-brand-800: #166534;
  --color-brand-900: #14532d;
  --color-accent-50: #fef3c7;
  --color-accent-100: #fde68a;
  --color-accent-200: #fbbf24;
  --color-accent-500: #f59e0b;
  --color-accent-600: #d97706;
  --color-slate-950: #0f172a;
  --color-slate-900: #1e293b;
  --color-slate-800: #334155;
  --color-slate-700: #475569;
  --color-slate-600: #64748b;
  --color-slate-500: #94a3b8;
  --color-slate-400: #cbd5e1;
  --color-slate-300: #e2e8f0;
  --color-slate-200: #f1f5f9;
  --color-slate-100: #f8fafc;
}

@layer base {
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: var(--font-family-body);
    background-color: var(--color-slate-950);
    color: #f1f5f9;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3 {
    font-family: var(--font-family-display);
    line-height: 1.2;
  }

  input:focus, button:focus, a:focus {
    outline: 2px solid var(--color-brand-400);
    outline-offset: 2px;
  }

  ::placeholder {
    color: var(--color-slate-500);
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: var(--color-slate-900);
  }
  ::-webkit-scrollbar-thumb {
    background: var(--color-slate-700);
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-slate-600);
  }

  /* Toast animation */
  @keyframes toast-in {
    from { transform: translateX(110%); opacity: 0; }
    to   { transform: translateX(0);    opacity: 1; }
  }
  @keyframes toast-out {
    from { transform: translateX(0);    opacity: 1; }
    to   { transform: translateX(110%); opacity: 0; }
  }
  .toast-enter {
    animation: toast-in 0.32s cubic-bezier(.22,.68,0,1.2) forwards;
  }
  .toast-exit {
    animation: toast-out 0.28s ease-in forwards;
  }

  /* Skeleton pulse */
  @keyframes skeleton-pulse {
    0%, 100% { opacity: 0.4; }
    50%      { opacity: 0.7; }
  }
  .skeleton-pulse {
    animation: skeleton-pulse 1.5s ease-in-out infinite;
  }

  /* Fade-in utility */
  @keyframes fade-up {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-up {
    animation: fade-up 0.5s cubic-bezier(.22,.68,0,1.2) both;
  }

  /* Modal backdrop */
  @keyframes backdrop-in {
    from { background: rgba(0,0,0,0); }
    to   { background: rgba(0,0,0,0.6); }
  }
  .backdrop-animate {
    animation: backdrop-in 0.25s ease forwards;
  }

  /* Accordion slide */
  @keyframes slide-down {
    from { max-height: 0; opacity: 0; }
    to   { max-height: 500px; opacity: 1; }
  }
  @keyframes slide-up {
    from { max-height: 500px; opacity: 1; }
    to   { max-height: 0; opacity: 0; }
  }
  .slide-down { animation: slide-down 0.3s ease forwards; }
  .slide-up   { animation: slide-up 0.3s ease forwards; }
}

```

---

### `src/main.jsx`

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

```

---

### `src/App.jsx`

```jsx
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastProvider } from './context/ToastContext'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import ProtectedRoute from './components/ProtectedRoute'

// Pages (lazy-style but direct imports for simplicity)
import Home from './pages/Home'
import Listing from './pages/Listing'
import Detail from './pages/Detail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Account from './pages/Account'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen bg-slate-950 flex flex-col">
              <Navbar />
              <CartDrawer />

              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/events" element={<Listing />} />
                  <Route path="/events/:id" element={<Detail />} />
                  <Route path="/cart" element={<Cart />} />

                  <Route
                    path="/checkout"
                    element={
                      <ProtectedRoute>
                        <Checkout />
                      </ProtectedRoute>
                    }
                  />

                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />

                  <Route
                    path="/account"
                    element={
                      <ProtectedRoute>
                        <Account />
                      </ProtectedRoute>
                    }
                  />

                  <Route path="/404" element={<NotFound />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>

              <Footer />
            </div>
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}

```

---

### `src/data/events.js`

```javascript
// Stable, seeded availability per item (simulates stock)
function seedAvailability(id) {
  const seeds = {1:42,2:8,3:156,4:3,5:0,6:91,7:27,8:5,9:180,10:1,11:67,12:44,13:0,14:12,15:200,16:33,17:78,18:2,19:110,20:55};
  return seeds[id] ?? 50;
}

export const EVENTS = [
  {
    id: 1,
    title: "Midnight Jazz at The Blue Room",
    category: "concert",
    price: 65.00,
    rating: 4.7,
    reviewCount: 248,
    date: "2026-02-22",
    time: "20:00",
    venue: "The Blue Room Jazz Club",
    city: "New York, NY",
    images: [
      "https://images.unsplash.com/photo-1519653375881-451648caa38e?w=600&q=80",
      "https://images.unsplash.com/photo-1504760917173-59a1615e20cc?w=600&q=80",
      "https://images.unsplash.com/photo-1511735804275-7db35cfcee8d?w=600&q=80",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80"
    ],
    description: "An intimate evening of smooth jazz performed by the legendary Marcus Webb Quartet. Featuring improvisational sets, cocktails, and an atmosphere that transports you to the golden age of jazz. All ages welcome; 21+ bar area available.",
    tags: ["jazz", "live-music", "intimate", "21+"],
    popularityScore: 92,
    createdAt: "2025-12-01T10:00:00Z",
    availabilityCount: seedAvailability(1),
    zones: [
      { name: "VIP Front", price: 120, available: 12 },
      { name: "Main Floor", price: 65, available: 30 },
      { name: "Balcony", price: 38, available: 18 }
    ],
    reviews: [
      { id: 1, author: "Sarah M.", rating: 5, text: "Absolutely magical evening. The quartet was incredible.", date: "2025-11-15" },
      { id: 2, author: "James R.", rating: 4, text: "Great atmosphere. A bit crowded near the bar though.", date: "2025-11-02" },
      { id: 3, author: "Linda K.", rating: 5, text: "Will definitely come back. Pure bliss.", date: "2025-10-28" }
    ],
    faqs: [
      { q: "Is parking available?", a: "Yes, complimentary valet parking is available for ticket holders." },
      { q: "Can I bring my own drinks?", a: "No, only beverages purchased at the venue are permitted." },
      { q: "Is the event wheelchair accessible?", a: "Yes, the main floor and balcony are fully accessible." }
    ]
  },
  {
    id: 2,
    title: "Stand-Up Comedy Night: The Laughing Decade",
    category: "comedy",
    price: 35.00,
    rating: 4.5,
    reviewCount: 182,
    date: "2026-02-15",
    time: "19:30",
    venue: "Ha! Comedy House",
    city: "Chicago, IL",
    images: [
      "https://images.unsplash.com/photo-1609454803869-eb3f82394e4d?w=600&q=80",
      "https://images.unsplash.com/photo-1555140578-1cdd25256d5c?w=600&q=80",
      "https://images.unsplash.com/photo-1514306191588-3a2cb1b715e6?w=600&q=80"
    ],
    description: "Five of Chicago's hottest stand-up comedians deliver a night of unfiltered humor. From sharp social commentary to absurdist storytelling, The Laughing Decade promises 90 minutes of non-stop laughs. Drink specials all night.",
    tags: ["comedy", "stand-up", "fun", "drinks"],
    popularityScore: 78,
    createdAt: "2025-11-20T09:00:00Z",
    availabilityCount: seedAvailability(2),
    zones: [
      { name: "Front Row", price: 55, available: 3 },
      { name: "Standard", price: 35, available: 5 },
      { name: "Back Section", price: 25, available: 0 }
    ],
    reviews: [
      { id: 1, author: "Tom B.", rating: 5, text: "Had tears streaming down my face from laughing!", date: "2025-10-22" },
      { id: 2, author: "Priya S.", rating: 4, text: "Really solid lineup. One comedian was average but the rest killed it.", date: "2025-10-10" }
    ],
    faqs: [
      { q: "Is this show appropriate for all ages?", a: "This show contains mature humor. Recommended for ages 18+." },
      { q: "Can I request specific comedians?", a: "No, the lineup is set by the venue. Check socials for updates." }
    ]
  },
  {
    id: 3,
    title: "Full-Stack Web Development Workshop",
    category: "workshop",
    price: 149.00,
    rating: 4.9,
    reviewCount: 67,
    date: "2026-03-05",
    time: "09:00",
    venue: "CodeCraft Innovation Lab",
    city: "San Francisco, CA",
    images: [
      "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=600&q=80",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80"
    ],
    description: "A hands-on 8-hour workshop covering React, Node.js, PostgreSQL, and deployment on AWS. Led by industry veterans with 15+ years combined experience. Includes lunch, materials, and a take-home project starter kit. Limited to 30 participants for personalized mentoring.",
    tags: ["tech", "workshop", "coding", "react", "node"],
    popularityScore: 88,
    createdAt: "2025-12-10T08:00:00Z",
    availabilityCount: seedAvailability(3),
    zones: [
      { name: "Standard Seat", price: 149, available: 156 }
    ],
    reviews: [
      { id: 1, author: "Alex T.", rating: 5, text: "Best workshop I've attended. Very hands-on and practical.", date: "2025-11-18" },
      { id: 2, author: "Monica L.", rating: 5, text: "The instructors were extremely helpful and knowledgeable.", date: "2025-11-05" },
      { id: 3, author: "Raj P.", rating: 4, text: "Great content. Wish it was 2 days instead of 1.", date: "2025-10-30" }
    ],
    faqs: [
      { q: "Do I need prior coding experience?", a: "Basic HTML/CSS knowledge is recommended. JavaScript fundamentals are a plus." },
      { q: "What equipment do I need?", a: "Bring a laptop with Node.js installed. We'll provide everything else." },
      { q: "Is lunch included?", a: "Yes, lunch and two coffee breaks are included in the ticket price." }
    ]
  },
  {
    id: 4,
    title: "NBA Playoffs: Warriors vs Lakers",
    category: "sports",
    price: 280.00,
    rating: 4.8,
    reviewCount: 512,
    date: "2026-02-10",
    time: "19:00",
    venue: "Chase Center",
    city: "San Francisco, CA",
    images: [
      "https://images.unsplash.com/photo-1505386981289-e6904c76fd2b?w=600&q=80",
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80",
      "https://images.unsplash.com/photo-1518382163668-9ea8d808c838?w=600&q=80"
    ],
    description: "Experience the electric atmosphere of a playoff showdown between two NBA legends. Game 3 of the Western Conference Semi-Finals. Chase Center will be rocking from tip-off to final buzzer. VIP packages include courtside seating and player meet & greet.",
    tags: ["nba", "basketball", "playoffs", "live-sports"],
    popularityScore: 97,
    createdAt: "2025-11-01T12:00:00Z",
    availabilityCount: seedAvailability(4),
    zones: [
      { name: "Courtside VIP", price: 1200, available: 1 },
      { name: "Lower Bowl", price: 480, available: 2 },
      { name: "Mid Section", price: 280, available: 1 },
      { name: "Upper Deck", price: 150, available: 0 }
    ],
    reviews: [
      { id: 1, author: "Chris D.", rating: 5, text: "Nothing beats a live NBA playoff game. Absolute electric energy.", date: "2025-10-12" },
      { id: 2, author: "Wendy H.", rating: 5, text: "First time at Chase Center — it's stunning.", date: "2025-09-30" },
      { id: 3, author: "Mark J.", rating: 4, text: "Great seats. Parking was a nightmare though.", date: "2025-09-22" }
    ],
    faqs: [
      { q: "Can I bring outside food?", a: "No, outside food and beverages are not permitted." },
      { q: "Is alcohol available?", a: "Yes, alcohol is available at designated vendor locations." },
      { q: "What is the refund policy?", a: "Tickets are non-refundable but can be transferred to another person." }
    ]
  },
  {
    id: 5,
    title: "A Midsummer Night's Dream — Live Theatre",
    category: "theatre",
    price: 78.00,
    rating: 4.6,
    reviewCount: 134,
    date: "2026-02-28",
    time: "19:30",
    venue: "Broadway Globe Theatre",
    city: "New York, NY",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80",
      "https://images.unsplash.com/photo-1504760917173-59a1615e20cc?w=600&q=80"
    ],
    description: "Shakespeare's beloved comedy reimagined for the modern stage. A stunning production featuring over 40 cast members, elaborate costumes, and breathtaking set design. The fairy kingdom comes alive under enchanted lighting. A family-friendly magical experience for all ages.",
    tags: ["shakespeare", "theatre", "family", "classic"],
    popularityScore: 71,
    createdAt: "2025-12-15T11:00:00Z",
    availabilityCount: seedAvailability(5),
    zones: [
      { name: "Orchestra", price: 120, available: 0 },
      { name: "Mezzanine", price: 78, available: 0 },
      { name: "Balcony", price: 48, available: 0 }
    ],
    reviews: [
      { id: 1, author: "Elena W.", rating: 5, text: "A stunning interpretation. The fairy scenes were magical.", date: "2025-11-20" },
      { id: 2, author: "Robert F.", rating: 4, text: "Beautiful production. Could use some pacing improvements in Act 2.", date: "2025-11-08" }
    ],
    faqs: [
      { q: "Is there an intermission?", a: "Yes, there is a 20-minute intermission between Act 2 and Act 3." },
      { q: "Are children allowed?", a: "Yes, this production is suitable for ages 6 and up." }
    ]
  },
  {
    id: 6,
    title: "Electronic Music Festival: Neon Nights",
    category: "concert",
    price: 95.00,
    rating: 4.4,
    reviewCount: 389,
    date: "2026-03-14",
    time: "18:00",
    venue: "Warehouse 23",
    city: "Los Angeles, CA",
    images: [
      "https://images.unsplash.com/photo-1505998731978-1cb82ae73191?w=600&q=80",
      "https://images.unsplash.com/photo-1514306191588-3a2cb1b715e6?w=600&q=80",
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80"
    ],
    description: "Five stages, 12 DJs, and 6 hours of pure electronic music mayhem. Neon Nights transforms Warehouse 23 into an immersive audiovisual experience with cutting-edge light installations, fog machines, and bass you can feel in your chest. VIP packages include exclusive artist meet & greets.",
    tags: ["edm", "electronic", "festival", "nightlife"],
    popularityScore: 85,
    createdAt: "2025-12-05T07:00:00Z",
    availabilityCount: seedAvailability(6),
    zones: [
      { name: "VIP Backstage", price: 250, available: 20 },
      { name: "General Admission", price: 95, available: 71 },
      { name: "Parking + Shuttle", price: 120, available: 45 }
    ],
    reviews: [
      { id: 1, author: "Nina G.", rating: 5, text: "INSANE event. The light show alone was worth the ticket.", date: "2025-11-25" },
      { id: 2, author: "Derek S.", rating: 4, text: "Sound quality was excellent. A bit too crowded in the main tent.", date: "2025-11-18" },
      { id: 3, author: "Aisha M.", rating: 4, text: "Fun night out. Would go again for sure.", date: "2025-11-01" }
    ],
    faqs: [
      { q: "What's the age restriction?", a: "This event is 18+ only. Valid ID required at entry." },
      { q: "Is re-entry allowed?", a: "Yes, re-entry is permitted with your wristband until 11 PM." },
      { q: "Are there food options?", a: "Yes, multiple food trucks will be stationed around the venue." }
    ]
  },
  {
    id: 7,
    title: "Pottery & Ceramics Making Class",
    category: "workshop",
    price: 72.00,
    rating: 4.8,
    reviewCount: 91,
    date: "2026-02-20",
    time: "14:00",
    venue: "The Clay Studio",
    city: "Portland, OR",
    images: [
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80",
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80"
    ],
    description: "Learn the ancient art of pottery in this 3-hour hands-on workshop. From centering clay on the wheel to glazing and firing, you'll create your own unique ceramic piece to take home. Perfect for beginners — no experience needed. Wine and cheese provided.",
    tags: ["art", "crafts", "pottery", "hands-on", "relaxing"],
    popularityScore: 74,
    createdAt: "2025-12-08T10:00:00Z",
    availabilityCount: seedAvailability(7),
    zones: [
      { name: "Standard", price: 72, available: 15 },
      { name: "Premium (2-on-1 tutoring)", price: 110, available: 12 }
    ],
    reviews: [
      { id: 1, author: "Sophie R.", rating: 5, text: "So relaxing and fun! My piece turned out gorgeous.", date: "2025-11-29" },
      { id: 2, author: "Kevin L.", rating: 5, text: "Instructor was patient and encouraging. Perfect for beginners.", date: "2025-11-15" },
      { id: 3, author: "Tina W.", rating: 4, text: "Great experience. Would have loved a longer session.", date: "2025-11-02" }
    ],
    faqs: [
      { q: "Do I need to wear special clothing?", a: "We recommend clothes you don't mind getting dirty. Aprons are provided." },
      { q: "When can I pick up my piece?", a: "Pieces are fired and ready for pickup within 5-7 business days." }
    ]
  },
  {
    id: 8,
    title: "UFC 310: Championship Night",
    category: "sports",
    price: 195.00,
    rating: 4.7,
    reviewCount: 456,
    date: "2026-02-08",
    time: "18:00",
    venue: "T-Mobile Arena",
    city: "Las Vegas, NV",
    images: [
      "https://images.unsplash.com/photo-1547936954-23ade7492c2b?w=600&q=80",
      "https://images.unsplash.com/photo-1530746020798-e6953c6e8e04?w=600&q=80",
      "https://images.unsplash.com/photo-1552427064-5aa29f681400?w=600&q=80"
    ],
    description: "The biggest night in MMA this quarter. The main event features the current heavyweight champion defending his title against the #1 contender. Five main card bouts including two title fights. Experience the raw energy of the octagon live.",
    tags: ["ufc", "mma", "fighting", "championship"],
    popularityScore: 94,
    createdAt: "2025-11-15T09:00:00Z",
    availabilityCount: seedAvailability(8),
    zones: [
      { name: "Ringside", price: 800, available: 2 },
      { name: "Lower Ring", price: 400, available: 3 },
      { name: "Mid Arena", price: 195, available: 0 },
      { name: "Upper Level", price: 95, available: 0 }
    ],
    reviews: [
      { id: 1, author: "Dave P.", rating: 5, text: "Incredible atmosphere. The main event was legendary.", date: "2025-10-28" },
      { id: 2, author: "Karen S.", rating: 4, text: "Ringside was worth every penny. Can feel the impact!", date: "2025-10-15" }
    ],
    faqs: [
      { q: "How long is the event?", a: "Main card events typically run 4-5 hours including the prelims." },
      { q: "Can I bring a sign?", a: "Small signs (under 12x12 inches) are permitted. No offensive content." }
    ]
  },
  {
    id: 9,
    title: "The Art of French Cooking — Master Class",
    category: "workshop",
    price: 185.00,
    rating: 4.9,
    reviewCount: 53,
    date: "2026-03-10",
    time: "11:00",
    venue: "Cuisine Atelier",
    city: "Chicago, IL",
    images: [
      "https://images.unsplash.com/photo-1556910114-f6357ad725d1?w=600&q=80",
      "https://images.unsplash.com/photo-1556911778-131617306cb9?w=600&q=80",
      "https://images.unsplash.com/photo-1504812313382-7ffbe38a3ea3?w=600&q=80"
    ],
    description: "Spend 6 hours mastering classic French techniques under the tutelage of Chef Marie Beaumont, a former Michelin-starred chef. Learn to make croissants from scratch, perfect a béchamel sauce, and prepare a 3-course French meal. All ingredients and wine pairings included.",
    tags: ["cooking", "french", "culinary", "gourmet", "chef"],
    popularityScore: 89,
    createdAt: "2025-12-20T08:00:00Z",
    availabilityCount: seedAvailability(9),
    zones: [
      { name: "Standard", price: 185, available: 180 }
    ],
    reviews: [
      { id: 1, author: "Isabelle C.", rating: 5, text: "Chef Marie is extraordinary. Totally changed how I cook.", date: "2025-12-01" },
      { id: 2, author: "Paul M.", rating: 5, text: "Worth every cent. The croissants alone justify the price.", date: "2025-11-22" }
    ],
    faqs: [
      { q: "What skill level is required?", a: "All levels welcome. Chef Marie adapts her teaching to the group." },
      { q: "Can I take leftovers home?", a: "Absolutely! Containers are provided for any food you make." }
    ]
  },
  {
    id: 10,
    title: "Broadway Revival: Phantom of the Opera",
    category: "theatre",
    price: 145.00,
    rating: 4.9,
    reviewCount: 721,
    date: "2026-02-18",
    time: "20:00",
    venue: "Her Majesty's Theatre",
    city: "New York, NY",
    images: [
      "https://images.unsplash.com/photo-1514306191588-3a2cb1b715e6?w=600&q=80",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80"
    ],
    description: "The legendary musical returns to Broadway in a stunning 4K-enhanced production. With over 1,400 performances, this is the definitive retelling of Andrew Lloyd Webber's masterpiece. Featuring a 25-piece orchestra and jaw-dropping chandelier sequence. A once-in-a-lifetime theatrical experience.",
    tags: ["musical", "broadway", "phantom", "iconic"],
    popularityScore: 96,
    createdAt: "2025-11-05T10:00:00Z",
    availabilityCount: seedAvailability(10),
    zones: [
      { name: "Premium Orchestra", price: 280, available: 0 },
      { name: "Orchestra", price: 145, available: 1 },
      { name: "Mezzanine", price: 95, available: 0 },
      { name: "Balcony", price: 65, available: 0 }
    ],
    reviews: [
      { id: 1, author: "Rachel W.", rating: 5, text: "Absolutely breathtaking. Cried through the entire second act.", date: "2025-12-05" },
      { id: 2, author: "Sam L.", rating: 5, text: "The chandelier drop had me jumping out of my seat!", date: "2025-11-28" },
      { id: 3, author: "Grace K.", rating: 5, text: "Saw it twice already. Perfection every time.", date: "2025-11-10" }
    ],
    faqs: [
      { q: "How long is the show?", a: "The show runs approximately 2 hours and 45 minutes with one intermission." },
      { q: "Is photography allowed?", a: "No flash photography or video recording is permitted during the performance." }
    ]
  },
  {
    id: 11,
    title: "Summer Blues & Brews Festival",
    category: "concert",
    price: 55.00,
    rating: 4.3,
    reviewCount: 201,
    date: "2026-03-20",
    time: "12:00",
    venue: "Riverside Park Amphitheater",
    city: "Austin, TX",
    images: [
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80",
      "https://images.unsplash.com/photo-1504760917173-59a1615e20cc?w=600&q=80",
      "https://images.unsplash.com/photo-1519653375881-451648caa38e?w=600&q=80"
    ],
    description: "A relaxed outdoor festival celebrating blues music and craft beer. Three stages, eight acts, and over 30 craft beers on tap. Food trucks, lawn games, and a family-friendly atmosphere. Perfect for a lazy Saturday in the sun. Rain date: March 27.",
    tags: ["blues", "beer", "outdoor", "festival", "family"],
    popularityScore: 67,
    createdAt: "2025-12-12T09:00:00Z",
    availabilityCount: seedAvailability(11),
    zones: [
      { name: "VIP Lounge", price: 110, available: 25 },
      { name: "General Admission", price: 55, available: 42 },
      { name: "Kids (Under 12)", price: 0, available: 100 }
    ],
    reviews: [
      { id: 1, author: "Olivia T.", rating: 4, text: "Great vibes. The beer selection was outstanding.", date: "2025-11-30" },
      { id: 2, author: "Ben S.", rating: 4, text: "Perfect way to spend a Saturday. Will return next year.", date: "2025-11-18" }
    ],
    faqs: [
      { q: "Is it pet-friendly?", a: "Yes! Dogs on a leash are welcome in the general admission area." },
      { q: "What's the rain policy?", a: "If cancelled due to weather, tickets transfer to the rain date automatically." }
    ]
  },
  {
    id: 12,
    title: "Late-Night Improv Comedy Marathon",
    category: "comedy",
    price: 28.00,
    rating: 4.2,
    reviewCount: 156,
    date: "2026-02-22",
    time: "22:00",
    venue: "The Improv Den",
    city: "Los Angeles, CA",
    images: [
      "https://images.unsplash.com/photo-1609454803869-eb3f82394e4d?w=600&q=80",
      "https://images.unsplash.com/photo-1555140578-1cdd25256d5c?w=600&q=80",
      "https://images.unsplash.com/photo-1514306191588-3a2cb1b715e6?w=600&q=80"
    ],
    description: "3 hours of non-stop improv comedy featuring audience participation. A rotating cast of 8 comedians will improvise scenes, games, and songs based entirely on your suggestions. No two shows are ever the same. Late-night cocktail specials available.",
    tags: ["improv", "comedy", "late-night", "audience-participation"],
    popularityScore: 58,
    createdAt: "2025-12-18T08:00:00Z",
    availabilityCount: seedAvailability(12),
    zones: [
      { name: "Stage Adjacent", price: 48, available: 18 },
      { name: "Standard", price: 28, available: 26 }
    ],
    reviews: [
      { id: 1, author: "Zoe P.", rating: 4, text: "Hilarious and unpredictable. Love that it's different every time.", date: "2025-12-01" },
      { id: 2, author: "Chris B.", rating: 4, text: "Great energy from the crowd and performers alike.", date: "2025-11-22" }
    ],
    faqs: [
      { q: "Do I have to participate?", a: "Participation is entirely voluntary. You can just sit back and watch!" },
      { q: "Is this show appropriate for teens?", a: "Content is PG-13 but may occasionally lean R. Parental discretion advised." }
    ]
  },
  {
    id: 13,
    title: "Tennis Grand Slam: Semi-Finals",
    category: "sports",
    price: 175.00,
    rating: 4.6,
    reviewCount: 298,
    date: "2026-02-12",
    time: "13:00",
    venue: "Arthur Ashe Stadium",
    city: "New York, NY",
    images: [
      "https://images.unsplash.com/photo-1552427064-5aa29f681400?w=600&q=80",
      "https://images.unsplash.com/photo-1530746020798-e6953c6e8e04?w=600&q=80",
      "https://images.unsplash.com/photo-1547936954-23ade7492c2b?w=600&q=80"
    ],
    description: "Watch the world's best tennis players battle for a spot in the Grand Slam finals. Two semi-final matches on the main court, featuring top-seeded players. Includes access to qualifying matches and the tennis village with food, merchandise, and player memorabilia.",
    tags: ["tennis", "grand-slam", "live-sports", "outdoor"],
    popularityScore: 82,
    createdAt: "2025-11-25T10:00:00Z",
    availabilityCount: seedAvailability(13),
    zones: [
      { name: "Court Boxes", price: 450, available: 0 },
      { name: "Premium Seats", price: 290, available: 0 },
      { name: "Standard", price: 175, available: 0 },
      { name: "Standing Room", price: 85, available: 0 }
    ],
    reviews: [
      { id: 1, author: "Anna K.", rating: 5, text: "Electric atmosphere. The crowd was incredible.", date: "2025-11-18" },
      { id: 2, author: "Luis M.", rating: 4, text: "Great view from the premium section. Food was overpriced though.", date: "2025-11-05" }
    ],
    faqs: [
      { q: "Can I move between courts?", a: "With General Admission, you can access all courts. Premium tickets are fixed-seat." },
      { q: "Is sunscreen provided?", a: "No, please bring your own sunscreen for outdoor courts." }
    ]
  },
  {
    id: 14,
    title: "Digital Art & AI Creative Workshop",
    category: "workshop",
    price: 95.00,
    rating: 4.7,
    reviewCount: 44,
    date: "2026-03-08",
    time: "10:00",
    venue: "Pixel Factory Studio",
    city: "San Francisco, CA",
    images: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
      "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=600&q=80",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80"
    ],
    description: "Explore the intersection of art and artificial intelligence. Learn to use generative AI tools to create stunning digital artwork, then refine your pieces using Photoshop and Illustrator. A blend of creative expression and cutting-edge technology. Portfolio-ready outputs guaranteed.",
    tags: ["art", "ai", "digital", "creative", "design"],
    popularityScore: 76,
    createdAt: "2025-12-22T09:00:00Z",
    availabilityCount: seedAvailability(14),
    zones: [
      { name: "Standard", price: 95, available: 8 },
      { name: "Premium (1-on-1 Coaching)", price: 175, available: 4 }
    ],
    reviews: [
      { id: 1, author: "Maya R.", rating: 5, text: "Mind-blowing workshop. Left with 10+ pieces I'm actually proud of.", date: "2025-12-10" },
      { id: 2, author: "Jake T.", rating: 4, text: "Fascinating blend of tech and creativity. Highly recommend.", date: "2025-12-02" }
    ],
    faqs: [
      { q: "Do I need design software experience?", a: "No experience needed. Everything is taught step by step." },
      { q: "Can I use my own laptop?", a: "Yes! Bring your laptop or use our provided studio machines." }
    ]
  },
  {
    id: 15,
    title: "Classical Symphony: Beethoven's 9th",
    category: "concert",
    price: 110.00,
    rating: 4.8,
    reviewCount: 445,
    date: "2026-03-01",
    time: "19:00",
    venue: "Carnegie Hall",
    city: "New York, NY",
    images: [
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80",
      "https://images.unsplash.com/photo-1504760917173-59a1615e20cc?w=600&q=80",
      "https://images.unsplash.com/photo-1519653375881-451648caa38e?w=600&q=80"
    ],
    description: "The New York Philharmonic performs Beethoven's monumental Ninth Symphony in full, complete with a 200-member choir for the legendary 'Ode to Joy' finale. A 90-minute masterclass in classical music at the world's most iconic concert hall. Pre-concert talk at 6:30 PM.",
    tags: ["classical", "symphony", "beethoven", "orchestral"],
    popularityScore: 91,
    createdAt: "2025-11-10T11:00:00Z",
    availabilityCount: seedAvailability(15),
    zones: [
      { name: "Orchestra Front", price: 220, available: 80 },
      { name: "Orchestra", price: 110, available: 120 },
      { name: "Balcony", price: 65, available: 0 }
    ],
    reviews: [
      { id: 1, author: "Diane M.", rating: 5, text: "A transcendent experience. The finale had the entire hall in tears.", date: "2025-12-08" },
      { id: 2, author: "William S.", rating: 5, text: "Carnegie Hall acoustics are unmatched. Absolute perfection.", date: "2025-11-30" },
      { id: 3, author: "Catherine B.", rating: 4, text: "Superb performance. Wish the pre-concert talk was longer.", date: "2025-11-20" }
    ],
    faqs: [
      { q: "What is the dress code?", a: "Smart casual to formal. Business casual is recommended." },
      { q: "Can I record the performance?", a: "Recording of any kind is strictly prohibited during the performance." }
    ]
  },
  {
    id: 16,
    title: "Yoga & Meditation Retreat — Morning Sun",
    category: "workshop",
    price: 58.00,
    rating: 4.6,
    reviewCount: 112,
    date: "2026-02-25",
    time: "06:30",
    venue: "Sunrise Wellness Center",
    city: "Portland, OR",
    images: [
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80",
      "https://images.unsplash.com/photo-1505386981289-e6904c76fd2b?w=600&q=80",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80"
    ],
    description: "Start your morning with a 3-hour sunrise yoga and meditation session surrounded by nature. Includes a vinyasa flow, guided mindfulness meditation, breathwork, and an organic breakfast. All skill levels welcome — modifications provided for every pose.",
    tags: ["yoga", "meditation", "wellness", "mindfulness", "sunrise"],
    popularityScore: 62,
    createdAt: "2025-12-25T07:00:00Z",
    availabilityCount: seedAvailability(16),
    zones: [
      { name: "Standard", price: 58, available: 20 },
      { name: "Premium (Private Instructor)", price: 120, available: 13 }
    ],
    reviews: [
      { id: 1, author: "Luna S.", rating: 5, text: "Exactly what I needed. Left feeling completely rejuvenated.", date: "2025-12-12" },
      { id: 2, author: "Eric N.", rating: 4, text: "Beautiful setting. The instructor was very calming and skilled.", date: "2025-12-05" }
    ],
    faqs: [
      { q: "Do I need to bring my own mat?", a: "Mats are provided, but you're welcome to bring your own." },
      { q: "Is breakfast included?", a: "Yes, an organic breakfast is included after the session." }
    ]
  },
  {
    id: 17,
    title: "Indie Rock Night: Three Bands, One Stage",
    category: "concert",
    price: 42.00,
    rating: 4.1,
    reviewCount: 98,
    date: "2026-03-07",
    time: "20:30",
    venue: "The Rusty Nail",
    city: "Nashville, TN",
    images: [
      "https://images.unsplash.com/photo-1519653375881-451648caa38e?w=600&q=80",
      "https://images.unsplash.com/photo-1504760917173-59a1615e20cc?w=600&q=80",
      "https://images.unsplash.com/photo-1511735804275-7db73cf518fd?w=600&q=80"
    ],
    description: "Three up-and-coming indie rock bands deliver an electric night of original music. Featuring the wildly popular local favourites The Dusty Chords, plus two touring acts from Austin and Portland. Intimate venue, amazing sound, and cold beers on tap.",
    tags: ["indie", "rock", "live-music", "nashville", "local"],
    popularityScore: 55,
    createdAt: "2025-12-30T10:00:00Z",
    availabilityCount: seedAvailability(17),
    zones: [
      { name: "Stage Front", price: 65, available: 40 },
      { name: "General", price: 42, available: 38 }
    ],
    reviews: [
      { id: 1, author: "Tessa J.", rating: 4, text: "Great energy! The Dusty Chords were phenomenal.", date: "2025-12-20" },
      { id: 2, author: "Max R.", rating: 4, text: "Solid night of music. Intimate venue makes it feel special.", date: "2025-12-15" }
    ],
    faqs: [
      { q: "Is this a standing or seated show?", a: "This is a standing show. Limited seating is available at the bar." },
      { q: "Can I meet the bands?", a: "Artists often hang out after the show. No guarantees but worth sticking around!" }
    ]
  },
  {
    id: 18,
    title: "Formula 1 Weekend: Austin Grand Prix",
    category: "sports",
    price: 320.00,
    rating: 4.5,
    reviewCount: 567,
    date: "2026-03-15",
    time: "14:00",
    venue: "Circuit of the Americas",
    city: "Austin, TX",
    images: [
      "https://images.unsplash.com/photo-1547936954-23ade7492c2b?w=600&q=80",
      "https://images.unsplash.com/photo-1530746020798-e6953c6e8e04?w=600&q=80",
      "https://images.unsplash.com/photo-1552427064-5aa29f681400?w=600&q=80"
    ],
    description: "Witness the pinnacle of motorsport at the Circuit of the Americas. Full race weekend experience: practice, qualifying, and the Sunday race. Includes a pit lane walk on Saturday morning and access to the fan zone with simulator experiences. Two seats per ticket.",
    tags: ["f1", "formula-1", "motorsport", "racing", "austin"],
    popularityScore: 93,
    createdAt: "2025-11-08T08:00:00Z",
    availabilityCount: seedAvailability(18),
    zones: [
      { name: "Grandstand Premium", price: 520, available: 1 },
      { name: "Grandstand Standard", price: 320, available: 2 },
      { name: "Fan Zone Only", price: 95, available: 0 }
    ],
    reviews: [
      { id: 1, author: "Stefan K.", rating: 5, text: "The noise, the speed, the adrenaline — utterly incredible.", date: "2025-11-25" },
      { id: 2, author: "Jenna L.", rating: 4, text: "Amazing experience for first-time F1 fans. The pit walk was a highlight.", date: "2025-11-12" }
    ],
    faqs: [
      { q: "Does the ticket cover all 3 days?", a: "Yes, this is a full weekend pass covering practice, qualifying, and race day." },
      { q: "Is public transport available?", a: "Yes, shuttle buses run from downtown Austin to COTA throughout the weekend." }
    ]
  },
  {
    id: 19,
    title: "Comedy Roast: Celebrity Fundraiser",
    category: "comedy",
    price: 120.00,
    rating: 4.4,
    reviewCount: 77,
    date: "2026-02-14",
    time: "19:00",
    venue: "The Grand Comedy Theater",
    city: "Las Vegas, NV",
    images: [
      "https://images.unsplash.com/photo-1609454803869-eb3f82394e4d?w=600&q=80",
      "https://images.unsplash.com/photo-1555140578-1cdd25256d5c?w=600&q=80",
      "https://images.unsplash.com/photo-1514306191588-3a2cb1b715e6?w=600&q=80"
    ],
    description: "Valentine's Day special fundraiser roast featuring celebrity guests and top comedians. All proceeds benefit the National Comedy Fund. A glamorous evening of black-tie roasting, cocktails, and silent auction items. Formal attire encouraged.",
    tags: ["roast", "comedy", "charity", "formal", "celebrity"],
    popularityScore: 69,
    createdAt: "2025-12-28T11:00:00Z",
    availabilityCount: seedAvailability(19),
    zones: [
      { name: "VIP Table (group of 6)", price: 180, available: 6 },
      { name: "Standard Seating", price: 120, available: 12 },
      { name: "Balcony", price: 75, available: 0 }
    ],
    reviews: [
      { id: 1, author: "Samantha F.", rating: 5, text: "Hilarious evening for a great cause. The celebrities were incredibly generous.", date: "2025-12-15" },
      { id: 2, author: "Ryan T.", rating: 4, text: "Classy event with incredible humor. Slightly long but entertaining.", date: "2025-12-08" }
    ],
    faqs: [
      { q: "What is the dress code?", a: "Black tie or formal attire is strongly encouraged." },
      { q: "How much goes to charity?", a: "100% of net proceeds are donated to the National Comedy Fund." }
    ]
  },
  {
    id: 20,
    title: "Photography Walk: Golden Hour NYC",
    category: "workshop",
    price: 68.00,
    rating: 4.5,
    reviewCount: 59,
    date: "2026-03-18",
    time: "16:30",
    venue: "Central Park West Entrance",
    city: "New York, NY",
    images: [
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80",
      "https://images.unsplash.com/photo-1504760917173-59a1615e20cc?w=600&q=80",
      "https://images.unsplash.com/photo-1519653375881-451648caa38e?w=600&q=80"
    ],
    description: "A guided 3-hour photography walk through NYC's most iconic spots during the golden hour. Learn composition, lighting, and editing from a professional photographer with 20+ years of experience. Bring any camera — even your phone works great. Post-walk editing session included.",
    tags: ["photography", "nyc", "golden-hour", "creative", "workshop"],
    popularityScore: 64,
    createdAt: "2025-12-18T12:00:00Z",
    availabilityCount: seedAvailability(20),
    zones: [
      { name: "Standard", price: 68, available: 40 },
      { name: "Premium (1-on-1 Editing Session)", price: 135, available: 15 }
    ],
    reviews: [
      { id: 1, author: "Hannah B.", rating: 5, text: "Left with stunning photos and loads of new skills. Incredible instructor.", date: "2025-12-14" },
      { id: 2, author: "Nate O.", rating: 4, text: "Beautiful walk. The editing session was a great bonus.", date: "2025-12-05" }
    ],
    faqs: [
      { q: "Do I need a professional camera?", a: "Not at all! A smartphone with a good camera works perfectly." },
      { q: "What if it rains?", a: "Light rain won't stop us! Heavy rain results in a reschedule with notice." }
    ]
  }
];

// Helper to get category label
export const CATEGORY_LABELS = {
  concert: "Concert",
  comedy: "Comedy",
  workshop: "Workshop",
  sports: "Sports",
  theatre: "Theatre"
};

// Valid coupon codes
export const COUPONS = {
  SAVE10: { discount: 0.10, label: "10% Off" },
  FEST20: { discount: 0.20, label: "20% Off" },
  WELCOME: { discount: 0.15, label: "15% Welcome Discount" },
  HALF50: { discount: 0.50, label: "50% Off" }
};

```

---

### `src/hooks/useLocalStorage.js`

```javascript
import { useState, useCallback } from 'react'

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (err) {
      console.error('useLocalStorage error:', err)
    }
  }, [key, storedValue])

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue)
      window.localStorage.removeItem(key)
    } catch (err) {
      console.error('useLocalStorage remove error:', err)
    }
  }, [key, initialValue])

  return [storedValue, setValue, removeValue]
}

```

---

### `src/hooks/useDebounce.js`

```javascript
import { useState, useEffect } from 'react'

export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

```

---

### `src/hooks/useAnalytics.js`

```javascript
import { useCallback } from 'react'

const ANALYTICS_KEY = 'eventflow_analytics'

function readAnalytics() {
  try {
    const raw = window.localStorage.getItem(ANALYTICS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function writeAnalytics(data) {
  try {
    window.localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data))
  } catch (e) {
    console.error('Analytics write error:', e)
  }
}

export function useAnalytics() {
  const trackView = useCallback((eventId) => {
    const data = readAnalytics()
    const key = `view_${eventId}`
    data[key] = (data[key] || 0) + 1
    writeAnalytics(data)
  }, [])

  const trackAddToCart = useCallback((eventId) => {
    const data = readAnalytics()
    const key = `atc_${eventId}`
    data[key] = (data[key] || 0) + 1
    writeAnalytics(data)
  }, [])

  const getViewCount = useCallback((eventId) => {
    const data = readAnalytics()
    return data[`view_${eventId}`] || 0
  }, [])

  const getAddToCartCount = useCallback((eventId) => {
    const data = readAnalytics()
    return data[`atc_${eventId}`] || 0
  }, [])

  const getPopularityBoost = useCallback((eventId) => {
    const data = readAnalytics()
    const views = data[`view_${eventId}`] || 0
    const atc = data[`atc_${eventId}`] || 0
    return views * 0.5 + atc * 2
  }, [])

  return { trackView, trackAddToCart, getViewCount, getAddToCartCount, getPopularityBoost }
}

```

---

### `src/utils/currency.js`

```javascript
export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}

export function formatPercent(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 0
  }).format(value)
}

```

---

### `src/utils/validation.js`

```javascript
export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export function validatePassword(password) {
  if (!password || password.length < 8) return 'Password must be at least 8 characters'
  if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter'
  if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter'
  if (!/[0-9]/.test(password)) return 'Password must contain at least one number'
  return null
}

export function validateLoginForm(fields) {
  const errors = {}
  if (!fields.email || !fields.email.trim()) {
    errors.email = 'Email is required'
  } else if (!validateEmail(fields.email)) {
    errors.email = 'Enter a valid email address'
  }
  if (!fields.password || !fields.password.trim()) {
    errors.password = 'Password is required'
  }
  return errors
}

export function validateSignupForm(fields) {
  const errors = {}
  if (!fields.name || !fields.name.trim()) {
    errors.name = 'Full name is required'
  }
  if (!fields.email || !fields.email.trim()) {
    errors.email = 'Email is required'
  } else if (!validateEmail(fields.email)) {
    errors.email = 'Enter a valid email address'
  }
  if (!fields.password || !fields.password.trim()) {
    errors.password = 'Password is required'
  } else {
    const pwErr = validatePassword(fields.password)
    if (pwErr) errors.password = pwErr
  }
  if (!fields.confirmPassword || !fields.confirmPassword.trim()) {
    errors.confirmPassword = 'Please confirm your password'
  } else if (fields.password !== fields.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }
  return errors
}

export function validateCheckoutAddress(fields) {
  const errors = {}
  if (!fields.firstName?.trim()) errors.firstName = 'First name is required'
  if (!fields.lastName?.trim()) errors.lastName = 'Last name is required'
  if (!fields.email?.trim()) errors.email = 'Email is required'
  else if (!validateEmail(fields.email)) errors.email = 'Enter a valid email'
  if (!fields.address?.trim()) errors.address = 'Address is required'
  if (!fields.city?.trim()) errors.city = 'City is required'
  if (!fields.state?.trim()) errors.state = 'State is required'
  if (!fields.zip?.trim()) errors.zip = 'ZIP code is required'
  return errors
}

```

---

### `src/utils/filters.js`

```javascript
import { useAnalytics } from '../hooks/useAnalytics'

// Date helpers
function getStartOfWeek() {
  const now = new Date()
  const day = now.getDay()
  const diff = now.getDate() - day
  const start = new Date(now.setDate(diff))
  start.setHours(0, 0, 0, 0)
  return start
}

function getEndOfWeek() {
  const start = getStartOfWeek()
  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  end.setHours(23, 59, 59, 999)
  return end
}

function getEndOfMonth() {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)
}

function parseEventDate(dateStr) {
  // Parse as local date (no timezone shift)
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function filterEvents(events, filters, popularityBoostFn) {
  let result = [...events]

  // --- Search ---
  if (filters.search && filters.search.trim()) {
    const q = filters.search.toLowerCase()
    result = result.filter(e =>
      e.title.toLowerCase().includes(q) ||
      e.venue.toLowerCase().includes(q) ||
      e.city.toLowerCase().includes(q) ||
      e.tags.some(t => t.toLowerCase().includes(q))
    )
  }

  // --- Category ---
  if (filters.category && filters.category !== 'all') {
    result = result.filter(e => e.category === filters.category)
  }

  // --- Price range ---
  if (filters.priceMin !== undefined && filters.priceMin !== '') {
    result = result.filter(e => e.price >= Number(filters.priceMin))
  }
  if (filters.priceMax !== undefined && filters.priceMax !== '') {
    result = result.filter(e => e.price <= Number(filters.priceMax))
  }

  // --- Date filter ---
  if (filters.dateFilter && filters.dateFilter !== 'all') {
    const now = new Date()
    now.setHours(0, 0, 0, 0)

    result = result.filter(e => {
      const eventDate = parseEventDate(e.date)
      switch (filters.dateFilter) {
        case 'upcoming':
          return eventDate >= now
        case 'this_week':
          return eventDate >= now && eventDate <= getEndOfWeek()
        case 'this_month':
          return eventDate >= now && eventDate <= getEndOfMonth()
        default:
          return true
      }
    })
  }

  // --- Sort ---
  const sort = filters.sort || 'popular'
  result.sort((a, b) => {
    switch (sort) {
      case 'popular': {
        const boostA = popularityBoostFn ? popularityBoostFn(a.id) : 0
        const boostB = popularityBoostFn ? popularityBoostFn(b.id) : 0
        return (b.popularityScore + boostB) - (a.popularityScore + boostA)
      }
      case 'price_asc':
        return a.price - b.price
      case 'price_desc':
        return b.price - a.price
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt)
      case 'rating':
        return b.rating - a.rating
      default:
        return 0
    }
  })

  return result
}

export const DEFAULT_FILTERS = {
  search: '',
  category: 'all',
  priceMin: '',
  priceMax: '',
  dateFilter: 'all',
  sort: 'popular'
}

```

---

### `src/utils/stripe.js`

```javascript
/**
 * Mock Stripe integration.
 *
 * Since we cannot spin up a backend server within the constraints,
 * this module simulates Stripe Checkout entirely on the client side.
 *
 * Test card numbers:
 *   4242 4242 4242 4242  → Always succeeds
 *   4000 0000 0000 0002  → Always declines (card declined)
 *   4000 0000 0000 9995  → Insufficient funds
 *   4111 1111 1111 1111  → Success (Visa test)
 *
 * Any other card number will succeed as long as it passes basic Luhn check.
 *
 * Expiry: any future MM/YY
 * CVC: any 3-digit number
 */

const DECLINE_CARDS = {
  '4000000000000002': 'Your card was declined.',
  '4000000000009995': 'Insufficient funds on your card.'
}

const SUCCESS_CARDS = [
  '4242424242424242',
  '4111111111111111'
]

function luhnCheck(cardNum) {
  const digits = cardNum.split('').reverse().map(Number)
  let sum = 0
  for (let i = 0; i < digits.length; i++) {
    let d = digits[i]
    if (i % 2 === 1) {
      d *= 2
      if (d > 9) d -= 9
    }
    sum += d
  }
  return sum % 10 === 0
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Simulates creating a Stripe PaymentIntent & confirming payment.
 * @param {object} paymentData
 * @param {string} paymentData.cardNumber
 * @param {string} paymentData.expiry    MM/YY
 * @param {string} paymentData.cvc
 * @param {number} paymentData.amount    in cents
 * @returns {Promise<{success: boolean, error?: string, paymentIntentId?: string}>}
 */
export async function mockStripeCharge(paymentData) {
  const { cardNumber, expiry, cvc, amount } = paymentData
  const cleanCard = cardNumber.replace(/\s/g, '')

  // Simulate network latency
  await delay(1200 + Math.random() * 800)

  // --- Validation ---
  if (!cleanCard || cleanCard.length < 12) {
    return { success: false, error: 'Card number is incomplete.' }
  }
  if (!luhnCheck(cleanCard)) {
    return { success: false, error: 'Card number is invalid.' }
  }
  if (!expiry || expiry.length < 5) {
    return { success: false, error: 'Expiry date is incomplete.' }
  }
  const [mm, yy] = expiry.split('/').map(Number)
  if (mm < 1 || mm > 12) {
    return { success: false, error: 'Invalid expiry month.' }
  }
  const now = new Date()
  const expYear = 2000 + yy
  const expMonth = mm
  if (expYear < now.getFullYear() || (expYear === now.getFullYear() && expMonth < now.getMonth() + 1)) {
    return { success: false, error: 'Your card has expired.' }
  }
  if (!cvc || cvc.length < 3) {
    return { success: false, error: 'CVC is incomplete.' }
  }

  // --- Decline simulation ---
  if (DECLINE_CARDS[cleanCard]) {
    return { success: false, error: DECLINE_CARDS[cleanCard] }
  }

  // --- Success ---
  // Generate a fake PaymentIntent ID
  const intentId = 'pi_mock_' + Math.random().toString(36).substring(2, 18)
  return {
    success: true,
    paymentIntentId: intentId,
    amountCharged: amount
  }
}

export const STRIPE_TEST_CARDS = [
  { number: '4242 4242 4242 4242', label: 'Visa (Success)', result: 'success' },
  { number: '4111 1111 1111 1111', label: 'Visa (Success)', result: 'success' },
  { number: '4000 0000 0000 0002', label: 'Visa (Declined)', result: 'decline' },
  { number: '4000 0000 0000 9995', label: 'Visa (Insufficient Funds)', result: 'decline' }
]

```

---

### `src/context/ToastContext.jsx`

```jsx
import React, { createContext, useContext, useState, useCallback, useRef } from 'react'

const ToastContext = createContext()

let toastIdCounter = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const timersRef = useRef({})

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = ++toastIdCounter
    setToasts(prev => [...prev, { id, message, type, exiting: false }])

    timersRef.current[id] = setTimeout(() => {
      removeToast(id)
    }, duration)

    return id
  }, [])

  const removeToast = useCallback((id) => {
    // Mark as exiting for exit animation
    setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t))
    if (timersRef.current[id]) {
      clearTimeout(timersRef.current[id])
      delete timersRef.current[id]
    }
    // Remove after animation
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 300)
  }, [])

  const success = useCallback((msg, dur) => addToast(msg, 'success', dur), [addToast])
  const error = useCallback((msg, dur) => addToast(msg, 'error', dur), [addToast])
  const info = useCallback((msg, dur) => addToast(msg, 'info', dur), [addToast])
  const warning = useCallback((msg, dur) => addToast(msg, 'warning', dur), [addToast])

  return (
    <ToastContext.Provider value={{ addToast, removeToast, success, error, info, warning }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  )
}

function ToastContainer({ toasts, onRemove }) {
  const iconMap = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠'
  }
  const bgMap = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-blue-600',
    warning: 'bg-amber-600'
  }
  const borderMap = {
    success: 'border-green-500',
    error: 'border-red-500',
    info: 'border-blue-500',
    warning: 'border-amber-500'
  }

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 w-80 max-w-full px-4" aria-live="assertive">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`${toast.exiting ? 'toast-exit' : 'toast-enter'} flex items-start gap-3 rounded-xl border ${borderMap[toast.type]} bg-slate-800 shadow-2xl shadow-black/30 p-4 text-sm text-slate-100 transition-all`}
          role="alert"
        >
          <span className={`flex-shrink-0 w-6 h-6 rounded-full ${bgMap[toast.type]} flex items-center justify-center text-white text-xs font-bold`}>
            {iconMap[toast.type]}
          </span>
          <span className="flex-1 leading-relaxed">{toast.message}</span>
          <button
            onClick={() => onRemove(toast.id)}
            className="flex-shrink-0 text-slate-500 hover:text-slate-300 transition-colors"
            aria-label="Close notification"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}

export function useToast() {
  return useContext(ToastContext)
}

```

---

### `src/context/AuthContext.jsx`

```jsx
import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const AuthContext = createContext()

const initialState = {
  user: null,
  loading: true,
  error: null
}

function authReducer(state, action) {
  switch (action.type) {
    case 'INIT_DONE':
      return { ...state, loading: false, user: action.payload }
    case 'LOGIN_START':
      return { ...state, loading: true, error: null }
    case 'LOGIN_SUCCESS':
      return { ...state, loading: false, user: action.payload, error: null }
    case 'LOGIN_ERROR':
      return { ...state, loading: false, error: action.payload }
    case 'SIGNUP_START':
      return { ...state, loading: true, error: null }
    case 'SIGNUP_SUCCESS':
      return { ...state, loading: false, user: action.payload, error: null }
    case 'SIGNUP_ERROR':
      return { ...state, loading: false, error: action.payload }
    case 'LOGOUT':
      return { ...state, loading: false, user: null, error: null }
    case 'CLEAR_ERROR':
      return { ...state, error: null }
    default:
      return state
  }
}

// Mock user database stored in localStorage
const USERS_KEY = 'eventflow_users'

function getUsers() {
  try {
    const raw = window.localStorage.getItem(USERS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveUsers(users) {
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function delay(ms) {
  return new Promise(r => setTimeout(r, ms))
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState)
  const [authSession, setAuthSession] = useLocalStorage('eventflow_auth_session', null)

  // On mount, check if session exists
  useEffect(() => {
    if (authSession && authSession.token) {
      dispatch({ type: 'INIT_DONE', payload: authSession.user })
    } else {
      dispatch({ type: 'INIT_DONE', payload: null })
    }
  }, [authSession])

  const login = useCallback(async (email, password) => {
    dispatch({ type: 'LOGIN_START' })
    await delay(600) // Simulate network

    const users = getUsers()
    const user = Object.values(users).find(u => u.email === email)

    if (!user || user.password !== password) {
      dispatch({ type: 'LOGIN_ERROR', payload: 'Invalid email or password.' })
      return false
    }

    const session = {
      token: 'tok_mock_' + Math.random().toString(36).substring(2, 18),
      user: { id: user.id, name: user.name, email: user.email }
    }
    setAuthSession(session)
    dispatch({ type: 'LOGIN_SUCCESS', payload: session.user })
    return true
  }, [setAuthSession])

  const signup = useCallback(async (name, email, password) => {
    dispatch({ type: 'SIGNUP_START' })
    await delay(600)

    const users = getUsers()
    const existing = Object.values(users).find(u => u.email === email)

    if (existing) {
      dispatch({ type: 'SIGNUP_ERROR', payload: 'An account with this email already exists.' })
      return false
    }

    const id = 'usr_' + Math.random().toString(36).substring(2, 12)
    users[id] = { id, name, email, password, createdAt: new Date().toISOString() }
    saveUsers(users)

    const session = {
      token: 'tok_mock_' + Math.random().toString(36).substring(2, 18),
      user: { id, name, email }
    }
    setAuthSession(session)
    dispatch({ type: 'SIGNUP_SUCCESS', payload: session.user })
    return true
  }, [setAuthSession])

  const logout = useCallback(() => {
    setAuthSession(null)
    dispatch({ type: 'LOGOUT' })
  }, [setAuthSession])

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' })
  }, [])

  return (
    <AuthContext.Provider value={{
      user: state.user,
      loading: state.loading,
      error: state.error,
      login,
      signup,
      logout,
      clearError,
      isLoggedIn: !!state.user
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

```

---

### `src/context/CartContext.jsx`

```jsx
import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { COUPONS } from '../data/events'

const CartContext = createContext()

const initialState = {
  items: [],           // { eventId, title, zone, price, quantity, image }
  couponCode: '',
  couponDiscount: null, // { code, discount, label } or null
  couponError: ''
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'HYDRATE':
      return { ...state, ...action.payload }

    case 'ADD_ITEM': {
      const existing = state.items.find(
        i => i.eventId === action.payload.eventId && i.zone === action.payload.zone
      )
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.eventId === action.payload.eventId && i.zone === action.payload.zone
              ? { ...i, quantity: i.quantity + (action.payload.quantity || 1) }
              : i
          )
        }
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }]
      }
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          i => !(i.eventId === action.payload.eventId && i.zone === action.payload.zone)
        )
      }

    case 'UPDATE_QTY': {
      const { eventId, zone, quantity } = action.payload
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(i => !(i.eventId === eventId && i.zone === zone))
        }
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.eventId === eventId && i.zone === zone ? { ...i, quantity } : i
        )
      }
    }

    case 'CLEAR_CART':
      return { ...initialState }

    case 'APPLY_COUPON': {
      const code = action.payload.toUpperCase()
      const coupon = COUPONS[code]
      if (!coupon) {
        return { ...state, couponCode: code, couponDiscount: null, couponError: 'Invalid coupon code.' }
      }
      return { ...state, couponCode: code, couponDiscount: { code, ...coupon }, couponError: '' }
    }

    case 'REMOVE_COUPON':
      return { ...state, couponCode: '', couponDiscount: null, couponError: '' }

    case 'SET_COUPON_ERROR':
      return { ...state, couponError: action.payload }

    default:
      return state
  }
}

// Pricing constants
const SERVICE_FEE_RATE = 0.12   // 12% service fee
const TAX_RATE = 0.08           // 8% tax

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  const [savedCart, setSavedCart] = useLocalStorage('eventflow_cart', initialState)
  const hydratedRef = React.useRef(false)

  // Hydrate from localStorage once
  useEffect(() => {
    if (!hydratedRef.current) {
      hydratedRef.current = true
      if (savedCart && savedCart.items) {
        dispatch({ type: 'HYDRATE', payload: savedCart })
      }
    }
  }, [savedCart])

  // Persist on change
  useEffect(() => {
    if (hydratedRef.current) {
      setSavedCart(state)
    }
  }, [state, setSavedCart])

  const addToCart = useCallback((item) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }, [])

  const removeFromCart = useCallback((eventId, zone) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { eventId, zone } })
  }, [])

  const updateQuantity = useCallback((eventId, zone, quantity) => {
    dispatch({ type: 'UPDATE_QTY', payload: { eventId, zone, quantity } })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' })
  }, [])

  const applyCoupon = useCallback((code) => {
    if (!code || !code.trim()) {
      dispatch({ type: 'SET_COUPON_ERROR', payload: 'Please enter a coupon code.' })
      return
    }
    dispatch({ type: 'APPLY_COUPON', payload: code })
  }, [])

  const removeCoupon = useCallback(() => {
    dispatch({ type: 'REMOVE_COUPON' })
  }, [])

  // --- Computed pricing ---
  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discountAmount = state.couponDiscount ? subtotal * state.couponDiscount.discount : 0
  const afterDiscount = subtotal - discountAmount
  const serviceFee = afterDiscount * SERVICE_FEE_RATE
  const tax = afterDiscount * TAX_RATE
  const grandTotal = afterDiscount + serviceFee + tax
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider value={{
      items: state.items,
      itemCount,
      couponCode: state.couponCode,
      couponDiscount: state.couponDiscount,
      couponError: state.couponError,
      pricing: {
        subtotal,
        discountAmount,
        afterDiscount,
        serviceFee,
        tax,
        grandTotal
      },
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      applyCoupon,
      removeCoupon
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}

```

---

### `src/components/Navbar.jsx`

```jsx
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { user, isLoggedIn, logout } = useAuth()
  const { itemCount } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  // Dispatch custom event for CartDrawer
  const openCartDrawer = () => {
    window.dispatchEvent(new CustomEvent('open-cart-drawer'))
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-slate-800' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-md shadow-green-900/30">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Event<span className="text-green-400">Flow</span>
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {[
                { to: '/', label: 'Home' },
                { to: '/events', label: 'Events' },
              ].map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location.pathname === link.to ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Right Actions */}
            <div className="hidden md:flex items-center gap-2">
              {/* Cart Button */}
              <button
                onClick={openCartDrawer}
                className="relative p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all duration-200"
                aria-label={`Shopping cart, ${itemCount} items`}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md shadow-green-900/40">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </button>

              {/* Auth */}
              {isLoggedIn ? (
                <div className="flex items-center gap-2">
                  <Link to="/account" className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-slate-800/60 transition-all">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-xs font-bold text-white">
                      {user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <span className="text-sm text-slate-300">{user?.name}</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800/40 transition-all"
                    aria-label="Logout"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login" className="px-3 py-1.5 text-sm text-slate-400 hover:text-white transition-colors">Log in</Link>
                  <Link to="/signup" className="px-4 py-1.5 bg-green-600 hover:bg-green-500 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-md shadow-green-900/30">Sign up</Link>
                </div>
              )}
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-2">
              <button onClick={openCartDrawer} className="relative p-2 rounded-lg text-slate-400 hover:text-white" aria-label="Cart">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-green-500 text-white text-xs font-bold rounded-full flex items-center justify-center" style={{ width: '18px', height: '18px', fontSize: '10px' }}>
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-lg text-slate-400 hover:text-white"
                aria-label="Toggle menu"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  {mobileOpen ? (
                    <>
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </>
                  ) : (
                    <>
                      <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-slate-950/98 backdrop-blur-md border-t border-slate-800 px-4 py-4 flex flex-col gap-1">
            <Link to="/" className="px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/40 transition-all">Home</Link>
            <Link to="/events" className="px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/40 transition-all">Events</Link>
            <Link to="/cart" className="px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/40 transition-all flex items-center justify-between">
              Cart
              {itemCount > 0 && <span className="bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">{itemCount}</span>}
            </Link>
            <div className="border-t border-slate-800 my-2"></div>
            {isLoggedIn ? (
              <>
                <Link to="/account" className="px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/40 transition-all">Account</Link>
                <button onClick={logout} className="px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-slate-800/40 transition-all text-left">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/40 transition-all">Log in</Link>
                <Link to="/signup" className="px-4 py-3 rounded-xl bg-green-600 text-white font-medium text-center">Sign up</Link>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  )
}

```

---

### `src/components/Footer.jsx`

```jsx
import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </div>
              <span className="text-lg font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                Event<span className="text-green-400">Flow</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              Discover and book tickets for the best live events near you. Concerts, comedy, workshops, sports, and theatre — all in one place.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3 mt-5">
              {[
                { label: 'Twitter', icon: 'X', href: '#' },
                { label: 'Instagram', icon: '📷', href: '#' },
                { label: 'Facebook', icon: 'f', href: '#' }
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg border border-slate-800 text-slate-500 hover:text-green-400 hover:border-green-600 flex items-center justify-center text-xs transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-slate-300 text-sm font-semibold uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { to: '/', label: 'Home' },
                { to: '/events', label: 'All Events' },
                { to: '/cart', label: 'Cart' },
                { to: '/login', label: 'Log In' }
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-slate-500 hover:text-green-400 text-sm transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-slate-300 text-sm font-semibold uppercase tracking-wider mb-4">Support</h4>
            <ul className="flex flex-col gap-2.5">
              {['Help Center', 'Refund Policy', 'Privacy Policy', 'Terms of Service', 'Contact Us'].map(item => (
                <li key={item}>
                  <a href="#" className="text-slate-500 hover:text-green-400 text-sm transition-colors duration-200">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-600 text-xs">© 2026 EventFlow. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-600 text-xs">Payments secured by</span>
            <span className="text-slate-500 text-xs font-semibold border border-slate-700 px-2 py-0.5 rounded">STRIPE</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

```

---

### `src/components/Skeleton.jsx`

```jsx
import React from 'react'

const S = ({ className = '' }) => (
  <div className={`bg-slate-800 rounded skeleton-pulse ${className}`} />
)

export function EventCardSkeleton() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
      <S className="h-48 w-full rounded-none" />
      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <S className="h-5 w-24" />
          <S className="h-5 w-16" />
        </div>
        <S className="h-6 w-full" />
        <S className="h-6 w-4/5" />
        <div className="flex items-center gap-2 mt-1">
          <S className="h-4 w-4 rounded-full" />
          <S className="h-4 w-32" />
        </div>
        <div className="flex items-center justify-between mt-2 pt-3 border-t border-slate-800">
          <S className="h-6 w-20" />
          <S className="h-9 w-28 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export function DetailSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Image gallery placeholder */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          <S className="h-80 w-full rounded-2xl" />
          <div className="flex gap-2">
            {[1,2,3,4].map(i => <S key={i} className="h-20 w-20 rounded-lg flex-1" />)}
          </div>
        </div>
        {/* Info placeholder */}
        <div className="flex flex-col gap-4">
          <S className="h-6 w-1/2" />
          <S className="h-8 w-full" />
          <S className="h-8 w-3/4" />
          <div className="flex flex-col gap-2 mt-2">
            <S className="h-4 w-full" />
            <S className="h-4 w-full" />
            <S className="h-4 w-4/5" />
          </div>
          <S className="h-10 w-full rounded-lg mt-4" />
        </div>
      </div>
    </div>
  )
}

export function ListingSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <EventCardSkeleton key={i} />
      ))}
    </div>
  )
}

```

---

### `src/components/Breadcrumb.jsx`

```jsx
import React from 'react'
import { Link } from 'react-router-dom'

export default function Breadcrumb({ items }) {
  // items: [{ label, to? }]
  return (
    <nav className="flex items-center gap-1.5 text-sm" aria-label="Breadcrumb">
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-600">
              <polyline points="9,18 15,12 9,6" />
            </svg>
          )}
          {item.to && idx < items.length - 1 ? (
            <Link to={item.to} className="text-slate-500 hover:text-green-400 transition-colors duration-200">
              {item.label}
            </Link>
          ) : (
            <span className={`${idx === items.length - 1 ? 'text-slate-300' : 'text-slate-500'} truncate max-w-48`}>
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}

```

---

### `src/components/StarRating.jsx`

```jsx
import React from 'react'

export default function StarRating({ rating, maxStars = 5, size = 16 }) {
  const stars = []
  for (let i = 1; i <= maxStars; i++) {
    const diff = rating - (i - 1)
    let type = 'empty'
    if (diff >= 1) type = 'full'
    else if (diff >= 0.3) type = 'half'
    stars.push(type)
  }

  return (
    <div className="flex items-center gap-0.5">
      {stars.map((type, idx) => (
        <svg key={idx} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id={`star-grad-${idx}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <clipPath id={`star-half-${idx}`}>
              <rect x="0" y="0" width="12" height="24" />
            </clipPath>
          </defs>
          {/* Empty star outline */}
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill={type === 'full' ? 'url(#star-grad-' + idx + ')' : '#334155'}
            stroke={type === 'full' ? '#f59e0b' : '#475569'}
            strokeWidth="1"
          />
          {/* Half star overlay */}
          {type === 'half' && (
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill="url(#star-grad-0)"
              stroke="#f59e0b"
              strokeWidth="1"
              clipPath={`url(#star-half-${idx})`}
            />
          )}
        </svg>
      ))}
    </div>
  )
}

```

---

### `src/components/ProtectedRoute.jsx`

```jsx
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-slate-700 border-t-green-500 rounded-full animate-spin" style={{ borderWidth: '3px' }}></div>
          <span className="text-slate-500 text-sm">Verifying session…</span>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

```

---

### `src/components/EventCard.jsx`

```jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { formatCurrency } from '../utils/currency'
import { CATEGORY_LABELS } from '../data/events'
import StarRating from './StarRating'

function getAvailabilityLabel(count) {
  if (count === 0) return { label: 'Sold Out', color: 'bg-red-900/40 text-red-400 border-red-800' }
  if (count <= 5) return { label: `${count} Left`, color: 'bg-amber-900/40 text-amber-400 border-amber-800' }
  return { label: 'Available', color: 'bg-green-900/40 text-green-400 border-green-800' }
}

export default function EventCard({ event, compareItems, onToggleCompare }) {
  const { addToCart } = useCart()
  const toast = useToast()
  const [wishlist, setWishlist] = useLocalStorage('eventflow_wishlist', [])
  const [isWished, setIsWished] = useState(() => wishlist.includes(event.id))
  const [showZones, setShowZones] = useState(false)

  const totalAvailable = event.zones.reduce((s, z) => s + z.available, 0)
  const avail = getAvailabilityLabel(totalAvailable)
  const isInCompare = compareItems?.includes(event.id)

  const toggleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const updated = isWished
      ? wishlist.filter(id => id !== event.id)
      : [...wishlist, event.id]
    setWishlist(updated)
    setIsWished(!isWished)
    toast.info(isWished ? `Removed "${event.title}" from wishlist` : `Added "${event.title}" to wishlist`)
  }

  const handleAddToCart = (zone) => {
    if (zone.available <= 0) {
      toast.error('This zone is sold out.')
      return
    }
    addToCart({
      eventId: event.id,
      title: event.title,
      zone: zone.name,
      price: zone.price,
      quantity: 1,
      image: event.images[0]
    })
    toast.success(`Added "${event.title}" (${zone.name}) to cart!`)
    setShowZones(false)
  }

  const cheapestAvailable = [...event.zones].filter(z => z.available > 0).sort((a, b) => a.price - b.price)[0]

  return (
    <div className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:shadow-black/20 flex flex-col fade-up">
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={event.images[0]}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          <span className="bg-slate-950/80 backdrop-blur-sm text-slate-300 text-xs font-medium px-2.5 py-1 rounded-lg border border-slate-700">
            {CATEGORY_LABELS[event.category]}
          </span>
          <div className="flex gap-1.5">
            {/* Compare toggle */}
            {onToggleCompare && (
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleCompare(event.id) }}
                className={`p-1.5 rounded-lg backdrop-blur-sm border transition-all ${isInCompare ? 'bg-blue-600/80 border-blue-500 text-white' : 'bg-slate-950/60 border-slate-700 text-slate-400 hover:text-white'}`}
                aria-label={isInCompare ? 'Remove from compare' : 'Add to compare'}
                title="Compare"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 21L17 3"/><path d="M21 15l-4 6"/><path d="M3 9l4-6"/>
                </svg>
              </button>
            )}
            {/* Wishlist */}
            <button
              onClick={toggleWishlist}
              className={`p-1.5 rounded-lg backdrop-blur-sm border transition-all ${isWished ? 'bg-red-600/80 border-red-500 text-white' : 'bg-slate-950/60 border-slate-700 text-slate-400 hover:text-white'}`}
              aria-label={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill={isWished ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Availability badge */}
        <div className="absolute bottom-3 left-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${avail.color}`}>
            {avail.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-5 gap-2">
        <div className="flex items-center justify-between">
          <span className="text-slate-500 text-xs uppercase tracking-wider">{event.city}</span>
          <div className="flex items-center gap-1">
            <StarRating rating={event.rating} size={13} />
            <span className="text-slate-500 text-xs ml-0.5">{event.rating}</span>
          </div>
        </div>

        <Link to={`/events/${event.id}`} className="group/title">
          <h3 className="text-slate-100 font-semibold text-base leading-snug group-hover/title:text-green-400 transition-colors line-clamp-2">
            {event.title}
          </h3>
        </Link>

        <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-0.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          <span>{event.date} at {event.time}</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-500 text-xs">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          <span>{event.venue}</span>
        </div>

        {/* Bottom */}
        <div className="mt-auto pt-3 border-t border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-green-400 font-bold text-lg">{formatCurrency(event.price)}</span>
            <span className="text-slate-600 text-xs ml-1">/ ticket</span>
          </div>

          {totalAvailable === 0 ? (
            <span className="text-slate-600 text-sm font-medium px-4 py-2 rounded-lg bg-slate-800 cursor-not-allowed">Sold Out</span>
          ) : event.zones.length === 1 ? (
            <button
              onClick={() => handleAddToCart(event.zones[0])}
              className="bg-green-600 hover:bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 shadow-md shadow-green-900/30 hover:shadow-green-900/50"
            >
              Add to Cart
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowZones(!showZones)}
                className="bg-green-600 hover:bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 shadow-md shadow-green-900/30"
              >
                {showZones ? 'Close' : 'Select Zone'}
              </button>
              {showZones && (
                <div className="absolute bottom-full right-0 mb-2 w-56 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl shadow-black/40 overflow-hidden z-10">
                  <div className="p-2 border-b border-slate-700">
                    <span className="text-slate-500 text-xs font-semibold uppercase tracking-wide">Choose a Zone</span>
                  </div>
                  {event.zones.map((zone, i) => (
                    <button
                      key={i}
                      onClick={() => handleAddToCart(zone)}
                      disabled={zone.available <= 0}
                      className={`w-full text-left px-3 py-2.5 flex items-center justify-between transition-colors ${zone.available <= 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-slate-700'}`}
                    >
                      <span className="text-slate-300 text-sm">{zone.name}</span>
                      <div className="text-right">
                        <span className="text-green-400 text-sm font-semibold">{formatCurrency(zone.price)}</span>
                        {zone.available <= 0 && <span className="block text-red-400 text-xs">Sold Out</span>}
                        {zone.available > 0 && zone.available <= 5 && <span className="block text-amber-400 text-xs">{zone.available} left</span>}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

```

---

### `src/components/FilterSidebar.jsx`

```jsx
import React, { useState } from 'react'

const CATEGORIES = [
  { value: 'all', label: 'All Events' },
  { value: 'concert', label: '🎵 Concert' },
  { value: 'comedy', label: '😂 Comedy' },
  { value: 'workshop', label: '🛠 Workshop' },
  { value: 'sports', label: '⚽ Sports' },
  { value: 'theatre', label: '🎭 Theatre' }
]

const DATE_OPTIONS = [
  { value: 'all', label: 'Any Date' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'this_week', label: 'This Week' },
  { value: 'this_month', label: 'This Month' }
]

const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'price_asc', label: 'Price: Low → High' },
  { value: 'price_desc', label: 'Price: High → Low' },
  { value: 'newest', label: 'Newest First' },
  { value: 'rating', label: 'Top Rated' }
]

export default function FilterSidebar({ filters, onFilterChange, onClearAll, mobileOpen, onMobileClose }) {
  const activeCount = [
    filters.category !== 'all',
    filters.priceMin !== '',
    filters.priceMax !== '',
    filters.dateFilter !== 'all',
    filters.search !== ''
  ].filter(Boolean).length

  const content = (
    <div className="flex flex-col gap-6">
      {/* Category */}
      <div>
        <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-3">Category</label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => onFilterChange('category', cat.value)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                filters.category === cat.value
                  ? 'bg-green-600 text-white shadow-md shadow-green-900/30'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-3">Price Range</label>
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
            <input
              type="number"
              placeholder="Min"
              value={filters.priceMin}
              onChange={e => onFilterChange('priceMin', e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-7 pr-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:border-green-600 transition-colors"
            />
          </div>
          <span className="text-slate-600 text-sm">—</span>
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.priceMax}
              onChange={e => onFilterChange('priceMax', e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-7 pr-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:border-green-600 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Date */}
      <div>
        <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-3">Date</label>
        <div className="flex flex-col gap-1.5">
          {DATE_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => onFilterChange('dateFilter', opt.value)}
              className={`text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                filters.dateFilter === opt.value
                  ? 'bg-slate-800 text-green-400 border border-green-800'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-3">Sort By</label>
        <select
          value={filters.sort}
          onChange={e => onFilterChange('sort', e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:border-green-600 transition-colors appearance-none cursor-pointer"
        >
          {SORT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value} className="bg-slate-800 text-slate-200">{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Clear All */}
      {activeCount > 0 && (
        <button
          onClick={onClearAll}
          className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors text-center pt-1 border-t border-slate-800"
        >
          Clear All Filters ({activeCount})
        </button>
      )}
    </div>
  )

  // Desktop
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sticky top-24">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-slate-200 font-semibold text-base">Filters</h2>
            {activeCount > 0 && (
              <span className="bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">{activeCount}</span>
            )}
          </div>
          {content}
        </div>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-animate"
            onClick={onMobileClose}
          />
          {/* Drawer */}
          <div className="absolute top-0 right-0 bottom-0 w-80 max-w-[90vw] bg-slate-900 border-l border-slate-800 shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-slate-800 sticky top-0 bg-slate-900">
              <h2 className="text-slate-200 font-semibold">Filters</h2>
              <button
                onClick={onMobileClose}
                className="text-slate-500 hover:text-white transition-colors p-1"
                aria-label="Close filters"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div className="p-5">
              {content}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

```

---

### `src/components/CartDrawer.jsx`

```jsx
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatCurrency } from '../utils/currency'

export default function CartDrawer() {
  const [open, setOpen] = useState(false)
  const [couponInput, setCouponInput] = useState('')
  const {
    items, pricing, couponDiscount, couponError,
    removeFromCart, updateQuantity, applyCoupon, removeCoupon
  } = useCart()

  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('open-cart-drawer', handler)
    return () => window.removeEventListener('open-cart-drawer', handler)
  }, [])

  // Sync coupon input with applied coupon
  useEffect(() => {
    if (couponDiscount) setCouponInput(couponDiscount.code)
  }, [couponDiscount])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Shopping Cart">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-animate" onClick={() => setOpen(false)} />

      {/* Drawer */}
      <div className="absolute top-0 right-0 bottom-0 w-96 max-w-[92vw] bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <h2 className="text-slate-100 font-semibold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
            Your Cart
            {items.length > 0 && <span className="text-green-400 text-sm font-normal ml-2">({items.length})</span>}
          </h2>
          <button onClick={() => setOpen(false)} className="text-slate-500 hover:text-white transition-colors p-1" aria-label="Close cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="p-4 flex flex-col gap-3">
              {items.map((item, idx) => (
                <CartItem
                  key={`${item.eventId}-${item.zone}`}
                  item={item}
                  onRemove={() => removeFromCart(item.eventId, item.zone)}
                  onQtyChange={(qty) => updateQuantity(item.eventId, item.zone, qty)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer (visible when cart has items) */}
        {items.length > 0 && (
          <div className="border-t border-slate-800 p-5 flex flex-col gap-4">
            {/* Coupon */}
            <div>
              <label className="text-slate-500 text-xs font-semibold uppercase tracking-wide block mb-2">Coupon Code</label>
              {couponDiscount ? (
                <div className="flex items-center justify-between bg-green-900/30 border border-green-800 rounded-lg px-3 py-2">
                  <span className="text-green-400 text-sm font-semibold">{couponDiscount.code} — {couponDiscount.label}</span>
                  <button onClick={removeCoupon} className="text-green-500 hover:text-green-300 text-xs transition-colors">Remove</button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={e => setCouponInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && applyCoupon(couponInput)}
                    placeholder="e.g. SAVE10"
                    className={`flex-1 bg-slate-800 border ${couponError ? 'border-red-700' : 'border-slate-700'} rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:border-green-600 transition-colors`}
                  />
                  <button
                    onClick={() => applyCoupon(couponInput)}
                    className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm font-medium px-4 rounded-lg transition-all"
                  >
                    Apply
                  </button>
                </div>
              )}
              {couponError && <p className="text-red-400 text-xs mt-1.5">{couponError}</p>}
            </div>

            {/* Pricing Summary */}
            <div className="flex flex-col gap-1.5 text-sm">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span><span>{formatCurrency(pricing.subtotal)}</span>
              </div>
              {pricing.discountAmount > 0 && (
                <div className="flex justify-between text-green-400">
                  <span>Discount</span><span>−{formatCurrency(pricing.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400">
                <span>Service Fee</span><span>{formatCurrency(pricing.serviceFee)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Tax</span><span>{formatCurrency(pricing.tax)}</span>
              </div>
              <div className="flex justify-between text-slate-100 font-semibold text-base pt-2 border-t border-slate-800 mt-1">
                <span>Total</span><span className="text-green-400">{formatCurrency(pricing.grandTotal)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <Link
              to="/checkout"
              onClick={() => setOpen(false)}
              className="block text-center bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-green-900/30 hover:shadow-green-900/50"
            >
              Checkout — {formatCurrency(pricing.grandTotal)}
            </Link>
            <Link to="/cart" onClick={() => setOpen(false)} className="text-center text-slate-500 hover:text-slate-300 text-sm transition-colors">
              View full cart →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

function CartItem({ item, onRemove, onQtyChange }) {
  return (
    <div className="flex gap-3 bg-slate-800/50 rounded-xl p-3">
      <img src={item.image} alt={item.title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <h4 className="text-slate-200 text-sm font-medium truncate">{item.title}</h4>
        <p className="text-slate-500 text-xs">{item.zone}</p>
        <div className="flex items-center justify-between mt-2">
          {/* Qty controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onQtyChange(item.quantity - 1)}
              className="w-6 h-6 rounded-md bg-slate-700 hover:bg-slate-600 text-slate-300 flex items-center justify-center text-sm transition-all"
            >−</button>
            <span className="text-slate-200 text-sm w-6 text-center">{item.quantity}</span>
            <button
              onClick={() => onQtyChange(item.quantity + 1)}
              className="w-6 h-6 rounded-md bg-slate-700 hover:bg-slate-600 text-slate-300 flex items-center justify-center text-sm transition-all"
            >+</button>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-green-400 text-sm font-semibold">{formatCurrency(item.price * item.quantity)}</span>
            <button onClick={onRemove} className="text-slate-600 hover:text-red-400 transition-colors" aria-label="Remove item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="3,6 5,6 21,6"/><path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2v2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-20 h-20 rounded-2xl bg-slate-800 flex items-center justify-center mb-5">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
      </div>
      <h3 className="text-slate-300 font-semibold mb-1.5">Your cart is empty</h3>
      <p className="text-slate-500 text-sm leading-relaxed">Browse our events and add tickets to get started.</p>
      <Link to="/events" className="mt-4 text-green-400 hover:text-green-300 text-sm font-medium transition-colors">
        Browse Events →
      </Link>
    </div>
  )
}

```

---

### `src/components/CompareModal.jsx`

```jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { EVENTS } from '../data/events'
import { formatCurrency } from '../utils/currency'
import StarRating from './StarRating'

export default function CompareModal({ compareItems, onClose, onRemove }) {
  if (compareItems.length < 2) return null

  const events = compareItems.map(id => EVENTS.find(e => e.id === id)).filter(Boolean)
  if (events.length < 2) return null

  const fields = [
    { label: 'Price', key: 'price', render: (e) => <span className="text-green-400 font-semibold">{formatCurrency(e.price)}</span> },
    { label: 'Rating', key: 'rating', render: (e) => <div className="flex items-center gap-1.5"><StarRating rating={e.rating} size={14} /><span className="text-slate-400 text-sm">{e.rating}/5</span></div> },
    { label: 'Reviews', key: 'reviewCount', render: (e) => <span className="text-slate-400 text-sm">{e.reviewCount}</span> },
    { label: 'Date', key: 'date', render: (e) => <span className="text-slate-400 text-sm">{e.date} at {e.time}</span> },
    { label: 'Venue', key: 'venue', render: (e) => <span className="text-slate-300 text-sm">{e.venue}</span> },
    { label: 'City', key: 'city', render: (e) => <span className="text-slate-400 text-sm">{e.city}</span> },
    { label: 'Category', key: 'category', render: (e) => <span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-1 rounded-lg capitalize">{e.category}</span> },
    { label: 'Availability', key: 'avail', render: (e) => {
      const total = e.zones.reduce((s, z) => s + z.available, 0)
      if (total === 0) return <span className="text-red-400 text-sm">Sold Out</span>
      if (total <= 5) return <span className="text-amber-400 text-sm">{total} Left</span>
      return <span className="text-green-400 text-sm">Available</span>
    }},
    { label: 'Tags', key: 'tags', render: (e) => (
      <div className="flex flex-wrap gap-1">
        {e.tags.slice(0, 4).map(t => <span key={t} className="bg-slate-800 text-slate-500 text-xs px-2 py-0.5 rounded-full">{t}</span>)}
      </div>
    )}
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/70 backdrop-animate" onClick={onClose} />
      <div className="relative bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 sticky top-0 bg-slate-900 z-1">
          <h2 className="text-slate-100 font-semibold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
            Compare Events
          </h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors" aria-label="Close compare">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="p-6">
          {/* Event headers */}
          <div className={`grid gap-4 mb-6 ${events.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
            {events.map(e => (
              <div key={e.id} className="bg-slate-800/50 rounded-xl p-4 text-center">
                <div className="flex justify-end mb-2">
                  <button onClick={() => onRemove(e.id)} className="text-slate-600 hover:text-red-400 transition-colors text-xs">✕ Remove</button>
                </div>
                <img src={e.images[0]} alt={e.title} className="w-full h-28 object-cover rounded-lg mb-3" />
                <h3 className="text-slate-200 font-semibold text-sm leading-snug text-center">{e.title}</h3>
              </div>
            ))}
          </div>

          {/* Comparison rows */}
          <div className="flex flex-col">
            {fields.map((field, idx) => (
              <div
                key={field.key}
                className={`grid gap-4 items-start py-3 border-b border-slate-800 ${events.length === 2 ? 'grid-cols-3' : 'grid-cols-4'} ${idx % 2 === 0 ? '' : 'bg-slate-800/20'}`}
              >
                <div className="text-slate-500 text-xs font-semibold uppercase tracking-wide pt-0.5">{field.label}</div>
                {events.map(e => (
                  <div key={e.id} className="flex items-center">
                    {field.render(e)}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* View Detail links */}
          <div className={`grid gap-4 mt-6 ${events.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
            {events.map(e => (
              <Link
                key={e.id}
                to={`/events/${e.id}`}
                onClick={onClose}
                className="text-center bg-slate-800 hover:bg-slate-700 text-green-400 text-sm font-medium py-2.5 rounded-lg transition-all"
              >
                View Details →
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

```

---

### `src/pages/Home.jsx`

```jsx
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { EVENTS, CATEGORY_LABELS } from '../data/events'
import EventCard from '../components/EventCard'
import { useLocalStorage } from '../hooks/useLocalStorage'

export default function Home() {
  useEffect(() => {
    document.title = 'EventFlow — Live Event Tickets'
  }, [])

  // Featured = top 3 by popularity
  const featured = [...EVENTS].sort((a, b) => b.popularityScore - a.popularityScore).slice(0, 3)

  // Trending = events with high review count
  const trending = [...EVENTS].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 6)

  // Recently viewed
  const [recentlyViewed] = useLocalStorage('eventflow_recently_viewed', [])
  const recentEvents = recentlyViewed
    .map(id => EVENTS.find(e => e.id === id))
    .filter(Boolean)
    .slice(0, 4)

  const categories = Object.entries(CATEGORY_LABELS)

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className="relative min-h-[420px] flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1400&q=60"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/70 to-slate-950" />
        </div>

        {/* Decorative gradient orb */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-green-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-32 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-full px-3.5 py-1.5 mb-6 fade-up" style={{ animationDelay: '0.1s' }}>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-slate-300 text-sm">Live events happening near you</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight mb-5 fade-up" style={{ fontFamily: "'Playfair Display', serif", animationDelay: '0.2s' }}>
              Discover <span className="text-green-400">unforgettable</span> experiences
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed mb-8 fade-up max-w-lg" style={{ animationDelay: '0.3s' }}>
              Concerts, comedy, workshops, sports & theatre — find and book tickets for the events that matter to you.
            </p>
            <div className="flex flex-wrap gap-3 fade-up" style={{ animationDelay: '0.4s' }}>
              <Link to="/events" className="bg-green-600 hover:bg-green-500 text-white font-semibold px-7 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-green-900/30 hover:shadow-green-900/50">
                Browse All Events
              </Link>
              <Link to="/events?category=concert" className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 text-slate-300 hover:text-white font-medium px-7 py-3 rounded-xl transition-all duration-200">
                Concerts →
              </Link>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-8 mt-14 fade-up" style={{ animationDelay: '0.5s' }}>
            {[
              { label: 'Live Events', value: '200+' },
              { label: 'Cities', value: '50+' },
              { label: 'Happy Attendees', value: '12K+' }
            ].map(stat => (
              <div key={stat.label} className="flex flex-col gap-0.5">
                <span className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{stat.value}</span>
                <span className="text-slate-500 text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Quick Nav */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {[{ value: 'all', label: '🎪 All Events' }, ...categories.map(([v, l]) => ({ value: v, label: `${v === 'concert' ? '🎵' : v === 'comedy' ? '😂' : v === 'workshop' ? '🛠' : v === 'sports' ? '⚽' : '🎭'} ${l}` }))].map(cat => (
            <Link
              key={cat.value}
              to={cat.value === 'all' ? '/events' : `/events?category=${cat.value}`}
              className="flex-shrink-0 bg-slate-900 border border-slate-800 hover:border-slate-600 text-slate-300 hover:text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all duration-200"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <SectionHeader title="Featured Events" subtitle="Handpicked top events this season" link="/events" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {featured.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* Trending Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <SectionHeader title="Trending Now" subtitle="What everyone is talking about" link="/events?sort=popular" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {trending.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* Recently Viewed */}
      {recentEvents.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <SectionHeader title="Recently Viewed" subtitle="Pick up where you left off" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
            {recentEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function SectionHeader({ title, subtitle, link }) {
  return (
    <div className="flex items-end justify-between">
      <div>
        <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</h2>
        {subtitle && <p className="text-slate-500 text-sm mt-1">{subtitle}</p>}
      </div>
      {link && (
        <Link to={link} className="text-green-400 hover:text-green-300 text-sm font-medium transition-colors">
          View All →
        </Link>
      )}
    </div>
  )
}

```

---

### `src/pages/Listing.jsx`

```jsx
import React, { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { EVENTS } from '../data/events'
import { filterEvents, DEFAULT_FILTERS } from '../utils/filters'
import { useDebounce } from '../hooks/useDebounce'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useAnalytics } from '../hooks/useAnalytics'
import FilterSidebar from '../components/FilterSidebar'
import EventCard from '../components/EventCard'
import CompareModal from '../components/CompareModal'
import { ListingSkeleton } from '../components/Skeleton'

const PAGE_SIZE = 6

export default function Listing() {
  useEffect(() => {
    document.title = 'All Events — EventFlow'
  }, [])

  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useLocalStorage('eventflow_filters', DEFAULT_FILTERS)
  const [searchInput, setSearchInput] = useState(filters.search || '')
  const debouncedSearch = useDebounce(searchInput, 350)
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [compareItems, setCompareItems] = useState([])
  const { getPopularityBoost } = useAnalytics()

  // Sync URL params → filters (for category links from Home)
  useEffect(() => {
    const cat = searchParams.get('category')
    const sort = searchParams.get('sort')
    if (cat) setFilters(prev => ({ ...prev, category: cat }))
    if (sort) setFilters(prev => ({ ...prev, sort }))
  }, [searchParams])

  // Sync debounced search → filters
  useEffect(() => {
    setFilters(prev => ({ ...prev, search: debouncedSearch }))
  }, [debouncedSearch])

  // Simulate loading on filter change
  useEffect(() => {
    setLoading(true)
    setVisibleCount(PAGE_SIZE)
    const t = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(t)
  }, [filters])

  const handleFilterChange = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }, [setFilters])

  const handleClearAll = useCallback(() => {
    setFilters(DEFAULT_FILTERS)
    setSearchInput('')
  }, [setFilters])

  const filtered = filterEvents(EVENTS, filters, getPopularityBoost)
  const visible = filtered.slice(0, visibleCount)
  const hasMore = filtered.length > visibleCount

  // Compare
  const toggleCompare = (id) => {
    setCompareItems(prev => {
      if (prev.includes(id)) return prev.filter(i => i !== id)
      if (prev.length >= 3) return prev // max 3
      return [...prev, id]
    })
  }

  const removeCompare = (id) => {
    setCompareItems(prev => prev.filter(i => i !== id))
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Page Header */}
      <div className="bg-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <h1 className="text-3xl font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>All Events</h1>
          <p className="text-slate-500 text-sm">Discover concerts, comedy, workshops, sports & theatre near you</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Top bar: search + mobile filter toggle */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              placeholder="Search events, venues, cities…"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:border-green-600 transition-colors"
            />
            {searchInput && (
              <button
                onClick={() => { setSearchInput(''); setFilters(prev => ({ ...prev, search: '' })) }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}
          </div>

          {/* Mobile filter button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 bg-slate-900 border border-slate-800 text-slate-300 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:border-slate-600"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
            </svg>
            Filters
          </button>
        </div>

        {/* Compare bar */}
        {compareItems.length >= 2 && (
          <div className="mb-4 bg-blue-950/40 border border-blue-900/50 rounded-xl px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-blue-400 text-sm font-medium">Comparing {compareItems.length} events</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCompareItems([])}
                className="text-blue-500 hover:text-blue-300 text-xs transition-colors"
              >Clear</button>
              <button
                onClick={() => {/* modal auto-shows */}}
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-lg transition-all"
              >Compare →</button>
            </div>
          </div>
        )}

        {/* Main layout */}
        <div className="flex gap-6">
          {/* Sidebar */}
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearAll={handleClearAll}
            mobileOpen={mobileFilterOpen}
            onMobileClose={() => setMobileFilterOpen(false)}
          />

          {/* Grid */}
          <div className="flex-1 min-w-0">
            {/* Result count */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-500 text-sm">
                {loading ? '…' : `${filtered.length} event${filtered.length !== 1 ? 's' : ''} found`}
              </span>
            </div>

            {loading ? (
              <ListingSkeleton count={PAGE_SIZE} />
            ) : filtered.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {visible.map(event => (
                    <EventCard
                      key={event.id}
                      event={event}
                      compareItems={compareItems}
                      onToggleCompare={toggleCompare}
                    />
                  ))}
                </div>

                {/* Load More */}
                {hasMore && (
                  <div className="text-center mt-8">
                    <button
                      onClick={() => setVisibleCount(prev => prev + PAGE_SIZE)}
                      className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                    >
                      Load More ({filtered.length - visibleCount} more)
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Compare Modal */}
      {compareItems.length >= 2 && (
        <CompareModal
          compareItems={compareItems}
          onClose={() => setCompareItems([])}
          onRemove={removeCompare}
        />
      )}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mb-5">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="1.5" strokeLinecap="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      </div>
      <h3 className="text-slate-300 font-semibold text-lg mb-1.5">No events found</h3>
      <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
        Try adjusting your filters or search terms. We update our listings daily.
      </p>
    </div>
  )
}

```

---

### `src/pages/Detail.jsx`

```jsx
import React, { useState, useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { EVENTS } from '../data/events'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useAnalytics } from '../hooks/useAnalytics'
import { formatCurrency } from '../utils/currency'
import Breadcrumb from '../components/Breadcrumb'
import StarRating from '../components/StarRating'
import EventCard from '../components/EventCard'
import { DetailSkeleton } from '../components/Skeleton'

export default function Detail() {
  const { id } = useParams()
  const eventId = parseInt(id, 10)
  const event = EVENTS.find(e => e.id === eventId)

  const { addToCart } = useCart()
  const toast = useToast()
  const { trackView, trackAddToCart } = useAnalytics()
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage('eventflow_recently_viewed', [])
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedZone, setSelectedZone] = useState(null)
  const [loading, setLoading] = useState(true)
  const [faqOpen, setFaqOpen] = useState({})

  // Track view & recently viewed
  useEffect(() => {
    if (event) {
      trackView(event.id)
      document.title = `${event.title} — EventFlow`
      // Update recently viewed
      setRecentlyViewed(prev => {
        const filtered = prev.filter(eid => eid !== event.id)
        return [event.id, ...filtered].slice(0, 10)
      })
    }
  }, [event])

  // Simulate loading
  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [eventId])

  if (!event) return <Navigate to="/404" replace />
  if (loading) return <div className="min-h-screen bg-slate-950 pt-20"><DetailSkeleton /></div>

  const totalAvailable = event.zones.reduce((s, z) => s + z.available, 0)
  const availableZones = event.zones.filter(z => z.available > 0)

  // Related events: same category, exclude current
  const related = EVENTS
    .filter(e => e.category === event.category && e.id !== event.id)
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, 4)

  const avgRating = event.reviews.length
    ? (event.reviews.reduce((s, r) => s + r.rating, 0) / event.reviews.length).toFixed(1)
    : event.rating

  const handleAddToCart = () => {
    if (!selectedZone) {
      toast.warning('Please select a seating zone first.')
      return
    }
    if (selectedZone.available <= 0) {
      toast.error('This zone is sold out.')
      return
    }
    addToCart({
      eventId: event.id,
      title: event.title,
      zone: selectedZone.name,
      price: selectedZone.price,
      quantity: 1,
      image: event.images[0]
    })
    trackAddToCart(event.id)
    toast.success(`"${event.title}" (${selectedZone.name}) added to cart!`)
  }

  const toggleFaq = (idx) => {
    setFaqOpen(prev => ({ ...prev, [idx]: !prev[idx] }))
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-20">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb items={[
            { label: 'Home', to: '/' },
            { label: 'Events', to: '/events' },
            { label: event.title }
          ]} />
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Gallery + Details */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Image Gallery */}
            <div className="flex flex-col gap-3">
              <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-video">
                <img
                  src={event.images[selectedImage]}
                  alt={`${event.title} - image ${selectedImage + 1}`}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
                {/* Nav arrows */}
                {event.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage(i => (i - 1 + event.images.length) % event.images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all"
                      aria-label="Previous image"
                    >◀</button>
                    <button
                      onClick={() => setSelectedImage(i => (i + 1) % event.images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all"
                      aria-label="Next image"
                    >▶</button>
                  </>
                )}
                <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-lg">
                  {selectedImage + 1} / {event.images.length}
                </span>
              </div>
              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {event.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === idx ? 'border-green-500 opacity-100' : 'border-transparent opacity-50 hover:opacity-75'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-slate-200 font-semibold text-lg mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>About This Event</h2>
              <p className="text-slate-400 leading-relaxed">{event.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {event.tags.map(tag => (
                  <span key={tag} className="bg-slate-800 text-slate-400 text-xs px-3 py-1 rounded-full border border-slate-700">{tag}</span>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-slate-200 font-semibold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>Reviews</h2>
                <div className="flex items-center gap-2">
                  <span className="text-green-400 font-bold text-lg">{avgRating}</span>
                  <StarRating rating={parseFloat(avgRating)} size={16} />
                  <span className="text-slate-500 text-sm">({event.reviews.length})</span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {event.reviews.map(review => (
                  <div key={review.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center text-slate-300 text-xs font-bold">
                          {review.author[0]}
                        </div>
                        <div>
                          <span className="text-slate-200 text-sm font-medium">{review.author}</span>
                          <span className="text-slate-600 text-xs ml-2">{review.date}</span>
                        </div>
                      </div>
                      <StarRating rating={review.rating} size={13} />
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed ml-11">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div>
              <h2 className="text-slate-200 font-semibold text-lg mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Frequently Asked Questions</h2>
              <div className="flex flex-col gap-2">
                {event.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex items-center justify-between px-4 py-3.5 text-left transition-colors hover:bg-slate-800/40"
                    >
                      <span className="text-slate-200 text-sm font-medium">{faq.q}</span>
                      <svg
                        width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        className={`text-slate-500 transition-transform duration-300 flex-shrink-0 ml-3 ${faqOpen[idx] ? 'rotate-180' : ''}`}
                      >
                        <polyline points="6,9 12,15 18,9" />
                      </svg>
                    </button>
                    {faqOpen[idx] && (
                      <div className="px-4 pb-3.5 slide-down">
                        <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Sticky booking card */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sticky top-24">
              {/* Event Quick Info */}
              <div className="mb-5">
                <span className="bg-slate-800 text-slate-400 text-xs font-medium px-2.5 py-1 rounded-lg capitalize">{event.category}</span>
                <h3 className="text-slate-100 font-bold text-xl mt-3 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>{event.title}</h3>
                <div className="flex items-center gap-1.5 mt-2">
                  <StarRating rating={event.rating} size={14} />
                  <span className="text-slate-400 text-sm">{event.rating} ({event.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Date / Venue */}
              <div className="flex flex-col gap-2 mb-5 pb-5 border-b border-slate-800">
                <div className="flex items-center gap-2.5 text-slate-400 text-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <span>{event.date} at {event.time}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-400 text-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span>{event.venue}, {event.city}</span>
                </div>
              </div>

              {/* Zone Selector */}
              <div className="mb-5">
                <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-3">Select Zone</label>
                <div className="flex flex-col gap-2">
                  {event.zones.map((zone, idx) => {
                    const isSoldOut = zone.available <= 0
                    const isLow = zone.available > 0 && zone.available <= 5
                    const isSelected = selectedZone?.name === zone.name
                    return (
                      <button
                        key={idx}
                        onClick={() => !isSoldOut && setSelectedZone(zone)}
                        disabled={isSoldOut}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-200 ${
                          isSoldOut
                            ? 'bg-slate-800/30 border-slate-800 opacity-40 cursor-not-allowed'
                            : isSelected
                              ? 'bg-green-900/30 border-green-600 shadow-md shadow-green-900/20'
                              : 'bg-slate-800/40 border-slate-700 hover:border-slate-500'
                        }`}
                      >
                        <div className="text-left">
                          <span className={`text-sm font-medium ${isSelected ? 'text-green-400' : 'text-slate-200'}`}>{zone.name}</span>
                          {isSoldOut && <span className="block text-red-400 text-xs mt-0.5">Sold Out</span>}
                          {isLow && <span className="block text-amber-400 text-xs mt-0.5">Only {zone.available} left!</span>}
                        </div>
                        <span className={`text-sm font-bold ${isSelected ? 'text-green-400' : 'text-slate-300'}`}>
                          {formatCurrency(zone.price)}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Availability indicator */}
              <div className="flex items-center gap-2 mb-5">
                {totalAvailable === 0 ? (
                  <><span className="w-2 h-2 rounded-full bg-red-500"></span><span className="text-red-400 text-sm">Sold Out</span></>
                ) : totalAvailable <= 5 ? (
                  <><span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span><span className="text-amber-400 text-sm">Low stock — {totalAvailable} tickets left</span></>
                ) : (
                  <><span className="w-2 h-2 rounded-full bg-green-400"></span><span className="text-green-400 text-sm">Tickets available</span></>
                )}
              </div>

              {/* CTA */}
              <button
                onClick={handleAddToCart}
                disabled={totalAvailable === 0}
                className={`w-full py-3 rounded-xl font-semibold text-base transition-all duration-200 ${
                  totalAvailable === 0
                    ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/30 hover:shadow-green-900/50'
                }`}
              >
                {totalAvailable === 0 ? 'Sold Out' : selectedZone ? `Add to Cart — ${formatCurrency(selectedZone.price)}` : 'Select a Zone'}
              </button>

              {/* Price note */}
              <p className="text-slate-600 text-xs text-center mt-3">* Service fee & tax applied at checkout</p>
            </div>
          </div>
        </div>

        {/* You May Also Like */}
        {related.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>You May Also Like</h2>
              <Link to="/events" className="text-green-400 hover:text-green-300 text-sm font-medium transition-colors">View All →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map(evt => <EventCard key={evt.id} event={evt} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

```

---

### `src/pages/Cart.jsx`

```jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatCurrency } from '../utils/currency'
import { EVENTS } from '../data/events'
import EventCard from '../components/EventCard'
import { useState, useEffect } from 'react'

export default function Cart() {
  const [couponInput, setCouponInput] = useState('')
  const {
    items, pricing, couponDiscount, couponError,
    removeFromCart, updateQuantity, applyCoupon, removeCoupon
  } = useCart()

  useEffect(() => {
    document.title = 'Cart — EventFlow'
    if (couponDiscount) setCouponInput(couponDiscount.code)
  }, [couponDiscount])

  // Suggested items = top popular events not in cart
  const cartEventIds = items.map(i => i.eventId)
  const suggested = EVENTS
    .filter(e => !cartEventIds.includes(e.id))
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-20">
        <h1 className="text-3xl font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Shopping Cart</h1>
        <p className="text-slate-500 text-sm mb-8">{items.length} item{items.length !== 1 ? 's' : ''} in your cart</p>

        {items.length === 0 ? (
          <EmptyCartPage suggested={suggested} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items list */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {items.map(item => (
                <div key={`${item.eventId}-${item.zone}`} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex gap-5">
                  <img src={item.image} alt={item.title} className="w-24 h-24 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h3 className="text-slate-100 font-semibold truncate">{item.title}</h3>
                      <p className="text-slate-500 text-sm mt-0.5">Zone: {item.zone}</p>
                    </div>
                    <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                      {/* Qty */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.eventId, item.zone, item.quantity - 1)}
                          className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-all"
                        >−</button>
                        <span className="text-slate-100 font-medium w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.eventId, item.zone, item.quantity + 1)}
                          className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-all"
                        >+</button>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-green-400 font-bold text-lg">{formatCurrency(item.price * item.quantity)}</span>
                        <button
                          onClick={() => removeFromCart(item.eventId, item.zone)}
                          className="text-slate-600 hover:text-red-400 transition-colors"
                          aria-label="Remove"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <polyline points="3,6 5,6 21,6"/><path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2v2"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sticky top-24">
                <h2 className="text-slate-100 font-semibold text-lg mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>Order Summary</h2>

                {/* Coupon */}
                <div className="mb-5">
                  <label className="text-slate-500 text-xs font-semibold uppercase tracking-wider block mb-2">Coupon Code</label>
                  {couponDiscount ? (
                    <div className="flex items-center justify-between bg-green-900/30 border border-green-800 rounded-lg px-3 py-2.5">
                      <span className="text-green-400 text-sm font-semibold">{couponDiscount.code}</span>
                      <button onClick={removeCoupon} className="text-green-500 hover:text-green-300 text-xs">Remove</button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={e => setCouponInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && applyCoupon(couponInput)}
                        placeholder="e.g. SAVE10"
                        className={`flex-1 bg-slate-800 border ${couponError ? 'border-red-700' : 'border-slate-700'} rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:border-green-600 transition-colors`}
                      />
                      <button
                        onClick={() => applyCoupon(couponInput)}
                        className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm font-medium px-4 rounded-lg transition-all"
                      >Apply</button>
                    </div>
                  )}
                  {couponError && <p className="text-red-400 text-xs mt-1.5">{couponError}</p>}
                </div>

                {/* Pricing */}
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal</span><span>{formatCurrency(pricing.subtotal)}</span>
                  </div>
                  {pricing.discountAmount > 0 && (
                    <div className="flex justify-between text-green-400">
                      <span>Discount ({couponDiscount?.label})</span><span>−{formatCurrency(pricing.discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-400">
                    <span>Service Fee (12%)</span><span>{formatCurrency(pricing.serviceFee)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Tax (8%)</span><span>{formatCurrency(pricing.tax)}</span>
                  </div>
                  <div className="flex justify-between text-slate-100 font-semibold text-base pt-3 border-t border-slate-800 mt-2">
                    <span>Grand Total</span><span className="text-green-400">{formatCurrency(pricing.grandTotal)}</span>
                  </div>
                </div>

                {/* Checkout */}
                <Link
                  to="/checkout"
                  className="block mt-6 text-center bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-green-900/30"
                >
                  Proceed to Checkout
                </Link>
                <Link to="/events" className="block mt-3 text-center text-slate-500 hover:text-slate-300 text-sm transition-colors">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Suggested items */}
        {suggested.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-white mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
              {items.length === 0 ? 'You might enjoy' : 'You may also like'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {suggested.map(event => <EventCard key={event.id} event={event} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function EmptyCartPage({ suggested }) {
  return (
    <div className="flex flex-col items-center py-16 text-center">
      <div className="w-24 h-24 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-6">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
      </div>
      <h2 className="text-slate-200 font-bold text-xl mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Your cart is empty</h2>
      <p className="text-slate-500 text-sm max-w-md leading-relaxed">
        Start exploring events and add tickets you love. Your cart will appear here.
      </p>
      <Link to="/events" className="mt-5 bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-2.5 rounded-xl transition-all shadow-md shadow-green-900/30">
        Browse Events
      </Link>
    </div>
  )
}

```

---

### `src/pages/Checkout.jsx`

```jsx
import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { mockStripeCharge } from '../utils/stripe'
import { validateCheckoutAddress } from '../utils/validation'
import { formatCurrency } from '../utils/currency'

const STEPS = ['Address', 'Payment', 'Review', 'Success']

export default function Checkout() {
  const { items, pricing, clearCart } = useCart()
  const { user } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [addressData, setAddressData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    address: '', city: '', state: '', zip: ''
  })
  const [addressErrors, setAddressErrors] = useState({})
  const [paymentData, setPaymentData] = useState({ cardNumber: '', expiry: '', cvc: '', nameOnCard: '' })
  const [paymentError, setPaymentError] = useState('')
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [order, setOrder] = useState(null)

  useEffect(() => {
    document.title = `Checkout — Step ${step + 1} — EventFlow`
  }, [step])

  useEffect(() => {
    if (items.length === 0 && step < 3) {
      navigate('/cart')
    }
  }, [items.length, step])

  // --- Step 0: Address ---
  const handleAddressSubmit = () => {
    const errors = validateCheckoutAddress(addressData)
    if (Object.keys(errors).length > 0) {
      setAddressErrors(errors)
      return
    }
    setAddressErrors({})
    setStep(1)
  }

  // --- Step 1: Payment ---
  const formatCardNumber = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 16)
    return digits.replace(/(.{4})/g, '$1 ').trim()
  }

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 4)
    if (digits.length >= 2) return digits.slice(0, 2) + '/' + digits.slice(2)
    return digits
  }

  const handlePaymentSubmit = async () => {
    setPaymentError('')
    setPaymentLoading(true)

    const result = await mockStripeCharge({
      cardNumber: paymentData.cardNumber,
      expiry: paymentData.expiry,
      cvc: paymentData.cvc,
      amount: Math.round(pricing.grandTotal * 100)
    })

    setPaymentLoading(false)

    if (!result.success) {
      setPaymentError(result.error)
      return
    }

    // Generate order
    const newOrder = {
      id: 'ORD-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
      paymentIntentId: result.paymentIntentId,
      items: [...items],
      pricing: { ...pricing },
      address: { ...addressData },
      createdAt: new Date().toISOString(),
      userId: user?.id
    }
    setOrder(newOrder)

    // Save to orders history in localStorage
    try {
      const existing = JSON.parse(window.localStorage.getItem('eventflow_orders') || '[]')
      existing.unshift(newOrder)
      window.localStorage.setItem('eventflow_orders', JSON.stringify(existing))
    } catch (e) {
      console.error('Failed to save order:', e)
    }

    clearCart()
    setStep(3)
    toast.success('Payment successful! Your order is confirmed.')
  }

  // --- Render ---
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-20">
        {/* Step indicator */}
        <div className="flex items-center justify-center mb-10">
          <div className="flex items-center gap-0">
            {STEPS.map((s, idx) => (
              <React.Fragment key={s}>
                <div className={`flex flex-col items-center`}>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    idx < step ? 'bg-green-600 text-white' :
                    idx === step ? 'bg-green-600 text-white ring-4 ring-green-900/40' :
                    'bg-slate-800 text-slate-500'
                  }`}>
                    {idx < step ? '✓' : idx + 1}
                  </div>
                  <span className={`text-xs mt-1.5 font-medium ${idx === step ? 'text-green-400' : 'text-slate-600'}`}>{s}</span>
                </div>
                {idx < STEPS.length - 1 && (
                  <div className={`w-12 h-0.5 mx-1 mb-5 rounded-full transition-all duration-500 ${idx < step ? 'bg-green-600' : 'bg-slate-800'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {step === 0 && (
              <AddressStep
                data={addressData}
                errors={addressErrors}
                onChange={setAddressData}
                onSubmit={handleAddressSubmit}
              />
            )}
            {step === 1 && (
              <PaymentStep
                data={paymentData}
                error={paymentError}
                loading={paymentLoading}
                onChange={setPaymentData}
                onSubmit={handlePaymentSubmit}
                onBack={() => setStep(0)}
                formatCardNumber={formatCardNumber}
                formatExpiry={formatExpiry}
              />
            )}
            {step === 2 && (
              <ReviewStep
                addressData={addressData}
                items={items}
                pricing={pricing}
                onBack={() => setStep(1)}
                onConfirm={handlePaymentSubmit}
              />
            )}
            {step === 3 && order && (
              <SuccessStep order={order} />
            )}
          </div>

          {/* Order summary sidebar */}
          {step < 3 && (
            <div className="lg:col-span-1">
              <OrderSummary items={items} pricing={pricing} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// --- Sub-components ---

function AddressStep({ data, errors, onChange, onSubmit }) {
  const fields = [
    { key: 'firstName', label: 'First Name', placeholder: 'John', half: true },
    { key: 'lastName', label: 'Last Name', placeholder: 'Doe', half: true },
    { key: 'email', label: 'Email Address', placeholder: 'john@example.com', half: false },
    { key: 'address', label: 'Street Address', placeholder: '123 Main St', half: false },
    { key: 'city', label: 'City', placeholder: 'New York', half: true },
    { key: 'state', label: 'State', placeholder: 'NY', half: true },
    { key: 'zip', label: 'ZIP Code', placeholder: '10001', half: true }
  ]

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <h2 className="text-slate-100 font-semibold text-xl mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Attendee Information</h2>
      <p className="text-slate-500 text-sm mb-6">Enter the details for the ticket holder.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map(f => (
          <div key={f.key} className={f.half ? '' : 'sm:col-span-2'}>
            <label className="text-slate-400 text-sm block mb-1.5">{f.label}</label>
            <input
              type={f.key === 'email' ? 'email' : 'text'}
              value={data[f.key]}
              onChange={e => onChange(prev => ({ ...prev, [f.key]: e.target.value }))}
              placeholder={f.placeholder}
              className={`w-full bg-slate-800 border ${errors[f.key] ? 'border-red-700' : 'border-slate-700'} rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:border-green-600 transition-colors`}
            />
            {errors[f.key] && <p className="text-red-400 text-xs mt-1.5">{errors[f.key]}</p>}
          </div>
        ))}
      </div>
      <button onClick={onSubmit} className="w-full mt-6 bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-xl transition-all shadow-md shadow-green-900/30">
        Continue to Payment →
      </button>
    </div>
  )
}

function PaymentStep({ data, error, loading, onChange, onSubmit, onBack, formatCardNumber, formatExpiry }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <h2 className="text-slate-100 font-semibold text-xl mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Payment Details</h2>
      <p className="text-slate-500 text-sm mb-2">Simulated Stripe payment. Use test card numbers below.</p>

      {/* Test cards hint */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 mb-5">
        <p className="text-slate-500 text-xs font-semibold mb-1.5">Test Card Numbers:</p>
        <p className="text-green-400 text-xs font-mono">4242 4242 4242 4242 → Success</p>
        <p className="text-red-400 text-xs font-mono">4000 0000 0000 0002 → Declined</p>
        <p className="text-amber-400 text-xs font-mono">4000 0000 0000 9995 → Insufficient Funds</p>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label className="text-slate-400 text-sm block mb-1.5">Name on Card</label>
          <input
            type="text"
            value={data.nameOnCard}
            onChange={e => onChange(prev => ({ ...prev, nameOnCard: e.target.value }))}
            placeholder="John Doe"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:border-green-600 transition-colors"
          />
        </div>
        <div>
          <label className="text-slate-400 text-sm block mb-1.5">Card Number</label>
          <input
            type="text"
            value={data.cardNumber}
            onChange={e => onChange(prev => ({ ...prev, cardNumber: formatCardNumber(e.target.value) }))}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:border-green-600 transition-colors font-mono tracking-wider"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-slate-400 text-sm block mb-1.5">Expiry (MM/YY)</label>
            <input
              type="text"
              value={data.expiry}
              onChange={e => onChange(prev => ({ ...prev, expiry: formatExpiry(e.target.value) }))}
              placeholder="MM/YY"
              maxLength={5}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:border-green-600 transition-colors font-mono"
            />
          </div>
          <div>
            <label className="text-slate-400 text-sm block mb-1.5">CVC</label>
            <input
              type="text"
              value={data.cvc}
              onChange={e => onChange(prev => ({ ...prev, cvc: e.target.value.replace(/\D/g, '').slice(0, 3) }))}
              placeholder="123"
              maxLength={3}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:border-green-600 transition-colors font-mono"
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 bg-red-900/30 border border-red-800 rounded-lg px-4 py-3">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <div className="flex gap-3 mt-6">
        <button onClick={onBack} className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-medium transition-all">
          ← Back
        </button>
        <button
          onClick={onSubmit}
          disabled={loading}
          className="flex-1 bg-green-600 hover:bg-green-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold py-2.5 rounded-xl transition-all shadow-md shadow-green-900/30"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Processing…
            </span>
          ) : 'Pay Now'}
        </button>
      </div>
    </div>
  )
}

function ReviewStep({ addressData, items, pricing, onBack, onConfirm }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <h2 className="text-slate-100 font-semibold text-xl mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>Review Your Order</h2>

      {/* Items */}
      <div className="flex flex-col gap-3 mb-5">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 bg-slate-800/50 rounded-xl p-3">
            <img src={item.image} alt={item.title} className="w-14 h-14 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <p className="text-slate-200 text-sm font-medium truncate">{item.title}</p>
              <p className="text-slate-500 text-xs">{item.zone} × {item.quantity}</p>
            </div>
            <span className="text-green-400 font-semibold text-sm">{formatCurrency(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>

      {/* Address summary */}
      <div className="bg-slate-800/50 rounded-xl p-4 mb-5">
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wide mb-2">Shipping To</p>
        <p className="text-slate-300 text-sm">{addressData.firstName} {addressData.lastName}</p>
        <p className="text-slate-500 text-sm">{addressData.address}, {addressData.city}, {addressData.state} {addressData.zip}</p>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-medium transition-all">← Back</button>
        <button onClick={onConfirm} className="flex-1 bg-green-600 hover:bg-green-500 text-white font-semibold py-2.5 rounded-xl transition-all shadow-md shadow-green-900/30">
          Confirm & Pay {formatCurrency(pricing.grandTotal)}
        </button>
      </div>
    </div>
  )
}

function SuccessStep({ order }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
      <div className="w-20 h-20 rounded-full bg-green-900/40 border-2 border-green-600 flex items-center justify-center mx-auto mb-6">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20,6 9,17 4,12" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Order Confirmed!</h2>
      <p className="text-slate-500 text-sm mb-5">Your payment was successful. Enjoy the event!</p>

      <div className="bg-slate-800/50 rounded-xl p-4 mb-5 text-left">
        <div className="flex justify-between mb-2">
          <span className="text-slate-500 text-sm">Order ID</span>
          <span className="text-slate-200 text-sm font-mono font-semibold">{order.id}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500 text-sm">Total Charged</span>
          <span className="text-green-400 font-bold">{formatCurrency(order.pricing.grandTotal)}</span>
        </div>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-2 mb-6 text-left">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between text-sm">
            <span className="text-slate-400">{item.title} ({item.zone}) × {item.quantity}</span>
            <span className="text-slate-300">{formatCurrency(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/account" className="bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-2.5 rounded-xl transition-all shadow-md shadow-green-900/30">
          View My Orders
        </Link>
        <Link to="/events" className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium px-6 py-2.5 rounded-xl transition-all">
          Browse More Events
        </Link>
      </div>
    </div>
  )
}

function OrderSummary({ items, pricing }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sticky top-24">
      <h3 className="text-slate-200 font-semibold mb-4">Order Summary</h3>
      <div className="flex flex-col gap-2 mb-4 max-h-48 overflow-y-auto">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2.5">
            <img src={item.image} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-slate-300 text-xs truncate">{item.title}</p>
              <p className="text-slate-600 text-xs">{item.zone} × {item.quantity}</p>
            </div>
            <span className="text-slate-400 text-xs font-medium">{formatCurrency(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-800 pt-3 flex flex-col gap-1.5 text-sm">
        <div className="flex justify-between text-slate-500"><span>Subtotal</span><span>{formatCurrency(pricing.subtotal)}</span></div>
        {pricing.discountAmount > 0 && <div className="flex justify-between text-green-400"><span>Discount</span><span>−{formatCurrency(pricing.discountAmount)}</span></div>}
        <div className="flex justify-between text-slate-500"><span>Service Fee</span><span>{formatCurrency(pricing.serviceFee)}</span></div>
        <div className="flex justify-between text-slate-500"><span>Tax</span><span>{formatCurrency(pricing.tax)}</span></div>
        <div className="flex justify-between text-slate-100 font-semibold pt-2 border-t border-slate-800 mt-1">
          <span>Total</span><span className="text-green-400">{formatCurrency(pricing.grandTotal)}</span>
        </div>
      </div>
    </div>
  )
}

```

---

### `src/pages/Login.jsx`

```jsx
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { validateLoginForm } from '../utils/validation'

export default function Login() {
  const { login, error: authError, loading, isLoggedIn, clearError } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    document.title = 'Log In — EventFlow'
    return () => clearError()
  }, [clearError])

  useEffect(() => {
    if (isLoggedIn) {
      const from = location.state?.from?.pathname || '/'
      navigate(from, { replace: true })
    }
  }, [isLoggedIn, navigate, location])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateLoginForm(form)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    await login(form.email, form.password)
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-md shadow-green-900/30">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
            <span className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Event<span className="text-green-400">Flow</span>
            </span>
          </Link>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <h1 className="text-slate-100 font-bold text-2xl text-center mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Welcome back</h1>
          <p className="text-slate-500 text-sm text-center mb-6">Sign in to your account to continue</p>

          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="mb-4">
              <label className="text-slate-400 text-sm block mb-1.5">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={e => { setForm(p => ({ ...p, email: e.target.value })); setErrors(p => ({ ...p, email: undefined })) }}
                placeholder="you@example.com"
                autoComplete="email"
                className={`w-full bg-slate-800 border ${errors.email || authError ? 'border-red-700' : 'border-slate-700'} rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:border-green-600 transition-colors`}
              />
              {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="text-slate-400 text-sm block mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => { setForm(p => ({ ...p, password: e.target.value })); setErrors(p => ({ ...p, password: undefined })) }}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className={`w-full bg-slate-800 border ${errors.password || authError ? 'border-red-700' : 'border-slate-700'} rounded-xl px-4 py-3 pr-12 text-sm text-slate-200 placeholder-slate-600 focus:border-green-600 transition-colors`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    {showPassword ? (
                      <>
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </>
                    ) : (
                      <>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </>
                    )}
                  </svg>
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1.5">{errors.password}</p>}
            </div>

            {/* Auth error */}
            {authError && (
              <div className="bg-red-900/30 border border-red-800 rounded-lg px-4 py-3 mb-4">
                <p className="text-red-400 text-sm">{authError}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold py-3 rounded-xl transition-all shadow-md shadow-green-900/30"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing in…
                </span>
              ) : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-green-400 hover:text-green-300 font-medium transition-colors">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

```

---

### `src/pages/Signup.jsx`

```jsx
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { validateSignupForm } from '../utils/validation'

function getPasswordStrength(pw) {
  if (!pw) return { score: 0, label: '', color: 'bg-slate-700' }
  let score = 0
  if (pw.length >= 8) score++
  if (/[A-Z]/.test(pw)) score++
  if (/[a-z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++

  if (score <= 2) return { score, label: 'Weak', color: 'bg-red-600' }
  if (score === 3) return { score, label: 'Fair', color: 'bg-amber-500' }
  if (score === 4) return { score, label: 'Good', color: 'bg-blue-500' }
  return { score, label: 'Strong', color: 'bg-green-500' }
}

export default function Signup() {
  const { signup, error: authError, loading, isLoggedIn, clearError } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    document.title = 'Sign Up — EventFlow'
    return () => clearError()
  }, [clearError])

  useEffect(() => {
    if (isLoggedIn) navigate('/', { replace: true })
  }, [isLoggedIn, navigate])

  const strength = getPasswordStrength(form.password)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateSignupForm(form)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    await signup(form.name, form.email, form.password)
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-md shadow-green-900/30">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
            <span className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Event<span className="text-green-400">Flow</span>
            </span>
          </Link>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <h1 className="text-slate-100 font-bold text-2xl text-center mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Create account</h1>
          <p className="text-slate-500 text-sm text-center mb-6">Join EventFlow and get exclusive access to events</p>

          <form onSubmit={handleSubmit} noValidate>
            {/* Name */}
            <div className="mb-4">
              <label className="text-slate-400 text-sm block mb-1.5">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={e => { setForm(p => ({ ...p, name: e.target.value })); setErrors(p => ({ ...p, name: undefined })) }}
                placeholder="John Doe"
                autoComplete="name"
                className={`w-full bg-slate-800 border ${errors.name ? 'border-red-700' : 'border-slate-700'} rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:border-green-600 transition-colors`}
              />
              {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="text-slate-400 text-sm block mb-1.5">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={e => { setForm(p => ({ ...p, email: e.target.value })); setErrors(p => ({ ...p, email: undefined })) }}
                placeholder="you@example.com"
                autoComplete="email"
                className={`w-full bg-slate-800 border ${errors.email || authError ? 'border-red-700' : 'border-slate-700'} rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:border-green-600 transition-colors`}
              />
              {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="mb-2">
              <label className="text-slate-400 text-sm block mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => { setForm(p => ({ ...p, password: e.target.value })); setErrors(p => ({ ...p, password: undefined })) }}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className={`w-full bg-slate-800 border ${errors.password ? 'border-red-700' : 'border-slate-700'} rounded-xl px-4 py-3 pr-12 text-sm text-slate-200 placeholder-slate-600 focus:border-green-600 transition-colors`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    {showPassword ? (
                      <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
                    ) : (
                      <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
                    )}
                  </svg>
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1.5">{errors.password}</p>}
            </div>

            {/* Password strength */}
            {form.password && (
              <div className="mb-4">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength.score ? strength.color : 'bg-slate-700'}`} />
                  ))}
                </div>
                <p className={`text-xs ${strength.score <= 2 ? 'text-red-400' : strength.score === 3 ? 'text-amber-400' : strength.score === 4 ? 'text-blue-400' : 'text-green-400'}`}>
                  {strength.label} password
                </p>
              </div>
            )}

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="text-slate-400 text-sm block mb-1.5">Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.confirmPassword}
                onChange={e => { setForm(p => ({ ...p, confirmPassword: e.target.value })); setErrors(p => ({ ...p, confirmPassword: undefined })) }}
                placeholder="••••••••"
                autoComplete="new-password"
                className={`w-full bg-slate-800 border ${errors.confirmPassword ? 'border-red-700' : 'border-slate-700'} rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:border-green-600 transition-colors`}
              />
              {errors.confirmPassword && <p className="text-red-400 text-xs mt-1.5">{errors.confirmPassword}</p>}
            </div>

            {/* Auth error */}
            {authError && (
              <div className="bg-red-900/30 border border-red-800 rounded-lg px-4 py-3 mb-4">
                <p className="text-red-400 text-sm">{authError}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold py-3 rounded-xl transition-all shadow-md shadow-green-900/30"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating account…
                </span>
              ) : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-green-400 hover:text-green-300 font-medium transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

```

---

### `src/pages/Account.jsx`

```jsx
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { EVENTS } from '../data/events'
import { formatCurrency } from '../utils/currency'
import EventCard from '../components/EventCard'

export default function Account() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('orders')
  const [orders] = useLocalStorage('eventflow_orders', [])
  const [wishlist] = useLocalStorage('eventflow_wishlist', [])

  useEffect(() => {
    document.title = 'My Account — EventFlow'
  }, [])

  const wishlistEvents = wishlist
    .map(id => EVENTS.find(e => e.id === id))
    .filter(Boolean)

  const TABS = [
    { id: 'orders', label: 'Orders', count: orders.length },
    { id: 'wishlist', label: 'Wishlist', count: wishlistEvents.length },
    { id: 'profile', label: 'Profile' }
  ]

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-20">
        {/* Profile header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-green-900/30">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{user?.name}</h1>
            <p className="text-slate-500 text-sm">{user?.email}</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-red-400 rounded-xl text-sm font-medium border border-slate-700 transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-slate-800">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-t-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-green-400 border-b-2 border-green-500'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {tab.label}
              {tab.count !== undefined && tab.count > 0 && (
                <span className="bg-slate-800 text-slate-400 text-xs px-2 py-0.5 rounded-full">{tab.count}</span>
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 'orders' && <OrdersTab orders={orders} />}
        {activeTab === 'wishlist' && <WishlistTab events={wishlistEvents} />}
        {activeTab === 'profile' && <ProfileTab user={user} />}
      </div>
    </div>
  )
}

function OrdersTab({ orders }) {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center py-16 text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center mb-5">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="1.5" strokeLinecap="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
        </div>
        <h3 className="text-slate-300 font-semibold mb-1.5">No orders yet</h3>
        <p className="text-slate-500 text-sm max-w-sm">Your past orders will appear here after your first purchase.</p>
        <Link to="/events" className="mt-4 text-green-400 hover:text-green-300 text-sm font-medium transition-colors">Browse Events →</Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {orders.map(order => (
        <div key={order.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div>
              <span className="text-slate-200 font-semibold font-mono text-sm">{order.id}</span>
              <span className="text-slate-600 text-xs ml-3">{new Date(order.createdAt).toLocaleDateString()}</span>
            </div>
            <span className="bg-green-900/40 text-green-400 text-xs font-semibold px-3 py-1 rounded-full border border-green-800">Confirmed</span>
          </div>

          <div className="flex flex-col gap-2 mb-4">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <img src={item.image} alt={item.title} className="w-12 h-12 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-slate-300 text-sm truncate">{item.title}</p>
                  <p className="text-slate-500 text-xs">{item.zone} × {item.quantity}</p>
                </div>
                <span className="text-slate-400 text-sm font-medium">{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end pt-3 border-t border-slate-800">
            <span className="text-slate-500 text-sm mr-2">Total:</span>
            <span className="text-green-400 font-bold">{formatCurrency(order.pricing.grandTotal)}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function WishlistTab({ events }) {
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center py-16 text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center mb-5">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="1.5" strokeLinecap="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </div>
        <h3 className="text-slate-300 font-semibold mb-1.5">No wishlisted events</h3>
        <p className="text-slate-500 text-sm max-w-sm">Click the heart icon on any event to save it here.</p>
        <Link to="/events" className="mt-4 text-green-400 hover:text-green-300 text-sm font-medium transition-colors">Browse Events →</Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {events.map(event => <EventCard key={event.id} event={event} />)}
    </div>
  )
}

function ProfileTab({ user }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg">
      <h2 className="text-slate-200 font-semibold text-lg mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>Profile Details</h2>
      <div className="flex flex-col gap-4">
        <div>
          <label className="text-slate-500 text-xs font-semibold uppercase tracking-wider block mb-1.5">Name</label>
          <p className="text-slate-200">{user?.name}</p>
        </div>
        <div>
          <label className="text-slate-500 text-xs font-semibold uppercase tracking-wider block mb-1.5">Email</label>
          <p className="text-slate-200">{user?.email}</p>
        </div>
        <div>
          <label className="text-slate-500 text-xs font-semibold uppercase tracking-wider block mb-1.5">Account ID</label>
          <p className="text-slate-500 font-mono text-sm">{user?.id}</p>
        </div>
      </div>
    </div>
  )
}

```

---

### `src/pages/NotFound.jsx`

```jsx
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  useEffect(() => {
    document.title = '404 — Page Not Found — EventFlow'
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4 py-20 text-center">
      {/* Giant 404 */}
      <div className="relative mb-6">
        <h1
          className="text-9xl font-bold text-slate-800 select-none"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: '12rem', lineHeight: 1 }}
        >
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-green-900/20 border border-green-800 flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
        Page not found
      </h2>
      <p className="text-slate-500 text-sm max-w-md leading-relaxed mb-8">
        The page you're looking for doesn't exist or has been moved. Let's get you back on track.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <Link to="/" className="bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-2.5 rounded-xl transition-all shadow-md shadow-green-900/30">
          Go Home
        </Link>
        <Link to="/events" className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium px-6 py-2.5 rounded-xl transition-all border border-slate-700">
          Browse Events
        </Link>
      </div>
    </div>
  )
}

```

---

## 3. How to Run

```bash
# 1. Create project folder and copy all files into it
mkdir eventflow-ticketing
cd eventflow-ticketing

# 2. Copy all files into their correct paths (matching the folder structure above)

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev
# → Opens at http://localhost:5173

# 5. Production build
npm run build

# 6. Preview production build locally
npm run preview
# → Opens at http://localhost:4173
```

### Environment Variables

| Variable | Description | Example |
|---|---|---|
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (test mode) | `pk_test_51...` |

> **Note:** This app uses a **client-side mock Stripe** — no backend server is needed. The `.env` variable exists for future real Stripe integration. The mock validates card numbers using the Luhn algorithm and simulates 1–2 second network latency.

---

## 4. Stripe Testing Notes

### Test Card Numbers

| Card Number | Result | Description |
|---|---|---|
| `4242 4242 4242 4242` | ✅ Success | Standard Visa success |
| `4111 1111 1111 1111` | ✅ Success | Alternative Visa success |
| `4000 0000 0000 0002` | ❌ Declined | Card declined simulation |
| `4000 0000 0000 9995` | ❌ Declined | Insufficient funds simulation |

### How to Test the Payment Flow

1. Add any event(s) to your cart from the Events listing
2. Click **Checkout** — you must be logged in (sign up first if needed)
3. Fill in the **Address** step with any values
4. On the **Payment** step, enter a test card:
   - **Card Number:** `4242 4242 4242 4242`
   - **Expiry:** `12/28` (any future MM/YY date)
   - **CVC:** `123` (any 3 digits)
5. Click **Pay Now**
6. A simulated 1–2 second processing delay runs, then:
   - ✅ Success card → Order confirmation screen with generated Order ID
   - ❌ Decline card → Red error message with the specific decline reason

### Mock Stripe Validation Rules
- Card number must pass Luhn algorithm check
- Expiry must be a valid future MM/YY
- CVC must be exactly 3 digits
- Specific test card numbers trigger deterministic decline reasons

---

## 5. Customization Guide

### Adding New Events

Open `src/data/events.js` and add a new object to the `EVENTS` array:

```javascript
{
  id: 21,                            // Unique integer ID
  title: "My New Event",             // Event title
  category: "concert",               // One of: concert, comedy, workshop, sports, theatre
  price: 75.00,                      // Base display price (lowest zone price)
  rating: 4.5,                       // Rating out of 5
  reviewCount: 100,                  // Number shown in review count
  date: "2026-04-15",                // Event date (YYYY-MM-DD)
  time: "19:00",                     // Event time (HH:MM, 24-hour)
  venue: "Venue Name",               // Venue name
  city: "City, State",               // City and state display
  images: ["https://..."],           // Array of image URLs (1–4 recommended)
  description: "Full description…",  // Event description text
  tags: ["tag1", "tag2"],            // Searchable tags array
  popularityScore: 80,               // Base popularity 0–100 (used for Popular sort)
  createdAt: "2025-12-01T10:00:00Z", // ISO timestamp (used for Newest sort)
  availabilityCount: 50,             // Legacy field — actual stock comes from zones
  zones: [                           // Seating zones (each with own price + stock)
    { name: "VIP", price: 150, available: 10 },
    { name: "Standard", price: 75, available: 40 }
  ],
  reviews: [                         // Review objects
    { id: 1, author: "Name", rating: 5, text: "Text", date: "2025-11-15" }
  ],
  faqs: [                            // FAQ accordion items
    { q: "Question?", a: "Answer." }
  ]
}
```

### Adding New Categories

1. Add to `CATEGORY_LABELS` in `src/data/events.js`
2. Add a pill to `CATEGORIES` array in `src/components/FilterSidebar.jsx`
3. Add to the category quick-nav row in `src/pages/Home.jsx`

### Adding New Coupon Codes

Edit the `COUPONS` object in `src/data/events.js`:

```javascript
export const COUPONS = {
  SAVE10:  { discount: 0.10, label: "10% Off" },
  FEST20:  { discount: 0.20, label: "20% Off" },
  WELCOME: { discount: 0.15, label: "15% Welcome Discount" },
  HALF50:  { discount: 0.50, label: "50% Off" },
  MYNEW25: { discount: 0.25, label: "25% Off" }  // ← add new codes here
}
```

### Changing Fee / Tax Rates

Edit constants at the top of `src/context/CartContext.jsx`:

```javascript
const SERVICE_FEE_RATE = 0.12   // 12% service fee — change here
const TAX_RATE = 0.08           // 8% tax — change here
```

### Migrating to Real Stripe (Future)

When ready to integrate real Stripe payments:
1. Replace `VITE_STRIPE_PUBLISHABLE_KEY` in `.env` with your actual Stripe test key
2. Create a backend endpoint (Node/Express, etc.) that creates a `PaymentIntent` using your `STRIPE_SECRET_KEY`
3. Replace the `mockStripeCharge()` call in `src/pages/Checkout.jsx` with a `fetch` to your backend
4. Install `@stripe/stripe-js` and use `stripe.confirmCardPayment()` to confirm the PaymentIntent on the client