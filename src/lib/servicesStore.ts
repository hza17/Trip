import { Waves, Utensils, Flame, Sparkles } from "lucide-react";

export interface DishItem {
  name: string;
  price: string;
}

export interface RestaurantDefinition {
  name: string;
  cuisine: string;
  hours: string;
  menu: DishItem[];
  rating: string;
  image: string;
  price: string;
}

export interface GenericService {
  id: string;
  name: string;
  type: string;
  hours: string;
  price: string;
  rating: string;
  features: string[];
}

export interface HotelServices {
  hotelId: string;
  hotelName: string;
  restaurant: RestaurantDefinition;
  massage: GenericService;
  pool: GenericService;
  game: GenericService;
}

export interface ServiceBooking {
  id: string;
  hotelId: string;
  hotelName: string;
  serviceId: "restaurant" | "massage" | "pool" | "game" | string;
  serviceTitle: string;
  date: string;
  time: string;
  guests: number;
  price: string;
  isReservation: boolean; // true = with reservation, false = without reservation (instant pass)
  status: string;
}

const DEFAULT_SERVICES: Record<string, HotelServices> = {
  espinas: {
    hotelId: "espinas",
    hotelName: "هتل بین‌المللی اسپیناس پالاس",
    restaurant: {
      name: "رستوران سنتی دیبا",
      cuisine: "ایرانی سنتی و اصیل",
      hours: "۱۲:۰۰ الی ۲۳:۳۰",
      menu: [
        { name: "کباب شیشلیک شاندیز", price: "۴۵۰,۰۰۰" },
        { name: "باقالی پلو با ماهیچه مخصوص", price: "۳۸۰,۰۰۰" },
        { name: "جوجه کباب با استخوان هیزمی", price: "۲۹۰,۰۰۰" },
        { name: "دیزی سنگی تبریزی با ترشی مخصوص", price: "۲۲۰,۰۰۰" }
      ],
      rating: "۴.۸",
      image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=800&auto=format&fit=crop",
      price: "۵۰,۰۰۰" // Booking fee
    },
    massage: {
      id: "massage",
      name: "کلینیک تخصصی اسپا و ماساژ سنگ داغ",
      type: "اسپا و آرامش",
      hours: "۱۰:۰۰ الی ۲۲:۰۰",
      price: "۷۹۰,۰۰۰",
      rating: "۴.۷",
      features: [
        "۶۰ دقیقه ماساژ حرفه‌ای توسط تراپیست بین‌المللی",
        "رایحه‌درمانی با اسانس مریم‌گلی و اسطوخودوس",
        "حمام اختصاصی ترکی و فوم ملل پس از ماساژ",
        "پذیرایی با چای کوهی سنتی در سالن ریلکسیشن"
      ]
    },
    pool: {
      id: "pool",
      name: "مجموعه استخر و جکوزی رویال مروارید",
      type: "ورزشی و تندرستی",
      hours: "۰۸:۰۰ الی ۲۳:۰۰",
      price: "۳۵۰,۰۰۰",
      rating: "۴.۹",
      features: [
        "دسترسی کامل به استخر سرپوشیده لوکس شیشه‌ای",
        "سونا خشک و بخار، جکوزی چندمنظوره با ماساژور آبی",
        "پذیرایی با آبمیوه ارگانیک طبیعی رایگان",
        "حوله و لوازم بهداشتی اختصاصی لوکس"
      ]
    },
    game: {
      id: "game",
      name: "کلوپ بازی و گیم‌لند اختصاصی اسپیناس",
      type: "تفریحی و سرگرمی",
      hours: "۱۴:۰۰ الی ۲۴:۰۰",
      price: "۱۵۰,۰۰۰",
      rating: "۴.۶",
      features: [
        "میزهای بیلیارد کلاسیک و ساید‌بورد اسنوکر",
        "اتاق‌های مخصوص واقعیت مجازی (VR) نسل جدید",
        "کنسول‌های بازی PlayStation 5 با مانیتورهای ۴کی گیمینگ",
        "مجموعه‌ای بی‌نظیر از بردگیم‌ها و بازی‌های فکری ملل"
      ]
    }
  },
  shahan: {
    hotelId: "shahan",
    hotelName: "هتل بزرگ شاهان تهران",
    restaurant: {
      name: "کافه باغ رستوران سنتی شاهان",
      cuisine: "ایرانی و کباب‌های هیزمی",
      hours: "۱۱:۳۰ الی ۲۳:۰۰",
      menu: [
        { name: "کباب کوبیده مخصوص شاهان (دو سیخ)", price: "۲۸۰,۰۰۰" },
        { name: "جوجه کباب زعفرانی بی‌استخوان", price: "۲۱۰,۰۰۰" },
        { name: "خورشت فسنجان با مرغ محلی", price: "۱۹۰,۰۰۰" }
      ],
      rating: "۴.۷",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop",
      price: "۴۰,۰۰۰"
    },
    massage: {
      id: "massage",
      name: "سالن ماساژ سنتی و رفلکسولوژی شاهان",
      type: "سلامت و آرامش",
      hours: "۱۱:۰۰ الی ۲۱:۰۰",
      price: "۶۵۰,۰۰۰",
      rating: "۴.۶",
      features: [
        "۵۰ دقیقه ماساژ رفلکسولوژی پا و کمر",
        "روغن‌های گیاهی ارگانیک بابونه و کنجد",
        "پذیرایی با شربت زعفرانی اصیل پس از اتمام جلسه"
      ]
    },
    pool: {
      id: "pool",
      name: "استخر سرپوشیده و حمام آفتاب بام شاهان",
      type: "تفریحی و آب‌درمانی",
      hours: "۰۹:۰۰ الی ۲۲:۰۰",
      price: "۲۸۰,۰۰۰",
      rating: "۴.۸",
      features: [
        "استخر روباز آب‌گرم در بام هتل با منظره البرز",
        "سونا خشک و بخار فنلاندی",
        "جکوزی آب‌گرم هیدروماساژ"
      ]
    },
    game: {
      id: "game",
      name: "کلوپ پلی‌استیشن و واقعیت مجازی شاهان",
      type: "بازی و تفریح",
      hours: "۱۵:۰۰ الی ۲۳:۳۰",
      price: "۱۲۰,۰۰۰",
      rating: "۴.۵",
      features: [
        "بازی با عینک واقعیت مجازی",
        "شبیه‌ساز حرفه‌ای رانندگی و ریسینگ",
        "بخش فوتبال‌دستی و پینگ‌پنگ"
      ]
    }
  }
};

