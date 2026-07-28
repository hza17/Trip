import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  MapPin, 
  Star, 
  User, 
  Image as ImageIcon, 
  Map, 
  ShieldCheck, 
  ChevronDown, 
  Check, 
  Clock, 
  Info, 
  Coffee, 
  Waves, 
  Dumbbell, 
  Flame, 
  Utensils, 
  Compass, 
  Sparkles, 
  Calendar, 
  Users, 
  ChevronRight, 
  Building,
  Heart,
  Share2,
  AlertCircle,
  Wifi,
  Car,
  AirVent,
  Tv,
  ShoppingBag,
  Eye,
  Ticket,
  X,
  ChevronLeft
} from "lucide-react";
import { cn, toPersianDigits } from "@/lib/utils";
import { getServicesDb, createServiceBooking, getCustomServices, CustomService } from "../lib/servicesStore";
import { BookingModal, ServiceInfo } from "./BookingModal";

interface DetailViewProps {
  onCheckout: () => void;
}

const galleryImages = [
  {
    url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
    title: "نمای بیرونی و لابی مجلل هتل اسپیناس پالاس"
  },
  {
    url: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
    title: "سوئیت پرزیدنتال لوکس - بخش نشیمن و جلسات"
  },
  {
    url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=800&auto=format&fit=crop",
    title: "سوئیت دبل استاندارد مدرن با دکوراسیون گرم"
  },
  {
    url: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=800&auto=format&fit=crop",
    title: "رستوران سنتی دیبا با طراحی اصیل ایرانی"
  },
  {
    url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
    title: "مجموعه سلامت، استخر و جکوزی رویال"
  },
  {
    url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop",
    title: "نمای شب هتل در بام بهرود سعادت‌آباد"
  },
  {
    url: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop",
    title: "استخر سرپوشیده و بخش تندرستی مروارید"
  },
  {
    url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop",
    title: "کافی‌شاپ و لابی بار سن‌ست با مناظر استثنایی"
  },
  {
    url: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=800&auto=format&fit=crop",
    title: "بوفه صبحانه گرم و سرد ملل هتل"
  }
];

