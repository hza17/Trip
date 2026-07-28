const fs = require('fs');

let content = fs.readFileSync('src/components/TripPlanner.tsx', 'utf8');

// Fix max widths
content = content.replace(/max-w-4xl/g, 'w-full max-w-7xl');
content = content.replace(/max-w-2xl/g, 'w-full max-w-2xl');
content = content.replace(/max-w-xl/g, 'w-full max-w-xl');

// Fix grids
content = content.replace(/grid-cols-2 sm:grid-cols-5/g, 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5');
content = content.replace(/grid-cols-1 md:grid-cols-2 gap-8/g, 'grid-cols-1 md:grid-cols-2 gap-6');
content = content.replace(/grid-cols-3 gap-3/g, 'grid-cols-2 md:grid-cols-3 gap-4');
content = content.replace(/grid-cols-1 sm:grid-cols-3 gap-3/g, 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4');

// Booking modal responsiveness
content = content.replace(/w-full max-w-md/g, 'w-full max-w-lg mx-4');

// Text sizing and padding adjustments for a cleaner, professional look
content = content.replace(/p-6 md:p-8/g, 'p-5 md:p-8');
content = content.replace(/text-xs font-black/g, 'text-sm font-bold'); // Tone down the excessive 'black' weight and tiny 'xs' text
content = content.replace(/text-\[10px\]/g, 'text-xs');
content = content.replace(/text-\[11px\]/g, 'text-sm');
content = content.replace(/text-[9px]/g, 'text-xs');
content = content.replace(/text-2xl font-black/g, 'text-xl md:text-2xl font-bold');
content = content.replace(/font-extrabold/g, 'font-bold');

fs.writeFileSync('src/components/TripPlanner.tsx', content);
console.log('Layout and typography simplified in TripPlanner.tsx');
