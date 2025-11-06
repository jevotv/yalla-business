# Contributing to Yalla Business

Thank you for your interest in contributing to Yalla Business! This document provides guidelines and instructions for contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)

## 🤝 Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before contributing.

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Git**
- **Expo CLI** (`npm install -g @expo/cli`)
- **iOS Simulator** (for iOS development) - Optional
- **Android Studio** (for Android development) - Optional

### Setting Up the Development Environment

1. **Fork and Clone the Repository**
   ```bash
   git clone https://github.com/your-username/yalla-business.git
   cd yalla-business
   ```

2. **Add Upstream Remote**
   ```bash
   git remote add upstream https://github.com/original-repo/yalla-business.git
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Start Development Server**
   ```bash
   npm start
   ```

5. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 🔄 Development Workflow

### Branch Naming Convention

- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `hotfix/description` - Urgent production fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

### Commit Message Format

Use conventional commits format:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Build process or auxiliary tool changes

**Examples:**
```bash
feat(sales): add discount calculation in checkout
fix(inventory): resolve stock tracking issue
docs(readme): update installation instructions
refactor(customer): optimize customer data fetching
```

## 📝 Coding Standards

### JavaScript/React Native Guidelines

1. **File Organization**
   - Use PascalCase for component files: `CustomerScreen.js`
   - Use camelCase for utility files: `dataUtils.js`
   - Use kebab-case for configuration files: `app-config.json`

2. **Code Formatting**
   - Use 2 spaces for indentation
   - Use semicolons
   - Use single quotes for strings
   - Maximum line length: 100 characters

3. **Component Structure**
   ```javascript
   // Import external dependencies
   import React, { useState } from 'react';
   import { View, Text } from 'react-native';
   
   // Import internal dependencies
   import { colors } from '../theme/colors';
   import { useTranslation } from '../i18n';
   
   // Component definition
   const ComponentName = ({ prop1, prop2 }) => {
     // State hooks
     const [state, setState] = useState();
     
     // Effects
     // Event handlers
     // Render
   };
   
   export default ComponentName;
   ```

4. **Props and State**
   - Use descriptive prop names
   - Destructure props in component parameters
   - Keep state minimal and focused
   - Use custom hooks for complex logic

5. **Styling**
   - Use centralized theme system
   - Avoid inline styles for repeated code
   - Follow the established patterns in `src/theme/`
   - Use StyleSheet.create for performance

### Internationalization

1. **Translation Keys**
   - Use nested objects for organization
   - Use meaningful, descriptive keys
   - Follow the existing pattern: `module.action.description`

2. **Text Usage**
   ```javascript
   // Good
   const { t } = useTranslation();
   <Text>{t('customer.addNew')}</Text>
   
   // Avoid hardcoded strings
   <Text>Add New Customer</Text>
   ```

## 🧪 Testing

### Unit Testing

1. **Test Structure**
   - Create test files with `.test.js` extension
   - Place tests in `__tests__` directory next to source files
   - Use descriptive test names

2. **Testing Guidelines**
   - Test components with different props
   - Test error states and edge cases
   - Mock external dependencies
   - Aim for >80% code coverage

3. **Running Tests**
   ```bash
   # Run all tests
   npm test
   
   # Run tests in watch mode
   npm test -- --watch
   
   # Run tests with coverage
   npm test -- --coverage
   ```

### Manual Testing

1. **Device Testing**
   - Test on iOS Simulator
   - Test on Android Emulator
   - Test on physical devices
   - Test on web browser

2. **Feature Testing**
   - Test language switching
   - Test navigation flows
   - Test data persistence
   - Test error handling

## 📚 Documentation

### Code Documentation

1. **Component Documentation**
   - Document prop types and descriptions
   - Include usage examples
   - Document complex business logic

2. **API Documentation**
   - Document all public functions
   - Include parameter descriptions
   - Provide return value types

### README Updates

1. **Feature Documentation**
   - Update features section for new functionality
   - Add setup instructions for new dependencies
   - Update screenshots for UI changes

2. **Translation Documentation**
   - Document new translation keys
   - Provide context for translators

## 🔄 Pull Request Process

### Before Submitting

1. **Code Quality**
   - Run linting: `npm run lint`
   - Run tests: `npm test`
   - Test on multiple platforms
   - Update documentation

2. **Checklist**
   - [ ] Code follows style guidelines
   - [ ] Tests added/updated
   - [ ] Documentation updated
   - [ ] Translations added/updated
   - [ ] No console.log statements left
   - [ ] Error handling implemented
   - [ ] Performance considered

### Pull Request Template

When creating a pull request, include:

```markdown
## 📋 Description
Brief description of changes

