// ===========================
// FARMING KNOWLEDGE DATABASE
// Free Resource Library for Indian Farmers
// ===========================

const farmingKnowledge = {
    // Crop Database
    crops: {
        wheat: {
            name: { en: "Wheat", hi: "गेहूं" },
            season: "Rabi (Winter)",
            plantingTime: "October-November",
            harvestTime: "March-April",
            duration: "120-150 days",
            soilType: "Loamy, well-drained",
            idealTemp: "10-25°C",
            rainfall: "50-75 cm",
            fertilizer: {
                npk: "120:60:40 kg/ha",
                organic: "FYM 10-15 tonnes/ha"
            },
            diseases: [
                {
                    name: "Rust",
                    symptoms: "Brown/yellow pustules on leaves",
                    treatment: "Spray Propiconazole or Mancozeb",
                    prevention: "Use resistant varieties, crop rotation"
                },
                {
                    name: "Smut",
                    symptoms: "Black powder in grain",
                    treatment: "Seed treatment with Vitavax",
                    prevention: "Use certified seeds"
                },
                {
                    name: "Karnal Bunt",
                    symptoms: "Fishy smell, black spores",
                    treatment: "Spray Propiconazole at boot stage",
                    prevention: "Avoid late sowing"
                }
            ],
            yield: "40-45 quintals/ha",
            msp: "₹2,125/quintal (2024-25)"
        },
        rice: {
            name: { en: "Rice", hi: "धान" },
            season: "Kharif (Monsoon)",
            plantingTime: "June-July",
            harvestTime: "November-December",
            duration: "120-140 days",
            soilType: "Clay loam with good water retention",
            idealTemp: "25-35°C",
            rainfall: "100-200 cm",
            fertilizer: {
                npk: "120:60:40 kg/ha",
                organic: "Green manure before transplanting"
            },
            diseases: [
                {
                    name: "Blast",
                    symptoms: "Gray-brown spots with borders",
                    treatment: "Spray Tricyclazole",
                    prevention: "Balanced fertilization"
                },
                {
                    name: "Bacterial Blight",
                    symptoms: "Water-soaked lesions",
                    treatment: "Spray Copper oxychloride",
                    prevention: "Use resistant varieties"
                },
                {
                    name: "Sheath Blight",
                    symptoms: "Oval lesions on leaf sheath",
                    treatment: "Spray Hexaconazole",
                    prevention: "Proper spacing"
                }
            ],
            yield: "50-60 quintals/ha",
            msp: "₹2,300/quintal (2024-25)"
        },
        tomato: {
            name: { en: "Tomato", hi: "टमाटर" },
            season: "Year-round (varies by region)",
            plantingTime: "Oct-Nov, Feb-Mar",
            harvestTime: "60-80 days after transplant",
            duration: "120-150 days total",
            soilType: "Well-drained loamy soil",
            idealTemp: "20-25°C",
            rainfall: "60-100 cm",
            fertilizer: {
                npk: "100:50:50 kg/ha",
                organic: "Compost 20-25 tonnes/ha"
            },
            diseases: [
                {
                    name: "Early Blight",
                    symptoms: "Brown spots with concentric rings",
                    treatment: "Spray Mancozeb",
                    prevention: "Crop rotation, remove debris"
                },
                {
                    name: "Late Blight",
                    symptoms: "Water-soaked lesions on leaves",
                    treatment: "Spray Metalaxyl + Mancozeb",
                    prevention: "Avoid overhead irrigation"
                },
                {
                    name: "Leaf Curl",
                    symptoms: "Curled, twisted leaves",
                    treatment: "Remove affected plants, control whitefly",
                    prevention: "Use virus-free seeds"
                }
            ],
            yield: "400-600 quintals/ha",
            avgPrice: "₹15-30/kg"
        }
    },
    
    // Government Schemes
    schemes: {
        pmKisan: {
            name: "PM-KISAN",
            fullName: "Pradhan Mantri Kisan Samman Nidhi",
            benefit: "₹6,000 per year in 3 installments",
            eligibility: "All farmer families with cultivable land",
            website: "pmkisan.gov.in",
            helpline: "155261 / 011-24300606"
        },
        kisanCreditCard: {
            name: "Kisan Credit Card (KCC)",
            benefit: "Short-term credit for farming needs",
            interestRate: "7% (with 3% subvention)",
            maxLimit: "Based on land holding and crops",
            eligibility: "Farmers and tenant farmers",
            issuer: "Banks and RRBs"
        },
        cropInsurance: {
            name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
            benefit: "Crop loss insurance",
            premium: "2% for Kharif, 1.5% for Rabi",
            coverage: "Natural calamities, pests, diseases",
            website: "pmfby.gov.in",
            helpline: "1800-180-1551"
        },
        soilHealthCard: {
            name: "Soil Health Card Scheme",
            benefit: "Free soil testing and recommendations",
            frequency: "Once every 3 years",
            portal: "soilhealth.dac.gov.in",
            centers: "Available at district agriculture offices"
        }
    },
    
    // Organic Farming Guide
    organic: {
        composting: {
            materials: ["Crop residue", "Animal waste", "Kitchen waste", "Green leaves"],
            ratio: "C:N ratio 25:1 to 30:1",
            duration: "2-3 months",
            process: "Layer materials, turn weekly, maintain moisture"
        },
        vermicompost: {
            earthworms: "Eisenia fetida (Red wiggler)",
            materials: ["Biodegradable waste", "Cow dung", "Dry leaves"],
            duration: "45-60 days",
            yield: "30-40% of input material",
            benefits: "Rich in NPK and microorganisms"
        },
        greenManure: {
            crops: ["Dhaincha", "Sunhemp", "Cowpea", "Sesbania"],
            timing: "45-55 days before flowering",
            benefits: "Adds nitrogen, improves soil structure",
            incorporation: "Plough into soil 2 weeks before planting"
        },
        biopesticides: {
            neemOil: "Spray 3-5ml/liter for sucking pests",
            garlic: "Crushed garlic + water spray for aphids",
            chili: "Chili powder spray deters insects",
            turmeric: "Antifungal properties for seed treatment"
        }
    },
    
    // Weather-based Farming Calendar
    calendar: {
        january: {
            activities: ["Harvest Rabi crops", "Irrigate wheat", "Sow vegetables"],
            crops: ["Potato", "Peas", "Carrot", "Radish"]
        },
        february: {
            activities: ["Prepare for summer crops", "Prune fruit trees"],
            crops: ["Summer vegetables", "Melons"]
        },
        march: {
            activities: ["Harvest wheat", "Prepare fields for Kharif"],
            crops: ["Okra", "Bottle gourd", "Ridge gourd"]
        },
        april: {
            activities: ["Summer irrigation", "Mulching"],
            crops: ["Cucurbits", "Green gram"]
        },
        may: {
            activities: ["Pre-monsoon preparation", "Nursery for rice"],
            crops: ["Early Kharif", "Fodder crops"]
        },
        june: {
            activities: ["Sow Kharif crops", "Rice transplanting"],
            crops: ["Rice", "Maize", "Cotton", "Soybean"]
        },
        july: {
            activities: ["Weed management", "Pest scouting"],
            crops: ["Continue Kharif sowing"]
        },
        august: {
            activities: ["Mid-season care", "Fertilizer application"],
            crops: ["Late Kharif varieties"]
        },
        september: {
            activities: ["Pest control", "Prepare for Rabi"],
            crops: ["Short-duration vegetables"]
        },
        october: {
            activities: ["Sow Rabi crops", "Harvest Kharif"],
            crops: ["Wheat", "Mustard", "Chickpea", "Potato"]
        },
        november: {
            activities: ["Winter crop management", "Irrigation"],
            crops: ["Winter vegetables"]
        },
        december: {
            activities: ["Cold protection", "Harvest vegetables"],
            crops: ["Leafy vegetables", "Root crops"]
        }
    },
    
    // Pest & Disease Common Names
    pests: {
        aphids: { name: { en: "Aphids", hi: "माहू" }, control: "Neem oil spray" },
        whitefly: { name: { en: "Whitefly", hi: "सफेद मक्खी" }, control: "Yellow sticky traps" },
        stemBorer: { name: { en: "Stem Borer", hi: "तना छेदक" }, control: "Pheromone traps" },
        leafMiner: { name: { en: "Leaf Miner", hi: "पत्ती खनक" }, control: "Remove affected leaves" },
        fruitBorer: { name: { en: "Fruit Borer", hi: "फल छेदक" }, control: "Biological control" }
    },
    
    // Soil Health Indicators
    soil: {
        npk: {
            nitrogen: "For leaf growth, protein synthesis",
            phosphorus: "For root development, flowering",
            potassium: "For overall plant health, disease resistance"
        },
        ph: {
            acidic: "< 6.5 - Add lime",
            neutral: "6.5-7.5 - Ideal",
            alkaline: "> 7.5 - Add sulfur or organic matter"
        },
        organic: {
            low: "< 0.5% - Add compost",
            medium: "0.5-0.75% - Maintain",
            high: "> 0.75% - Good"
        }
    },
    
    // Market Information
    markets: {
        eNAM: {
            name: "National Agriculture Market",
            website: "enam.gov.in",
            description: "Online trading platform for agricultural commodities"
        },
        apmc: {
            name: "Agricultural Produce Market Committee",
            description: "Local mandis for selling produce",
            tip: "Check rates before harvest"
        },
        farmerProducer: {
            name: "Farmer Producer Organizations (FPO)",
            benefit: "Collective bargaining, better prices",
            support: "NABARD and state governments"
        }
    }
};

// Helper function to get crop information
function getCropInfo(cropName, language = 'en') {
    const crop = farmingKnowledge.crops[cropName.toLowerCase()];
    if (!crop) return null;
    
    return {
        name: crop.name[language] || crop.name.en,
        details: crop
    };
}

// Helper function to get scheme information
function getSchemeInfo(schemeName) {
    return farmingKnowledge.schemes[schemeName] || null;
}

// Helper function to get seasonal advice
function getSeasonalAdvice(month) {
    const monthNames = ['january', 'february', 'march', 'april', 'may', 'june',
                       'july', 'august', 'september', 'october', 'november', 'december'];
    const currentMonth = monthNames[month - 1];
    return farmingKnowledge.calendar[currentMonth] || null;
}

// Export for use in AI assistant
window.farmingKnowledge = farmingKnowledge;
window.getCropInfo = getCropInfo;
window.getSchemeInfo = getSchemeInfo;
window.getSeasonalAdvice = getSeasonalAdvice;
