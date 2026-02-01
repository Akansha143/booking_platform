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