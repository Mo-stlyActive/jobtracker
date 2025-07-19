# Setup Guide

This guide will help you set up JobTracker for development or deployment.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.0 or later
- **npm**, **yarn**, or **pnpm**: Package manager
- **Git**: For version control

## Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/shareable-jobtracker.git
cd shareable-jobtracker
```

### 2. Install Dependencies

Choose your preferred package manager:

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Application Settings
NEXT_PUBLIC_APP_NAME=JobTracker
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Development Settings
NODE_ENV=development
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Data Configuration

### Sample Data

JobTracker comes with sample job application data in `src/data/jobs.json`. This data is sanitized and safe for public sharing.

### Custom Data

To add your own data:

1. **Edit the JSON file**: Modify `src/data/jobs.json`
2. **Follow the schema**: Use the existing job objects as templates
3. **Restart the server**: Changes will be reflected immediately

### Data Schema

Each job application should follow this structure:

```typescript
interface Job {
  id: string;                    // Unique identifier
  company: string;               // Company name
  position: string;              // Job title
  status: string;                // Applied, Interview, Offer, Rejected, Withdrawn
  notes: string;                 // Your notes (supports Markdown)
  tags: string[];                // Tags for categorization
  country: string;               // Job location
  reminder?: string;             // Reminder date (ISO format)
  applicationDate?: string;      // Application date (ISO format)
  applicationMethod?: string;    // How you applied
  salaryExpectation?: string;    // Expected salary
  jobPosting?: string;           // Job posting title
  requirements?: string;         // Job requirements
  coverLetterUsed?: string;      // Cover letter version
  cvUsed?: string;               // CV/Resume version
}
```

## Build Configuration

### Development Build

```bash
npm run build
```

### Production Build

```bash
NODE_ENV=production npm run build
```

### Static Export

For static hosting:

```bash
npm run build
npm run export
```

## Testing Setup

### Install Test Dependencies

Testing dependencies are included in the main installation. To run tests:

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Configuration

Tests are configured with:

- **Jest**: Test runner
- **React Testing Library**: Component testing
- **jsdom**: DOM environment for tests

## Code Quality

### ESLint Configuration

The project includes ESLint configuration for code quality:

```bash
# Check for linting issues
npm run lint

# Fix linting issues automatically
npm run lint:fix
```

### TypeScript Configuration

TypeScript is configured with strict mode:

```bash
# Type check without building
npm run type-check
```

### Prettier Configuration

Code formatting is handled by Prettier (integrated with ESLint):

```bash
# Format code
npm run format

# Check formatting
npm run format:check
```

## Deployment Setup

### Vercel (Recommended)

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Configure Build**: Vercel auto-detects Next.js projects
3. **Environment Variables**: Add any needed environment variables
4. **Deploy**: Push to main branch for automatic deployment

### Netlify

1. **Build Command**: `npm run build && npm run export`
2. **Publish Directory**: `out`
3. **Environment Variables**: Configure in Netlify dashboard

### GitHub Pages

1. **Enable GitHub Actions**: Create `.github/workflows/deploy.yml`
2. **Configure Workflow**: Use the provided workflow file
3. **Enable Pages**: Configure GitHub Pages in repository settings

### Docker

Build and run with Docker:

```bash
# Build image
docker build -t jobtracker .

# Run container
docker run -p 3000:3000 jobtracker
```

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Use a different port
   PORT=3001 npm run dev
   ```

2. **Module Not Found**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Build Errors**
   ```bash
   # Clear Next.js cache
   rm -rf .next
   npm run build
   ```

4. **TypeScript Errors**
   ```bash
   # Run type check
   npm run type-check
   
   # Clear TypeScript cache
   rm -rf .next/types
   ```

### Performance Issues

1. **Slow Development Server**
   - Disable source maps in development
   - Use `next dev --turbo` for faster builds

2. **Large Bundle Size**
   - Analyze bundle with `npm run analyze`
   - Implement code splitting
   - Optimize images and assets

### Browser Compatibility

JobTracker supports:

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

For older browsers, consider adding polyfills.

## Development Workflow

### Recommended Flow

1. **Create Feature Branch**: `git checkout -b feature/new-feature`
2. **Make Changes**: Implement your feature
3. **Test Changes**: Run tests and lint
4. **Commit Changes**: Use conventional commit format
5. **Push Branch**: `git push origin feature/new-feature`
6. **Create PR**: Submit pull request for review

### Commit Convention

Use conventional commits:

```
feat: add new analytics chart
fix: resolve mobile navigation issue
docs: update setup guide
style: format code with prettier
refactor: improve data filtering logic
test: add unit tests for utilities
```

### Branch Strategy

- **main**: Production-ready code
- **develop**: Integration branch for features
- **feature/***: Individual feature branches
- **hotfix/***: Critical bug fixes

## Advanced Configuration

### Custom Themes

Add custom themes by:

1. **Extend Tailwind Config**: Add colors in `tailwind.config.js`
2. **Update CSS Variables**: Modify CSS custom properties
3. **Add Theme Toggle**: Implement theme switching logic

### Custom Components

Create reusable components:

1. **Component Structure**: Follow existing patterns
2. **TypeScript**: Add proper type definitions
3. **Documentation**: Include JSDoc comments
4. **Tests**: Add component tests

### API Integration

To add backend integration:

1. **API Routes**: Add Next.js API routes
2. **Data Fetching**: Implement data fetching hooks
3. **Error Handling**: Add proper error boundaries
4. **Loading States**: Implement loading indicators

## Support

If you encounter issues during setup:

1. **Check Documentation**: Review this guide and README
2. **Search Issues**: Look for similar issues on GitHub
3. **Create Issue**: Report new bugs or problems
4. **Join Discussions**: Ask questions in GitHub Discussions

For immediate help, check the troubleshooting section above.