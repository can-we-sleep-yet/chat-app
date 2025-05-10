# Contributing to Chat App

Thanks for being part of this project! Please follow these guidelines to ensure smooth collaboration.

## Setup

1. Clone the repository and navigate to project directory
   ```
   git clone git@github.com:can-we-sleep-yet/chat-app.git
   cd chat-app
   ```

## Branching Strategy

- Never commit directly to `main` or `gh-pages`
- Use feature branches.
  - feature/your-feature-name
  - fix/bug-description
  - chore/task-name
- Example:
  ```
  git checkout -b feature/login-page
  ```

## Commit Messages

Follow the conventional format: <b>type(scope): short description</b>

- Common types:
  - `feat`: New feature
  - `fix`: Bug fix
  - `docs`: Documentation only changes
  - `style`: Code style (formatting, missing semi-colons, etc)
  - `refactor`: Code changes that don't fix bugs or add features
  - `test`: Adding or updating tests
  - `chore`: Misc tasks like build config, updates, etc.

## Pushing Changes

1. Push your branch:
   ```
   git push origin feature/your-feature-name
   ```
2. Create a Pull Request (PR) to `main` on GitHub
3. Add a clear title and description to your PR
4. Tag team lead for review

## After PR is Merged

Sync your local main branch

```
git checkout main
git pull origin main
```
