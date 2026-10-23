// Centralized demonstration data for every GENZ FARMER module.
// Everything here is simulated sample content — no live APIs.

export type Product = { id: string; name: string; category: string; price: number; unit: string; note: string };
export const categories = ["seeds", "fertilizers", "pesticides", "tools", "crops"];
export const products: Product[] = [
  { id: "p1", name: "Hybrid Tomato Seeds", category: "seeds", price: 340, unit: "pack", note: "High yield, 90-day cycle" },
  { id: "p2", name: "Paddy Seed Bag (10kg)", category: "seeds", price: 620, unit: "bag", note: "Disease resistant" },
  { id: "p3", name: "Vermicompost", category: "fertilizers", price: 480, unit: "50kg", note: "Organic soil booster" },
  { id: "p4", name: "NPK 19:19:19", category: "fertilizers", price: 750, unit: "25kg", note: "Balanced nutrient mix" },
  { id: "p5", name: "Neem Oil Spray", category: "pesticides", price: 290, unit: "1L", note: "Organic pest control" },
  { id: "p6", name: "Copper Fungicide", category: "pesticides", price: 410, unit: "500g", note: "For leaf fungal spots" },
  { id: "p7", name: "Knapsack Sprayer", category: "tools", price: 1650, unit: "each", note: "16L capacity" },
  { id: "p8", name: "Hand Weeder", category: "tools", price: 350, unit: "each", note: "Stainless steel" },
  { id: "p9", name: "Fresh Onions", category: "crops", price: 24, unit: "kg", note: "Grade A, this week's harvest" },
  { id: "p10", name: "Basmati Paddy", category: "crops", price: 38, unit: "kg", note: "Direct from farm" },
  { id: "p11", name: "Country Tomatoes", category: "crops", price: 19, unit: "kg", note: "Bulk discounts available" },
  { id: "p12", name: "Groundnut (raw)", category: "crops", price: 62, unit: "kg", note: "Sun dried, sorted" },
];

export type Crop = { name: string; season: string; soil: string; yieldQtPerAcre: number; pricePerQt: number; days: number; water: string; tip: string };
export const seasons = ["kharif", "rabi", "summer"];
export const soils = ["loamy", "clay", "sandy", "silt"];
export const crops: Crop[] = [
  { name: "Paddy (Sona Masoori)", season: "kharif", soil: "clay", yieldQtPerAcre: 22, pricePerQt: 2100, days: 135, water: "High — maintain 5cm standing water", tip: "Transplant after 21 days in nursery." },
  { name: "Cotton", season: "kharif", soil: "loamy", yieldQtPerAcre: 8, pricePerQt: 6600, days: 170, water: "Medium — irrigate every 15 days", tip: "Watch for pink bollworm; use pheromone traps." },
  { name: "Maize", season: "rabi", soil: "loamy", yieldQtPerAcre: 28, pricePerQt: 1950, days: 105, water: "Medium — 4 irrigations total", tip: "Space rows 60cm apart for cob size." },
  { name: "Wheat", season: "rabi", soil: "silt", yieldQtPerAcre: 20, pricePerQt: 2300, days: 120, water: "Medium — crown root stage is critical", tip: "Sow when soil temp drops below 25°C." },
  { name: "Groundnut", season: "kharif", soil: "sandy", yieldQtPerAcre: 10, pricePerQt: 5800, days: 115, water: "Low — mostly rain fed", tip: "Gypsum at flowering improves pod fill." },
  { name: "Black Gram", season: "rabi", soil: "clay", yieldQtPerAcre: 6, pricePerQt: 7400, days: 75, water: "Low — two irrigations", tip: "Short cycle; good between main crops." },
  { name: "Watermelon", season: "summer", soil: "sandy", yieldQtPerAcre: 90, pricePerQt: 1400, days: 90, water: "High — drip irrigation best", tip: "Mulch rows to hold summer moisture." },
  { name: "Green Chilli", season: "summer", soil: "loamy", yieldQtPerAcre: 45, pricePerQt: 3600, days: 150, water: "Medium — avoid waterlogging", tip: "Pick every 7 days to push more flushes." },
];

export const weather = [
  { day: "Today", tempC: 31, rainMm: 0, humidity: 58, condition: "Sunny" },
  { day: "Tomorrow", tempC: 29, rainMm: 2, humidity: 64, condition: "Partly cloudy" },
  { day: "Wed", tempC: 27, rainMm: 14, humidity: 78, condition: "Light showers" },
  { day: "Thu", tempC: 26, rainMm: 22, humidity: 85, condition: "Rain" },
  { day: "Fri", tempC: 28, rainMm: 6, humidity: 72, condition: "Cloudy" },
  { day: "Sat", tempC: 30, rainMm: 0, humidity: 60, condition: "Sunny" },
  { day: "Sun", tempC: 32, rainMm: 0, humidity: 55, condition: "Sunny" },
];
export const waterTips = [
  "Irrigate early morning (5–8am) to cut evaporation losses by up to 30%.",
  "Drip irrigation saves 40–60% water over flood irrigation for row crops.",
  "Mulch with straw after sowing to hold soil moisture through dry weeks.",
  "Skip irrigation within 48 hours of forecast rain — let the showers work.",
];

