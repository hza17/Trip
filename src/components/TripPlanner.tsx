import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Compass, 
  MapPin, 
  Calendar, 
  Clock, 
  Sparkles, 
  Utensils, 
  Camera, 
  Coffee, 
  DollarSign, 
  ChevronRight, 
  CheckCircle, 
  Printer, 
  Briefcase, 
  ArrowLeft, 
  Check, 
  ArrowRight,
  Save,
  Info,
  Heart,
  HelpCircle,
  Share2,
  ListTodo,
  TrendingUp,
  Sliders,
  Building2,
  Star,
  ShieldCheck,
  Ticket,
  User,
  Phone,
  Waves,
  Car,
  Plus,
  Minus,
  Eye,
  RefreshCw,
  X,
  Layers,
  Award
} from "lucide-react";
import { toPersianDigits } from "@/lib/utils";
// @ts-ignore
import travelBannerImg from "../assets/images/travel_banner_iran_1783959669095.jpg";

// --- Types ---
export interface Activity {
  id: string;
  time: string;
  title: string;
  desc: string;
  type: "sightseeing" | "food" | "relaxing" | "activity";
  cost: number;
  tip?: string;
  location?: string;
}

export interface DayPlan {
  dayNumber: number;
  theme: string;
  activities: Activity[];
}

export interface HotelOption {
  id: string;
  name: string;
  stars: number;
  rating: number;
  reviewsCount: number;
  pricePerNight: number;
  totalPrice: number;
  image: string;
  location: string;
  badge: string;
  amenities: string[];
  roomType: string;
}

export interface RestaurantOption {
  id: string;
  name: string;
  category: "traditional" | "cafe_lounge" | "international" | "seafood";
  categoryLabel: string;
  rating: number;
  pricePerPerson: number;
  specialtyDish: string;
  image: string;
  address: string;
  badge: string;
  timeSlot: string;
}

export interface AncillaryOption {
  id: string;
  title: string;
  category: "transfer" | "tour" | "wellness" | "vip" | "insurance" | "car_rental";
  desc: string;
  price: number;
  unit: string;
  badge: string;
}

// --- Hotels Data Generator ---
export const getHotelsForCity = (city: string, daysCount: number, budget: "economy" | "balanced" | "luxury"): HotelOption[] => {
  const multiplier = budget === "luxury" ? 1.5 : budget === "economy" ? 0.7 : 1.0;
  
  if (city === "شیراز") {
    return [
      {
        id: "sh-h-1",
        name: "هتل ۵ ستاره بزرگ شیراز (بام دروازه قرآن)",
        stars: 5,
        rating: 4.9,
        reviewsCount: 328,
        pricePerNight: Math.round(3200000 * multiplier),
        totalPrice: Math.round(3200000 * multiplier * daysCount),
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop",
        location: "جنب دروازه قرآن، شیراز",
        badge: "پیشنهاد ممتاز هوش مصنوعی",
        amenities: ["صبحانه بوفه رایگان", "استخر و اسپا VIP", "وای‌فای رایگان", "ترانسفر فرودگاهی"],
        roomType: "سوئیت دبل رویال با چشم‌انداز شهر"
      },
      {
        id: "sh-h-2",
        name: "هتل بوتیک و اقامتگاه سنتی درب شازده",
        stars: 4,
        rating: 4.8,
        reviewsCount: 194,
        pricePerNight: Math.round(2400000 * multiplier),
        totalPrice: Math.round(2400000 * multiplier * daysCount),
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600&auto=format&fit=crop",
        location: "بافت تاریخی، گذر شاهچراغ",
        badge: "اصالت معماری قاجار",
        amenities: ["حیاط گودال‌باغچه", "شربت‌خانه سنتی", "اینترنت پرسرعت", "صبحانه محلی"],
        roomType: "اتاق ۲ تخته شاه‌نشین آینه‌کاری"
      },
      {
        id: "sh-h-3",
        name: "هتل ۴ ستاره بین‌المللی پارسیان شیراز",
        stars: 4,
        rating: 4.6,
        reviewsCount: 142,
        pricePerNight: Math.round(1800000 * multiplier),
        totalPrice: Math.round(1800000 * multiplier * daysCount),
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=600&auto=format&fit=crop",
        location: "خیابان زند، دسترسی عالی به بازار",
        badge: "مقرون‌به‌صرفه و مرکزی",
        amenities: ["صبحانه رایگان", "پارکینگ اختصاصی", "کافه سنتی", "رستوران ملل"],
        roomType: "اتاق ۲ تخته استاندارد کینگ"
      }
    ];
  } else if (city === "اصفهان") {
    return [
      {
        id: "is-h-1",
        name: "هتل ۵ ستاره عباسی اصفهان (کهن‌ترین هتل جهان)",
        stars: 5,
        rating: 4.9,
        reviewsCount: 480,
        pricePerNight: Math.round(3800000 * multiplier),
        totalPrice: Math.round(3800000 * multiplier * daysCount),
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop",
        location: "خیابان آمادگاه، اصفهان",
        badge: "شاهکار معمارانه صفوی",
        amenities: ["باغ باستانی اختصاصی", "چای‌خانه سنتی", "استخر و جکوزی", "صبحانه بوفه فاخر"],
        roomType: "سوئیت صفوی رو به باغ فیروزه‌ای"
      },
      {
        id: "is-h-2",
        name: "هتل ۵ ستاره کوثر اصفهان (حاشیه زاینده‌رود)",
        stars: 5,
        rating: 4.8,
        reviewsCount: 260,
        pricePerNight: Math.round(3100000 * multiplier),
        totalPrice: Math.round(3100000 * multiplier * daysCount),
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600&auto=format&fit=crop",
        location: "پلوور سی‌وسه‌پل، اصفهان",
        badge: "دیدنی‌ترین ویو پل خواجو",
        amenities: ["استخر روباز چهارفصل", "باشگاه بدنسازی", "رستوران ایتالیایی", "اینترنت رایگان"],
        roomType: "اتاق دبل لوکس رو به رودخانه"
      },
      {
        id: "is-h-3",
        name: "اقامتگاه سنتی قصر منشی اصفهان",
        stars: 4,
        rating: 4.7,
        reviewsCount: 175,
        pricePerNight: Math.round(2200000 * multiplier),
        totalPrice: Math.round(2200000 * multiplier * daysCount),
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=600&auto=format&fit=crop",
        location: "محله تاریخی قصر منشی",
        badge: "صمیمانه و سنتی",
        amenities: ["حمام قاجاری اختصاصی", "شربت‌های بومی", "صبحانه خانگی", "وای‌فای"],
        roomType: "اتاق ۲ تخته حوض‌خانه"
      }
    ];
  } else if (city === "تهران") {
    return [
      {
        id: "te-h-1",
        name: "هتل ۵ ستاره بزرگ اسپیناس پالاس (بام تهران)",
        stars: 5,
        rating: 4.9,
        reviewsCount: 512,
        pricePerNight: Math.round(4500000 * multiplier),
        totalPrice: Math.round(4500000 * multiplier * daysCount),
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop",
        location: "سعادت‌آباد، بام تهران",
        badge: "لوکس‌ترین هتل ایران",
        amenities: ["رستوران ۳۶۰ درجه", "اسپا و ماساژ VIP", "سالن بدنسازی", "خدمات CIP"],
        roomType: "سوئیت رویال پالاس رو به کوهستان"
      },
      {
        id: "te-h-2",
        name: "هتل ۵ ستاره پارسیان استقلال تهران",
        stars: 5,
        rating: 4.7,
        reviewsCount: 310,
        pricePerNight: Math.round(3200000 * multiplier),
        totalPrice: Math.round(3200000 * multiplier * daysCount),
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600&auto=format&fit=crop",
        location: "بزرگراه چمران، تقاطع ولیعصر",
        badge: "نوستالژیک و پرطرفدار",
        amenities: ["زمین تنیس", "استخر سرپوشیده", "رستوران فرنسوی", "وای‌فای رایگان"],
        roomType: "اتاق ۲ تخته برج غربی"
      },
      {
        id: "te-h-3",
        name: "هتل ۴ ستاره اسکان الوند تهران",
        stars: 4,
        rating: 4.6,
        reviewsCount: 180,
        pricePerNight: Math.round(2100000 * multiplier),
        totalPrice: Math.round(2100000 * multiplier * daysCount),
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=600&auto=format&fit=crop",
        location: "میدان ونک، خیابان الوند",
        badge: "دسترسی عالی تجاری",
        amenities: ["کافه روف‌گاردن", "صبحانه رایگان", "سونا و جکوزی", "پارکینگ"],
        roomType: "اتاق دبل کینگ لوکس"
      }
    ];
  } else {
    return [
      {
        id: `gen-h-1-${city}`,
        name: `هتل ۵ ستاره بین‌المللی ${city}`,
        stars: 5,
        rating: 4.8,
        reviewsCount: 220,
        pricePerNight: Math.round(2800000 * multiplier),
        totalPrice: Math.round(2800000 * multiplier * daysCount),
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop",
        location: `مرکز شهر ${city}`,
        badge: "بهترین انتخاب کاربران",
        amenities: ["صبحانه بوفه رایگان", "استخر و اسپا", "وای‌فای پرسرعت", "رستوران مرکزی"],
        roomType: "اتاق ۲ تخته رویال"
      },
      {
        id: `gen-h-2-${city}`,
        name: `اقامتگاه سنتی و بوتیک‌هتل ${city}`,
        stars: 4,
        rating: 4.7,
        reviewsCount: 145,
        pricePerNight: Math.round(1900000 * multiplier),
        totalPrice: Math.round(1900000 * multiplier * daysCount),
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600&auto=format&fit=crop",
        location: `بافت تاریخی ${city}`,
        badge: "معماری بومی و اصیل",
        amenities: ["حیاط سنتی باصفا", "چای‌خانه و شربت", "صبحانه بومی", "اینترنت"],
        roomType: "اتاق ۲ تخته VIP سنتی"
      },
      {
        id: `gen-h-3-${city}`,
        name: `هتل ۴ ستاره پارسیان ${city}`,
        stars: 4,
        rating: 4.5,
        reviewsCount: 110,
        pricePerNight: Math.round(1500000 * multiplier),
        totalPrice: Math.round(1500000 * multiplier * daysCount),
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=600&auto=format&fit=crop",
        location: `خیابان اصلی ${city}`,
        badge: "اقتصادی و باکیفیت",
        amenities: ["صبحانه رایگان", "پارکینگ", "رستوران", "خدمات روم‌سرویس"],
        roomType: "اتاق دبل استاندارد"
      }
    ];
  }
};

