import React, { useState, useEffect } from "react";
import { cn, toPersianDigits } from "@/lib/utils";
import { BookingModal } from "./BookingModal";
import { 
  Map, 
  List, 
  LayoutGrid,
  SlidersHorizontal, 
  Check, 
  Star, 
  MapPin, 
  Coffee, 
  Wifi, 
  Car, 
  Waves, 
  Sparkles, 
  Heart, 
  Info, 
  Share2, 
  X, 
  ArrowLeftRight,
  CalendarDays,
  Users,
  ChevronDown,
  Plus,
  Minus,
  Compass,
  Clock
} from "lucide-react";
import { DateRangePicker, JalaliDate, formatJalaliDate } from "./DateRangePicker";
import { getCustomServices, CustomService, getServicesDb } from "../lib/servicesStore";

const ImageCarousel = ({ images, title }: { images: string[], title: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  if (!images || images.length === 0) return null;
  if (images.length === 1) {
    return <img src={images[0]} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />;
  }

  const next = (e: React.MouseEvent) => { e.stopPropagation(); setCurrentIndex((prev) => (prev + 1) % images.length); };
  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setCurrentIndex((prev) => (prev - 1 + images.length) % images.length); };

  return (
    <div className="relative w-full h-full group/carousel">
      <img src={images[currentIndex]} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
      <button onClick={prev} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-opacity opacity-0 group-hover/carousel:opacity-100 z-20 cursor-pointer backdrop-blur-md">
        <ChevronDown size={18} className="rotate-90" />
      </button>
      <button onClick={next} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-opacity opacity-0 group-hover/carousel:opacity-100 z-20 cursor-pointer backdrop-blur-md">
        <ChevronDown size={18} className="-rotate-90" />
      </button>
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-20">
        {images.map((_, i) => (
          <div key={i} className={`h-1.5 rounded-full transition-all ${i === currentIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`} />
        ))}
      </div>
    </div>
  );
};

interface SerpViewProps {
  onSelect: () => void;
  activeCategory: string;
}

interface SharingHotel {
  id: string;
  name: string;
  stars: number;
  price: string;
  location: string;
  image: string;
  rating: string;
  desc: string;
}

interface CompareHotel {
  id: string;
  name: string;
  stars: number;
  price: string;
  originalPrice?: string;
  location: string;
  image: string;
  rating: string;
  ratingWord: string;
  reviewsCount: number;
  desc: string;
  breakfast: string;
  wifi: string;
  pool: string;
  gym: string;
  parking: string;
  cancellation: string;
  distanceToCenter: string;
  specialBadge?: string;
  priceNum: number;
  amenityList: { name: string; icon: string }[];
  coords: { top: string; left: string };
  propertyType: string;
}

const HOTELS: CompareHotel[] = [
  {
    id: "espinas",
    name: "هتل بین‌المللی اسپیناس پالاس",
    stars: 5,
    price: "۱۴,۸۸۰,۰۰۰",
    originalPrice: "۱۸,۶۰۰,۰۰۰",
    location: "تهران، سعادت آباد",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
    rating: "۴.۸",
    ratingWord: "عالی",
    reviewsCount: 120,
    desc: "صبحانه بوفه، اینترنت رایگان، پارکینگ، کنسلی رایگان",
    breakfast: "بوفه مجلل رایگان",
    wifi: "رایگان (سرعت بالا و نامحدود)",
    pool: "مجموعه استخر، سونا و اسپا (رایگان)",
    gym: "باشگاه ورزشی فوق‌پیشرفته",
    parking: "پارکینگ مسقف رایگان",
    cancellation: "کنسلی رایگان تا ۴۸ ساعت قبل",
    distanceToCenter: "۱۵ کیلومتر (۲۵ دقیقه)",
    specialBadge: "پیشنهاد ویژه",
    priceNum: 14880000,
    amenityList: [
      { name: "صبحانه بوفه", icon: "coffee" },
      { name: "اینترنت رایگان", icon: "wifi" },
      { name: "پارکینگ", icon: "car" }
    ],
    coords: { top: "35%", left: "45%" },
    propertyType: "هتل مجلل"
  },
  {
    id: "shahan",
    name: "هتل بزرگ شاهان تهران",
    stars: 5,
    price: "۱۰,۲۰۰,۰۰۰",
    location: "تهران، میدان ونک",
    image: "https://images.unsplash.com/photo-1542314831-c6a4d14d8373?q=80&w=800&auto=format&fit=crop",
    rating: "۴.۶",
    ratingWord: "عالی",
    reviewsCount: 240,
    desc: "اینترنت رایگان، استخر، صبحانه مجلل، پارکینگ رایگان",
    breakfast: "بوفه گرم رایگان",
    wifi: "رایگان (سرعت بالا)",
    pool: "استخر روباز و جکوزی",
    gym: "دارد (با هزینه جداگانه)",
    parking: "پارکینگ اختصاصی رایگان",
    cancellation: "کنسلی رایگان تا ۲۴ ساعت قبل",
    distanceToCenter: "۸ کیلومتر (۱۵ دقیقه)",
    priceNum: 10200000,
    amenityList: [
      { name: "اینترنت رایگان", icon: "wifi" },
      { name: "استخر", icon: "waves" },
      { name: "صبحانه مجلل", icon: "coffee" }
    ],
    coords: { top: "60%", left: "60%" },
    propertyType: "هتل مجلل"
  },
  {
    id: "azadi",
    name: "هتل پارسیان آزادی تهران",
    stars: 5,
    price: "۸,۷۰۰,۰۰۰",
    originalPrice: "۹,۵۰۰,۰۰۰",
    location: "تهران، تقاطع بزرگراه چمران",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800&auto=format&fit=crop",
    rating: "۴.۵",
    ratingWord: "خیلی خوب",
    reviewsCount: 180,
    desc: "استخر و سونا، اینترنت رایگان، باشگاه ورزشی، پارکینگ رایگان",
    breakfast: "بوفه قاره‌ای رایگان",
    wifi: "رایگان (محدود به اتاق و لابی)",
    pool: "استخر سرپوشیده و سونا",
    gym: "باشگاه بدنسازی مجهز",
    parking: "پارکینگ روباز رایگان",
    cancellation: "غیر قابل استرداد (جریمه کامل)",
    distanceToCenter: "۱۲ کیلومتر (۲۰ دقیقه)",
    priceNum: 8700000,
    amenityList: [
      { name: "اینترنت رایگان", icon: "wifi" },
      { name: "باشگاه ورزشی", icon: "sparkles" },
      { name: "استخر سرپوشیده", icon: "waves" }
    ],
    coords: { top: "48%", left: "30%" },
    propertyType: "هتل مجلل"
  },
  {
    id: "niloo",
    name: "هتل آپارتمان نیلو تهران",
    stars: 4,
    price: "۵,۴۰۰,۰۰۰",
    originalPrice: "۶,۲۰۰,۰۰۰",
    location: "تهران، خیابان ولیعصر",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800&auto=format&fit=crop",
    rating: "۴.۳",
    ratingWord: "خیلی خوب",
    reviewsCount: 95,
    desc: "محیط آرام، دسترسی عالی به ولیعصر، اینترنت پرسرعت رایگان، آشپزخانه مجهز",
    breakfast: "بوفه قاره‌ای رایگان",
    wifi: "رایگان (نامحدود و پرسرعت)",
    pool: "استخر و جکوزی دارد",
    gym: "باشگاه بدنسازی کوچک",
    parking: "دارد (محدود)",
    cancellation: "کنسلی رایگان تا ۷۲ ساعت قبل",
    distanceToCenter: "۵ کیلومتر (۱۰ دقیقه)",
    priceNum: 5400000,
    amenityList: [
      { name: "اینترنت رایگان", icon: "wifi" },
      { name: "صبحانه", icon: "coffee" }
    ],
    coords: { top: "52%", left: "55%" },
    propertyType: "هتل آپارتمان"
  },
  {
    id: "hanna",
    name: "بوتیک هتل حنا تهران",
    stars: 3,
    price: "۴,۹۰۰,۰۰۰",
    location: "تهران، خیابان نوفل لوشاتو",
    image: "https://images.unsplash.com/photo-1508253730747-e833c58f37ce?q=80&w=800&auto=format&fit=crop",
    rating: "۴.۷",
    ratingWord: "عالی",
    reviewsCount: 64,
    desc: "طراحی معماری مدرن و سنتی خیره‌کننده، حیاط باصفا، گالری هنری، کافه اختصاصی",
    breakfast: "صبحانه بومی و سنتی رایگان",
    wifi: "رایگان (سرعت معمولی)",
    pool: "ندارد",
    gym: "ندارد",
    parking: "پارکینگ عمومی نزدیک هتل",
    cancellation: "غیر قابل استرداد",
    distanceToCenter: "۲ کیلومتر (۵ دقیقه)",
    priceNum: 4900000,
    amenityList: [
      { name: "صبحانه سنتی", icon: "coffee" },
      { name: "اینترنت رایگان", icon: "wifi" }
    ],
    coords: { top: "42%", left: "38%" },
    propertyType: "هتل سنتی (بوتیک)"
  },
  {
    id: "nezamiyeh",
    name: "عمارت بوم‌گردی نظامیه تهران",
    stars: 3,
    price: "۳,۲۰۰,۰۰۰",
    location: "تهران، میدان بهارستان",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800&auto=format&fit=crop",
    rating: "۴.۲",
    ratingWord: "خیلی خوب",
    reviewsCount: 42,
    desc: "فضای اصیل قاجاری، حیاط ایرانی با حوض فیروزه‌ای، چایخانه سنتی، راهنمای گردشگری محلی",
    breakfast: "صبحانه محلی رایگان",
    wifi: "رایگان در محوطه عمومی",
    pool: "ندارد",
    gym: "ندارد",
    parking: "ندارد",
    cancellation: "کنسلی رایگان تا ۴۸ ساعت قبل",
    distanceToCenter: "۱ کیلومتر (۳ دقیقه)",
    priceNum: 3200000,
    amenityList: [
      { name: "صبحانه سنتی", icon: "coffee" },
      { name: "اینترنت", icon: "wifi" }
    ],
    coords: { top: "30%", left: "25%" },
    propertyType: "اقامتگاه بوم‌گردی"
  }
];


export interface CustomServiceCardProps {
  service: CustomService;
  bookingGuests: number;
  isAlreadyBooked: boolean;
  onBook: (id: string) => void;
}