export type Rental = { id: string; name: string; type: string; rate: number; unit: string; available: boolean };
export const rentalTypes = ["equipment", "harvesting", "transport", "storage"];
export const rentals: Rental[] = [
  { id: "r1", name: "Mini Tractor with Rotavator", type: "equipment", rate: 850, unit: "hour", available: true },
  { id: "r2", name: "Power Sprayer", type: "equipment", rate: 200, unit: "day", available: true },
  { id: "r3", name: "Combine Harvester", type: "harvesting", rate: 2400, unit: "acre", available: true },
  { id: "r4", name: "Straw Baler", type: "harvesting", rate: 1100, unit: "day", available: false },
  { id: "r5", name: "Tractor Trolley Transport", type: "transport", rate: 18, unit: "km", available: true },
  { id: "r6", name: "Refrigerated Truck (3T)", type: "transport", rate: 42, unit: "km", available: false },
  { id: "r7", name: "Cold Storage Bay (per pallet/week)", type: "storage", rate: 150, unit: "week", available: true },
  { id: "r8", name: "Onion Shed Storage", type: "storage", rate: 90, unit: "quintal/month", available: true },
];

export const jobs = [
  { id: "j1", title: "Harvest Crew (6 members)", farm: "Green Valley Farms", location: "Thanjavur", wage: "₹650/day", type: "Seasonal" },
  { id: "j2", title: "Drip Irrigation Technician", farm: "Sunrise Agro", location: "Hosur", wage: "₹22,000/month", type: "Full-time" },
  { id: "j3", title: "Poultry Farm Assistant", farm: "Anand Poultry", location: "Namakkal", wage: "₹500/day", type: "Full-time" },
  { id: "j4", title: "Picking Labour (Mango Season)", farm: "Kaveri Orchards", location: "Salem", wage: "₹550/day", type: "Seasonal" },
  { id: "j5", title: "Dairy Farm Supervisor", farm: "Amirtha Dairy", location: "Erode", wage: "₹26,000/month", type: "Full-time" },
  { id: "j6", title: "Nursery Worker", farm: "Riverside Nursery", location: "Trichy", wage: "₹450/day", type: "Part-time" },
];

export const loanBasics = [
  { title: "Kisan Credit Card (KCC)", note: "Working-capital credit line at subsidised interest for seeds, fertiliser and labour. Repay within the crop cycle to keep the low rate." },
  { title: "Term Loan for Equipment", note: "3–7 year loans for tractors, pumps and drip systems. The equipment itself often serves as collateral." },
  { title: "Interest Subvention", note: "Prompt repayment can bring effective interest down to ~4% on crop loans up to ₹3 lakh under the demo scheme terms." },
  { title: "Repayment Discipline", note: "Never borrow more than your projected gross margin. Track every instalment below." },
];
export const repayments = [
  { month: "Oct", year: 2026, due: 5200, paid: 5200, status: "Paid" },
  { month: "Sep", year: 2026, due: 5200, paid: 5200, status: "Paid" },
  { month: "Aug", year: 2026, due: 5200, paid: 4400, status: "Partial" },
  { month: "Jul", year: 2026, due: 5200, paid: 5200, status: "Paid" },
  { month: "Jun", year: 2026, due: 6100, paid: 6100, status: "Paid" },
  { month: "May", year: 2026, due: 5200, paid: 0, status: "Missed" },
];
export const insurancePlans = [
  { name: "Pradhan Mantri Fasal Bima Yojana (demo)", cover: "₹50,000/acre", premium: "2% of sum insured (kharif)", note: "Covers yield loss from drought, flood, pests." },
  { name: "Horticulture Cover (demo)", cover: "₹80,000/acre", premium: "5% of sum insured", note: "For plantation crops and cold-storage losses." },
  { name: "Cattle & Poultry Shield (demo)", cover: "₹25,000/animal", premium: "₹410/year", note: "Death by disease or accident." },
];

