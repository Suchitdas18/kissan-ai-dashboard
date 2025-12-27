// ===========================
// AGRICULTURAL MEDICINES DATABASE
// Pesticides, Fungicides, Fertilizers
// ===========================

const medicineDatabase = {
    fungicides: [
        {
            id: "FUNG001",
            name: "Mancozeb 75% WP",
            brand: "Dhanuka M-45",
            disease: ["Rust", "Blight", "Leaf Spot"],
            crops: ["Wheat", "Rice", "Tomato", "Potato"],
            dosage: "2-2.5 gm/liter",
            packSize: ["250g", "500g", "1kg"],
            price: { "250g": 180, "500g": 320, "1kg": 580 },
            description: "Broad spectrum fungicide for leaf diseases",
            image: "🧪",
            manufacturer: "Dhanuka Agritech",
            rating: 4.5,
            inStock: true
        },
        {
            id: "FUNG002",
            name: "Propiconazole 25% EC",
            brand: "Tilt",
            disease: ["Rust", "Powdery Mildew", "Karnal Bunt"],
            crops: ["Wheat", "Rice", "Groundnut"],
            dosage: "1 ml/liter",
            packSize: ["100ml", "250ml", "500ml"],
            price: { "100ml": 280, "250ml": 650, "500ml": 1200 },
            description: "Systemic fungicide for rust control",
            image: "🧪",
            manufacturer: "Syngenta",
            rating: 4.7,
            inStock: true
        },
        {
            id: "FUNG003",
            name: "Copper Oxychloride 50% WP",
            brand: "Blitox",
            disease: ["Bacterial Blight", "Blast", "Late Blight"],
            crops: ["Rice", "Tomato", "Potato"],
            dosage: "2.5-3 gm/liter",
            packSize: ["250g", "500g", "1kg"],
            price: { "250g": 160, "500g": 290, "1kg": 520 },
            description: "Contact fungicide for bacterial diseases",
            image: "🧪",
            manufacturer: "Tata Rallis",
            rating: 4.3,
            inStock: true
        },
        {
            id: "FUNG004",
            name: "Tricyclazole 75% WP",
            brand: "Beam",
            disease: ["Blast"],
            crops: ["Rice"],
            dosage: "0.6 gm/liter",
            packSize: ["120g", "240g"],
            price: { "120g": 380, "240g": 720 },
            description: "Specific for rice blast control",
            image: "🧪",
            manufacturer: "Bayer CropScience",
            rating: 4.8,
            inStock: true
        }
    ],
    
    insecticides: [
        {
            id: "INSECT001",
            name: "Chlorpyrifos 20% EC",
            brand: "Durmet",
            pest: ["Stem Borer", "Root Grub", "Termites"],
            crops: ["Rice", "Wheat", "Cotton", "Sugarcane"],
            dosage: "2.5 ml/liter",
            packSize: ["250ml", "500ml", "1L"],
            price: { "250ml": 220, "500ml": 400, "1L": 750 },
            description: "Broad spectrum insecticide",
            image: "💊",
            manufacturer: "Crystal Crop Protection",
            rating: 4.4,
            inStock: true
        },
        {
            id: "INSECT002",
            name: "Imidacloprid 17.8% SL",
            brand: "Confidor",
            pest: ["Aphids", "Whitefly", "Jassids"],
            crops: ["Cotton", "Rice", "Vegetables"],
            dosage: "0.5 ml/liter",
            packSize: ["100ml", "250ml", "500ml"],
            price: { "100ml": 320, "250ml": 750, "500ml": 1400 },
            description: "Systemic insecticide for sucking pests",
            image: "💊",
            manufacturer: "Bayer CropScience",
            rating: 4.6,
            inStock: true
        },
        {
            id: "INSECT003",
            name: "Cypermethrin 10% EC",
            brand: "Cyper 10",
            pest: ["Bollworm", "Fruit Borer", "Pod Borer"],
            crops: ["Cotton", "Tomato", "Chickpea"],
            dosage: "1.5 ml/liter",
            packSize: ["250ml", "500ml", "1L"],
            price: { "250ml": 180, "500ml": 330, "1L": 600 },
            description: "Pyrethroid insecticide",
            image: "💊",
            manufacturer: "United Phosphorus",
            rating: 4.2,
            inStock: true
        }
    ],
    
    organic: [
        {
            id: "ORG001",
            name: "Neem Oil",
            brand: "Neem Guard",
            pest: ["Aphids", "Whitefly", "Mites"],
            crops: ["All crops"],
            dosage: "3-5 ml/liter",
            packSize: ["250ml", "500ml", "1L"],
            price: { "250ml": 150, "500ml": 280, "1L": 520 },
            description: "100% organic pest repellent",
            image: "🌿",
            manufacturer: "Organica",
            rating: 4.5,
            organic: true,
            inStock: true
        },
        {
            id: "ORG002",
            name: "Bio NPK Consortium",
            brand: "Bio Boost",
            pest: [],
            crops: ["All crops"],
            dosage: "5 ml/liter soil drench",
            packSize: ["250ml", "500ml", "1L"],
            price: { "250ml": 200, "500ml": 380, "1L": 700 },
            description: "Organic nitrogen fixing bacteria",
            image: "🌿",
            manufacturer: "Bio Organics",
            rating: 4.4,
            organic: true,
            inStock: true
        }
    ],
    
    fertilizers: [
        {
            id: "FERT001",
            name: "NPK 19:19:19",
            brand: "Grow More",
            crops: ["All crops"],
            dosage: "5 gm/liter",
            packSize: ["1kg", "5kg", "25kg"],
            price: { "1kg": 180, "5kg": 850, "25kg": 3800 },
            description: "Complete balanced nutrition",
            image: "🧴",
            manufacturer: "Iffco",
            rating: 4.6,
            inStock: true
        },
        {
            id: "FERT002",
            name: "Urea 46% N",
            brand: "Iffco Urea",
            crops: ["All crops"],
            dosage: "As per soil test",
            packSize: ["45kg"],
            price: { "45kg": 266 },
            description: "High nitrogen fertilizer - govt subsidized",
            image: "🧴",
            manufacturer: "Iffco",
            rating: 4.8,
            inStock: true,
            subsidized: true
        }
    ]
};