// --- Restaurants Generator ---
export const getRestaurantsForCity = (city: string): RestaurantOption[] => {
  if (city === "شیراز") {
    return [
      {
        id: "sh-r-1",
        name: "رستوران سنتی لوتوس",
        category: "traditional",
        categoryLabel: "رستوران سنتی و اصیل",
        rating: 4.9,
        pricePerPerson: 380000,
        specialtyDish: "کلم‌پلو شیرازی با سالاد شیرازی و آبغوره محلی",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop",
        address: "نزدیکی محوطه تاریخی پرسپولیس و تخت جمشید",
        badge: "محبوب‌ترین طعم اصیل",
        timeSlot: "ناهار ساعت ۱۳:۳۰"
      },
      {
        id: "sh-r-2",
        name: "خانه سنتی و رستوران پرهامی",
        category: "traditional",
        categoryLabel: "بوتیک رستوران تاریخی",
        rating: 4.8,
        pricePerPerson: 320000,
        specialtyDish: "دیزی محلی و دمپختک آغشته به عطر بهارنارنج",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600&auto=format&fit=crop",
        address: "بافت تاریخی شیراز، روبروی مسجد جامع عتیق",
        badge: "تجربه در حیاط سنتی",
        timeSlot: "شام ساعت ۲۰:۳۰"
      },
      {
        id: "sh-r-3",
        name: "سرای مهر بازار وکیل",
        category: "traditional",
        categoryLabel: "رستوران در بازار باستانی",
        rating: 4.7,
        pricePerPerson: 290000,
        specialtyDish: "کباب کوبیده مخصوص شیرازی و شربت عرقیات",
        image: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?q=80&w=600&auto=format&fit=crop",
        address: "دالان اصلی بازار وکیل شیراز",
        badge: "حوض فیروزه‌ای قاجاری",
        timeSlot: "ناهار ساعت ۱۴:۰۰"
      },
      {
        id: "sh-r-4",
        name: "کافه و لانژ باغ عمارت شاپوری",
        category: "cafe_lounge",
        categoryLabel: "کافه و لانژ در باغ تاریخی",
        rating: 4.9,
        pricePerPerson: 250000,
        specialtyDish: "فالوده شیرازی با لیموترش تازه و عرقیات گیاهی",
        image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=600&auto=format&fit=crop",
        address: "خیابان انوری، عمارت شاپوری",
        badge: "عکاسی و عصرانه VIP",
        timeSlot: "عصرانه ساعت ۱۸:۰۰"
      }
    ];
  } else if (city === "اصفهان") {
    return [
      {
        id: "is-r-1",
        name: "بریانی اعظم اصفهان",
        category: "traditional",
        categoryLabel: "اصیل‌ترین بریانی ایران",
        rating: 4.9,
        pricePerPerson: 350000,
        specialtyDish: "بریانی لذیذ زعفرانی با نان سنگک داغ و نعنا",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop",
        address: "خیابان کمال اسماعیل، اصفهان",
        badge: "غذای شماره ۱ اصفهان",
        timeSlot: "ناهار ساعت ۱۳:۰۰"
      },
      {
        id: "is-r-2",
        name: "رستوران تاریخی خوان‌گستر جلفا",
        category: "traditional",
        categoryLabel: "رستوران فاخر ایرانی",
        rating: 4.8,
        pricePerPerson: 450000,
        specialtyDish: "چلوکباب بره مخصوص و خورشت ماست اصفهانی",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600&auto=format&fit=crop",
        address: "محله تاریخی جلفا، اصفهان",
        badge: "بهترین خورشت ماست",
        timeSlot: "شام ساعت ۲۱:۰۰"
      },
      {
        id: "is-r-3",
        name: "رستوران مجلل شهرزاد",
        category: "international",
        categoryLabel: "دکوراسیون قاجار و ملل",
        rating: 4.9,
        pricePerPerson: 550000,
        specialtyDish: "کباب برگ گوسفندی و باقلاپلو با گوشت گردن",
        image: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?q=80&w=600&auto=format&fit=crop",
        address: "خیابان چهارباغ عباسی، اصفهان",
        badge: "شیشه‌کاری‌های ارسی",
        timeSlot: "شام ساعت ۲۰:۳۰"
      },
      {
        id: "is-r-4",
        name: "کافه شربت‌خانه فیروز جلفا",
        category: "cafe_lounge",
        categoryLabel: "کافه شربت‌خانه قدیمی",
        rating: 4.8,
        pricePerPerson: 180000,
        specialtyDish: "شربت بهارنارنج زعفرانی و گلاچه ارمنی",
        image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=600&auto=format&fit=crop",
        address: "میدان جلفا، اصفهان",
        badge: "فضای نوستالژیک دنج",
        timeSlot: "عصرانه ساعت ۱۷:۳۰"
      }
    ];
  } else {
    return [
      {
        id: `gen-r-1-${city}`,
        name: `رستوران سنتی و اصیل ${city}`,
        category: "traditional",
        categoryLabel: "غذاهای بومی محلی",
        rating: 4.8,
        pricePerPerson: 320000,
        specialtyDish: `غذای سنتی بومی ${city} و کباب‌های محلی`,
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop",
        address: `بافت مرکزی شهر ${city}`,
        badge: "پرفروش‌ترین غذاخوری",
        timeSlot: "ناهار ساعت ۱۳:۳۰"
      },
      {
        id: `gen-r-2-${city}`,
        name: `کافه روف‌گاردن و لانژ ${city}`,
        category: "cafe_lounge",
        categoryLabel: "کافه با چشم‌انداز مرتفع",
        rating: 4.7,
        pricePerPerson: 220000,
        specialtyDish: "قهوه اسپرسو تخصصی، کیک روز و دمنوش",
        image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=600&auto=format&fit=crop",
        address: `بام شهری ${city}`,
        badge: "ویوی ۳۶۰ درجه",
        timeSlot: "عصرانه ساعت ۱۸:۰۰"
      },
      {
        id: `gen-r-3-${city}`,
        name: `رستوران مدرن و بین‌المللی ${city}`,
        category: "international",
        categoryLabel: "غذاهای فرنگی و کباب",
        rating: 4.6,
        pricePerPerson: 420000,
        specialtyDish: "استیک بره، استیک مرغ و سالاد سزار",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600&auto=format&fit=crop",
        address: `خیابان اصلی ${city}`,
        badge: "فضای شیک مدرن",
        timeSlot: "شام ساعت ۲۱:۰۰"
      }
    ];
  }
};

// --- Ancillary Services Generator ---
export const getAncillaryServicesForCity = (city: string): AncillaryOption[] => {
  return [
    {
      id: "anc-transfer",
      title: "ترانسفر فرودگاهی و VIP اختصاصی",
      category: "transfer",
      desc: "استقبال در فرودگاه/ترمینال با خودروی تشریفاتی و راننده مجرب تا درب هتل",
      price: 450000,
      unit: "رفت و برگشت گروهی",
      badge: "توصیه هوش مصنوعی"
    },
    {
      id: "anc-tour",
      title: "راهنمای تور اختصاصی بومی",
      category: "tour",
      desc: "نیم‌روز همراهی تورلیدر کارآزموده با مجوز میراث فرهنگی جهت توضیحات تخصصی جاذبه‌ها",
      price: 850000,
      unit: "نیم‌روز اختصاصی",
      badge: "تجربه غنی‌تر"
    },
    {
      id: "anc-spa",
      title: "پکیج اسپا و ماساژ ریلکسیشن هتل",
      category: "wellness",
      desc: "۱ ساعت ماساژ تخصصی سنگ داغ، سونای خشک و بخار جهت رفع خستگی راه سفر",
      price: 750000,
      unit: "برای هر نفر",
      badge: "آرامش کامل"
    },
    {
      id: "anc-cip",
      title: "تشریفات اختصاصی CIP جایگاه فرودگاه",
      category: "vip",
      desc: "استراحت در سالن تشریفات CIP، پذیرایی لایت و تحویل سریع بار بدون ایستادن در صف",
      price: 1200000,
      unit: "ورودی مسافر",
      badge: "سطح ممتاز VIP"
    },
    {
      id: "anc-insurance",
      title: "بیمه جامع سفر و پشتیبانی پزشکی ۲۴/۷",
      category: "insurance",
      desc: "پوشش حوادث غیرمترقبه، درمان فوری سرپایی و پشتیبانی تلفنی شبانه‌روزی",
      price: 180000,
      unit: "کل مدت سفر",
      badge: "امنیت خاطر"
    },
    {
      id: "anc-car",
      title: "کرایه خودرو بدون راننده (تحویل در اقامتگاه)",
      category: "car_rental",
      desc: "تحویل ۲۰۶ یا شاسی‌بلند بیمه کامل جهت تردد آزادانه در سطح شهر و اطراف",
      price: 1800000,
      unit: "به ازای هر روز",
      badge: "آزادی مسیر"
    }
  ];
};


export interface Itinerary {
  id: string;
  city: string;
  durationDays: number;
  style: string; // cultural, adventure, relaxing
  budgetType: "economy" | "balanced" | "luxury";
  days: DayPlan[];
  packingList: string[];
  tips: string[];
}

