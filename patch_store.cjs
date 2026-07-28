const fs = require('fs');
let code = fs.readFileSync('src/lib/servicesStore.ts', 'utf8');

code = code.replace(
  /export interface CustomService \{/,
  'export interface CustomService {\n  images?: string[];'
);

// update defaults to include images? (optional)
fs.writeFileSync('src/lib/servicesStore.ts', code);