export type Scheme = { name: string; state: string; benefit: string; eligibility: string };
export const schemes: Scheme[] = [
  { name: "PM-KISAN Samman Nidhi (demo)", state: "All India", benefit: "₹6,000/year paid in three instalments", eligibility: "Landholding farmer families" },
  { name: "Soil Health Card Scheme (demo)", state: "All India", benefit: "Free soil testing every 2 years", eligibility: "All farmers" },
  { name: "Per Drop More Crop — Drip Subsidy (demo)", state: "Tamil Nadu", benefit: "Up to 55% subsidy on drip systems", eligibility: "Farmers with water source proof" },
  { name: "Organic Certification Support (demo)", state: "Karnataka", benefit: "Reimbursement up to ₹35,000", eligibility: "Groups under PGS-India" },
  { name: "Farm Pond Construction Aid (demo)", state: "Telangana", benefit: "Up to ₹1.2 lakh for 0.25ha pond", eligibility: "Small & marginal farmers" },
  { name: "Solar Pump Subsidy (demo)", state: "Maharashtra", benefit: "Up to 75% off solar pump cost", eligibility: "Grid-connected pump owners" },
  { name: "Custom Hiring Centre Grant (demo)", state: "Punjab", benefit: "40% capital subsidy on machinery bank", eligibility: "FPOs and agri-entrepreneurs" },
  { name: "Bhall Beej Seed Village (demo)", state: "West Bengal", benefit: "Free foundation seed + training", eligibility: "Village seed producer groups" },
];

export const learning = [
  { title: "Reading your soil health card", topic: "Soil", level: "Beginner", minutes: 12 },
  { title: "Integrated pest management basics", topic: "Crop care", level: "Beginner", minutes: 18 },
  { title: "Drip system layout for 1 acre", topic: "Irrigation", level: "Intermediate", minutes: 25 },
  { title: "Post-harvest handling of tomatoes", topic: "Marketing", level: "Intermediate", minutes: 15 },
  { title: "Crop rotation for clay soils", topic: "Planning", level: "Intermediate", minutes: 20 },
  { title: "Selling on your state eNAM mandi", topic: "Marketing", level: "Advanced", minutes: 30 },
];
export const threads = [
  { id: "c1", author: "Ravi K.", topic: "Best neem spray schedule for chilli?", replies: 6 },
  { id: "c2", author: "Lakshmi Amma", topic: "Sharing my drip layout sketch (1 acre)", replies: 14 },
  { id: "c3", author: "Mani Selvam", topic: "Onion storage: how do you stop sprouting?", replies: 9 },
  { id: "c4", author: "A. Prasad", topic: "KCC renewal experience — ask me anything", replies: 21 },
];

export const doctorCases = [
  { crop: "Tomato", issue: "Early blight (simulated)", remedy: "Remove affected leaves; spray copper fungicide weekly; avoid overhead watering." },
  { crop: "Paddy", issue: "Brown plant hopper stress (simulated)", remedy: "Drain field for 2 days; release neem-based spray; keep 20cm row spacing." },
  { crop: "Cotton", issue: "Leaf curl virus pattern (simulated)", remedy: "Uproot infected plants; control whitefly with yellow sticky traps." },
  { crop: "Chilli", issue: "Powdery mildew (simulated)", remedy: "Wettable sulphur spray at 2g/litre in early morning." },
  { crop: "Banana", issue: "Potassium deficiency signs (simulated)", remedy: "Apply muriate of potash 50g/plant and mulch heavily." },
];

export const lifecycleStages = [
  { stage: "Land prep", days: "Day −14 to 0" },
  { stage: "Sowing", days: "Day 0" },
  { stage: "Germination", days: "Day 5–10" },
  { stage: "Vegetative", days: "Day 20–45" },
  { stage: "Flowering", days: "Day 45–60" },
  { stage: "Harvest", days: "Day 90–130" },
];

export const dashboardTasks = [
  { title: "Top-dress urea on North paddy field", when: "Today" },
  { title: "Book combine harvester for maize plot", when: "Tomorrow" },
  { title: "Check drip filter and flush lines", when: "Wed" },
  { title: "Send tomato quote to N. Traders", when: "Fri" },
];
export const dashStats = [
  { label: "Fields tracked", value: "6" },
  { label: "Acres managed", value: "18.5" },
  { label: "Open tasks", value: "4" },
  { label: "Est. profit this month", value: "₹21,400" },
];

export const moduleLinks = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Farm planner", path: "/planner" },
  { label: "Marketplace", path: "/marketplace" },
  { label: "Crop doctor", path: "/crop-doctor" },
  { label: "Weather & water", path: "/weather" },
  { label: "Rentals & transport", path: "/rentals" },
  { label: "Farm jobs", path: "/jobs" },
  { label: "Profit calculator", path: "/calculator" },
  { label: "Loans & insurance", path: "/loans" },
  { label: "Govt schemes", path: "/schemes" },
  { label: "Farm records", path: "/records" },
  { label: "Learn & community", path: "/education" },
  { label: "Ask an expert", path: "/expert" },
];
