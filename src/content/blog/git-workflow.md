---
title: Git Workflow: The Branching Strategy That Actually Works
date: 2025-07-15
author: James Cowx
excerpt: Stop fighting with Git. A practical branching strategy for teams of any size that keeps your history clean and your deployments safe.
tags: Git, DevOps, Workflow
category: IT Tips
---

## The Problem with Git

Most teams either use Git poorly (committing directly to main) or over-engineer it (GitFlow for a 3-person team). Here's a practical middle ground.

## The Simplified Trunk-Based Flow

```
main ─────────────────────────●────●────●────────
                               \    \    \
feature/user-auth ──●──●──●───┘    │    │
                                    │    │
fix/login-bug ────────●──●─────────┘    │
                                         │
feature/dark-mode ──────────●──●────────┘
```

### The Rules

**1. `main` is always deployable**
Never commit directly. Every merge to main should pass CI and be ready for production.

**2. Short-lived feature branches**
```bash
git checkout -b feature/add-search
# Work for 1-3 days max
git push -u origin feature/add-search
# Create PR, get review, merge, delete branch
```

**3. Meaningful commit messages**
```bash
# Bad
git commit -m "fixes"
git commit -m "wip"
git commit -m "updated stuff"

# Good
git commit -m "fix: handle null response from user API"
git commit -m "feat: add fuzzy search to project filter"
git commit -m "refactor: extract validation logic to shared module"
```

### The Commit Convention

Use Conventional Commits for automated changelogs:

| Prefix | When to use |
|--------|------------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `refactor:` | Code restructuring |
| `docs:` | Documentation only |
| `test:` | Adding tests |
| `chore:` | Build/config changes |
| `perf:` | Performance improvements |

## Pull Request Workflow

```markdown
## What
Added fuzzy search to the projects page with debounced input.

## Why
Users with 100+ projects needed faster filtering than the dropdown.

## How
- Added `useDebounce` hook (300ms delay)
- Server-side search with ILIKE for partial matching
- Client-side cache for repeated queries

## Screenshots
[before/after screenshots]

## Testing
- [ ] Unit tests for debounce hook
- [ ] Search with empty string returns all
- [ ] Search is case-insensitive
```

## Rewriting History Safely

```bash
# Before pushing, clean up commits
git rebase -i HEAD~3

# Squash messy WIP commits into one
# pick  abc1234 feat: add search functionality
# squash def5678 wip
# squash ghi9012 fix lint
```

**Golden rule:** Never rebase commits that have been pushed to shared branches.

## Handling Hotfixes

```bash
# Branch from main, not from your feature branch
git checkout main
git pull
git checkout -b hotfix/critical-bug

# Fix, test, merge to main
git checkout main
git merge hotfix/critical-bug
git push

# Then merge main back into your feature branch
git checkout feature/in-progress
git merge main
```

## Useful Aliases

```bash
git config --global alias.lg "log --oneline --graph --decorate --all"
git config --global alias.unstage "reset HEAD --"
git config --global alias.undo "reset --soft HEAD~1"
git config --global alias.amend "commit --amend --no-edit"
git config --global alias.prune-remote "remote prune origin"
```

## Conclusion

The best Git workflow is the one your team actually follows consistently. Start simple, add rules only when needed, and automate everything with CI/CD checks.