// --- Hardcoded Database of curated itineraries ---
const itineraries: Itinerary[] = [
  // --- SHIRAZ CULTURAL ---
  {
    id: "shiraz-cultural-3",
    city: "شیراز",
    durationDays: 3,
    style: "cultural",
    budgetType: "balanced",
    packingList: ["کفش پیاده‌روی راحت", "کلاه آفتاب‌گیر و عینک", "کرم ضدآفتاب", "دوربین عکاسی", "دفترچه خاطرات سفر"],
    tips: [
      "بهترین زمان بازدید از مسجد صورتی (نصیرالملک) ساعت ۸ تا ۱۰ صبح برای دیدن رقص نور شیشه‌های رنگی است.",
      "فالوده شیرازی اصل را حتماً در پشت ارگ کریم‌خان یا مغازه‌های نزدیک به آرامگاه حافظ امتحان کنید.",
      "برای گشت و گذار در پرسپولیس و پاسارگاد حداقل یک نیم‌روز کامل زمان بگذارید و لباس نخی خنک بپوشید."
    ],
    days: [
      {
        dayNumber: 1,
        theme: "شکوه هخامنشی و بهشت شاعران",
        activities: [
          {
            id: "sh-1-1",
            time: "۰۸:۰۰ - ۱۲:۳۰",
            title: "تخت جمشید (پرسپولیس)",
            desc: "بازدید از پایتخت باشکوه امپراتوری هخامنشی، کاخ آپادانا، کاخ تچر و دروازه ملل.",
            type: "sightseeing",
            cost: 100000,
            tip: "پیشنهاد می‌کنیم یک راهنمای محلی مجرب استخدام کنید تا داستان سنگ‌نگاره‌ها را بشنوید.",
            location: "مرودشت، ۵۰ کیلومتری شمال شیراز"
          },
          {
            id: "sh-1-2",
            time: "۱۳:۰۰ - ۱۴:۳۰",
            title: "ناهار سنتی در رستوران سنتی لوتوس مرودشت",
            desc: "چشیدن طعم کلم‌پلو شیرازی اصیل به همراه سالاد شیرازی ناب با آبغوره محلی.",
            type: "food",
            cost: 280000,
            location: "نزدیکی محوطه تخت جمشید"
          },
          {
            id: "sh-1-3",
            time: "۱۵:۳۰ - ۱۸:۰۰",
            title: "مجموعه تاریخی پاسارگاد",
            desc: "زیارت آرامگاه ساده اما با ابهت کوروش بزرگ، بنیان‌گذار حقوق بشر دنیا.",
            type: "sightseeing",
            cost: 100000,
            tip: "فاصله پاسارگاد تا تخت جمشید حدود ۱ ساعت رانندگی است. حتماً آب آشامیدنی همراه داشته باشید."
          },
          {
            id: "sh-1-4",
            time: "۱۹:۳۰ - ۲۲:۰۰",
            title: "شب‌نشینی و غزل‌خوانی در حافظیه",
            desc: "قدم زدن در باغ زیبای حافظیه زیر نور ملایم شبانه و تفأل به دیوان خواجه شمس‌الدین حافظ شیرازی.",
            type: "relaxing",
            cost: 50000,
            tip: "فضای معنوی و جادویی حافظیه در شب با پخش موسیقی سنتی ایرانی کامل می‌شود."
          }
        ]
      },
      {
        dayNumber: 2,
        theme: "رنگ‌، عطر و اصالت زندیه",
        activities: [
          {
            id: "sh-2-1",
            time: "۰۷:۴۵ - ۰۹:۳۰",
            title: "مسجد صورتی (نصیرالملک)",
            desc: "تماشای باشکوه‌ترین شاهکار کاشی‌کاری قاجار و رقص نور خورشید در شبستان مسجد.",
            type: "sightseeing",
            cost: 80000,
            tip: "حتماً عکس‌های یادگاری زیبایی در زوایای مختلف بگیرید. نور قبل از ساعت ۹ بهترین حالت را دارد."
          },
          {
            id: "sh-2-2",
            time: "۱۰:۰۰ - ۱۳:۰۰",
            title: "ارگ کریم‌خان و بازار وکیل",
            desc: "گشت و گذار در ارگ آجری باشکوه زندیه و سپس خرید عرقیات گیاهی، مسقطی لارستان و پارچه‌های عشایری در دالان‌های خنک بازار وکیل.",
            type: "activity",
            cost: 60000,
            tip: "ارگ کریم‌خان دارای یک حمام سنتی زیبا است که دیدن آن را نباید از دست داد."
          },
          {
            id: "sh-2-3",
            time: "۱۳:۱۵ - ۱۴:۴۵",
            title: "ناهار سنتی در سرای مهر بازار وکیل",
            desc: "میل کردن کباب کوبیده مخصوص شیرازی یا دیزی سنتی در دل فضایی تاریخی و پر از آرامش با حوض فیروزه‌ای.",
            type: "food",
            cost: 320000,
            location: "دالان بازار وکیل"
          },
          {
            id: "sh-2-4",
            time: "۱۶:۰۰ - ۱۸:۳۰",
            title: "باغ ارم شیراز",
            desc: "قدم زدن در یکی از زیباترین باغ‌های ایرانی ثبت جهانی یونسکو، میان درختان سرو سر به فلک کشیده و بوی بهارنارنج.",
            type: "relaxing",
            cost: 80000,
            tip: "عمارت مرکزی باغ با کاشی‌کاری‌های قاجاری داستان‌های شاهنامه را روایت می‌کند."
          },
          {
            id: "sh-2-5",
            time: "۱۹:۳۰ - ۲۱:۳۰",
            title: "آرامگاه سعدی (sعدیه)",
            desc: "ادای احترام به استاد سخن سعدی شیرازی و بازدید از حوض ماهی سنتی و معماری زیبای آرامگاه.",
            type: "relaxing",
            cost: 50000
          }
        ]
      },
      {
        dayNumber: 3,
        theme: "طبیعت کویری و عمارت‌های اشرافی",
        activities: [
          {
            id: "sh-3-1",
            time: "۰۸:۳۰ - ۱۱:۳۰",
            title: "سفر به دریاچه صورتی مهارلو",
            desc: "تماشای چشم‌انداز باورنکردنی دریاچه مهارلو که به دلیل فعالیت باکتری‌های خاص در این فصل به رنگ صورتی روشن درآمده است.",
            type: "sightseeing",
            cost: 0,
            tip: "کفش مناسب بپوشید زیرا بخش‌های حاشیه دریاچه بسیار نمکی و چسبنده هستند."
          },
          {
            id: "sh-3-2",
            time: "۱۲:۱۵ - ۱۴:۰۰",
            title: "خانه زینت‌الملوک و نارنجستان قوام",
            desc: "بازدید از عمارت با شکوه قاجار با گچ‌بری‌ها، آینه‌کاری‌های خیره‌کننده و موزه تندیس‌های مومی مشاهیر فارس.",
            type: "sightseeing",
            cost: 100000,
            tip: "این دو عمارت قاجاری از طریق یک تونل زیرزمینی به هم متصل هستند که امروزه موزه است."
          },
          {
            id: "sh-3-3",
            time: "۱۴:۱۵ - ۱۵:۴۵",
            title: "ناهار در خانه سنتی پرهامی",
            desc: "تجربه‌ای کاملاً خودمانی در یک خانه قدیمی و سنتی با سرو غذاها در ظروف رویی قدیمی.",
            type: "food",
            cost: 290000,
            location: "بافت تاریخی شیراز، روبروی مسجد جامع عتیق"
          },
          {
            id: "sh-3-4",
            time: "۱۶:۳۰ - ۱۹:۰۰",
            title: "کافه‌گردی و گشت بافت تاریخی",
            desc: "پیاده‌روی آرامش‌بخش در کوچه‌پس‌کوچه‌های کاه‌گلی محله قدیمی سنگ سیاه و صرف شربت‌های گیاهی خنک در بوتیک‌کافه‌های بافت تاریخی.",
            type: "relaxing",
            cost: 120000
          }
        ]
      }
    ]
  },

  // --- TEHRAN ADVENTURE ---
  {
    id: "tehran-adventure-2",
    city: "تهران",
    durationDays: 2,
    style: "adventure",
    budgetType: "economy",
    packingList: ["کفش کوهنوردی سبک", "لباس گرم یا بادگیر مناسب ارتفاعات", "باتوم کوهنوردی", "کوله پشتی یک‌روزه", "کارت شناسایی"],
    tips: [
      "تله‌کابین توچال معمولاً در روزهای آخر هفته بسیار شلوغ است. اگر امکان دارد گشت خود را در روزهای وسط هفته برنامه‌ریزی کنید.",
      "مجموعه تفریحی دریاچه چیتگر در شب‌ها نسیم خنکی دارد و تفریحات هیجانی مانند رولر کاستر در آن مستقر است."
    ],
    days: [
      {
        dayNumber: 1,
        theme: "فتح ارتفاعات البرز و دره سنگی",
        activities: [
          {
            id: "te-1-1",
            time: "۰۷:۰۰ - ۱۲:۰۰",
            title: "کوهپیمایی در مسیر زیبای دربند تا پناهگاه شیرپلا",
            desc: "شروع ورزش صبحگاهی از میدان سربند، صعود از صخره‌های مسیر به همراه صرف صبحانه سنتی (نیمرو و املت مشتی) در رستوران‌های ییلاقی حاشیه رودخانه.",
            type: "activity",
            cost: 150000,
            tip: "کفش ورزشی با عاج مناسب بپوشید زیرا بخش‌هایی از مسیر صخره‌ای و لغزنده است."
          },
          {
            id: "te-1-2",
            time: "۱۲:۳۰ - ۱۴:۰۰",
            title: "ناهار کوهستانی در باغ‌رستوران‌های درکه",
            desc: "میل کردن جوجه‌کباب هیزمی یا کباب ترش عالی در فضای باصفا و صدای دلنشین رودخانه درکه.",
            type: "food",
            cost: 240000
          },
          {
            id: "te-1-3",
            time: "۱۵:۰۰ - ۱۸:۰۰",
            title: "تله‌کابین توچال (ایستگاه ۵)",
            desc: "سوار شدن بر یکی از طولانی‌ترین خطوط تله‌کابین آسیا و صعود به ارتفاعات البرز برای تماشای کلان‌شهر تهران غرق در ابرها.",
            type: "activity",
            cost: 350000,
            tip: "در ایستگاه ۵ یا ۷ حتی در فصل تابستان هوا بسیار سرد است. حتماً یک بادگیر همراه داشته باشید."
          },
          {
            id: "te-1-4",
            time: "۱۹:۳۰ - ۲۲:۳۰",
            title: "پل طبیعت و پارک آب و آتش",
            desc: "پیاده‌روی روی شاهکار معماری معاصر پل طبیعت و تماشای بزرگراه‌های پایتخت در شب و صرف شام سبک در فودکورت پل طبیعت.",
            type: "relaxing",
            cost: 180000
          }
        ]
      },
      {
        dayNumber: 2,
        theme: "هیجان غرب تهران و چشم‌انداز پایتخت",
        activities: [
          {
            id: "te-2-1",
            time: "۰۹:۰۰ - ۱۲:۳۰",
            title: "تفریحات هیجانی دریاچه چیتگر",
            desc: "دوچرخه‌سواری به دور دریاچه، تجربه هیجان زیپ‌لاین، هرم هیجان (سینمای شش‌بعدی معلق) و قایق‌سواری.",
            type: "activity",
            cost: 250000
          },
          {
            id: "te-2-2",
            time: "۱۳:۰۰ - ۱۴:۳۰",
            title: "ناهار در مرکز خرید بام‌لند",
            desc: "صرف ناهار با چشم‌انداز فوق‌العاده دریاچه چیتگر در یکی از رستوران‌های شیک و مدرن بین‌المللی.",
            type: "food",
            cost: 350000
          },
          {
            id: "te-2-3",
            time: "۱۵:۳۰ - ۱۸:۳۰",
            title: "کارتینگ آزادی و سورتمه تهران",
            desc: "تجربه سرعت بالا در پیست کارتینگ آزادی که از استانداردهای بین‌المللی برخوردار است، یا پرواز روی ریل‌های سورتمه‌سواری دربند.",
            type: "activity",
            cost: 300000
          },
          {
            id: "te-2-4",
            time: "۱۹:۳۰ - ۲۲:۰۰",
            title: "برج میلاد تهران",
            desc: "بازدید از ششمین برج بلند مخابراتی جهان، ایستادن در سکوی دید باز در ارتفاع ۲۸۰ متری و تماشای غروب جادویی و چراغ‌های روشن شهر.",
            type: "sightseeing",
            cost: 150000
          }
        ]
      }
    ]
  },

  // --- ISFAHAN CULTURAL ---
  {
    id: "isfahan-cultural-3",
    city: "اصفهان",
    durationDays: 3,
    style: "cultural",
    budgetType: "luxury",
    packingList: ["عینک آفتابی", "سایه‌بان", "شارژر همراه و دوربین", "صندل خنک", "یک شال سبک برای عکاسی"],
    tips: [
      "حتماً بریانی اصفهان را ظهرها میل کنید زیرا غذای بسیار سنگینی است و معمولاً شب‌ها سرو نمی‌شود.",
      "کلیسای وانک در جلفا بلیط ورودی جداگانه دارد و عکاسی حرفه‌ای با فلاش داخل آن ممنوع است."
    ],
    days: [
      {
        dayNumber: 1,
        theme: "نقش جهان؛ نگین فیروزه‌ای شرق",
        activities: [
          {
            id: "is-1-1",
            time: "۰۸:۳۰ - ۱۲:۳۰",
            title: "میدان نقش جهان و عمارات پیرامونی",
            desc: "گشت و گذار در میدان تاریخی باشکوه، کاخ عالی‌قاپو با تالار موسیقی افسانه‌ای، مسجد تاریخی امام با کاشی‌کاری‌های هفت‌رنگ جادویی و مسجد شیک و اختصاصی شیخ لطف‌الله بدون مناره.",
            type: "sightseeing",
            cost: 200000,
            tip: "در کاخ عالی‌قاپو به طبقات بالا بروید تا بهترین زاویه عکاسی از کل میدان نقش جهان را داشته باشید."
          },
          {
            id: "is-1-2",
            time: "۱۳:۰۰ - ۱۴:۳۰",
            title: "تجربه ناهار بریانی اصفهان در بریانی اعظم",
            desc: "صرف معروف‌ترین غذای سنتی اصفهان (بریانی لذیذ به همراه گوشت، جگر سفید، نعنا و نان سنگک داغ کنجدی).",
            type: "food",
            cost: 350000,
            location: "خیابان کمال اسماعیل"
          },
          {
            id: "is-1-3",
            time: "۱۵:۳۰ - ۱۸:۰۰",
            title: "بازار قیصریه و خرید صنایع دستی",
            desc: "تماشای هنرمندان مس‌گر، قلم‌زن، میناکار و خاتم‌ساز در دالان‌های باشکوه بازار قیصریه و تهیه گز اصفهان و پولکی اصل زعفرانی.",
            type: "activity",
            cost: 500000,
            tip: "برای خرید گز، برندهای معتبری همچون کرمانی، مظفری یا سکه کیفیت عالی و تضمین‌شده‌ای دارند."
          },
          {
            id: "is-1-4",
            time: "۱۹:۰۰ - ۲۱:۳۰",
            title: "شب‌گردی در سی‌وسه‌پل و پل خواجو",
            desc: "پیاده‌روی روی پل‌های باستانی زاینده‌رود و گوش سپردن به آوازخوانی‌های سنتی و خودجوش جوانان اصفهانی در زیر دهانه‌های طاق‌دار پل خواجو.",
            type: "relaxing",
            cost: 0
          }
        ]
      },
      {
        dayNumber: 2,
        theme: "شکوه چهل ستون و کوچه پس کوچه‌های ارامنه جلفا",
        activities: [
          {
            id: "is-2-1",
            time: "۰۹:۰۰ - ۱۱:۳۰",
            title: "کاخ باغ چهل‌ستون",
            desc: "بازدید از عمارت شکوهمند شاه عباس با ۲۰ ستون چوبی که انعکاس آن‌ها روی استخر بزرگ مقابل، چهل ستون جادویی را پدید می‌آورد.",
            type: "sightseeing",
            cost: 100000,
            tip: "دیوارنگاره‌های داخل کاخ چهل‌ستون با روکش طلا داستان‌های بزم و رزم شاهان صفوی را بازگو می‌کنند."
          },
          {
            id: "is-2-2",
            time: "۱۲:۰۰ - ۱۴:۳۰",
            title: "کلیسای جامع وانک و موزه جلفا",
            desc: "بازدید از کلیسای تاریخی ارامنه با نقاشی‌های خیره‌کننده دیواری از بهشت و جهنم و موزه تخصصی ارزشمند جلفا.",
            type: "sightseeing",
            cost: 120000,
            location: "محله جلفا"
          },
          {
            id: "is-2-3",
            time: "۱۴:۴۵ - ۱۶:۱۵",
            title: "ناهار در رستوران سنتی خوان‌گستر جلفا",
            desc: "سرو بهترین کباب‌ها و غذاهای باکیفیت ایرانی در دل بافت آرام و سنگ‌فرش شده محله جلفا.",
            type: "food",
            cost: 450000
          },
          {
            id: "is-2-4",
            time: "۱۶:۳۰ - ۱۹:۰۰",
            title: "کافه‌گردی در میدان جلفا",
            desc: "قدم زدن در محله زیبای جلفا با معماری اروپایی-ایرانی جذاب و صرف قهوه اسپرسو عالی همراه با کیک غازی در کافه‌های دنج جلفا.",
            type: "relaxing",
            cost: 150000
          }
        ]
      },
      {
        dayNumber: 3,
        theme: "کاخ هشت بهشت و منارجنبان مرموز",
        activities: [
          {
            id: "is-3-1",
            time: "۰۹:۰۰ - ۱۱:۰۰",
            title: "کاخ هشت‌بهشت",
            desc: "بازدید از کاخ تفریحی بسیار زیبای اواخر دوره صفوی که در میان پارک سرسبز شهید رجایی واقع شده است.",
            type: "sightseeing",
            cost: 80000
          },
          {
            id: "is-3-2",
            time: "۱۱:۳۰ - ۱۳:۰۰",
            title: "منارجنبان و کوه آتشگاه",
            desc: "مشاهده شگفتی معماری تکان خوردن مناره‌های خشتی بدون ریزش و گشت و گذار در تپه‌های باستانی زرتشتی آتشگاه.",
            type: "sightseeing",
            cost: 100000
          },
          {
            id: "is-3-3",
            time: "۱۳:۳۰ - ۱۵:۰۰",
            title: "ناهار در رستوران شهرزاد اصفهان",
            desc: "مجلل‌ترین و اصیل‌ترین رستوران اصفهان با دکوراسیون شیشه‌کاری‌های قاجاری رنگارنگ و کباب‌های کم‌نظیر.",
            type: "food",
            cost: 550000
          }
        ]
      }
    ]
  }
];

