---
title: Rust for JavaScript Developers: A Practical Introduction
date: 2025-04-25
author: James Cowx
excerpt: Learning Rust doesn't have to be intimidating. This guide bridges the gap between JavaScript and Rust with practical comparisons and examples.
tags: Rust, JavaScript, Systems Programming
category: IT Tips
---

## Why Learn Rust?

Rust has been voted the most loved language for 8 consecutive years on Stack Overflow. It offers C++-level performance with memory safety guarantees that prevent entire classes of bugs.

### The Mental Model Shift

In JavaScript, you think about values. In Rust, you think about **ownership** of values.

```javascript
// JavaScript — no concept of ownership
let data = [1, 2, 3];
let copy = data;      // both point to same array
copy.push(4);         // data is now [1, 2, 3, 4] — mutated!
```

```rust
// Rust — ownership is explicit
let data = vec![1, 2, 3];
let copy = data;      // data is MOVED, can't be used anymore
// println!("{:?}", data); // COMPILE ERROR: value borrowed after move
```

## Variables and Mutability

```javascript
// JS
let x = 5;
x = 10;  // fine
```

```rust
// Rust
let x = 5;
// x = 10;  // ERROR: cannot assign twice to immutable variable

let mut y = 5;
y = 10;  // fine — explicit mut
```

## Pattern Matching (vs Switch)

```rust
enum Status {
    Active,
    Inactive,
    Banned { reason: String },
}

fn get_message(status: Status) -> String {
    match status {
        Status::Active => "Welcome back!".to_string(),
        Status::Inactive => "Account is inactive.".to_string(),
        Status::Banned { reason } => format!("Banned: {}", reason),
    }
}
```

This is exhaustive — the compiler ensures you handle every variant. No more "undefined is not a function" because you forgot a case.

## Error Handling: Result vs Try/Catch

```rust
use std::fs;

fn read_config() -> Result<String, std::io::Error> {
    fs::read_to_string("config.toml")
}

fn main() {
    match read_config() {
        Ok(content) => println!("Config: {}", content),
        Err(e) => eprintln!("Failed to read config: {}", e),
    }
}

// Or use the ? operator for propagation
fn load() -> Result<String, std::io::Error> {
    let config = fs::read_to_string("config.toml")?;  // returns error if fails
    Ok(config)
}
```

## When to Use Rust

| Use Case | Why Rust |
|----------|----------|
| CLI tools | Single binary, fast startup |
| WASM modules | Tiny bundles, no runtime |
| Embedded/IoT | No garbage collector pauses |
| High-perf APIs | Memory safety without GC overhead |
| Blockchain/tooling | Deterministic, predictable performance |

## Practical First Project

Try rewriting one of your slow Node.js scripts in Rust:

```rust
use std::fs;
use std::collections::HashMap;

fn main() {
    let content = fs::read_to_string("logs.txt").unwrap();
    let mut counts: HashMap<&str, u32> = HashMap::new();

    for line in content.lines() {
        let level = line.split_whitespace().nth(2).unwrap_or("UNKNOWN");
        *counts.entry(level).or_insert(0) += 1;
    }

    for (level, count) in &counts {
        println!("{}: {}", level, count);
    }
}
```

This processes a million-line log file in under 100ms — often 10-50x faster than equivalent Node.js.

## Conclusion

Rust's learning curve is real, but the payoff is immense. Start with CLI tools, then move to WASM modules, and eventually you'll find yourself reaching for Rust anytime performance or correctness matters.
