import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Search, 
  Locate, 
  X, 
  ZoomIn, 
  ZoomOut, 
  Sparkles, 
  Check, 
  Compass,
  ArrowLeftRight,
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MapPreset {
  id: string;
  name: string;
  city: string;
  address: string;
  x: number; // percentage from right
  y: number; // percentage from top
  description: string;
}

const PRESET_LOCATIONS: MapPreset[] = [
  {
    id: '1',
    name: 'کیش - ساحل مرجان',
    city: 'کیش',
    address: 'استان هرمزگان، جزیره زیبای کیش، بلوار جهان، میدان مرجان، لاین ساحلی غربی',
    x: 75,
    y: 80,
    description: 'منطقه توریستی و تفریحی مرجان با دسترسی مستقیم به کلوپ‌های دریایی'
  },
  {
    id: '2',
    name: 'کیش - بندرگاه و ساحل مریم',
    city: 'کیش',
    address: 'استان هرمزگان، جزیره زیبای کیش، بلوار سنایی، مقابل اسکله تفریحی مریم',
    x: 82,
    y: 35,
    description: 'محدوده مرکزی شهر، دسترسی عالی به مراکز خرید مریم و ونوس'
  },
  {
    id: '3',
    name: 'تهران - سعادت‌آباد و میدان بهرود',
    city: 'تهران',
    address: 'استان تهران، تهران، سعادت‌آباد، انتهای بلوار پاکنژاد، میدان بهرود، کوچه پارک پرواز',
    x: 25,
    y: 20,
    description: 'موقعیت کوهستانی خوش آب و هوا در مجاورت هتل اسپیناس پالاس'
  },
  {
    id: '4',
    name: 'تهران - خیابان ولیعصر (ونک)',
    city: 'تهران',
    address: 'استان تهران، تهران، خیابان ولیعصر، بالاتر از میدان ونک، خیابان یاسمی، پلاک ۲۴',
    x: 45,
    y: 50,
    description: 'قلب تجاری و اداری پایتخت با دسترسی سریع به بزرگراه کردستان و مدرس'
  },
  {
    id: '5',
    name: 'شیراز - خیابان ارم و باغ ارم',
    city: 'شیراز',
    address: 'استان فارس، شیراز، میدان ارم، ابتدای خیابان ارم، روبروی درب اصلی باغ تاریخی ارم',
    x: 35,
    y: 70,
    description: 'منطقه اصیل و سرسبز شیراز با دسترسی عالی به دانشگاه شیراز'
  },
  {
    id: '6',
    name: 'اصفهان - میدان نقش جهان',
    city: 'اصفهان',
    address: 'استان اصفهان، اصفهان، خیابان سپه، میدان تاریخی نقش جهان، بازار بزرگ صنایع دستی اصفهان',
    x: 55,
    y: 60,
    description: 'مرکز گردشگری تاریخی اصفهان با بافت اصیل و سنتی'
  },
  {
    id: '7',
    name: 'مشهد - خیابان امام رضا (ع)',
    city: 'مشهد',
    address: 'استان خراسان رضوی، مشهد، خیابان امام رضا، امام رضا ۸، نبش چهارراه اول، پلاک ۴۲',
    x: 65,
    y: 25,
    description: 'منطقه زیارتی و توریستی مشهد با فاصله کمتر از ۱۰ دقیقه پیاده تا حرم مطهر'
  },
  {
    id: '8',
    name: 'چالوس - نمک‌آبرود',
    city: 'چالوس',
    address: 'استان مازندران، نمک‌آبرود، محله توریستی هچیرود، انتهای بلوار صنوبر، مجتمع اقامتی یاس',
    x: 15,
    y: 40,
    description: 'محدوده جنگلی و ساحلی شمال کشور با تله‌کابین و کارتینگ بین‌المللی'
  }
];

interface InteractiveMapPickerProps {
  initialAddress: string;
  onSelectAddress: (address: string) => void;
  onClose: () => void;
}

