const fs = require('fs');
const glob = require('fs').readdirSync; // not actually glob, but let's just list known files

const files = [
  'src/components/SerpView.tsx',
  'src/components/DetailView.tsx',
  'src/components/DashboardView.tsx',
  'src/components/CheckoutView.tsx',
  'src/components/workspace/BusinessWorkspace.tsx',
  'src/components/workspace/HotelPremiumDashboard.tsx'
];

const colorRegex = /\b(emerald|rose|teal|orange|amber|indigo|sky|purple|pink)-(50|100|200|300|400|500|600|700|800|900|950)\b/g;

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(colorRegex, (match, color, shade) => {
      // Keep amber for Stars/Ratings
      if (color === 'amber' && (shade === '400' || shade === '500')) return match;
      if (color === 'rose' && (shade === '500' || shade === '600')) return match; // Keep some red for destructive/errors
      if (color === 'emerald' && shade === '500') return match; // Keep some green for success
      
      if (['50', '100', '200'].includes(shade)) return 'blue-50';
      if (['300', '400'].includes(shade)) return 'blue-400';
      if (['500', '600'].includes(shade)) return 'blue-600';
      if (['700', '800', '900', '950'].includes(shade)) return 'blue-700';
      return `blue-${shade}`;
    });
    
    content = content.replace(/font-black/g, 'font-bold');
    content = content.replace(/font-extrabold/g, 'font-bold');
    
    fs.writeFileSync(file, content);
    console.log('Simplified', file);
  }
});