export function getServicesDb(): Record<string, HotelServices> {
  if (typeof window === "undefined") return DEFAULT_SERVICES;
  try {
    const data = localStorage.getItem("hotels_services_db_v1");
    if (!data) {
      localStorage.setItem("hotels_services_db_v1", JSON.stringify(DEFAULT_SERVICES));
      return DEFAULT_SERVICES;
    }
    return JSON.parse(data);
  } catch (e) {
    return DEFAULT_SERVICES;
  }
}

export function saveServicesDb(db: Record<string, HotelServices>) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("hotels_services_db_v1", JSON.stringify(db));
    window.dispatchEvent(new Event("storage_services_updated"));
  } catch (e) {
    console.error(e);
  }
}

export function updateRestaurantDefinition(hotelId: string, restaurant: RestaurantDefinition) {
  const db = getServicesDb();
  if (db[hotelId]) {
    db[hotelId].restaurant = restaurant;
    saveServicesDb(db);
  }
}

export function updateGenericService(hotelId: string, serviceKey: "massage" | "pool" | "game", service: GenericService) {
  const db = getServicesDb();
  if (db[hotelId]) {
    db[hotelId][serviceKey] = service;
    saveServicesDb(db);
  }
}

export function getReservationsDb(): ServiceBooking[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem("service_bookings_db_v1");
    if (!data) return [];
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

export function saveReservationsDb(bookings: ServiceBooking[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("service_bookings_db_v1", JSON.stringify(bookings));
    window.dispatchEvent(new Event("storage_bookings_updated"));
  } catch (e) {
    console.error(e);
  }
}

export function createServiceBooking(booking: Omit<ServiceBooking, "id" | "status">): ServiceBooking {
  const bookings = getReservationsDb();
  const newBooking: ServiceBooking = {
    ...booking,
    id: `SB-${Math.floor(1000 + Math.random() * 9000)}`,
    status: "تایید شده"
  };
  bookings.push(newBooking);
  saveReservationsDb(bookings);
  return newBooking;
}

export interface CustomService {
  images?: string[];
  id: string;
  hotelId?: string;
  title: string;
  category: string;
  pricePerPerson: number;
  hours: string;
  description: string;
  image: string;
  capacity?: number;
  location?: string;
  features?: string[];
  offerText?: string;
  ctaText?: string;
  serviceCode?: string;
}

const DEFAULT_CUSTOM_SERVICES: CustomService[] = [
  {
    id: "CS-101",
    hotelId: "espinas",
    title: "صبحانه بوفه مجلل در روف‌گاردن هتل",
    category: "رستوران و کافی‌شاپ",
    pricePerPerson: 380000,
    hours: "۰۷:۰۰ الی ۱۰:۳۰",
    description: "بوفه گرم و سرد صبحانه مجلل با انواع نان‌های فرانسوی داغ، آبمیوه‌های طبیعی، کرپ و املت‌های بار زنده با چشم‌انداز البرز.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop",
    capacity: 50,
    location: "روف‌گاردن اصلی هتل",
    features: ["بوفه کاملا آزاد", "املت بار زنده", "موسیقی ملایم صبحگاهی", "پارکینگ اختصاصی رایگان"],
    offerText: "بوفه آزاد صبحانه",
    ctaText: "رزرو بوفه صبحانه",
    serviceCode: "BREAKFAST-LUX"
  },
  {
    id: "CS-102",
    hotelId: "shahan",
    title: "ماساژ درمانی سوئدی و آروماتراپی جفت",
    category: "مجموعه اسپا و ماساژ",
    pricePerPerson: 850000,
    hours: "۱۰:۰۰ الی ۲۳:۰۰",
    description: "تلفیقی بی‌نظیر از تکنیک‌های سوئدی ریلکسیشن و استفاده از اسانس‌های معطر بابونه و اسطوخودوس جهت رفع کامل تنش و استرس.",
    image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=600&auto=format&fit=crop",
    capacity: 10,
    location: "سالن اسپا و ماساژ تخصصی",
    features: ["تراپیست مجرب آقا و خانم", "رایحه‌درمانی تخصصی", "حمام اختصاصی ترکی", "چای گیاهی تندرستی"],
    offerText: "پکیج ریلکسیشن ویژه",
    ctaText: "رزرو اتاق ماساژ",
    serviceCode: "MASSAGE-SWEDISH"
  },
  {
    id: "CS-103",
    hotelId: "espinas",
    title: "بازی‌های واقعیت مجازی (VR) تیمی",
    category: "تفریح و سرگرمی",
    pricePerPerson: 250000,
    hours: "۱۴:۰۰ الی ۲۳:۰۰",
    description: "تجربه هیجان‌انگیز بازی‌های واقعیت مجازی با تجهیزات نسل جدید و بازی‌های گروهی هیجان‌انگیز همراه با دوستان.",
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=600&auto=format&fit=crop",
    capacity: 15,
    location: "کلوپ واقعیت مجازی کلوپ هتل",
    features: ["جدیدترین هدست‌های واقعیت مجازی", "بیش از ۵۰ بازی مختلف", "راهنمای اختصاصی بازی‌ها", "پذیرایی و نوشیدنی سرد"],
    offerText: "بسته هیجان و سرگرمی",
    ctaText: "رزرو بلیت بازی‌ها",
    serviceCode: "GAME-VR-FUN"
  },
  {
    id: "CS-104",
    hotelId: "ocean",
    title: "پرواز با پاراسل تفریحی برفراز آب‌های نیلگون",
    category: "تفریح و سرگرمی",
    pricePerPerson: 490000,
    hours: "۰۹:۰۰ الی ۱۷:۳۰",
    description: "هیجان وصف‌ناپذیر پرواز در ارتفاع ۷۰ متری بر فراز خلیج فارس با چترهای رنگارنگ مدرن، جلیقه نجات پیشرفته و قایق‌های تندروی ایمن.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=600&auto=format&fit=crop",
    capacity: 30,
    location: "کلوپ ساحلی مارینا پارس",
    features: ["بیمه کامل مسئولیت مدنی", "عکاسی و فیلم‌برداری حرفه‌ای هوا با پهپاد", "تجهیزات ایمنی فوق مدرن", "مناسب آقایان و بانوان"],
    offerText: "پرطرفدارترین تفریح کیش",
    ctaText: "رزرو پرواز پاراسل",
    serviceCode: "WATER-PARASEL"
  },
  {
    id: "CS-105",
    hotelId: "ocean",
    title: "غواصی تفریحی اکتشافی در سایت‌های مرجانی",
    category: "تفریح و سرگرمی",
    pricePerPerson: 720000,
    hours: "۰۸:۳۰ الی ۱۶:۰۰",
    description: "کشف دنیای شگفت‌انگیز زیر آب و شنا در کنار ماهیان رنگارنگ استوایی و صخره‌های مرجانی بکر به همراه مربیان بین‌المللی PADI.",
    image: "https://images.unsplash.com/photo-1544551763-8dd44758c2dd?q=80&w=600&auto=format&fit=crop",
    capacity: 12,
    location: "مرکز غواصی جزیره مرجان",
    features: ["آموزش تئوری و عملی قبل شیرجه", "لباس کامل و کپسول هوا درجه یک", "مربی خصوصی و اختصاصی برای هر نفر", "گواهی پایان دوره تفریحی ثبت‌شده"],
    offerText: "ماجراجویی در اعماق دریا",
    ctaText: "رزرو بلیت غواصی",
    serviceCode: "WATER-SCUBA"
  },
  {
    id: "CS-106",
    hotelId: "ocean",
    title: "شاتل و بنانا سواری تیمی پر از آدرنالین",
    category: "تفریح و سرگرمی",
    pricePerPerson: 180000,
    hours: "۰۹:۰۰ الی ۱۸:۰۰",
    description: "سر خوردن فوق‌العاده سریع با سرعت زیاد روی سطح آب دریا با تیوپ‌های شاتل بادی و تجربه دور زدن‌های مارپیچ با قایق موتوری توربو.",
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=600&auto=format&fit=crop",
    capacity: 40,
    location: "کلوپ ساحلی تفریحی مارینا",
    features: ["جلیقه نجات پیشرفته", "کلاه ایمنی ضربه‌گیر", "سرعت‌های قابل تنظیم بر اساس سن", "مناسب گروه‌های ۲ تا ۶ نفره"],
    offerText: "هیجان گروهی با تخفیف ویژه",
    ctaText: "رزرو بلیت شاتل",
    serviceCode: "WATER-SHUTTLE"
  },
  {
    id: "CS-107",
    hotelId: "shahan",
    title: "پیست کارتینگ فرمول یک هیجانی کلوپ",
    category: "تفریح و سرگرمی",
    pricePerPerson: 320000,
    hours: "۱۰:۰۰ الی ۲۴:۰۰",
    description: "راندن ماشین‌های پرشتاب کارتینگ ساخت آلمان در طولانی‌ترین و پیشرفته‌ترین پیست خاورمیانه با سیستم ثبت رکورد الکترونیکی صدم ثانیه.",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=600&auto=format&fit=crop",
    capacity: 25,
    location: "پیست بین‌المللی سرعت غربی",
    features: ["سنجش آنلاین سرعت صدم ثانیه", "کارت سوخت عالی با شتاب سریع", "کلاه ایمنی و دستکش فوم ضدلغزش", "آموزش اولیه رانندگی حرفه‌ای رایگان"],
    offerText: "هیجان و رقابت در سرعت",
    ctaText: "رزرو نوبت کارتینگ",
    serviceCode: "LAND-KARTING"
  }
];

export function getCustomServices(): CustomService[] {
  if (typeof window === "undefined") return DEFAULT_CUSTOM_SERVICES;
  try {
    const data = localStorage.getItem("custom_hotel_services_v1");
    if (!data) {
      localStorage.setItem("custom_hotel_services_v1", JSON.stringify(DEFAULT_CUSTOM_SERVICES));
      return DEFAULT_CUSTOM_SERVICES;
    }
    return JSON.parse(data);
  } catch (e) {
    return DEFAULT_CUSTOM_SERVICES;
  }
}

export function saveCustomServices(services: CustomService[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("custom_hotel_services_v1", JSON.stringify(services));
    window.dispatchEvent(new Event("storage_custom_services_updated"));
  } catch (e) {
    console.error(e);
  }
}

