---
title: Debugging JavaScript Like a Pro: Beyond Console.log
date: 2025-05-22
author: James Cowx
excerpt: Level up your debugging skills. From Chrome DevTools breakpoints to advanced console methods, debug JavaScript the professional way.
tags: JavaScript, Debugging, DevTools
category: IT Tips
---

## Console.log Is Just the Beginning

Most developers never move past `console.log()`. But browser DevTools offer powerful debugging capabilities that save hours.

## Chrome DevTools Debugger

### Setting Breakpoints

1. Open DevTools (`F12`)
2. Go to Sources tab
3. Find your file in the file tree
4. Click the line number to set a breakpoint
5. Refresh or trigger the action

Once paused, you have full access to:
- Local variables and their current values
- Call stack (who called this function)
- Scope (closure, global, block)
- Watch expressions

### Conditional Breakpoints

Right-click a line number → "Add conditional breakpoint":

```javascript
// Only pause when user.name is empty
user.name === ''

// Only pause on every 5th iteration
i % 5 === 0
```

### XHR/Fetch Breakpoints

Sources → XHR Breakpoints → Add breakpoint. Pauses whenever a URL matching your pattern is requested. Essential for debugging API calls.

### Logpoints

Right-click → "Add logpoint". Like `console.log` but doesn't modify your code:

```
"User clicked with data:", data
"Response status:", response.status
```

## Console Methods You Should Use

```javascript
// console.table for arrays and objects
console.table(users);
console.table(users, ['name', 'email']);  // select columns

// console.group for collapsible logs
console.group('Processing Order #' + orderId);
console.log('Step 1: Validate payment');
console.log('Step 2: Update inventory');
console.log('Step 3: Send confirmation');
console.groupEnd();

// console.time for performance
console.time('fetchUsers');
const users = await fetchUsers();
console.timeEnd('fetchUsers');  // fetchUsers: 245.32ms

// console.trace for stack traces
function deepFunction() {
  console.trace('Who called me?');
}

// console.assert for conditional logging
console.assert(user.isActive, 'User should be active', user);

// Styling (yes, really)
console.log('%c Important!', 'color: red; font-size: 20px; font-weight: bold');
```

## Debugging Async Code

```javascript
// Async stack traces are now supported
async function fetchData() {
  try {
    const user = await api.getUser();     // if this fails...
    const posts = await api.getPosts();   // ...stack trace shows full async chain
  } catch (error) {
    debugger;  // programmatic breakpoint
    console.error('Failed:', error);
  }
}

// Or use .catch with debugger
api.getUser()
  .then(user => processUser(user))
  .catch(err => { debugger; });
```

## Network Tab Power Tips

- **Filter by type:** XHR/Fetch, JS, CSS, Images
- **Preserve log:** Keeps requests across page navigations
- **Block requests:** Right-click → "Block request URL" (test offline scenarios)
- **Throttling:** Simulate Slow 3G, Fast 3G, or custom
- **Copy as fetch:** Right-click any request → Copy → Copy as fetch

```javascript
// Generated "Copy as fetch" — paste into console to replay
fetch("https://api.example.com/users", {
  headers: { "Authorization": "Bearer xxx" },
  method: "GET",
});
```

## Performance Tab

- **Record runtime performance:** Record button → interact with page → stop
- **Look for:** Long tasks (>50ms), layout thrashing, forced reflows
- **Flame chart:** See exactly which functions took longest

## Memory Leak Detection

1. Memory tab → Take heap snapshot
2. Perform the suspected leaking action
3. Take another snapshot
4. Compare snapshots — look for objects that keep growing

```javascript
// Common leak: forgotten event listeners
useEffect(() => {
  window.addEventListener('resize', handler);
  return () => window.removeEventListener('resize', handler);  // DON'T SKIP THIS
}, []);
```

## Node.js Debugging

```bash
# Start with inspector
node --inspect-brk server.js

# Then open chrome://inspect in Chrome
# Use the same DevTools interface for backend debugging!
```

Or in VS Code: create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Server",
      "program": "${workspaceFolder}/server.js",
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```

## Quick Troubleshooting Patterns

```javascript
// "Why is this null?"
debugger;
console.log({ value, type: typeof value });

// "Is this function being called?"
function mysteryFunction() {
  console.count('mysteryFunction called');
  // ...rest of function
}

// "What's changing this object?"
const original = { name: 'John' };
const proxy = new Proxy(original, {
  set(target, prop, value) {
    console.trace(`Setting ${String(prop)} from ${target[prop]} to ${value}`);
    target[prop] = value;
    return true;
  },
});
```

## Conclusion

The debugger is your most powerful tool. Every minute spent learning DevTools saves an hour of `console.log` debugging. Set breakpoints, step through code, inspect state — debug like a professional.