export function InteractiveMapPicker({ initialAddress, onSelectAddress, onClose }: InteractiveMapPickerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<MapPreset[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<MapPreset>(PRESET_LOCATIONS[0]);
  const [pinPosition, setPinPosition] = useState({ x: PRESET_LOCATIONS[0].x, y: PRESET_LOCATIONS[0].y });
  const [zoomLevel, setZoomLevel] = useState(1);
  const [customMarkerAddress, setCustomMarkerAddress] = useState('');
  const [tempCoords, setTempCoords] = useState({ lat: '26.5434', lng: '53.9876' });
  const [activeTab, setActiveTab] = useState<'all' | 'kish' | 'tehran' | 'others'>('all');
  const [showNotification, setShowNotification] = useState(false);

  // Filter presets based on tabs
  const filteredPresets = PRESET_LOCATIONS.filter(item => {
    if (activeTab === 'kish') return item.city === 'کیش';
    if (activeTab === 'tehran') return item.city === 'تهران';
    if (activeTab === 'others') return item.city !== 'کیش' && item.city !== 'تهران';
    return true;
  });

  // Handle Search Input Change
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const results = PRESET_LOCATIONS.filter(loc => 
        loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Try to find if initialAddress matches any preset
  useEffect(() => {
    if (initialAddress) {
      const match = PRESET_LOCATIONS.find(loc => initialAddress.includes(loc.city) || initialAddress.includes(loc.name));
      if (match) {
        setSelectedLocation(match);
        setPinPosition({ x: match.x, y: match.y });
        setCustomMarkerAddress(match.address);
        generateMockCoords(match.x, match.y);
      } else {
        setCustomMarkerAddress(initialAddress);
      }
    }
  }, [initialAddress]);

  const generateMockCoords = (x: number, y: number) => {
    // Generate realistic coordinates based on x/y coordinates
    const baseLat = 35.6892; // Tehran Base
    const baseLng = 51.3890;
    const diffLat = ((y - 50) / 100) * 0.15;
    const diffLng = ((x - 50) / 100) * 0.15;
    setTempCoords({
      lat: (baseLat - diffLat).toFixed(4),
      lng: (baseLng + diffLng).toFixed(4)
    });
  };

  // Select preset location
  const handleSelectPreset = (loc: MapPreset) => {
    setSelectedLocation(loc);
    setPinPosition({ x: loc.x, y: loc.y });
    setCustomMarkerAddress(loc.address);
    setSearchQuery('');
    setSearchResults([]);
    generateMockCoords(loc.x, loc.y);
  };

  // Click on any part of the map canvas
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((rect.right - e.clientX) / rect.width) * 100; // standard RTL coordinate
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Constrain to nice boundaries
    const cleanX = Math.max(5, Math.min(95, Math.round(x)));
    const cleanY = Math.max(5, Math.min(95, Math.round(y)));

    setPinPosition({ x: cleanX, y: cleanY });
    generateMockCoords(cleanX, cleanY);

    // Try to find closest preset location
    let closest: MapPreset = PRESET_LOCATIONS[0];
    let minDistance = 10000;

    PRESET_LOCATIONS.forEach(loc => {
      const dist = Math.pow(loc.x - cleanX, 2) + Math.pow(loc.y - cleanY, 2);
      if (dist < minDistance) {
        minDistance = dist;
        closest = loc;
      }
    });

    // If click is very close to a preset, use its address, otherwise generate custom address
    if (minDistance < 150) {
      setSelectedLocation(closest);
      setCustomMarkerAddress(closest.address);
    } else {
      // Dynamic generative Persian address based on coordinates clicked
      const cities = ['کیش', 'تهران', 'شیراز', 'اصفهان', 'مشهد', 'چالوس'];
      const streets = ['بلوار دریا', 'بلوار دادمان', 'خیابان حافظ', 'بلوار مرجان', 'خیابان ارم', 'خیابان پاسداران', 'بلوار اقیانوس'];
      const alleys = ['کوچه بهار', 'کوچه نسترن', 'کوچه یاس', 'فرعی ۲', 'بن‌بست گل‌ها', 'خیابان لاله'];
      
      const city = cities[Math.floor((cleanX + cleanY) % cities.length)];
      const street = streets[Math.floor(cleanX % streets.length)];
      const alley = alleys[Math.floor(cleanY % alleys.length)];
      const bldNo = Math.floor((cleanX * cleanY) % 88) + 12;

      const generatedAddress = `استان ${city === 'کیش' ? 'هرمزگان' : city === 'چالوس' ? 'مازندران' : city === 'شیراز' ? 'فارس' : city === 'اصفهان' ? 'اصفهان' : 'تهران'}، ${city === 'کیش' ? 'جزیره کیش' : city}، ${street}، ${alley}، پلاک ${bldNo}، واحد ${Math.floor(cleanY % 4) + 1}`;
      
      setSelectedLocation({
        id: 'custom',
        name: `موقعیت انتخابی شما (${city})`,
        city: city,
        address: generatedAddress,
        x: cleanX,
        y: cleanY,
        description: 'موقعیت سفارشی پین شده روی نقشه گرافیکی پارادایس'
      });
      setCustomMarkerAddress(generatedAddress);
    }
  };

  // Zoom management
  const handleZoomIn = () => setZoomLevel(prev => Math.min(2.5, prev + 0.25));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(0.75, prev - 0.25));

  // Current positioning of locate
  const handleLocateMe = () => {
    // Center to standard Kish preset or high preference
    const favorite = PRESET_LOCATIONS[0]; // Kish
    setPinPosition({ x: favorite.x, y: favorite.y });
    setSelectedLocation(favorite);
    setCustomMarkerAddress(favorite.address);
    generateMockCoords(favorite.x, favorite.y);
    
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // Submit address back
  const handleConfirm = () => {
    onSelectAddress(customMarkerAddress);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto" dir="rtl">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] max-w-5xl w-full h-[85vh] max-h-[calc(100vh-2rem)] my-auto overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-300">
        
        {/* RIGHT SIDE: Interactive Map Area (Takes 65%) */}
        <div className="flex-grow md:w-[65%] h-1/2 md:h-full relative bg-slate-100 dark:bg-[#070913] flex flex-col overflow-hidden">
          
          {/* Map Top Bar */}
          <div className="absolute top-4 inset-x-4 z-20 flex gap-2">
            <div className="relative flex-1">
              <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="جستجوی شهر، محله یا خیابان روی نقشه..."
                className="w-full bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 p-3.5 pr-12 rounded-2xl text-xs font-black outline-none focus:border-blue-500 shadow-xl backdrop-blur-md transition-all text-slate-800 dark:text-white"
              />
              
              {/* Search Suggestions Popup */}
              {searchResults.length > 0 && (
                <div className="absolute top-[calc(100%+8px)] inset-x-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 shadow-2xl z-50 max-h-56 overflow-y-auto custom-scrollbar">
                  {searchResults.map(loc => (
                    <button 
                      key={loc.id}
                      onClick={() => handleSelectPreset(loc)}
                      className="w-full text-right p-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-xl transition-all flex items-start gap-3 border border-transparent hover:border-slate-100 dark:hover:border-slate-800 group"
                    >
                      <MapPin size={16} className="text-blue-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <div>
                        <span className="block text-xs font-black text-slate-900 dark:text-white leading-none">{loc.name}</span>
                        <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-bold mt-1.5 leading-none">{loc.address}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button 
              onClick={handleLocateMe}
              className="w-12 h-12 bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-center text-slate-600 dark:text-slate-300 shadow-xl backdrop-blur-md hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
              title="مکان‌یابی فعلی من"
            >
              <Locate size={18} />
            </button>
          </div>

          {/* Toast Notification */}
          {showNotification && (
            <div className="absolute bottom-20 right-4 z-20 bg-emerald-600 text-white text-[11px] font-black px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 animate-in slide-in-from-bottom-4 duration-300">
              <Check size={14} className="stroke-[3]" />
              <span>مکان‌یابی جی‌پی‌اس با موفقیت روی جزیره زیبای کیش هماهنگ شد.</span>
            </div>
          )}

          {/* Interactive Custom Styled Map Canvas */}
          <div 
            onClick={handleMapClick}
            className="flex-1 w-full relative overflow-hidden cursor-crosshair select-none"
          >
            {/* Ambient Map Grid Backdrop */}
            <div className="absolute inset-0 bg-slate-50 dark:bg-[#070a1e]" style={{ backgroundImage: 'radial-gradient(#1e293b 0.5px, transparent 0.5px), radial-gradient(#1e293b 0.5px, #070a1e 0.5px)', backgroundSize: '24px 24px', backgroundPosition: '0 0, 12px 12px', opacity: 0.15 }}></div>

            {/* Map Canvas viewport with zoom simulation */}
            <div 
              className="absolute inset-0 w-full h-full transition-transform duration-500 ease-out flex items-center justify-center"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              {/* Complex Vector Map Design (Mock layout with highways, sea, airport, blocks) */}
              <div className="absolute inset-4 rounded-[2rem] border-2 border-dashed border-slate-200/40 dark:border-slate-800/30 overflow-hidden w-[95%] h-[95%] bg-slate-100 dark:bg-[#0c0f2b]">
                
                {/* Simulated Sea Water (Kish Island Gulf Area) */}
                <div className="absolute bottom-0 right-0 w-[45%] h-[40%] bg-blue-500/15 dark:bg-blue-400/10 rounded-tl-[8rem] border-t border-l border-blue-400/20 backdrop-blur-sm flex items-end justify-end p-6">
                  <div className="flex items-center gap-1.5 text-blue-500/50 dark:text-blue-400/30 text-[10px] font-black uppercase tracking-wider">
                    <Compass size={14} className="animate-spin duration-[10000ms]" />
                    <span>خلیج همیشگی فارس</span>
                  </div>
                </div>

                {/* Simulated Green Parks */}
                <div className="absolute top-12 left-16 w-32 h-20 bg-emerald-500/10 rounded-full blur-md"></div>
                <div className="absolute top-12 left-16 w-28 h-16 bg-emerald-500/5 border border-emerald-500/10 rounded-[2rem] flex items-center justify-center text-emerald-600/45 dark:text-emerald-500/30 text-[9px] font-bold">پارک بزرگ پرواز</div>

                <div className="absolute bottom-24 left-1/4 w-36 h-24 bg-emerald-500/10 rounded-full blur-md"></div>
                <div className="absolute bottom-24 left-1/4 w-32 h-20 bg-emerald-500/5 border border-emerald-500/10 rounded-[2rem] flex items-center justify-center text-emerald-600/45 dark:text-emerald-500/30 text-[9px] font-bold">باغ ملی ارم</div>

                {/* Simulated Ring Road / Highways */}
                <svg className="absolute inset-0 w-full h-full opacity-35 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 0 100 Q 250 200 500 50 T 1000 150" fill="none" stroke="#2563eb" strokeWidth="8" strokeLinecap="round" className="stroke-slate-200 dark:stroke-slate-800" />
                  <path d="M 0 100 Q 250 200 500 50 T 1000 150" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" className="stroke-blue-500/50 dark:stroke-blue-500/40" strokeDasharray="6 4" />
                  
                  <path d="M 150 0 L 150 800" fill="none" stroke="#e2e8f0" strokeWidth="6" className="stroke-slate-200 dark:stroke-slate-800" />
                  <path d="M 550 0 Q 400 400 550 800" fill="none" stroke="#e2e8f0" strokeWidth="6" className="stroke-slate-200 dark:stroke-slate-800" />
                  
                  {/* Grid Lines */}
                  <line x1="20%" y1="0" x2="20%" y2="100%" stroke="currentColor" strokeWidth="0.5" className="text-slate-200/30 dark:text-slate-800/30" />
                  <line x1="40%" y1="0" x2="40%" y2="100%" stroke="currentColor" strokeWidth="0.5" className="text-slate-200/30 dark:text-slate-800/30" />
                  <line x1="60%" y1="0" x2="60%" y2="100%" stroke="currentColor" strokeWidth="0.5" className="text-slate-200/30 dark:text-slate-800/30" />
                  <line x1="80%" y1="0" x2="80%" y2="100%" stroke="currentColor" strokeWidth="0.5" className="text-slate-200/30 dark:text-slate-800/30" />
                  <line x1="0" y1="20%" x2="100%" y2="20%" stroke="currentColor" strokeWidth="0.5" className="text-slate-200/30 dark:text-slate-800/30" />
                  <line x1="0" y1="40%" x2="100%" y2="40%" stroke="currentColor" strokeWidth="0.5" className="text-slate-200/30 dark:text-slate-800/30" />
                  <line x1="0" y1="60%" x2="100%" y2="60%" stroke="currentColor" strokeWidth="0.5" className="text-slate-200/30 dark:text-slate-800/30" />
                  <line x1="0" y1="80%" x2="100%" y2="80%" stroke="currentColor" strokeWidth="0.5" className="text-slate-200/30 dark:text-slate-800/30" />
                </svg>

                {/* Suburbs & Preset Static Marker indicators */}
                {PRESET_LOCATIONS.map(loc => (
                  <div 
                    key={loc.id} 
                    className="absolute cursor-pointer transition-all hover:scale-110 flex flex-col items-center group"
                    style={{ right: `${loc.x}%`, top: `${loc.y}%` }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectPreset(loc);
                    }}
                  >
                    <div className="w-5 h-5 rounded-full bg-slate-900/10 dark:bg-white/10 group-hover:bg-blue-500/20 border border-slate-300 dark:border-slate-700 flex items-center justify-center shadow-sm backdrop-blur-sm">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-400 group-hover:bg-blue-500 transition-colors"></div>
                    </div>
                    <span className="mt-1 bg-white/95 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 px-2 py-0.5 rounded-lg border border-slate-200/60 dark:border-slate-800 text-[8px] font-black shadow-sm group-hover:border-blue-500 dark:group-hover:border-blue-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-all leading-none opacity-50 group-hover:opacity-100 whitespace-nowrap">
                      {loc.name.split(' - ')[1] || loc.name}
                    </span>
                  </div>
                ))}

                {/* Dynamic Floating Landmarks/Hotels indicators */}
                <div className="absolute top-[30%] right-[30%] text-[8px] text-slate-400 font-black flex items-center gap-1 opacity-40">
                  <Compass size={10} /> فرودگاه بین‌المللی
                </div>
                <div className="absolute top-[68%] right-[78%] text-[8px] text-slate-400 font-black flex items-center gap-1 opacity-40">
                  <Compass size={10} /> اسکله بزرگ کیش
                </div>
              </div>

              {/* Dynamic Interactive Active Pin with Ring Radiations */}
              <div 
                className="absolute transition-all duration-300 ease-out pointer-events-none z-10"
                style={{ right: `${pinPosition.x}%`, top: `${pinPosition.y}%` }}
              >
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-16 h-16 bg-blue-500/20 rounded-full animate-ping"></div>
                  <div className="absolute w-8 h-8 bg-blue-500/30 rounded-full animate-pulse"></div>
                  <div className="relative -mt-8 flex flex-col items-center">
                    <div className="bg-blue-600 dark:bg-blue-500 text-white p-2.5 rounded-full shadow-2xl border-2 border-white dark:border-slate-900 animate-bounce">
                      <MapPin size={18} fill="currentColor" />
                    </div>
                    {/* Tiny triangle under pin */}
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-blue-600 dark:border-t-blue-500 -mt-0.5"></div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Map Left Zoom Controls */}
          <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-1.5 shadow-xl">
            <button 
              onClick={handleZoomIn}
              className="w-10 h-10 bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-center text-slate-700 dark:text-slate-300 backdrop-blur-sm hover:text-blue-500 transition cursor-pointer"
              title="بزرگنمایی"
            >
              <ZoomIn size={16} />
            </button>
            <button 
              onClick={handleZoomOut}
              className="w-10 h-10 bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-center text-slate-700 dark:text-slate-300 backdrop-blur-sm hover:text-blue-500 transition cursor-pointer"
              title="کوچکنمایی"
            >
              <ZoomOut size={16} />
            </button>
          </div>

          {/* Coordinates indicator */}
          <div className="absolute bottom-4 left-4 z-20 bg-slate-900/80 text-white font-mono text-[9px] px-3 py-1.5 rounded-xl backdrop-blur-md border border-slate-800/40">
            LAT: {tempCoords.lat} , LNG: {tempCoords.lng}
          </div>

        </div>

        {/* LEFT SIDE: Selection Details & Address Preview (Takes 35%) */}
        <div className="w-full md:w-[35%] h-1/2 md:h-full bg-slate-50 dark:bg-slate-950 border-t md:border-t-0 md:border-r border-slate-200 dark:border-slate-850 flex flex-col justify-between p-6 overflow-y-auto">
          
          <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-md font-black text-slate-900 dark:text-white leading-tight">مکان‌یابی و ثبت آدرس</h3>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold block mt-1">جهت مکان‌یابی و درج خودکار آدرس دقیق</span>
              </div>
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-800/80 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Quick Presets Slider */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 block">شهرها و مناطق نمونه پارادایس</label>
              <div className="flex gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
                {(['all', 'kish', 'tehran', 'others'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "flex-1 py-1.5 rounded-lg text-[9px] font-black transition-all cursor-pointer",
                      activeTab === tab
                        ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                    )}
                  >
                    {tab === 'all' ? 'همه' : tab === 'kish' ? 'کیش' : tab === 'tehran' ? 'تهران' : 'سایر'}
                  </button>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-1.5 max-h-28 overflow-y-auto custom-scrollbar p-0.5">
                {filteredPresets.map(loc => (
                  <button
                    key={loc.id}
                    onClick={() => handleSelectPreset(loc)}
                    className={cn(
                      "p-2 text-right rounded-xl border text-[10px] font-bold transition-all truncate cursor-pointer",
                      selectedLocation.id === loc.id
                        ? "border-blue-500 bg-blue-50/40 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400"
                        : "border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-750 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"
                    )}
                    title={loc.name}
                  >
                    {loc.name.split(' - ')[1] || loc.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Selection Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 p-4 rounded-2xl shadow-sm space-y-3.5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 shrink-0">
                  <MapPin size={12} />
                </div>
                <span className="text-[11px] font-black text-slate-900 dark:text-white">{selectedLocation.name}</span>
              </div>
              
              {selectedLocation.description && (
                <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-relaxed text-justify">
                  {selectedLocation.description}
                </p>
              )}

              {/* Coordinates Preview */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/50 grid grid-cols-2 gap-2 text-[10px] font-bold text-slate-500 dark:text-slate-400 font-mono">
                <div>عرض جغرافیایی: {tempCoords.lat}</div>
                <div>طول جغرافیایی: {tempCoords.lng}</div>
              </div>
            </div>

            {/* Generative address box */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 block">آدرس پستی استخراج شده از موقعیت</label>
              <textarea
                value={customMarkerAddress}
                onChange={e => setCustomMarkerAddress(e.target.value)}
                rows={4}
                className="w-full border border-slate-200 dark:border-slate-800 p-3.5 rounded-2xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-xs font-bold leading-relaxed outline-none focus:border-blue-500 transition-all resize-none shadow-inner"
                placeholder="آدرس به صورت خودکار با تغییر پین آپدیت می‌شود..."
              />
              <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold block leading-relaxed">
                * شما می‌توانید این آدرس استخراج شده را به صورت دستی تصحیح یا تکمیل کنید.
              </span>
            </div>

          </div>

          {/* Confirm Button row */}
          <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/50 flex items-center gap-2 mt-6">
            <button
              onClick={handleConfirm}
              className="flex-1 inline-flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-xs font-black shadow-lg shadow-blue-500/10 transition-all cursor-pointer"
            >
              <Check size={14} className="stroke-[3]" />
              تایید و ثبت این آدرس در فرم
            </button>
            <button
              onClick={onClose}
              className="px-4 py-3 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              انصراف
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
