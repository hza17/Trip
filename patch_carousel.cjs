const fs = require('fs');
let code = fs.readFileSync('src/components/SupplierModal.tsx', 'utf8');

// check if ChevronLeft/Right are imported
if (!code.includes('ChevronLeft')) {
    code = code.replace(/import \{/, 'import { ChevronLeft, ChevronRight,');
}

const componentCode = `
const ImageCarousel = ({ service }: { service: CustomService }) => {
  const images = service.images && service.images.length > 0 ? service.images : [service.image];
  const [current, setCurrent] = React.useState(0);
  return (
    <div className="relative h-32 overflow-hidden bg-slate-900 group">
      <img src={images[current]} alt={service.title} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      
      {images.length > 1 && (
        <>
          <button onClick={(e) => { e.stopPropagation(); setCurrent(prev => (prev === images.length - 1 ? 0 : prev + 1)); }} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition">
            <ChevronLeft size={16} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); setCurrent(prev => (prev === 0 ? images.length - 1 : prev - 1)); }} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition">
            <ChevronRight size={16} />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10" dir="ltr">
            {images.map((_, i) => (
              <div key={i} className={\`w-1.5 h-1.5 rounded-full \${i === current ? 'bg-white' : 'bg-white/50'}\`} />
            ))}
          </div>
        </>
      )}

      <div className="absolute top-3 right-3 bg-orange-600 text-white text-[9px] font-black px-2.5 py-1 rounded-full z-10">
        {service.category}
      </div>
      <div className="absolute bottom-3 right-3 text-white z-10">
        <span className="text-xs font-bold font-mono bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-lg">
          {service.id}
        </span>
      </div>
    </div>
  );
};
`;

code = code.replace(/export default function SupplierModal\(\{/, componentCode + '\nexport default function SupplierModal({');

const oldCardImage = `<div className="relative h-32 overflow-hidden bg-slate-900">
                              <img 
                                src={service.image} 
                                alt={service.title} 
                                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" 
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                              <div className="absolute top-3 right-3 bg-orange-600 text-white text-[9px] font-black px-2.5 py-1 rounded-full">
                                {service.category}
                              </div>
                              <div className="absolute bottom-3 right-3 text-white">
                                <span className="text-xs font-bold font-mono bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-lg">
                                  {service.id}
                                </span>
                              </div>
                            </div>`;

code = code.replace(oldCardImage, '<ImageCarousel service={service} />');

fs.writeFileSync('src/components/SupplierModal.tsx', code);
