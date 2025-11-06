# Yalla Business - ERP Dashboard App

A comprehensive React Native Expo application featuring a modern ERP dashboard with centralized architecture, reusable components, and professional UI/UX design.

## 📱 Overview

Yalla Business is a mobile ERP dashboard application built with React Native and Expo. It provides a complete business management interface with sales tracking, inventory management, customer relations, and financial oversight.

## 🏗️ Architecture

The application follows a modular, scalable architecture with centralized theme management and reusable components.

### Project Structure

```
yalla-business/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.js       # App header with navigation
│   │   ├── BottomNav.js    # Bottom navigation bar
│   │   ├── DashboardCard.js # Dashboard metric cards
│   │   ├── ActivityItem.js  # Activity feed items
│   │   └── Dropdown.js     # Reusable dropdown component
│   ├── constants/          # Application constants
│   │   ├── data.js        # Static data and configurations
│   │   └── icons.js       # Icon configurations
│   ├── theme/             # Centralized styling
│   │   ├── colors.js      # Color palette and themes
│   │   ├── typography.js  # Typography system
│   │   └── styles.js      # Common styles and utilities
│   └── App.js             # Main application component
├── docs/                  # Documentation
├── assets/                # Static assets
├── index.js               # Application entry point
└── package.json           # Dependencies and scripts
```

## 🚀 Features

### Core Dashboard Features
- **Monthly Sales Goal Tracking** - Progress bar with current vs target metrics
- **Interactive Period Selection** - Today, This Week, This Month filters
- **Business Metrics Cards** - Sales, Purchase, Inventory, Customers, Treasury, Reports, Returns, Website
- **Sales Trend Analysis** - Interactive chart with Daily/Weekly/Monthly views
- **Recent Activity Feed** - Real-time business activity notifications
- **Bottom Navigation** - Quick access to key business functions

### Technical Features
- **Cross-Platform** - Works on iOS, Android, and Web
- **Responsive Design** - Adapts to different screen sizes
- **Theme Support** - Light/dark mode ready architecture
- **Modular Components** - Reusable, maintainable component library
- **Centralized Styling** - Consistent design system
- **Type-Safe Constants** - Well-structured data management

## 🛠️ Technology Stack

- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and build tools
- **React Navigation** - Navigation management
- **Material Icons** - Icon library
- **StyleSheet** - Styling system

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd yalla-business
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on specific platform**
   ```bash
   # iOS
   npm run ios

   # Android
   npm run android

   # Web
   npm run web
   ```

## 📱 Usage

### Navigation
- **Header**: Menu button (left) and Home button (right)
- **Bottom Navigation**: Return, Purchase, AI Assistant, Receive, Pay
- **Dashboard Cards**: Tap any card to access detailed views
- **Sales Trend**: Use dropdown to switch between Daily/Weekly/Monthly views

### Key Screens
- **Dashboard**: Main overview with all business metrics
- **Sales**: Detailed sales analytics and tracking
- **Inventory**: Stock management and inventory control
- **Customers**: Customer relationship management
- **Reports**: Business intelligence and reporting

## 🎨 Design System

### Colors
The app uses a comprehensive color system with primary, secondary, status, and semantic colors. See [Theme Documentation](./theme.md) for details.

### Typography
Consistent typography hierarchy with predefined text styles for headers, body text, captions, and values. See [Typography Documentation](./typography.md).

### Components
Modular component library with consistent APIs and styling. See [Components Documentation](./components.md).

## 📚 Documentation

- [Theme System](./theme.md) - Colors, typography, and styling
- [Constants](./constants.md) - Data structures and configurations
- [Components](./components.md) - Component library and usage
- [API Reference](./api.md) - Component props and methods

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Developer** - Initial work and maintenance

## 🙏 Acknowledgments

- Original design inspiration from modern ERP dashboard patterns
- Material Design Icons for consistent iconography
- Expo community for excellent development tools