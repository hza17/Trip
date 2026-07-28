const fs = require('fs');
let content = fs.readFileSync('src/components/HomeView.tsx', 'utf-8');
content = content.replace('onClick={() => handleOpenServiceBooking(service)}', 'onClick={(e) => { e.stopPropagation(); handleOpenServiceBooking(service); }}');
fs.writeFileSync('src/components/HomeView.tsx', content);
