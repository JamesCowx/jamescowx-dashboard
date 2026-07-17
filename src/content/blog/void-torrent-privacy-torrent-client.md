---
title: Introducing VoidTorrent — A Privacy-First Torrent Client
date: 2026-07-16
author: James Cowx
excerpt: VoidTorrent is a modern, privacy-focused torrent client with a built-in VPN kill switch, darknet/I2P support, and a clean cross-platform UI. Here's why I built it and what makes it different.
tags: Privacy, Torrent, P2P, Open Source
category: Open Source
---

## Why VoidTorrent?

Most torrent clients treat privacy as an afterthought. Your IP address is exposed, your activity is visible to trackers, and your data is sent in the clear. VoidTorrent flips that — privacy is the foundation, not a feature toggle.

## Key Features

### Built-in VPN Kill Switch

If your VPN drops, VoidTorrent immediately halts all traffic. No leaks, no exceptions. You can configure kill-switch behavior per-torrent or globally.

### Darknet / I2P Support

Route traffic through I2P for true anonymity. VoidTorrent can connect to `.i2p` trackers and peers directly, keeping your activity off the clearnet entirely.

### Encrypted Peer Connections

All peer-to-peer traffic is encrypted using Noise Protocol Framework. Even if someone intercepts your traffic, they cannot see what you are downloading or uploading.

### Bandwidth Controls

Set per-torrent speed limits, schedule bandwidth windows, and prioritize certain torrents over others. The controls are granular without being overwhelming.

### Cross-Platform UI

Built with Next.js and TypeScript for the frontend, with a Rust core handling the heavy lifting. The same clean experience on Windows, macOS, and Linux.

## Built With

- **Next.js & TypeScript** — Fast, modern web UI
- **Rust** — High-performance torrent engine via WebTorrent bindings
- **PostgreSQL & Redis** — Session management and tracker state
- **Docker** — Easy deployment and containerized architecture

## Try It

Check out the [live demo](https://jamescowx.github.io/voidtorrent/) or browse the [source code on GitHub](https://github.com/jamescowx/voidtorrent). Contributions and feedback are always welcome.