export const CustomServiceCard: React.FC<CustomServiceCardProps> = ({ service, bookingGuests, isAlreadyBooked, onBook }) => {
  const images = service.images && service.images.length > 0 ? service.images : [service.image].filter(Boolean);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const handleNextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-5 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
      <div className="space-y-4">
        {/* Images Carousel */}
        {images.length > 0 && (
          <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 shadow-inner group/carousel">
            <img 
              src={images[currentImgIndex]} 
              alt={service.title} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {images.length > 1 && (
              <>
                <button 
                  onClick={handlePrevImg}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-opacity opacity-0 group-hover/carousel:opacity-100 z-10 cursor-pointer"
                >
                  <ChevronDown size={16} className="rotate-90" />
                </button>
                <button 
                  onClick={handleNextImg}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-opacity opacity-0 group-hover/carousel:opacity-100 z-10 cursor-pointer"
                >
                  <ChevronDown size={16} className="-rotate-90" />
                </button>
                <div className="absolute bottom-2 right-1/2 translate-x-1/2 flex gap-1 bg-black/30 px-2 py-0.5 rounded-full">
                  {images.map((_, i) => (
                    <div 
                      key={i} 
                      className={cn("w-1.5 h-1.5 rounded-full transition-all", i === currentImgIndex ? "bg-white w-3" : "bg-white/50")}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Details */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-blue-600 dark:text-blue-400 text-[10px] font-bold tracking-wider block">{service.category}</span>
            {service.location && (
              <span className="text-slate-400 dark:text-slate-500 text-[10px] font-bold flex items-center gap-0.5">
                <MapPin size={10} />
                {service.location}
              </span>
            )}
          </div>
          <h4 className="font-bold text-slate-950 dark:text-white text-base font-sans">{service.title}</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium line-clamp-2">{service.description}</p>
          
          <div className="flex flex-wrap gap-2 items-center text-[10px] text-slate-400 font-semibold pt-1">
            {service.hours && (
              <span className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800/30 px-2 py-1 rounded-lg">
                <Coffee size={11} />
                ساعت کاری: {toPersianDigits(service.hours)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Booking and Price */}
      <div className="border-t border-slate-100 dark:border-slate-800/50 pt-4 mt-5 space-y-3">
        <div className="flex justify-between items-center text-xs font-bold">
          <span className="text-slate-400 font-medium">هزینه نهایی ({toPersianDigits(bookingGuests.toString())} نفر):</span>
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400 font-sans tracking-tighter leading-none">
            {toPersianDigits((service.pricePerPerson * bookingGuests).toLocaleString())}{" "}
            <span className="text-[10px] font-sans font-medium text-slate-500 tracking-normal">تومان</span>
          </div>
        </div>

        {isAlreadyBooked ? (
          <button className="w-full bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed text-xs font-bold py-3 px-4 rounded-2xl flex items-center justify-center gap-2">
            ✓ به پیش‌فاکتور افزوده شد
          </button>
        ) : (
          <button 
            onClick={() => onBook(service.id)}
            className="w-full bg-slate-950 dark:bg-white text-white dark:text-slate-900 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white transition-all text-xs font-bold py-3 px-4 rounded-2xl flex items-center justify-center gap-2 transform hover:-translate-y-0.5 shadow-sm cursor-pointer"
          >
            {service.ctaText || "رزرو آنی"}
          </button>
        )}
      </div>
    </div>
  );
};

export function SerpView({ onSelect, activeCategory }: SerpViewProps) {
  const [priceRange, setPriceRange] = useState(20000000);
  const [subServiceFilter, setSubServiceFilter] = useState("all");
  const [bookedActivity, setBookedActivity] = useState<CustomService | null>(null);
  const [bookingActivity, setBookingActivity] = useState<CustomService | null>(null);
  const [ticketDetails, setTicketDetails] = useState<{ dateStr: string; timeLabel: string; guests: number; totalCost: number } | null>(null);

  useEffect(() => {
    const filter = localStorage.getItem("search_sub_service_filter") || "all";
    setSubServiceFilter(filter);
  }, []);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [sharingHotel, setSharingHotel] = useState<SharingHotel | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  // Sidebar collapsible accordion states
  const [isNameOpen, setIsNameOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isStarsOpen, setIsStarsOpen] = useState(true);
  const [isTypesOpen, setIsTypesOpen] = useState(true);
  const [isRatingOpen, setIsRatingOpen] = useState(true);
  const [isSubServicesOpen, setIsSubServicesOpen] = useState(true);
  const [isAmenitiesOpen, setIsAmenitiesOpen] = useState(true);
  const [compareList, setCompareList] = useState<CompareHotel[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  // Date and search parameters for SerpView Top Search Bar
  const [destination, setDestination] = useState("همه شهرها");
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);
  const [startDate, setStartDate] = useState<JalaliDate | null>({ day: 12, month: 4, year: 1405 });
  const [endDate, setEndDate] = useState<JalaliDate | null>({ day: 15, month: 4, year: 1405 });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [occupancy, setOccupancy] = useState({ rooms: 1, adults: 2, kids: 0 });
  const [showOccupancy, setShowOccupancy] = useState(false);
  const [showAISearch, setShowAISearch] = useState(false);
  
  const [wishlist, setWishlist] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem("hotel_wishlist");
        return saved ? JSON.parse(saved) : [];
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleWishlist = (id: string, name: string) => {
    let newWishlist;
    const isSaved = wishlist.includes(id);
    if (isSaved) {
      newWishlist = wishlist.filter(item => item !== id);
      showToast(`«${name}» از علاقه‌مندی‌ها حذف شد.`);
    } else {
      newWishlist = [...wishlist, id];
      showToast(`«${name}» به علاقه‌مندی‌ها اضافه شد.`);
    }
    setWishlist(newWishlist);
    localStorage.setItem("hotel_wishlist", JSON.stringify(newWishlist));
  };

  const isWishlisted = (id: string) => wishlist.includes(id);

  const getBookedActivityDetails = () => {
    if (!bookedActivity) return null;
    const dest = localStorage.getItem("search_activity_dest") || "کیش";
    const rawDate = localStorage.getItem("search_activity_date");
    let dateStr = "۱۴۰۵/۰۴/۱۲";
    if (rawDate) {
      try {
        const parsed = JSON.parse(rawDate);
        if (parsed && typeof parsed === "object") {
          dateStr = `${parsed.year}/${String(parsed.month).padStart(2, '0')}/${String(parsed.day).padStart(2, '0')}`;
        }
      } catch (e) {}
    }
    const rawTime = localStorage.getItem("search_activity_time") || "evening";
    const timeLabel = rawTime === "morning" ? "صبح (۰۸:۰۰ الی ۱۲:۰۰)" :
                      rawTime === "afternoon" ? "ظهر (۱۲:۰۰ الی ۱۶:۰۰)" :
                      rawTime === "evening" ? "عصر (۱۶:۰۰ الی ۲۰:۰۰)" : "شب (۲۰:۰۰ الی ۲۴:۰۰)";
                      
    const guests = Number(localStorage.getItem("search_activity_guests") || "۲");
    const totalCost = bookedActivity.pricePerPerson * guests;
    
    return {
      dest,
      dateStr,
      timeLabel,
      guests,
      totalCost
    };
  };

  const handleToggleCompare = (hotel: CompareHotel) => {
    if (compareList.some(item => item.id === hotel.id)) {
      setCompareList(compareList.filter(item => item.id !== hotel.id));
      showToast(`«${hotel.name}» از لیست مقایسه حذف شد.`);
    } else {
      if (compareList.length >= 3) {
        showToast("شما می‌توانید حداکثر ۳ هتل را همزمان مقایسه کنید.");
        return;
      }
      setCompareList([...compareList, hotel]);
      showToast(`«${hotel.name}» به لیست مقایسه اضافه شد.`);
    }
  };

  const isCompared = (id: string) => compareList.some(item => item.id === id);

  const parsePersianFloat = (str: string) => {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    let englishStr = str;
    persianDigits.forEach((digit, i) => {
      englishStr = englishStr.replace(new RegExp(digit, 'g'), i.toString());
    });
    return parseFloat(englishStr);
  };

  const getAmenityIcon = (iconName: string) => {
    switch (iconName) {
      case 'coffee': return <Coffee size={14} className="text-slate-400 shrink-0" />;
      case 'wifi': return <Wifi size={14} className="text-slate-400 shrink-0" />;
      case 'car': return <Car size={14} className="text-slate-400 shrink-0" />;
      case 'waves': return <Waves size={14} className="text-slate-400 shrink-0" />;
      case 'sparkles': return <Sparkles size={14} className="text-slate-400 shrink-0" />;
      default: return <Info size={14} className="text-slate-400 shrink-0" />;
    }
  };

  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const handleClearAllFilters = () => {
    setPriceRange(20000000);
    setSearchQuery("");
    setSelectedStars([]);
    setSelectedTypes([]);
    setMinRating(0);
    setSelectedAmenities([]);
    showToast("تمامی فیلترها بازنشانی شدند.");
  };

  const isFilterActive = 
    priceRange < 20000000 || 
    searchQuery !== "" || 
    selectedStars.length > 0 || 
    selectedTypes.length > 0 || 
    minRating > 0 || 
    selectedAmenities.length > 0;

  const filteredHotels = HOTELS.filter(hotel => {
    // 1. Search Query
    const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          hotel.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Top Bar Destination
    const matchesDest = destination === "همه" || destination === "همه شهرها" || hotel.location.includes(destination) || hotel.name.includes(destination);
    
    // 2. Price Range
    const matchesPrice = hotel.priceNum <= priceRange;
    
    // 3. Stars (Degree)
    const matchesStars = selectedStars.length === 0 || selectedStars.includes(hotel.stars);
    
    // 4. Property Type
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(hotel.propertyType);
    
    // 5. Guest Rating
    const matchesRating = parsePersianFloat(hotel.rating) >= minRating;
    
    // 6. Selected Amenities
    const matchesAmenities = selectedAmenities.length === 0 || selectedAmenities.every(amenity => {
      if (amenity === 'wifi') {
        return hotel.amenityList.some(a => a.icon === 'wifi') || hotel.wifi.includes("رایگان");
      }
      if (amenity === 'pool') {
        return hotel.amenityList.some(a => a.icon === 'waves') || !hotel.pool.includes("ندارد");
      }
      if (amenity === 'parking') {
        return hotel.amenityList.some(a => a.icon === 'car') || !hotel.parking.includes("ندارد");
      }
      if (amenity === 'breakfast') {
        return hotel.amenityList.some(a => a.icon === 'coffee') || !hotel.breakfast.includes("ندارد");
      }
      return true;
    });

    // 7. Sub-service Filter
    let matchesSubService = true;
    if (subServiceFilter !== "all") {
      const db = getServicesDb();
      const hotelData = db[hotel.id];
      let hasStandard = false;
      if (hotelData) {
        if (subServiceFilter === "رستوران و کافی‌شاپ" && hotelData.restaurant) hasStandard = true;
        if (subServiceFilter === "مجموعه اسپا و ماساژ" && hotelData.massage) hasStandard = true;
        if (subServiceFilter === "ورزشی و استخر" && hotelData.pool) hasStandard = true;
        if (subServiceFilter === "تفریح و سرگرمی" && hotelData.game) hasStandard = true;
      }
      const customs = getCustomServices();
      const hasCustom = customs.some(s => s.hotelId === hotel.id && s.category === subServiceFilter);
      matchesSubService = hasStandard || hasCustom;
    }

    return matchesSearch && matchesDest && matchesPrice && matchesStars && matchesType && matchesRating && matchesAmenities && matchesSubService;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto px-4 pt-32 pb-8 relative z-10">
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 text-xs font-bold text-rose-600 dark:text-blue-400 flex items-center gap-2 bg-blue-50/90 dark:bg-blue-700/90 backdrop-blur-md p-4 rounded-2xl border border-blue-50/50 dark:border-blue-700/50 shadow-xl animate-in fade-in slide-in-from-top-4">
          <Heart size={14} className="shrink-0 fill-rose-500 text-rose-500" />
          <span>{toastMessage}</span>
        </div>
      )}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-xs text-slate-500 dark:text-slate-400 font-bold flex items-center gap-2">
          <span>خانه</span> <span>/</span> <span>هتل‌های داخلی</span> <span>/</span>{" "}
          <span className="text-slate-900 dark:text-white font-bold px-3 py-1.5 bg-white/35 dark:bg-white/5 border border-white/20 dark:border-white/5 rounded-lg">هتل‌های تهران</span>
        </div>
        
        {/* View Toggle - Styled as glassy controller */}
        <div className="bg-white/40 dark:bg-slate-950/40 backdrop-blur-md p-1.5 rounded-2xl flex text-xs font-semibold shadow-md border border-white/20 dark:border-white/5">
          <button 
            onClick={() => setViewMode('grid')}
            className={cn(
              "px-4 py-2 rounded-xl transition-all flex items-center gap-2 font-bold cursor-pointer",
              viewMode === 'grid' ? 'bg-gradient-to-r from-blue-600 to-blue-600 text-white shadow-md shadow-blue-500/15' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            )}>
            <LayoutGrid size={16} /> نمایش کارت
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={cn(
              "px-4 py-2 rounded-xl transition-all flex items-center gap-2 font-bold cursor-pointer",
              viewMode === 'list' ? 'bg-gradient-to-r from-blue-600 to-blue-600 text-white shadow-md shadow-blue-500/15' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            )}>
            <List size={16} /> نمایش لیست
          </button>
          <button 
            onClick={() => setViewMode('map')}
            className={cn(
              "px-4 py-2 rounded-xl transition-all flex items-center gap-2 font-bold cursor-pointer",
              viewMode === 'map' ? 'bg-gradient-to-r from-blue-600 to-blue-600 text-white shadow-md shadow-blue-500/15' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            )}>
            <Map size={16} /> نمایش نقشه
          </button>
        </div>
      </div>

      {/* Dynamic Glassy Horizontal Search & Date Bar */}
      <div className="bg-white/45 dark:bg-[#0e132e]/30 backdrop-blur-xl border border-white/25 dark:border-white/5 rounded-3xl p-4 shadow-xl relative z-30">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch justify-between">
          
          {/* Destination */}
          <div className="flex-1 min-w-[200px] bg-white/40 hover:bg-white/60 dark:bg-slate-950/40 dark:hover:bg-slate-950/60 transition rounded-2xl p-3 flex items-center gap-3 border border-white/20 dark:border-slate-850 cursor-pointer relative"
               onClick={() => { setShowDestSuggestions(!showDestSuggestions); setShowDatePicker(false); setShowOccupancy(false); }}>
            <MapPin size={18} className="text-blue-500 shrink-0" />
            <div className="text-right flex-1">
              <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-bold mb-0.5">مقصد یا هتل</span>
              <span className="text-slate-900 dark:text-white font-bold text-xs">{destination}</span>
            </div>
            {showDestSuggestions && (
              <div onClick={e => e.stopPropagation()} className="absolute right-0 top-[calc(100%+8px)] w-64 bg-white dark:bg-[#0e132e] border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl p-2.5 z-50 text-right animate-in fade-in slide-in-from-top-2">
                <span className="block text-[10px] text-slate-400 font-bold mb-2 px-2.5">شهرهای محبوب</span>
                {["تهران", "مشهد", "شیراز", "اصفهان", "کیش"].map((city) => (
                  <button key={city} onClick={() => { setDestination(city); setShowDestSuggestions(false); }} className="w-full text-right p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold rounded-xl transition text-slate-800 dark:text-slate-200 flex items-center gap-2 cursor-pointer">
                    <MapPin size={12} className="text-slate-400" />
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Date Picker (Dynamic DateRangePicker) */}
          <div className="flex-1 min-w-[260px] bg-white/40 hover:bg-white/60 dark:bg-slate-950/40 dark:hover:bg-slate-950/60 transition rounded-2xl p-3 flex items-center gap-3 border border-white/20 dark:border-slate-850 cursor-pointer relative"
               onClick={() => { setShowDatePicker(!showDatePicker); setShowDestSuggestions(false); setShowOccupancy(false); }}>
            <CalendarDays size={18} className="text-blue-500 shrink-0" />
            <div className="flex-1 grid grid-cols-2 divide-x divide-x-reverse divide-slate-200 dark:divide-slate-800">
              <div className="text-right">
                <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-bold mb-0.5">ورود</span>
                <span className="text-slate-900 dark:text-white font-bold text-xs">
                  {startDate ? formatJalaliDate(startDate) : "انتخاب کنید"}
                </span>
              </div>
              <div className="text-right pr-3">
                <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-bold mb-0.5">خروج</span>
                <span className="text-slate-900 dark:text-white font-bold text-xs">
                  {endDate ? formatJalaliDate(endDate) : "انتخاب کنید"}
                </span>
              </div>
            </div>
            
            {showDatePicker && (
              <div onClick={e => e.stopPropagation()} className="absolute right-0 top-[calc(100%+8px)] w-full min-w-[320px] md:w-[380px] z-50">
                <DateRangePicker 
                  startDate={startDate} 
                  endDate={endDate} 
                  onSelectRange={(start, end) => { setStartDate(start); setEndDate(end); }} 
                  onClose={() => setShowDatePicker(false)} 
                />
              </div>
            )}
          </div>

          {/* Occupancy */}
          <div className="flex-1 min-w-[200px] bg-white/40 hover:bg-white/60 dark:bg-slate-950/40 dark:hover:bg-slate-950/60 transition rounded-2xl p-3 flex items-center gap-3 border border-white/20 dark:border-slate-850 cursor-pointer relative"
               onClick={() => { setShowOccupancy(!showOccupancy); setShowDatePicker(false); setShowDestSuggestions(false); }}>
            <Users size={18} className="text-blue-500 shrink-0" />
            <div className="text-right flex-1">
              <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-bold mb-0.5">تعداد مسافر و اتاق</span>
              <span className="text-slate-900 dark:text-white font-bold text-xs">
                {occupancy.rooms} اتاق، {occupancy.adults} بزرگسال، {occupancy.kids} کودک
              </span>
            </div>
            
            {showOccupancy && (
              <div onClick={e => e.stopPropagation()} className="absolute left-0 lg:right-0 top-[calc(100%+8px)] w-72 bg-white dark:bg-[#0e132e] border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl p-4 z-50 text-right animate-in fade-in slide-in-from-top-2">
                <div className="space-y-4">
                  {/* Rooms Counter */}
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">تعداد اتاق</span>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setOccupancy({ ...occupancy, rooms: Math.max(1, occupancy.rooms - 1) })} className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400"><Minus size={12} /></button>
                      <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">{occupancy.rooms}</span>
                      <button onClick={() => setOccupancy({ ...occupancy, rooms: occupancy.rooms + 1 })} className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400"><Plus size={12} /></button>
                    </div>
                  </div>
                  {/* Adults Counter */}
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">بزرگسال</span>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setOccupancy({ ...occupancy, adults: Math.max(1, occupancy.adults - 1) })} className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400"><Minus size={12} /></button>
                      <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">{occupancy.adults}</span>
                      <button onClick={() => setOccupancy({ ...occupancy, adults: occupancy.adults + 1 })} className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400"><Plus size={12} /></button>
                    </div>
                  </div>
                  {/* Kids Counter */}
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">کودک</span>
                      <span className="text-[9px] text-slate-400 font-medium">زیر ۱۲ سال</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setOccupancy({ ...occupancy, kids: Math.max(0, occupancy.kids - 1) })} className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400"><Minus size={12} /></button>
                      <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">{occupancy.kids}</span>
                      <button onClick={() => setOccupancy({ ...occupancy, kids: occupancy.kids + 1 })} className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400"><Plus size={12} /></button>
                    </div>
                  </div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); setShowOccupancy(false); }} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-xl transition font-bold text-xs mt-4">تایید مسافران</button>
              </div>
            )}
          </div>

          {/* Search Button */}
          <div className="flex gap-2 lg:flex-row flex-col shrink-0">
            <button 
              onClick={() => {
                showToast("اطلاعات جستجو با موفقیت به‌روزرسانی شد.");
                setShowDatePicker(false);
                setShowDestSuggestions(false);
                setShowOccupancy(false);
              }}
              className="bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-xs px-8 py-3 rounded-2xl transition shadow-md shadow-blue-500/10 active:scale-95 cursor-pointer flex items-center justify-center shrink-0 flex-1 lg:flex-none"
            >
              به‌روزرسانی جستجو
            </button>
            <button 
              onClick={() => setShowAISearch(!showAISearch)} 
              className="bg-white/40 hover:bg-white/60 dark:bg-slate-950/40 dark:hover:bg-slate-950/60 backdrop-blur-md text-blue-600 dark:text-blue-400 font-bold rounded-2xl px-4 py-3 flex items-center justify-center transition-all border border-blue-600/20 gap-2 shrink-0 group shadow-lg"
              title="جستجوی هوشمند با AI"
            >
              <Sparkles size={16} className="group-hover:animate-pulse" />
            </button>
          </div>
        </div>

        {/* Expandable AI Search Panel */}
        {showAISearch && (
            <div className="mt-4 bg-gradient-to-r from-blue-600/5 via-blue-500/10 to-transparent border border-blue-600/20 dark:border-blue-600/10 rounded-2xl p-4 animate-in slide-in-from-top-2">
                <div className="flex items-center gap-2 mb-3">
                   <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shrink-0 shadow-md shadow-blue-600/20">
                     <Sparkles size={14} className="text-white" />
                   </div>
                   <h4 className="text-sm font-bold text-blue-700 dark:text-blue-400">جستجوی هوشمند با Gemini</h4>
                </div>
                <div className="flex items-center gap-2 bg-white/50 dark:bg-slate-900/50 border border-blue-600/20 rounded-xl p-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-600/30 transition-all">
                   <input 
                      type="text" 
                      placeholder="مثلاً: یه هتل خوب تو کیش برای ماه عسل می‌خوام که استخر داشته باشه..."
                      className="flex-1 bg-transparent border-none focus:outline-none text-xs sm:text-sm px-2 py-1 text-slate-800 dark:text-slate-200 placeholder:text-slate-400"
                      dir="rtl"
                   />
                   <button onClick={() => showToast("در حال پردازش هوشمند...")} className="bg-blue-600 hover:bg-blue-600 text-white rounded-lg px-4 py-2 text-xs font-bold transition-colors">
                      بگرد
                   </button>
                </div>
            </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Sidebar Filters - Redesigned to Collapsible Accordion Panels */}
        <aside className="w-full md:w-72 shrink-0 space-y-4">
          <div className="bg-white/45 dark:bg-[#0e132e]/30 backdrop-blur-xl border border-white/25 dark:border-white/5 rounded-[2.5rem] p-6 shadow-xl space-y-5 sticky top-28">
            
            {/* Sidebar Header */}
            <div className="flex justify-between items-center pb-4 border-b border-white/20 dark:border-white/5">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-blue-500" /> فیلترها
              </h3>
              {isFilterActive && (
                <button 
                  onClick={handleClearAllFilters}
                  className="text-[11px] font-bold text-rose-500 hover:text-rose-600 transition-colors cursor-pointer"
                >
                  حذف همه
                </button>
              )}
            </div>

            {/* 1. Hotel Name Search Accordion */}
            <div className="space-y-3">
              <button 
                onClick={() => setIsNameOpen(!isNameOpen)}
                className="w-full flex justify-between items-center text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer group"
              >
                <span className="flex items-center gap-2">
                  <span className={cn("w-1.5 h-1.5 rounded-full", searchQuery ? "bg-emerald-500" : "bg-blue-500")} />
                  جستجوی نام هتل
                </span>
                <div className="flex items-center gap-1.5">
                  {searchQuery && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  )}
                  <ChevronDown size={14} className={cn("text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-transform duration-300", isNameOpen && "rotate-180")} />
                </div>
              </button>
              
              {isNameOpen && (
                <div className="animate-in fade-in slide-in-from-top-1 duration-200">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="نام هتل را تایپ کنید..."
                    className="w-full border border-slate-200/50 dark:border-slate-800/50 p-3.5 rounded-2xl text-xs font-bold outline-none bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-[#0c102a]/75 focus:border-blue-500 dark:focus:border-blue-400 transition-all placeholder:font-normal placeholder:text-slate-400"
                  />
                </div>
              )}
            </div>

            <hr className="border-white/20 dark:border-white/5" />

            {/* 2. Price Range Accordion */}
            <div className="space-y-3">
              <button 
                onClick={() => setIsPriceOpen(!isPriceOpen)}
                className="w-full flex justify-between items-center text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer group"
              >
                <span className="flex items-center gap-2">
                  <span className={cn("w-1.5 h-1.5 rounded-full", priceRange < 20000000 ? "bg-emerald-500" : "bg-blue-500")} />
                  محدوده قیمت
                </span>
                <div className="flex items-center gap-1.5">
                  {priceRange < 20000000 && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  )}
                  <ChevronDown size={14} className={cn("text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-transform duration-300", isPriceOpen && "rotate-180")} />
                </div>
              </button>
              
              {isPriceOpen && (
                <div className="space-y-3 animate-in fade-in slide-in-from-top-1 duration-200">
                  <input
                    type="range"
                    className="w-full accent-blue-500 cursor-pointer h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none"
                    min="500000"
                    max="20000000"
                    step="500000"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-2 font-sans font-bold bg-slate-50/50 dark:bg-slate-900/50 px-3 py-1.5 rounded-xl border border-slate-100/50 dark:border-slate-800/30">
                    <span className="tracking-tighter text-slate-400">۵۰۰,۰۰۰ تومان</span>
                    <span className="tracking-tighter text-blue-600 dark:text-blue-400">تا {toPersianDigits((priceRange / 10).toLocaleString())} تومان</span>
                  </div>
                </div>
              )}
            </div>

            <hr className="border-white/20 dark:border-white/5" />

            {/* 3. Hotel Stars Accordion */}
            <div className="space-y-3">
              <button 
                onClick={() => setIsStarsOpen(!isStarsOpen)}
                className="w-full flex justify-between items-center text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer group"
              >
                <span className="flex items-center gap-2">
                  <span className={cn("w-1.5 h-1.5 rounded-full", selectedStars.length > 0 ? "bg-emerald-500" : "bg-blue-500")} />
                  درجه هتل
                </span>
                <div className="flex items-center gap-1.5">
                  {selectedStars.length > 0 && (
                    <span className="text-[9px] font-bold bg-emerald-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-sans">{selectedStars.length}</span>
                  )}
                  <ChevronDown size={14} className={cn("text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-transform duration-300", isStarsOpen && "rotate-180")} />
                </div>
              </button>
              
              {isStarsOpen && (
                <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400 font-bold animate-in fade-in slide-in-from-top-1 duration-200">
                  {['5 ستاره', '4 ستاره', '3 ستاره'].map((starText) => {
                    const starNum = starText.includes('5') ? 5 : starText.includes('4') ? 4 : 3;
                    const isChecked = selectedStars.includes(starNum);
                    return (
                      <label key={starText} className="flex items-center gap-3 cursor-pointer group">
                        <div 
                          onClick={() => {
                            if (isChecked) {
                              setSelectedStars(selectedStars.filter(s => s !== starNum));
                            } else {
                              setSelectedStars([...selectedStars, starNum]);
                            }
                          }}
                          className={cn(
                            "w-4 h-4 rounded flex items-center justify-center transition-colors border",
                            isChecked ? "bg-emerald-500 border-emerald-500 text-white" : "border-slate-200 dark:border-slate-800 group-hover:border-blue-400/50 dark:group-hover:border-blue-400/50 bg-slate-50/50 dark:bg-slate-900/30"
                          )}
                        >
                          {isChecked && <Check size={12} strokeWidth={3} />}
                        </div>
                        <span>{starText}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            <hr className="border-white/20 dark:border-white/5" />

            {/* 4. Accommodation Type Accordion */}
            <div className="space-y-3">
              <button 
                onClick={() => setIsTypesOpen(!isTypesOpen)}
                className="w-full flex justify-between items-center text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer group"
              >
                <span className="flex items-center gap-2">
                  <span className={cn("w-1.5 h-1.5 rounded-full", selectedTypes.length > 0 ? "bg-emerald-500" : "bg-blue-500")} />
                  نوع اقامتگاه
                </span>
                <div className="flex items-center gap-1.5">
                  {selectedTypes.length > 0 && (
                    <span className="text-[9px] font-bold bg-emerald-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-sans">{selectedTypes.length}</span>
                  )}
                  <ChevronDown size={14} className={cn("text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-transform duration-300", isTypesOpen && "rotate-180")} />
                </div>
              </button>
              
              {isTypesOpen && (
                <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400 font-bold animate-in fade-in slide-in-from-top-1 duration-200">
                  {['هتل مجلل', 'هتل آپارتمان', 'اقامتگاه بوم‌گردی', 'هتل سنتی (بوتیک)'].map((type) => {
                    const isChecked = selectedTypes.includes(type);
                    return (
                      <label key={type} className="flex items-center gap-3 cursor-pointer group">
                        <div 
                          onClick={() => {
                            if (isChecked) {
                              setSelectedTypes(selectedTypes.filter(t => t !== type));
                            } else {
                              setSelectedTypes([...selectedTypes, type]);
                            }
                          }}
                          className={cn(
                            "w-4 h-4 rounded flex items-center justify-center transition-colors border",
                            isChecked ? "bg-emerald-500 border-emerald-500 text-white" : "border-slate-200 dark:border-slate-800 group-hover:border-blue-400/50 dark:group-hover:border-blue-400/50 bg-slate-50/50 dark:bg-slate-900/30"
                          )}
                        >
                          {isChecked && <Check size={12} strokeWidth={3} />}
                        </div>
                        <span>{type}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            <hr className="border-white/20 dark:border-white/5" />

            {/* 5. User Rating Accordion */}
            <div className="space-y-3">
              <button 
                onClick={() => setIsRatingOpen(!isRatingOpen)}
                className="w-full flex justify-between items-center text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer group"
              >
                <span className="flex items-center gap-2">
                  <span className={cn("w-1.5 h-1.5 rounded-full", minRating > 0 ? "bg-emerald-500" : "bg-blue-500")} />
                  امتیاز کاربران
                </span>
                <div className="flex items-center gap-1.5">
                  {minRating > 0 && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  )}
                  <ChevronDown size={14} className={cn("text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-transform duration-300", isRatingOpen && "rotate-180")} />
                </div>
              </button>
              
              {isRatingOpen && (
                <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400 font-bold animate-in fade-in slide-in-from-top-1 duration-200">
                  {[
                    { label: 'همه امتیازها', val: 0 },
                    { label: 'عالی (۴.۷ به بالا)', val: 4.7 },
                    { label: 'خیلی خوب (۴.۵ به بالا)', val: 4.5 },
                    { label: 'خوب (۴.۰ به بالا)', val: 4.0 }
                  ].map((ratingOption) => {
                    const isSelected = minRating === ratingOption.val;
                    return (
                      <label key={ratingOption.label} className="flex items-center gap-3 cursor-pointer group">
                        <div 
                          onClick={() => setMinRating(ratingOption.val)}
                          className={cn(
                            "w-4 h-4 rounded-full flex items-center justify-center transition-all border",
                            isSelected ? "bg-emerald-500 border-emerald-500 text-white" : "border-slate-200 dark:border-slate-800 group-hover:border-blue-400/50 bg-slate-50/50 dark:bg-slate-900/30"
                          )}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                        </div>
                        <span>{ratingOption.label}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            <hr className="border-white/20 dark:border-white/5" />

            {/* 6. Sub-Services Accordion */}
            <div className="space-y-3">
              <button 
                onClick={() => setIsSubServicesOpen(!isSubServicesOpen)}
                className="w-full flex justify-between items-center text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer group"
              >
                <span className="flex items-center gap-2">
                  <span className={cn("w-1.5 h-1.5 rounded-full", subServiceFilter !== "all" ? "bg-blue-600" : "bg-blue-500")} />
                  زیرخدمات اختصاصی
                </span>
                <div className="flex items-center gap-1.5">
                  {subServiceFilter !== "all" && (
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                  )}
                  <ChevronDown size={14} className={cn("text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-transform duration-300", isSubServicesOpen && "rotate-180")} />
                </div>
              </button>
              
              {isSubServicesOpen && (
                <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400 font-bold animate-in fade-in slide-in-from-top-1 duration-200">
                  {[
                    { id: "all", name: "🍽️ همه خدمات هتل" },
                    { id: "رستوران و کافی‌شاپ", name: "🍔 رستوران و کافی‌شاپ" },
                    { id: "مجموعه اسپا و ماساژ", name: "💆 مجموعه اسپا و ماساژ" },
                    { id: "ورزشی و استخر", name: "🏊 ورزشی و استخر" },
                    { id: "تفریح و سرگرمی", name: "🎮 تفریح و سرگرمی" },
                    { id: "ترانسفر و CIP", name: "🚗 ترانسفر و CIP" }
                  ].map((srv) => {
                    const isSelected = subServiceFilter === srv.id;
                    return (
                      <label key={srv.id} className="flex items-center gap-3 cursor-pointer group">
                        <div 
                          onClick={() => setSubServiceFilter(srv.id)}
                          className={cn(
                            "w-4 h-4 rounded-full flex items-center justify-center transition-all border",
                            isSelected ? "bg-blue-600 border-blue-600 text-white" : "border-slate-200 dark:border-slate-800 group-hover:border-blue-400 bg-slate-50/50 dark:bg-slate-900/30"
                          )}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                        </div>
                        <span className={cn(isSelected && "text-blue-600 font-bold")}>{srv.name}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            <hr className="border-white/20 dark:border-white/5" />

            {/* 7. Special Amenities Accordion */}
            <div className="space-y-3">
              <button 
                onClick={() => setIsAmenitiesOpen(!isAmenitiesOpen)}
                className="w-full flex justify-between items-center text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer group"
              >
                <span className="flex items-center gap-2">
                  <span className={cn("w-1.5 h-1.5 rounded-full", selectedAmenities.length > 0 ? "bg-emerald-500" : "bg-blue-500")} />
                  امکانات ویژه هتل
                </span>
                <div className="flex items-center gap-1.5">
                  {selectedAmenities.length > 0 && (
                    <span className="text-[9px] font-bold bg-emerald-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-sans">{selectedAmenities.length}</span>
                  )}
                  <ChevronDown size={14} className={cn("text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-transform duration-300", isAmenitiesOpen && "rotate-180")} />
                </div>
              </button>
              
              {isAmenitiesOpen && (
                <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400 font-bold animate-in fade-in slide-in-from-top-1 duration-200">
                  {[
                    { name: 'مجموعه استخر و اسپا', key: 'pool' },
                    { name: 'پارکینگ خودرو', key: 'parking' },
                    { name: 'اینترنت Wi-Fi', key: 'wifi' },
                    { name: 'صبحانه بوفه/سنتی', key: 'breakfast' }
                  ].map((amenity) => {
                    const isChecked = selectedAmenities.includes(amenity.key);
                    return (
                      <label key={amenity.key} className="flex items-center gap-3 cursor-pointer group">
                        <div 
                          onClick={() => {
                            if (isChecked) {
                              setSelectedAmenities(selectedAmenities.filter(a => a !== amenity.key));
                            } else {
                              setSelectedAmenities([...selectedAmenities, amenity.key]);
                            }
                          }}
                          className={cn(
                            "w-4 h-4 rounded flex items-center justify-center transition-colors border",
                            isChecked ? "bg-emerald-500 border-emerald-500 text-white" : "border-slate-200 dark:border-slate-800 group-hover:border-blue-400/50 dark:group-hover:border-blue-400/50 bg-slate-50/50 dark:bg-slate-900/30"
                          )}
                        >
                          {isChecked && <Check size={12} strokeWidth={3} />}
                        </div>
                        <span>{amenity.name}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        </aside>

        {/* Listings & Map Area */}
        <div className="flex-grow space-y-6 w-full">
          {isFilterActive && (
            <div className="flex flex-wrap gap-2 items-center bg-white/45 dark:bg-[#0e132e]/30 backdrop-blur-xl border border-white/25 dark:border-white/5 p-4 rounded-2xl shadow-sm text-xs font-semibold" dir="rtl">
              <span className="text-[11px] font-bold text-slate-400 ml-1">فیلترهای فعال:</span>
              
              {searchQuery && (
                <span className="flex items-center gap-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold px-2.5 py-1.5 rounded-xl border border-blue-500/20">
                  جستجو: {searchQuery}
                  <button onClick={() => setSearchQuery("")} className="hover:text-rose-500 font-sans mr-1 font-bold cursor-pointer">✕</button>
                </span>
              )}

              {priceRange < 20000000 && (
                <span className="flex items-center gap-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold px-2.5 py-1.5 rounded-xl border border-blue-500/20">
                  تا {toPersianDigits((priceRange / 10).toLocaleString())} میلیون
                  <button onClick={() => setPriceRange(20000000)} className="hover:text-rose-500 font-sans mr-1 font-bold cursor-pointer">✕</button>
                </span>
              )}

              {selectedStars.map(star => (
                <span key={star} className="flex items-center gap-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold px-2.5 py-1.5 rounded-xl border border-blue-500/20">
                  {star} ستاره
                  <button onClick={() => setSelectedStars(selectedStars.filter(s => s !== star))} className="hover:text-rose-500 font-sans mr-1 font-bold cursor-pointer">✕</button>
                </span>
              ))}

              {selectedTypes.map(type => (
                <span key={type} className="flex items-center gap-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold px-2.5 py-1.5 rounded-xl border border-blue-500/20">
                  {type}
                  <button onClick={() => setSelectedTypes(selectedTypes.filter(t => t !== type))} className="hover:text-rose-500 font-sans mr-1 font-bold cursor-pointer">✕</button>
                </span>
              ))}

              {minRating > 0 && (
                <span className="flex items-center gap-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold px-2.5 py-1.5 rounded-xl border border-blue-500/20">
                  امتیاز بالای {minRating}
                  <button onClick={() => setMinRating(0)} className="hover:text-rose-500 font-sans mr-1 font-bold cursor-pointer">✕</button>
                </span>
              )}

              {selectedAmenities.map(amenity => {
                const label = amenity === 'pool' ? 'استخر' : amenity === 'parking' ? 'پارکینگ' : amenity === 'wifi' ? 'اینترنت' : 'صبحانه';
                return (
                  <span key={amenity} className="flex items-center gap-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold px-2.5 py-1.5 rounded-xl border border-blue-500/20">
                    {label}
                    <button onClick={() => setSelectedAmenities(selectedAmenities.filter(a => a !== amenity))} className="hover:text-rose-500 font-sans mr-1 font-bold cursor-pointer">✕</button>
                  </span>
                );
              })}

              <button 
                onClick={handleClearAllFilters}
                className="text-[10px] font-bold text-rose-500 hover:text-white hover:bg-rose-500 border border-rose-500/20 px-3 py-1.5 rounded-xl bg-rose-500/5 transition-all mr-auto cursor-pointer"
              >
                حذف همه فیلترها
              </button>
            </div>
          )}

          {activeCategory === "villa" ? (
            <div className="bg-white/45 dark:bg-[#0e132e]/30 backdrop-blur-xl border border-white/25 dark:border-white/5 rounded-2xl p-4 flex flex-wrap items-center justify-between shadow-sm">
              <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse"></span>
                {getCustomServices().length} تفریح و سرگرمی بی‌نظیر برای شما یافت شد
              </div>
              <div className="flex gap-2">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 py-2.5 px-4 bg-slate-150/10 dark:bg-slate-900/10 rounded-xl">
                  بلیت‌های صادر شده ۱۰۰٪ آنی و الکترونیکی هستند
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-white/45 dark:bg-[#0e132e]/30 backdrop-blur-xl border border-white/25 dark:border-white/5 rounded-2xl p-4 flex flex-wrap items-center justify-between shadow-sm">
              <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse"></span>
                {filteredHotels.length} هتل منطبق یافت شد
              </div>
              <div className="flex gap-2">
                <select className="bg-white/30 dark:bg-white/5 border border-white/20 dark:border-white/5 text-xs font-bold text-slate-700 dark:text-slate-300 py-2.5 px-4 rounded-xl outline-none focus:border-blue-500 transition-colors cursor-pointer">
                  <option>مرتب‌سازی: بالاترین امتیاز</option>
                  <option>کمترین قیمت</option>
                  <option>بیشترین قیمت</option>
                </select>
              </div>
            </div>
          )}

          <div className={`grid gap-6 ${viewMode === 'map' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
            {/* Cards List */}
            <div className={cn(
              "gap-6 w-full",
              viewMode === 'list' ? "grid grid-cols-1" :
              viewMode === 'map' ? "grid grid-cols-1 xl:grid-cols-2 order-2 lg:order-1 h-[650px] overflow-y-auto pr-2 custom-scrollbar" :
              "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3"
            )}>
              
              {activeCategory === "villa" ? (
                getCustomServices().map((service) => {
                  const searchDest = localStorage.getItem("search_activity_dest") || "کیش";
                  return (
                    <div key={service.id} className={cn(
                      "bg-white/40 hover:bg-white/60 dark:bg-slate-950/40 dark:hover:bg-slate-950/60 backdrop-blur-md border border-white/20 dark:border-slate-800/30 rounded-2xl p-2 shadow-sm hover:shadow-xl transition-all duration-500 flex group h-full",
                      viewMode === 'list' ? "flex-col md:flex-row" : "flex-col"
                    )} dir="rtl">
                      <div className={cn(
                        "relative overflow-hidden shrink-0 rounded-xl bg-slate-100 dark:bg-slate-800",
                        viewMode === 'list' ? "w-full md:w-[280px] h-56 md:h-auto" : "w-full h-52"
                      )}>
                        <ImageCarousel images={[service.image, "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=800", "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800"]} title={service.title} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                        
                        <div className="absolute top-4 right-4 bg-amber-500/90 text-white text-[10px] font-bold px-3 py-1.5 rounded-full backdrop-blur-sm shadow-md flex items-center gap-1">
                          <Sparkles size={11} fill="currentColor" />
                          <span>{service.category}</span>
                        </div>
                        
                        <div className="absolute top-4 left-4 bg-black/40 text-slate-200 text-[10px] font-mono px-2 py-1 rounded-lg backdrop-blur-sm">
                          {service.id}
                        </div>

                        <div className="absolute bottom-4 right-4 flex items-center gap-1 text-[11px] font-bold text-white/95">
                          <MapPin size={12} className="text-amber-400" />
                          <span>{service.location || searchDest}</span>
                        </div>
                      </div>

                      <div className="p-4 sm:p-5 flex-grow flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
                            {service.title}
                          </h3>
                          <p className={cn(
                            "text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed",
                            viewMode === 'list' ? "line-clamp-3 h-auto" : "line-clamp-2 h-10"
                          )}>
                            {service.description}
                          </p>

                          <div className="flex flex-wrap items-center gap-1.5 mt-4 text-[11px] font-bold text-slate-600 dark:text-slate-400">
                            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/60 px-2.5 py-1.5 rounded-xl border border-slate-200/40 dark:border-slate-700/35">
                              <Clock size={12} className="text-amber-500" />
                              <span>سانس‌ها: {service.hours}</span>
                            </div>
                            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/60 px-2.5 py-1.5 rounded-xl border border-slate-200/40 dark:border-slate-700/35">
                              <Users size={12} className="text-amber-500" />
                              <span>ظرفیت: {service.capacity || 20} نفر</span>
                            </div>
                          </div>

                          {service.features && service.features.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-4">
                              {service.features.slice(0, viewMode === 'list' ? 4 : 2).map((feat, i) => (
                                <span key={i} className="bg-amber-500/5 text-blue-600 dark:text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-amber-500/10 flex items-center gap-1">
                                  <Check size={11} className="stroke-[3]" />
                                  {feat}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className={cn(
                          "border-t border-slate-100 dark:border-slate-800/50 pt-4 mt-5 flex items-center justify-between gap-4",
                          viewMode === 'list' ? "flex-row" : "flex-row"
                        )}>
                          <div className="text-right">
                            <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-bold">بلیت هر نفر</span>
                            <span className="text-blue-600 dark:text-amber-400 font-bold text-base font-sans tracking-tight">
                              {service.pricePerPerson.toLocaleString()} <span className="text-[10px] font-bold font-sans">تومان</span>
                            </span>
                          </div>

                          <button 
                            onClick={() => setBookingActivity(service)}
                            className={cn(
                              "bg-amber-500 hover:bg-blue-600 active:scale-95 text-white text-xs font-bold py-2.5 rounded-xl transition-all shadow-lg shadow-amber-500/15 cursor-pointer flex items-center justify-center gap-1",
                              viewMode === 'list' ? "px-6" : "px-4"
                            )}
                          >
                            <Compass size={13} />
                            <span>{service.ctaText || "رزرو مستقیم"}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : filteredHotels.length === 0 ? (
                <div className="bg-white/45 dark:bg-[#0e132e]/30 backdrop-blur-xl border border-white/25 dark:border-white/5 rounded-[2.5rem] p-12 text-center text-slate-500 dark:text-slate-400 font-bold">
                  <div className="text-4xl mb-4">🔍</div>
                  <p className="text-sm">هیچ هتلی با مشخصات جستجو شده یافت نشد.</p>
                  <p className="text-xs text-slate-400 mt-2">لطفاً فیلترها را تغییر دهید یا نام دیگری را جستجو کنید.</p>
                </div>
              ) : (
                filteredHotels.map((hotel) => (
                  <div key={hotel.id} className={cn(
                    "bg-white/40 hover:bg-white/60 dark:bg-slate-950/40 dark:hover:bg-slate-950/60 backdrop-blur-md border border-white/20 dark:border-slate-800/30 rounded-2xl p-2 shadow-sm hover:shadow-xl transition-all duration-500 flex group h-full",
                    viewMode === 'list' ? "flex-col md:flex-row" : "flex-col"
                  )} dir="rtl">
                    <div className={cn(
                      "relative overflow-hidden shrink-0 rounded-xl bg-slate-100 dark:bg-slate-800",
                      viewMode === 'list' ? "w-full md:w-[280px] xl:w-[320px] h-56 md:h-auto" : "w-full h-56"
                    )}>
                      <ImageCarousel images={[hotel.image, "https://images.unsplash.com/photo-1542314831-c53cd3816002?q=80&w=800", "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=800"]} title={hotel.name} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
                      
                      {hotel.specialBadge && (
                        <div className="absolute top-4 right-4 bg-rose-500 text-white text-[10px] font-bold px-3.5 py-1.5 rounded-full shadow-lg z-10 flex items-center gap-1.5 border border-blue-400/20">
                          <Sparkles size={11} fill="currentColor" />
                          {hotel.specialBadge}
                        </div>
                      )}
                      
                      <div className="absolute top-4 left-4 flex gap-1.5 z-10">
                        <button 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            toggleWishlist(hotel.id, hotel.name); 
                          }} 
                          className="p-2.5 rounded-full backdrop-blur-md bg-white/20 hover:bg-white/45 dark:bg-black/30 dark:hover:bg-black/50 border border-white/25 dark:border-white/10 transition-all text-white cursor-pointer group/heart shadow-md"
                          title="افزودن به علاقه‌مندی‌ها"
                        >
                          <Heart 
                            size={14} 
                            className={cn(
                              "transition-all duration-300 transform active:scale-125", 
                              isWishlisted(hotel.id) ? "fill-rose-500 text-rose-500 scale-110" : "text-white hover:scale-110"
                            )} 
                          />
                        </button>
                        
                        <button 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            setSharingHotel(hotel);
                          }} 
                          className="p-2.5 rounded-full backdrop-blur-md bg-white/20 hover:bg-white/45 dark:bg-black/30 dark:hover:bg-black/50 border border-white/25 dark:border-white/10 transition-all text-white cursor-pointer group/share shadow-md"
                          title="اشتراک‌گذاری هتل"
                        >
                          <Share2 size={13} className="transition-all duration-300 transform active:scale-125 hover:text-blue-400" />
                        </button>
                      </div>

                      {getCustomServices().some(s => s.hotelId === hotel.id) && (
                        <div className="absolute bottom-4 right-4 bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-xl shadow-lg z-10 flex items-center gap-1 border border-amber-400/20">
                          <Sparkles size={11} fill="currentColor" className="text-white animate-pulse" />
                          <span>پکیج‌های تفریحی ویژه</span>
                        </div>
                      )}

                      <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-lg">
                        {hotel.ratingWord}
                      </div>
                    </div>
                    
                    <div className="p-4 sm:p-5 flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-4 mb-1.5">
                          <div className="flex items-center gap-0.5">
                            {[...Array(hotel.stars)].map((_, i) => (
                              <Star key={i} size={11} className="fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          {viewMode === 'list' && (
                            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900/40 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-slate-800/45 shrink-0">
                              <div className="text-sm font-bold text-blue-500 dark:text-blue-400">{hotel.rating} <span className="text-[10px] font-bold text-slate-400">/ ۵</span></div>
                              <div className="text-[10px] text-slate-400 font-bold border-r border-slate-200 dark:border-slate-700 pr-1.5">{hotel.reviewsCount} نظر</div>
                            </div>
                          )}
                        </div>

                        <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors line-clamp-1 leading-snug">
                          {hotel.name}
                        </h3>

                        <div className="flex items-center gap-1 mt-1 text-[11px] text-slate-500 dark:text-slate-400 font-bold">
                          <MapPin size={12} className="text-blue-500" />
                          <span>{hotel.location}</span>
                        </div>

                        {viewMode !== 'list' && (
                          <div className="flex items-center gap-1.5 mt-2 bg-slate-50 dark:bg-slate-900/40 p-2 rounded-xl border border-slate-100 dark:border-slate-800/45 w-fit">
                            <div className="text-xs font-bold text-blue-500 dark:text-blue-400">{hotel.rating} از ۵</div>
                            <div className="text-[10px] text-slate-400 font-bold">({hotel.reviewsCount} نظر کاربر)</div>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {hotel.amenityList.slice(0, viewMode === 'list' ? 5 : 3).map((amenity, i) => (
                            <span key={i} className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 text-[10px] font-bold px-2 py-1 rounded-lg border border-slate-200/40 dark:border-slate-700/35">
                              {getAmenityIcon(amenity.icon)}
                              <span>{amenity.name}</span>
                            </span>
                          ))}
                        </div>

                        <div className="mt-3">
                          <span className="inline-flex items-center gap-1 bg-blue-600/5 text-blue-600 dark:text-blue-400 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-blue-600/10">
                            <Check size={11} className="stroke-[3]" />
                            <span>{hotel.cancellation.includes("رایگان") ? "کنسلی رایگان" : "کنسلی مدت‌دار"}</span>
                          </span>
                        </div>
                      </div>

                      <div className="border-t border-slate-100 dark:border-slate-800/50 pt-4 mt-5">
                        <div className={cn(
                          "flex justify-between items-center mb-3",
                          viewMode === 'list' ? "flex-row" : "flex-row"
                        )}>
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">۳ شب اقامت (۲ نفر)</span>
                          <div className="text-left">
                            {hotel.originalPrice && (
                              <span className="block text-[10px] text-slate-400 dark:text-slate-500 line-through font-sans tracking-tight mb-0.5">
                                {hotel.originalPrice}
                              </span>
                            )}
                            <span className="text-slate-900 dark:text-white font-bold text-lg font-sans tracking-tight leading-none block">
                              {hotel.price} <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 font-sans tracking-normal">تومان</span>
                            </span>
                          </div>
                        </div>

                        <div className={cn(
                          "grid gap-1.5",
                          viewMode === 'list' ? "grid-cols-5 md:w-[350px] mr-auto" : "grid-cols-5"
                        )}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleCompare(hotel);
                            }}
                            className={cn(
                              "text-[11px] font-bold py-2.5 px-2 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1 cursor-pointer border",
                              viewMode === 'list' ? "col-span-2" : "col-span-2",
                              isCompared(hotel.id)
                                ? "bg-blue-500 text-white border-blue-500 hover:bg-blue-600 shadow-md shadow-blue-500/10"
                                : "bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200/50 dark:border-slate-800 hover:border-slate-300"
                            )}
                            title="مقایسه این هتل با هتل‌های دیگر"
                          >
                            <ArrowLeftRight size={12} />
                            <span>{isCompared(hotel.id) ? "انتخاب شده" : "مقایسه"}</span>
                          </button>

                          <button 
                            onClick={() => { 
                              localStorage.setItem("selected_hotel_id", hotel.id); 
                              onSelect(); 
                            }} 
                            className={cn(
                              "bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-600 hover:to-blue-600 text-white text-[11px] font-bold py-2.5 px-3 rounded-xl transition-all shadow-md shadow-blue-600/10 active:scale-95 cursor-pointer text-center",
                              viewMode === 'list' ? "col-span-3" : "col-span-3"
                            )}
                          >
                            مشاهده و رزرو
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Persistent Compare Tray */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-2xl bg-white/80 dark:bg-slate-900/85 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800 rounded-[2rem] shadow-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in slide-in-from-bottom-8 duration-300" dir="rtl">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-500 shrink-0">
              <ArrowLeftRight size={20} className="animate-pulse" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-slate-900 dark:text-white">مقایسه همزمان هتل‌ها</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold mt-0.5">
                {compareList.length} از ۳ هتل برای مقایسه انتخاب شده است.
              </p>
            </div>
          </div>

          {/* Selected Thumbnails */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-xs py-1">
            {compareList.map((hotel) => (
              <div key={hotel.id} className="relative shrink-0 group">
                <img 
                  src={hotel.image} 
                  alt={hotel.name} 
                  className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                  referrerPolicy="no-referrer"
                />
                <button 
                  onClick={() => handleToggleCompare(hotel)}
                  className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px] hover:bg-rose-600 transition shadow cursor-pointer font-sans"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <button 
              onClick={() => setCompareList([])}
              className="text-[11px] font-bold text-slate-500 dark:text-slate-400 hover:text-rose-500 transition-colors px-3 py-2 cursor-pointer"
            >
              انصراف
            </button>
            <button 
              onClick={() => {
                if (compareList.length >= 2) {
                  setShowCompareModal(true);
                } else {
                  showToast("لطفاً حداقل ۲ هتل برای مقایسه انتخاب کنید.");
                }
              }}
              className={cn(
                "text-xs font-bold py-3 px-6 rounded-2xl transition-all shadow-lg active:scale-95 cursor-pointer flex items-center gap-1.5",
                compareList.length >= 2 
                  ? "bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-500 hover:to-blue-600 text-white shadow-blue-500/15"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
              )}
            >
              <span>شروع مقایسه هتل‌ها</span>
            </button>
          </div>
        </div>
      )}

      {/* Side-by-Side Compare Modal */}
      {showCompareModal && compareList.length >= 2 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] max-w-4xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col text-right h-[85vh] max-h-[calc(100vh-2rem)] my-auto" dir="rtl">
            
            {/* Header */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-950/20 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-500">
                  <ArrowLeftRight size={16} />
                </div>
                <span className="font-bold text-sm text-slate-900 dark:text-white">جدول مقایسه تخصصی هتل‌ها</span>
              </div>
              <button 
                onClick={() => setShowCompareModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Compare Matrix Content */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar text-xs sm:text-sm font-semibold">
              <div className="min-w-[600px] overflow-x-auto">
                <table className="w-full border-collapse text-right">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800">
                      <th className="py-4 px-2 text-slate-400 dark:text-slate-500 font-bold w-1/4">مشخصات هتل</th>
                      {compareList.map((hotel) => (
                        <th key={hotel.id} className="py-4 px-4 w-1/4 text-center">
                          <div className="flex flex-col items-center">
                            <div className="relative w-28 h-20 rounded-2xl overflow-hidden mb-2 shadow-md">
                              <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              <button 
                                onClick={() => handleToggleCompare(hotel)}
                                className="absolute top-1 left-1 w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px] hover:bg-rose-600 shadow"
                                title="حذف از لیست"
                              >
                                ✕
                              </button>
                            </div>
                            <div className="flex items-center gap-0.5 justify-center mb-1">
                              {[...Array(hotel.stars)].map((_, i) => (
                                <Star key={i} size={10} className="fill-amber-400 text-amber-400" />
                              ))}
                            </div>
                            <h4 className="font-bold text-xs text-slate-900 dark:text-white text-center max-w-[150px] truncate">{hotel.name}</h4>
                          </div>
                        </th>
                      ))}
                      {compareList.length < 3 && (
                        <th className="py-4 px-4 w-1/4 text-center text-slate-400 dark:text-slate-500 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
                          <div className="flex flex-col items-center justify-center h-28">
                            <span className="text-xl mb-1">+</span>
                            <span className="text-[10px] font-bold">امکان افزودن {3 - compareList.length} هتل دیگر</span>
                          </div>
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Guest Rating Row */}
                    <tr className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-950/20">
                      <td className="py-3 px-2 text-slate-400 dark:text-slate-500 font-bold">امتیاز کاربران</td>
                      {compareList.map((hotel) => (
                        <td key={hotel.id} className="py-3 px-4 text-center font-bold">
                          <span className="text-blue-500 dark:text-blue-400 font-bold">{hotel.rating} / ۵</span>
                          <span className="text-xs text-slate-400 block mt-0.5">({hotel.ratingWord} - {hotel.reviewsCount} نظر)</span>
                        </td>
                      ))}
                      {compareList.length < 3 && <td></td>}
                    </tr>

                    {/* Price Row */}
                    <tr className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-950/20">
                      <td className="py-3 px-2 text-slate-400 dark:text-slate-500 font-bold">هزینه هر شب</td>
                      {compareList.map((hotel) => (
                        <td key={hotel.id} className="py-3 px-4 text-center">
                          <div className="font-sans text-slate-900 dark:text-white font-bold text-sm sm:text-base tracking-tighter">
                            {hotel.price} <span className="text-[10px] font-sans font-bold text-slate-400 tracking-normal">تومان</span>
                          </div>
                        </td>
                      ))}
                      {compareList.length < 3 && <td></td>}
                    </tr>

                    {/* Location Row */}
                    <tr className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-950/20">
                      <td className="py-3 px-2 text-slate-400 dark:text-slate-500 font-bold">موقعیت و آدرس</td>
                      {compareList.map((hotel) => (
                        <td key={hotel.id} className="py-3 px-4 text-center text-slate-700 dark:text-slate-300">
                          <div className="font-bold text-xs">{hotel.location}</div>
                        </td>
                      ))}
                      {compareList.length < 3 && <td></td>}
                    </tr>

                    {/* Distance to Center Row */}
                    <tr className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-950/20">
                      <td className="py-3 px-2 text-slate-400 dark:text-slate-500 font-bold">فاصله تا مرکز شهر</td>
                      {compareList.map((hotel) => (
                        <td key={hotel.id} className="py-3 px-4 text-center text-slate-700 dark:text-slate-300">
                          <div className="font-bold text-xs">{hotel.distanceToCenter}</div>
                        </td>
                      ))}
                      {compareList.length < 3 && <td></td>}
                    </tr>

                    {/* Breakfast Row */}
                    <tr className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-950/20">
                      <td className="py-3 px-2 text-slate-400 dark:text-slate-500 font-bold">وضعیت صبحانه</td>
                      {compareList.map((hotel) => (
                        <td key={hotel.id} className="py-3 px-4 text-center text-slate-700 dark:text-slate-300">
                          <div className="font-bold text-xs flex items-center justify-center gap-1.5 text-blue-600 dark:text-blue-400">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                            {hotel.breakfast}
                          </div>
                        </td>
                      ))}
                      {compareList.length < 3 && <td></td>}
                    </tr>

                    {/* WiFi Row */}
                    <tr className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-950/20">
                      <td className="py-3 px-2 text-slate-400 dark:text-slate-500 font-bold">اینترنت Wi-Fi</td>
                      {compareList.map((hotel) => (
                        <td key={hotel.id} className="py-3 px-4 text-center text-slate-700 dark:text-slate-300">
                          <div className="font-bold text-xs">{hotel.wifi}</div>
                        </td>
                      ))}
                      {compareList.length < 3 && <td></td>}
                    </tr>

                    {/* Pool Row */}
                    <tr className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-950/20">
                      <td className="py-3 px-2 text-slate-400 dark:text-slate-500 font-bold">مجموعه آبی / استخر</td>
                      {compareList.map((hotel) => (
                        <td key={hotel.id} className="py-3 px-4 text-center text-slate-700 dark:text-slate-300">
                          <div className="font-bold text-xs">{hotel.pool}</div>
                        </td>
                      ))}
                      {compareList.length < 3 && <td></td>}
                    </tr>

                    {/* Gym Row */}
                    <tr className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-950/20">
                      <td className="py-3 px-2 text-slate-400 dark:text-slate-500 font-bold">باشگاه ورزشی</td>
                      {compareList.map((hotel) => (
                        <td key={hotel.id} className="py-3 px-4 text-center text-slate-700 dark:text-slate-300">
                          <div className="font-bold text-xs">{hotel.gym}</div>
                        </td>
                      ))}
                      {compareList.length < 3 && <td></td>}
                    </tr>

                    {/* Parking Row */}
                    <tr className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-950/20">
                      <td className="py-3 px-2 text-slate-400 dark:text-slate-500 font-bold">پارکینگ خودرو</td>
                      {compareList.map((hotel) => (
                        <td key={hotel.id} className="py-3 px-4 text-center text-slate-700 dark:text-slate-300">
                          <div className="font-bold text-xs">{hotel.parking}</div>
                        </td>
                      ))}
                      {compareList.length < 3 && <td></td>}
                    </tr>

                    {/* Cancellation Row */}
                    <tr className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-950/20">
                      <td className="py-3 px-2 text-slate-400 dark:text-slate-500 font-bold">قوانین کنسلی</td>
                      {compareList.map((hotel) => (
                        <td key={hotel.id} className="py-3 px-4 text-center text-slate-700 dark:text-slate-300">
                          <div className={cn(
                            "font-bold text-xs px-2.5 py-1 rounded-lg inline-block",
                            hotel.cancellation.includes("رایگان") 
                              ? "bg-blue-50 dark:bg-blue-700/30 text-blue-600 dark:text-blue-400" 
                              : "bg-blue-50 dark:bg-blue-700/30 text-blue-600 dark:text-amber-400"
                          )}>
                            {hotel.cancellation}
                          </div>
                        </td>
                      ))}
                      {compareList.length < 3 && <td></td>}
                    </tr>

                    {/* Booking Actions Row */}
                    <tr>
                      <td className="py-4 px-2"></td>
                      {compareList.map((hotel) => (
                        <td key={hotel.id} className="py-4 px-4 text-center">
                          <button
                            onClick={() => {
                              setShowCompareModal(false);
                              onSelect();
                            }}
                            className="bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-500 hover:to-blue-600 text-white text-xs font-bold py-3 px-6 rounded-2xl transition shadow-md hover:shadow-blue-600/10 active:scale-95 cursor-pointer w-full"
                          >
                            رزرو سریع این هتل
                          </button>
                        </td>
                      ))}
                      {compareList.length < 3 && <td></td>}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {sharingHotel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-[2.5rem] max-w-lg w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col text-right my-auto max-h-[calc(100vh-2rem)]" dir="rtl">
            
            {/* Header */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-950/20">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-500">
                  <Share2 size={16} />
                </div>
                <span className="font-bold text-sm text-slate-900 dark:text-white">اشتراک‌گذاری هتل</span>
              </div>
              <button 
                onClick={() => setSharingHotel(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 space-y-5 overflow-y-auto max-h-[85vh] custom-scrollbar">
              {/* Hotel Preview Card */}
              <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/80 p-4 rounded-3xl flex gap-4 items-center text-right">
                <img 
                  src={sharingHotel.image} 
                  alt={sharingHotel.name} 
                  className="w-20 h-20 rounded-2xl object-cover shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-0.5 mb-1">
                    {[...Array(sharingHotel.stars)].map((_, i) => (
                      <Star key={i} size={10} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">{sharingHotel.name}</h4>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500 mt-1 font-bold">
                    <MapPin size={12} />
                    <span>{sharingHotel.location}</span>
                  </div>
                </div>
              </div>

              {/* Snippet Output */}
              <div className="space-y-2">
                <label className="text-[11px] text-slate-500 dark:text-slate-400 font-bold block">پیش‌نمایش پیام شبکه اجتماعی</label>
                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800/80 p-4 rounded-2xl text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 font-semibold leading-relaxed whitespace-pre-line text-right font-mono select-all shadow-inner max-h-40 overflow-y-auto custom-scrollbar">
                  {`🏨 پیشنهاد ویژه اقامت در اونجا!\n✨ ${sharingHotel.name}\n⭐ ${'★'.repeat(sharingHotel.stars)} ${sharingHotel.rating}\n📍 ${sharingHotel.location}\n🛠️ خدمات: ${sharingHotel.desc}\n💵 قیمت ویژه: ${sharingHotel.price} تومان\n🔗 مشاهده و رزرو سریع در اونجا 👇\n${window.location.origin}/#/hotel/${sharingHotel.id}`}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    const snippet = `🏨 پیشنهاد ویژه اقامت در اونجا!\n✨ ${sharingHotel.name}\n⭐ ${'★'.repeat(sharingHotel.stars)} ${sharingHotel.rating}\n📍 ${sharingHotel.location}\n🛠️ خدمات: ${sharingHotel.desc}\n💵 قیمت ویژه: ${sharingHotel.price} تومان\n🔗 مشاهده و رزرو سریع در اونجا 👇\n${window.location.origin}/#/hotel/${sharingHotel.id}`;
                    navigator.clipboard.writeText(snippet);
                    showToast("متن پیام با موفقیت کپی شد!");
                    setSharingHotel(null);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3.5 px-4 rounded-2xl transition shadow-md hover:shadow-blue-600/10 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  کپی متن پیام
                </button>
                <button
                  onClick={() => {
                    const link = `${window.location.origin}/#/hotel/${sharingHotel.id}`;
                    navigator.clipboard.writeText(link);
                    showToast("لینک مستقیم با موفقیت کپی شد!");
                    setSharingHotel(null);
                  }}
                  className="bg-slate-150 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-xs font-bold py-3.5 px-4 rounded-2xl transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  کپی لینک مستقیم
                </button>
              </div>

              {/* Direct Share Channels */}
              <div className="pt-2">
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold block mb-3">ارسال مستقیم از طریق</span>
                <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
                  <a
                    href={`https://t.me/share/url?url=${encodeURIComponent(`${window.location.origin}/#/hotel/${sharingHotel.id}`)}&text=${encodeURIComponent(`🏨 پیشنهاد ویژه اقامت در اونجا!\n✨ ${sharingHotel.name}\n⭐ ${'★'.repeat(sharingHotel.stars)} ${sharingHotel.rating}\n📍 ${sharingHotel.location}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-50 dark:bg-blue-700/20 text-blue-600 dark:text-blue-400 hover:bg-blue-50/60 dark:hover:bg-blue-700/40 p-3 rounded-2xl transition flex flex-col items-center gap-1.5 cursor-pointer"
                  >
                    <span className="text-lg">✈</span>
                    <span>تلگرام</span>
                  </a>
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`🏨 پیشنهاد ویژه اقامت در اونجا!\n✨ ${sharingHotel.name}\n⭐ ${'★'.repeat(sharingHotel.stars)} ${sharingHotel.rating}\n📍 ${sharingHotel.location}\n\nمشاهده و رزرو:\n${window.location.origin}/#/hotel/${sharingHotel.id}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-50 dark:bg-blue-700/20 text-blue-600 dark:text-blue-400 hover:bg-blue-50/60 dark:hover:bg-blue-700/40 p-3 rounded-2xl transition flex flex-col items-center gap-1.5 cursor-pointer"
                  >
                    <span className="text-lg">💬</span>
                    <span>واتساپ</span>
                  </a>
                  <a
                    href={`sms:?body=${encodeURIComponent(`پیشنهاد اقامت: ${sharingHotel.name} - ${window.location.origin}/#/hotel/${sharingHotel.id}`)}`}
                    className="bg-blue-50 dark:bg-blue-700/20 text-blue-600 dark:text-blue-400 hover:bg-blue-50/60 dark:hover:bg-blue-700/40 p-3 rounded-2xl transition flex flex-col items-center gap-1.5 cursor-pointer"
                  >
                    <span className="text-lg">✉</span>
                    <span>پیامک</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {bookingActivity && (
        <BookingModal 
          service={bookingActivity} 
          onClose={() => setBookingActivity(null)}
          onSuccess={(details) => {
            setTicketDetails(details);
            setBookedActivity(bookingActivity);
            setBookingActivity(null);
          }}
        />
      )}

      {bookedActivity && ticketDetails && (() => {
        const details = ticketDetails;
        return (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-300" dir="rtl">
            <div className="bg-white dark:bg-[#0e132e] border border-slate-200 dark:border-slate-800 rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300">
              {/* Top Banner */}
              <div className="bg-gradient-to-r from-amber-500 to-blue-600 p-6 text-center text-white relative">
                <button 
                  onClick={() => setBookedActivity(null)}
                  className="absolute top-4 left-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer"
                >
                  <X size={16} />
                </button>
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3 border border-white/20 animate-bounce">
                  <Sparkles size={24} className="text-blue-400 fill-blue-400" />
                </div>
                <h3 className="font-bold text-lg">بلیت الکترونیکی صادر شد!</h3>
                <p className="text-[10px] text-white/80 font-bold mt-1">رزرو شما با موفقیت در سامانه نهایی گردید</p>
              </div>

              {/* Ticket Details Body */}
              <div className="p-6 space-y-6">
                {/* Visual Ticket Shape */}
                <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800 rounded-3xl overflow-hidden relative shadow-inner">
                  {/* Left Side Hole */}
                  <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white dark:bg-[#0e132e] border-r border-slate-200/50 dark:border-slate-800"></div>
                  {/* Right Side Hole */}
                  <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white dark:bg-[#0e132e] border-l border-slate-200/50 dark:border-slate-800"></div>

                  {/* Top section of ticket */}
                  <div className="p-5 flex gap-4 items-center border-b border-dashed border-slate-200 dark:border-slate-800">
                    <img 
                      src={bookedActivity.image} 
                      alt={bookedActivity.title} 
                      className="w-16 h-16 rounded-2xl object-cover border border-slate-200 dark:border-slate-800 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="text-[9px] font-bold bg-amber-500/10 text-blue-600 dark:text-amber-400 px-2 py-1 rounded-lg border border-amber-500/20">
                        {bookedActivity.category}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-1.5 leading-tight">
                        {bookedActivity.title}
                      </h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold mt-1 flex items-center gap-1">
                        <MapPin size={11} className="text-amber-500" />
                        {bookedActivity.location || (details as any).dest || 'تهران'}
                      </p>
                    </div>
                  </div>

                  {/* Bottom section of ticket */}
                  <div className="p-5 grid grid-cols-2 gap-y-4 gap-x-2 text-xs font-bold">
                    <div>
                      <span className="block text-[9px] text-slate-400 dark:text-slate-500 mb-1">تاریخ رزرو</span>
                      <span className="text-slate-800 dark:text-slate-200 font-mono">{ticketDetails.dateStr}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] text-slate-400 dark:text-slate-500 mb-1">سانس رزرو شده</span>
                      <span className="text-slate-800 dark:text-slate-200">{ticketDetails.timeLabel}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] text-slate-400 dark:text-slate-500 mb-1">تعداد نفرات</span>
                      <span className="text-slate-800 dark:text-slate-200">{ticketDetails.guests} بلیت</span>
                    </div>
                    <div>
                      <span className="block text-[9px] text-slate-400 dark:text-slate-500 mb-1">کد پیگیری رزرو</span>
                      <span className="text-blue-600 dark:text-amber-400 font-mono uppercase">OON-{Math.floor(100000 + Math.random() * 900000)}</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Barcode / QR Section */}
                <div className="flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="flex gap-0.5 h-12 items-center opacity-75 mb-2">
                    {[3, 1, 4, 1, 5, 2, 1, 3, 2, 4, 1, 3, 1, 2, 4, 1, 2, 1, 3, 4, 1, 2, 4].map((width, i) => (
                      <div 
                        key={i} 
                        className="bg-slate-800 dark:bg-slate-200 h-full" 
                        style={{ width: `${width}px` }}
                      />
                    ))}
                  </div>
                  <span className="text-[9px] font-mono font-bold tracking-[0.25em] text-slate-500 dark:text-slate-400">
                    * {bookedActivity.serviceCode || "CS-E-TICKET"} *
                  </span>
                </div>

                {/* Price Breakdown */}
                <div className="flex justify-between items-center bg-amber-500/5 p-4 rounded-2xl border border-amber-500/10">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">مجموع هزینه پرداخت شده:</span>
                  <span className="text-blue-600 dark:text-amber-400 font-bold text-lg font-sans">
                    {ticketDetails.totalCost.toLocaleString()} <span className="text-[10px]">تومان</span>
                  </span>
                </div>

                {/* Modal Actions */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button 
                    onClick={() => {
                      showToast("فایل PDF بلیت با موفقیت بارگیری شد.");
                    }}
                    className="bg-amber-500 hover:bg-blue-600 text-white text-xs font-bold py-3 px-4 rounded-xl transition active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-amber-500/10"
                  >
                    <span>دانلود فایل بلیت</span>
                  </button>
                  <button 
                    onClick={() => setBookedActivity(null)}
                    className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold py-3 px-4 rounded-xl transition active:scale-95 text-center cursor-pointer"
                  >
                    بستن و بازگشت
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
      {toastMessage && (
        <div className="fixed bottom-24 right-6 z-50 bg-slate-900/90 dark:bg-slate-950/95 backdrop-blur-md text-white text-xs font-bold py-3 px-5 rounded-2xl shadow-xl border border-white/10 animate-in fade-in slide-in-from-bottom-5 duration-300 flex items-center gap-2" dir="rtl">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default SerpView;