// Disease to medicine mapping
const diseaseTreatment = {
    "Rust": {
        recommended: ["FUNG001", "FUNG002"],
        organic: ["ORG001"],
        description: "Fungal disease causing pustules on leaves"
    },
    "Blight": {
        recommended: ["FUNG001", "FUNG003"],
        organic: ["ORG001"],
        description: "Fungal/bacterial disease causing leaf damage"
    },
    "Blast": {
        recommended: ["FUNG004", "FUNG003"],
        organic: [],
        description: "Severe rice disease"
    },
    "Aphids": {
        recommended: ["INSECT002"],
        organic: ["ORG001"],
        description: "Small sucking insects"
    },
    "Stem Borer": {
        recommended: ["INSECT001"],
        organic: [],
        description: "Larvae boring into stems"
    }
};

// Get all medicines
function getAllMedicines() {
    return [
        ...medicineDatabase.fungicides,
        ...medicineDatabase.insecticides,
        ...medicineDatabase.organic,
        ...medicineDatabase.fertilizers
    ];
}

// Get medicine by ID
function getMedicineById(id) {
    const allMeds = getAllMedicines();
    return allMeds.find(med => med.id === id);
}

// Get medicines for disease
function getMedicinesForDisease(disease, preferOrganic = false) {
    const treatment = diseaseTreatment[disease];
    if (!treatment) return [];
    
    const ids = preferOrganic && treatment.organic.length > 0 
        ? treatment.organic 
        : treatment.recommended;
    
    return ids.map(id => getMedicineById(id)).filter(m => m);
}

// Search medicines
function searchMedicines(query) {
    const allMeds = getAllMedicines();
    query = query.toLowerCase();
    
    return allMeds.filter(med => 
        med.name.toLowerCase().includes(query) ||
        med.brand.toLowerCase().includes(query) ||
        (med.disease && med.disease.some(d => d.toLowerCase().includes(query))) ||
        (med.pest && med.pest.some(p => p.toLowerCase().includes(query))) ||
        med.crops.some(c => c.toLowerCase().includes(query))
    );
}

// Export for use
window.medicineDatabase = medicineDatabase;
window.getAllMedicines = getAllMedicines;
window.getMedicineById = getMedicineById;
window.getMedicinesForDisease = getMedicinesForDisease;
window.searchMedicines = searchMedicines;
window.diseaseTreatment = diseaseTreatment;
