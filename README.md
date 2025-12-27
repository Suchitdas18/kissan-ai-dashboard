# 🌾 Kissan AI - Smart Agriculture Dashboard

A beautiful, mobile-first agri-tech platform designed to connect farmers with AI-powered crop insights and wholesalers with nearby farmers.

## 🎯 Project Overview

Kissan AI is a role-based dashboard system that separates farmer and mandi (wholesaler) experiences from the first screen to keep the app simple and role-focused.

### ✨ Key Features

- **Role-based Navigation**: Users choose their role (Farmer or Mandi/Wholesaler) upon entry
- **Mobile-First Design**: Optimized for smartphone usage with large touch targets
- **Bilingual Interface**: Hindi + English for better accessibility
- **Icon-Heavy UI**: Minimal text for easy comprehension by non-technical users
- **AI-Verified Data**: Crop health status verified by artificial intelligence
- **Discovery Platform**: No payment gateway - purely for farmer-mandi connection

## 👨‍🌾 Farmer Dashboard Features

1. **Crop Selection**
   - Choose between Plants and Vegetables categories
   - **Search crops**: Real-time search with bilingual support
   - Select specific crop type:
     - **Plants**: Wheat, Rice, Corn, Sugarcane, Cotton, Mustard
     - **Vegetables**: Tomato, Potato, Onion, Cabbage, Cauliflower, Eggplant
   - Bilingual names (English + Hindi) for all crops
   - Visual selection with checkmark indicator
   - Clear button (✕) to reset search instantly

2. **Crop Image Upload**
   - Upload crop images for disease detection
   - AI-powered analysis of crop health

3. **Disease Detection**
   - Real-time disease identification
   - Severity indicators (Low/Medium/High)
   - Color-coded alerts
   - Treatment recommendations

4. **Soil Intelligence**
   - Soil health score (0-100)
   - NPK, pH, and Moisture monitoring (Coming Soon)

5. **Market Access**
   - Find nearby buyers
   - Contact buyers directly via phone
   - View buyer location and distance

6. **Farmer Summary**
   - Current crop health status
   - Recommended next steps
   - Best harvest timing

## 🏪 Mandi/Wholesaler Dashboard Features

1. **Available Crops Near You**
   - Browse crops by type (Wheat, Rice, Lentils, etc.)
   - View quantity available
   - See location and distance
   - AI-verified crop health status

2. **Contact Farmers**
   - Direct call functionality
   - Message/chat options
   - Quick connection to farmers

3. **My Deals**
   - Track ongoing transactions
   - View completed deals
   - Monitor deal status

4. **Earnings Summary**
   - Total transaction value
   - Platform commission (5%)
   - Net earnings calculation
   - Monthly performance tracking

## 🎨 Design Philosophy

### Color Schemes

**Farmer Theme (Green/Earthy)**
- Reflects agricultural roots
- Green gradients and earthy tones
- Calming and trustworthy

**Mandi Theme (Blue/Professional)**
- Professional business aesthetic
- Blue gradients for trust
- Clean and scannable interface

### Design Principles
- ✅ Mobile-first responsive design
- ✅ Large touch targets (min 44x44px)
- ✅ Icon-heavy, minimal English text
- ✅ Simple navigation structure
- ✅ Card-based layout for clarity
- ✅ Smooth animations and transitions
- ✅ Accessibility features built-in

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No installation required - pure HTML/CSS/JavaScript

### Running the Application

1. **Clone or download** this repository to your local machine

2. **Open the application**:
   - Navigate to the project folder
   - Open `index.html` in your web browser
   - Or use any local development server

3. **Choose your role**:
   - Click "Farmer" for the farmer dashboard
   - Click "Mandi/Wholesaler" for the wholesaler dashboard

### File Structure

```
kissan-ai/
│
├── index.html          # Role selection landing page
├── farmer.html         # Farmer dashboard
├── mandi.html          # Mandi/wholesaler dashboard
├── styles.css          # Global styles and theme
├── script.js           # Interactive functionality
└── README.md           # Project documentation
```

## 💻 Technology Stack

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with:
  - CSS Variables for theming
  - Flexbox and Grid for layouts
  - Smooth animations and transitions
  - Mobile-first media queries
- **Vanilla JavaScript**: 
  - No frameworks or libraries
  - Event handling for interactions
  - Image upload functionality
  - Notification system

## 📱 Mobile Optimization

The app is designed with mobile users as the primary audience:

- Responsive breakpoints for all screen sizes
- Touch-optimized button sizes
- Fast loading with optimized assets
- Works offline-ready architecture
- PWA-ready (Service Worker support)

## 🌟 Interactive Features

### Farmer Dashboard Interactions
- **Crop Search**: Real-time filtering with bilingual support (works for both English and Hindi)
- **Crop Selection**: Tab switching between Plants and Vegetables with visual feedback
- **Upload Crop Image**: Click to select image file, simulated AI analysis
- **Find Nearby Buyers**: Search for buyers with loading state
- **Contact Buttons**: Direct phone call initiation
- **Toast Notifications**: User feedback for all actions

### Mandi Dashboard Interactions
- **Filter Crops**: Filter options (coming soon)
- **Call Farmer**: Direct calling functionality
- **Message Farmer**: Chat initiation
- **Animated Charts**: Smooth chart fill animations

## 🎯 Use Cases

### For Farmers
1. Upload crop images to detect diseases early
2. Get treatment recommendations
3. Monitor soil health metrics
4. Find and contact nearby buyers
5. Track crop health and harvest timing

### For Mandi/Wholesalers
1. Discover available crops in nearby areas
2. View AI-verified crop quality
3. Contact farmers directly
4. Track deals and transactions
5. Monitor earnings and commission

## 🔮 Future Enhancements

- [ ] Integration with real AI model for crop disease detection
- [ ] GPS-based location tracking for accurate distance
- [ ] Real-time chat functionality
- [ ] Push notifications for new deals
- [ ] Payment gateway integration
- [ ] Multi-language support (Punjabi, Telugu, Tamil, etc.)
- [ ] Weather forecasting integration
- [ ] Price recommendations based on market data
- [ ] Historical crop performance tracking
- [ ] Community forum for farmers

## 🎓 Group Discussion Points

**"We separate farmer and mandi experiences from the first screen to keep the app simple and role-focused."**

This design decision:
- Reduces cognitive load for users
- Provides tailored experiences for each user type
- Improves navigation simplicity
- Allows for role-specific features
- Enhances user engagement

## 🤝 Contributing

This is a demonstration project. For production use:
1. Integrate real AI models for crop disease detection
2. Connect to backend API for data persistence
3. Implement real-time messaging
4. Add authentication and user profiles
5. Deploy to mobile app platforms (iOS/Android)

## 📄 License

This project is created for educational and demonstration purposes.

## 🙏 Acknowledgments

- Designed for Indian farmers and agricultural markets
- Bilingual support for better reach
- Mobile-first approach for rural accessibility
- Simple UI for users of all technical levels

---

**Made with ❤️ for Indian Agriculture 🇮🇳**

*Empowering farmers through technology, connecting markets through trust.*
