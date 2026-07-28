import React, { useState, useEffect } from "react";
import { cn, toPersianDigits } from "@/lib/utils";
import { DateRangePicker, JalaliDate, formatJalaliDate } from "./DateRangePicker";
import { 
  Percent, 
  Building2, 
  Wallet, 
  MapPin, 
  Search, 
  CalendarDays, 
  Users, 
  Star, 
  ArrowLeft, 
  HeadphonesIcon, 
  ShieldCheck, 
  ChevronLeft, 
  Coffee, 
  Globe, 
  Home, 
  Plane, 
  Train, 
  Bus, 
  Compass, 
  Sparkles,
  Info,
  Check,
  Mail,
  Gift,
  Crown,
  History,
  X,
  Utensils,
  Waves,
  Dumbbell,
  Car,
  Ticket,
  Clock,
  User,
  Phone
} from "lucide-react";

const HOTEL_SERVICES_DATA = [
  {
    title: "رستوران‌ها و کافی‌شاپ‌های مجلل",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop",
    icon: Utensils,
    badgeText: "رستوران و بوفه ملل",
    badgeClass: "bg-blue-600/15 border border-blue-600/30 text-blue-400",
    description: "مجلل‌ترین رستوران‌های گردان با چشم‌انداز ۳۶۰ درجه و کافه‌های دنج همراه با موسیقی زنده پیانو و طعم‌های ماندگار ملل.",
    offerText: "٪۱۵ تخفیف بدون اقامت",
    ctaText: "رزرو آنی میز شام",
    pricePerPerson: 450000,
    serviceCode: "REST-360",
    location: "هتل بزرگ اسپیناس پالاس تهران",
  },
  {
    title: "مجموعه اسپا و ماساژ VIP",
    image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=600&auto=format&fit=crop",
    icon: Waves,
    badgeText: "اسپا و ریلکسیشن",
    badgeClass: "bg-cyan-500/15 border border-cyan-500/30 text-cyan-300",
    description: "آرامش بی‌پایان در اتاق‌های تخصصی ماساژ سنگ داغ، سونای خشک و بخار سوئدی و پکیج‌های درمانی جوان‌سازی پوست.",
    offerText: "پذیرش آزاد روزانه",
    ctaText: "خرید پکیج تندرستی",
    pricePerPerson: 750000,
    serviceCode: "SPA-RELAX",
    location: "هتل آزادی تهران",
  },
  {
    title: "روف‌گاردن و لانژ آسمان",
    image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=600&auto=format&fit=crop",
    icon: Coffee,
    badgeText: "لانژ مرتفع آسمان",
    badgeClass: "bg-blue-600/15 border border-blue-600/30 text-blue-400",
    description: "چشم‌اندازی خیره‌کننده از افق و آسمان شب، لذت نوشیدن قهوه‌های دست‌ساز و عطرهای ماندگار در بلندترین کافه هتل.",
    offerText: "ورودی آزاد شهروندان",
    ctaText: "رزرو مبل VIP لانژ",
    pricePerPerson: 300000,
    serviceCode: "ROOF-SKY",
    location: "هتل پارسیان استقلال",
  },
  {
    title: "مجموعه استخر و جکوزی روباز",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=600&auto=format&fit=crop",
    icon: Compass,
    badgeText: "استخر روباز چهارفصل",
    badgeClass: "bg-blue-500/15 border border-blue-500/30 text-blue-300",
    description: "شنا در استخرهای روباز آب‌گرم تحت دمای ایده‌آل همراه با حمام آفتاب لوکس، نوشیدنی‌های بار و ویوی پانوراما.",
    offerText: "بلیت آزاد ویژه عموم",
    ctaText: "خرید بلیت تک‌جلسه",
    pricePerPerson: 550000,
    serviceCode: "POOL-OPEN",
    location: "هتل هما تهران",
  },
  {
    title: "باشگاه ورزشی و بدنسازی هوشمند",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop",
    icon: Dumbbell,
    badgeText: "باشگاه فیتنس تکنوجیم",
    badgeClass: "bg-blue-600/15 border border-blue-600/30 text-blue-400",
    description: "مجهزترین سالن‌های تناسب اندام با به‌روزترین تجهیزات هوازی، راهنمایی مربیان مجرب و مشاوره رژیم شخصی.",
    offerText: "ثبت‌نام ماهانه آزاد",
    ctaText: "درخواست عضویت",
    pricePerPerson: 600000,
    serviceCode: "GYM-TECH",
    location: "هتل اسپیناس بلوار تهران",
  },
  {
    title: "سالن‌های همایش و ضیافت‌های مجلل",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop",
    icon: Building2,
    badgeText: "سالن همایش و جشن‌ها",
    badgeClass: "bg-blue-600/15 border border-blue-600/30 text-blue-400",
    description: "برگزاری همایش‌ها، کنفرانس‌های تخصصی کاری، جشن‌های مجلل و سمینارها با برترین سیستم‌های صوتی و تشریفات پذیرایی.",
    offerText: "ورودی همایش‌ها",
    ctaText: "هماهنگی و بازدید سالن",
    pricePerPerson: 850000,
    serviceCode: "HALL-CONFERENCE",
    location: "مرکز همایش‌های هتل لاله",
  },
  {
    title: "تشریفات فرودگاهی CIP و لیموزین",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=600&auto=format&fit=crop",
    icon: Car,
    badgeText: "ترانسفر و CIP فرودگاهی",
    badgeClass: "bg-blue-600/15 border border-blue-600/30 text-blue-400",
    description: "استقبال در باند فرودگاه، پذیرایی مجلل در سالن تشریفات CIP و ترانسفر ایمن و سلطنتی با خودروهای لوکس تا مقصد شما.",
    offerText: "رزرو مستقیم فرودگاهی",
    ctaText: "سفارش تشریفات CIP",
    pricePerPerson: 1200000,
    serviceCode: "CIP-TRANSFER",
    location: "فرودگاه بین‌المللی امام خمینی",
  },
  {
    title: "کلوب بازی و سرگرمی کودکان",
    image: "https://images.unsplash.com/photo-1566454825481-4e48f80aa4d7?q=80&w=600&auto=format&fit=crop",
    icon: Crown,
    badgeText: "کلوب و خانه بازی کودک",
    badgeClass: "bg-yellow-500/15 border border-yellow-500/30 text-yellow-300",
    description: "فضای ایمن و مهیج با بازی‌های فکری مدرن، کنسول‌های بازی، مربیان مراقب دلسوز برای آرامش خاطر بیشتر والدین.",
    offerText: "ساعتی و روزانه آزاد",
    ctaText: "پذیرش فرزند دلبند شما",
    pricePerPerson: 250000,
    serviceCode: "KIDS-CLUB",
    location: "هتل ونوس تهران",
  }
];

interface HomeViewProps {
  onSearch: (tab: string) => void;
  onBlogClick?: () => void;
}

// City Suggestions following the second reference image
const citySuggestions = [
  { name: "تهران", province: "تهران", count: 120 },
  { name: "مشهد", province: "خراسان رضوی", count: 186 },
  { name: "شیراز", province: "فارس", count: 82 },
  { name: "کیش", province: "هرمزگان", count: 28 },
  { name: "اصفهان", province: "اصفهان", count: 87 },
  { name: "تبریز", province: "آذربایجان شرقی", count: 45 },
  { name: "یزد", province: "یزد", count: 64 },
  { name: "قشم", province: "هرمزگان", count: 52 },
];

// Suggested hotels by city following the third reference image
const suggestedHotelsByCity: Record<string, Array<{
  id: string;
  name: string;
  stars: number;
  rating: number;
  ratingText: string;
  reviewsCount: number;
  location: string;
  originalPrice?: number;
  price: number;
  discount?: number;
  badge?: string;
  image: string;
}>> = {
  "تهران": [
    {
      id: "espinas-palace",
      name: "اسپیناس پالاس کلکسیون لوکس گروه هتل‌های اسپیناس",
      stars: 5,
      rating: 4.6,
      ratingText: "خیلی خوب",
      reviewsCount: 367,
      location: "تهران، سعادت آباد",
      originalPrice: 23800000,
      price: 16435000,
      discount: 31,
      badge: "۱۰۰ هزار تومان تخفیف تاکسی",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "parisian-azadi",
      name: "هتل پارسیان آزادی تهران",
      stars: 5,
      rating: 4.4,
      ratingText: "خیلی خوب",
      reviewsCount: 734,
      location: "تهران، بزرگراه شهید چمران",
      originalPrice: 15200000,
      price: 13000000,
      discount: 14,
      badge: "صبحانه بوفه مجلل رایگان",
      image: "https://images.unsplash.com/photo-1542314831-c6a4d14d8373?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "espinas-boulevard",
      name: "هتل اسپیناس بلوار کشاورز",
      stars: 5,
      rating: 4.1,
      ratingText: "خیلی خوب",
      reviewsCount: 266,
      location: "تهران، بلوار کشاورز",
      price: 12330000,
      badge: "مینی‌بار رایگان ورودی",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "persia-1",
      name: "هتل پرشیا ۱ تهران",
      stars: 3,
      rating: 3.9,
      ratingText: "خوب",
      reviewsCount: 273,
      location: "تهران، خیابان حافظ",
      originalPrice: 3300000,
      price: 2300000,
      discount: 30,
      badge: "اینترنت پرسرعت نامحدود جیبی",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=600&auto=format&fit=crop"
    }
  ],
  "مشهد": [
    {
      id: "darvishi",
      name: "هتل مجلل درویشی مشهد",
      stars: 5,
      rating: 4.8,
      ratingText: "فوق‌العاده",
      reviewsCount: 982,
      location: "مشهد، خیابان امام رضا",
      originalPrice: 14500000,
      price: 11900000,
      discount: 18,
      badge: "ترانسفر رایگان فرودگاه و راه‌آهن",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "ghasr-talaee",
      name: "هتل بین‌المللی قصر طلایی مشهد",
      stars: 5,
      rating: 4.7,
      ratingText: "عالی",
      reviewsCount: 812,
      location: "مشهد، بلوار امام رضا",
      price: 10800000,
      badge: "مجموعه اسپا و آب‌درمانی رایگان",
      image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=600&auto=format&fit=crop"
    }
  ],
  "شیراز": [
    {
      id: "shiraz-grand",
      name: "هتل بزرگ پنج ستاره شیراز",
      stars: 5,
      rating: 4.6,
      ratingText: "عالی",
      reviewsCount: 455,
      location: "شیراز، دروازه قرآن",
      originalPrice: 9900000,
      price: 8400000,
      discount: 15,
      badge: "کنسلی آنلاین بدون جریمه تا ۴۸ ساعت",
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "chamran",
      name: "هتل بزرگ چمران شیراز",
      stars: 5,
      rating: 4.3,
      ratingText: "خیلی خوب",
      reviewsCount: 310,
      location: "شیراز، بلوار چمران",
      price: 7500000,
      badge: "صبحانه رایگان به همراه موسیقی زنده",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=600&auto=format&fit=crop"
    }
  ],
  "اصفهان": [
    {
      id: "abbasi",
      name: "مهمان‌سرای عباسی اصفهان",
      stars: 5,
      rating: 4.7,
      ratingText: "عالی",
      reviewsCount: 622,
      location: "اصفهان، چهارباغ عباسی",
      originalPrice: 12500000,
      price: 10500000,
      discount: 16,
      badge: "پذیرایی چای سنتی در باغ شاهنشاهی",
      image: "https://images.unsplash.com/photo-1606046604972-77cc76aee944?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "kosar",
      name: "هتل پارسیان کوثر اصفهان",
      stars: 5,
      rating: 4.2,
      ratingText: "خیلی خوب",
      reviewsCount: 294,
      location: "اصفهان، بلوار ملت",
      price: 6800000,
      badge: "دسترسی مستقیم پیاده به سی‌وسه‌پل",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop"
    }
  ],
  "کیش": [
    {
      id: "dariush",
      name: "هتل بزرگ پنج ستاره داریوش کیش",
      stars: 5,
      rating: 4.5,
      ratingText: "عالی",
      reviewsCount: 512,
      location: "جزیره کیش، میدان داریوش",
      originalPrice: 11000000,
      price: 8900000,
      discount: 19,
      badge: "گشت سیاحتی جزیره و عکاسی حرفه‌ای رایگان",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "toranj",
      name: "هتل دریایی ترنج کیش",
      stars: 5,
      rating: 4.8,
      ratingText: "فوق‌العاده",
      reviewsCount: 340,
      location: "جزیره کیش، جاده جهان",
      price: 15500000,
      badge: "کف اتاق‌های شیشه‌ای برای تماشای آکواریوم طبیعی",
      image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=600&auto=format&fit=crop"
    }
  ],
  "قشم": [
    {
      id: "ataman",
      name: "هتل چهار ستاره آتامان قشم",
      stars: 4,
      rating: 4.1,
      ratingText: "خیلی خوب",
      reviewsCount: 125,
      location: "جزیره قشم، میدان گلها",
      originalPrice: 4200000,
      price: 3600000,
      discount: 14,
      badge: "تخفیف ویژه مراکز خرید درگهان",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=600&auto=format&fit=crop"
    }
  ],
  "تبریز": [
    {
      id: "pars-elgoli",
      name: "هتل پارس ائل گلی تبریز",
      stars: 5,
      rating: 4.3,
      ratingText: "خیلی خوب",
      reviewsCount: 198,
      location: "تبریز، جاده ایل گلی",
      originalPrice: 6500000,
      price: 5500000,
      discount: 15,
      badge: "بلیت نیم‌بهای تله‌کابین عینالی",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=600&auto=format&fit=crop"
    }
  ],
  "یزد": [
    {
      id: "dad-yazd",
      name: "هتل چهار ستاره تاریخی داد یزد",
      stars: 4,
      rating: 4.6,
      ratingText: "عالی",
      reviewsCount: 220,
      location: "یزد، خیابان دهم فروردین",
      originalPrice: 5200000,
      price: 4300000,
      discount: 17,
      badge: "نوشیدنی خوشامدگویی محلی یزد",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop"
    }
  ]
};

