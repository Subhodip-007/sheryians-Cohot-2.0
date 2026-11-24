## Day 135 – TypeScript

### Why TypeScript?
- TypeScript is a superset of JavaScript.
- It provides static type checking to catch errors during development.
- It helps us write more predictable, readable and maintainable code.
- It supports defining types for variables, functions, objects, arrays, etc.

### JavaScript Type Coercion (Quick Reference)

Type coercion means JavaScript automatically converts one data type into another during an operation.

**Some examples:**

```js
"5" + 2       // "52"  → String
"5" - 2       // 3     → Number
"5" * 2       // 10    → Number

true + true   // 2     → Number

[1] + 1       // "11"  → String
[1, 2] + 1    // "1,21" → String

10 + true     // 11    → Number
"Hello" + true // "Hellotrue" → String
```

### Key Takeaways
- `+` can perform addition as well as string concatenation.
- `-` and `*` convert numeric strings into numbers.
- `true` is converted to `1` and `false` to `0` in numeric operations.
- Arrays are converted into primitive values during operations.

**Note:** These examples demonstrate JavaScript's type coercion, which also applies at runtime when using TypeScript.


## set up TypeScript
- npm init -y
- while development -  npm i typescript  --save-dev
- while deployment -                     (u write code in typescript but its is conveted using tsc complier to js and deploved)
app.ts → Type Checking → Transpilation → app.js → Build → Deployment