// Fallback generator for other combinations so the app never fails!
const generateItinerary = (city: string, style: string, duration: number, budget: "economy" | "balanced" | "luxury"): Itinerary => {
  // Let's see if we have a direct match
  const match = itineraries.find(it => it.city === city && it.style === style && it.durationDays === duration);
  if (match) return match;

  // Otherwise, construct a custom beautiful plan
  const styleLabel = style === "cultural" ? "فرهنگی و تاریخی" : style === "adventure" ? "طبیعت‌گردی و هیجان" : "آرامش‌بخش و خرید";
  const budgetLabel = budget === "economy" ? "مقرون‌به‌صرفه" : budget === "balanced" ? "متعادل" : "لوکس و ویژه";

  const packingList = [
    "کارت ملی و مدارک محرمیت جهت هتل",
    "کفش پیاده‌روی راحت و مناسب",
    "پاوربانک و کابل شارژ موبایل",
    "کلاه آفتاب‌گیر و عینک مناسب",
    "جعبه کمک‌های اولیه کوچک شخصی"
  ];

  const tips = [
    `این سفر ویژه برای سلیقه شما با سبک ${styleLabel} در شهر ${city} سازماندهی شده است.`,
    "پیشنهاد می‌کنیم بلیط جاذبه‌های شلوغ را اوایل صبح تهیه کنید تا در صف نمانید.",
    "در اکثر بازارهای سنتی این شهر، چانه‌زنی بخش جدایی‌ناپذیر خرید است!"
  ];

  const days: DayPlan[] = Array.from({ length: duration }).map((_, i) => {
    const dayNum = i + 1;
    let theme = "";
    let acts: Activity[] = [];

    if (dayNum === 1) {
      theme = "کشف جاذبه‌های شاخص و آشنایی با اتمسفر شهر";
      acts = [
        {
          id: `gen-${dayNum}-1`,
          time: "۰۹:۰۰ - ۱۲:۳۰",
          title: `بازدید از جاذبه نمادین و کهن ${city}`,
          desc: "شروع فوق‌العاده سفر با گشت و گذار در قلب تپنده شهر و آشنایی با معماری و بافت تاریخی.",
          type: "sightseeing",
          cost: budget === "economy" ? 50000 : budget === "balanced" ? 100000 : 220000
        },
        {
          id: `gen-${dayNum}-2`,
          time: "۱۳:۰۰ - ۱۴:۳۰",
          title: `ناهار سنتی و طعم بومی اصیل`,
          desc: `صرف غذا در یکی از بهترین رستوران‌های سنتی و معروف شهر به همراه سالاد و نوشیدنی‌های محلی.`,
          type: "food",
          cost: budget === "economy" ? 180000 : budget === "balanced" ? 300000 : 580000
        },
        {
          id: `gen-${dayNum}-3`,
          time: "۱۵:۳۰ - ۱۸:۳۰",
          title: style === "adventure" ? "کشف فضاهای بکر و ماجراجویی محلی" : "قدم زدن در بازار قدیمی و عکاسی",
          desc: style === "adventure" 
            ? "پیاده‌روی و صعود به بام‌های دیدنی و ارتفاعات مشرف به پهنه شهری."
            : "بازدید از راسته بازارهای قدیمی، استشمام عطر ادویه‌ها و خرید یادگاری‌های ماندگار.",
          type: style === "adventure" ? "activity" : "relaxing",
          cost: budget === "economy" ? 40000 : budget === "balanced" ? 120000 : 350000
        },
        {
          id: `gen-${dayNum}-4`,
          time: "۱۹:۳۰ - ۲۲:۰۰",
          title: "شب‌نشینی در پاتوق‌های دنج محلی",
          desc: "تماشای نورپردازی‌های زیبای شبانه روی پل‌ها یا میادین اصلی شهر همگام با نوای موسیقی زنده خیابانی.",
          type: "relaxing",
          cost: 50000
        }
      ];
    } else if (dayNum === 2) {
      theme = style === "adventure" ? "کشف طبیعت وحش و آدرنالین خالص" : "سفر در زمان؛ عمارت‌های باشکوه و کافه‌های هنری";
      acts = [
        {
          id: `gen-${dayNum}-1`,
          time: "۰۸:۳۰ - ۱۲:۰۰",
          title: style === "adventure" ? "گشت آفرود یا پیاده‌روی در دشت" : "بازدید از زیباترین عمارت یا باغ ثبت یونسکو",
          desc: style === "adventure"
            ? "حرکت به سوی رمل‌های کویری یا دره‌های صخره‌ای سرسبز پیرامون شهر."
            : "تماشای بازی نور روی شیشه‌های رنگی و گچ‌بری‌های بی‌نظیر عمارت‌های اشرافی تاریخی.",
          type: "sightseeing",
          cost: budget === "economy" ? 60000 : budget === "balanced" ? 150000 : 400000
        },
        {
          id: `gen-${dayNum}-2`,
          time: "۱۲:۳۰ - ۱۴:۰۰",
          title: "تجربه ناهار در یک خانه قدیمی (بوتیک‌رستوران)",
          desc: "سرو باکیفیت‌ترین کباب‌ها یا دیزی‌های سنتی در فضای گودال‌باغچه‌ای باصفا زیر سایه درختان انار.",
          type: "food",
          cost: budget === "economy" ? 220000 : budget === "balanced" ? 380000 : 650000
        },
        {
          id: `gen-${dayNum}-3`,
          time: "۱۵:۰۰ - ۱۸:۰۰",
          title: "موزه تخصصی و گالری‌های هنری بومی",
          desc: "آشنایی با آداب و سنن، صنایع دستی منحصر‌به‌فرد مینیاتور، قالی‌بافی و سفال‌گری این مرز و بوم.",
          type: "activity",
          cost: budget === "economy" ? 40000 : budget === "balanced" ? 90000 : 200000
        },
        {
          id: `gen-${dayNum}-4`,
          time: "۱۹:۳۰ - ۲۲:۰۰",
          title: "چای آتشی و غزل‌خوانی",
          desc: "سپری کردن شب در آرامش مطلق با بوی مطبوع کاه‌گل و نوشیدن دمنوش‌های گیاهی سنتی عطرآگین.",
          type: "relaxing",
          cost: 80000
        }
      ];
    } else {
      theme = "روایت پایانی؛ چشم‌انداز مدرن و سوغاتی‌های نفیس";
      acts = [
        {
          id: `gen-${dayNum}-1`,
          time: "۰۹:۳۰ - ۱۲:۳۰",
          title: "گشت آزاد جهت خرید شیرینی‌جات و صنایع دستی اصلی",
          desc: "مراجعه به مراکز تولید سنتی معتبر جهت تهیه شیرینی‌های اصیل و سوغات ویژه ماندگار برای عزیزان.",
          type: "activity",
          cost: budget === "economy" ? 100000 : budget === "balanced" ? 300000 : 800000
        },
        {
          id: `gen-${dayNum}-2`,
          time: "۱۳:۰۰ - ۱۴:۳۰",
          title: "آخرین ناهار لوکس با نمای سراسری از شهر",
          desc: "صرف ناهار در یک رستوران مرتفع یا مدرن با چشم‌اندازی فراموش‌نشدنی و تماشای پویایی شهر.",
          type: "food",
          cost: budget === "economy" ? 250000 : budget === "balanced" ? 450000 : 900000
        },
        {
          id: `gen-${dayNum}-3`,
          time: "۱۵:۳۰ - ۱۸:۰۰",
          title: "پیاده‌روی آرامش‌بخش در پارک‌های بزرگ یا حاشیه رودخانه/ساحل",
          desc: "دقایقی خلوت برای جمع‌بندی خاطرات بی‌نظیر سفر و ثبت آخرین فریم عکس‌های یادگاری سفر.",
          type: "relaxing",
          cost: 0
        }
      ];
    }

    return { dayNumber: dayNum, theme, activities: acts };
  });

  return {
    id: `custom-${city}-${style}-${duration}`,
    city,
    durationDays: duration,
    style,
    budgetType: budget,
    days,
    packingList,
    tips
  };
};

interface TripPlannerProps {
  onBack?: () => void;
}

