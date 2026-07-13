---
title: Linux Productivity Tips for Developers
date: 2025-09-18
author: James Cowx
excerpt: Boost your development workflow with these essential Linux terminal tricks, aliases, and productivity tools.
tags: Linux, Productivity, Terminal
category: IT Tips
---

## Supercharge Your Terminal

The terminal is a developer's home. Here are tips to make it more productive.

### Essential Shell Aliases

```bash
# Git shortcuts
alias gs='git status'
alias gc='git commit'
alias gp='git push'
alias gl='git log --oneline --graph --decorate'

# Navigation
alias ..='cd ..'
alias ...='cd ../..'
alias ll='ls -lah'

# System
alias update='sudo apt update && sudo apt upgrade -y'
alias ports='netstat -tulpn'
```

### Tmux for Session Management

```bash
# Start new session
tmux new -s dev

# Split panes
Ctrl+b %  # vertical split
Ctrl+b "  # horizontal split

# Detach/attach
Ctrl+b d  # detach
tmux attach -t dev  # reattach
```

### FZF for Fuzzy Finding

```bash
# Fuzzy search files
alias f="fzf --preview 'bat --color=always {}'"

# Fuzzy search and open in vim
alias vf="vim \$(fzf)"

# Fuzzy git checkout
alias gco="git branch | fzf | xargs git checkout"
```

### Quick Search and Replace

```bash
# Recursive grep with context
rg -C 3 "function name" src/

# Find and replace across files
find . -name "*.ts" -exec sed -i 's/old/new/g' {} +
```

## Vim/Neovim Power Moves

```vim
" Quick save and quit
nnoremap <leader>w :w<CR>
nnoremap <leader>q :q<CR>

" Move lines
vnoremap J :m '>+1<CR>gv=gv
vnoremap K :m '<-2<CR>gv=gv

" Clear search highlight
nnoremap <leader>h :nohlsearch<CR>
```

## Must-Have CLI Tools

| Tool | Purpose |
|------|---------|
| `bat` | Syntax-highlighted cat |
| `fd` | Fast file finder |
| `ripgrep` (rg) | Fast grep |
| `jq` | JSON processor |
| `htop` | Interactive process viewer |
| `ncdu` | Disk usage analyzer |
| `tldr` | Simplified man pages |
| `delta` | Better git diffs |

## Conclusion

Investing time in your terminal setup pays dividends throughout your career. Pick one tip, integrate it into your workflow, then move on to the next.
