# Yalla Business - ERP & Business Management App

A comprehensive React Native Expo application featuring a modern ERP dashboard with multi-language support (English/Arabic), complete business management interface, and professional UI/UX design.

## 📱 Overview

Yalla Business is a full-featured business management mobile application built with React Native and Expo. It provides complete business operations management including sales tracking, inventory management, customer relations, financial oversight, purchase management, and returns processing.

## ✨ Key Features

### 🏪 Business Operations
- **Sales Management** - Complete sales processing with checkout, cart management, and invoice generation
- **Purchase Management** - Purchase order creation, vendor management, and inventory tracking
- **Inventory Management** - Product management, stock tracking, barcode/QR code support, and category management
- **Customer Management** - Customer relationship management with financial tracking and tier systems
- **Treasury Management** - Financial tracking, receipts, payments, receivables, and payables
- **Returns Processing** - Sales and purchase returns with detailed tracking and reporting

### 📊 Analytics & Reporting
- **Dashboard Analytics** - Monthly sales goals, KPI tracking, and business metrics
- **Sales Trends** - Interactive charts with period-based filtering (Daily/Weekly/Monthly)
- **Financial Reports** - Comprehensive financial reporting and cash flow analysis
- **Inventory Analytics** - Stock levels, top-selling products, and slow-moving inventory tracking

### 🌐 Internationalization
- **Multi-Language Support** - English and Arabic with RTL support
- **Dynamic Language Switching** - Real-time language changes with context preservation
- **Cultural Adaptation** - Date formats, number formatting, and UI adaptation for different locales

### 🎨 Modern UI/UX
- **Material Design** - Modern, responsive design following Material Design principles
- **Responsive Layout** - Optimized for mobile, tablet, and web platforms
- **Dark/Light Theme Ready** - Architecture supports multiple theme variants
- **Professional Components** - Reusable component library with consistent APIs

## 🏗️ Architecture

### Project Structure
```
yalla-business/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.js        # App header with navigation
│   │   ├── BottomNav.js     # Bottom navigation bar
│   │   ├── DashboardCard.js # Dashboard metric cards
│   │   ├── ActivityItem.js  # Activity feed items
│   │   ├── ProductCard.js   # Product display components
│   │   ├── Dropdown.js      # Reusable dropdown component
│   │   ├── ExpandableCard.js # Expandable content cards
│   │   ├── FlowButton.js    # Styled action buttons
│   │   ├── SearchBar.js     # Search functionality
│   │   ├── PaymentReceiptDialog.js # Payment processing
│   │   ├── AddContactDialog.js     # Contact management
│   │   └── LanguageSwitcher.js     # Language selection
│   ├── screens/             # Application screens
│   │   ├── Dashboard/       # Main dashboard
│   │   ├── SalesScreen.js   # Sales management
│   │   ├── PurchaseScreen.js # Purchase management
│   │   ├── CustomerScreen.js # Customer management
│   │   ├── ProductManagementScreen.js # Product management
│   │   ├── ManagementScreen.js # Generic management interface
│   │   ├── CheckoutScreen.js # Sales checkout process
│   │   ├── TreasuryScreen.js # Financial management
│   │   ├── InvoiceDetailScreen.js # Invoice management
│   │   ├── ReturnInvoicesScreen.js # Returns processing
│   │   └── [Additional screens]
│   ├── constants/           # Application constants
│   │   ├── data.js         # Static data and configurations
│   │   └── icons.js        # Icon configurations and sizes
│   ├── theme/              # Centralized styling system
│   │   ├── colors.js       # Color palette and themes
│   │   ├── typography.js   # Typography system
│   │   └── styles.js       # Common styles and utilities
│   ├── i18n/               # Internationalization
│   │   ├── translations/   # Language files
│   │   │   ├── en.json     # English translations
│   │   │   └── ar.json     # Arabic translations
│   │   ├── LanguageContext.js # Language context provider
│   │   └── translationUtils.js # Translation utilities
│   ├── App.js              # Main application component
│   └── index.js            # Application entry point
├── docs/                   # Documentation
├── assets/                 # Static assets (icons, images)
├── .gitignore             # Git ignore rules
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

### Design Patterns
- **Component-Based Architecture** - Modular, reusable components
- **Context API** - State management for themes and internationalization
- **Hook-Based Logic** - Custom hooks for business logic separation
- **Centralized Styling** - Consistent design system with theme management
- **Type-Safe Constants** - Well-structured data management

## 🛠️ Technology Stack

### Core Technologies
- **React Native** (v0.81.5) - Cross-platform mobile development
- **Expo** (~54.0.22) - Development platform and build tools
- **React** (19.1.0) - UI library with hooks and context
- **React DOM** (19.1.0) - Web platform support

### UI & Styling
- **@expo/vector-icons** (^15.0.3) - Material Design icons
- **StyleSheet** - React Native styling system
- **Custom Theme System** - Centralized color and typography management

### Internationalization
- **i18next** (^25.6.0) - Internationalization framework
- **react-i18next** (15.0.0) - React integration for i18next
- **expo-localization** (~17.0.7) - Device locale detection

### Development Tools
- **Expo CLI** - Development and build tools
- **Metro** - JavaScript bundler
- **Hot Reloading** - Fast development iteration

## 📋 Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn** package manager
- **Expo CLI** (`npm install -g @expo/cli`)
- **iOS Simulator** (for iOS development)
- **Android Studio** (for Android development)
- **Web Browser** (for web development)

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd yalla-business
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Start Development Server
```bash
npm start
# or
expo start
```

### 4. Run on Specific Platform
```bash
# Web (recommended for initial testing)
npm run web