export function HomeView({ onSearch, onBlogClick }: HomeViewProps) {
  const [destination, setDestination] = useState("تهران");
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showOccupancy, setShowOccupancy] = useState(false);
  const [showAISearch, setShowAISearch] = useState(false);
  const [activeSearchTab, setActiveSearchTab] = useState<"flight-in" | "flight-out" | "train" | "bus" | "tour" | "hotel" | "villa" | "restaurant">("hotel");
  const [startDate, setStartDate] = useState<JalaliDate | null>({ day: 12, month: 4, year: 1405 });
  const [endDate, setEndDate] = useState<JalaliDate | null>({ day: 15, month: 4, year: 1405 });

  const [activityDest, setActivityDest] = useState("کیش");
  const [showActivityDestSuggestions, setShowActivityDestSuggestions] = useState(false);
  const [activityDate, setActivityDate] = useState<JalaliDate | null>({ day: 12, month: 4, year: 1405 });
  const [showActivityDatePicker, setShowActivityDatePicker] = useState(false);
  const [activityTime, setActivityTime] = useState("۱۸:۰۰ (سانس عصر)");
  const [showActivityTimeSelect, setShowActivityTimeSelect] = useState(false);
  const [activityGuests, setActivityGuests] = useState(2);
  const [showActivityGuestsSelect, setShowActivityGuestsSelect] = useState(false);
  
  const [suggestedCityTab, setSuggestedCityTab] = useState<string>("تهران");
  const [occupancy, setOccupancy] = useState({ rooms: 1, adults: 2, kids: 0 });
  const [subscribedEmail, setSubscribedEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Dynamic services list from localStorage or hardcoded presets
  const [servicesList, setServicesList] = useState<any[]>(HOTEL_SERVICES_DATA);

  useEffect(() => {
    const loadServices = () => {
      const stored = localStorage.getItem("custom_hotel_services_v1");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const mapped = parsed.map(s => {
              let IconComp = Coffee;
              let badgeText = s.category || "سایر خدمات";
              let badgeClass = "bg-blue-600/15 border border-blue-600/30 text-blue-400";

              if (s.category === "رستوران و کافی‌شاپ") {
                IconComp = Utensils;
                badgeClass = "bg-blue-600/15 border border-blue-600/30 text-blue-400";
              } else if (s.category === "مجموعه اسپا و ماساژ") {
                IconComp = Waves;
                badgeClass = "bg-cyan-500/15 border border-cyan-500/30 text-cyan-300";
              } else if (s.category === "ورزشی و استخر") {
                IconComp = Compass;
                badgeClass = "bg-blue-500/15 border border-blue-500/30 text-blue-300";
              } else if (s.category === "ترانسفر و تشریفات") {
                IconComp = Car;
                badgeClass = "bg-blue-600/15 border border-blue-600/30 text-blue-400";
              } else if (s.category === "تفریح و سرگرمی") {
                IconComp = Crown;
                badgeClass = "bg-yellow-500/15 border border-yellow-500/30 text-yellow-300";
              }

              return {
                id: s.id,
                title: s.title,
                image: s.image,
                icon: IconComp,
                badgeText: badgeText,
                badgeClass: badgeClass,
                description: s.description || `خدمت اختصاصی هتل با لوکیشن ${s.location || 'مرکزی'} و ساعت پذیرش ${s.hours || 'نامحدود'}`,
                offerText: s.location || "خدمت فعال هتل",
                ctaText: "رزرو آنی خدمت",
                pricePerPerson: typeof s.pricePerPerson === 'number' ? s.pricePerPerson : parseFloat(String(s.pricePerPerson).replace(/,/g, '')) || 0,
                serviceCode: s.id,
                location: s.location || "هتل محل ارائه",
              };
            });
            setServicesList(mapped);
          } else {
            setServicesList(HOTEL_SERVICES_DATA);
          }
        } catch (e) {
          console.error("Error parsing custom services:", e);
          setServicesList(HOTEL_SERVICES_DATA);
        }
      } else {
        setServicesList(HOTEL_SERVICES_DATA);
      }
    };

    loadServices();
    window.addEventListener("storage_services_updated", loadServices);
    window.addEventListener("storage", loadServices);
    return () => {
      window.removeEventListener("storage_services_updated", loadServices);
      window.removeEventListener("storage", loadServices);
    };
  }, []);

  // Hotel service booking states
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [bookingDate, setBookingDate] = useState<string>("۱۴۰۵/۰۴/۱۵");
  const [bookingTime, setBookingTime] = useState<string>("۱۸:۰۰");
  const [bookingCount, setBookingCount] = useState<number>(2);
  const [bookingName, setBookingName] = useState<string>("");
  const [bookingPhone, setBookingPhone] = useState<string>("");
  const [bookingSuccessTicket, setBookingSuccessTicket] = useState<any | null>(null);
  const [bookingIsLoading, setBookingIsLoading] = useState<boolean>(false);

  const handleOpenServiceBooking = (service: typeof HOTEL_SERVICES_DATA[0]) => {
    setSelectedService(service);
    setBookingDate("۱۴۰۵/۰۴/۱۵");
    setBookingTime("۱۸:۰۰");
    setBookingCount(2);
    setBookingName("");
    setBookingPhone("");
    setBookingSuccessTicket(null);
    setBookingIsLoading(false);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName.trim()) {
      alert("لطفاً نام و نام خانوادگی خود را وارد کنید.");
      return;
    }
    if (!bookingPhone.trim() || bookingPhone.length < 10) {
      alert("لطفاً شماره موبایل معتبر وارد کنید.");
      return;
    }
    
    setBookingIsLoading(true);
    setTimeout(() => {
      setBookingIsLoading(false);
      const trackCode = "OON-" + Math.floor(100000 + Math.random() * 900000);
      setBookingSuccessTicket({
        trackingCode: trackCode,
        fullName: bookingName,
        phone: bookingPhone,
        date: bookingDate,
        time: bookingTime,
        guests: bookingCount,
        pricePaid: selectedService!.pricePerPerson * bookingCount,
      });
    }, 1500);
  };

  interface RecentSearch {
    id: string;
    destination: string;
    startDate: JalaliDate | null;
    endDate: JalaliDate | null;
    occupancy: { rooms: number; adults: number; kids: number };
    timestamp: number;
  }

  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("recent_searches");
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveRecentSearch = (dest: string) => {
    if (!dest || !dest.trim()) return;
    const finalDest = dest.trim();

    const current = [...recentSearches];
    const existingIndex = current.findIndex(item => 
      item.destination === finalDest &&
      JSON.stringify(item.startDate) === JSON.stringify(startDate) &&
      JSON.stringify(item.endDate) === JSON.stringify(endDate) &&
      item.occupancy.rooms === occupancy.rooms &&
      item.occupancy.adults === occupancy.adults &&
      item.occupancy.kids === occupancy.kids
    );

    if (existingIndex > -1) {
      current.splice(existingIndex, 1);
    }

    const newItem: RecentSearch = {
      id: Math.random().toString(36).substr(2, 9),
      destination: finalDest,
      startDate,
      endDate,
      occupancy,
      timestamp: Date.now()
    };

    const updated = [newItem, ...current].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recent_searches", JSON.stringify(updated));
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recent_searches");
  };

  const removeRecentSearch = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = recentSearches.filter(item => item.id !== id);
    setRecentSearches(updated);
    localStorage.setItem("recent_searches", JSON.stringify(updated));
  };

  const handleRecentSearchClick = (item: RecentSearch) => {
    setDestination(item.destination);
    setStartDate(item.startDate);
    setEndDate(item.endDate);
    setOccupancy(item.occupancy);
    onSearch(activeSearchTab);
  };

  const handleSearchTrigger = (customDest?: string) => {
    const targetDest = activeSearchTab === "villa" 
      ? (activityDest || "کیش")
      : (customDest || destination || "تهران");
    
    if (activeSearchTab === "villa") {
      localStorage.setItem("search_activity_dest", targetDest);
      localStorage.setItem("search_activity_date", activityDate ? JSON.stringify(activityDate) : "");
      localStorage.setItem("search_activity_time", activityTime);
      localStorage.setItem("search_activity_guests", String(activityGuests));
    }
    
    saveRecentSearch(targetDest);
    onSearch(activeSearchTab);
  };

  return (
    <div className="min-h-screen font-sans text-slate-900 dark:text-slate-100 pb-0 animate-in fade-in duration-700 relative overflow-x-hidden z-10">
      
      {/* Hero Section */}
      <div className="px-4 pt-10 pb-10">
        <div className="relative max-w-[96rem] mx-auto min-h-[640px] lg:min-h-[730px] flex flex-col justify-between p-6 sm:p-12 shadow-[0_45px_100px_-15px_rgba(0,0,0,0.65)] rounded-[2.5rem] border border-white/5 dark:border-white/10 group/hero">
            {/* Background Image and Gradient with overflow-hidden & rounded-[2.5rem] */}
            <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden pointer-events-none z-0">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-[20s] group-hover/hero:scale-105"></div>
                
                {/* Layered luxury dark overlays and cinematic vignettes */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10 z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/20 z-10 hidden sm:block"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,transparent_40%,rgba(0,0,0,0.85)_100%)] z-10"></div>
                
                {/* Fine tech-map outline overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] z-15 opacity-40"></div>
            </div>
            
            {/* Top row with text content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-start sm:justify-start gap-6 pt-6">
                
                {/* Text Content */}
                <div className="text-center sm:text-right max-w-3xl space-y-4">
                   <div className="inline-flex items-center gap-2 bg-blue-400/10 backdrop-blur-md border border-blue-600/30 text-blue-400 text-xs font-bold px-4 py-1.5 rounded-full shadow-sm animate-bounce">
                      <Sparkles size={12} className="text-blue-400 animate-pulse" />
                      <span>فراتر از یک مقصد، یک تجربه رویایی</span>
                   </div>
                   <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-md tracking-tight">
                       تجربه سفری بی‌نظیر<br className="hidden sm:block" /> با پلتفرم هوشمند <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-400 to-blue-50">اونجا (oonja)</span>
                   </h1>
                </div>

            </div>

            {/* Unified Custom Tab Bar styled with high-end glassmorphism - Completely overlapping / positioned inside the banner */}
            <div className="relative z-20 w-full max-w-7xl mx-auto mt-12 bg-white/60 dark:bg-[#070913]/60 border border-white/40 dark:border-white/10 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.5)] p-4 sm:p-6 text-slate-900 dark:text-white transition-all duration-300">
                
                {/* Unified Segmented Tab Bar Control */}
                <div role="tablist" aria-label="خدمات جستجو" className="bg-transparent p-1 flex items-center gap-1 sm:gap-2 mb-6 overflow-x-auto scrollbar-none border-b border-slate-200/20 dark:border-white/5">
                    
                    {/* Hotel is active */}
                    <button 
                        role="tab"
                        aria-selected={activeSearchTab === "hotel"}
                        aria-controls="hotel-search-panel"
                        onClick={() => setActiveSearchTab("hotel")}
                        className={cn(
                            "px-4.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shrink-0 relative",
                            activeSearchTab === "hotel" 
                              ? "bg-[#0b0e22] dark:bg-[#070913] text-white font-bold shadow-md shadow-black/20 scale-[1.01] border border-white/10" 
                              : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        )}
                    >
                        <Building2 size={16} className={cn("shrink-0", activeSearchTab === "hotel" ? "text-blue-400 animate-pulse" : "text-slate-400")} /> 
                        <span>هتل و اقامتگاه</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 absolute top-1.5 left-1.5 shadow-sm shadow-blue-400/50 animate-pulse"></span>
                    </button>

                    {/* Restaurant Tab */}
                    <button 
                        role="tab"
                        aria-selected={activeSearchTab === "restaurant"}
                        onClick={() => setActiveSearchTab("restaurant")}
                        className={cn(
                            "px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shrink-0 relative",
                            activeSearchTab === "restaurant" 
                              ? "bg-[#0b0e22] dark:bg-[#070913] text-white font-bold shadow-md shadow-black/20 scale-[1.01] border border-white/10" 
                              : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                        )}
                    >
                        <Utensils size={16} className={cn("shrink-0", activeSearchTab === "restaurant" ? "text-blue-400 animate-pulse" : "text-slate-500")} /> 
                        <span>رستوران و کافی‌شاپ</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 absolute top-1.5 left-1.5 shadow-sm shadow-blue-400/50 animate-pulse"></span>
                    </button>

                    {/* The rest are disabled with a subtle, premium look */}
                    <button 
                        role="tab"
                        aria-selected="false"
                        disabled
                        className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shrink-0 relative opacity-75 cursor-not-allowed text-slate-600 dark:text-slate-300"
                    >
                        <Plane size={16} className="rotate-45 shrink-0 text-slate-500 dark:text-slate-400" /> 
                        <span>بلیط پرواز</span>
                        <span className="text-[9px] bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded-md font-bold scale-90">به‌زودی</span>
                    </button>

                    <button 
                        role="tab"
                        aria-selected="false"
                        disabled
                        className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shrink-0 relative opacity-75 cursor-not-allowed text-slate-600 dark:text-slate-300"
                    >
                        <Train size={16} className="shrink-0 text-slate-500 dark:text-slate-400" /> 
                        <span>قطار و اتوبوس</span>
                        <span className="text-[9px] bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded-md font-bold scale-90">به‌زودی</span>
                    </button>

                    <button 
                        role="tab"
                        aria-selected="false"
                        disabled
                        className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shrink-0 relative opacity-75 cursor-not-allowed text-slate-600 dark:text-slate-300"
                    >
                        <Compass size={16} className="shrink-0 text-slate-500 dark:text-slate-400" /> 
                        <span>تور گردشگری</span>
                        <span className="text-[9px] bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded-md font-bold scale-90">به‌زودی</span>
                    </button>

                    <button 
                        role="tab"
                        aria-selected={activeSearchTab === "villa"}
                        onClick={() => setActiveSearchTab("villa")}
                        className={cn(
                            "px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shrink-0 relative",
                            activeSearchTab === "villa" 
                              ? "bg-[#0b0e22] dark:bg-[#070913] text-white font-bold shadow-md shadow-black/20 scale-[1.01] border border-white/10" 
                              : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                        )}
                    >
                        <Sparkles size={16} className={cn("shrink-0", activeSearchTab === "villa" ? "text-blue-400" : "text-slate-500")} /> 
                        <span>تفریحات و سرگرمی</span>
                    </button>
                </div>

                {/* Form Inputs Container with premium Glassmorphism design */}
                <div className="flex flex-col lg:flex-row gap-3 items-stretch">
                    
                    {activeSearchTab === "villa" ? (
                      <>
                        {/* 1. Activity Destination / Venue */}
                        <div className="flex-1 min-w-0 bg-white/40 hover:bg-white/60 dark:bg-slate-950/40 dark:hover:bg-slate-950/60 backdrop-blur-md transition-all rounded-2xl p-4 flex items-center gap-4 relative group border border-white/20 dark:border-slate-800/30">
                          <div className="w-11 h-11 rounded-tr-2xl rounded-bl-2xl rounded-tl-lg rounded-br-lg bg-gradient-to-tr from-blue-600/10 to-blue-600/10 dark:from-blue-400/15 dark:to-blue-600/5 flex items-center justify-center shrink-0 border border-blue-600/20 group-hover:scale-105 transition-transform duration-300">
                            <Compass size={20} className="text-blue-600 dark:text-blue-400" strokeWidth={2} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <label htmlFor="activity-dest-input" className="block text-[11px] text-slate-500 dark:text-slate-400 font-bold mb-0.5">مقصد یا کلوب تفریحی</label>
                            <input 
                              id="activity-dest-input"
                              aria-label="جستجوی مقصد یا کلوب تفریحی"
                              type="text" 
                              value={activityDest}
                              onChange={(e) => {
                                setActivityDest(e.target.value);
                                setShowActivityDestSuggestions(true);
                              }}
                              onFocus={() => { 
                                setShowActivityDestSuggestions(true); 
                                setShowActivityDatePicker(false); 
                                setShowActivityTimeSelect(false);
                                setShowActivityGuestsSelect(false);
                              }}
                              onBlur={() => setTimeout(() => setShowActivityDestSuggestions(false), 200)}
                              placeholder="کجا تفریح می‌کنید؟ (مثال: کیش، رامسر)" 
                              className="w-full bg-transparent outline-none text-slate-900 dark:text-white font-semibold placeholder-slate-400 dark:placeholder-slate-500 text-xs sm:text-sm" 
                            />
                          </div>
                          
                          {/* Destination Suggestions Popover */}
                          {showActivityDestSuggestions && (
                            <div className="absolute right-0 left-0 top-[calc(100%+12px)] bg-white dark:bg-[#0b0e26] border border-slate-200 dark:border-slate-800 shadow-2xl rounded-[2rem] z-50 overflow-hidden max-h-80 overflow-y-auto animate-in slide-in-from-top-2">
                              <div className="p-4 bg-slate-50 dark:bg-slate-900/50 text-[10px] text-slate-400 font-bold border-b border-slate-100/30 dark:border-slate-800/20">
                                مقصدهای تفریحی پرطرفدار
                              </div>
                              {["کیش", "تهران", "رامسر", "چالوس", "شیراز", "اصفهان"].map(name => (
                                <div 
                                  key={name} 
                                  onClick={() => { setActivityDest(name); setShowActivityDestSuggestions(false); }} 
                                  className="px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-colors flex items-center gap-3 border-b border-slate-100/30 dark:border-slate-800/10"
                                >
                                  <div className="w-8 h-8 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                    <Compass size={16} strokeWidth={2.5} />
                                  </div>
                                  <span className="font-bold text-slate-800 dark:text-slate-200 text-sm block">{name}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* 2. Single Date Picker for Activity */}
                        <div 
                          onClick={() => { 
                            setShowActivityDatePicker(!showActivityDatePicker); 
                            setShowActivityDestSuggestions(false); 
                            setShowActivityTimeSelect(false);
                            setShowActivityGuestsSelect(false);
                          }}
                          className="flex-1 bg-white/40 hover:bg-white/60 dark:bg-slate-950/40 dark:hover:bg-slate-950/60 backdrop-blur-md transition-all rounded-2xl p-4 flex items-center gap-4 cursor-pointer relative border border-white/20 dark:border-slate-800/30 animate-in fade-in"
                        >
                          <div className="w-11 h-11 rounded-tr-2xl rounded-bl-2xl rounded-tl-lg rounded-br-lg bg-gradient-to-tr from-blue-600/10 to-blue-600/10 dark:from-blue-400/15 dark:to-blue-600/5 flex items-center justify-center shrink-0 border border-blue-600/20 group-hover:scale-105 transition-transform duration-300">
                            <CalendarDays size={20} className="text-blue-600 dark:text-blue-400" strokeWidth={2} />
                          </div>
                          <div className="flex-1">
                            <label className="block text-[11px] text-slate-500 dark:text-slate-400 font-bold mb-0.5">تاریخ حضور / بلیط</label>
                            <div className="text-slate-900 dark:text-white font-semibold text-xs sm:text-sm">
                              {activityDate ? formatJalaliDate(activityDate) : "انتخاب تاریخ تفریح"}
                            </div>
                          </div>
                          
                          {showActivityDatePicker && (
                            <div onClick={e => e.stopPropagation()} className="absolute right-0 top-[calc(100%+12px)] w-full min-w-[320px] md:w-[380px] z-50">
                              <DateRangePicker 
                                startDate={activityDate} 
                                endDate={activityDate} 
                                onSelectRange={(start) => { setActivityDate(start); setShowActivityDatePicker(false); }} 
                                onClose={() => setShowActivityDatePicker(false)} 
                              />
                            </div>
                          )}
                        </div>

                        {/* 3. Session Time Input */}
                        <div 
                          onClick={() => { 
                            setShowActivityTimeSelect(!showActivityTimeSelect); 
                            setShowActivityDatePicker(false); 
                            setShowActivityDestSuggestions(false);
                            setShowActivityGuestsSelect(false);
                          }}
                          className="flex-1 bg-white/40 hover:bg-white/60 dark:bg-slate-950/40 dark:hover:bg-slate-950/60 backdrop-blur-md transition-all rounded-2xl p-4 flex items-center gap-4 cursor-pointer relative border border-white/20 dark:border-slate-800/30 animate-in fade-in"
                        >
                          <div className="w-11 h-11 rounded-tr-2xl rounded-bl-2xl rounded-tl-lg rounded-br-lg bg-gradient-to-tr from-blue-600/10 to-blue-600/10 dark:from-blue-400/15 dark:to-blue-600/5 flex items-center justify-center shrink-0 border border-blue-600/20 group-hover:scale-105 transition-transform duration-300">
                            <Clock size={20} className="text-blue-600 dark:text-blue-400" strokeWidth={2} />
                          </div>
                          <div className="flex-1">
                            <label className="block text-[11px] text-slate-500 dark:text-slate-400 font-bold mb-0.5">ساعت سانس / حرکت</label>
                            <div className="text-slate-900 dark:text-white font-semibold text-xs sm:text-sm">
                              {activityTime}
                            </div>
                          </div>

                          {showActivityTimeSelect && (
                            <div className="absolute right-0 left-0 top-[calc(100%+12px)] bg-white dark:bg-[#0b0e26] border border-slate-200 dark:border-slate-800 shadow-2xl rounded-[2rem] z-50 overflow-hidden py-2 animate-in slide-in-from-top-2">
                              {[
                                "۰۹:۰۰ (سانس صبح)",
                                "۱۲:۰۰ (سانس ظهر)",
                                "۱۵:۰۰ (سانس بعد از ظهر)",
                                "۱۸:۰۰ (سانس عصر)",
                                "۲۱:۰۰ (سانس شب)"
                              ].map((t) => (
                                <div 
                                  key={t}
                                  onClick={(e) => { e.stopPropagation(); setActivityTime(t); setShowActivityTimeSelect(false); }}
                                  className={cn(
                                    "px-5 py-3 hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer text-xs sm:text-sm font-bold transition-all",
                                    activityTime === t ? "text-blue-600 bg-blue-600/5" : "text-slate-800 dark:text-slate-200"
                                  )}
                                >
                                  {t}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* 4. Number of Guests (People) Input */}
                        <div 
                          onClick={() => { 
                            setShowActivityGuestsSelect(!showActivityGuestsSelect); 
                            setShowActivityDatePicker(false); 
                            setShowActivityDestSuggestions(false);
                            setShowActivityTimeSelect(false);
                          }}
                          className="flex-1 bg-white/40 hover:bg-white/60 dark:bg-slate-950/40 dark:hover:bg-slate-950/60 backdrop-blur-md transition-all rounded-2xl p-4 flex items-center gap-4 cursor-pointer relative border border-white/20 dark:border-slate-800/30 animate-in fade-in"
                        >
                          <div className="w-11 h-11 rounded-tr-2xl rounded-bl-2xl rounded-tl-lg rounded-br-lg bg-gradient-to-tr from-blue-600/10 to-blue-600/10 dark:from-blue-400/15 dark:to-blue-600/5 flex items-center justify-center shrink-0 border border-blue-600/20 group-hover:scale-105 transition-transform duration-300">
                            <Users size={20} className="text-blue-600 dark:text-blue-400" strokeWidth={2} />
                          </div>
                          <div className="flex-1">
                            <label className="block text-[11px] text-slate-500 dark:text-slate-400 font-bold mb-0.5">تعداد بلیت / نفرات</label>
                            <div className="text-slate-900 dark:text-white font-semibold text-xs sm:text-sm">
                              {activityGuests} نفر
                            </div>
                          </div>

                          {showActivityGuestsSelect && (
                            <div onClick={e => e.stopPropagation()} className="absolute left-0 right-0 top-[calc(100%+12px)] bg-white dark:bg-[#0b0e26] border border-slate-200 dark:border-slate-800 shadow-2xl rounded-[2rem] p-5 z-50 animate-in slide-in-from-top-2 cursor-default">
                              <div className="flex justify-between items-center">
                                <span className="text-slate-900 dark:text-white font-bold text-sm">تعداد نفرات (بلیت)</span>
                                <div className="flex items-center gap-4">
                                  <button 
                                    onClick={() => setActivityGuests(p => Math.max(1, p - 1))} 
                                    className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center font-bold transition-colors text-lg"
                                  >
                                    -
                                  </button>
                                  <span className="w-6 text-center font-bold text-lg dark:text-white">{activityGuests}</span>
                                  <button 
                                    onClick={() => setActivityGuests(p => p + 1)} 
                                    className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center font-bold transition-colors text-lg"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Destination Input (RTL right-most element) */}
                        <div className="flex-1 min-w-0 bg-white/40 hover:bg-white/60 dark:bg-slate-950/40 dark:hover:bg-slate-950/60 backdrop-blur-md transition-all rounded-2xl p-4 flex items-center gap-4 relative group border border-white/20 dark:border-slate-800/30">
                            <div className="w-11 h-11 rounded-tr-2xl rounded-bl-2xl rounded-tl-lg rounded-br-lg bg-gradient-to-tr from-blue-500/10 to-blue-600/10 dark:from-blue-400/15 dark:to-blue-600/5 flex items-center justify-center shrink-0 border border-blue-500/20 group-hover:scale-105 transition-transform duration-300">
                                <MapPin size={20} className="text-blue-600 dark:text-blue-400" strokeWidth={2} />
                            </div>
                            <div className="flex-1 min-w-0">
                                    <label htmlFor="destination-input" className="block text-[11px] text-slate-500 dark:text-slate-400 font-bold mb-0.5">مقصد یا هتل (داخلی و خارجی)</label>
                                    <input 
                                        id="destination-input"
                                        aria-label="جستجوی مقصد یا نام هتل"
                                        type="text" 
                                        value={destination}
                                    onChange={(e) => {
                                      setDestination(e.target.value);
                                      setShowDestSuggestions(true);
                                    }}
                                    onFocus={() => { setShowDestSuggestions(true); setShowDatePicker(false); setShowOccupancy(false); }}
                                    onBlur={() => setTimeout(() => setShowDestSuggestions(false), 200)}
                                    placeholder="کجا می‌روید؟ (مثال: تهران، کیش)" 
                                    className="w-full bg-transparent outline-none text-slate-900 dark:text-white font-semibold placeholder-slate-400 dark:placeholder-slate-500 text-xs sm:text-sm" 
                                />
                            </div>
                            
                            {/* Destination Suggestions Popover styled with Opaque design (No blur, solid background) */}
                            {showDestSuggestions && (
                                <div className="absolute right-0 left-0 top-[calc(100%+12px)] bg-white dark:bg-[#0b0e26] border border-slate-200 dark:border-slate-800 shadow-2xl rounded-[2rem] z-[100] overflow-hidden max-h-80 overflow-y-auto animate-in slide-in-from-top-2">
                                    <div className="p-4 bg-slate-50 dark:bg-slate-900/50 text-[10px] text-slate-400 font-bold border-b border-slate-100/30 dark:border-slate-800/20">
                                      شهرهای پرطرفدار پیشنهادی
                                    </div>
                                    {citySuggestions.map(city => (
                                    <div 
                                        key={city.name} 
                                        onClick={() => { setDestination(city.name); setShowDestSuggestions(false); }} 
                                        className="px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-colors flex items-center justify-between border-b border-slate-100/30 dark:border-slate-800/10"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                                <MapPin size={16} strokeWidth={2.5} />
                                            </div>
                                            <div className="text-right">
                                                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm block">{city.name}</span>
                                                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium block">{city.province}</span>
                                            </div>
                                        </div>
                                        <span className="text-xs text-slate-400 dark:text-slate-500 font-mono font-bold bg-slate-50 dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-100 dark:border-slate-800">{city.count} اقامتگاه</span>
                                    </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Double-Partition Date Input styled with frosted glassmorphism */}
                        <div 
                            onClick={() => { setShowDatePicker(!showDatePicker); setShowOccupancy(false); setShowDestSuggestions(false); }}
                            className="flex-1 bg-white/40 hover:bg-white/60 dark:bg-slate-950/40 dark:hover:bg-slate-950/60 backdrop-blur-md transition-all rounded-2xl p-4 flex items-center gap-4 cursor-pointer relative border border-white/20 dark:border-slate-800/30"
                        >
                            <div className="w-11 h-11 rounded-tr-2xl rounded-bl-2xl rounded-tl-lg rounded-br-lg bg-gradient-to-tr from-blue-500/10 to-blue-600/10 dark:from-blue-400/15 dark:to-blue-600/5 flex items-center justify-center shrink-0 border border-blue-500/20 group-hover:scale-105 transition-transform duration-300">
                                <CalendarDays size={20} className="text-blue-600 dark:text-blue-400" strokeWidth={2} />
                            </div>
                            <div className="flex-1 grid grid-cols-2 gap-4 divide-x divide-x-reverse divide-slate-200/50 dark:divide-slate-800">
                                <div className="text-right">
                                    <label className="block text-[11px] text-slate-500 dark:text-slate-400 font-bold mb-0.5">تاریخ ورود</label>
                                    <div className="text-slate-900 dark:text-white font-semibold text-xs sm:text-sm">
                                      {startDate ? formatJalaliDate(startDate) : "انتخاب تاریخ"}
                                    </div>
                                </div>
                                <div className="text-right pr-4">
                                    <label className="block text-[11px] text-slate-500 dark:text-slate-400 font-bold mb-0.5">تاریخ خروج</label>
                                    <div className="text-slate-900 dark:text-white font-semibold text-xs sm:text-sm">
                                      {endDate ? formatJalaliDate(endDate) : "انتخاب تاریخ"}
                                    </div>
                                </div>
                            </div>
                            
                            {showDatePicker && (
                                <div onClick={e => e.stopPropagation()} className="absolute right-0 top-[calc(100%+12px)] w-full min-w-[320px] md:w-[380px] z-[100]">
                                    <DateRangePicker 
                                        startDate={startDate} 
                                        endDate={endDate} 
                                        onSelectRange={(start, end) => { setStartDate(start); setEndDate(end); }} 
                                        onClose={() => setShowDatePicker(false)} 
                                    />
                                </div>
                            )}
                        </div>

                        {/* Occupancy Slot styled with frosted glassmorphism */}
                        <div 
                            onClick={() => { setShowOccupancy(!showOccupancy); setShowDatePicker(false); setShowDestSuggestions(false); }}
                            className="flex-1 bg-white/40 hover:bg-white/60 dark:bg-slate-950/40 dark:hover:bg-slate-950/60 backdrop-blur-md transition-all rounded-2xl p-4 flex items-center gap-4 cursor-pointer relative border border-white/20 dark:border-slate-800/30"
                        >
                            <div className="w-11 h-11 rounded-tr-2xl rounded-bl-2xl rounded-tl-lg rounded-br-lg bg-gradient-to-tr from-blue-500/10 to-blue-600/10 dark:from-blue-400/15 dark:to-blue-600/5 flex items-center justify-center shrink-0 border border-blue-500/20 group-hover:scale-105 transition-transform duration-300">
                                <Users size={20} className="text-blue-600 dark:text-blue-400" strokeWidth={2} />
                            </div>
                            <div className="flex-1">
                                <label className="block text-[11px] text-slate-500 dark:text-slate-400 font-bold mb-0.5">مسافران و اتاق‌ها</label>
                                <div className="text-slate-900 dark:text-white font-semibold text-xs sm:text-sm">{occupancy.adults} بزرگسال، {occupancy.rooms} اتاق</div>
                            </div>
                            
                            {showOccupancy && (
                                <div onClick={e => e.stopPropagation()} className="absolute left-0 right-0 md:right-auto md:-left-4 top-[calc(100%+12px)] w-full min-w-[320px] md:w-[340px] bg-white dark:bg-[#0b0e26] border border-slate-200 dark:border-slate-800 shadow-2xl rounded-[2rem] p-6 z-[100] space-y-5 animate-in slide-in-from-top-2 cursor-default">
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-900 dark:text-white font-bold text-sm">تعداد اتاق</span>
                                        <div className="flex items-center gap-4">
                                            <button onClick={(e) => { e.stopPropagation(); setOccupancy(p => ({...p, rooms: Math.max(1, p.rooms - 1)})); }} className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center font-bold transition-colors text-lg">-</button>
                                            <span className="w-6 text-center font-bold text-lg dark:text-white">{occupancy.rooms}</span>
                                            <button onClick={(e) => { e.stopPropagation(); setOccupancy(p => ({...p, rooms: p.rooms + 1})); }} className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center font-bold transition-colors text-lg">+</button>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-900 dark:text-white font-bold text-sm">بزرگسال</span>
                                        <div className="flex items-center gap-4">
                                            <button aria-label="کاهش تعداد بزرگسالان" onClick={(e) => { e.stopPropagation(); setOccupancy(p => ({...p, adults: Math.max(1, p.adults - 1)})); }} className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center font-bold transition-colors text-lg">-</button>
                                            <span className="w-6 text-center font-bold text-lg dark:text-white" aria-live="polite">{occupancy.adults}</span>
                                            <button aria-label="افزایش تعداد بزرگسالان" onClick={(e) => { e.stopPropagation(); setOccupancy(p => ({...p, adults: p.adults + 1})); }} className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center font-bold transition-colors text-lg">+</button>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <span className="text-slate-900 dark:text-white font-bold text-sm block">کودک</span>
                                            <span className="text-[10px] text-slate-500 font-medium">تا ۱۲ سال</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <button aria-label="کاهش تعداد کودکان" onClick={(e) => { e.stopPropagation(); setOccupancy(p => ({...p, kids: Math.max(0, p.kids - 1)})); }} className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center font-bold transition-colors text-lg">-</button>
                                            <span className="w-6 text-center font-bold text-lg dark:text-white" aria-live="polite">{occupancy.kids}</span>
                                            <button aria-label="افزایش تعداد کودکان" onClick={(e) => { e.stopPropagation(); setOccupancy(p => ({...p, kids: p.kids + 1})); }} className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center font-bold transition-colors text-lg">+</button>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); setShowOccupancy(false); }}
                                        className="w-full bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-2.5 rounded-xl text-xs transition-all shadow-md mt-2"
                                    >
                                        تایید
                                    </button>
                                </div>
                            )}
                        </div>
                      </>
                    )}


                    {/* Highly Creative, Illuminated Custom Gradient Action Search Button */}
                    <div className="flex gap-2 lg:flex-row flex-col shrink-0">
                      <button 
                        onClick={() => handleSearchTrigger()} 
                        className="bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-500 hover:to-blue-600 text-white font-bold rounded-2xl px-8 lg:px-10 py-4 flex-1 lg:flex-none flex items-center justify-center transition-all shadow-xl shadow-blue-500/15 hover:shadow-blue-500/25 active:scale-95 transform gap-2.5 text-lg border border-white/10 cursor-pointer"
                      >
                          <Search size={22} strokeWidth={3} />
                          <span>جستجو</span>
                      </button>
                      <button 
                        onClick={() => setShowAISearch(!showAISearch)} 
                        className="bg-white/40 hover:bg-white/60 dark:bg-slate-950/40 dark:hover:bg-slate-950/60 backdrop-blur-md text-blue-600 dark:text-blue-400 font-bold rounded-2xl px-4 py-4 flex items-center justify-center transition-all border border-blue-600/20 gap-2 shrink-0 group shadow-lg"
                        title="جستجوی هوشمند با AI"
                        aria-label="جستجوی هوشمند با هوش مصنوعی"
                        aria-expanded={showAISearch}
                        aria-controls="ai-search-panel"
                      >
                          <Sparkles size={20} className="group-hover:animate-pulse" />
                      </button>
                    </div>
                </div>

                {/* Expandable AI Search Panel */}
                {showAISearch && (
                    <div id="ai-search-panel" className="mt-4 bg-gradient-to-r from-blue-600/5 via-blue-500/10 to-transparent border border-blue-600/20 dark:border-blue-600/10 rounded-2xl p-4 animate-in slide-in-from-top-2">
                        <div className="flex items-center gap-2 mb-3">
                           <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shrink-0 shadow-md shadow-blue-600/20">
                             <Sparkles size={14} className="text-white" />
                           </div>
                           <h4 id="ai-search-heading" className="text-sm font-bold text-blue-700 dark:text-blue-400">جستجوی هوشمند با Gemini</h4>
                        </div>
                        <div className="flex items-center gap-2 bg-white/50 dark:bg-slate-900/50 border border-blue-600/20 rounded-xl p-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-600/30 transition-all">
                           <input 
                              type="text" 
                              aria-labelledby="ai-search-heading"
                              placeholder="مثلاً: یه هتل خوب تو کیش برای ماه عسل می‌خوام که استخر داشته باشه..."
                              className="flex-1 bg-transparent border-none focus:outline-none text-xs sm:text-sm px-2 py-1 text-slate-800 dark:text-slate-200 placeholder:text-slate-400"
                              dir="rtl"
                           />
                           <button aria-label="شروع جستجوی هوشمند" onClick={() => handleSearchTrigger()} className="bg-blue-600 hover:bg-blue-600 text-white rounded-lg px-4 py-2 text-xs font-bold transition-colors">
                              بگرد
                           </button>
                        </div>
                    </div>
                )}

                {/* Recent Searches (جستجوهای اخیر) */}
                {recentSearches.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-slate-200/20 dark:border-white/5 animate-in fade-in">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-bold shrink-0">
                        <History size={15} className="text-blue-500 animate-pulse" />
                        <span>جستجوهای اخیر شما:</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 flex-1 justify-start sm:justify-end">
                        {recentSearches.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => handleRecentSearchClick(item)}
                            className="flex items-center gap-2 bg-slate-100/60 hover:bg-slate-200/80 dark:bg-white/5 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 px-3 py-1.5 rounded-full cursor-pointer transition-all border border-slate-200/40 dark:border-white/5 shadow-sm hover:scale-[1.01] text-xs font-bold group"
                          >
                            <span className="group-hover:text-blue-500 transition-colors">{item.destination}</span>
                            {item.startDate && (
                              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium font-sans">
                                ({toPersianDigits(formatJalaliDate(item.startDate))})
                              </span>
                            )}
                            <button
                              onClick={(e) => removeRecentSearch(item.id, e)}
                              className="text-slate-400 hover:text-blue-600 transition-colors p-0.5 rounded-full hover:bg-slate-200 dark:hover:bg-white/10"
                              title="حذف"
                              aria-label="حذف جستجوی اخیر"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={clearRecentSearches}
                          className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors cursor-pointer mr-2 shrink-0"
                        >
                          پاک کردن همه
                        </button>
                      </div>
                    </div>
                  </div>
                )}

            </div>

        </div>
      </div>

                  {/* Hotel Services Carousel Section - Continuous Marquee */}
      <div className="w-full py-10 bg-slate-50/40 dark:bg-slate-950/20 relative z-10 border-y border-slate-200/50 dark:border-slate-800/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <div className="text-center">
            <span className="text-[10px] font-bold tracking-widest text-blue-600 dark:text-blue-400 bg-blue-600/10 dark:bg-blue-400/10 px-3 py-1 rounded-full uppercase mb-2 inline-block shadow-sm">
              تفریح، تندرستی و تشریفات لوکس
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mt-1 mb-2">
              امکان استفاده آزاد؛ بدون نیاز به اقامت در هتل!
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-xs max-w-2xl mx-auto leading-relaxed">
              تجربه یک روز آرامش‌بخش، طعم‌های ماندگار یا برگزاری همایش‌ها، مستقل از رزرو هتل.
            </p>
          </div>
        </div>

        {/* Continuous Marquee Wrapper */}
        <div className="relative w-full overflow-hidden flex items-center group">
          {/* Gradient Masks for fade effect at edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50/90 dark:from-slate-950/90 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50/90 dark:from-slate-950/90 to-transparent z-10"></div>
          
          <div className="flex animate-marquee-rtl group-hover:[animation-play-state:paused] gap-4 w-max">
            {[...servicesList, ...servicesList, ...servicesList, ...servicesList].map((service, idx) => {
              const IconComp = service.icon;
              return (
                <div key={idx} 
                     onClick={(e) => { e.stopPropagation(); handleOpenServiceBooking(service); }}
                     className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-[1.5rem] p-3 flex flex-col shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden group/card cursor-pointer w-60 shrink-0 mx-2"
                     dir="rtl">
                  <div className="relative w-full h-36 rounded-[1rem] overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 mb-3 group-hover/card:shadow-inner">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                    />
                    <div className="absolute top-2 right-2 z-10">
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-bold backdrop-blur-md shadow-sm ${service.badgeClass.replace('bg-', 'bg-white/90 dark:bg-slate-900/90 border-')}`}>
                        <IconComp size={10} />
                        <span>{service.badgeText}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 text-right flex-grow">
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1">{service.title}</h4>
                      {service.location && (
                        <span className="text-slate-400 dark:text-slate-500 text-[10px] font-bold flex items-center gap-1 mt-1">
                          <MapPin size={10} className="text-slate-400 shrink-0" />
                          <span className="truncate">{service.location}</span>
                        </span>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center mt-auto pt-3 border-t border-slate-100 dark:border-slate-800/50">
                      <div className="flex flex-col">
                        <span className="text-slate-400 font-bold text-[9px]">شروع قیمت از</span>
                        <div className="text-sm font-bold text-slate-900 dark:text-white font-mono tracking-tighter">
                          {service.pricePerPerson.toLocaleString("fa-IR")}
                          <span className="text-[9px] mr-1 text-slate-500 font-sans font-bold">تومان</span>
                        </div>
                      </div>
                      <button className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 p-2 rounded-xl transition-colors">
                        <ChevronLeft size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center mt-8">
           <button 
              onClick={() => {
                 window.scrollTo({ top: 0, behavior: 'smooth' });
                 handleSearchTrigger();
              }} 
              className="bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 border border-blue-600/20 hover:border-blue-600/50 hover:bg-blue-50 dark:hover:bg-blue-700/20 px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 group cursor-pointer"
           >
              <Search size={14} className="text-blue-600 group-hover:-translate-x-1 transition-transform" />
              مشاهده تمامی خدمات تفریحی
           </button>
        </div>
      </div>

{/* Suggested Hotels Section (هتل‌های پیشنهادی) - Sourced from the third reference image */}
      <div className="bg-slate-100/60 dark:bg-slate-900/40 border-y border-slate-200/50 dark:border-slate-800/30 py-16 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
              
              <div className="text-center mb-12">
              <span className="text-[11px] font-bold tracking-widest text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-400/10 px-4 py-1.5 rounded-full uppercase mb-3 inline-block shadow-sm">
                  محبوب‌ترین اقامتگاه‌ها
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mt-1 mb-3">هتل‌های پیشنهادی اونجا</h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium text-sm max-w-xl mx-auto leading-relaxed">
                  برای دیدن هتل‌های پیشنهادی هر شهر لطفا مقصد خود را انتخاب کنید
              </p>

              {/* City Selection Tabs - Styled with glassy pills */}
              <div className="flex flex-wrap justify-center items-center gap-2 pt-4">
                  {Object.keys(suggestedHotelsByCity).map(city => (
                      <button 
                          key={city}
                          onClick={() => setSuggestedCityTab(city)}
                          className={cn(
                              "px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-sm backdrop-blur-md",
                              suggestedCityTab === city 
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25 scale-105 border border-blue-500/20" 
                                : "bg-white/40 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-white/20 dark:border-white/5 hover:bg-white/60 dark:hover:bg-white/10"
                          )}
                      >
                          {city}
                      </button>
                  ))}
              </div>
          </div>

          {/* Hotels Grid with premium Glassmorphism */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {suggestedHotelsByCity[suggestedCityTab]?.map(hotel => (
                  <div 
                      key={hotel.id} 
                      onClick={() => handleSearchTrigger(suggestedCityTab)} 
                      className="group bg-white/70 dark:bg-[#0c0f1d]/65 backdrop-blur-xl border border-slate-200/50 dark:border-white/5 rounded-[2rem] p-3 cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                  >
                      {/* Image Frame - Framed internally inside the card for a high-end editorial look */}
                      <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[1.25rem] bg-slate-100 dark:bg-slate-900 shadow-inner">
                          <img 
                              src={hotel.image} 
                              alt={hotel.name} 
                              className="w-full h-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-105 group-hover:rotate-1"
                              referrerPolicy="no-referrer"
                          />
                          
                          {/* Top-Right Discount Tag with Premium Style */}
                          {hotel.discount && (
                              <div className="absolute top-3 right-3 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-sm border border-blue-600/20">
                                  ٪{hotel.discount} تخفیف
                              </div>
                          )}

                          {/* Top-Left Special perk Tag with Glassmorphism */}
                          {hotel.badge && (
                              <div className="absolute top-3 left-3 bg-slate-950/75 backdrop-blur-md text-white text-[9px] font-bold px-2 py-0.5 rounded-md border border-white/10 flex items-center gap-1 shadow-sm">
                                  <Sparkles size={10} className="text-blue-400 shrink-0" />
                                  <span>{hotel.badge}</span>
                              </div>
                          )}
                      </div>

                      {/* Info Body */}
                      <div className="px-2 pt-4 pb-1 flex-grow flex flex-col justify-between space-y-4">
                          <div className="space-y-2">
                              {/* Stars & Category */}
                              <div className="flex items-center justify-between">
                                  <div className="flex gap-0.5 text-blue-400">
                                      {Array.from({ length: hotel.stars }).map((_, i) => (
                                          <Star key={i} size={10} fill="currentColor" stroke="none" />
                                      ))}
                                  </div>
                                  <div className="flex items-center gap-1">
                                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400"></span>
                                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">هتل</span>
                                  </div>
                              </div>

                              {/* Hotel Name */}
                              <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-[14px] leading-snug line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                  {hotel.name}
                              </h3>

                              {/* Reviews and Rating inline chip */}
                              <div className="flex items-center gap-2 text-xs">
                                  <span className="bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md font-bold text-[11px] border border-blue-500/5">
                                      {hotel.rating}
                                  </span>
                                  <span className="text-slate-600 dark:text-slate-300 font-bold text-[11px]">{hotel.ratingText}</span>
                                  <span className="text-slate-400 dark:text-slate-500 font-medium text-[10px]">({hotel.reviewsCount} نظر)</span>
                              </div>
                          </div>

                          {/* Pricing & Location Row - Sleek & Modern */}
                          <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                              {/* Location */}
                              <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500 text-[10px] font-bold max-w-[45%]">
                                  <MapPin size={11} className="text-slate-400 dark:text-slate-600 shrink-0" />
                                  <span className="truncate">{hotel.location}</span>
                              </div>

                              {/* Pricing Stack */}
                              <div className="flex flex-col items-end text-left">
                                  {hotel.originalPrice && (
                                      <span className="text-[10px] text-slate-400 dark:text-slate-500 line-through font-sans font-medium tracking-tighter">
                                          {toPersianDigits(hotel.originalPrice.toLocaleString())}
                                      </span>
                                  )}
                                  <div className="flex items-baseline gap-1">
                                      <span className="text-xs text-slate-400 dark:text-slate-500 font-bold">از</span>
                                      <span className="text-blue-600 dark:text-blue-400 font-sans font-bold text-base sm:text-[17px] tracking-tighter">
                                          {toPersianDigits(hotel.price.toLocaleString())}
                                      </span>
                                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">تومان</span>
                                  </div>
                              </div>
                          </div>
                      </div>

                  </div>
              ))}
          </div>

      </div>
    </div>

      {/* Popular Destinations - Restyled as high-contrast glassy section */}
      <div className="bg-white/20 dark:bg-slate-950/20 py-16 border-y border-white/20 dark:border-white/5 backdrop-blur-xl relative z-10">
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-6">
                <div className="text-right">
                    <span className="text-[11px] font-bold tracking-widest text-blue-600 dark:text-blue-400 bg-blue-600/10 dark:bg-blue-400/10 px-4 py-1.5 rounded-full uppercase mb-3 inline-block shadow-sm">
                        کشف جاذبه‌ها
                    </span>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mt-1 mb-2">مقاصد پرطرفدار ایران</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-sm leading-relaxed">کشف زیباترین شهرهای ایران برای سفر بعدی شما</p>
                </div>
                <button onClick={() => handleSearchTrigger()} className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2 group border-b-2 border-transparent hover:border-blue-600 dark:hover:border-blue-400 pb-1 transition-all shrink-0">
                    نمایش همه مقاصد <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { name: 'تهران', desc: 'پایتخت پرهیاهو و متمدن', img: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=600&auto=format&fit=crop' },
                    { name: 'اصفهان', desc: 'نصف جهان، مهد معماری', img: 'https://images.unsplash.com/photo-1505673542670-a5e3ff5b14a3?q=80&w=600&auto=format&fit=crop' },
                    { name: 'شیراز', desc: 'شهر راز، گل و بوستان حافظ', img: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=600&auto=format&fit=crop' },
                    { name: 'کیش', desc: 'نگین توریستی خلیج نیلگون فارس', img: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=600&auto=format&fit=crop' }
                ].map(city => (
                    <div key={city.name} onClick={() => handleSearchTrigger(city.name)} className="group relative aspect-[3/4] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 border border-white/20 dark:border-white/5 bg-slate-200 dark:bg-slate-800">
                        <img 
                            src={city.img} 
                            alt={city.name} 
                            referrerPolicy="no-referrer"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#070913] via-slate-900/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500"></div>
                        <div className="absolute bottom-8 left-8 right-8 z-10 text-right">
                            <h3 className="text-white text-xl sm:text-2xl font-bold mb-1">{city.name}</h3>
                            <p className="text-slate-300 font-bold text-xs sm:text-sm">{city.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Journal - High-end premium Bento-grid layout redesign for articles */}
      <div className="py-24 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-6">
                  <div className="text-right">
                      <span className="text-[11px] font-bold tracking-widest text-blue-600 dark:text-blue-400 bg-blue-600/10 dark:bg-blue-400/10 px-4 py-1.5 rounded-full uppercase mb-3 inline-block shadow-sm">
                          وبلاگ اونجا
                      </span>
                      <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mt-1 mb-2">مجله سفر اونجا</h2>
                      <p className="text-slate-500 dark:text-slate-400 font-medium text-sm leading-relaxed max-w-2xl">داستان‌ها، تجارب و راهنماهای حرفه‌ای برای سفرهای رویایی بعدی شما</p>
                  </div>
                  {onBlogClick && (
                      <button onClick={onBlogClick} className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2 group border-b-2 border-transparent hover:border-blue-600 dark:hover:border-blue-400 pb-1 transition-all shrink-0">
                          ورود به مجله سفر <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                      </button>
                  )}
              </div>
              
              {/* Premium Bento Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Article 1: Featured (Spans 2 columns on desktop) */}
                  <div 
                      onClick={onBlogClick} 
                      className="lg:col-span-2 group cursor-pointer bg-white/45 dark:bg-[#0e132e]/30 backdrop-blur-xl border border-white/20 dark:border-white/5 rounded-[2.5rem] p-6 hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row gap-6 md:gap-8 hover:-translate-y-1.5"
                  >
                      <div className="relative aspect-[16/10] md:aspect-square w-full md:w-80 shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-800 rounded-3xl">
                          <div 
                              className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-105" 
                              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?q=80&w=1000&auto=format&fit=crop)' }}
                          ></div>
                          <span className="absolute top-4 right-4 bg-blue-600/90 dark:bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md z-10 backdrop-blur-sm">
                              راهنمای سفر ویژه
                          </span>
                      </div>
                      <div className="flex flex-col justify-between flex-grow py-2">
                          <div>
                              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider mb-2 block">داستان سفر</span>
                              <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white leading-relaxed group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                  راهنمای جامع سفر به جزیره جادویی هرمز در زمستان؛ سرزمین رویایی خاک‌های سرخ و نقره‌ای
                              </h3>
                              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-3 line-clamp-3 leading-relaxed">
                                  جزیره هرمز مانند یک گالری زمین‌شناسی طبیعی زنده در دل خلیج همیشه فارس است. در این مقاله رازهای سفر زمستانی به این سرزمین رویایی را فاش می‌کنیم.
                              </p>
                          </div>
                          <div className="flex items-center justify-between pt-4 border-t border-slate-100/40 dark:border-white/5 text-[10px] sm:text-xs text-slate-400 font-bold mt-4">
                              <span>توسط مهران پارسا</span>
                              <span>۲۴ دی ۱۴۰۵ • ۷ دقیقه مطالعه</span>
                          </div>
                      </div>
                  </div>

                  {/* Article 2: Kashan Boutique Hotels (Spans 1 column) */}
                  <div 
                      onClick={onBlogClick} 
                      className="lg:col-span-1 group cursor-pointer bg-white/45 dark:bg-[#0e132e]/30 backdrop-blur-xl border border-white/20 dark:border-white/5 rounded-[2.5rem] p-5 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                  >
                      <div>
                          <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-800 rounded-3xl mb-4">
                              <div 
                                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-105" 
                                  style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1634674720612-4293f9c6c5a0?q=80&w=600&auto=format&fit=crop)' }}
                              ></div>
                              <span className="absolute top-4 right-4 bg-blue-600/90 dark:bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md z-10 backdrop-blur-sm">
                                  معرفی هتل
                              </span>
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              معرفی بهترین بوتیک هتل‌های تاریخی کاشان برای اقامتی جادویی در دل معماری اصیل قاجار
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                              آشنایی با خانه‌سراهای تاریخی کاشان که اصالت، جلال و هنر معماری سنتی ایرانی را در تاروپود خود به نمایش می‌گذارند.
                          </p>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100/40 dark:border-white/5 text-[10px] text-slate-400 font-bold mt-4">
                          <span>توسط نیلوفر رضایی</span>
                          <span>۱۸ دی ۱۴۰۵ • ۵ دقیقه مطالعه</span>
                      </div>
                  </div>

                  {/* Article 3: Desert Camping Checklist (Spans 1 column) */}
                  <div 
                      onClick={onBlogClick} 
                      className="lg:col-span-1 group cursor-pointer bg-white/45 dark:bg-[#0e132e]/30 backdrop-blur-xl border border-white/20 dark:border-white/5 rounded-[2.5rem] p-5 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                  >
                      <div>
                          <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-800 rounded-3xl mb-4">
                              <div 
                                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-105" 
                                  style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=600&auto=format&fit=crop)' }}
                              ></div>
                              <span className="absolute top-4 right-4 bg-blue-600/90 dark:bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md z-10 backdrop-blur-sm">
                                  آموزش بقا
                              </span>
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              چک‌لیست کامل لوازم ضروری برای کمپینگ ایمن در کویرهای بکر و پرستاره ایران
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                              هر آنچه برای بقا و لذت بردن از سکوت بی‌پایان کویر مرنجاب نیاز دارید؛ از تجهیزات ناوبری تا ملزومات گرمایشی شب.
                          </p>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100/40 dark:border-white/5 text-[10px] text-slate-400 font-bold mt-4">
                          <span>توسط احسان علوی</span>
                          <span>۱۰ دی ۱۴۰۵ • ۴ دقیقه مطالعه</span>
                      </div>
                  </div>

                  {/* Article 4: Forests of Gilan & Mazandaran (Spans 2 columns to perfectly fill Row 2 of the 3-column Bento Grid) */}
                  <div 
                      onClick={onBlogClick} 
                      className="lg:col-span-2 group cursor-pointer bg-white/45 dark:bg-[#0e132e]/30 backdrop-blur-xl border border-white/20 dark:border-white/5 rounded-[2.5rem] p-6 hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row gap-6 md:gap-8 hover:-translate-y-1.5"
                  >
                      <div className="relative aspect-[16/10] md:aspect-square w-full md:w-80 shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-800 rounded-3xl">
                          <div 
                              className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-105" 
                              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=1000&auto=format&fit=crop)' }}
                          ></div>
                          <span className="absolute top-4 right-4 bg-blue-600/90 dark:bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md z-10 backdrop-blur-sm">
                              طبیعت‌گردی پایدار
                          </span>
                      </div>
                      <div className="flex flex-col justify-between flex-grow py-2">
                          <div>
                              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider mb-2 block">سفر به بهشت ایران</span>
                              <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white leading-relaxed group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                  سفر به روستاهای پلکانی و مه گرفته شمال؛ ماسوله و فیلبند غرق در اقیانوس ابر
                              </h3>
                              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-3 line-clamp-3 leading-relaxed">
                                  قدم زدن روی بام خانه‌های تاریخی ماسوله و بیدار شدن در آغوش ابرها در ارتفاعات فیلبند. راهنمای گام به گام برای یک سفر رویایی به بکرترین مناطق ییلاقی شمال ایران.
                              </p>
                          </div>
                          <div className="flex items-center justify-between pt-4 border-t border-slate-100/40 dark:border-white/5 text-[10px] sm:text-xs text-slate-400 font-bold mt-4">
                              <span>توسط سارا حسینی</span>
                              <span>۵ دی ۱۴۰۵ • ۶ دقیقه مطالعه</span>
                          </div>
                      </div>
                  </div>

              </div>
          </div>
      </div>

      {/* Trust Factors - Redesigned as glassy translucent elements with custom luxury geometric icons */}
      <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <div className="group text-center space-y-4 bg-white/45 dark:bg-[#0e132e]/30 backdrop-blur-xl border border-white/20 dark:border-white/5 p-8 rounded-[2.5rem] shadow-xl hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 mx-auto bg-gradient-to-tr from-blue-500/10 to-blue-600/10 dark:from-blue-400/15 dark:to-blue-600/5 rounded-tr-[1.5rem] rounded-bl-[1.5rem] rounded-tl-lg rounded-br-lg flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-500/20 shadow-inner transform group-hover:rotate-6 transition-all duration-300">
                  <ShieldCheck size={28} strokeWidth={2} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">تضمین کیفیت و قیمت</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium text-sm leading-relaxed">بالاترین استانداردها با بهترین نرخ‌های تضمین شده برای اقامتی بی‌دغدغه و عالی.</p>
          </div>
          <div className="group text-center space-y-4 bg-white/45 dark:bg-[#0e132e]/30 backdrop-blur-xl border border-white/20 dark:border-white/5 p-8 rounded-[2.5rem] shadow-xl hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 mx-auto bg-gradient-to-tr from-blue-500/10 to-blue-600/10 dark:from-blue-400/15 dark:to-blue-600/5 rounded-tr-[1.5rem] rounded-bl-[1.5rem] rounded-tl-lg rounded-br-lg flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-500/20 shadow-inner transform group-hover:rotate-6 transition-all duration-300">
                  <Star size={28} strokeWidth={2} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">انتخابی از بهترین‌ها</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium text-sm leading-relaxed">مجموعه‌ای دست‌چین شده از مجلل‌ترین هتل‌ها و اقامتگاه‌ها در گوشه و کنار وطن.</p>
          </div>
      </div>

      {/* Club Membership / Newsletter CTA - Re-designed to be ultra-luxury and modern, keeping the original content */}
      <div className="max-w-7xl mx-auto px-6 -mb-24 sm:-mb-32 lg:-mb-40 relative z-20 translate-y-16 sm:translate-y-20 lg:translate-y-24">
          <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#0c1e5c] via-[#081236] to-[#030614] border border-blue-500/40 p-8 sm:p-12 lg:p-16 shadow-[0_30px_70px_rgba(12,28,79,0.35)] hover:shadow-[0_40px_90px_rgba(12,28,79,0.45)] transition-all duration-500 group text-center">
              
              {/* Creative absolute background image with premium overlay */}
              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                  <img 
                      src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop" 
                      alt="Travel adventure" 
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover opacity-[0.08] dark:opacity-[0.16] mix-blend-overlay scale-105 group-hover:scale-110 transition-transform duration-[6s] ease-out-expo"
                  />
                  {/* Subtle vignette/fade-out gradient overlay to blend image seamlessly with text */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0c1e5c]/50 via-transparent to-[#030614]/50"></div>
              </div>

              {/* Modern abstract subtle geometric line background */}
              <div className="absolute inset-0 bg-[radial-gradient(#3b82f620_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
              
              {/* Elegant ambient glow behind content */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-blue-500/25 rounded-full blur-[120px] pointer-events-none"></div>
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] pointer-events-none"></div>
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-cyan-500/15 rounded-full blur-[80px] pointer-events-none"></div>
              
              <div className="max-w-3xl mx-auto space-y-8 relative z-10">
                  <div className="space-y-4">
                      {/* Premium Badge */}
                      <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[11px] font-bold px-4 py-1.5 rounded-full shadow-sm">
                          <Sparkles size={12} className="animate-spin duration-[10s]" />
                          <span className="tracking-wider">خبرنامه اختصاصی اونجا</span>
                      </div>
                      
                      {/* Original Heading with premium styling */}
                      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
                          به جمع بیش از ۵۰ هزار ماجراجوی اونجا بپیوندید
                      </h2>
                      
                      {/* Original Subtitle with refined layout */}
                      <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-bold">
                          با عضویت در خبرنامه ویژه، هر هفته تخفیف‌های پنهان هتل‌ها و تجربیات دست‌اول سفر به نقاط بکر ایران را دریافت کنید.
                      </p>
                  </div>

                  {/* Elegant Subscription Form */}
                  <div className="max-w-md mx-auto">
                      {!isSubscribed ? (
                          <form 
                              onSubmit={(e) => {
                                  e.preventDefault();
                                  if (subscribedEmail.trim()) {
                                      setIsSubscribed(true);
                                  }
                              }} 
                              className="flex flex-col sm:flex-row gap-2 bg-white/5 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 shadow-lg focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-400/10 transition-all"
                          >
                              <div className="flex-grow flex items-center gap-3 px-3 py-2 sm:py-0">
                                  <Mail size={16} className="text-blue-300 shrink-0" />
                                  <input 
                                      type="email" 
                                      required
                                      value={subscribedEmail}
                                      onChange={(e) => setSubscribedEmail(e.target.value)}
                                      placeholder="آدرس ایمیل شما" 
                                      className="bg-transparent border-0 outline-none focus:outline-none w-full text-xs sm:text-sm text-white placeholder-slate-400 font-bold text-right"
                                  />
                              </div>
                              <button 
                                  type="submit" 
                                  className="bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-md shadow-blue-500/15 hover:shadow-blue-500/25 transition-all shrink-0 active:scale-95"
                              >
                                  عضویت فوری
                              </button>
                          </form>
                      ) : (
                          <div className="bg-blue-600/10 border border-blue-600/20 p-6 rounded-2xl text-center space-y-2 animate-in zoom-in-95 duration-300">
                              <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 mx-auto">
                                  <Check size={20} strokeWidth={3} />
                              </div>
                              <h4 className="text-white font-bold text-base">سپاسگزاریم! عضویت شما با موفقیت ثبت شد</h4>
                              <p className="text-xs text-slate-300 font-bold">
                                  از این پس بهترین پیشنهادهای سفر به ایمیل <span className="font-mono text-blue-300 underline">{subscribedEmail}</span> ارسال خواهد شد.
                              </p>
                          </div>
                      )}
                  </div>
              </div>
          </div>
      </div>

      {/* Service Booking & Ticket Portal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-lg flex items-center justify-center p-3 sm:p-6 md:p-10 animate-in fade-in duration-300">
          <div className="relative w-full max-w-5xl bg-white border border-slate-200 rounded-[3rem] shadow-[0_30px_90px_rgba(0,0,0,0.15)] overflow-hidden transition-all duration-500 my-auto max-h-[calc(100vh-2rem)] overflow-y-auto custom-scrollbar">
            
            {/* Ambient Background Lights */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Close Button */}
            <button 
              onClick={() => setSelectedService(null)}
              className="absolute top-6 left-6 z-20 w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-all cursor-pointer"
              aria-label="بستن"
            >
              <X size={18} />
            </button>

            {!bookingSuccessTicket ? (
              // STEP 1: Booking Form
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                
                {/* Left Column - Service Details & Info */}
                <div className="lg:col-span-5 relative overflow-hidden p-8 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-l border-slate-200/60 min-h-[300px] lg:min-h-[550px]">
                  {/* Background Image Overlay with gradient */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={selectedService.image} 
                      alt={selectedService.title} 
                      className="w-full h-full object-cover opacity-15 scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/90 to-transparent"></div>
                  </div>

                  <div className="relative z-10 space-y-6 text-right">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${selectedService.badgeClass}`}>
                      {React.createElement(selectedService.icon, { size: 12 })}
                      <span>{selectedService.badgeText}</span>
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight mb-2">
                        {selectedService.title}
                      </h2>
                      <div className="flex items-center justify-end gap-2 text-slate-500 text-xs font-bold">
                        <span>{selectedService.location}</span>
                        <MapPin size={14} className="text-blue-500 shrink-0" />
                      </div>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {selectedService.description}
                    </p>
                  </div>

                  <div className="relative z-10 pt-6 space-y-4 border-t border-slate-200/60">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>نرخ آزاد پایه برای هر نفر:</span>
                      <span className="font-mono text-slate-900 text-sm font-bold">
                        {toPersianDigits(selectedService.pricePerPerson.toLocaleString())} تومان
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>تخفیف ویژه شهروندان اونجا:</span>
                      <span className="text-blue-700 font-bold bg-blue-50 border border-blue-50 px-2 py-0.5 rounded">
                        ۱۵٪ تخفیف اعمال شد
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>کیف پول شما:</span>
                      <div className="flex items-center gap-1 text-blue-600 font-bold">
                        <Wallet size={14} />
                        <span>۵,۰۰۰,۰۰۰ تومان</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Booking Form Inputs */}
                <div className="lg:col-span-7 p-8 sm:p-10 bg-white">
                  <div className="space-y-6">
                    <div className="text-right">
                      <span className="text-[10px] font-bold uppercase text-blue-600 tracking-wider">سامانه رزرو اختصاصی خدمات</span>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">مشخصات رزرو بلیت و نوبت حضور</h3>
                    </div>

                    <form onSubmit={handleConfirmBooking} className="space-y-5">
                      {/* Full Name Input */}
                      <div className="space-y-2 text-right">
                        <label className="text-xs font-bold text-slate-700 block">نام و نام خانوادگی رزروکننده</label>
                        <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-2xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all">
                          <User size={16} className="text-slate-400 absolute right-4 shrink-0" />
                          <input 
                            type="text"
                            required
                            value={bookingName}
                            onChange={(e) => setBookingName(e.target.value)}
                            placeholder="مثال: علیرضا محمدی"
                            className="w-full bg-transparent border-0 py-3.5 pr-12 pl-4 text-sm text-slate-900 outline-none focus:outline-none font-bold text-right"
                          />
                        </div>
                      </div>

                      {/* Phone Input */}
                      <div className="space-y-2 text-right">
                        <label className="text-xs font-bold text-slate-700 block">شماره تلفن همراه</label>
                        <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-2xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all" dir="ltr">
                          <Phone size={16} className="text-slate-400 absolute left-4 shrink-0" />
                          <input 
                            type="tel"
                            required
                            pattern="09[0-9]{9}"
                            maxLength={11}
                            value={bookingPhone}
                            onChange={(e) => setBookingPhone(e.target.value)}
                            placeholder="09123456789"
                            className="w-full bg-transparent border-0 py-3.5 pl-12 pr-4 text-sm text-slate-900 outline-none focus:outline-none font-mono font-bold text-left"
                          />
                        </div>
                      </div>

                      {/* Date & Time Selector */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2 text-right">
                          <label className="text-xs font-bold text-slate-700 block">تاریخ پذیرش نوبت</label>
                          <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-2xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all">
                            <CalendarDays size={16} className="text-slate-400 absolute right-4 shrink-0" />
                            <select 
                              value={bookingDate}
                              onChange={(e) => setBookingDate(e.target.value)}
                              className="w-full bg-transparent border-0 py-3.5 pr-12 pl-4 text-xs sm:text-sm text-slate-900 outline-none focus:outline-none font-bold appearance-none cursor-pointer text-right"
                            >
                              <option className="bg-white text-slate-900 font-bold" value="۱۴۰۵/۰۴/۱۵">۱۵ تیر ۱۴۰۵ (امروز)</option>
                              <option className="bg-white text-slate-900 font-bold" value="۱۴۰۵/۰۴/۱۶">۱۶ تیر ۱۴۰۵</option>
                              <option className="bg-white text-slate-900 font-bold" value="۱۴۰۵/۰۴/۱۷">۱۷ تیر ۱۴۰۵</option>
                              <option className="bg-white text-slate-900 font-bold" value="۱۴۰۵/۰۴/۱۸">۱۸ تیر ۱۴۰۵</option>
                              <option className="bg-white text-slate-900 font-bold" value="۱۴۰۵/۰۴/۱۹">۱۹ تیر ۱۴۰۵</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-2 text-right">
                          <label className="text-xs font-bold text-slate-700 block">ساعت حضور</label>
                          <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-2xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all">
                            <Clock size={16} className="text-slate-400 absolute right-4 shrink-0" />
                            <select 
                              value={bookingTime}
                              onChange={(e) => setBookingTime(e.target.value)}
                              className="w-full bg-transparent border-0 py-3.5 pr-12 pl-4 text-xs sm:text-sm text-slate-900 outline-none focus:outline-none font-bold appearance-none cursor-pointer text-right"
                            >
                              <option className="bg-white text-slate-900 font-bold" value="۱۰:۰۰">۱۰:۰۰ صبح</option>
                              <option className="bg-white text-slate-900 font-bold" value="۱۲:۰۰">۱۲:۰۰ ظهر</option>
                              <option className="bg-white text-slate-900 font-bold" value="۱۴:۰۰">۱۴:۰۰ بعد از ظهر</option>
                              <option className="bg-white text-slate-900 font-bold" value="۱۶:۰۰">۱۶:۰۰ عصر</option>
                              <option className="bg-white text-slate-900 font-bold" value="۱۸:۰۰">۱۸:۰۰ عصر</option>
                              <option className="bg-white text-slate-900 font-bold" value="۲۰:۰۰">۲۰:۰۰ شب</option>
                              <option className="bg-white text-slate-900 font-bold" value="۲۲:۰۰">۲۲:۰۰ شب</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Guest Count Stepper */}
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between text-right">
                        <div className="space-y-0.5">
                          <label className="text-xs font-bold text-slate-800 block">تعداد بلیت و همراهان</label>
                          <p className="text-[10px] text-slate-500 font-medium">سقف خرید بلیت همزمان، ۱۰ نفر است.</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button 
                            type="button"
                            onClick={() => setBookingCount(Math.max(1, bookingCount - 1))}
                            className="w-9 h-9 rounded-xl bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-700 text-lg font-bold hover:bg-slate-300 transition-all cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-slate-900 text-base font-bold font-mono">
                            {toPersianDigits(bookingCount)}
                          </span>
                          <button 
                            type="button"
                            onClick={() => setBookingCount(Math.min(10, bookingCount + 1))}
                            className="w-9 h-9 rounded-xl bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-700 text-lg font-bold hover:bg-slate-300 transition-all cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Total Amount Panel */}
                      <div className="bg-blue-50 border border-blue-50 p-4 rounded-2xl flex items-center justify-between">
                        <div className="text-right">
                          <span className="text-[10px] font-bold text-slate-500">مجموع هزینه نهایی (با احتساب تخفیف ۱۵٪):</span>
                          <div className="flex items-baseline gap-1 mt-0.5">
                            <span className="text-xl font-bold text-blue-700 font-mono">
                              {toPersianDigits(Math.floor(selectedService.pricePerPerson * bookingCount * 0.85).toLocaleString())}
                            </span>
                            <span className="text-xs font-bold text-blue-700">تومان</span>
                          </div>
                        </div>
                        <div className="text-left">
                          <span className="text-[10px] font-medium text-slate-500 block">بدون نیاز به کارت شتاب</span>
                          <span className="text-[10px] font-bold text-blue-700">کسر مستقیم از کیف پول</span>
                        </div>
                      </div>

                      {/* Submit button */}
                      <button 
                        type="submit"
                        disabled={bookingIsLoading}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-sm py-4 rounded-2xl shadow-xl shadow-blue-500/15 hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
                      >
                        {bookingIsLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>در حال کسر وجه و صدور بلیط الکترونیک...</span>
                          </div>
                        ) : (
                          <>
                            <Ticket size={16} strokeWidth={2.5} />
                            <span>تایید نهایی و خرید بلیت مستقل</span>
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </div>

              </div>
            ) : (
              // STEP 2: VIP Ticket Mockup Visual
              <div className="p-8 sm:p-12 text-center space-y-8 max-w-2xl mx-auto bg-white rounded-[2.5rem]">
                <div className="space-y-2">
                  <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 border border-blue-50 animate-bounce">
                    <Check size={32} strokeWidth={3} />
                  </div>
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-50 px-4 py-1.5 rounded-full uppercase">
                    تراکنش موفقیت‌آمیز - بلیت صادر شد
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 font-sans">خرید بلیت با موفقیت انجام شد</h3>
                  <p className="text-slate-600 text-xs sm:text-sm font-medium">
                    مبلغ بلیت با موفقیت از کیف پول اعتباری شما کسر گردید. بلیت الکترونیکی زیر در لابی هتل دارای اعتبار قانونی است.
                  </p>
                </div>

                {/* Elegant Luxury Ticket Card */}
                <div className="relative rounded-[2rem] overflow-hidden bg-white text-slate-900 shadow-2xl p-6 sm:p-8 text-right border-2 border-slate-200">
                  {/* Watermark Logo */}
                  <div className="absolute right-4 bottom-4 text-[10rem] font-bold text-slate-100/45 select-none pointer-events-none z-0">
                    VIP
                  </div>

                  {/* Top Header of Ticket */}
                  <div className="relative z-10 flex items-center justify-between border-b-2 border-dashed border-slate-200 pb-4 mb-4">
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-slate-400 block">مرجع رزرو اختصاصی خدمات هتل</span>
                      <h4 className="text-base font-bold text-slate-900 mt-0.5">{selectedService.title}</h4>
                    </div>
                    <div className="text-left text-xs text-slate-400">
                      <span className="block font-medium">پلتفرم بزرگ اونجا</span>
                      <span className="font-mono text-[10px] font-bold text-blue-600">oonja.ir</span>
                    </div>
                  </div>

                  {/* Ticket Information */}
                  <div className="relative z-10 grid grid-cols-2 gap-4 text-xs sm:text-sm mb-6">
                    <div className="space-y-1">
                      <span className="text-slate-400 block text-[10px] font-bold">نام رزروکننده:</span>
                      <span className="font-bold text-slate-800">{bookingSuccessTicket.fullName}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-400 block text-[10px] font-bold">محل پذیرش و حضور:</span>
                      <span className="font-bold text-slate-800">{selectedService.location}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-400 block text-[10px] font-bold">تاریخ نوبت حضور:</span>
                      <span className="font-bold text-slate-800">{bookingSuccessTicket.date}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-400 block text-[10px] font-bold">ساعت حضور:</span>
                      <span className="font-bold text-slate-800">ساعت {bookingSuccessTicket.time}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-400 block text-[10px] font-bold">تعداد نفرات پذیرش:</span>
                      <span className="font-bold text-slate-800">{toPersianDigits(bookingSuccessTicket.guests)} نفر همراه</span>
                    </div>
                    <div className="space-y-1 col-span-1">
                      <span className="text-slate-400 block text-[10px] font-bold">کد رهگیری معتبر:</span>
                      <span className="font-mono font-bold text-blue-600 bg-blue-500/10 px-2.5 py-1 rounded-lg inline-block mt-1">
                        {bookingSuccessTicket.trackingCode}
                      </span>
                    </div>
                  </div>

                  {/* Ticket Tear-off & Barcode Section */}
                  <div className="relative z-10 border-t-2 border-dashed border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-right">
                      <span className="text-slate-400 block text-[10px] font-bold">وضعیت اعتبار:</span>
                      <span className="text-blue-600 font-bold text-xs flex items-center gap-1.5 bg-blue-600/10 px-3 py-1 rounded-full mt-1 w-max">
                        <Check size={12} strokeWidth={3} />
                        تایید شده - بدون نیاز به اقامت
                      </span>
                    </div>
                    {/* Simulated Barcode with SVG lines */}
                    <div className="flex flex-col items-center">
                      <svg className="w-48 h-10 text-slate-800" fill="currentColor" viewBox="0 0 100 20">
                        <rect x="2" width="2" height="20" />
                        <rect x="6" width="1" height="20" />
                        <rect x="9" width="3" height="20" />
                        <rect x="14" width="1" height="20" />
                        <rect x="17" width="2" height="20" />
                        <rect x="21" width="4" height="20" />
                        <rect x="27" width="1" height="20" />
                        <rect x="30" width="2" height="20" />
                        <rect x="34" width="3" height="20" />
                        <rect x="39" width="1" height="20" />
                        <rect x="42" width="2" height="20" />
                        <rect x="46" width="4" height="20" />
                        <rect x="52" width="1" height="20" />
                        <rect x="55" width="2" height="20" />
                        <rect x="59" width="3" height="20" />
                        <rect x="64" width="1" height="20" />
                        <rect x="67" width="2" height="20" />
                        <rect x="71" width="4" height="20" />
                        <rect x="77" width="1" height="20" />
                        <rect x="80" width="2" height="20" />
                        <rect x="84" width="3" height="20" />
                        <rect x="89" width="1" height="20" />
                        <rect x="92" width="2" height="20" />
                        <rect x="96" width="2" height="20" />
                      </svg>
                      <span className="font-mono text-[9px] text-slate-500 tracking-widest mt-1">
                        * {bookingSuccessTicket.trackingCode} *
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button 
                    onClick={() => {
                      window.alert("بلیت الکترونیکی شما به صورت PDF آماده دریافت است. کد رهگیری: " + bookingSuccessTicket.trackingCode);
                    }}
                    className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs sm:text-sm py-3.5 rounded-2xl shadow-md border border-slate-200 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <span>دانلود نسخه چاپی (PDF)</span>
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedService(null);
                    }}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-xs sm:text-sm py-3.5 rounded-2xl shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <span>اتمام و بازگشت به صفحه اصلی</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
