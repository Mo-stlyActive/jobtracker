# JobTracker - Application Management System

A modern, feature-rich job application tracking system built with Next.js, React, and TypeScript. Track your job applications, manage interviews, and analyze your job search progress with powerful analytics and export capabilities.

![JobTracker Screenshot](https://via.placeholder.com/800x400/3b82f6/ffffff?text=JobTracker+Screenshot)

## ✨ Features

### Core Functionality
- **📋 Application Tracking**: Add, edit, and manage job applications with comprehensive details
- **🔍 Advanced Search & Filtering**: Find applications quickly with multi-field search and filters
- **📊 Analytics Dashboard**: Visualize your job search progress with charts and statistics
- **📅 Timeline View**: Chronological view of your application history
- **📤 Data Export**: Export your data to JSON or CSV formats

### User Experience
- **🌙 Dark Mode**: Toggle between light and dark themes
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **⚡ PWA Support**: Install as a native app with offline capabilities
- **♿ Accessibility**: WCAG 2.1 AA compliant with keyboard navigation and screen reader support

### Technical Features
- **🚀 Next.js 15**: Latest React framework with App Router
- **⚡ TypeScript**: Full type safety and IntelliSense
- **🎨 Tailwind CSS**: Modern utility-first styling
- **📦 Local Storage**: Data persistence in your browser
- **🔄 Real-time Updates**: Instant filtering and search results

## 🚀 Quick Start

### Prerequisites
- Node.js 18.0 or later
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/shareable-jobtracker.git
   cd shareable-jobtracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📖 Usage Guide

### Adding Job Applications

JobTracker uses a JSON file-based approach for data management. To add new job applications:

1. **Edit the data file**: Modify `src/data/jobs.json` with your job application data
2. **Use the provided format**: Follow the existing job application structure
3. **Restart the development server**: Changes will be reflected immediately

### Example Job Application Format

```json
{
  "id": "company-position-2024-12-15",
  "company": "TechCorp Solutions",
  "position": "Senior Software Engineer",
  "status": "Applied",
  "notes": "Full-stack development role focusing on React and Node.js.",
  "tags": ["react", "nodejs", "full-stack", "remote"],
  "country": "United States",
  "salaryExpectation": "$120,000-$140,000",
  "applicationDate": "2024-12-15",
  "applicationMethod": "Company Career Portal",
  "jobPosting": "Senior Software Engineer - Full Stack",
  "requirements": "React, Node.js, TypeScript, 5+ years experience",
  "coverLetterUsed": "Standard Tech Cover Letter",
  "cvUsed": "Full Stack Developer CV"
}
```

### Available Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | ✅ | Unique identifier for the application |
| `company` | string | ✅ | Company name |
| `position` | string | ✅ | Job position title |
| `status` | string | ✅ | Application status (Applied, Interview, Offer, Rejected, Withdrawn) |
| `notes` | string | ✅ | Your notes about the application |
| `tags` | array | ✅ | Tags for categorization |
| `country` | string | ✅ | Location of the job |
| `salaryExpectation` | string | ❌ | Expected salary range |
| `applicationDate` | string | ❌ | Date you applied (ISO format) |
| `applicationMethod` | string | ❌ | How you applied |
| `jobPosting` | string | ❌ | Job posting title |
| `requirements` | string | ❌ | Job requirements |
| `coverLetterUsed` | string | ❌ | Cover letter version used |
| `cvUsed` | string | ❌ | CV/Resume version used |
| `reminder` | string | ❌ | Reminder date (ISO format) |

### Navigation

- **List View**: Default card-based view of all applications
- **Timeline View**: Chronological timeline of applications by date
- **Analytics View**: Charts and statistics about your job search

### Filtering & Search

- **Text Search**: Search across company, position, notes, tags, and more
- **Status Filter**: Filter by application status
- **Advanced Filters**: Date ranges, countries, tags, and custom criteria
- **Sorting**: Sort by date, company, position, status, or country

### Exporting Data

1. Click the **Export** button in the toolbar
2. Choose your format (CSV or JSON)
3. Select which fields to include
4. Download your data

## 🛠️ Development

### Project Structure

```
shareable-jobtracker/
├── public/                 # Static assets
│   ├── icons/             # PWA icons
│   └── manifest.json      # PWA manifest
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── api/           # API routes
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home page
│   ├── components/        # React components
│   ├── data/             # Data files
│   ├── types/            # TypeScript types
│   └── utils/            # Utility functions
├── docs/                 # Documentation
└── tests/                # Test files
```

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # Run TypeScript compiler

# Testing
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

### Configuration

The application can be configured through:

- **Environment Variables**: Create a `.env.local` file for local configuration
- **TypeScript Config**: Modify `tsconfig.json` for TypeScript settings
- **Tailwind Config**: Customize styling in `tailwind.config.js`
- **Next.js Config**: Configure Next.js in `next.config.mjs`

## 📱 PWA Features

JobTracker is a Progressive Web App (PWA) that offers:

- **Offline Access**: View your applications without an internet connection
- **Install Prompt**: Install as a native app on your device
- **App-like Experience**: Full-screen mode with native app feel
- **Background Sync**: Data synchronization when connection returns

### Installing as an App

1. **Desktop**: Click the install button in your browser's address bar
2. **Mobile**: Use "Add to Home Screen" from your browser menu
3. **In-App**: Click the install prompt when it appears

## 🎨 Customization

### Themes

JobTracker supports light and dark themes:

- **Automatic**: Follows your system preference
- **Manual**: Toggle using the theme button in the header
- **Persistent**: Your choice is saved locally

### Styling

The application uses Tailwind CSS for styling:

- **Custom Colors**: Defined in `tailwind.config.js`
- **Component Classes**: Pre-built component styles in `globals.css`
- **Responsive Design**: Mobile-first approach with breakpoints

### Adding Custom Fields

To add custom fields to job applications:

1. **Update Types**: Add field to the `Job` interface in `src/types/index.ts`
2. **Update Components**: Modify components to display the new field
3. **Update Sample Data**: Add the field to sample jobs in `src/data/jobs.json`

## 🧪 Testing

JobTracker includes a comprehensive testing setup:

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Structure

- **Unit Tests**: Individual component and function testing
- **Integration Tests**: Component interaction testing
- **Accessibility Tests**: WCAG compliance verification

## 🚀 Deployment

### Static Export

For static hosting (GitHub Pages, Netlify, Vercel):

```bash
npm run build
npm run export
```

### Vercel (Recommended)

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Auto Deploy**: Pushes to main branch deploy automatically
3. **Environment Variables**: Configure any needed environment variables

### Other Platforms

- **Netlify**: Drag and drop the `out` folder after static export
- **GitHub Pages**: Use GitHub Actions for automatic deployment
- **Docker**: Use the included Dockerfile for containerized deployment

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Getting Started

1. **Fork the Repository**: Create your own fork of the project
2. **Clone Locally**: `git clone your-fork-url`
3. **Create Branch**: `git checkout -b feature/your-feature-name`
4. **Make Changes**: Implement your feature or fix
5. **Test**: Ensure all tests pass
6. **Submit PR**: Create a pull request with a clear description

### Contribution Guidelines

- **Code Style**: Follow the existing code style and ESLint rules
- **Testing**: Add tests for new features
- **Documentation**: Update documentation for significant changes
- **Commits**: Use clear, descriptive commit messages

### Areas for Contribution

- 🐛 **Bug Fixes**: Report and fix issues
- ✨ **Features**: Implement new functionality
- 📚 **Documentation**: Improve guides and examples
- 🎨 **Design**: Enhance UI/UX design
- ♿ **Accessibility**: Improve accessibility features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Getting Help

- **Issues**: Report bugs and request features on [GitHub Issues](https://github.com/yourusername/shareable-jobtracker/issues)
- **Discussions**: Ask questions in [GitHub Discussions](https://github.com/yourusername/shareable-jobtracker/discussions)
- **Documentation**: Check the [docs folder](./docs) for detailed guides

### Frequently Asked Questions

**Q: Can I use this for team collaboration?**
A: Currently, JobTracker is designed for individual use. Team features may be added in future versions.

**Q: Is my data secure?**
A: All data is stored locally in your browser. No data is sent to external servers.

**Q: Can I import data from other job tracking tools?**
A: You can import data by converting it to the JSON format and adding it to the data file.

**Q: Does it work offline?**
A: Yes! JobTracker is a PWA and works offline once installed.

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing React framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Chart.js**: For beautiful data visualization
- **React Team**: For the foundational React library
- **TypeScript Team**: For type safety and developer experience

## 🔄 Changelog

### Version 1.0.0 (Latest)
- ✨ Initial release
- 📋 Core job tracking functionality
- 📊 Analytics dashboard
- 📱 PWA support
- 🌙 Dark mode
- 📤 Data export capabilities

---

<div align="center">
  <p>Built with ❤️ for job seekers everywhere</p>
  <p>
    <a href="https://github.com/yourusername/shareable-jobtracker">GitHub</a> •
    <a href="https://github.com/yourusername/shareable-jobtracker/issues">Issues</a> •
    <a href="https://github.com/yourusername/shareable-jobtracker/discussions">Discussions</a>
  </p>
</div>