## 🧪 Testing
- [ ] Tested on iOS
- [ ] Tested on Android  
- [ ] Tested on Web
- [ ] Language switching works
- [ ] All features tested

## 📸 Screenshots
Add screenshots if UI changed

## 🔗 Related Issues
Closes #(issue_number)
```

### Review Process

1. **Automatic Checks**
   - All tests must pass
   - Code must pass linting
   - No merge conflicts

2. **Code Review**
   - At least one maintainer review required
   - Address all review comments
   - Request re-review after changes

3. **Merge Requirements**
   - All checks must pass
   - All conversations resolved
   - Squash commits for feature branches

## 🐛 Issue Reporting

### Bug Reports

Use the bug report template:

```markdown
**Describe the bug**
Clear description of the issue

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. Scroll to '...'
4. See error

**Expected behavior**
What should happen

**Screenshots**
If applicable

**Environment:**
 - Device: [e.g. iPhone6, Desktop]
 - OS: [e.g. iOS8.1, Windows 10]
 - App Version: [e.g. 22]

**Additional context**
Any other context
```

### Feature Requests

Use the feature request template:

```markdown
**Is your feature request related to a problem?**
Clear description of the problem

**Describe the solution you'd like**
Clear description of desired solution

**Describe alternatives you've considered**
Clear description of alternative solutions

**Additional context**
Any other context or screenshots
```

## 🎯 Development Priorities

### High Priority
- Bug fixes
- Security issues
- Performance improvements
- Accessibility improvements

### Medium Priority
- New features
- UI/UX improvements
- Code refactoring
- Documentation improvements

### Low Priority
- Nice-to-have features
- Experimental features
- Deprecation warnings

## 📞 Getting Help

### Resources

1. **Documentation**
   - [React Native Docs](https://reactnative.dev/)
   - [Expo Docs](https://docs.expo.io/)
   - [Project Wiki](https://github.com/your-repo/wiki)

2. **Community**
   - [GitHub Discussions](https://github.com/your-repo/discussions)
   - [Stack Overflow](https://stackoverflow.com/questions/tagged/react-native+expo)

3. **Maintainers**
   - Create issue for urgent matters
   - Use discussions for questions
   - Email for security issues

### Communication Guidelines

1. **Be Respectful**
   - Use welcoming and inclusive language
   - Be patient with new contributors
   - Provide constructive feedback

2. **Be Clear**
   - Provide detailed descriptions
   - Include examples when helpful
   - Ask clarifying questions

3. **Be Helpful**
   - Help others learn
   - Share knowledge and resources
   - Acknowledge good work

## 🚀 Release Process

### Version Numbering

We follow [Semantic Versioning](https://semver.org/):
- **MAJOR** (x.0.0) - Breaking changes
- **MINOR** (0.x.0) - New features, backward compatible
- **PATCH** (0.0.x) - Bug fixes, backward compatible

### Release Schedule

- **Patch releases**: As needed for critical bugs
- **Minor releases**: Monthly for new features
- **Major releases**: Quarterly for breaking changes

---

Thank you for contributing to Yalla Business! Your involvement helps make this project better for everyone. 🎉