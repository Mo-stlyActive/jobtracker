# Contributing to JobTracker

Thank you for your interest in contributing to JobTracker! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Issues

Before creating an issue, please:

1. **Search existing issues** to avoid duplicates
2. **Use the issue templates** when available
3. **Provide detailed information** about the problem
4. **Include steps to reproduce** for bugs

### Suggesting Features

For feature requests:

1. **Check existing issues and discussions** first
2. **Describe the problem** your feature would solve
3. **Provide implementation ideas** if you have them
4. **Consider the project scope** and goals

### Code Contributions

1. **Fork the repository**
2. **Create a feature branch** from `main`
3. **Make your changes** following our coding standards
4. **Add tests** for new functionality
5. **Update documentation** as needed
6. **Submit a pull request**

## 🏗️ Development Process

### Setting Up Development Environment

1. **Clone your fork**:
   ```bash
   git clone https://github.com/your-username/shareable-jobtracker.git
   cd shareable-jobtracker
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

### Branch Naming Convention

Use descriptive branch names:

- `feature/add-dark-mode`
- `fix/mobile-navigation-bug`
- `docs/update-contributing-guide`
- `refactor/improve-data-filtering`

### Commit Message Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes

**Examples:**
```
feat(analytics): add monthly application trend chart

fix(mobile): resolve navigation menu not closing on mobile

docs(readme): update installation instructions

test(utils): add unit tests for date formatting functions
```

## 📋 Code Standards

### TypeScript

- **Use strict TypeScript**: Enable strict mode in `tsconfig.json`
- **Define interfaces**: Create proper type definitions
- **Avoid `any`**: Use specific types or `unknown`
- **Export types**: Make types available for other files

```typescript
// Good
interface JobApplication {
  id: string;
  company: string;
  position: string;
  status: JobStatus;
}

// Avoid
const job: any = { ... };
```

### React Components

- **Use functional components** with hooks
- **Follow naming conventions**: PascalCase for components
- **Use TypeScript interfaces** for props
- **Include JSDoc comments** for complex components

```typescript
interface JobListProps {
  jobs: Job[];
  onJobClick: (job: Job) => void;
}

/**
 * JobList component displays a list of job applications
 * with search and filter capabilities.
 */
const JobList: React.FC<JobListProps> = ({ jobs, onJobClick }) => {
  // Component implementation
};
```

### CSS and Styling

- **Use Tailwind CSS** for styling
- **Follow mobile-first** approach
- **Use semantic class names** for custom CSS
- **Maintain consistency** with existing design patterns

```tsx
// Good
<div className="card hover:shadow-lg transition-all duration-200">
  <div className="card-body">
    {/* Content */}
  </div>
</div>

// Avoid inline styles
<div style={{ padding: '16px', backgroundColor: 'white' }}>
```

### File Organization

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Generic components
│   └── specific/       # Feature-specific components
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── hooks/              # Custom React hooks
└── data/               # Data files and schemas
```

## 🧪 Testing

### Writing Tests

- **Write tests** for new features and bug fixes
- **Use React Testing Library** for component tests
- **Follow AAA pattern**: Arrange, Act, Assert
- **Test user interactions**, not implementation details

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import JobList from '../JobList';

describe('JobList', () => {
  it('should display job applications', () => {
    // Arrange
    const mockJobs = [
      { id: '1', company: 'TechCorp', position: 'Developer', /* ... */ }
    ];
    
    // Act
    render(<JobList jobs={mockJobs} onJobClick={jest.fn()} />);
    
    // Assert
    expect(screen.getByText('TechCorp')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
  });
});
```

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm run test JobList.test.tsx
```

## 📚 Documentation

### Code Documentation

- **Add JSDoc comments** for functions and components
- **Document complex logic** with inline comments
- **Keep comments up-to-date** with code changes

```typescript
/**
 * Filters job applications based on search criteria
 * @param jobs - Array of job applications to filter
 * @param filters - Filter criteria including status, tags, and date range
 * @returns Filtered array of job applications
 */
function filterJobs(jobs: Job[], filters: FilterCriteria): Job[] {
  // Implementation
}
```

### README and Guides

- **Update relevant documentation** when making changes
- **Use clear, concise language**
- **Include code examples** where helpful
- **Keep documentation in sync** with code

## 🔍 Pull Request Process

### Before Submitting

1. **Test your changes** thoroughly
2. **Run the linter** and fix any issues
3. **Update documentation** if needed
4. **Ensure tests pass** and add new tests
5. **Review your own code** for quality

### Pull Request Guidelines

1. **Use a descriptive title** following conventional commit format
2. **Fill out the PR template** completely
3. **Reference related issues** using keywords (e.g., "Fixes #123")
4. **Keep PRs focused** - one feature or fix per PR
5. **Respond to feedback** promptly and professionally

### PR Template

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] Added tests for new functionality
- [ ] Manual testing completed

## Screenshots (if applicable)
<!-- Add screenshots for UI changes -->

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No merge conflicts
```

## 🎯 Areas for Contribution

### High Priority

- **Bug fixes**: Issues labeled with `bug` and `high priority`
- **Accessibility improvements**: Making the app more accessible
- **Performance optimizations**: Improving load times and responsiveness
- **Mobile experience**: Enhancing mobile usability

### Medium Priority

- **New features**: Features requested by users
- **UI/UX improvements**: Design enhancements
- **Documentation**: Improving guides and examples
- **Testing**: Increasing test coverage

### Good First Issues

Look for issues labeled `good first issue`:

- Simple bug fixes
- Documentation improvements
- Minor UI enhancements
- Adding missing tests

## 🚀 Release Process

### Versioning

We follow [Semantic Versioning](https://semver.org/):

- **Major**: Breaking changes
- **Minor**: New features (backward compatible)
- **Patch**: Bug fixes

### Release Checklist

1. **Update version** in `package.json`
2. **Update CHANGELOG.md** with release notes
3. **Create release branch** from `main`
4. **Test thoroughly** on different devices/browsers
5. **Create GitHub release** with notes
6. **Deploy to production**

## 🏷️ Issue Labels

| Label | Description |
|-------|-------------|
| `bug` | Something isn't working |
| `feature` | New feature request |
| `documentation` | Documentation improvements |
| `good first issue` | Good for newcomers |
| `help wanted` | Extra attention needed |
| `priority: high` | High priority issues |
| `priority: low` | Low priority issues |
| `type: enhancement` | Improvement to existing feature |
| `type: question` | Question about usage |

## 💬 Communication

### Getting Help

- **GitHub Discussions**: For questions and general discussion
- **GitHub Issues**: For bug reports and feature requests
- **Pull Request Comments**: For code review and feedback

### Community Guidelines

- **Be respectful** and inclusive
- **Provide constructive feedback**
- **Help newcomers** get started
- **Follow the code of conduct**

## 🙏 Recognition

### Contributors

All contributors are recognized in:

- **README.md**: Contributors section
- **GitHub**: Automatic contributor graphs
- **Release Notes**: Notable contributions mentioned

### Maintainers

Current maintainers:

- [@username](https://github.com/username) - Project Lead
- [@contributor](https://github.com/contributor) - Core Contributor

## 📄 License

By contributing to JobTracker, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to JobTracker! Your help makes this project better for everyone. 🎉