export function TripPlanner({ onBack }: TripPlannerProps) {
  // Wizard Steps:
  // 1: Destination (City)
  // 2: Stay Duration & Budget Type
  // 3: Vibe/Style & Custom constraints (Prompt)
  // 4: Loading Screen
  // 5: Final Beautiful Result
  const [step, setStep] = useState(1);
  const [selectedCity, setSelectedCity] = useState("شیراز");
  const [selectedStyle, setSelectedStyle] = useState("cultural");
  const [selectedDuration, setSelectedDuration] = useState(3);
  const [selectedBudget, setSelectedBudget] = useState<"economy" | "balanced" | "luxury">("balanced");
  const [customPrompt, setCustomPrompt] = useState("");
  const [customCity, setCustomCity] = useState("");
  const [customDuration, setCustomDuration] = useState<number>(0);
  
  // Active Itinerary state
  const [activeItinerary, setActiveItinerary] = useState<Itinerary | null>(null);
  const [activeDay, setActiveDay] = useState(1);
  const [activeTab, setActiveTab] = useState<"itinerary" | "packing" | "tips">("itinerary");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [generationStep, setGenerationStep] = useState(0);

  // Enhanced Results State
  const [activeResultTab, setActiveResultTab] = useState<"overview" | "hotels" | "restaurants" | "services" | "itinerary" | "packing">("overview");
  const [selectedHotelId, setSelectedHotelId] = useState<string>("");
  const [selectedRestaurantIds, setSelectedRestaurantIds] = useState<string[]>([]);
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>(["anc-transfer", "anc-insurance"]);

  // Booking Modal State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingType, setBookingType] = useState<"hotel" | "restaurant" | "package">("package");
  const [selectedBookingTarget, setSelectedBookingTarget] = useState<any>(null);
  const [passengerName, setPassengerName] = useState("");
  const [passengerPhone, setPassengerPhone] = useState("");
  const [passengerNationalId, setPassengerNationalId] = useState("");
  const [voucherCreated, setVoucherCreated] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");

  useEffect(() => {
    const draft = localStorage.getItem('tripPlannerDraft');
    if (draft) {
      // Use setTimeout to avoid hydration mismatch if any, but since it's client-side rendering mostly, it's fine
      const parsed = JSON.parse(draft);
      if (window.confirm('یک پیش‌نویس ذخیره‌شده پیدا شد. آیا می‌خواهید از ادامه آن شروع کنید؟')) {
        setStep(parsed.step || 1);
        setSelectedCity(parsed.selectedCity || "شیراز");
        setSelectedStyle(parsed.selectedStyle || "cultural");
        setSelectedDuration(parsed.selectedDuration || 3);
        setSelectedBudget(parsed.selectedBudget || "balanced");
        setCustomPrompt(parsed.customPrompt || "");
        setCustomCity(parsed.customCity || "");
        setCustomDuration(parsed.customDuration || 0);
        setActiveItinerary(parsed.activeItinerary || null);
        setActiveDay(parsed.activeDay || 1);
        setActiveTab(parsed.activeTab || "itinerary");
        setCheckedItems(parsed.checkedItems || {});
        setActiveResultTab(parsed.activeResultTab || "overview");
        setSelectedHotelId(parsed.selectedHotelId || "");
        setSelectedRestaurantIds(parsed.selectedRestaurantIds || []);
        setSelectedServiceIds(parsed.selectedServiceIds || ["anc-transfer", "anc-insurance"]);
      }
    }
  }, []);

  const saveDraft = () => {
    const draft = {
      step,
      selectedCity,
      selectedStyle,
      selectedDuration,
      selectedBudget,
      customPrompt,
      customCity,
      customDuration,
      activeItinerary,
      activeDay,
      activeTab,
      checkedItems,
      activeResultTab,
      selectedHotelId,
      selectedRestaurantIds,
      selectedServiceIds
    };
    localStorage.setItem('tripPlannerDraft', JSON.stringify(draft));
    alert('پیش‌نویس سفر شما با موفقیت ذخیره شد.');
  };


  // Packing list toggles
  const togglePackingItem = (item: string) => {
    setCheckedItems(prev => ({ ...prev, [item]: !prev[item] }));
  };

  // Simulated Generation Steps
  const generationSteps = [
    "در حال تحلیل جاذبه‌های شاخص شهر...",
    "تنظیم فواصل زمانی صبح، ظهر و عصر...",
    "انتخاب بهینه‌ترین رستوران‌های بومی...",
    "تنظیم برنامه متناسب با بودجه شما...",
    "اعمال ترجیحات و هوش مصنوعی..."
  ];

  useEffect(() => {
    if (step === 4) {
      setGenerationStep(0);
      const timer = setInterval(() => {
        setGenerationStep(prev => {
          if (prev < generationSteps.length - 1) {
            return prev + 1;
          } else {
            clearInterval(timer);
            // Completed! Create custom plan
            const generated = generateItinerary(selectedCity, selectedStyle, selectedDuration, selectedBudget);
            
            // Apply custom prompt modifications if written
            if (customPrompt.trim()) {
              const modifiedDays = generated.days.map((day, dIdx) => ({
                ...day,
                theme: `${day.theme} (شخصی‌سازی شده بر اساس سلیقه شما)`,
                activities: day.activities.map((act, aIdx) => {
                  if (aIdx === 0) {
                    return {
                      ...act,
                      title: `${act.title} ✨`,
                      desc: `${act.desc} (سازماندهی شده متناسب با خواست شما: "${customPrompt}")`
                    };
                  }
                  return act;
                })
              }));
              
              setActiveItinerary({
                ...generated,
                days: modifiedDays,
                tips: [
                  ...generated.tips,
                  `برنامه سفر با در نظر گرفتن نکته ویژه شما ("${customPrompt}") بازنویسی و انعطاف‌پذیر شد.`
                ]
              });
            } else {
              setActiveItinerary(generated);
            }
            
            setActiveDay(1);
            
            // Set defaults for options
            const defaultHotels = getHotelsForCity(selectedCity, selectedDuration, selectedBudget);
            if (defaultHotels.length > 0) {
              setSelectedHotelId(defaultHotels[0].id);
            }
            const defaultRests = getRestaurantsForCity(selectedCity);
            setSelectedRestaurantIds(defaultRests.map(r => r.id));
            setSelectedServiceIds(["anc-transfer", "anc-insurance"]);
            setActiveResultTab("overview");

            setStep(5);
            return prev;
          }
        });
      }, 700);

      return () => clearInterval(timer);
    }
  }, [step]);

  // Options Data Getters
  const availableHotels = getHotelsForCity(selectedCity, selectedDuration, selectedBudget);
  const availableRestaurants = getRestaurantsForCity(selectedCity);
  const availableServices = getAncillaryServicesForCity(selectedCity);

  const selectedHotel = availableHotels.find(h => h.id === selectedHotelId) || availableHotels[0];
  const selectedRestaurants = availableRestaurants.filter(r => selectedRestaurantIds.includes(r.id));
  const selectedServices = availableServices.filter(s => selectedServiceIds.includes(s.id));

  // Expenses totals
  const calculateTotalCost = () => {
    if (!activeItinerary) return 0;
    return activeItinerary.days.reduce((total, day) => {
      return total + day.activities.reduce((dSum, act) => dSum + act.cost, 0);
    }, 0);
  };

  const itineraryActivitiesTotal = calculateTotalCost();
  const hotelTotalCost = selectedHotel ? selectedHotel.totalPrice : 0;
  const restaurantsTotalCost = selectedRestaurants.reduce((sum, r) => sum + r.pricePerPerson, 0);
  const servicesTotalCost = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const grandTotalPackagePrice = itineraryActivitiesTotal + hotelTotalCost + restaurantsTotalCost + servicesTotalCost;

  // Toggle helpers
  const toggleRestaurantSelection = (id: string) => {
    setSelectedRestaurantIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleServiceSelection = (id: string) => {
    setSelectedServiceIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleOpenBooking = (type: "hotel" | "restaurant" | "package", target?: any) => {
    setBookingType(type);
    setSelectedBookingTarget(target || null);
    setVoucherCreated(false);
    setIsBookingModalOpen(true);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = "ONJ-" + Math.floor(100000 + Math.random() * 900000);
    setVoucherCode(randomCode);
    setVoucherCreated(true);
  };

  const getStyleLabel = (style: string) => {
    switch (style) {
      case "cultural": return "فرهنگی و تاریخی";
      case "adventure": return "طبیعت‌گردی و ماجراجویی";
      case "relaxing": return "آرامش‌بخش و تفریحی";
      default: return style;
    }
  };

  const getBudgetTypeLabel = (budget: string) => {
    switch (budget) {
      case "economy": return "اقتصادی و به صرفه";
      case "balanced": return "متعادل و منطقی";
      case "luxury": return "لوکس و ممتاز";
      default: return budget;
    }
  };

  // Print function
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50/40 dark:bg-[#070913] py-12 px-4 sm:px-6 relative text-right" dir="rtl">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-7xl mx-auto relative z-10">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-200/60 dark:border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-inner">
              <Compass size={20} className="animate-spin-slow" />
            </div>
            <div>
              <h1 className="text-xsl font-black text-slate-900 dark:text-white tracking-tight">برنامه‌ریز هوشمند سفر اونجا</h1>
              <p className="text-xss font-semibold text-slate-400 dark:text-slate-400">سفر رویایی شما، متناسب با زمان، بودجه و سلیقه شخصی</p>
            </div>
          </div>

                    <div className="flex gap-2">
            <button 
              onClick={saveDraft} 
              className="px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-xss font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800 transition-all flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <Save size={14} />
              <span>ذخیره پیش‌نویس</span>
            </button>
            <button 
              onClick={onBack} 
              className="px-4 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-white/5 text-xss font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <ArrowRight size={14} />
              <span>بازگشت به صفحه اصلی</span>
            </button>
          </div>
        </div>

        {/* Beautiful Emerald to Orange visual banner with Travel Hero Image */}
        {step <= 3 && (
          <div className="mb-8 rounded-3xl overflow-hidden shadow-xl relative min-h-[220px] flex items-center bg-slate-900">
            {/* Background Travel Image with overlay */}
            <img 
              src={travelBannerImg} 
              alt="Iran Travel Banner" 
              className="absolute inset-0 w-full h-full object-cover object-center opacity-40 select-none pointer-events-none"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-slate-950 via-slate-900/85 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-blue-700/20 via-transparent to-blue-600/15"></div>
            
            <div className="relative z-10 w-full max-w-2xl p-5 md:p-8 space-y-3.5 text-right w-full">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full text-xss font-black text-white shadow-md">
                <Sparkles size={11} className="animate-pulse text-blue-400" />
                <span>برنامه‌ریزی هوشمند متصل به هوش مصنوعی ۲۰۲۶</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white drop-shadow-sm leading-tight">
                سفر بعدی خود را حرفه‌ای و در چند ثانیه بسازید! 🗺️✨
              </h2>
              <p className="text-slate-200 text-xss font-semibold leading-relaxed drop-shadow-sm w-full max-w-xl">
                با انتخاب یا تایپ دستی اسم هر شهری که مدنظرتان است، هوش مصنوعی یک برنامه سفارشی دقیق، متناسب با سطح بودجه و روزهای اقامت دلخواه شما خلق می‌کند.
              </p>
            </div>
          </div>
        )}

        {/* STEP PROGRESS INDICATOR FOR WIZARD (Steps 1, 2, 3) */}
        {step <= 3 && (
          <div className="mb-12 max-w-lg mx-auto px-4">
            <div className="flex items-center justify-between relative">
              {/* Dynamic Progress Bar */}
              <div className="absolute left-6 right-6 top-1/2 h-1 bg-slate-100 dark:bg-white/5 -translate-y-1/2 rounded-full z-0 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-l from-blue-600 to-blue-800 rounded-full transition-all duration-500 ease-out absolute right-0"
                  style={{ width: `${step === 1 ? 0 : step === 2 ? 50 : 100}%` }}
                ></div>
              </div>
              
              {/* Step 1 Bubble */}
              <div className="relative z-10 flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  step >= 1 ? "bg-blue-600 text-white ring-4 ring-blue-600/20 shadow-md shadow-blue-600/10 scale-110" : "bg-slate-200 dark:bg-slate-800 text-slate-500"
                }`}>
                  {toPersianDigits("1")}
                </div>
                <span className={`text-xss font-black mt-2 transition-colors duration-300 ${step === 1 ? "text-blue-600 dark:text-blue-400" : step > 1 ? "text-slate-500 dark:text-slate-400" : "text-slate-400"}`}>انتخاب مقصد</span>
              </div>

              {/* Step 2 Bubble */}
              <div className="relative z-10 flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  step >= 2 ? "bg-blue-600 text-white ring-4 ring-blue-600/20 shadow-md shadow-blue-600/10 scale-110" : "bg-slate-200 dark:bg-slate-800 text-slate-500"
                }`}>
                  {toPersianDigits("2")}
                </div>
                <span className={`text-xss font-black mt-2 transition-colors duration-300 ${step === 2 ? "text-blue-600 dark:text-blue-400" : step > 2 ? "text-slate-500 dark:text-slate-400" : "text-slate-400"}`}>مدت و بودجه</span>
              </div>

              {/* Step 3 Bubble */}
              <div className="relative z-10 flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  step >= 3 ? "bg-blue-600 text-white ring-4 ring-blue-600/20 shadow-md shadow-blue-600/10 scale-110" : "bg-slate-200 dark:bg-slate-800 text-slate-500"
                }`}>
                  {toPersianDigits("3")}
                </div>
                <span className={`text-xss font-black mt-2 transition-colors duration-300 ${step === 3 ? "text-blue-600 dark:text-blue-400" : "text-slate-400"}`}>سبک و جزئیات</span>
              </div>
            </div>
          </div>
        )}

        {/* MAIN BODY SWITCHER FOR WIZARD */}
        <AnimatePresence mode="wait">
          
          {/* STEP 1: Select Destination */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="bg-white/80 dark:bg-[#0c0f24]/80 backdrop-blur-2xl border border-slate-200/60 dark:border-white/5 rounded-3xl p-8 shadow-xl text-center md:text-right"
            >
              <div className="mb-6">
                <span className="text-xss font-bold tracking-widest text-blue-600 dark:text-blue-400 bg-blue-600/10 px-3 py-1 rounded-full uppercase inline-block mb-2">گام نخست</span>
                <h2 className="text-xsl font-black text-slate-900 dark:text-white">مقصد خود را مشخص کنید</h2>
                <p className="text-slate-500 dark:text-slate-400 text-xss font-semibold mt-1">قصد سفر به کدام یک از مقاصد توریستی و زیبای ایران را دارید؟</p>
              </div>

              {/* Grid of Cities with beautiful graphics */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 my-8">
                {[
                  { name: "شیراز", desc: "تمدن و هنر شیراز", color: "from-amber-400 to-blue-600", image: "https://images.unsplash.com/photo-1570168007244-23704106c641?q=80&w=300&auto=format&fit=crop" },
                  { name: "اصفهان", desc: "نصف جهان هنر", color: "from-blue-500 to-blue-600", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=300&auto=format&fit=crop" },
                  { name: "تهران", desc: "تلاقی سنت و مدرنیته", color: "from-blue-600 to-blue-600", image: "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=300&auto=format&fit=crop" },
                  { name: "یزد", desc: "شاهکار خشتی جهان", color: "from-yellow-600 to-blue-700", image: "https://images.unsplash.com/photo-1508962914676-134849a727f0?q=80&w=300&auto=format&fit=crop" },
                  { name: "کیش", desc: "آرامش آبی نیلگون", color: "from-blue-600 to-blue-600", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=300&auto=format&fit=crop" }
                ].map((city) => (
                  <button
                    key={city.name}
                    onClick={() => {
                      setSelectedCity(city.name);
                      setCustomCity(""); // clear custom input
                    }}
                    className={`relative overflow-hidden rounded-2xl border-2 transition-all group aspect-square cursor-pointer ${
                      selectedCity === city.name
                        ? "border-blue-600 scale-102 shadow-lg shadow-blue-600/10"
                        : "border-slate-100 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10"
                    }`}
                  >
                    <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-all z-10"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/10 to-transparent z-20"></div>
                    <div className="absolute bottom-3 left-3 right-3 text-right z-30">
                      <h3 className="text-white text-sm font-black">{city.name}</h3>
                      <p className="text-[9px] text-slate-300 font-bold mt-0.5">{city.desc}</p>
                    </div>
                    {/* Small active badge */}
                    {selectedCity === city.name && (
                      <div className="absolute top-2 right-2 bg-blue-600 text-white p-1 rounded-lg z-30 shadow-md">
                        <Check size={12} strokeWidth={3} />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Custom Destination City input box */}
              <div className="my-6 p-4 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-100 dark:border-white/5 space-y-2 text-right">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <MapPin size={13} className="text-blue-600" />
                  <span>آیا شهر دیگری مد نظر دارید؟ نام آن را بنویسید:</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customCity}
                    onChange={(e) => {
                      setCustomCity(e.target.value);
                      if (e.target.value.trim()) {
                        setSelectedCity(e.target.value.trim());
                      }
                    }}
                    placeholder="مثلا: تبریز، سنندج، رامسر، کرمانشاه..."
                    className="flex-grow px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900 text-xss font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-slate-400"
                  />
                  {customCity.trim() && (
                    <div className="px-3 py-2 bg-blue-600/10 text-blue-600 rounded-xl text-sm font-bold flex items-center gap-1">
                      <Check size={14} />
                      <span>مقصد: {selectedCity}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-white/5">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 bg-gradient-to-l from-blue-600 to-blue-700 hover:opacity-95 text-white rounded-xl text-xss font-bold transition-all shadow-md shadow-blue-600/15 flex items-center gap-2 cursor-pointer hover:scale-102"
                >
                  <span>مرحله بعد: مدت و بودجه</span>
                  <ArrowLeft size={14} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Duration & Budget */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="bg-white/80 dark:bg-[#0c0f24]/80 backdrop-blur-2xl border border-slate-200/60 dark:border-white/5 rounded-3xl p-8 shadow-xl text-right"
            >
              <div className="mb-6">
                <span className="text-xss font-bold tracking-widest text-blue-600 dark:text-blue-400 bg-blue-600/10 px-3 py-1 rounded-full uppercase inline-block mb-2">گام دوم</span>
                <h2 className="text-xsl font-black text-slate-900 dark:text-white">انتخاب زمان و نوع بودجه</h2>
                <p className="text-slate-500 dark:text-slate-400 text-xss font-semibold mt-1">چند روز تمایل به اقامت دارید و مایلید هزینه‌هایتان چگونه مدیریت شود؟</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                {/* Choose Stay Duration */}
                <div className="space-y-4">
                  <h3 className="text-sm font-black text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <Calendar size={16} className="text-blue-600" />
                    <span>تعداد روزهای اقامت:</span>
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[2, 3, 5].map((days) => (
                      <button
                        key={days}
                        onClick={() => {
                          setSelectedDuration(days);
                          setCustomDuration(0); // clear custom input
                        }}
                        className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
                          selectedDuration === days && customDuration === 0
                            ? "bg-blue-600/10 border-blue-600 text-blue-600 dark:text-blue-400 font-bold shadow-sm"
                            : "bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                        }`}
                      >
                        <span className="block text-lg">{toPersianDigits(days.toString())}</span>
                        <span className="text-xss font-bold opacity-80">روز کامل</span>
                      </button>
                    ))}
                  </div>

                  {/* Custom Duration Input Option */}
                  <div className="mt-4 p-3.5 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-100 dark:border-white/5 space-y-2">
                    <label className="text-sm font-black text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                      <Clock size={12} className="text-blue-600" />
                      <span>یا تعداد روز دلخواه خود را وارد کنید:</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={customDuration || ""}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          if (!isNaN(val) && val > 0) {
                            setCustomDuration(val);
                            setSelectedDuration(val);
                          } else {
                            setCustomDuration(0);
                          }
                        }}
                        placeholder="مثلا: ۷، ۱۰، ۱۴ روز..."
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900 text-xss font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-slate-400"
                      />
                      {customDuration > 0 && (
                        <div className="px-3 py-1.5 bg-blue-600/10 text-blue-600 rounded-xl text-sm font-bold whitespace-nowrap">
                          {toPersianDigits(customDuration.toString())} روز فعال
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-xss font-semibold text-slate-400">نکته: برنامه‌ها بر اساس تعداد روزهای پرطرفدار تنظیم شده‌اند.</p>
                </div>

                {/* Choose Budget level */}
                <div className="space-y-4">
                  <h3 className="text-sm font-black text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <DollarSign size={16} className="text-blue-600" />
                    <span>سطح بودجه سفر:</span>
                  </h3>
                  <div className="flex flex-col gap-2.5">
                    {[
                      { id: "economy", title: "اقتصادی و ارزان", desc: "انتخاب رستوران‌های دنج باکیفیت ارزان و بلیط‌های عمومی", cost: "کم‌هزینه" },
                      { id: "balanced", title: "متعادل و متوسط", desc: "ترکیب عالی از موزه‌ها، ترانسفر مناسب و ناهار عالی", cost: "استاندارد" },
                      { id: "luxury", title: "لوکس و اختصاصی", desc: "لوکس‌ترین جاذبه‌ها، هتل‌های ۵ ستاره و بهترین غذاخوری‌ها", cost: "ویژه" }
                    ].map((b) => (
                      <button
                        key={b.id}
                        onClick={() => setSelectedBudget(b.id as any)}
                        className={`p-3.5 rounded-xl border text-right transition-all flex items-center justify-between cursor-pointer ${
                          selectedBudget === b.id
                            ? "bg-blue-600/10 border-blue-600 text-blue-600 dark:text-blue-400 ring-2 ring-blue-600/20"
                            : "bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                        }`}
                      >
                        <div>
                          <h4 className="text-sm font-bold">{b.title}</h4>
                          <p className="text-xss opacity-75 mt-0.5">{b.desc}</p>
                        </div>
                        <span className="text-[9px] px-2 py-0.5 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded font-black whitespace-nowrap">{b.cost}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-white/5">
                <button
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 rounded-xl text-xss font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowRight size={14} />
                  <span>مرحله قبل</span>
                </button>

                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 bg-gradient-to-l from-blue-600 to-blue-700 hover:opacity-95 text-white rounded-xl text-xss font-bold transition-all shadow-md shadow-blue-600/15 flex items-center gap-2 cursor-pointer hover:scale-102"
                >
                  <span>مرحله بعد: سبک سفر</span>
                  <ArrowLeft size={14} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Vibe/Style & Custom constraints */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="bg-white/80 dark:bg-[#0c0f24]/80 backdrop-blur-2xl border border-slate-200/60 dark:border-white/5 rounded-3xl p-8 shadow-xl text-right"
            >
              <div className="mb-6">
                <span className="text-xss font-bold tracking-widest text-blue-600 dark:text-blue-400 bg-blue-600/10 px-3 py-1 rounded-full uppercase inline-block mb-2">گام سوم</span>
                <h2 className="text-xsl font-black text-slate-900 dark:text-white">تعیین سبک سفر و نکات دلخواه</h2>
                <p className="text-slate-500 dark:text-slate-400 text-xss font-semibold mt-1">سفر خود را با یک سبک خاص جهت‌دهی کنید و در صورت تمایل، جزئیات خاص را به هوش مصنوعی بسپارید.</p>
              </div>

              <div className="space-y-6 my-8">
                {/* Style Choices */}
                <div>
                  <h3 className="text-sm font-bold text-slate-400 mb-3 uppercase">انتخاب تم و اتمسفر سفر:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { id: "cultural", title: "فرهنگی و تاریخی", desc: "تمرکز بر مساجد، عمارت‌ها و شعر", icon: Camera },
                      { id: "adventure", title: "طبیعت‌گردی و ماجراجویی", desc: "کوه، کویر، جنگل و ترشح آدرنالین", icon: Compass },
                      { id: "relaxing", title: "آرامش‌بخش و تفریحی", desc: "کافه‌گردی، خرید و آرامش مطلق ساحلی", icon: Coffee }
                    ].map((style) => {
                      const IconComp = style.icon;
                      return (
                        <button
                          key={style.id}
                          onClick={() => setSelectedStyle(style.id)}
                          className={`p-4 rounded-xl border text-right transition-all flex flex-col justify-between cursor-pointer ${
                            selectedStyle === style.id
                              ? "bg-blue-600/10 border-blue-600 text-blue-600 dark:text-blue-400 ring-2 ring-blue-600/20"
                              : "bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                          }`}
                        >
                          <div className="p-2 bg-blue-600/10 text-blue-600 dark:text-blue-400 rounded-lg w-fit mb-3">
                            <IconComp size={16} />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold">{style.title}</h4>
                            <p className="text-xss opacity-75 mt-1">{style.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Constraints Prompt (Simplifies UI but allows depth) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                      <Sparkles size={13} className="text-blue-600 animate-pulse" />
                      <span>سفارشی‌سازی پیشرفته (اختیاری):</span>
                    </label>
                    <span className="text-[9px] bg-slate-100 dark:bg-white/5 text-slate-500 px-2 py-0.5 rounded font-bold">هوش مصنوعی</span>
                  </div>
                  <input
                    type="text"
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="مثال: من به همراه کودکانم سفر می‌کنم یا می‌خواهم حتماً پیاده‌روی در شب زیاد باشد..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-950/40 text-xss font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-slate-400"
                  />
                  <p className="text-xss font-semibold text-slate-400">سیستم برنامه‌ریزی هوشمند، خواسته‌های فرعی شما را مستقیماً در سناریوها ادغام می‌کند.</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-white/5">
                <button
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 rounded-xl text-xss font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowRight size={14} />
                  <span>مرحله قبل</span>
                </button>

                <button
                  onClick={() => setStep(4)}
                  className="px-8 py-3.5 bg-gradient-to-l from-blue-600 to-blue-800 hover:opacity-95 text-white rounded-xl text-sm font-bold transition-all shadow-md shadow-blue-600/20 flex items-center gap-2 cursor-pointer hover:scale-102"
                >
                  <Sparkles size={14} className="animate-pulse" />
                  <span>طراحی هوشمندانه سفر</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Beautiful, relaxed loading screen */}
          {step === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white/80 dark:bg-[#0c0f24]/80 backdrop-blur-2xl border border-slate-200/60 dark:border-white/5 rounded-3xl p-12 shadow-xl text-center flex flex-col items-center justify-center min-h-[350px]"
            >
              {/* Spinner wrapper */}
              <div className="relative mb-8">
                <div className="w-16 h-16 rounded-full border-4 border-blue-50 dark:border-white/5 border-t-blue-600 animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center text-blue-600">
                  <Compass size={24} className="animate-pulse" />
                </div>
              </div>

              <h3 className="text-base font-black text-slate-800 dark:text-white animate-pulse">شکل‌دهی نقشه سفر شما...</h3>
              
              {/* Process indicator steps */}
              <div className="mt-6 space-y-2 max-w-xs w-full">
                {generationSteps.map((s, idx) => {
                  const isActive = idx === generationStep;
                  const isDone = idx < generationStep;
                  return (
                    <div 
                      key={idx} 
                      className={`flex items-center gap-2 text-sm font-bold justify-start transition-opacity duration-300 ${
                        isActive ? "text-blue-600 dark:text-blue-400 opacity-100" : isDone ? "text-slate-400 opacity-70" : "text-slate-300 dark:text-slate-700 opacity-40"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center text-xss ${
                        isDone ? "bg-blue-600 text-white" : isActive ? "bg-blue-600 text-white animate-ping" : "bg-slate-200 dark:bg-slate-800"
                      }`}>
                        {isDone ? "✓" : ""}
                      </div>
                      <span>{s}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 5: Beautiful final result presentation */}
          {step === 5 && activeItinerary && (
            <motion.div
              key="step-5"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              
              {/* Top Banner with Quick Recap & Package Quick Booking */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-3xl p-5 md:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="space-y-2 relative z-10 text-right">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[9px] bg-blue-600 text-white px-2.5 py-0.5 rounded-md font-black">پکیج هوشمند جامع</span>
                    <span className="text-xss bg-white/10 text-slate-100 px-2 py-0.5 rounded font-black flex items-center gap-1">
                      <Sliders size={10} />
                      <span>{getStyleLabel(activeItinerary.style)}</span>
                    </span>
                    <span className="text-xss bg-white/10 text-slate-100 px-2 py-0.5 rounded font-black flex items-center gap-1">
                      <Building2 size={10} />
                      <span>اقامتگاه: {selectedHotel ? selectedHotel.name.split(" ")[1] || selectedHotel.name : "مشخص شده"}</span>
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight flex items-center gap-2">
                    <span>برنامه سفر رویایی به {activeItinerary.city}</span>
                    <span className="text-sm font-black text-blue-50">({toPersianDigits(activeItinerary.durationDays.toString())} روزه)</span>
                  </h2>
                  <p className="text-white/90 text-xss font-semibold leading-relaxed w-full max-w-xl">
                    این سناریو با هوش مصنوعی برای بودجه <strong className="text-blue-50 font-bold">{getBudgetTypeLabel(activeItinerary.budgetType)}</strong> و رزرو همزمان هتل، رستوران‌ها و خدمات جانبی یکپارچه شده است.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 relative z-10 w-full md:w-auto justify-end flex-wrap">
                  <button
                    onClick={() => handleOpenBooking("package")}
                    className="px-5 py-3 bg-amber-400 hover:bg-blue-400 text-slate-950 font-black rounded-xl text-xss transition-all shadow-lg flex items-center gap-1.5 cursor-pointer hover:scale-102"
                  >
                    <Ticket size={16} />
                    <span>صدور بلیت و رزرو یکجای پکیج</span>
                  </button>

                  <button
                    onClick={handlePrint}
                    className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xss font-bold transition-all flex items-center gap-1.5 shadow-inner cursor-pointer"
                    title="چاپ برنامه"
                  >
                    <Printer size={15} />
                    <span className="hidden sm:inline">چاپ</span>
                  </button>

                  <button
                    onClick={() => setStep(3)}
                    className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xss font-bold transition-all flex items-center gap-1 shadow-inner cursor-pointer"
                    title="تغییر ترجیحات"
                  >
                    <Sliders size={15} />
                  </button>
                </div>
              </div>

              {/* Major Sub-Tabs Switcher */}
              <div className="bg-white dark:bg-[#0c0f24] border border-slate-200/60 dark:border-white/5 rounded-2xl p-2 shadow-lg flex items-center justify-start overflow-x-auto gap-2 no-scrollbar">
                <button
                  onClick={() => setActiveResultTab("overview")}
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                    activeResultTab === "overview"
                      ? "bg-slate-900 text-white dark:bg-blue-600 dark:text-slate-950 shadow-md"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
                  }`}
                >
                  <Layers size={15} />
                  <span>نمای کلی و خلاصه مالی</span>
                </button>

                <button
                  onClick={() => setActiveResultTab("hotels")}
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                    activeResultTab === "hotels"
                      ? "bg-slate-900 text-white dark:bg-blue-600 dark:text-slate-950 shadow-md"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
                  }`}
                >
                  <Building2 size={15} />
                  <span>رزرو هتل و اقامت ({toPersianDigits(availableHotels.length.toString())} گزینه)</span>
                </button>

                <button
                  onClick={() => setActiveResultTab("restaurants")}
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                    activeResultTab === "restaurants"
                      ? "bg-slate-900 text-white dark:bg-blue-600 dark:text-slate-950 shadow-md"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
                  }`}
                >
                  <Utensils size={15} />
                  <span>رزرو رستوران‌ها ({toPersianDigits(availableRestaurants.length.toString())} مورد)</span>
                </button>

                <button
                  onClick={() => setActiveResultTab("services")}
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                    activeResultTab === "services"
                      ? "bg-slate-900 text-white dark:bg-blue-600 dark:text-slate-950 shadow-md"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
                  }`}
                >
                  <Award size={15} />
                  <span>خدمات جانبی و تشریفات ({toPersianDigits(selectedServices.length.toString())} انتخاب)</span>
                </button>

                <button
                  onClick={() => setActiveResultTab("itinerary")}
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                    activeResultTab === "itinerary"
                      ? "bg-slate-900 text-white dark:bg-blue-600 dark:text-slate-950 shadow-md"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
                  }`}
                >
                  <Calendar size={15} />
                  <span>جدول زمانی روزانه</span>
                </button>

                <button
                  onClick={() => setActiveResultTab("packing")}
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                    activeResultTab === "packing"
                      ? "bg-slate-900 text-white dark:bg-blue-600 dark:text-slate-950 shadow-md"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
                  }`}
                >
                  <Briefcase size={15} />
                  <span>چک‌لیست و وسایل</span>
                </button>
              </div>

              {/* TAB 1: OVERVIEW DASHBOARD */}
              {activeResultTab === "overview" && (
                <div className="space-y-6">
                  {/* Financial Summary & Split Matrix */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-[#0c0f24] border border-slate-200/60 dark:border-white/5 rounded-2xl p-5 shadow-lg relative overflow-hidden">
                      <div className="text-sm font-bold text-slate-400 mb-1 flex items-center gap-1">
                        <Building2 size={14} className="text-blue-600" />
                        <span>اقامتگاه انتخابی ({toPersianDigits(activeItinerary.durationDays.toString())} شب):</span>
                      </div>
                      <div className="text-lg font-black text-slate-900 dark:text-white">
                        {toPersianDigits((hotelTotalCost / 1000000).toFixed(1))} میلیون تومان
                      </div>
                      <p className="text-xss text-slate-400 mt-1 truncate">{selectedHotel.name}</p>
                      <button 
                        onClick={() => setActiveResultTab("hotels")}
                        className="mt-3 text-sm font-black text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>تغییر هتل</span>
                        <ChevronRight size={12} className="rotate-180" />
                      </button>
                    </div>

                    <div className="bg-white dark:bg-[#0c0f24] border border-slate-200/60 dark:border-white/5 rounded-2xl p-5 shadow-lg">
                      <div className="text-sm font-bold text-slate-400 mb-1 flex items-center gap-1">
                        <Utensils size={14} className="text-blue-600" />
                        <span>رستوران‌ها ({toPersianDigits(selectedRestaurants.length.toString())} وعده):</span>
                      </div>
                      <div className="text-lg font-black text-slate-900 dark:text-white">
                        {toPersianDigits((restaurantsTotalCost / 1000).toString())} هزار تومان
                      </div>
                      <p className="text-xss text-slate-400 mt-1 truncate">رزرو اختصاصی میز و منو</p>
                      <button 
                        onClick={() => setActiveResultTab("restaurants")}
                        className="mt-3 text-sm font-black text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>مدیریت رستوران‌ها</span>
                        <ChevronRight size={12} className="rotate-180" />
                      </button>
                    </div>

                    <div className="bg-white dark:bg-[#0c0f24] border border-slate-200/60 dark:border-white/5 rounded-2xl p-5 shadow-lg">
                      <div className="text-sm font-bold text-slate-400 mb-1 flex items-center gap-1">
                        <ShieldCheck size={14} className="text-blue-600" />
                        <span>خدمات جانبی و تشریفات:</span>
                      </div>
                      <div className="text-lg font-black text-slate-900 dark:text-white">
                        {toPersianDigits((servicesTotalCost / 1000).toString())} هزار تومان
                      </div>
                      <p className="text-xss text-slate-400 mt-1 truncate">ترانسفر، تورلیدر و بیمه</p>
                      <button 
                        onClick={() => setActiveResultTab("services")}
                        className="mt-3 text-sm font-black text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>افزایش خدمات</span>
                        <ChevronRight size={12} className="rotate-180" />
                      </button>
                    </div>

                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 shadow-xl flex flex-col justify-between">
                      <div>
                        <div className="text-sm font-black text-blue-400 mb-1 flex items-center gap-1">
                          <Ticket size={14} />
                          <span>مجموع کل پکیج سفر:</span>
                        </div>
                        <div className="text-xsl font-black text-white">
                          {toPersianDigits((grandTotalPackagePrice / 1000000).toFixed(2))} میلیون تومان
                        </div>
                        <p className="text-xss text-slate-300 mt-1">تضمین قیمت و رزرو مستقیم</p>
                      </div>
                      <button
                        onClick={() => handleOpenBooking("package")}
                        className="mt-3 py-2 px-3 bg-amber-400 hover:bg-blue-400 text-slate-950 text-sm font-bold rounded-xl text-center transition-all cursor-pointer shadow"
                      >
                        رزرو کل پکیج
                      </button>
                    </div>
                  </div>

                  {/* Summary Columns: Selected Hotel + Restaurants + Selected Services preview */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Selected Hotel Card */}
                    <div className="bg-white dark:bg-[#0c0f24] border border-slate-200/60 dark:border-white/5 rounded-3xl p-5 shadow-lg space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
                        <span className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                          <Building2 size={16} className="text-blue-600" />
                          <span>اقامتگاه انتخابی شما</span>
                        </span>
                        <span className="text-xss bg-blue-600/10 text-blue-600 dark:text-blue-400 font-bold px-2 py-0.5 rounded">
                          {selectedHotel.badge}
                        </span>
                      </div>

                      <div className="relative rounded-2xl overflow-hidden h-40">
                        <img src={selectedHotel.image} alt={selectedHotel.name} className="w-full h-full object-cover" />
                        <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-md text-amber-400 px-2 py-1 rounded-lg text-xss font-bold flex items-center gap-1">
                          <Star size={12} fill="currentColor" />
                          <span>{toPersianDigits(selectedHotel.rating.toString())}</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-black text-slate-900 dark:text-white">{selectedHotel.name}</h4>
                        <p className="text-xss text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                          <MapPin size={12} className="text-blue-600 shrink-0" />
                          <span>{selectedHotel.location}</span>
                        </p>
                      </div>

                      <div className="p-3 bg-slate-50 dark:bg-slate-950/40 rounded-xl space-y-1">
                        <div className="text-sm font-bold text-slate-700 dark:text-slate-300">
                          {selectedHotel.roomType}
                        </div>
                        <div className="flex items-center justify-between text-sm text-slate-500">
                          <span>قیمت هر شب:</span>
                          <span className="font-bold text-slate-800 dark:text-white">{toPersianDigits((selectedHotel.pricePerNight / 1000).toString())} هزار تومان</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <button
                          onClick={() => setActiveResultTab("hotels")}
                          className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                        >
                          مشاهده سایر هتل‌ها
                        </button>

                        <button
                          onClick={() => handleOpenBooking("hotel", selectedHotel)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xss cursor-pointer shadow"
                        >
                          رزرو مجزای هتل
                        </button>
                      </div>
                    </div>

                    {/* Selected Restaurants Card */}
                    <div className="bg-white dark:bg-[#0c0f24] border border-slate-200/60 dark:border-white/5 rounded-3xl p-5 shadow-lg space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
                        <span className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                          <Utensils size={16} className="text-blue-600" />
                          <span>رستوران‌های برنامه‌ریزی شده</span>
                        </span>
                        <span className="text-xss bg-blue-600/10 text-blue-600 dark:text-blue-400 font-bold px-2 py-0.5 rounded">
                          {toPersianDigits(selectedRestaurants.length.toString())} وعده
                        </span>
                      </div>

                      <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
                        {selectedRestaurants.map(r => (
                          <div key={r.id} className="p-3 bg-slate-50 dark:bg-slate-950/40 rounded-2xl flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2.5">
                              <img src={r.image} alt={r.name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                              <div className="text-right">
                                <h5 className="text-sm font-bold text-slate-800 dark:text-white">{r.name}</h5>
                                <p className="text-xss text-slate-400 mt-0.5">{r.specialtyDish}</p>
                              </div>
                            </div>
                            <span className="text-sm font-black text-blue-600 dark:text-blue-400 shrink-0">
                              {toPersianDigits((r.pricePerPerson / 1000).toString())}ک
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-white/5">
                        <button
                          onClick={() => setActiveResultTab("restaurants")}
                          className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                        >
                          تغییر یا افزودن رستوران
                        </button>

                        <button
                          onClick={() => handleOpenBooking("restaurant", selectedRestaurants)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xss cursor-pointer shadow"
                        >
                          رزرو میز و غذاها
                        </button>
                      </div>
                    </div>

                    {/* Selected Ancillary Services Card */}
                    <div className="bg-white dark:bg-[#0c0f24] border border-slate-200/60 dark:border-white/5 rounded-3xl p-5 shadow-lg space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
                        <span className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                          <Award size={16} className="text-blue-600" />
                          <span>خدمات و تشریفات جانبی</span>
                        </span>
                        <span className="text-xss bg-blue-600/10 text-blue-600 dark:text-blue-400 font-bold px-2 py-0.5 rounded">
                          {toPersianDigits(selectedServices.length.toString())} خدمت فعال
                        </span>
                      </div>

                      <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
                        {selectedServices.map(s => (
                          <div key={s.id} className="p-3 bg-blue-50 dark:bg-blue-700/20 border border-blue-600/20 rounded-2xl flex items-center justify-between gap-2">
                            <div className="text-right space-y-0.5">
                              <h5 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-1">
                                <CheckCircle size={12} className="text-blue-600" />
                                <span>{s.title}</span>
                              </h5>
                              <p className="text-xss text-slate-500 dark:text-slate-400 line-clamp-1">{s.desc}</p>
                            </div>
                            <span className="text-sm font-black text-slate-900 dark:text-white shrink-0">
                              {toPersianDigits((s.price / 1000).toString())}ک
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-white/5">
                        <button
                          onClick={() => setActiveResultTab("services")}
                          className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                        >
                          مشاهده لیست کامل خدمات
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: MULTIPLE HOTELS SELECTION & COMPARISON */}
              {activeResultTab === "hotels" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-black text-slate-900 dark:text-white">گزینه‌های متنوع اقامتگاهی در {activeItinerary.city}</h3>
                      <p className="text-xss text-slate-500">یکی از اقامتگاه‌های زیر را انتخاب کنید تا به طور خودکار در برنامه سفر محاسبه شود.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {availableHotels.map(hotel => {
                      const isSelected = selectedHotelId === hotel.id;
                      return (
                        <div 
                          key={hotel.id}
                          className={`bg-white dark:bg-[#0c0f24] border-2 rounded-3xl p-5 shadow-xl transition-all relative flex flex-col justify-between ${
                            isSelected 
                              ? "border-blue-600 dark:border-blue-600 ring-4 ring-blue-600/10" 
                              : "border-slate-200/60 dark:border-white/5 hover:border-slate-300"
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute top-3 left-3 bg-blue-600 text-white text-xss font-black px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md z-10">
                              <Check size={12} strokeWidth={3} />
                              <span>اقامتگاه انتخابی</span>
                            </div>
                          )}

                          <div className="space-y-4">
                            <div className="relative rounded-2xl overflow-hidden h-44">
                              <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                              <div className="absolute bottom-2 right-2 bg-slate-900/80 backdrop-blur-md text-amber-400 px-2 py-1 rounded-lg text-xss font-bold flex items-center gap-1">
                                <Star size={12} fill="currentColor" />
                                <span>{toPersianDigits(hotel.rating.toString())} ({toPersianDigits(hotel.reviewsCount.toString())} نظر)</span>
                              </div>
                              <div className="absolute top-2 right-2 bg-slate-900/80 text-white text-xss font-black px-2 py-0.5 rounded-md">
                                {hotel.badge}
                              </div>
                            </div>

                            <div>
                              <h4 className="text-sm font-black text-slate-900 dark:text-white leading-snug">{hotel.name}</h4>
                              <p className="text-xss text-slate-500 mt-1 flex items-center gap-1">
                                <MapPin size={12} className="text-blue-600 shrink-0" />
                                <span>{hotel.location}</span>
                              </p>
                            </div>

                            <div className="p-3 bg-slate-50 dark:bg-slate-950/40 rounded-xl space-y-1.5 text-right">
                              <div className="text-sm font-bold text-slate-800 dark:text-white">
                                {hotel.roomType}
                              </div>
                              <div className="flex items-center justify-between text-xss text-slate-500">
                                <span>هر شب:</span>
                                <span className="font-bold text-slate-900 dark:text-white">{toPersianDigits((hotel.pricePerNight / 1000).toString())} هزار تومان</span>
                              </div>
                              <div className="flex items-center justify-between text-xss text-blue-600 dark:text-blue-400 pt-1 border-t border-slate-200/60 dark:border-white/5 font-black">
                                <span>کل مدت ({toPersianDigits(activeItinerary.durationDays.toString())} شب):</span>
                                <span>{toPersianDigits((hotel.totalPrice / 1000000).toFixed(1))} میلیون تومان</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-1">
                              {hotel.amenities.map((am, aIdx) => (
                                <span key={aIdx} className="text-xss bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded font-bold">
                                  {am}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-white/5 flex items-center gap-2">
                            <button
                              onClick={() => setSelectedHotelId(hotel.id)}
                              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                                  : "bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-slate-200"
                              }`}
                            >
                              {isSelected ? "انتخاب شده ✓" : "انتخاب این هتل"}
                            </button>

                            <button
                              onClick={() => handleOpenBooking("hotel", hotel)}
                              className="p-2.5 bg-amber-400/10 hover:bg-amber-400/20 text-blue-600 dark:text-amber-400 rounded-xl text-sm font-bold cursor-pointer"
                              title="رزرو فوری این هتل"
                            >
                              <Ticket size={16} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: RESTAURANTS RESERVATION */}
              {activeResultTab === "restaurants" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-black text-slate-900 dark:text-white">رستوران‌ها و کافه‌های برتر پیشنهادی در {activeItinerary.city}</h3>
                      <p className="text-xss text-slate-500">میز و وعده غذایی دلخواه خود را علامت بزنید تا رزرو آنلاین انجام شود.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {availableRestaurants.map(rest => {
                      const isSelected = selectedRestaurantIds.includes(rest.id);
                      return (
                        <div 
                          key={rest.id}
                          className={`bg-white dark:bg-[#0c0f24] border-2 rounded-3xl p-5 shadow-xl transition-all flex flex-col md:flex-row gap-4 items-center justify-between ${
                            isSelected 
                              ? "border-blue-600 dark:border-blue-600 ring-4 ring-blue-600/10" 
                              : "border-slate-200/60 dark:border-white/5 hover:border-slate-300"
                          }`}
                        >
                          <img src={rest.image} alt={rest.name} className="w-full md:w-36 h-32 rounded-2xl object-cover shrink-0" />

                          <div className="space-y-2 flex-1 text-right w-full">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xss bg-blue-600/10 text-blue-600 dark:text-blue-400 font-bold px-2.5 py-0.5 rounded">
                                {rest.categoryLabel}
                              </span>
                              <span className="text-xss font-bold text-amber-400 flex items-center gap-1">
                                <Star size={12} fill="currentColor" />
                                <span>{toPersianDigits(rest.rating.toString())}</span>
                              </span>
                            </div>

                            <h4 className="text-sm font-black text-slate-900 dark:text-white">{rest.name}</h4>
                            <p className="text-xss text-slate-600 dark:text-slate-300 font-medium">
                              پیشنهاد: <span className="font-bold text-blue-600 dark:text-amber-400">{rest.specialtyDish}</span>
                            </p>
                            <p className="text-sm text-slate-400 flex items-center gap-1">
                              <Clock size={11} className="text-slate-400" />
                              <span>زمان پیشنهادی: {rest.timeSlot}</span>
                            </p>

                            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-white/5">
                              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                                {toPersianDigits((rest.pricePerPerson / 1000).toString())} هزار تومان / نفر
                              </span>

                              <button
                                onClick={() => toggleRestaurantSelection(rest.id)}
                                className={`px-3 py-1.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-blue-600 text-white"
                                    : "bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300"
                                }`}
                              >
                                {isSelected ? "در برنامه ✓" : "افزودن به برنامه"}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 4: ANCILLARY SERVICES */}
              {activeResultTab === "services" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-black text-slate-900 dark:text-white">خدمات جانبی و تشریفات سفر</h3>
                    <p className="text-xss text-slate-500">سفر خود را با خدمات ترانسفر، تورلیدر اختصاصی و اسپا راحت‌تر و کامل‌تر کنید.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {availableServices.map(srv => {
                      const isSelected = selectedServiceIds.includes(srv.id);
                      return (
                        <div 
                          key={srv.id}
                          className={`bg-white dark:bg-[#0c0f24] border-2 rounded-3xl p-5 shadow-xl transition-all flex flex-col justify-between ${
                            isSelected 
                              ? "border-blue-600 dark:border-blue-600 ring-4 ring-blue-600/10" 
                              : "border-slate-200/60 dark:border-white/5 hover:border-slate-300"
                          }`}
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xss bg-blue-600/10 text-blue-600 dark:text-blue-400 font-bold px-2 py-0.5 rounded">
                                {srv.badge}
                              </span>
                              <span className="text-xss text-slate-400 font-bold">{srv.unit}</span>
                            </div>

                            <h4 className="text-sm font-black text-slate-900 dark:text-white">{srv.title}</h4>
                            <p className="text-xss text-slate-500 leading-relaxed">{srv.desc}</p>
                          </div>

                          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                            <span className="text-sm font-bold text-slate-900 dark:text-white">
                              {toPersianDigits((srv.price / 1000).toString())} هزار تومان
                            </span>

                            <button
                              onClick={() => toggleServiceSelection(srv.id)}
                              className={`px-3 py-1.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-blue-600 text-white"
                                  : "bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300"
                              }`}
                            >
                              {isSelected ? "انتخاب شده ✓" : "افزودن خدمت"}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 5 & 6: ITINERARY TIMELINE & PACKING */}
              {(activeResultTab === "itinerary" || activeResultTab === "packing") && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Right Area (Timeline) - Spans 8 Columns */}
                  <div className="lg:col-span-8 bg-white dark:bg-[#0c0f24]/80 backdrop-blur-2xl border border-slate-200/60 dark:border-white/5 rounded-3xl p-6 shadow-xl space-y-6">
                    
                    {/* Day Navigation Tabs */}
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/5">
                      <span className="text-sm font-bold text-slate-400 uppercase">روز شمار برنامه:</span>
                      <div className="flex items-center gap-1.5">
                        {activeItinerary.days.map((day) => (
                          <button
                            key={day.dayNumber}
                            onClick={() => setActiveDay(day.dayNumber)}
                            className={`px-3.5 py-1.5 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                              activeDay === day.dayNumber
                                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md shadow-blue-600/20"
                                : "bg-slate-50 dark:bg-slate-950/40 text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                            }`}
                          >
                            <span>روز {toPersianDigits(day.dayNumber.toString())}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Day Detail & Theme */}
                    {activeItinerary.days.map((day) => {
                      if (day.dayNumber !== activeDay) return null;
                      return (
                        <div key={day.dayNumber} className="space-y-6">
                          {/* Day Theme Banner */}
                          <div className="p-4 bg-blue-50 dark:bg-blue-700/20 border border-blue-600/20 dark:border-blue-600/10 rounded-2xl flex items-start gap-3">
                            <div className="p-2 bg-blue-600/10 text-blue-600 dark:text-blue-400 rounded-xl shrink-0 mt-0.5">
                              <Sparkles size={16} className="text-blue-600 animate-pulse" />
                            </div>
                            <div>
                              <h3 className="text-xss font-bold text-blue-600 dark:text-blue-400">موضوع محوری روز {toPersianDigits(day.dayNumber.toString())}:</h3>
                              <p className="text-sm font-bold text-slate-800 dark:text-white mt-0.5">{day.theme}</p>
                            </div>
                          </div>

                          {/* Activities Timeline */}
                          <div className="relative border-r-2 border-slate-100 dark:border-white/5 pr-4 mr-2 space-y-8">
                            {day.activities.map((act) => {
                              let actIcon = <Camera size={14} />;
                              let iconBg = "bg-amber-400/10 text-amber-400";
                              if (act.type === "food") {
                                actIcon = <Utensils size={14} />;
                                iconBg = "bg-blue-600/10 text-blue-600";
                              } else if (act.type === "relaxing") {
                                actIcon = <Coffee size={14} />;
                                iconBg = "bg-blue-600/10 text-blue-600";
                              } else if (act.type === "activity") {
                                actIcon = <Compass size={14} />;
                                iconBg = "bg-blue-600/10 text-blue-600";
                              }

                              return (
                                <div key={act.id} className="relative group">
                                  <div className={`absolute -right-[23px] top-1 w-2.5 h-2.5 rounded-full ring-4 ring-white dark:ring-slate-950 group-hover:scale-125 transition-transform ${
                                    act.type === "food" ? "bg-blue-600" : act.type === "relaxing" ? "bg-blue-600" : "bg-blue-600"
                                  }`}></div>

                                  <div className="space-y-1 text-right">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className="text-xss font-black text-slate-400 bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded flex items-center gap-1">
                                        <Clock size={10} />
                                        <span>{toPersianDigits(act.time)}</span>
                                      </span>
                                      <span className="text-xss font-black text-blue-600 dark:text-blue-400 bg-blue-600/10 px-2 py-0.5 rounded flex items-center gap-1">
                                        <DollarSign size={10} />
                                        <span>{act.cost === 0 ? "رایگان" : `${toPersianDigits((act.cost / 1000).toString())} هزار تومان`}</span>
                                      </span>
                                    </div>

                                    <h4 className="text-sm font-black text-slate-800 dark:text-white flex items-center gap-1.5 pt-1">
                                      <span className={`p-1 rounded ${iconBg}`}>{actIcon}</span>
                                      <span>{act.title}</span>
                                    </h4>

                                    <p className="text-xss font-semibold text-slate-500 dark:text-slate-400 leading-relaxed pl-4">
                                      {act.desc}
                                    </p>

                                    {act.location && (
                                      <div className="text-xss text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1 mt-1 bg-blue-600/5 px-2 py-0.5 rounded w-fit">
                                        <MapPin size={10} />
                                        <span>{act.location}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Left Area (Sidebar: Checklist & Expert Tips) - Spans 4 Columns */}
                  <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white dark:bg-[#0c0f24]/80 border border-slate-200/60 dark:border-white/5 rounded-3xl p-6 shadow-xl space-y-4">
                      <h4 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                        <Briefcase size={14} className="text-blue-600" />
                        <span>تجهیزات سفر پیشنهادی:</span>
                      </h4>
                      <div className="space-y-1.5">
                        {activeItinerary.packingList.map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => togglePackingItem(item)}
                            className="w-full p-2 rounded-lg bg-slate-50/50 dark:bg-slate-950/20 hover:bg-slate-100 dark:hover:bg-slate-900/50 transition-all flex items-center justify-between text-right cursor-pointer group"
                          >
                            <span className={`text-sm font-bold ${checkedItems[item] ? "line-through text-slate-400" : "text-slate-700 dark:text-slate-300"}`}>
                              {item}
                            </span>
                            <div className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center transition-all ${
                              checkedItems[item] 
                                ? "bg-blue-600 border-blue-600 text-white" 
                                : "border-slate-300 group-hover:border-slate-400 bg-white dark:bg-slate-900"
                            }`}>
                              {checkedItems[item] && <Check size={10} strokeWidth={4} />}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* BOOKING MODAL */}
              <AnimatePresence>
                {isBookingModalOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
                  >
                    <motion.div
                      initial={{ scale: 0.9, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.9, y: 20 }}
                      className="bg-white dark:bg-[#0c0f24] border border-slate-200/60 dark:border-white/10 rounded-3xl p-5 md:p-8 max-w-lg w-full shadow-2xl relative text-right"
                    >
                      <button
                        onClick={() => setIsBookingModalOpen(false)}
                        className="absolute top-4 left-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full bg-slate-100 dark:bg-slate-900 cursor-pointer"
                      >
                        <X size={18} />
                      </button>

                      {!voucherCreated ? (
                        <form onSubmit={handleConfirmBooking} className="space-y-5">
                          <div className="flex items-center gap-3">
                            <div className="p-3 bg-amber-400/10 text-amber-400 rounded-2xl">
                              <Ticket size={24} />
                            </div>
                            <div>
                              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                                {bookingType === "package" ? "صدور واچر رزرو کل پکیج سفر" : bookingType === "hotel" ? "رزرو مستقیم هتل" : "رزرو اختصاصی میز رستوران"}
                              </h3>
                              <p className="text-xss text-slate-500">مشخصات سرپرست مسافران را جهت صدور بلیت آنلاین وارد کنید.</p>
                            </div>
                          </div>

                          <div className="p-4 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-100 dark:border-white/5 space-y-2">
                            <div className="flex items-center justify-between text-sm font-bold">
                              <span className="text-slate-500">مقصد سفر:</span>
                              <span className="text-slate-900 dark:text-white">{activeItinerary.city}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm font-bold">
                              <span className="text-slate-500">اقامتگاه:</span>
                              <span className="text-blue-600 dark:text-blue-400">{selectedHotel.name}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm font-bold pt-2 border-t border-slate-200/60 dark:border-white/5">
                              <span className="text-slate-900 dark:text-white">مبلغ قابل پرداخت:</span>
                              <span className="text-blue-600 dark:text-blue-400 text-sm">
                                {toPersianDigits((grandTotalPackagePrice / 1000000).toFixed(2))} میلیون تومان
                              </span>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <label className="block text-xss font-bold text-slate-700 dark:text-slate-300 mb-1">نام و نام خانوادگی سرپرست:</label>
                              <input
                                type="text"
                                required
                                value={passengerName}
                                onChange={e => setPassengerName(e.target.value)}
                                placeholder="مثلاً: علی محمدی"
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xss font-bold focus:outline-none focus:ring-2 focus:ring-amber-400"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xss font-bold text-slate-700 dark:text-slate-300 mb-1">شماره همراه:</label>
                                <input
                                  type="tel"
                                  required
                                  value={passengerPhone}
                                  onChange={e => setPassengerPhone(e.target.value)}
                                  placeholder="09123456789"
                                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xss font-bold focus:outline-none focus:ring-2 focus:ring-amber-400"
                                />
                              </div>
                              <div>
                                <label className="block text-xss font-bold text-slate-700 dark:text-slate-300 mb-1">کد ملی:</label>
                                <input
                                  type="text"
                                  required
                                  value={passengerNationalId}
                                  onChange={e => setPassengerNationalId(e.target.value)}
                                  placeholder="0012345678"
                                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xss font-bold focus:outline-none focus:ring-2 focus:ring-amber-400"
                                />
                              </div>
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="w-full py-3 bg-amber-400 hover:bg-blue-400 text-slate-950 font-black rounded-xl text-xss transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2"
                          >
                            <Ticket size={16} />
                            <span>تأیید نهایی و صدور بلیت / واچر</span>
                          </button>
                        </form>
                      ) : (
                        <div className="space-y-6 text-center">
                          <div className="w-16 h-16 bg-blue-600/10 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle size={36} />
                          </div>

                          <div>
                            <span className="text-xss bg-blue-600/10 text-blue-600 dark:text-blue-400 font-bold px-3 py-1 rounded-full">
                              رزرو با موفقیت تأیید شد
                            </span>
                            <h3 className="text-lg font-black text-slate-900 dark:text-white mt-2">واچر و بلیت آنلاین صادر گردید</h3>
                            <p className="text-xss text-slate-500 mt-1">اطلاعات بلیت به شماره {passengerPhone} پیامک شد.</p>
                          </div>

                          <div className="p-4 bg-amber-400/10 border border-amber-400/20 rounded-2xl text-right space-y-2">
                            <div className="flex items-center justify-between text-sm font-bold">
                              <span className="text-slate-500">کد پیگیری و واچر:</span>
                              <span className="text-blue-600 dark:text-amber-400 font-mono text-sm">{voucherCode}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm font-bold">
                              <span className="text-slate-500">سرپرست:</span>
                              <span className="text-slate-900 dark:text-white">{passengerName}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm font-bold">
                              <span className="text-slate-500">هتل رزرو شده:</span>
                              <span className="text-blue-600 dark:text-blue-400">{selectedHotel.name}</span>
                            </div>
                          </div>

                          <button
                            onClick={() => setIsBookingModalOpen(false)}
                            className="w-full py-3 bg-slate-900 text-white font-black rounded-xl text-xss cursor-pointer"
                          >
                            بازگشت به برنامه سفر
                          </button>
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </div>
  );
}
