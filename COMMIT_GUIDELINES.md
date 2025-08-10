# Commit Message Guidelines

This project uses conventional commit messages to maintain a clean and readable git history. All commit messages are automatically validated before each commit.

## Format

```
<type>: <description>

[optional body]

[optional footer]
```

## Allowed Types

- **add**: Adding new features
- **fix**: Bug fixes
- **update**: Updating existing features
- **remove**: Removing features/code
- **chore**: Maintenance tasks (dependencies, tooling)
- **docs**: Documentation changes
- **style**: Code style changes (formatting, semicolons, etc.)
- **refactor**: Code refactoring without changing functionality
- **test**: Adding or updating tests
- **config**: Configuration changes
- **build**: Build system changes
- **ci**: CI/CD changes
- **perf**: Performance improvements
- **revert**: Reverting previous commits

## Examples

### Good commit messages ✅

```bash
add: user authentication system
fix: navigation menu not closing on mobile
update: improve button component accessibility
remove: deprecated legacy API endpoints
chore: update dependencies to latest versions
docs: add API documentation for user endpoints
style: format code with prettier
refactor: extract common utility functions
test: add unit tests for user service
config: update eslint rules for import sorting
```

### Bad commit messages ❌

```bash
Add new feature          # Missing colon
ADD: new feature         # Type should be lowercase
add:new feature          # Missing space after colon
added new feature        # Wrong type (should be 'add')
fix bug                  # Too vague, no colon
```

## Rules

1. **Type**: Must be one of the allowed types in lowercase
2. **Colon**: Must include a colon and space after the type
3. **Description**: Should be clear and concise
4. **Length**: Header should not exceed 100 characters
5. **Case**: Description should start with lowercase (unless it's a proper noun)
6. **Period**: Don't end the description with a period

## Git Hooks

This project has Git hooks set up to:

- **Pre-commit**: Automatically lint and fix code before committing
- **Commit-msg**: Validate commit message format

If your commit message doesn't follow the format, the commit will be rejected with an error message explaining what needs to be fixed.

## Testing Commit Messages

You can test if your commit message is valid by running:

```bash
echo "your commit message" | npx commitlint
```

Example:

```bash
echo "add: new user dashboard" | npx commitlint
# ✅ This will pass

echo "Added new feature" | npx commitlint
# ❌ This will fail and show validation errors
```