export function DetailView({ onCheckout }: DetailViewProps) {
  const [hotelId, setHotelId] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("selected_hotel_id") || "espinas";
    }
    return "espinas";
  });

  const [dbVersion, setDbVersion] = useState(0);

  // Sync hotel selection and services database
  useEffect(() => {
    const handleSync = () => {
      const stored = localStorage.getItem("selected_hotel_id") || "espinas";
      setHotelId(stored);
      setCustomServices(getCustomServices());
      setDbVersion(v => v + 1);
    };
    window.addEventListener("storage", handleSync);
    window.addEventListener("storage_services_updated", handleSync);
    window.addEventListener("storage_custom_services_updated", handleSync);
    return () => {
      window.removeEventListener("storage", handleSync);
      window.removeEventListener("storage_services_updated", handleSync);
      window.removeEventListener("storage_custom_services_updated", handleSync);
    };
  }, []);

  const [activeSubTab, setActiveSubTab] = useState<"rooms" | "amenities">("rooms");
  const [showFloatingBar, setShowFloatingBar] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [sharingHotel, setSharingHotel] = useState<{
    id: string;
    name: string;
    stars: number;
    price: string;
    location: string;
    image: string;
    rating: string;
    desc: string;
  } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Scroll lock when lightbox is active
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null));
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % galleryImages.length : null));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowFloatingBar(true);
      } else {
        setShowFloatingBar(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // States for independent amenity booking
  const [selectedAmenity, setSelectedAmenity] = useState<string | null>(null);
  const [bookingDate, setBookingDate] = useState("۱۴۰۵/۰۴/۲۸");
  const [bookingTime, setBookingTime] = useState("۱۶:۰۰ الی ۲۰:۰۰ (سانس عصر)");
  const [bookingGuests, setBookingGuests] = useState(2);
  const [bookedAmenities, setBookedAmenities] = useState<string[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isReservation, setIsReservation] = useState(true);
  const [customServices, setCustomServices] = useState<CustomService[]>(() => getCustomServices());
  const [ticketDetails, setTicketDetails] = useState<{ dateStr: string; timeLabel: string; guests: number; totalCost: number } | null>(null);

  // States for smart itinerary planner
  const [tripDuration, setTripDuration] = useState<3 | 5>(3);
  const [activeDay, setActiveDay] = useState<number>(1);
  const [itinerarySelections, setItinerarySelections] = useState<Record<string, boolean>>({
    "tehran-diba": true,
    "tehran-spa": true,
    "tehran-milad": false,
    "tehran-tochal": true,
    "tehran-sunset": false,
  });

  // States for local attractions and entertainment
  const [stayDurationForAttractions, setStayDurationForAttractions] = useState<number>(3);
  const [selectedAttractionCategory, setSelectedAttractionCategory] = useState<string>("all");
  const [bookmarkedAttractions, setBookedAttractions] = useState<string[]>([]);
  const [expandedAttractionId, setExpandedAttractionId] = useState<string | null>(null);
  const [attractionNotification, setAttractionNotification] = useState<string | null>(null);

  const toggleAttractionBookmark = (id: string, title: string) => {
    setBookedAttractions(prev => {
      const isBookmarked = prev.includes(id);
      let updated;
      if (isBookmarked) {
        updated = prev.filter(x => x !== id);
        setAttractionNotification(`جاذبه «${title}» از برنامه سفر شما حذف شد.`);
      } else {
        updated = [...prev, id];
        setAttractionNotification(`جاذبه «${title}» با موفقیت به برنامه سفر شما اضافه شد!`);
      }
      return updated;
    });
  };

  useEffect(() => {
    if (attractionNotification) {
      const timer = setTimeout(() => {
        setAttractionNotification(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [attractionNotification]);

  const servicesDb = getServicesDb();
  const hotelData = servicesDb[hotelId] || servicesDb["espinas"];

  const amenitiesToBook = [
    {
      id: "restaurant",
      title: hotelData.restaurant.name,
      type: `رستوران (${hotelData.restaurant.cuisine})`,
      partner: "بخش غذا و نوشیدنی هتل",
      price: hotelData.restaurant.price || "۵۰,۰۰۰",
      originalPrice: null,
      rating: hotelData.restaurant.rating,
      icon: Utensils,
      features: [
        `آشپزی تخصصی: ${hotelData.restaurant.cuisine}`,
        `ساعت کاری فعال: ${hotelData.restaurant.hours}`,
        ...hotelData.restaurant.menu.slice(0, 2).map(dish => `منو: ${dish.name} - ${toPersianDigits(dish.price)} تومان`)
      ],
      duration: `بازه سرویس‌دهی: ${hotelData.restaurant.hours}`,
      isRestaurant: true,
      restaurantDetails: hotelData.restaurant
    },
    {
      id: "massage",
      title: hotelData.massage.name,
      type: hotelData.massage.type,
      partner: "کلینیک تخصصی اسپا و ماساژ هتل",
      price: hotelData.massage.price,
      originalPrice: "۹۵۰,۰۰۰",
      rating: hotelData.massage.rating,
      icon: Flame,
      features: hotelData.massage.features || [
        "ماساژ حرفه‌ای توسط تراپیست ماهر",
        "رایحه درمانی با اسانس‌های طبیعی"
      ],
      duration: `ساعت کار: ${hotelData.massage.hours}`
    },
    {
      id: "pool",
      title: hotelData.pool.name,
      type: hotelData.pool.type,
      partner: "دپارتمان سلامت و تندرستی هتل",
      price: hotelData.pool.price,
      originalPrice: "۴۵۰,۰۰۰",
      rating: hotelData.pool.rating,
      icon: Waves,
      features: hotelData.pool.features || [
        "استخر سرپوشیده تمیز و مدرن",
        "سونا خشک و بخار، جکوزی فعال"
      ],
      duration: `ساعت کار: ${hotelData.pool.hours}`
    },
    {
      id: "game",
      title: hotelData.game.name,
      type: hotelData.game.type,
      partner: "بخش تفریحات و سرگرمی هتل",
      price: hotelData.game.price,
      originalPrice: "۲۰۰,۰۰۰",
      rating: hotelData.game.rating,
      icon: Sparkles,
      features: hotelData.game.features || [
        "انواع بازی‌های رومیزی و کنسول",
        "کلوپ واقعیت مجازی نسل جدید"
      ],
      duration: `ساعت کار: ${hotelData.game.hours}`
    }
  ];

  const selectedServiceInfo: ServiceInfo | null = React.useMemo(() => {
    if (!selectedAmenity) return null;
    const std = amenitiesToBook.find(a => a.id === selectedAmenity);
    if (std) {
      return {
        id: std.id,
        title: std.title,
        category: std.type,
        location: hotelData.hotelName,
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=800',
        pricePerPerson: parseInt(std.price.replace(/,/g, '')),
      };
    }
    const cust = customServices.find(s => s.id === selectedAmenity);
    if (cust) {
      return {
        id: cust.id,
        title: cust.title,
        category: cust.category,
        location: cust.location || hotelData.hotelName,
        image: cust.image,
        pricePerPerson: cust.pricePerPerson,
      };
    }
    return null;
  }, [selectedAmenity, amenitiesToBook, customServices, hotelData]);

  const suggestedItineraryItems = {
    3: [
      { id: "tehran-diba", day: 1, time: "۱۳:۰۰", title: "صرف ناهار مجلل در رستوران دیبا", desc: "کباب شیشلیک مخصوص و برنج دودی ایرانی در فضایی اصیل", category: "غذا", partner: "رستوران دیبا" },
      { id: "tehran-spa", day: 1, time: "۱۷:۰۰", title: "آرامش در اسپا و استخر رویال هتل", desc: "بهترین زمان برای رفع خستگی سفر در جکوزی و سالن ماساژ", category: "تندرستی", partner: "مجموعه مروارید" },
      { id: "tehran-tochal", day: 2, time: "۰۹:۰۰", title: "گردش کوهستان و تله‌کابین توچال", desc: "بام تهران و دسترسی به هوای پاک البرز در مجاورت هتل", category: "سرگرمی", partner: "شرکت توسعه توچال" },
      { id: "tehran-sunset", day: 2, time: "۲۰:۳۰", title: "کافی‌شاپ سان‌ست و تماشای پایتخت", desc: "نوشیدن قهوه عالی همزمان با تماشای غروب بی‌نظیر تهران از تراس طبقه همکف", category: "غذا", partner: "سان‌ست لابی" },
      { id: "tehran-milad", day: 3, time: "۱۱:۰۰", title: "خرید و پیاده‌روی در مرکز خرید میلاد نور", desc: "مرکز خرید مدرن در شهرک غرب با برترین برندهای داخلی و خارجی", category: "گردشگری", partner: "پاساژ میلاد نور" },
    ],
    5: [
      { id: "tehran-diba", day: 1, time: "۱۳:۰۰", title: "صرف ناهار مجلل در رستوران دیبا", desc: "کباب شیشلیک مخصوص و برنج دودی ایرانی در فضایی اصیل", category: "غذا", partner: "رستوران دیبا" },
      { id: "tehran-spa", day: 1, time: "۱۷:۰۰", title: "آرامش در اسپا و استخر رویال هتل", desc: "بهترین زمان برای رفع خستگی سفر در جکوزی و سالن ماساژ", category: "تندرستی", partner: "مجموعه مروارید" },
      { id: "tehran-tochal", day: 2, time: "۰۹:۰۰", title: "گردش کوهستان و تله‌کابین توچال", desc: "بام تهران و دسترسی به هوای پاک البرز در مجاورت هتل", category: "سرگرمی", partner: "شرکت توسعه توچال" },
      { id: "tehran-sunset", day: 2, time: "۲۰:۳۰", title: "کافی‌شاپ سان‌ست و تماشای پایتخت", desc: "نوشیدن قهوه عالی همزمان با تماشای غروب بی‌نظیر تهران از تراس طبقه همکف", category: "غذا", partner: "سان‌ست لابی" },
      { id: "tehran-milad", day: 3, time: "۱۱:۰۰", title: "خرید و پیاده‌روی در مرکز خرید میلاد نور", desc: "مرکز خرید مدرن در شهرک غرب با برترین برندهای داخلی و خارجی", category: "گردشگری", partner: "پاساژ میلاد نور" },
      { id: "tehran-palace", day: 4, time: "۱۰:۰۰", title: "بازدید از مجموعه تاریخی سعدآباد", desc: "کاخ موزه‌های با شکوه دوران قاجار و پهلوی در دل چنارهای قدیمی شمیران", category: "تاریخی", partner: "سازمان میراث فرهنگی" },
      { id: "tehran-darband", day: 4, time: "۱۷:۳۰", title: "کوهپیمایی سبک و شام سنتی در دربند", desc: "مسیر سنگی، رودخانه روان و بوی ذغال و آلوچه‌های محلی", category: "سرگرمی", partner: "کلوپ دربند" },
      { id: "tehran-bridge", day: 5, time: "۱۹:۰۰", title: "پیاده‌روی روی پل طبیعت و پارک آب و آتش", desc: "شاهکار معماری معاصر ایران با نمای خیره‌کننده بزرگراه مدرس", category: "گردشگری", partner: "شهرداری تهران" }
    ]
  };

  const toggleItinerarySelection = (id: string) => {
    setItinerarySelections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleBookAmenity = (id: string) => {
    setSelectedAmenity(id);
    setShowConfirmModal(true);
  };

  const confirmAmenityBooking = () => {
    if (selectedAmenity) {
      let title = "";
      let price = 0;
      
      const selectedStandard = amenitiesToBook.find(a => a.id === selectedAmenity);
      if (selectedStandard) {
        title = selectedStandard.title;
        price = parseInt(selectedStandard.price.replace(/,/g, ''));
      } else {
        const selectedCustom = customServices.find(s => s.id === selectedAmenity);
        if (selectedCustom) {
          title = selectedCustom.title;
          price = selectedCustom.pricePerPerson;
        }
      }

      if (title) {
        createServiceBooking({
          hotelId,
          hotelName: hotelData.hotelName,
          serviceId: selectedAmenity,
          serviceTitle: title,
          date: isReservation ? bookingDate : "مراجعه بدون رزرو قبلی (بلیط آنی)",
          time: isReservation ? bookingTime : "بازه آزاد ساعات کاری",
          guests: bookingGuests,
          price: (price * bookingGuests).toLocaleString(),
          isReservation: isReservation
        });
        
        setBookedAmenities(prev => [...prev, selectedAmenity]);
        setShowConfirmModal(false);
        showToast(`خدمت «${title}» با موفقیت ثبت و به حساب کاربری متصل شد!`);
        setSelectedAmenity(null);
      }
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500 max-w-6xl mx-auto px-4 pt-32 pb-8 text-right" dir="rtl">
      
      {/* Alert if any amenities are booked independently */}
      {bookedAmenities.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-700/40 border-2 border-emerald-500/30 text-blue-700 dark:text-blue-400 p-5 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-lg animate-bounce-short">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 bg-emerald-500 text-white rounded-2xl flex items-center justify-center font-bold">✓</div>
            <div>
              <h4 className="font-bold text-sm">رزرو مستقل خدمات با موفقیت به پیش‌فاکتور شما افزوده شد!</h4>
              <p className="text-xs text-blue-700/80 dark:text-blue-400/80 mt-1">تعداد {bookedAmenities.length} خدمت انتخابی در داشبورد کاربری شما نیز قابل پیگیری و پرداخت است.</p>
            </div>
          </div>
          <button 
            onClick={onCheckout}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-3 rounded-2xl transition-all shadow-md self-end md:self-auto shrink-0"
          >
            تکمیل فرآیند و پرداخت نهایی
          </button>
        </div>
      )}

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-[2.5rem] p-6 shadow-xl shadow-slate-200/20 dark:shadow-black/20"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4 px-2">
          <div>
            <div className="flex items-center gap-3 mb-4 text-xs font-semibold">
              <span className="bg-blue-50/80 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 px-3 py-1.5 rounded-full border border-blue-200/50 dark:border-blue-800/50 flex items-center gap-1.5 shadow-sm">
                <ShieldCheck size={14} /> هتل ۵ ستاره لوکس
              </span>
              <span className="flex items-center gap-1.5 bg-blue-50/80 dark:bg-blue-700/30 text-blue-700 dark:text-blue-400 px-3 py-1.5 rounded-full border border-blue-50/50 dark:border-blue-700/50 shadow-sm">
                <Star size={14} className="fill-emerald-500 text-emerald-500" /> ۴.۸ امتیاز کاربران
              </span>
            </div>
            <h1 className="text-3xl font-bold text-slate-950 dark:text-white tracking-tight font-sans">{hotelData.hotelName}</h1>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-2.5 flex items-center gap-1.5">
              <MapPin size={16} className="text-slate-400" />
              تهران، سعادت آباد، میدان بهرود، خیابان ۳۳
            </p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <button onClick={() => {
              const el = document.getElementById('section-detail-proximity');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }} className="flex items-center gap-2 border border-slate-200/60 dark:border-slate-700/60 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 px-5 py-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm bg-white dark:bg-slate-900 shrink-0 hover:shadow-md hover:-translate-y-0.5">
              <Map size={16} className="text-slate-400" />
              مشاهده روی نقشه
            </button>
            <button onClick={() => {
              setSharingHotel({
                id: 'espinas',
                name: 'هتل بین‌المللی اسپیناس پالاس تهران',
                stars: 5,
                price: '۹,۹۲۰,۰۰۰',
                location: 'تهران، سعادت آباد، میدان بهرود، خیابان ۳۳',
                image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop',
                rating: '۴.۸ / ۵ (عالی)',
                desc: 'صبحانه بوفه رایگان، اینترنت نامحدود، استخر مجلل، ترانسفر فرودگاهی، اسپا'
              });
            }} className="flex items-center gap-2 border border-blue-200 dark:border-blue-900/50 text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 px-5 py-3 rounded-2xl hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all shadow-sm bg-white dark:bg-slate-900 shrink-0 hover:shadow-md hover:-translate-y-0.5">
              <Share2 size={16} className="text-blue-500" />
              اشتراک‌گذاری هتل
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-1 md:grid-rows-2 gap-2 md:gap-3 h-[250px] md:h-[450px] rounded-2xl md:rounded-[2rem] overflow-hidden font-semibold text-sm text-slate-400 dark:text-slate-500">
          <div 
            onClick={() => setLightboxIndex(0)} 
            className="col-span-1 md:col-span-2 row-span-1 md:row-span-2 relative group cursor-pointer overflow-hidden bg-slate-100 dark:bg-slate-800"
          >
            <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop')` }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            <div 
              className="absolute bottom-4 right-4 md:hidden bg-slate-900/80 backdrop-blur-md text-white flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(0);
              }}
            >
              <ImageIcon size={16} />
              <span>مشاهده همه ۴۵ تصویر</span>
            </div>
          </div>
          <div 
            onClick={() => setLightboxIndex(1)} 
            className="hidden md:block relative group cursor-pointer overflow-hidden bg-slate-100 dark:bg-slate-800"
          >
             <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop')` }}></div>
          </div>
          <div 
            onClick={() => setLightboxIndex(2)} 
            className="hidden md:block relative group cursor-pointer overflow-hidden bg-slate-100 dark:bg-slate-800"
          >
             <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=800&auto=format&fit=crop')` }}></div>
          </div>
          <div 
            onClick={() => setLightboxIndex(3)} 
            className="hidden md:block relative group cursor-pointer overflow-hidden bg-slate-100 dark:bg-slate-800"
          >
             <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=800&auto=format&fit=crop')` }}></div>
          </div>
          <div 
            onClick={() => setLightboxIndex(4)} 
            className="hidden md:flex bg-slate-900 text-white flex-col items-center justify-center cursor-pointer hover:bg-slate-800 transition-colors gap-2 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-blue-950/20 group-hover:bg-blue-850/40 transition-colors"></div>
            <ImageIcon size={24} className="z-10 text-blue-400" />
            <span className="z-10 font-bold">+۴۵ تصویر آلبوم</span>
          </div>
        </div>
      </motion.div>

      {/* Sticky Tab Navigation - Refactored into a high-end Multi-Tab interface */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 shadow-lg p-2.5 rounded-[2rem] mx-2 flex flex-col sm:flex-row justify-between items-center gap-4"
      >
        <div role="tablist" aria-label="منوهای جزئیات اقامتگاه" className="flex gap-2 w-full sm:w-auto overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <button 
            role="tab"
            aria-selected={activeSubTab === "rooms"}
            onClick={() => { setActiveSubTab("rooms"); }}
            className={cn(
              "px-6 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2",
              activeSubTab === "rooms" 
                ? "bg-slate-950 text-white dark:bg-white dark:text-slate-990 shadow-md" 
                : "text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            )}
          >
            <Building size={16} className={activeSubTab === "rooms" ? "text-blue-500" : "text-slate-400"} />
            <span>اتاق‌های هتل و سوئیت‌ها</span>
          </button>
          
          <button 
            role="tab"
            aria-selected={activeSubTab === "amenities"}
            onClick={() => { setActiveSubTab("amenities"); }}
            className={cn(
              "px-6 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 relative",
              activeSubTab === "amenities" 
                ? "bg-slate-950 text-white dark:bg-white dark:text-slate-990 shadow-md" 
                : "text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            )}
          >
            <Sparkles size={16} className={activeSubTab === "amenities" ? "text-amber-400" : "text-slate-400"} />
            <span>رزرو مستقل تفریحات و استخر</span>
            <span className="absolute -top-1 -left-1 bg-blue-500 text-white font-mono font-bold text-[9px] px-1.5 py-0.5 rounded-full animate-pulse">جدید</span>
          </button>
        </div>
        
        <div className="hidden lg:flex items-center gap-4 text-xs font-bold text-slate-400">
          <a href="#section-facilities-grid" className="hover:text-slate-900 dark:hover:text-white">تسهیلات کل</a>
          <span>•</span>
          <a href="#section-detail-reviews-list" className="hover:text-slate-900 dark:hover:text-white">نظرات مسافران</a>
          <span>•</span>
          <a href="#section-detail-policies" className="hover:text-slate-900 dark:hover:text-white">قوانین و مقررات</a>
        </div>
      </motion.div>

      {/* CORE VIEW 1: Standard Room Booking */}
      {activeSubTab === "rooms" && (
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Date & Guests Selection */}
          <div className="bg-slate-950 dark:bg-slate-900 border border-slate-800/50 rounded-3xl p-6 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-6 items-end relative overflow-hidden text-white mx-2">
              <div className="absolute -right-10 top-0 bottom-0 w-32 bg-blue-500/10 transform skew-x-12 pointer-events-none"></div>
              <div className="space-y-2 relative z-10">
                  <label className="text-xs text-slate-400 font-bold block">تاریخ ورود (Check-in)</label>
                  <div className="border border-slate-800/80 p-4 rounded-xl text-sm font-semibold text-white bg-slate-900/60 cursor-pointer flex justify-between hover:border-blue-500 transition-colors shadow-inner">
                      <span>جمعه، ۲۸ خرداد ۱۴۰۵</span>
                      <span className="text-blue-500">📅</span>
                  </div>
              </div>
              <div className="space-y-2 relative z-10">
                  <label className="text-xs text-slate-400 font-bold block">تاریخ خروج (Check-out)</label>
                  <div className="border border-slate-800/80 p-4 rounded-xl text-sm font-semibold text-white bg-slate-900/60 cursor-pointer flex justify-between hover:border-blue-500 transition-colors shadow-inner">
                      <span>یکشنبه، ۳۰ خرداد ۱۴۰۵</span>
                      <span className="text-blue-500">📅</span>
                  </div>
              </div>
              <div className="space-y-2 relative z-10">
                  <label className="text-xs text-slate-400 font-bold block">مسافران و اتاق‌ها</label>
                  <div className="border border-slate-800/80 p-4 rounded-xl text-sm font-semibold text-white bg-slate-900/60 cursor-pointer flex justify-between hover:border-blue-500 transition-colors shadow-inner">
                      <span>۲ بزرگسال، ۰ کودک (۱ اتاق)</span>
                      <span className="text-blue-500">👥</span>
                  </div>
              </div>
          </div>

          {/* Rooms List */}
          <div id="section-detail-rooms" className="space-y-6 mx-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white border-r-4 border-blue-500 pr-3">اتاق‌ها و سوئیت‌های موجود</h3>
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/20 dark:shadow-black/20">
              <div className="hidden md:grid grid-cols-12 bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200/50 dark:border-slate-800/50 text-xs font-semibold text-slate-500 dark:text-slate-400 p-5">
                <div className="col-span-5">مشخصات اتاق</div>
                <div className="col-span-3">خدمات و لغو رزرو</div>
                <div className="col-span-4 text-left pl-4">قیمت کل و رزرو</div>
              </div>
              
              <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {/* Room 1 */}
                <div className="grid grid-cols-1 md:grid-cols-12 p-6 gap-6 items-center text-sm font-semibold bg-white/50 dark:bg-slate-900/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors duration-300">
                    <div className="col-span-5 space-y-2">
                        <h4 className="font-bold text-slate-900 dark:text-white text-base">اتاق دبل استاندارد (رو به شهر)</h4>
                        <div className="text-slate-500 text-xs flex items-center gap-3 font-medium">
                            <span className="flex items-center gap-1"><Map size={12}/> ۲۴ متر مربع</span>
                            <span className="text-slate-300 dark:text-slate-700">|</span>
                            <span className="flex items-center gap-1">🛏 ۱ تخت کینگ</span>
                        </div>
                    </div>
                    <div className="col-span-3 space-y-3 text-xs">
                        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300"><Coffee size={14} className="text-blue-500"/> صبحانه بوفه رایگان</div>
                        <span className="bg-blue-50/80 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 px-3 py-1.5 rounded-lg border border-blue-200/50 dark:border-blue-800/50 flex items-center gap-1.5 w-fit shadow-sm text-[10px]">
                            <Check size={12}/> کنسلی رایگان تا ۴۸ ساعت
                        </span>
                    </div>
                    <div className="col-span-4 flex flex-col md:flex-row items-end md:items-center justify-between gap-4">
                        <div className="text-left w-full md:w-auto">
                            <div className="text-slate-400 text-xs font-medium mb-1">قیمت برای ۲ شب</div>
                            <div className="text-xl font-bold text-slate-950 dark:text-white font-sans tracking-tighter">۹,۹۲۰,۰۰۰ <span className="text-[10px] font-sans font-medium text-slate-500 tracking-normal">تومان</span></div>
                        </div>
                        <button onClick={onCheckout} className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3.5 rounded-2xl text-xs font-bold shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transition-all hover:-translate-y-0.5 whitespace-nowrap">
                          رزرو اتاق
                        </button>
                    </div>
                </div>

                {/* Room 2 */}
                <div className="grid grid-cols-1 md:grid-cols-12 p-6 gap-6 items-center text-sm font-semibold bg-white/50 dark:bg-slate-900/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors duration-300">
                    <div className="col-span-5 space-y-2">
                        <h4 className="font-bold text-slate-900 dark:text-white text-base font-bold">سوئیت جونیور مجلل (رو به کوهستان)</h4>
                        <div className="text-slate-500 text-xs flex items-center gap-3 font-medium">
                            <span className="flex items-center gap-1"><Map size={12}/> ۳۶ متر مربع</span>
                            <span className="text-slate-300 dark:text-slate-700">|</span>
                            <span className="flex items-center gap-1">🛏 ۲ تخت دبل</span>
                        </div>
                    </div>
                    <div className="col-span-3 space-y-3 text-xs">
                        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300"><Coffee size={14} className="text-blue-500"/> صبحانه بوفه و ترانسفر فرودگاهی</div>
                        <span className="bg-blue-50/80 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 px-3 py-1.5 rounded-lg border border-blue-200/50 dark:border-blue-800/50 flex items-center gap-1.5 w-fit shadow-sm text-[10px]">
                            <Check size={12}/> لغو غیرقابل استرداد (۱۵٪ تخفیف اعمال شده)
                        </span>
                    </div>
                    <div className="col-span-4 flex flex-col md:flex-row items-end md:items-center justify-between gap-4">
                        <div className="text-left w-full md:w-auto">
                            <div className="text-slate-400 text-xs font-medium mb-1">قیمت برای ۲ شب</div>
                            <div className="text-xl font-bold text-slate-950 dark:text-white font-sans tracking-tighter">۱۶,۴۰۰,۰۰۰ <span className="text-[10px] font-sans font-medium text-slate-500 tracking-normal">تومان</span></div>
                        </div>
                        <button onClick={onCheckout} className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3.5 rounded-2xl text-xs font-bold shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transition-all hover:-translate-y-0.5 whitespace-nowrap">
                          رزرو اتاق
                        </button>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* CORE VIEW 2: Independent Amenities Booking (Inspired by ResortPass) */}
      {activeSubTab === "amenities" && (
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="mx-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-3xl shadow-xl space-y-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 p-8 opacity-10 pointer-events-none transform -rotate-12 scale-150">
              <Compass size={140} />
            </div>
            <div className="max-w-2xl relative z-10">
              <span className="bg-white/20 text-white text-[10px] font-bold px-3.5 py-1.5 rounded-full border border-white/20 block w-fit mb-3">پکیج عبوری ترانزیت (Day Pass & Amenities)</span>
              <h2 className="text-2xl font-bold">حتی بدون اقامت شبانه، از لوکس‌ترین امکانات استفاده کنید!</h2>
              <p className="text-xs leading-relaxed opacity-90 mt-2.5 font-medium">
                ما معتقدیم تجربه تفریحی هتل‌های ۵ ستاره باید برای همه در دسترس باشد. با خرید پکیج‌های عبوری ترانزیت یا رزرو مستقیم میز رستوران، از استخر، باشگاه تندرستی، بوفه‌های صبحانه و پکیج‌های اسپا به صورت مستقل و بدون رزرو اتاق بهره‌مند شوید.
              </p>
            </div>
          </div>

          {/* Quick Date/Time Settings for Amenities */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-6 mx-2 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 font-semibold">
            <div>
              <label className="text-slate-500 dark:text-slate-400 text-xs block mb-2 font-bold">تاریخ رزرو تسهیلات:</label>
              <select 
                value={bookingDate} 
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full border border-slate-200 dark:border-slate-700 p-3.5 rounded-xl bg-white dark:bg-slate-950 text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500 transition-colors font-bold shadow-sm"
              >
                <option value="۱۴۰۵/۰۴/۲۸">جمعه، ۲۸ خرداد ۱۴۰۵</option>
                <option value="۱۴۰۵/۰۴/۲۹">شنبه، ۲۹ خرداد ۱۴۰۵</option>
                <option value="۱۴۰۵/۰۴/۳۰">یکشنبه، ۳۰ خرداد ۱۴۰۵</option>
              </select>
            </div>
            <div>
              <label className="text-slate-500 dark:text-slate-400 text-xs block mb-2 font-bold">انتخاب سانس یا بازه زمانی:</label>
              <select 
                value={bookingTime} 
                onChange={(e) => setBookingTime(e.target.value)}
                className="w-full border border-slate-200 dark:border-slate-700 p-3.5 rounded-xl bg-white dark:bg-slate-950 text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500 transition-colors font-bold shadow-sm"
              >
                <option value="۰۹:۰۰ الی ۱۳:۰۰ (سانس صبح)">۰۹:۰۰ الی ۱۳:۰۰ (سانس صبح)</option>
                <option value="۱۶:۰۰ الی ۲۰:۰۰ (سانس عصر)">۱۶:۰۰ الی ۲۰:۰۰ (سانس عصر)</option>
                <option value="۲۰:۰۰ الی ۲۳:۳۰ (سانس شب)">۲۰:۰۰ الی ۲۳:۳۰ (سانس شب)</option>
              </select>
            </div>
            <div>
              <label className="text-slate-500 dark:text-slate-400 text-xs block mb-2 font-bold">تعداد نفرات:</label>
              <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl justify-between shadow-sm">
                <button 
                  onClick={() => setBookingGuests(prev => Math.max(1, prev - 1))}
                  className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 font-bold hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center text-sm"
                >
                  -
                </button>
                <span className="font-mono text-sm font-bold text-slate-950 dark:text-white">{bookingGuests} نفر</span>
                <button 
                  onClick={() => setBookingGuests(prev => Math.min(10, prev + 1))}
                  className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 font-bold hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center text-sm"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Bookable Amenities Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-2">
            {amenitiesToBook.map((amenity) => {
              const Icon = amenity.icon;
              const isAlreadyBooked = bookedAmenities.includes(amenity.id);
              return (
                <div key={amenity.id} className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/40 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 shadow-inner">
                        <Icon size={24} />
                      </div>
                      <div className="text-left">
                        <span className="bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg text-[10px] text-slate-500 dark:text-slate-400 font-bold border border-slate-100 dark:border-slate-700">
                          ⭐ {amenity.rating}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-1.5">
                      <span className="text-blue-600 dark:text-blue-400 text-[10px] font-bold tracking-wider block">{amenity.type}</span>
                      <h4 className="font-bold text-slate-950 dark:text-white text-base font-sans">{amenity.title}</h4>
                      
                      {/* Owner Partnership Indicator */}
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 font-semibold bg-slate-50/50 dark:bg-slate-800/30 p-2 rounded-xl w-fit">
                        <Building size={12} className="text-slate-400" />
                        <span>دپارتمان ارائه‌دهنده:</span>
                        <span className="text-slate-600 dark:text-slate-300 font-bold">{amenity.partner}</span>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-800/50 pt-4 text-xs font-semibold space-y-2.5">
                      {amenity.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                          <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-slate-100 dark:border-slate-800/50 pt-5 mt-6 space-y-4">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-slate-400 font-medium">هزینه نهایی ({bookingGuests} نفر):</span>
                      <div className="text-right">
                        {amenity.originalPrice && (
                          <div className="text-slate-400 line-through text-[11px] font-sans tracking-tighter leading-none mb-1">{toPersianDigits((parseInt(amenity.originalPrice.replace(/,/g, '')) * bookingGuests).toLocaleString())} تومان</div>
                        )}
                        <div className="text-lg font-bold text-blue-600 dark:text-blue-400 font-sans tracking-tighter leading-none">
                          {toPersianDigits((parseInt(amenity.price.replace(/,/g, '')) * bookingGuests).toLocaleString())}{" "}
                          <span className="text-[10px] font-sans font-medium text-slate-500 tracking-normal">تومان</span>
                        </div>
                      </div>
                    </div>

                    {isAlreadyBooked ? (
                      <button className="w-full bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed text-xs font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2">
                        ✓ به پیش‌فاکتور افزوده شد
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleBookAmenity(amenity.id)}
                        className="w-full bg-slate-950 dark:bg-white text-white dark:text-slate-900 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white transition-all text-xs font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 transform hover:-translate-y-0.5 shadow-sm"
                      >
                        رزرو آنی خدمت بدون اقامت
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Custom Sub-services Section */}
          {customServices.filter(s => s.hotelId === hotelId).length > 0 && (
            <div className="space-y-6 pt-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 px-2 border-r-4 border-blue-600 pr-3">
                <div>
                  <span className="text-blue-600 text-[10px] font-bold tracking-wider block">زیرخدمات اختصاصی</span>
                  <h3 className="font-bold text-xl text-slate-950 dark:text-white font-sans mt-0.5">خدمات و پکیج‌های سفارشی پذیرنده (هتل‌دار)</h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium max-w-md text-slate-600 dark:text-slate-300">این خدمات به صورت اختصاصی توسط مدیریت هتل تعریف و پشتیبانی شده و قابل استفاده مستقل برای تمامی شهروندان و میهمانان گرامی است.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-2">
                {customServices.filter(s => s.hotelId === hotelId).map((service) => (
                  <CustomServiceCard 
                    key={service.id}
                    service={service}
                    bookingGuests={bookingGuests}
                    isAlreadyBooked={bookedAmenities.includes(service.id)}
                    onBook={handleBookAmenity}
                  />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* CORE VIEW 3: Smart Itinerary Planner (inspired by competitive foreign travel organizers) */}


      {/* Unified Facilities & Amenities Showcase Section */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        id="section-facilities-grid" 
        className="space-y-6 pt-4 mx-2"
      >
        <h3 className="text-lg font-bold text-slate-900 dark:text-white border-r-4 border-blue-500 pr-3">ویژگی‌ها، امکانات و خدمات کامل هتل</h3>
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-[2.5rem] p-6 md:p-8 shadow-xl shadow-slate-200/10 dark:shadow-black/10 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Category 1: Room Comforts */}
            <div className="bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200/40 dark:border-slate-800/40 rounded-3xl p-6 hover:shadow-lg hover:border-blue-500/20 dark:hover:border-blue-500/20 transition-all duration-300 flex flex-col h-full group">
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-200/60 dark:border-slate-800/60">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Tv size={20} className="stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">تسهیلات داخل اتاق‌ها</h4>
                  <span className="text-[9px] text-slate-400 font-bold block">امکانات رفاهی اختصاصی</span>
                </div>
              </div>
              <ul className="space-y-4 flex-1">
                {[
                  { label: "سیستم تهویه مطبوع هوشمند", desc: "چیلر مرکزی با کنترل دمای مجزا" },
                  { label: "تلویزیون هوشمند 4K", desc: "قابلیت اتصال به اینترنت و سرویس‌های پخش" },
                  { label: "چای‌ساز و قهوه‌ساز اختصاصی", desc: "همراه با پک خوش‌آمدگویی رایگان" },
                  { label: "صندوق امانات دیجیتال", desc: "سایز لپ‌تاپی با امنیت رمزگذاری شده" },
                  { label: "مینی‌بار مجهز و مینی‌فریج", desc: "تنوع نوشیدنی و تنقلات (طبق تعرفه)" },
                  { label: "سشوار و لوازم بهداشتی لوکس", desc: "ست کامل حوله و اقلام ارگانیک فرانسوی" },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 group/item">
                    <Check size={14} className="text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">{item.label}</span>
                      <span className="text-[9px] text-slate-400 dark:text-slate-500 font-medium block mt-0.5">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Category 2: Wellness & Sports */}
            <div className="bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200/40 dark:border-slate-800/40 rounded-3xl p-6 hover:shadow-lg hover:border-blue-500/20 dark:hover:border-blue-500/20 transition-all duration-300 flex flex-col h-full group">
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-200/60 dark:border-slate-800/60">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Waves size={20} className="stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">مجموعه ورزشی و تندرستی</h4>
                  <span className="text-[9px] text-slate-400 font-bold block">سلامت، اسپا و تفریح</span>
                </div>
              </div>
              <ul className="space-y-4 flex-1">
                {[
                  { label: "استخر سرپوشیده رویال", desc: "تصفیه با ازون بدون کلر زننده" },
                  { label: "سالن ماساژ و اسپا پیشرفته", desc: "درمان‌های تخصصی با کادر مجرب" },
                  { label: "جکوزی آب گرم و سونا", desc: "سونای خشک و بخار مجهز" },
                  { label: "باشگاه بدنسازی فوق‌مدرن", desc: "دستگاه‌های به‌روز هوازی و قدرتی" },
                  { label: "حمام سنتی ترکی و اسکراب", desc: "پاکسازی تخصصی پوست (نیاز به رزرو)" },
                  { label: "مجموعه هیدروتراپی زلال", desc: "آب‌درمانی تخصصی برای تسکین عضلات" },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 group/item">
                    <Check size={14} className="text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">{item.label}</span>
                      <span className="text-[9px] text-slate-400 dark:text-slate-500 font-medium block mt-0.5">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Category 3: Dining & Cafes */}
            <div className="bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200/40 dark:border-slate-800/40 rounded-3xl p-6 hover:shadow-lg hover:border-blue-500/20 dark:hover:border-blue-500/20 transition-all duration-300 flex flex-col h-full group">
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-200/60 dark:border-slate-800/60">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Coffee size={20} className="stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">رستوران‌ها و کافی‌شاپ‌ها</h4>
                  <span className="text-[9px] text-slate-400 font-bold block">طعم‌ها و تجارب غذایی ملل</span>
                </div>
              </div>
              <ul className="space-y-4 flex-1">
                {[
                  { label: "رستوران ایرانی دیبا", desc: "معماری سنتی اصیل و موسیقی زنده" },
                  { label: "رستوران مدرن لاتون", desc: "غذاهای ملل، ایتالیایی و بوفه صبحانه" },
                  { label: "کافی‌شاپ لانژ سان‌ست", desc: "چشم‌انداز پانورامای تهران و قهوه‌های تخصصی" },
                  { label: "بوفه صبحانه مجلل رایگان", desc: "بیش از ۶۰ مدل آیتم سرد و گرم روزانه" },
                  { label: "روم‌سرویس ۲۴ ساعته سریع", desc: "سفارش مستقیم غذا به سوئیت‌ها در هر ساعت" },
                  { label: "رستوران اسکای لانژ بام هتل", desc: "منظره بی‌نظیر از پایتخت در ارتفاع بالا" },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 group/item">
                    <Check size={14} className="text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">{item.label}</span>
                      <span className="text-[9px] text-slate-400 dark:text-slate-500 font-medium block mt-0.5">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Category 4: General & VIP Services */}
            <div className="bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200/40 dark:border-slate-800/40 rounded-3xl p-6 hover:shadow-lg hover:border-blue-500/20 dark:hover:border-blue-500/20 transition-all duration-300 flex flex-col h-full group">
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-200/60 dark:border-slate-800/60">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Building size={20} className="stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">خدمات عمومی و تجاری هتل</h4>
                  <span className="text-[9px] text-slate-400 font-bold block">پشتیبانی و تسهیلات میهمانان</span>
                </div>
              </div>
              <ul className="space-y-4 flex-1">
                {[
                  { label: "اینترنت پرسرعت Wi-Fi رایگان", desc: "پوشش سراسری در لابی، اتاق‌ها و مشاعات" },
                  { label: "پارکینگ سرپوشیده اختصاصی", desc: "فضای امن چندطبقه با ظرفیت بالا (رایگان)" },
                  { label: "پذیرش و خدمات بل‌بوی ۲۴ ساعته", desc: "ترخیص بار و پاسخگویی بی‌وقفه به مهمانان" },
                  { label: "ترانسفر فرودگاهی و تاکسی VIP", desc: "خودروهای لوکس مدرن با راننده مسلط به زبان" },
                  { label: "خشک‌شویی و لاندری اکسپرس", desc: "خدمات شستشو و اتوی سریع لباس‌ها" },
                  { label: "اتاق‌های همایش و سالن جلسات", desc: "فضای مجهز برای سمینارها و دیدارهای کاری" },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 group/item">
                    <Check size={14} className="text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">{item.label}</span>
                      <span className="text-[9px] text-slate-400 dark:text-slate-500 font-medium block mt-0.5">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </motion.div>

      {/* Premium Minimalist Scrolling Marquee Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="my-8 overflow-hidden relative py-4 bg-blue-500/[0.03] dark:bg-blue-500/[0.01] border-y border-blue-500/10 dark:border-blue-500/5 rounded-3xl mx-2"
      >
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee-smooth {
            animation: marquee 30s linear infinite;
          }
        `}</style>
        <div className="flex w-max gap-12 items-center animate-marquee-smooth" dir="ltr">
          {/* Double the list for seamless looping */}
          {Array(4).fill([
            "ضمانت بهترین نرخ رزرو آنلاین هتل",
            "پشتیبانی ۲۴ ساعته واقعی مهمانان",
            "کنسلی آسان و بدون جریمه تا ۴۸ ساعت قبل",
            "کافه بار و اسپا فوق‌مجلل اختصاصی",
            "ترانسفر فرودگاهی VIP با خودروهای لوکس",
            "صبحانه بوفه گرم و سرد کاملا رایگان"
          ]).flat().map((text, index) => (
            <div key={index} className="flex items-center gap-3.5 whitespace-nowrap" dir="rtl">
              <Sparkles size={14} className="text-blue-500 animate-pulse shrink-0" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 tracking-tight">{text}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Proximity Section */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        id="section-detail-proximity" 
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4 mx-2"
      >
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/40 hover:border-transparent dark:hover:border-transparent rounded-3xl p-8 shadow-sm space-y-6 transition-all duration-300">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white border-r-4 border-blue-500 pr-3">دسترسی محلی</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-right text-sm">
                    <thead className="text-slate-400 font-semibold border-b border-slate-200/50 dark:border-slate-700/50">
                        <tr>
                            <th className="pb-4 px-2">نام مرکز</th>
                            <th className="pb-4 px-2">مسافت</th>
                            <th className="pb-4 px-2">زمان با ماشین</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 font-medium text-slate-600 dark:text-slate-400 text-xs">
                        <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"><td className="py-4 px-2 font-bold text-slate-900 dark:text-white">فرودگاه مهرآباد</td><td className="py-4 px-2 font-mono">۱۵ km</td><td className="py-4 px-2 font-mono">۲۵ min</td></tr>
                        <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"><td className="py-4 px-2 font-bold text-slate-900 dark:text-white">مترو میدان صنعت</td><td className="py-4 px-2 font-mono">۳.5 km</td><td className="py-4 px-2 font-mono">۸ min</td></tr>
                        <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"><td className="py-4 px-2 font-bold text-slate-900 dark:text-white">مجموعه توچال</td><td className="py-4 px-2 font-mono">۷ km</td><td className="py-4 px-2 font-mono">۱۵ min</td></tr>
                        <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"><td className="py-4 px-2 font-bold text-slate-900 dark:text-white">مرکز خرید میلاد نور</td><td className="py-4 px-2 font-mono">۴ km</td><td className="py-4 px-2 font-mono">۱۰ min</td></tr>
                    </tbody>
                </table>
            </div>
        </div>

        {/* Schematic Map Representation */}
        <div className="bg-slate-50/80 dark:bg-slate-800/30 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/40 hover:border-transparent dark:hover:border-transparent rounded-3xl p-8 shadow-inner space-y-6 flex flex-col justify-between relative overflow-hidden transition-all duration-300">
            <div className="relative z-10">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white border-r-4 border-blue-500 pr-3 mb-3">موقعیت روی نقشه</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium leading-relaxed">
                    منطقه سعادت‌آباد تهران و در مجاورت میدان بهرود. دسترسی سریع به بزرگراه یادگار امام.
                </p>
            </div>
            <div className="border border-slate-300 dark:border-slate-700 rounded-[2rem] h-48 bg-white dark:bg-slate-900 flex flex-col justify-between p-4 relative overflow-hidden font-mono shadow-sm z-10">
                <div className="absolute inset-0 border-2 border-dashed border-slate-200 dark:border-slate-800 m-4 opacity-50 pointer-events-none rounded-[1.5rem]"></div>
                <div className="flex justify-between items-start text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
                    <span className="bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-slate-700">یادگار امام ──</span>
                    <span className="bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-slate-700">── پارک پرواز</span>
                </div>
                <div className="text-center z-10 relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-blue-500/20 rounded-full animate-ping"></div>
                    <span className="bg-slate-950 dark:bg-white text-white dark:text-slate-900 font-sans text-xs font-bold px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 justify-center mx-auto w-fit relative z-10 hover:scale-105 transition-transform cursor-pointer">
                        <MapPin size={14} className="text-blue-600 dark:text-blue-500"/> اسپیناس پالاس
                    </span>
                </div>
                <div className="flex justify-between items-end text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
                    <span className="bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-slate-700">میدان بهرود ○</span>
                    <span className="bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-slate-700">چمران ──</span>
                </div>
            </div>
        </div>
      </motion.div>

      {/* CUSTOMER REVIEWS */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        id="section-detail-reviews-list" 
        className="space-y-6 pt-4 mx-2"
      >
        <div className="flex justify-between items-center pb-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white border-r-4 border-blue-500 pr-3">نظرات مسافران</h3>
            <div className="text-xs font-semibold text-slate-500 bg-slate-50/80 dark:bg-slate-800/50 px-4 py-2 rounded-xl border border-slate-200/50 dark:border-slate-700/50">۱۲۰ نظر تایید شده</div>
        </div>

        {/* Integrated AI & User Rating Dashboard - Clean & Ultra-modern */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-[2.5rem] p-8 shadow-xl shadow-slate-100 dark:shadow-black/20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Right/First Column: Clean Ratings (lg-span-5) */}
            <div className="md:col-span-5 bg-slate-950 dark:bg-slate-900 text-white border border-slate-800 p-6 rounded-[2rem] text-sm font-semibold space-y-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none transform translate-x-4 -translate-y-4">
                    <Star size={120} />
                </div>
                <div className="relative z-10 text-center space-y-2">
                    <div className="text-5xl font-bold font-mono tracking-tighter text-blue-400">۴.۸ <span className="text-sm text-slate-500 font-sans">/ ۵</span></div>
                    <div className="flex justify-center gap-1 mt-1">
                        {[1,2,3,4,5].map(s => <Star key={s} size={14} className="fill-blue-400 text-blue-400" />)}
                    </div>
                    <p className="text-slate-400 text-[11px] font-medium pt-1">بر اساس ۱۲۰ تجربه واقعی مسافران</p>
                </div>
                <div className="space-y-4 border-t border-slate-800/50 pt-5 relative z-10">
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400 font-medium">پاکیزگی و نظافت:</span>
                        <div className="flex items-center gap-3">
                          <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div className="w-[98%] h-full bg-blue-500"></div>
                          </div>
                          <span className="font-mono text-[11px]">۴.۹</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400 font-medium">کیفیت غذا و خدمات:</span>
                        <div className="flex items-center gap-3">
                          <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div className="w-[95%] h-full bg-blue-500"></div>
                          </div>
                          <span className="font-mono text-[11px]">۴.۸</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400 font-medium">برخورد پرسنل:</span>
                        <div className="flex items-center gap-3">
                          <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div className="w-[90%] h-full bg-blue-500"></div>
                          </div>
                          <span className="font-mono text-[11px]">۴.۷</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Left/Second Column: AI Smart Summary (lg-span-7) */}
            <div className="md:col-span-7 space-y-4 text-right">
              <div className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-700 dark:text-blue-400 px-3.5 py-1.5 rounded-xl border border-blue-600/20 shadow-sm">
                <Sparkles size={16} className="text-blue-600 animate-pulse shrink-0" />
                <h4 className="text-xs font-bold">خلاصه‌سازی نظرات با هوش مصنوعی</h4>
                <span className="text-[9px] font-bold bg-blue-600/15 px-1.5 py-0.5 rounded border border-blue-600/25 font-sans">Gemini AI</span>
              </div>
              
              <div className="bg-slate-50/50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800 p-6 rounded-[2rem]">
                <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
                  هتل اسپیناس پالاس بر اساس <strong className="text-slate-900 dark:text-white">۱,۲۴۵ نظر اخیر</strong>، یک انتخاب فوق‌العاده برای سفرهای کاری و خانوادگی است. مسافران <strong className="text-blue-600 dark:text-blue-400">کیفیت صبحانه</strong>، <strong className="text-blue-600 dark:text-blue-400">چشم‌انداز شهر</strong> و <strong className="text-blue-600 dark:text-blue-400">برخورد پرسنل</strong> را بسیار تحسین کرده‌اند. تنها نکته قابل توجه برای برخی مسافران، فاصله نسبی از مرکز شهر در زمان ترافیک بوده است.
                </p>
              </div>
              
              <div className="flex items-center gap-3.5 text-[11px] text-slate-400 font-medium px-2">
                <span>تایید شده توسط اونجا</span>
                <span>•</span>
                <span>به‌روزرسانی هفتگی</span>
              </div>
            </div>

          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 mx-2"
      >
          {/* Policies */}
          <div id="section-detail-policies" className="bg-slate-50/80 dark:bg-slate-800/30 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-3xl p-8 shadow-inner space-y-6 text-sm font-semibold">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white border-r-4 border-blue-500 pr-3">قوانین هتل</h3>
            <div className="space-y-4 bg-white/80 dark:bg-slate-900/80 p-6 rounded-2xl shadow-sm border border-slate-100/50 dark:border-slate-700/50">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800/50 pb-4">
                    <span className="text-slate-500 dark:text-slate-400 text-xs font-medium">ساعت ورود (Check-in)</span>
                    <span className="text-slate-900 dark:text-white font-bold font-mono bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl">۱۴:۰۰</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                    <span className="text-slate-500 dark:text-slate-400 text-xs font-medium">ساعت خروج (Check-out)</span>
                    <span className="text-slate-900 dark:text-white font-bold font-mono bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl">۱۲:۰۰</span>
                </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed bg-white/80 dark:bg-slate-900/80 p-5 rounded-2xl border border-slate-100/50 dark:border-slate-700/50 flex items-start gap-3">
                <Info size={18} className="text-blue-600 shrink-0 mt-0.5" />
                <span>ارائه شناسنامه معتبر زوجین و کارت ملی در زمان ورود الزامی است. پذیرش صیغه‌نامه ممهور بلامانع است.</span>
            </p>
          </div>

          {/* FAQs Accordion */}
          <div id="section-detail-faq" className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-8 shadow-sm space-y-6 text-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white border-r-4 border-blue-500 pr-3">سوالات متداول (FAQ)</h3>
            <div className="border border-slate-200/50 dark:border-slate-700/50 rounded-2xl divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden shadow-sm">
                <div className="p-5 cursor-pointer hover:bg-slate-50/80 dark:hover:bg-slate-800/50 flex justify-between items-center transition-colors group bg-white/50 dark:bg-slate-900/50">
                    <span className="text-slate-800 dark:text-slate-200 text-xs font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">آیا هتل پارکینگ اختصاصی دارد؟</span>
                    <ChevronDown size={18} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                </div>
                <div className="p-5 bg-slate-50/50 dark:bg-slate-800/30 text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                    بله، پارکینگ سرپوشیده اختصاصی هتل با ظرفیت کامل برای مسافران مقیم به صورت کاملاً رایگان ارائه می‌شود.
                </div>
                <div className="p-5 cursor-pointer hover:bg-slate-50/80 dark:hover:bg-slate-800/50 flex justify-between items-center transition-colors group bg-white/50 dark:bg-slate-900/50">
                    <span className="text-slate-800 dark:text-slate-200 text-xs font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">ساعات کار رستوران و صبحانه چگونه است؟</span>
                    <ChevronDown size={18} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                </div>
            </div>
          </div>
      </motion.div>

      {/* CONFIRM BOOKING MODAL FOR AMENITY */}
      {showConfirmModal && selectedServiceInfo && (
        <BookingModal 
          service={selectedServiceInfo}
          onClose={() => setShowConfirmModal(false)}
          onSuccess={(details) => {
            setShowConfirmModal(false);
            setTicketDetails(details);
            confirmAmenityBooking();
          }}
        />
      )}

      {/* FLOATING ACTION BAR FOR HIGH CONVERSION RATE */}
      <div 
        className={cn(
          "fixed bottom-20 md:bottom-24 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-full md:max-w-3xl z-[998] transition-all duration-500 transform",
          showFloatingBar 
            ? "translate-y-0 opacity-100 scale-100 animate-in fade-in" 
            : "translate-y-20 opacity-0 scale-95 pointer-events-none"
        )}
      >
        <div className="bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-800/80 dark:border-slate-800 shadow-2xl p-4 md:p-5 rounded-[2rem] flex items-center justify-between gap-4 text-white">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <Sparkles size={20} className="animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-xs md:text-sm text-white">اسپیناس پالاس تهران</h4>
                <span className="bg-emerald-500/10 text-blue-400 text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  ظرفیت محدود
                </span>
              </div>
              <p className="text-[10px] md:text-xs text-slate-400 font-medium mt-1">
                تضمین بهترین نرخ اقامت • شروع از <span className="font-sans text-blue-400 font-bold tracking-tighter">۹,۹۲۰,۰۰۰</span> تومان
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col text-left pl-3 border-l border-slate-850">
              <span className="text-[9px] font-sans font-medium text-slate-400 uppercase tracking-wider text-right">قیمت پایه هر شب</span>
              <span className="text-sm md:text-base font-bold text-white tracking-tighter font-sans">۴,۹۶۰,۰۰۰ <span className="text-[10px] font-sans font-medium text-slate-400 tracking-normal">تومان</span></span>
            </div>
            
            <button 
              onClick={onCheckout}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-5 sm:px-8 py-3 rounded-2xl text-xs font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap flex items-center gap-2"
            >
              <span>رزرو نهایی اتاق</span>
              <ChevronRight size={14} className="rotate-180" />
            </button>
          </div>
        </div>
      </div>

      {/* IMAGE LIGHTBOX MODAL */}
      {lightboxIndex !== null && (
        <div role="dialog" aria-modal="true" aria-label="آلبوم تصاویر" className="fixed inset-0 z-[9999] flex flex-col justify-between bg-slate-950/98 backdrop-blur-xl text-white select-none" dir="rtl">
          {/* Top Bar */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-slate-950/80 backdrop-blur-md z-10">
            <div className="flex items-center gap-3">
              <ImageIcon size={18} className="text-blue-500" />
              <span className="font-bold text-xs md:text-sm text-slate-100">آلبوم تصاویر اسپیناس پالاس</span>
              <span className="text-xs bg-white/10 text-slate-300 px-2.5 py-1 rounded-full font-mono font-bold">
                {lightboxIndex + 1} / {galleryImages.length}
              </span>
            </div>
            <button 
              onClick={() => setLightboxIndex(null)}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all hover:scale-105 text-white cursor-pointer"
              aria-label="بستن"
            >
              <X size={20} />
            </button>
          </div>

          {/* Main Showcase */}
          <div 
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setLightboxIndex(null);
              }
            }}
            className="flex-1 relative flex items-center justify-center px-4 md:px-20 py-8 cursor-zoom-out"
          >
            {/* Navigation Buttons (Absolute) */}
            {/* Next/Right Button */}
            <button
              onClick={() => setLightboxIndex((prev) => (prev !== null ? (prev + 1) % galleryImages.length : null))}
              className="absolute right-4 md:right-8 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 flex items-center justify-center text-white transition-all hover:scale-110 cursor-pointer"
              title="تصویر بعدی"
              aria-label="تصویر بعدی"
            >
              <ChevronRight size={24} />
            </button>

            {/* Central Active Image Container */}
            <div 
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setLightboxIndex(null);
                }
              }}
              className="max-w-2xl md:max-w-3xl w-full flex flex-col items-center justify-center relative px-4 md:px-8 cursor-zoom-out"
            >
              <motion.img
                key={lightboxIndex}
                src={galleryImages[lightboxIndex].url}
                alt={galleryImages[lightboxIndex].title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="max-h-[45vh] md:max-h-[50vh] rounded-2xl object-contain shadow-2xl border border-white/10 mx-auto pointer-events-auto cursor-default"
                onClick={(e) => e.stopPropagation()}
              />
              
              <motion.p 
                key={`title-${lightboxIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-[11px] md:text-xs font-medium text-slate-300 mt-5 bg-black/40 px-6 py-2.5 rounded-full border border-white/5 backdrop-blur-sm max-w-xl pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {galleryImages[lightboxIndex].title}
              </motion.p>
            </div>

            {/* Previous/Left Button */}
            <button
              onClick={() => setLightboxIndex((prev) => (prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null))}
              className="absolute left-4 md:left-8 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 flex items-center justify-center text-white transition-all hover:scale-110 cursor-pointer"
              title="تصویر قبلی"
              aria-label="تصویر قبلی"
            >
              <ChevronLeft size={24} />
            </button>
          </div>

          {/* Bottom Thumbnails Strip */}
          <div className="px-6 py-4 bg-slate-950/90 border-t border-white/5 backdrop-blur-md z-10">
            <div className="max-w-3xl mx-auto flex gap-2 overflow-x-auto justify-start md:justify-center py-2 px-1 custom-scrollbar">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setLightboxIndex(idx)}
                  className={cn(
                    "relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 hover:scale-105",
                    lightboxIndex === idx ? "border-blue-500 scale-105" : "border-white/10 opacity-50 hover:opacity-100"
                  )}
                >
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* DetailView Toast Message */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2 bg-blue-50/90 dark:bg-blue-950/90 backdrop-blur-md p-4 rounded-2xl border border-blue-100/50 dark:border-blue-900/50 shadow-xl animate-in fade-in slide-in-from-top-4">
          <Share2 size={14} className="shrink-0 text-blue-500" />
          <span>{toastMessage}</span>
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
    </div>
  );
}

interface CustomServiceCardProps {
  key?: React.Key;
  service: CustomService;
  bookingGuests: number;
  isAlreadyBooked: boolean;
  onBook: (id: string) => void;
}

const CustomServiceCard: React.FC<CustomServiceCardProps> = ({ service, bookingGuests, isAlreadyBooked, onBook }) => {
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
                  <ChevronRight size={16} />
                </button>
                <button 
                  onClick={handleNextImg}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-opacity opacity-0 group-hover/carousel:opacity-100 z-10 cursor-pointer"
                >
                  <ChevronLeft size={16} />
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
                <Clock size={11} />
                ساعت کاری: {toPersianDigits(service.hours)}
              </span>
            )}
            {service.capacity && (
              <span className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800/30 px-2 py-1 rounded-lg">
                <Users size={11} />
                ظرفیت: {toPersianDigits(service.capacity.toString())} نفر
              </span>
            )}
          </div>
        </div>

        {/* Features */}
        {service.features && service.features.length > 0 && (
          <div className="border-t border-slate-100 dark:border-slate-800/50 pt-3 text-xs font-semibold space-y-1.5">
            {service.features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                <Check size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        )}
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
            {service.ctaText || "رزرو آنی خدمت بدون اقامت"}
          </button>
        )}
      </div>
    </div>
  );
}