# iOS Simulator
npm run ios

# Android Emulator
npm run android
```

### 5. Mobile App Testing
- Download **Expo Go** app on your device
- Scan the QR code from the terminal
- App will load on your device

## 🔧 Configuration

### Environment Setup
The app uses environment variables for configuration. Create a `.env` file in the root directory:

```env
# App Configuration
EXPO_PUBLIC_APP_NAME=Yalla Business
EXPO_PUBLIC_VERSION=1.0.0

# API Configuration (if applicable)
EXPO_PUBLIC_API_URL=your-api-url
EXPO_PUBLIC_API_KEY=your-api-key

# Feature Flags
EXPO_PUBLIC_ENABLE_ANALYTICS=true
EXPO_PUBLIC_ENABLE_NOTIFICATIONS=true
```

### Language Configuration
The app supports English and Arabic. To add more languages:

1. Create new translation file in `src/i18n/translations/`
2. Add language context in `LanguageContext.js`
3. Update language switcher component

## 📱 Usage Guide

### Navigation Structure
- **Bottom Navigation**: Primary navigation between main sections
- **Header Navigation**: Secondary navigation and actions
- **Modal Dialogs**: Forms and detailed interactions
- **Tab Navigation**: Within specific modules

### Key Business Functions

#### Sales Management
1. Access Sales from bottom navigation
2. Browse products with search and filtering
3. Add items to cart
4. Process checkout with payment methods
5. Generate invoices and receipts

#### Purchase Management
1. Navigate to Purchase section
2. Create purchase orders
3. Add vendor information
4. Track inventory additions
5. Manage purchase returns

#### Customer Management
1. Access Customers from main dashboard
2. Add new customers/vendors
3. Set financial limits and opening balances
4. Track customer tiers (Gold/Silver/Bronze)
5. Monitor receivables and payment history

#### Inventory Management
1. Product management with categories
2. Stock level monitoring
3. Barcode/QR code scanning support
4. Low stock alerts and recommendations
5. Bulk import/export capabilities

#### Financial Management
1. Treasury dashboard with balance tracking
2. Receipt and payment recording
3. Cash flow analysis
4. Receivables and payables monitoring
5. Financial reporting and analytics

## 🎨 Customization

### Theme Customization
Modify `src/theme/colors.js` to change the color scheme:

```javascript
export const colors = {
  primary: '#007AFF',        // Main brand color
  secondary: '#5856D6',      // Secondary actions
  success: '#34C759',        // Success states
  warning: '#FF9500',        // Warning states
  error: '#FF3B30',          // Error states
  // ... more color definitions
};
```

### Adding New Screens
1. Create screen component in `src/screens/`
2. Add navigation routes
3. Update bottom navigation if needed
4. Add translations for new content

### Component Development
1. Follow existing component patterns
2. Use centralized theme system
3. Support internationalization
4. Include proper TypeScript types (if using TS)

## 🧪 Testing

### Unit Testing
```bash
npm test
# or
yarn test
```

### E2E Testing
```bash
npm run test:e2e
# or
expo test
```

### Manual Testing
1. Test on multiple devices/screen sizes
2. Verify language switching functionality
3. Test all business workflows end-to-end
4. Validate data persistence

## 📦 Build & Deployment

### Web Deployment
```bash
npm run build:web
# Deploy dist/ folder to your hosting provider
```

### Mobile App Build
```bash
# iOS
expo build:ios

# Android
expo build:android
```

### Expo Application Services (EAS)
```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Configure build
eas build:configure

# Build for specific platform
eas build --platform ios
eas build --platform android
```

## 🤝 Contributing

### Development Workflow
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards
- Follow existing code patterns and architecture
- Use ESLint and Prettier for code formatting
- Write comprehensive tests for new features
- Update documentation for API changes
- Follow semantic commit conventions

### Pull Request Process
1. Ensure all tests pass
2. Update README.md with new features
3. Add or update translations for new content
4. Request review from maintainers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Support

### Documentation
- [Component Documentation](docs/components.md)
- [Theme System](docs/theme.md)
- [API Reference](docs/api.md)
- [Database Schema](docs/database-schema.md)

### Getting Help
- **GitHub Issues**: Report bugs and request features
- **Discussions**: Community support and questions
- **Email**: Contact maintainers for security issues

## 🎯 Roadmap

### Upcoming Features
- [ ] Offline mode support
- [ ] Advanced analytics dashboard
- [ ] Multi-currency support
- [ ] API integration capabilities
- [ ] Push notifications
- [ ] Biometric authentication
- [ ] Advanced reporting tools

### Performance Improvements
- [ ] Image optimization
- [ ] Bundle size reduction
- [ ] Memory usage optimization
- [ ] Battery usage optimization

## 🙏 Acknowledgments

- **Expo Team** - Excellent development platform and tools
- **React Native Community** - Robust mobile development ecosystem
- **Material Design** - Design system inspiration
- **i18next** - Comprehensive internationalization solution
- **Contributors** - All developers who contributed to this project

---

**Built with ❤️ using React Native and Expo**

For more information, visit our [documentation](docs/) or check out the [live demo](#).