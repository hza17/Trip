import React, { useState, useEffect } from 'react';
import { 
  Building2, LayoutDashboard, BedDouble, Tags, Receipt, PaintBucket, 
  Users, 
  Calendar, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  Trash2, 
  ShieldAlert, 
  Sparkles, 
  Plus, 
  Search, 
  Check, 
  RefreshCw, 
  Layers, 
  Compass, 
  Settings, 
  AlertCircle, 
  Coffee, 
  Waves, 
  Dumbbell, 
  UserCheck, 
  Key, 
  FileText, 
  ChevronRight, 
  CheckSquare, 
  Square, 
  Edit3, 
  BarChart3, 
  TrendingUp, 
  Info, 
  UserX, 
  UserPlus, 
  Sliders,
  X,
  FileCheck,
  Percent,
  Filter,
  Coins,
  ArrowLeft,
  Globe,
  Star,
  Headphones,
  MessageSquare,
  ExternalLink,
  Lock,
  Unlock,
  Copy,
  Send,
  Zap,
  Award,
  Menu,
  ChevronDown,
  ShieldCheck,
  Share2,
  Eye,
  HelpCircle
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { cn } from '@/lib/utils';
import { HotelRegistrationWizard } from '../HotelRegistrationWizard';

// ErrorBoundary for safe rendering of charts under React 19 / Iframe sandbox constraints
class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.warn("Chart Error Boundary caught an exception:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-slate-50 dark:bg-slate-900/10 rounded-2xl border border-slate-200/40 dark:border-slate-800/40">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400">نمودار زنده به دلیل محدودیت مرورگر قابل نمایش نیست.</p>
          <span className="text-[10px] text-slate-400 font-bold mt-1">کلیه آمارهای مالی و رزرواسیون کماکان همگام هستند.</span>
        </div>
      );
    }
    return this.props.children;
  }
}

// Types for Hotel Dashboard
interface HotelRoom {
  id: string;
  number: string;
  type: 'Single' | 'Double' | 'Suite' | 'Penthouse';
  typeLabel: string;
  floor: number;
  status: 'Vacant' | 'Occupied' | 'Reserved' | 'Maintenance';
  cleanStatus: 'Clean' | 'Dirty' | 'InCleaning';
  pricePerNight: number;
  features: string[];
  currentGuest?: {
    name: string;
    phone: string;
    checkIn: string;
    checkOut: string;
    nights: number;
    totalAmount: number;
    voucher: string;
    nationalId: string;
    extraServices: { label: string; price: number }[];
  };
}

interface Housekeeper {
  id: string;
  name: string;
  status: 'Active' | 'OnBreak' | 'Finished';
  assignedRooms: string[];
}

interface CleaningTask {
  roomId: string;
  housekeeperId: string;
  checklist: {
    linen: boolean;
    bathroom: boolean;
    minibar: boolean;
    dusting: boolean;
  };
  notes: string;
}

// Initial Preset Data
const INITIAL_ROOMS: HotelRoom[] = [
  // Floor 1
  {
    id: 'r101',
    number: '۱۰۱',
    type: 'Double',
    typeLabel: 'اتاق دبل استاندارد',
    floor: 1,
    status: 'Occupied',
    cleanStatus: 'Clean',
    pricePerNight: 28000000, // Rial
    features: ['۲ تخت دبل', 'باکس چای', 'مینی‌بار رایگان', 'اینترنت پرسرعت'],
    currentGuest: {
      name: 'کیوان خسروی',
      phone: '۰۹۱۲۳۴۵۶۷۸۹',
      nationalId: '۰۰۱۲۳۴۵۶۷۸',
      checkIn: '۱۴۰۵/۰۴/۲۴',
      checkOut: '۱۴۰۵/۰۴/۲۷',
      nights: 3,
      totalAmount: 84000000,
      voucher: 'HTL-941',
      extraServices: [
        { label: 'رستوران و کافی‌شاپ لابی', price: 4500000 },
        { label: 'سرویس لاندری', price: 1200000 }
      ]
    }
  },
  {
    id: 'r102',
    number: '۱۰۲',
    type: 'Double',
    typeLabel: 'اتاق دبل استاندارد',
    floor: 1,
    status: 'Vacant',
    cleanStatus: 'Dirty',
    pricePerNight: 28000000,
    features: ['۲ تخت دبل', 'تراس رو به محوطه', 'چای‌ساز برقی']
  },
  {
    id: 'r103',
    number: '۱۰۳',
    type: 'Single',
    typeLabel: 'اتاق سینگل اقتصادی',
    floor: 1,
    status: 'Vacant',
    cleanStatus: 'Clean',
    pricePerNight: 18000000,
    features: ['۱ تخت سینگل', 'بخش تحریر', 'چای‌ساز برقی']
  },
  {
    id: 'r104',
    number: '۱۰۴',
    type: 'Double',
    typeLabel: 'اتاق دبل کوزی',
    floor: 1,
    status: 'Reserved',
    cleanStatus: 'Clean',
    pricePerNight: 29500000,
    features: ['۲ تخت دبل', 'سیستم صوتی بوز', 'مینی‌بار مدرن']
  },
  // Floor 2
  {
    id: 'r201',
    number: '۲۰۱',
    type: 'Double',
    typeLabel: 'اتاق دبل تراس‌دار لوکس',
    floor: 2,
    status: 'Occupied',
    cleanStatus: 'Clean',
    pricePerNight: 35000000,
    features: ['۲ تخت دبل لارج', 'تراس سرتاسری رو به دریا', 'وان جکوزی کوچک'],
    currentGuest: {
      name: 'مریم علیزاده',
      phone: '۰۹۱۸۷۶۵۴۳۲۱',
      nationalId: '۱۲۳۴۵۶۷۸۹۰',
      checkIn: '۱۴۰۵/۰۴/۲۵',
      checkOut: '۱۴۰۵/۰۴/۲۹',
      nights: 4,
      totalAmount: 140000000,
      voucher: 'HTL-812',
      extraServices: [
        { label: 'کلوپ تفریحی مریم', price: 8000000 }
      ]
    }
  },
  {
    id: 'r202',
    number: '۲۰۲',
    type: 'Double',
    typeLabel: 'اتاق دبل تراس‌دار لوکس',
    floor: 2,
    status: 'Vacant',
    cleanStatus: 'Clean',
    pricePerNight: 35000000,
    features: ['۲ تخت دبل لارج', 'تراس سرتاسری رو به دریا', 'وان جکوزی کوچک']
  },
  {
    id: 'r203',
    number: '۲۰۳',
    type: 'Suite',
    typeLabel: 'سوئیت خانوادگی تریپل',
    floor: 2,
    status: 'Maintenance',
    cleanStatus: 'Dirty',
    pricePerNight: 49000000,
    features: ['۳ تخت استاندارد', 'سالن نشیمن مجهز', 'آشپزخانه سرد پنتری']
  },
  {
    id: 'r204',
    number: '۲۰۴',
    type: 'Suite',
    typeLabel: 'سوئیت خانوادگی تریپل',
    floor: 2,
    status: 'Occupied',
    cleanStatus: 'Clean',
    pricePerNight: 49000000,
    features: ['۳ تخت استاندارد', 'سالن نشیمن مجهز', 'آشپزخانه سرد پنتری'],
    currentGuest: {
      name: 'دکتر بهرامی',
      phone: '۰۹۱۵۲۲۲۴۴۶۶',
      nationalId: '۳۹۹۸۸۷۷۶۶۵',
      checkIn: '۱۴۰۵/۰۴/۲۶',
      checkOut: '۱۴۰۵/۰۴/۳۰',
      nights: 4,
      totalAmount: 196000000,
      voucher: 'HTL-225',
      extraServices: []
    }
  },
  // Floor 3
  {
    id: 'r301',
    number: '۳۰۱',
    type: 'Suite',
    typeLabel: 'سوئیت رویال کوهستان',
    floor: 3,
    status: 'Vacant',
    cleanStatus: 'InCleaning',
    pricePerNight: 55000000,
    features: ['۲ تخت کینگ‌سایز', 'چشم‌انداز مرتفع البرز', 'مینی‌بار پریمیوم']
  },
  {
    id: 'r302',
    number: '۳۰۲',
    type: 'Suite',
    typeLabel: 'سوئیت رویال کوهستان',
    floor: 3,
    status: 'Occupied',
    cleanStatus: 'Clean',
    pricePerNight: 55000000,
    features: ['۲ تخت کینگ‌سایز', 'چشم‌انداز مرتفع البرز', 'مینی‌بار پریمیوم'],
    currentGuest: {
      name: 'سجاد رضایی',
      phone: '۰۹۳۷۴۴۴۵۵۶۶',
      nationalId: '۰۰۲۲۴۴۶۶۸۸',
      checkIn: '۱۴۰۵/۰۴/۲۶',
      checkOut: '۱۴۰۵/۰۴/۲۸',
      nights: 2,
      totalAmount: 110000000,
      voucher: 'HTL-432',
      extraServices: [
        { label: 'خدمات اسپا و ماساژ لایف', price: 5000000 },
        { label: 'شارژ بار لوکس', price: 2500000 }
      ]
    }
  },
  {
    id: 'r303',
    number: '۳۰۳',
    type: 'Suite',
    typeLabel: 'سوئیت امپریال لندمارک',
    floor: 3,
    status: 'Vacant',
    cleanStatus: 'Clean',
    pricePerNight: 68000000,
    features: ['۱ تخت رویال کینگ', 'تراس باربیکیو اختصاصی', 'قهوه‌ساز نسپرسو لایو']
  },
  // Floor 4 (Penthouse)
  {
    id: 'r401',
    number: '۴۰۱',
    type: 'Penthouse',
    typeLabel: 'پنت‌هاوس پرزیدنتال',
    floor: 4,
    status: 'Occupied',
    cleanStatus: 'Clean',
    pricePerNight: 95000000,
    features: ['جکوزی اختصاصی در ارتفاع', 'آشپزخانه فول فرنیش', 'میز بیلیارد و بار لوکس', 'شومینه شیشه‌ای'],
    currentGuest: {
      name: 'مهندس جاوید',
      phone: '۰۹۱۲۹۹۹۸۸۷۷',
      nationalId: '۰۰۱۱۲۲۳۳۴۴',
      checkIn: '۱۴۰۵/۰۴/۲۳',
      checkOut: '۱۴۰۵/۰۴/۲۷',
      nights: 4,
      totalAmount: 380000000,
      voucher: 'HTL-101',
      extraServices: [
        { label: 'ترانسفر تشریفاتی با تسلا', price: 15000000 },
        { label: 'رستوران مجلل گردان', price: 12000000 },
        { label: 'خدمات بیوتی اسپا اختصاصی', price: 9000000 }
      ]
    }
  },
  {
    id: 'r402',
    number: '۴۰۲',
    type: 'Penthouse',
    typeLabel: 'پنت‌هاوس استخر اختصاصی',
    floor: 4,
    status: 'Vacant',
    cleanStatus: 'Dirty',
    pricePerNight: 120000000,
    features: ['استخر اختصاصی لبه شیشه‌ای', '۲ خواب مستر کینگ', 'خدمات باتلر ۲۴ ساعته']
  }
];

const INITIAL_HOUSEKEEPERS: Housekeeper[] = [
  { id: 'hk1', name: 'سمیه رضایی (سرپرست طبقات)', status: 'Active', assignedRooms: ['۱۰۲', '۲۰۳'] },
  { id: 'hk2', name: 'زهرا احمدی (پرسنل رده لوکس)', status: 'Active', assignedRooms: ['۳۰۱', '۴۰۲'] },
  { id: 'hk3', name: 'علی اصغری (تکنسین فنی و نگهداری)', status: 'Active', assignedRooms: ['۲۰۳'] }
];

const INITIAL_TASKS: CleaningTask[] = [
  {
    roomId: '۱۰۲',
    housekeeperId: 'hk1',
    checklist: { linen: false, bathroom: true, minibar: false, dusting: true },
    notes: 'نیاز به تعویض حوله حمام دبل دارد'
  },
  {
    roomId: '۳۰۱',
    housekeeperId: 'hk2',
    checklist: { linen: true, bathroom: false, minibar: false, dusting: false },
    notes: 'تخت باید آراسته شود'
  }
];

const CHARTS_REVENUE_DATA = [
  { name: 'شنبه', revenue: 450, occupancy: 65 },
  { name: 'یکشنبه', revenue: 480, occupancy: 70 },
  { name: 'دوشنبه', revenue: 510, occupancy: 75 },
  { name: 'سه‌شنبه', revenue: 490, occupancy: 72 },
  { name: 'چهارشنبه', revenue: 620, occupancy: 85 },
  { name: 'پنجشنبه', revenue: 840, occupancy: 95 },
  { name: 'جمعه', revenue: 950, occupancy: 98 }
];

const ROOM_PIE_DATA = [
  { name: 'اشغال شده', value: 5, color: '#3b82f6' },
  { name: 'آماده و خالی', value: 6, color: '#10b981' },
  { name: 'در حال نظافت', value: 1, color: '#f59e0b' },
  { name: 'نیاز به تعمیر', value: 2, color: '#ef4444' }
];

import { Business } from './types';

interface HotelPremiumDashboardProps {
  business: Business;
  onUpdateRevenue?: (id: string, newRevenue: number) => void;
  onUpdateBusiness?: (business: Business) => void;
}

export function HotelPremiumDashboard({ business, onUpdateRevenue, onUpdateBusiness }: HotelPremiumDashboardProps) {
  const [activeTab, setActiveTab] = useState<
    | 'overview' 
    | 'calendar'
    | 'inventory' 
    | 'pricing' 
    | 'services-management' 
    | 'housekeeping' 
    | 'finance'
    | 'policies'
  >('overview');
  const [showOnboardingWizard, setShowOnboardingWizard] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Policies State
  const [policies, setPolicies] = useState({
    checkInTime: '۱۴:۰۰',
    checkOutTime: '۱۲:۰۰',
    cancellationPolicy: 'moderate',
    petPolicy: false,
    partyAllowed: false,
    extraPersonPrice: '800,000',
    depositRequired: true
  });

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Pricing & Stop Sell States
  const [stopSellAll, setStopSellAll] = useState(false);
  const [stopSellDates, setStopSellDates] = useState<string[]>([]);
  const [bulkPriceInput, setBulkPriceInput] = useState<string>('');
  const [bulkPriceType, setBulkPriceType] = useState<'all' | 'weekends'>('all');

  // Services State
  const [servicesList, setServicesList] = useState([
    { id: 's1', label: 'بوفه سلف‌سرویس صبحانه لابی', category: 'رستوران و کافی‌شاپ', price: 2000000, capacity: 50 },
    { id: 's2', label: 'کارت طلایی اسپا و آب‌درمانی', category: 'مجموعه ورزشی و اسپا', price: 4000000, capacity: 15 },
    { id: 's3', label: 'ترانسفر تشریفاتی با لیموزین کلوپ', category: 'خدمات تفریحی و تور', price: 6000000, capacity: 4 }
  ]);

  // Service definition Form States
  const [newSrvTitle, setNewSrvTitle] = useState('');
  const [newSrvCategory, setNewSrvCategory] = useState('رستوران و کافی‌شاپ');
  const [newSrvPrice, setNewSrvPrice] = useState('');
  const [newSrvCapacity, setNewSrvCapacity] = useState('10');

  // Add Room Modals State
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const [isAddRoomTypeOpen, setIsAddRoomTypeOpen] = useState(false);

  // New Room Form States
  const [newRoomNum, setNewRoomNum] = useState('');
  const [newRoomCategory, setNewRoomCategory] = useState('Double');
  const [newRoomFloor, setNewRoomFloor] = useState('1');
  const [roomSearchQuery, setRoomSearchQuery] = useState('');

  // New Room Category Form States
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategorySize, setNewCategorySize] = useState('');
  const [newCategoryBeds, setNewCategoryBeds] = useState('');
  const [newCategoryPrice, setNewCategoryPrice] = useState('');
  const [newCategoryDesc, setNewCategoryDesc] = useState('');

  // Transactions State
  const [transactions, setTransactions] = useState([
    { id: 'TXN-101', desc: 'شارژ پذیرش اتاق ۱۰۱ - کیوان خسروی', room: '۱۰۱', date: '۱۴۰۵/۰۴/۲۴', type: 'online', amount: 84000000, commission: 8400000 },
    { id: 'TXN-102', desc: 'خرید خدمت طلایی اسپا - مریم علیزاده', room: '۲۰۱', date: '۱۴۰۵/۰۴/۲۵', type: 'paya', amount: 8000000, commission: 800000 },
    { id: 'TXN-103', desc: 'شارژ بابت تمدید اقامت - دکتر بهرامی', room: '۲۰۴', date: '۱۴۰۵/۰۴/۲۶', type: 'card', amount: 196000000, commission: 19600000 }
  ]);

  // Room/PMS States
  const [rooms, setRooms] = useState<HotelRoom[]>(INITIAL_ROOMS);
  const [roomsData, setRoomsData] = useState([
    {
      id: "r1",
      type: "اتاق دبل استاندارد (رو به شهر)",
      size: "۲۴",
      beds: "۱ تخت کینگ",
      price: 4960000,
      status: "active",
      description: "اتاقی با طراحی مدرن و چشم‌انداز زیبای شهر، مناسب برای زوج‌ها."
    },
    {
      id: "r2",
      type: "سوئیت جونیور مجلل",
      size: "۳۶",
      beds: "۲ تخت دبل استاندارد",
      price: 8200000,
      status: "active",
      description: "دارای فضای نشیمن مجزا و امکانات ویژه"
    }
  ]);

  const [guestOrders, setGuestOrders] = useState([
    {
      id: "G-1001",
      name: "علیرضا مرادی",
      room: "۱۰۲",
      checkIn: "۱۴۰۲/۰۴/۱۲",
      checkOut: "۱۴۰۲/۰۴/۱۵",
      status: "in-house",
      debt: 450000,
      type: "VIP",
      nights: 3,
      pax: 2
    },
    {
      id: "G-1002",
      name: "مینا رضایی",
      room: "۱۰۵",
      checkIn: "۱۴۰۲/۰۴/۱۲",
      checkOut: "۱۴۰۲/۰۴/۱۴",
      status: "departure",
      debt: 0,
      type: "Standard",
      nights: 2,
      pax: 1
    }
  ]);

  const [housekeepers, setHousekeepers] = useState<Housekeeper[]>(INITIAL_HOUSEKEEPERS);
  const [housekeepingTasks, setHousekeepingTasks] = useState<CleaningTask[]>(INITIAL_TASKS);

  // Selected & Modal States
  const [selectedRoom, setSelectedRoom] = useState<HotelRoom | null>(null);
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [checkInRoom, setCheckInRoom] = useState<HotelRoom | null>(null);
  const [isHkAssignOpen, setIsHkAssignOpen] = useState(false);
  const [hkAssignRoom, setHkAssignRoom] = useState<HotelRoom | null>(null);
  const [hkSelectedStaff, setHkSelectedStaff] = useState('hk1');
  const [hkNotes, setHkNotes] = useState('');

  // Check In Form Fields State
  const [checkInName, setCheckInName] = useState('');
  const [checkInPhone, setCheckInPhone] = useState('');
  const [checkInNId, setCheckInNId] = useState('');
  const [checkInNights, setCheckInNights] = useState(1);
  const [checkInExtras, setCheckInExtras] = useState<string[]>([]);

  // Live Derived Statistics
  const occupiedRooms = rooms.filter(r => r.status === 'Occupied' && r.currentGuest);
  const currentTotalRevenue = occupiedRooms.reduce((acc, r) => acc + (r.currentGuest?.totalAmount || 0), 0);
  const occupancyRate = rooms.length > 0 ? Math.round((occupiedRooms.length / rooms.length) * 100) : 0;
  const cleaningRoomsCount = rooms.filter(r => r.cleanStatus === 'Dirty' || r.cleanStatus === 'InCleaning').length;
  const totalRoomsCount = rooms.length;
  const vacantRoomsCount = rooms.filter(r => r.status === 'Vacant').length;

  // Handlers
  const handleToggleMaintenance = (roomId: string) => {
    setRooms(prev => prev.map(r => r.id === roomId ? {
      ...r,
      status: r.status === 'Maintenance' ? 'Vacant' : 'Maintenance'
    } : r));
    setSelectedRoom(prev => prev && prev.id === roomId ? {
      ...prev,
      status: prev.status === 'Maintenance' ? 'Vacant' : 'Maintenance'
    } : prev);
  };

  const handleToggleRoomCleanState = (roomId: string) => {
    const cleanCycle: Record<string, 'Clean' | 'Dirty' | 'InCleaning'> = {
      'Clean': 'Dirty',
      'Dirty': 'InCleaning',
      'InCleaning': 'Clean'
    };
    setRooms(prev => prev.map(r => r.id === roomId ? {
      ...r,
      cleanStatus: cleanCycle[r.cleanStatus] || 'Clean'
    } : r));
    setSelectedRoom(prev => prev && prev.id === roomId ? {
      ...prev,
      cleanStatus: cleanCycle[prev.cleanStatus] || 'Clean'
    } : prev);
  };

  const handleCheckOut = (roomId: string) => {
    const roomToCheckOut = rooms.find(r => r.id === roomId);
    if (roomToCheckOut && roomToCheckOut.currentGuest) {
      const g = roomToCheckOut.currentGuest;
      const extrasTotal = g.extraServices.reduce((sum, s) => sum + s.price, 0);
      const invoiceTotal = g.totalAmount + extrasTotal;
      
      // Add transaction
      const newTxn = {
        id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
        desc: `تسویه نهایی پذیرش اتاق ${roomToCheckOut.number} - ${g.name}`,
        room: roomToCheckOut.number,
        date: '۱۴۰۵/۰۴/۲۶',
        type: 'online',
        amount: invoiceTotal,
        commission: Math.round(invoiceTotal * 0.1)
      };
      setTransactions(prev => [newTxn, ...prev]);

      // Update business revenue if possible!
      if (onUpdateRevenue && business?.id) {
        onUpdateRevenue(business.id, (business.revenue || 0) + invoiceTotal);
      }

      setToastMessage(`مسافر اتاق ${roomToCheckOut.number} (${g.name}) با موفقیت تسویه حساب و خارج شد. کل مبلغ دریافتی: ${invoiceTotal.toLocaleString()} ریال`);
    }

    setRooms(prev => prev.map(r => r.id === roomId ? {
      ...r,
      status: 'Vacant',
      cleanStatus: 'Dirty',
      currentGuest: undefined
    } : r));
    setSelectedRoom(prev => prev && prev.id === roomId ? {
      ...prev,
      status: 'Vacant',
      cleanStatus: 'Dirty',
      currentGuest: undefined
    } : prev);
  };

  const getCalculatedPrice = (roomOrPrice: HotelRoom | number | null, nights?: number) => {
    if (!roomOrPrice) return 0;
    if (typeof roomOrPrice === 'number') {
      return roomOrPrice;
    }
    const pricePerNight = roomOrPrice.pricePerNight;
    return pricePerNight * (nights || 1);
  };

  const EXTRA_SERVICES_MAP: Record<string, { label: string; price: number }> = {
    'spa': { label: 'کارت طلایی اسپا', price: 4000000 },
    'breakfast': { label: 'بوفه سلف‌سرویس صبحانه', price: 2000000 },
    'transfer': { label: 'ترانسفر تشریفاتی', price: 6000000 }
  };

  const handleCheckInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkInRoom) return;
    const price = getCalculatedPrice(checkInRoom, checkInNights);
    const guestExtras = checkInExtras.map(id => EXTRA_SERVICES_MAP[id]).filter(Boolean);
    const newGuest = {
      name: checkInName,
      phone: checkInPhone,
      nationalId: checkInNId,
      checkIn: '۱۴۰۵/۰۴/۲۶',
      checkOut: '۱۴۰۵/۰۴/۲۹',
      nights: checkInNights,
      totalAmount: price,
      voucher: `HTL-${Math.floor(100 + Math.random() * 900)}`,
      extraServices: guestExtras
    };
    
    // Add transaction for the initial booking
    const initialAmount = price + guestExtras.reduce((sum, s) => sum + s.price, 0);
    const newTxn = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      desc: `پذیرش جدید اتاق ${checkInRoom.number} - ${checkInName}`,
      room: checkInRoom.number,
      date: '۱۴۰۵/۰۴/۲۶',
      type: 'online',
      amount: initialAmount,
      commission: Math.round(initialAmount * 0.1)
    };
    setTransactions(prev => [newTxn, ...prev]);

    // Also add to guestOrders list so it shows in "orders" tab!
    const newOrder = {
      id: newGuest.voucher,
      name: checkInName,
      room: checkInRoom.number,
      checkIn: '۱۴۰۵/۰۴/۲۶',
      checkOut: '۱۴۰۵/۰۴/۲۹',
      status: 'in-house',
      debt: 0,
      type: checkInRoom.type === 'Suite' || checkInRoom.type === 'Penthouse' ? 'VIP' : 'Standard',
      nights: checkInNights,
      pax: 2
    };
    setGuestOrders(prev => [newOrder, ...prev]);

    setRooms(prev => prev.map(r => r.id === checkInRoom.id ? {
      ...r,
      status: 'Occupied',
      cleanStatus: 'Clean',
      currentGuest: newGuest
    } : r));
    
    setToastMessage(`پذیرش اتاق ${checkInRoom.number} برای ${checkInName} با موفقیت ثبت شد.`);
    setIsCheckInOpen(false);
    setCheckInRoom(null);
    setCheckInName('');
    setCheckInPhone('');
    setCheckInNId('');
    setCheckInNights(1);
    setCheckInExtras([]);
  };

  const handleAssignHkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hkAssignRoom) return;
    const newTask: CleaningTask = {
      roomId: hkAssignRoom.number,
      housekeeperId: hkSelectedStaff,
      checklist: { linen: false, bathroom: false, minibar: false, dusting: false },
      notes: hkNotes || 'نظافت روتین استاندارد'
    };
    setHousekeepingTasks(prev => [...prev, newTask]);
    setRooms(prev => prev.map(r => r.id === hkAssignRoom.id ? {
      ...r,
      cleanStatus: 'InCleaning'
    } : r));
    
    const staffName = housekeepers.find(h => h.id === hkSelectedStaff)?.name || 'پرسنل';
    setToastMessage(`ماموریت نظافت اتاق ${hkAssignRoom.number} به ${staffName} ارجاع داده شد.`);
    setIsHkAssignOpen(false);
    setHkAssignRoom(null);
    setHkNotes('');
  };

  const handleCreateServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSrvTitle || !newSrvPrice) {
      setToastMessage("لطفاً عنوان خدمت و قیمت را وارد کنید.");
      return;
    }
    const newService = {
      id: `s-${Math.floor(100 + Math.random() * 900)}`,
      label: newSrvTitle,
      category: newSrvCategory,
      price: Number(newSrvPrice),
      capacity: Number(newSrvCapacity)
    };
    setServicesList(prev => [...prev, newService]);
    setToastMessage(`خدمت جدید "${newSrvTitle}" با موفقیت تعریف و فعال گردید.`);
    setNewSrvTitle('');
    setNewSrvPrice('');
    setNewSrvCapacity('10');
  };

  const handleCreateRoomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomNum) {
      setToastMessage("لطفاً شماره اتاق را وارد کنید.");
      return;
    }
    const exists = rooms.some(r => r.number === newRoomNum);
    if (exists) {
      setToastMessage(`خطا: اتاق شماره ${newRoomNum} از قبل تعریف شده است.`);
      return;
    }
    const categoryLabels: Record<string, string> = {
      'Double': 'اتاق دبل استاندارد (رو به شهر)',
      'Suite': 'سوئیت جونیور مجلل',
      'Twin': 'اتاق توئین لوکس',
      'Penthouse': 'سوئیت رویال مجلل'
    };
    const newPhysicalRoom: HotelRoom = {
      id: `r_new_${Date.now()}`,
      number: newRoomNum,
      type: newRoomCategory as any,
      typeLabel: categoryLabels[newRoomCategory] || 'اتاق استاندارد',
      floor: Number(newRoomFloor),
      status: 'Vacant',
      cleanStatus: 'Clean',
      pricePerNight: newRoomCategory === 'Suite' ? 8200000 : 4960000,
      features: ['وای‌فای رایگان', 'تهویه مطبوع', 'مینی‌بار'],
    };
    setRooms(prev => [...prev, newPhysicalRoom]);
    setToastMessage(`اتاق فیزیکی شماره ${newRoomNum} با موفقیت در طبقه ${newRoomFloor} تعریف گردید.`);
    setIsAddRoomOpen(false);
    setNewRoomNum('');
  };

  const handleCreateRoomTypeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName || !newCategoryPrice) {
      setToastMessage("لطفاً تمامی موارد ستاره‌دار را تکمیل کنید.");
      return;
    }
    
    // Support commas, Persian digits, and other characters
    const toEnglishDigits = (str: string) => {
      return str.replace(/[۰-۹]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1776))
                .replace(/[٠-٩]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1632));
    };

    const cleanPriceStr = toEnglishDigits(String(newCategoryPrice)).replace(/[^0-9]/g, '');
    const parsedPrice = Number(cleanPriceStr);

    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setToastMessage("لطفاً قیمت معتبر وارد کنید.");
      return;
    }

    const newClass = {
      id: `r_class_${Date.now()}`,
      type: newCategoryName,
      size: newCategorySize || '۲۵',
      beds: newCategoryBeds || '۱ تخت کینگ',
      price: parsedPrice,
      status: 'active',
      description: newCategoryDesc || 'کلاس اقامتی مجلل با طراحی مدرن و تجهیزات لوکس.'
    };
    setRoomsData(prev => [...prev, newClass]);
    setToastMessage(`کلاس اقامتی "${newCategoryName}" با موفقیت تعریف و فعال شد.`);
    setIsAddRoomTypeOpen(false);
    setNewCategoryName('');
    setNewCategorySize('');
    setNewCategoryBeds('');
    setNewCategoryPrice('');
    setNewCategoryDesc('');
  };

  const handleTogglePanicStopSell = () => {
    const newState = !stopSellAll;
    setStopSellAll(newState);
    if (newState) {
      setToastMessage("هشدار: کلیه کانال‌های رزرو آنلاین فوراً مسدود شدند (Stop Sell فعال شد).");
    } else {
      setToastMessage("وضعیت قرمز برطرف شد. کانال‌های رزرو مجدداً فعال گردیدند.");
    }
  };

  const handleBulkPriceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkPriceInput) {
      setToastMessage("لطفاً قیمت جدید را وارد نمایید.");
      return;
    }
    const val = Number(bulkPriceInput);
    if (isNaN(val) || val <= 0) {
      setToastMessage("لطفاً یک قیمت معتبر وارد کنید.");
      return;
    }
    
    // Update roomsData prices
    setRoomsData(prev => prev.map(r => {
      return {
        ...r,
        price: r.id === 'r1' ? val : Math.round(val * 1.65) // Scale other categories proportionally
      };
    }));

    setToastMessage(`قیمت‌گذاری گروهی با موفقیت اعمال گردید.`);
    setBulkPriceInput('');
  };

  const handleToggleDateStopSell = (dateName: string) => {
    setStopSellDates(prev => {
      const exists = prev.includes(dateName);
      if (exists) {
        setToastMessage(`فروش برای تاریخ ${dateName} مجدداً باز شد.`);
        return prev.filter(d => d !== dateName);
      } else {
        setToastMessage(`فروش برای تاریخ ${dateName} بسته شد (Stop Sell).`);
        return [...prev, dateName];
      }
    });
  };
  
  return (
    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl w-full h-[calc(100vh-140px)] min-h-[600px] flex overflow-hidden shadow-2xl border border-slate-200/50 dark:border-slate-800/50 flex-col md:flex-row text-right rounded-[2rem] relative" dir="rtl">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] text-xs font-bold text-[#e05307] dark:text-blue-400 flex items-center gap-2 bg-blue-50/95 dark:bg-slate-950/95 backdrop-blur-md p-4 rounded-2xl border border-blue-50/50 dark:border-blue-700/50 shadow-2xl animate-in fade-in slide-in-from-top-4">
          <CheckCircle size={14} className="shrink-0 text-emerald-500" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Desktop & Mobile Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-gradient-to-b from-[#0b0f24] to-[#060814] text-slate-300 p-4 md:p-5 flex flex-col shrink-0 border-b md:border-b-0 md:border-l border-slate-900/80 backdrop-blur-md">
        
        {/* Header Branding */}
        <div className="flex items-center justify-between mb-3 md:mb-5 border-b border-slate-800/40 pb-3 md:pb-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-600 to-[#e05307] p-2 rounded-xl text-white shadow-md shadow-blue-600/10 shrink-0">
              <Building2 size={18}/>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-xs font-bold tracking-wide text-slate-100">{business?.name || 'مدیریت اقامتگاه'}</span>
              <span className="text-[9px] font-bold text-[#e05307] block mt-0.5">سیستم یکپارچه PMS & OTAs</span>
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-xl bg-slate-800/80 text-blue-400 border border-slate-700/50 flex items-center gap-1 text-xs font-bold cursor-pointer hover:bg-slate-800"
          >
            <Menu size={16} />
            <span>بخش‌ها</span>
          </button>
        </div>

        {/* Horizontal Quick Pill Scroll Bar for Mobile */}
        <div className="flex md:hidden overflow-x-auto gap-2 pb-2 scrollbar-none w-full border-b border-slate-800/40 mb-2">
          {[
            { id: 'overview', label: 'آمار', icon: LayoutDashboard },
            { id: 'calendar', label: 'تقویم', icon: Calendar },
            { id: 'inventory', label: 'اتاق‌ها', icon: BedDouble },
            { id: 'pricing', label: 'قیمت‌گذاری', icon: Tags },
            { id: 'services-management', label: 'خدمات', icon: Coffee },
            { id: 'housekeeping', label: 'خانه‌داری', icon: PaintBucket },
            { id: 'finance', label: 'مالی', icon: FileText },
            { id: 'policies', label: 'قوانین', icon: ShieldCheck }
          ].map(p => {
            const IconComp = p.icon;
            const isActive = activeTab === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActiveTab(p.id as any)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition cursor-pointer shrink-0 border",
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-[#e05307] text-white border-blue-400 shadow-md shadow-blue-700/40"
                    : "bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                <IconComp size={13} />
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>

        {/* Categorized Vertical Sidebar Items for Desktop */}
        <div className="hidden md:flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-1 pl-1 flex-1">
          {[
            {
              title: 'عملیات اصلی PMS',
              items: [
                { id: 'overview' as const, label: 'داشبورد آمار عملکرد', icon: LayoutDashboard },
                { id: 'calendar' as const, label: 'تقویم نرخ و ظرفیت زنده', icon: Calendar, badge: 'جدید' },
                { id: 'inventory' as const, label: 'مدیریت اتاق‌ها و PMS', icon: BedDouble },
                { id: 'pricing' as const, label: 'قیمت‌گذاری داینامیک', icon: Tags },
              ]
            },
            {
              title: 'مدیریت و خدمات',
              items: [
                { id: 'services-management' as const, label: 'تعریف و مدیریت خدمات', icon: Coffee },
                { id: 'housekeeping' as const, label: 'مدیریت خانه‌داری', icon: PaintBucket },
                { id: 'finance' as const, label: 'امور مالی و تسویه‌حساب', icon: FileText },
                { id: 'policies' as const, label: 'قوانین و مقررات اقامتگاه', icon: ShieldCheck },
              ]
            }
          ].map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-1">
                {group.title}
              </div>
              {group.items.map(item => {
                const ItemIcon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={cn(
                      "w-full flex items-center justify-between text-right p-2.5 rounded-xl transition-all duration-200 font-bold cursor-pointer border-r-4 group text-xs",
                      isActive
                        ? "bg-gradient-to-r from-blue-600/10 to-[#e05307]/20 text-white border-[#e05307] shadow-md shadow-blue-700/20"
                        : "hover:bg-slate-900/60 hover:text-white hover:translate-x-[-2px] text-slate-400 border-transparent"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <ItemIcon size={15} className={isActive ? "text-[#f85c13]" : "text-slate-500 group-hover:text-slate-300 transition-colors"} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={cn(
                        "text-[8px] font-bold px-1.5 py-0.5 rounded-full shrink-0",
                        isActive ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400"
                      )}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </aside>

      {/* Mobile Full Menu Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[250] bg-slate-950/80 backdrop-blur-md flex justify-start md:hidden animate-in fade-in" dir="rtl">
          <div className="w-4/5 max-w-xs bg-[#0b0f24] border-l border-slate-800 h-full p-5 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="bg-gradient-to-br from-blue-600 to-[#e05307] p-2 rounded-xl text-white">
                    <Building2 size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{business?.name || 'اقامتگاه'}</div>
                    <div className="text-[9px] font-bold text-blue-400">منوی کامل بخش‌ها</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-5">
                {[
                  {
                    title: 'عملیات اصلی PMS',
                    items: [
                      { id: 'overview' as const, label: 'داشبورد آمار عملکرد', icon: LayoutDashboard },
                      { id: 'calendar' as const, label: 'تقویم نرخ و ظرفیت زنده', icon: Calendar },
                      { id: 'inventory' as const, label: 'مدیریت اتاق‌ها و PMS', icon: BedDouble },
                      { id: 'pricing' as const, label: 'موتور قیمت‌گذاری داینامیک', icon: Tags },
                    ]
                  },
                  {
                    title: 'مدیریت و خدمات',
                    items: [
                      { id: 'services-management' as const, label: 'تعریف و مدیریت خدمات', icon: Coffee },
                      { id: 'housekeeping' as const, label: 'مدیریت خانه‌داری', icon: PaintBucket },
                      { id: 'finance' as const, label: 'امور مالی و تسویه‌حساب', icon: FileText },
                      { id: 'policies' as const, label: 'قوانین و مقررات اقامتگاه', icon: ShieldCheck },
                    ]
                  }
                ].map((group, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="text-[10px] font-bold text-slate-500 tracking-wider px-2 uppercase">
                      {group.title}
                    </div>
                    {group.items.map(item => {
                      const IconComp = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveTab(item.id);
                            setMobileMenuOpen(false);
                          }}
                          className={cn(
                            "w-full flex items-center gap-3 text-right p-3 rounded-xl text-xs font-bold transition cursor-pointer border-r-2",
                            isActive
                              ? "bg-blue-600/20 text-blue-400 border-blue-600"
                              : "text-slate-300 hover:bg-slate-900 border-transparent"
                          )}
                        >
                          <IconComp size={16} className={isActive ? "text-blue-400" : "text-slate-500"} />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-[10px] text-slate-500 text-center font-bold">
              پنل مدیریت تامین‌کنندگان پارادایس
            </div>
          </div>
        </div>
      )}

      {/* Main Dynamic Panel Body Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar relative">
        {/* ============================== SUB TAB 1: OVERVIEW & ANALYTICS ============================== */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            {/* Step-by-Step Onboarding Progress Banner */}
            {(!business?.completionPercentage || business.completionPercentage < 100) && (
              <div className="bg-gradient-to-r from-amber-500/10 via-blue-600/10 to-amber-500/5 dark:from-blue-700/40 dark:via-blue-700/30 dark:to-slate-900/50 border border-blue-50/80 dark:border-blue-700/50 rounded-3xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-lg shadow-amber-500/20">
                    {business?.completionPercentage || 60}٪
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-blue-700 dark:text-blue-400">
                        تکمیل مرحله به مرحله پرونده هتل
                      </span>
                      <span className="text-[10px] bg-blue-50 dark:bg-blue-700/60 text-blue-700 dark:text-blue-50 px-2.5 py-0.5 rounded-full font-bold">
                        ثبت‌نام اولیه انجام شده است
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-bold leading-relaxed">
                      ورود شما با شماره همراه ثبت شد. اکنون می‌توانید اطلاعات عمومی، مدارک، تصاویر و امکانات هتل خود را به صورت گام به گام تکمیل کنید.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowOnboardingWizard(true)}
                  className="bg-amber-500 hover:bg-blue-600 text-slate-950 font-bold px-5 py-3 rounded-2xl text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0 hover:scale-[1.02]"
                >
                  <span>تکمیل اطلاعات پرونده هتل</span>
                  <ArrowLeft size={16} />
                </button>
              </div>
            )}

            {/* Modal for Step-by-Step Wizard */}
            {showOnboardingWizard && (
              <div className="fixed inset-0 z-[300] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
                <div className="relative w-full max-w-4xl bg-white dark:bg-[#0a0d1e] border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-4 sm:p-6 shadow-2xl my-auto">
                  <div className="flex justify-end mb-2">
                    <button 
                      type="button"
                      onClick={() => setShowOnboardingWizard(false)}
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-500 hover:text-white text-slate-500 transition cursor-pointer"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <HotelRegistrationWizard 
                    onClose={(completionPercentage) => {
                      setShowOnboardingWizard(false);
                      const newPercentage = completionPercentage ?? 100;
                      if (onUpdateBusiness) {
                        onUpdateBusiness({ ...business, completionPercentage: newPercentage });
                      }
                      setToastMessage(`پرونده هتل شما با موفقیت به ${newPercentage}٪ تکمیل تغییر یافت!`);
                    }} 
                  />
                </div>
              </div>
            )}
            
            {/* Top Stat Cards Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              <div className="bg-white dark:bg-[#0a0d1e] border border-slate-200/50 dark:border-slate-850 rounded-2xl p-5 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 block font-bold leading-none">کل درآمد در حال اقامت</span>
                    <span className="text-md sm:text-lg font-bold text-slate-900 dark:text-white mt-3 block leading-none">
                      {currentTotalRevenue.toLocaleString()} <span className="text-[10px] font-bold text-slate-400">ریال</span>
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                    <DollarSign size={18} />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1 text-[9px] font-bold text-emerald-500 leading-none">
                  <TrendingUp size={12} strokeWidth={3} />
                  <span>۱۲٪ افزایش نسبت به دوره گذشته</span>
                </div>
              </div>

              <div className="bg-white dark:bg-[#0a0d1e] border border-slate-200/50 dark:border-slate-850 rounded-2xl p-5 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 block font-bold leading-none">ضریب اشغال اتاق‌ها</span>
                    <span className="text-md sm:text-lg font-bold text-blue-600 dark:text-blue-400 mt-3 block leading-none">
                      {occupancyRate}٪
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                    <Percent size={18} />
                  </div>
                </div>
                <div className="mt-4 w-full bg-slate-100 dark:bg-slate-900 h-1 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${occupancyRate}%` }}></div>
                </div>
              </div>

              <div className="bg-white dark:bg-[#0a0d1e] border border-slate-200/50 dark:border-slate-850 rounded-2xl p-5 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 block font-bold leading-none">اتاق‌های کثیف / نیاز به نظافت</span>
                    <span className="text-md sm:text-lg font-bold text-amber-500 mt-3 block leading-none">
                      {cleaningRoomsCount} <span className="text-[10px] text-slate-400 font-bold">اتاق</span>
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                    <Clock size={18} />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-[9px] font-bold text-slate-400 leading-none">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                  <span>نیازمند واگذاری به خانه‌داری</span>
                </div>
              </div>

              <div className="bg-white dark:bg-[#0a0d1e] border border-slate-200/50 dark:border-slate-850 rounded-2xl p-5 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 block font-bold leading-none">ظرفیت کل مانیتور شده</span>
                    <span className="text-md sm:text-lg font-bold text-slate-800 dark:text-white mt-3 block leading-none">
                      {totalRoomsCount} <span className="text-[10px] text-slate-400 font-bold">اتاق فعال</span>
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0">
                    <Building2 size={18} />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-[9px] font-bold text-blue-600 leading-none">
                  <span>{vacantRoomsCount} اتاق خالی و آماده رزرو</span>
                </div>
              </div>

            </div>

            {/* Charts & Graphs Row (Using Recharts) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Main revenue graph (Takes 2 columns) */}
              <div className="bg-white dark:bg-[#0a0d1e] border border-slate-200/50 dark:border-slate-850 rounded-3xl p-5 shadow-sm lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-none">روند درآمدزایی هفتگی هتل</h4>
                    <span className="text-[9px] text-slate-400 font-bold block mt-1.5">تحلیل میزان پذیرش و فروش خدمات مازاد به تفکیک روزهای هفته</span>
                  </div>
                  <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-950 text-slate-500 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800">۷ روز گذشته</span>
                </div>

                <div className="h-64 w-full">
                  <ErrorBoundary>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={CHARTS_REVENUE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" opacity={0.08} />
                        <XAxis dataKey="name" tick={{ fontSize: 9, fontFamily: 'Vazir, Tahoma, sans-serif', fontWeight: 'bold' }} stroke="#94a3b8" />
                        <YAxis tick={{ fontSize: 9, fontFamily: 'monospace' }} stroke="#94a3b8" />
                        <Tooltip 
                          contentStyle={{ direction: 'rtl', borderRadius: '12px', background: '#1e293b', border: 'none', color: '#fff', fontSize: '10px' }}
                          labelStyle={{ fontWeight: 'bold' }}
                        />
                        <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" name="درآمد (میلیون ریال)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ErrorBoundary>
                </div>
              </div>

              {/* Pie status chart (Takes 1 column) */}
              <div className="bg-white dark:bg-[#0a0d1e] border border-slate-200/50 dark:border-slate-850 rounded-3xl p-5 shadow-sm space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-none">توزیع وضعیت اتاق‌ها</h4>
                  <span className="text-[9px] text-slate-400 font-bold block mt-1.5">نمای لایو چیدمان فضاهای اقامتی برحسب درصد اشغال و کاربری</span>
                </div>

                <div className="h-44 w-full flex items-center justify-center relative">
                  <ErrorBoundary>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={ROOM_PIE_DATA}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={70}
                          paddingAngle={4}
                          dataKey="value"
                        >
                          {ROOM_PIE_DATA.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </ErrorBoundary>
                  
                  {/* Absolute Center occupancy percentage */}
                  <div className="absolute text-center">
                    <span className="block text-[10px] text-slate-400 font-bold">درصد اشغال</span>
                    <span className="block text-lg font-bold text-blue-600 dark:text-blue-400 leading-none mt-1">{occupancyRate}٪</span>
                  </div>
                </div>

                {/* Pie legend list */}
                <div className="grid grid-cols-2 gap-2 text-[9px] font-bold">
                  {ROOM_PIE_DATA.map((p, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: p.color }}></span>
                      <span>{p.name}: {p.value}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Quick Actions & Overview Ledger Table */}
            <div className="bg-white dark:bg-[#0a0d1e] border border-slate-200/50 dark:border-slate-850 rounded-3xl p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-none">مهمانان مقیم هتل در این لحظه</h4>
                  <span className="text-[9px] text-slate-400 font-bold block mt-1.5">لیست کامل پذیرش‌های باز هتل به همراه خدمات مازاد رزرو شده</span>
                </div>
                <button 
                  onClick={() => {
                    setCheckInRoom(rooms.find(r => r.status === 'Vacant') || null);
                    setIsCheckInOpen(true);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] px-4 py-2 rounded-xl shadow-lg shadow-blue-500/10 flex items-center gap-1 transition-all cursor-pointer"
                >
                  <UserPlus size={12} />
                  <span>پذیرش مهمان جدید</span>
                </button>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-900">
                <table className="w-full text-xs text-right text-slate-500 dark:text-slate-400">
                  <thead className="bg-slate-50 dark:bg-slate-950/40 text-slate-400 text-[10px] font-bold border-b border-slate-100 dark:border-slate-900">
                    <tr>
                      <th className="px-5 py-3.5">اتاق تخصیص یافته</th>
                      <th className="px-5 py-3.5">نام کامل مهمان</th>
                      <th className="px-5 py-3.5">کد واچر صادر شده</th>
                      <th className="px-5 py-3.5">تاریخ ورود به هتل</th>
                      <th className="px-5 py-3.5">مبلغ کل اقامت (ریال)</th>
                      <th className="px-5 py-3.5 text-left">عملیات پذیرش</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-900/50 font-bold text-slate-700 dark:text-slate-300">
                    {occupiedRooms.map((r) => (
                      <tr key={r.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/10 transition-colors">
                        <td className="px-5 py-3.5">
                          <span className="bg-blue-500/10 text-blue-500 px-2.5 py-1 rounded-xl text-[10px] font-bold border border-blue-500/20">اتاق {r.number}</span>
                        </td>
                        <td className="px-5 py-3.5 text-slate-900 dark:text-white font-bold">{r.currentGuest?.name}</td>
                        <td className="px-5 py-3.5 font-mono text-blue-600 dark:text-blue-400">{r.currentGuest?.voucher}</td>
                        <td className="px-5 py-3.5 text-slate-400 font-mono">{r.currentGuest?.checkIn}</td>
                        <td className="px-5 py-3.5 font-mono text-emerald-500">
                          {r.currentGuest?.totalAmount.toLocaleString()}
                        </td>
                        <td className="px-5 py-3.5 text-left">
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={() => handleCheckOut(r.id)}
                              className="bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 px-3 py-1 rounded-lg text-[9px] font-bold cursor-pointer transition-all border border-rose-500/20"
                            >
                              تسویه حساب و خروج
                            </button>
                            <button
                              onClick={() => {
                                setSelectedRoom(r);
                              }}
                              className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-lg text-[9px] font-bold cursor-pointer transition-all"
                            >
                              جزئیات واچر
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {occupiedRooms.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-5 py-10 text-center text-slate-400 font-bold">
                          در حال حاضر هیچ مهمانی در هتل مقیم نیست.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ============================== SUB TAB: CALENDAR (Rates & Availability Matrix) ============================== */}
        {activeTab === 'calendar' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-[#0a0d1e] border border-slate-200/50 dark:border-slate-850 p-5 rounded-3xl shadow-sm">
              <div>
                <div className="flex items-center gap-2">
                  <Calendar className="text-blue-600" size={18} />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">تقویم زنده نرخ و ظرفیت (Rates & Availability Grid)</h3>
                </div>
                <p className="text-[10px] text-slate-400 font-bold mt-1">مدیریت لایو ظرفیت اتاق‌ها، نرخ شبانه و توقف فروش (Stop Sell) به‌صورت روزانه</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
                  تیر ۱۴۰۵
                </span>
                <button
                  type="button"
                  onClick={() => setToastMessage('تغییرات تقویم هم‌زمان در تمام OTAs همگام شد.')}
                  className="bg-blue-600 hover:bg-blue-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw size={13} />
                  <span>ذخیره و همگام‌سازی روزانه</span>
                </button>
              </div>
            </div>

            {/* Legend Bar */}
            <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
              <span className="font-bold text-slate-700 dark:text-slate-300">راهنمای تقویم:</span>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span><span>فروش باز (موجود)</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span><span>ظرفیت محدود (۱ یا ۲ اتاق)</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span><span>توقف فروش (Stop Sell)</span></div>
            </div>

            {/* Matrix Table */}
            <div className="bg-white dark:bg-[#0a0d1e] border border-slate-200/50 dark:border-slate-850 rounded-3xl p-5 shadow-sm overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-[10px] text-slate-400 font-bold">
                    <th className="p-3 text-right">نوع و کلاس اتاق</th>
                    <th className="p-3 text-center min-w-[100px]">شنبه ۲۸ تیر</th>
                    <th className="p-3 text-center min-w-[100px]">یکشنبه ۲۹ تیر</th>
                    <th className="p-3 text-center min-w-[100px]">دوشنبه ۳۰ تیر</th>
                    <th className="p-3 text-center min-w-[100px]">سه‌شنبه ۳۱ تیر</th>
                    <th className="p-3 text-center min-w-[100px]">چهارشنبه ۱ مرداد</th>
                    <th className="p-3 text-center min-w-[100px] text-blue-600">پنجشنبه ۲ مرداد (پیک)</th>
                    <th className="p-3 text-center min-w-[100px] text-blue-600">جمعه ۳ مرداد (پیک)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-850 text-xs">
                  {roomsData.map((roomCat, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition">
                      <td className="p-3 font-bold text-slate-900 dark:text-white">
                        <div>{roomCat.type}</div>
                        <div className="text-[9px] text-slate-400 font-normal mt-0.5">{roomCat.beds}</div>
                      </td>
                      {['۲۸ تیر', '۲۹ تیر', '۳۰ تیر', '۳۱ تیر', '۱ مرداد', '۲ مرداد', '۳ مرداد'].map((dayName, dIdx) => {
                        const isWeekend = dIdx >= 5;
                        const isStopped = stopSellDates.includes(dayName) || stopSellAll;
                        const basePrice = isWeekend ? Math.round(roomCat.price * 1.25) : roomCat.price;
                        return (
                          <td key={dIdx} className="p-2 text-center">
                            <div className={cn(
                              "p-2 rounded-2xl border transition text-center flex flex-col items-center justify-between gap-1",
                              isStopped
                                ? "bg-rose-500/10 border-rose-500/30 text-rose-500"
                                : isWeekend
                                  ? "bg-blue-600/5 border-blue-600/20 dark:bg-blue-700/20"
                                  : "bg-slate-50 dark:bg-slate-900/50 border-slate-200/60 dark:border-slate-800"
                            )}>
                              <span className="text-[10px] font-mono font-bold text-slate-900 dark:text-white">
                                {isStopped ? 'توقف' : `${(basePrice / 10000).toLocaleString()} هزار`}
                              </span>
                              
                              <div className="flex items-center justify-center gap-1">
                                <span className={cn(
                                  "text-[8px] font-bold px-1.5 py-0.2 rounded-full",
                                  isStopped ? "bg-rose-500 text-white" : "bg-emerald-500/20 text-blue-600 dark:text-blue-400"
                                )}>
                                  {isStopped ? 'بسته' : '۴ موجود'}
                                </span>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleToggleDateStopSell(dayName)}
                                className="text-[8px] font-bold text-slate-400 hover:text-blue-600 transition cursor-pointer mt-0.5"
                              >
                                {isStopped ? 'بازکردن' : 'توقف'}
                              </button>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}



        {/* ============================== SUB TAB: POLICIES ============================== */}
        {activeTab === 'policies' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white dark:bg-[#0a0d1e] border border-slate-200/50 dark:border-slate-850 p-5 rounded-3xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="text-blue-600" size={18} />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">قوانین و مقررات اقامتگاه (Property Policies)</h3>
                </div>
                <p className="text-[10px] text-slate-400 font-bold mt-1">تنظیم ساعت ورود و خروج، شرایط کنسلی، و قوانین پذیرش مهمانان</p>
              </div>

              <button
                type="button"
                onClick={() => setToastMessage('قوانین اقامتگاه با موفقیت به‌روزرسانی شد.')}
                className="bg-[#e05307] hover:bg-[#c24405] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition cursor-pointer flex items-center gap-1.5"
              >
                <Check size={14} />
                <span>ذخیره تغییرات قوانین</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Check-in / Check-out & Cancellation */}
              <div className="bg-white dark:bg-[#0a0d1e] border border-slate-200/50 dark:border-slate-850 rounded-3xl p-5 shadow-sm space-y-4">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">زمان‌بندی پذیرش و شرایط ابطال</h4>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 block">ساعت ورود (Check-in)</label>
                    <input
                      type="text"
                      value={policies.checkInTime}
                      onChange={e => setPolicies(prev => ({ ...prev, checkInTime: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0c0f24] border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-mono font-bold text-slate-900 dark:text-white text-center"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 block">ساعت خروج (Check-out)</label>
                    <input
                      type="text"
                      value={policies.checkOutTime}
                      onChange={e => setPolicies(prev => ({ ...prev, checkOutTime: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0c0f24] border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-mono font-bold text-slate-900 dark:text-white text-center"
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-[10px] font-bold text-slate-400 block">قانون کنسلی رزروها:</label>

                  {[
                    { id: 'flexible', title: 'شناور (Flexible)', desc: 'کنسلی رایگان تا ۴۸ ساعت قبل از ورود' },
                    { id: 'moderate', title: 'نیمه‌شناور (Moderate)', desc: 'کسر هزینه شب اول تا ۲۴ ساعت قبل از ورود' },
                    { id: 'strict', title: 'سخت‌گیرانه (Strict)', desc: 'غیرقابل استرداد پس از نهایی شدن واچر' }
                  ].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPolicies(prev => ({ ...prev, cancellationPolicy: item.id }))}
                      className={cn(
                        "w-full text-right p-3 rounded-2xl border transition cursor-pointer flex items-center justify-between",
                        policies.cancellationPolicy === item.id
                          ? "bg-blue-600/10 border-blue-600 text-slate-900 dark:text-white"
                          : "bg-slate-50 dark:bg-slate-900/40 border-slate-200/80 dark:border-slate-800 text-slate-500"
                      )}
                    >
                      <div>
                        <div className="text-xs font-bold">{item.title}</div>
                        <div className="text-[9px] text-slate-400 font-bold mt-0.5">{item.desc}</div>
                      </div>
                      {policies.cancellationPolicy === item.id && <CheckCircle size={16} className="text-blue-600 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Property House Rules */}
              <div className="bg-white dark:bg-[#0a0d1e] border border-slate-200/50 dark:border-slate-850 rounded-3xl p-5 shadow-sm space-y-4">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">قوانین و محدودیت‌های اقامتی</h4>

                <div className="space-y-3">
                  {[
                    { key: 'petPolicy', label: 'ورود حیوانات خانگی مجاز است', state: policies.petPolicy },
                    { key: 'partyAllowed', label: 'امکان برگزاری جشن و مراسم کوچک', state: policies.partyAllowed },
                    { key: 'depositRequired', label: 'نیازمند ارائه مدرک شناسایی معتبر (کارت ملی / شناسنامه)', state: policies.depositRequired }
                  ].map((rule, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setPolicies(prev => ({ ...prev, [rule.key]: !(policies as any)[rule.key] }))}
                      className="w-full flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer"
                    >
                      <span>{rule.label}</span>
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold border",
                        rule.state
                          ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
                          : "bg-slate-200 dark:bg-slate-800 text-slate-400 border-slate-300 dark:border-slate-700"
                      )}>
                        {rule.state ? 'مجاز' : 'غیرمجاز'}
                      </span>
                    </button>
                  ))}

                  <div className="space-y-1.5 pt-2">
                    <label className="text-[10px] font-bold text-slate-400 block">هزینه هر نفر اضافه (تومان / شب)</label>
                    <input
                      type="text"
                      value={policies.extraPersonPrice}
                      onChange={e => setPolicies(prev => ({ ...prev, extraPersonPrice: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0c0f24] border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-mono font-bold text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="space-y-6 animate-in fade-in pb-12 overflow-y-auto max-h-[calc(100vh-200px)] px-2" dir="rtl">
            {/* Header section exactly as the screenshot */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button 
                  onClick={() => setIsAddRoomTypeOpen(true)}
                  className="bg-[#e05307] hover:bg-[#c24405] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-600/10 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <Plus size={16} />
                  <span>تعریف اتاق جدید</span>
                </button>
                
                <div className="bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-850 rounded-xl px-3 py-2 flex items-center gap-2 text-xs w-64 shadow-sm">
                  <input 
                    type="text" 
                    placeholder="جستجوی اتاق..."
                    value={roomSearchQuery}
                    onChange={(e) => setRoomSearchQuery(e.target.value)}
                    className="bg-transparent border-none outline-none w-full text-slate-800 dark:text-white text-right font-sans pr-1"
                  />
                  <Search size={15} className="text-slate-400 shrink-0" />
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white font-sans border-r-4 border-[#e05307] pr-3 py-1">
                  مدیریت اتاق‌ها، سوئیت‌ها و ظرفیت‌ها
                </h3>
              </div>
            </div>

            {/* Stats Cards Row exactly as the screenshot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {/* Card 1: Total Rooms (Far Right in RTL) */}
              <div className="bg-white dark:bg-[#0a0d1e] border border-slate-150 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex items-center justify-between min-h-[100px]">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 block font-bold mb-1">کل اتاق‌ها</span>
                  <span className="text-2xl font-bold text-slate-900 dark:text-white font-mono leading-none">
                    {roomsData.length}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-[#e05307] flex items-center justify-center shrink-0">
                  <Building2 size={18} />
                </div>
              </div>

              {/* Card 2: Active Rooms */}
              <div className="bg-white dark:bg-[#0a0d1e] border border-slate-150 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex items-center justify-between min-h-[100px]">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 block font-bold mb-1">اتاق‌های فعال (قابل رزرو)</span>
                  <span className="text-2xl font-bold text-slate-900 dark:text-white font-mono leading-none">
                    {roomsData.filter(r => r.status === 'active').length}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                  <CheckCircle size={18} />
                </div>
              </div>

              {/* Card 3: Average Price */}
              <div className="bg-white dark:bg-[#0a0d1e] border border-slate-150 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex items-center justify-between min-h-[100px]">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 block font-bold mb-1">متوسط قیمت هر شب</span>
                  <span className="text-base font-bold text-slate-900 dark:text-white flex items-baseline gap-1">
                    <span className="font-mono text-xl">{Math.round(roomsData.reduce((acc, r) => acc + r.price, 0) / (roomsData.length || 1)).toLocaleString()}</span>
                    <span className="text-[10px] font-bold text-slate-400">تومان</span>
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                  <Coins size={18} />
                </div>
              </div>

              {/* Card 4: Add Room Dashed Button (Far Left in RTL) */}
              <button 
                onClick={() => setIsAddRoomTypeOpen(true)}
                className="bg-white dark:bg-slate-900/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all border-dashed border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center min-h-[100px] shadow-sm cursor-pointer group"
              >
                <Plus size={20} className="text-blue-500 mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">افزودن اتاق جدید</span>
              </button>
            </div>

            {/* Room List Table exactly as the screenshot */}
            <div className="bg-white dark:bg-[#0a0d1e] border border-slate-150 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm mt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-950/20 text-slate-400 dark:text-slate-500 font-bold">
                      <th className="p-4 font-bold">نوع اتاق</th>
                      <th className="p-4 font-bold">متراژ</th>
                      <th className="p-4 font-bold">نوع تخت‌ها</th>
                      <th className="p-4 font-bold">قیمت هر شب</th>
                      <th className="p-4 font-bold text-center">وضعیت رزروپذیری</th>
                      <th className="p-4 font-bold text-left pl-6">عملیات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 text-slate-700 dark:text-slate-300">
                    {roomsData
                      .filter(R => 
                        R.type.toLowerCase().includes(roomSearchQuery.toLowerCase()) ||
                        (R.description && R.description.toLowerCase().includes(roomSearchQuery.toLowerCase()))
                      )
                      .map((R) => (
                        <tr key={R.id} className="hover:bg-slate-50/20 dark:hover:bg-slate-800/10 transition-colors">
                          <td className="p-4 max-w-sm">
                            <div className="flex flex-col gap-1">
                              <span className="font-bold text-slate-900 dark:text-white text-xs">{R.type}</span>
                              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-normal leading-relaxed">{R.description}</span>
                            </div>
                          </td>
                          <td className="p-4 text-slate-600 dark:text-slate-400 font-bold">{R.size} متر مربع</td>
                          <td className="p-4 text-slate-600 dark:text-slate-400 font-bold">{R.beds}</td>
                          <td className="p-4 font-bold text-[#e05307] dark:text-[#f85c13]">
                            <span className="font-mono text-xs">{R.price.toLocaleString()}</span> <span className="text-[10px]">تومان</span>
                          </td>
                          <td className="p-4 text-center">
                            <span className="bg-blue-50 dark:bg-blue-700/30 text-blue-600 dark:text-blue-400 border border-blue-50 dark:border-blue-700/30 px-3 py-1 rounded-full text-[10px] font-bold inline-block">
                              رزرو فعال
                            </span>
                          </td>
                          <td className="p-4 text-left pl-6">
                            <div className="flex items-center gap-3 justify-end">
                              <button 
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition cursor-pointer"
                                title="تنظیمات"
                              >
                                <Settings size={14} />
                              </button>
                              <button 
                                className="text-slate-400 hover:text-rose-500 p-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition cursor-pointer" 
                                title="حذف" 
                                onClick={() => {
                                  setRoomsData(prev => prev.filter(Pe => Pe.id !== R.id));
                                  setToastMessage(`کلاس اتاق "${R.type}" با موفقیت حذف گردید.`);
                                }}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}



        {activeTab === 'pricing' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
                <h3 className="font-bold text-xs text-slate-900 dark:text-white font-sans border-r-4 border-rose-500 pr-3">بستن آنی کانال‌ها (Panic Stop Sell)</h3>
                <p className="text-[10px] text-slate-500">با فشردن دکمه زیر، بلافاصله کلیه کانال‌های فروش آنلاین اتاق‌های شما مسدود شده و پذیرش جدید غیرفعال می‌گردد.</p>
                <button 
                  onClick={handleTogglePanicStopSell}
                  className={cn(
                    "w-full font-bold py-3 rounded-xl transition text-center shadow-md cursor-pointer text-xs",
                    stopSellAll 
                      ? "bg-blue-600 hover:bg-blue-700 text-white" 
                      : "bg-rose-600 hover:bg-blue-700 text-white"
                  )}
                >
                  {stopSellAll ? "باز کردن فوری تمام کانال‌های فروش" : "توقف فوری فروش در تمام کانال‌ها"}
                </button>
              </div>
              <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-blue-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
                <h3 className="font-bold text-xs text-blue-700 dark:text-blue-400 font-sans border-r-4 border-blue-500 pr-3">ثبت قیمت گروهی (Bulk Editor)</h3>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <div>
                    <label className="text-slate-500 block mb-1">قیمت پایه جدید اتاق دبل (تومان):</label>
                    <input 
                      type="number" 
                      placeholder="مثال: ۴۹۶۰۰۰۰" 
                      value={bulkPriceInput}
                      onChange={(e) => setBulkPriceInput(e.target.value)}
                      className="w-full border p-2 rounded-lg outline-none font-mono text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-700" 
                    />
                  </div>
                  <div>
                    <label className="text-slate-500 block mb-1">نوع اعمال:</label>
                    <select 
                      value={bulkPriceType}
                      onChange={(e: any) => setBulkPriceType(e.target.value)}
                      className="w-full border p-2 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-slate-200 dark:border-slate-700"
                    >
                      <option value="all">اعمال روی تمام روزها</option>
                      <option value="weekends">فقط روزهای آخر هفته (پنجشنبه/جمعه)</option>
                    </select>
                  </div>
                </div>
                <button 
                  onClick={handleBulkPriceSubmit}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all"
                >
                  اعمال گروهی قیمت
                </button>
              </div>
            </div>

            <div className="space-y-3 text-xs font-bold">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 font-sans border-r-4 border-blue-500 pr-3">تقویم ۲ هفته‌ای مدیریت و توقف فروش (Stop Sell)</h3>
                <span className="text-[10px] text-slate-400">امروز: ۱۴۰۵/۰۴/۲۶ • قیمت‌های نمایش داده شده متعلق به تیپ استاندارد می‌باشد.</span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden text-center">
                {[
                  { day: "۲۶", month: "تیر", name: "۲۶ تیر", weekday: "پنجشنبه" },
                  { day: "۲۷", month: "تیر", name: "۲۷ تیر", weekday: "جمعه" },
                  { day: "۲۸", month: "تیر", name: "۲۸ تیر", weekday: "شنبه" },
                  { day: "۲۹", month: "تیر", name: "۲۹ تیر", weekday: "یکشنبه" },
                  { day: "۳۰", month: "تیر", name: "۳۰ تیر", weekday: "دوشنبه" },
                  { day: "۳۱", month: "تیر", name: "۳۱ تیر", weekday: "سه‌شنبه" },
                  { day: "۰۱", month: "مرداد", name: "۱ مرداد", weekday: "چهارشنبه" },
                  { day: "۰۲", month: "مرداد", name: "۲ مرداد", weekday: "پنجشنبه" },
                  { day: "۰۳", month: "مرداد", name: "۳ مرداد", weekday: "جمعه" },
                  { day: "۰۴", month: "مرداد", name: "۴ مرداد", weekday: "شنبه" },
                  { day: "۰۵", month: "مرداد", name: "۵ مرداد", weekday: "یکشنبه" },
                  { day: "۰۶", month: "مرداد", name: "۶ مرداد", weekday: "دوشنبه" },
                  { day: "۰۷", month: "مرداد", name: "۷ مرداد", weekday: "سه‌شنبه" },
                  { day: "۰۸", month: "مرداد", name: "۸ مرداد", weekday: "چهارشنبه" },
                ].map((dt, i) => {
                  const isClosed = stopSellAll || stopSellDates.includes(dt.name);
                  const isWeekend = dt.weekday === "پنجشنبه" || dt.weekday === "جمعه";
                  
                  // Get active price from roomsData standard (index 0)
                  const basePrice = roomsData[0]?.price || 4960000;
                  const priceToDisplay = isWeekend && bulkPriceType === "weekends" 
                    ? basePrice 
                    : basePrice;

                  return (
                    <div key={i} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-4 flex flex-col justify-between items-center min-h-[120px] transition-all">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-bold">{dt.name}</span>
                        <span className="text-[9px] text-slate-400">{dt.weekday}</span>
                      </div>
                      
                      {isClosed ? (
                        <span className="text-[10px] text-rose-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-700/40 px-2 py-0.5 rounded-md mt-1">توقف فروش</span>
                      ) : (
                        <span className="font-mono text-[10px] font-bold text-blue-600 dark:text-blue-400">
                          {priceToDisplay.toLocaleString()} تومان
                        </span>
                      )}

                      <button 
                        onClick={() => handleToggleDateStopSell(dt.name)}
                        className={cn(
                          "text-[9px] border px-2 py-1 rounded-lg font-bold mt-2 cursor-pointer transition-all",
                          isClosed 
                            ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90"
                            : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                        )}
                      >
                        {isClosed ? "باز کردن فروش" : "بستن فروش"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}



        {activeTab === 'housekeeping' && (
          <div className="space-y-6 animate-in fade-in pb-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200/50 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-950 dark:text-white font-sans flex items-center gap-2 border-r-4 border-blue-500 pr-3">
                  <span>سامانه هوشمند مدیریت خانه‌داری و پاک‌سازی هتل</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-semibold">نظارت بر فرآیند آماده‌سازی اتاق‌ها، تخصیص هوشمند وظایف، مانیتورینگ آنلاین عملکرد خدمه</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer">
                  <Plus size={14} /> تعریف دستور نظافت جدید
                </button>
                <button className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border border-slate-200/50 dark:border-slate-700/50 flex items-center gap-1.5 cursor-pointer">
                  <UserPlus size={14} /> ثبت نیروی خدماتی جدید
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white/90 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                <span className="text-xs text-slate-500 font-bold mb-2">تسک‌های جاری</span>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-bold font-mono text-slate-900 dark:text-white">{"۱۲"}</span>
                  <div className="text-[10px] text-blue-600 font-bold bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-lg">در حال انجام</div>
                </div>
              </div>
              <div className="bg-white/90 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                <span className="text-xs text-slate-500 font-bold mb-2">اتاق‌های نظافت شده امروز</span>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-bold font-mono text-slate-900 dark:text-white">{"۴۵"}</span>
                  <div className="text-[10px] text-blue-600 font-bold bg-blue-50 dark:bg-blue-700/30 px-2 py-1 rounded-lg">تکمیل شده</div>
                </div>
              </div>
              <div className="bg-white/90 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-rose-500/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                <span className="text-xs text-slate-500 font-bold mb-2">اتاق‌های کثیف (نیاز به نظافت)</span>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-bold font-mono text-slate-900 dark:text-white">{"۸"}</span>
                  <div className="text-[10px] text-rose-600 font-bold bg-blue-50 dark:bg-blue-700/30 px-2 py-1 rounded-lg animate-pulse">اقدام فوری</div>
                </div>
              </div>
              <div className="bg-white/90 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                <span className="text-xs text-slate-500 font-bold mb-2">پرسنل حاضر در شیفت</span>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-bold font-mono text-slate-900 dark:text-white">{"۳"}</span>
                  <div className="text-[10px] text-blue-600 font-bold bg-blue-50 dark:bg-blue-700/30 px-2 py-1 rounded-lg">نیروی فعال</div>
                </div>
              </div>
            </div>
          </div>
        )}



        {activeTab === 'finance' && (
          <div className="space-y-4 animate-in fade-in">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 font-sans border-r-4 border-blue-500 pr-3">
                حسابداری کل، عملکرد پورسانت و تسویه‌ها
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-bold text-slate-950">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl">
                <div className="text-slate-500 dark:text-slate-400 mb-1">کل کارمزد سهم پلتفرم (کمیسیون ۱۰٪):</div>
                <div className="text-lg font-bold font-mono text-rose-600">- {"۱,۴۸۸,۰۰۰"} تومان</div>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl">
                <div className="text-slate-500 dark:text-slate-400 mb-1">مبلغ خالص واریز شده پایا:</div>
                <div className="text-lg font-bold font-mono text-blue-700 dark:text-blue-400">+ {"۱۳,۳۹۲,۰۰۰"} تومان</div>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl">
                <div className="text-slate-500 dark:text-slate-400 mb-1">تعداد کل تراکنش‌های موفق:</div>
                <div className="text-lg font-bold font-mono text-blue-600">{"۱۲۴"} تراکنش</div>
              </div>
            </div>
          </div>
        )}







        {activeTab === 'services-management' && (
          <div className="space-y-6 animate-in fade-in pb-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200/50 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-950 dark:text-white font-sans flex items-center gap-2 border-r-4 border-blue-500 pr-3">
                  <Coffee size={18} className="text-blue-600" />
                  <span>تعریف و مدیریت خدمات جامع هتل</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-semibold">تعریف سرویس‌های جانبی هتل نظیر رستوران، ماساژ، و فروشگاه</p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              <form 
                onSubmit={handleCreateServiceSubmit}
                className="lg:col-span-5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6 relative overflow-hidden"
              >
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-5">
                  <h4 className="font-bold text-sm text-slate-950 dark:text-white flex items-center gap-2.5">
                    <div className="bg-blue-50 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 p-1.5 rounded-lg">
                      <Sparkles size={16} />
                    </div>
                    تعریف و هوشمندسازی خدمت جدید هتل
                  </h4>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-slate-500 dark:text-slate-400 block mb-1 text-[11px] font-bold">عنوان خدمت (مانند: ماساژ ریلکسی)</label>
                    <input 
                      type="text" 
                      required
                      value={newSrvTitle}
                      onChange={(e) => setNewSrvTitle(e.target.value)}
                      className="w-full border p-3 rounded-xl outline-none bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-bold" 
                    />
                  </div>
                  <div>
                    <label className="text-slate-500 dark:text-slate-400 block mb-1 text-[11px] font-bold">دسته‌بندی سرویس</label>
                    <select 
                      value={newSrvCategory}
                      onChange={(e) => setNewSrvCategory(e.target.value)}
                      className="w-full border p-3 rounded-xl outline-none bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-bold cursor-pointer"
                    >
                      <option>رستوران و کافی‌شاپ</option>
                      <option>مجموعه ورزشی و اسپا</option>
                      <option>خدمات تفریحی و تور</option>
                      <option>لاندری و نظافت ویژه</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-500 dark:text-slate-400 block mb-1 text-[11px] font-bold">قیمت پایه (تومان)</label>
                      <input 
                        type="number" 
                        required
                        value={newSrvPrice}
                        onChange={(e) => setNewSrvPrice(e.target.value)}
                        className="w-full border p-3 rounded-xl outline-none font-mono text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-700 text-xs" 
                      />
                    </div>
                    <div>
                      <label className="text-slate-500 dark:text-slate-400 block mb-1 text-[11px] font-bold">ظرفیت همزمان (نفر)</label>
                      <input 
                        type="number" 
                        required
                        value={newSrvCapacity}
                        onChange={(e) => setNewSrvCapacity(e.target.value)}
                        className="w-full border p-3 rounded-xl outline-none font-mono text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-700 text-xs" 
                      />
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-md shadow-blue-600/20 text-xs flex items-center justify-center gap-2 cursor-pointer mt-4">
                    <CheckCircle size={16} />
                    ثبت نهایی و انتشار خدمت در پلتفرم مسافر
                  </button>
                </div>
              </form>
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-blue-50 dark:bg-blue-700/20 border border-blue-50/50 dark:border-blue-700/30 rounded-2xl p-4 flex items-start gap-3">
                  <div className="bg-blue-50 dark:bg-blue-700/50 text-blue-600 dark:text-blue-400 p-2 rounded-xl shrink-0"><Sparkles size={16}/></div>
                  <p className="text-[11px] font-bold text-blue-700 dark:text-blue-400 leading-relaxed">خدمات ثبت شده در این بخش مستقیماً در اپلیکیشن مسافر نمایش داده می‌شوند. شما می‌توانید این خدمات را به صورت هوشمند برای مسافرین مقیم خود پیشنهاد دهید.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {servicesList.length === 0 ? (
                    <div className="col-span-1 md:col-span-2 p-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl text-center flex flex-col items-center justify-center gap-3">
                      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400"><Coffee size={24}/></div>
                      <span className="text-sm font-bold text-slate-600 dark:text-slate-400">هیچ خدمتی یافت نشد.</span>
                    </div>
                  ) : (
                    servicesList.map((srv) => (
                      <div key={srv.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition-all relative group overflow-hidden">
                        <div className="absolute top-0 right-0 w-12 h-12 bg-blue-600/5 rounded-bl-full pointer-events-none"></div>
                        <div>
                          <span className="text-[10px] bg-blue-50 dark:bg-blue-700/40 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md font-bold">
                            {srv.category}
                          </span>
                          <h5 className="font-bold text-slate-900 dark:text-white text-xs mt-2">{srv.label}</h5>
                        </div>
                        <div className="mt-4 flex justify-between items-center border-t border-slate-50 dark:border-slate-800 pt-3">
                          <span className="text-[10px] text-slate-400 font-bold">ظرفیت: {srv.capacity} نفر</span>
                          <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                            {srv.price.toLocaleString()} تومان
                          </span>
                        </div>
                        <button 
                          type="button"
                          onClick={() => {
                            setServicesList(prev => prev.filter(s => s.id !== srv.id));
                            setToastMessage(`خدمت "${srv.label}" با موفقیت حذف گردید.`);
                          }}
                          className="absolute top-2 left-2 p-1 text-slate-400 hover:text-rose-500 rounded transition opacity-0 group-hover:opacity-100 cursor-pointer"
                          title="حذف خدمت"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}


</div>

      {/* ========================================================================= */}
      {/* ============================== DIALOG MODALS ============================ */}
      {/* ========================================================================= */}

      {/* MODAL 1: ROOM DETAILS & ACTIVE GUEST FACTOR INVOICE */}
      {selectedRoom && (
        <div className="fixed inset-0 bg-slate-950/70 z-[120] flex items-center justify-center p-3 sm:p-4 backdrop-blur-sm overflow-y-auto" dir="rtl">
          <div className="bg-white dark:bg-[#0a0d1e] border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-xl p-6 space-y-5 shadow-2xl relative text-right animate-in zoom-in-95 duration-200 my-auto max-h-[calc(100vh-2rem)] overflow-y-auto custom-scrollbar">
            
            <button
              onClick={() => setSelectedRoom(null)}
              className="absolute left-4 top-4 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition"
            >
              <X size={18} />
            </button>

            {/* Title / Room Info Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                <Building2 size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">نمای تفصیلی و پرونده پذیرش • اتاق {selectedRoom.number}</h3>
                <p className="text-[9px] text-slate-400 font-bold mt-1">کلاس فیزیکی: {selectedRoom.typeLabel} • طبقه {selectedRoom.floor}</p>
              </div>
            </div>

            {/* Room Features and Direct quick settings */}
            <div className="p-4 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-200/50 dark:border-slate-850 grid grid-cols-2 gap-4">
              <div>
                <span className="text-[9px] text-slate-400 block font-bold">امکانات رفاهی اتاق:</span>
                <div className="flex gap-1.5 flex-wrap mt-2">
                  {selectedRoom.features.map((feat, i) => (
                    <span key={i} className="bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-800 rounded-lg px-2 py-0.5 text-[8px] font-bold">
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1 text-left">
                <span className="text-[9px] text-slate-400 block font-bold text-right">کنترل‌های لایو پذیرش:</span>
                <div className="flex flex-col gap-1.5 items-stretch pt-2">
                  <button
                    onClick={() => handleToggleMaintenance(selectedRoom.id)}
                    className={cn(
                      "py-1.5 px-3 rounded-lg text-[9px] font-bold transition text-center cursor-pointer border",
                      selectedRoom.status === 'Maintenance'
                        ? "bg-rose-500 text-white border-rose-500"
                        : "bg-white dark:bg-slate-900 text-slate-600 border-slate-200 dark:border-slate-800 hover:text-rose-500"
                    )}
                  >
                    {selectedRoom.status === 'Maintenance' ? 'خروج از خرابی/تعمیرات' : 'ثبت گزارش خرابی (خروج از سرویس)'}
                  </button>
                  <button
                    onClick={() => handleToggleRoomCleanState(selectedRoom.id)}
                    className="py-1.5 px-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-500 rounded-lg text-[9px] font-bold text-center cursor-pointer"
                  >
                    تغییر زنده وضعیت پاکیزگی
                  </button>
                </div>
              </div>
            </div>

            {/* Guest details if occupied, else quick Check-in trigger */}
            {selectedRoom.status === 'Occupied' && selectedRoom.currentGuest ? (
              <div className="space-y-4">
                
                {/* Guest Profile Details */}
                <div className="bg-blue-500/5 border border-blue-500/10 rounded-2xl p-4 space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-blue-500/10">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500/15 text-blue-500 font-bold flex items-center justify-center text-xs">
                        {selectedRoom.currentGuest.name[0]}
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-slate-900 dark:text-white leading-none">{selectedRoom.currentGuest.name}</span>
                        <span className="block text-[8px] text-slate-400 mt-1 leading-none">{selectedRoom.currentGuest.phone}</span>
                      </div>
                    </div>
                    
                    <span className="text-[9px] font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-100/30 dark:bg-blue-950/40 px-2 py-0.5 rounded-md leading-none">
                      واچر: {selectedRoom.currentGuest.voucher}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-500 dark:text-slate-400 font-bold">
                    <div>کدملی: <span className="font-mono text-slate-800 dark:text-slate-200">{selectedRoom.currentGuest.nationalId}</span></div>
                    <div>تاریخ ورود: <span className="font-mono text-slate-800 dark:text-slate-200">{selectedRoom.currentGuest.checkIn}</span></div>
                    <div>مدت اقامت: <span className="text-slate-800 dark:text-slate-200">{selectedRoom.currentGuest.nights} شب</span></div>
                  </div>
                </div>

                {/* Direct Billing Statement Facture Details */}
                <div className="border border-slate-100 dark:border-slate-850 rounded-2xl p-4 space-y-3.5">
                  <span className="text-[10px] font-bold text-slate-900 dark:text-white block">صورت‌حساب لایو پذیرش (پیش‌فاکتور میهمان)</span>
                  
                  <div className="space-y-2 text-[11px] font-bold">
                    <div className="flex justify-between text-slate-500">
                      <span>هزینه پایه اقامت ({selectedRoom.currentGuest.nights} شب):</span>
                      <span className="font-mono text-slate-800 dark:text-slate-200">{selectedRoom.currentGuest.totalAmount.toLocaleString()} ریال</span>
                    </div>

                    {selectedRoom.currentGuest.extraServices.map((srv, i) => (
                      <div key={i} className="flex justify-between text-slate-500 animate-in fade-in">
                        <span>{srv.label}:</span>
                        <span className="font-mono text-slate-800 dark:text-slate-200">{srv.price.toLocaleString()} ریال</span>
                      </div>
                    ))}

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-850 flex justify-between font-bold text-xs text-slate-950 dark:text-white">
                      <span>جمع نهایی فاکتور تسویه:</span>
                      <span className="font-mono text-emerald-500">
                        {(
                          selectedRoom.currentGuest.totalAmount + 
                          selectedRoom.currentGuest.extraServices.reduce((acc, s) => acc + s.price, 0)
                        ).toLocaleString()} ریال
                      </span>
                    </div>
                  </div>
                </div>

                {/* Checkout actions */}
                <div className="flex gap-2 justify-end pt-2">
                  <button
                    onClick={() => handleCheckOut(selectedRoom.id)}
                    className="flex-1 bg-rose-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl shadow-lg shadow-rose-500/10 cursor-pointer text-center"
                  >
                    تسویه نهایی فاکتور و خروج میهمان
                  </button>
                  <button
                    onClick={() => setSelectedRoom(null)}
                    className="px-4 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 text-slate-500 dark:text-slate-300 rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    بستن فاکتور
                  </button>
                </div>

              </div>
            ) : selectedRoom.status === 'Maintenance' ? (
              <div className="py-6 text-center space-y-4">
                <ShieldAlert size={28} className="text-rose-500 mx-auto" />
                <p className="text-xs font-bold text-slate-600 dark:text-slate-400">این اتاق به دلیل نقص فنی، خارج از چرخه بهره‌برداری پذیرش است.</p>
                <p className="text-[10px] text-slate-400">جهت بازگشت اتاق به سیستم واگذاری رزرواسیون، گزارش خرابی بالای صفحه را لغو نمایید.</p>
                
                <button
                  onClick={() => setSelectedRoom(null)}
                  className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  تایید و بستن
                </button>
              </div>
            ) : (
              <div className="py-4 text-center space-y-4">
                <p className="text-xs font-bold text-slate-600 dark:text-slate-400">در حال حاضر هیچ مسافری در این اتاق مقیم نیست.</p>
                <p className="text-[10px] text-slate-400">شما می‌توانید مستقیماً از دکمه زیر اقدام به پذیرش دستی مسافر نمایید.</p>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setCheckInRoom(selectedRoom);
                      setSelectedRoom(null);
                      setIsCheckInOpen(true);
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl shadow-lg cursor-pointer"
                  >
                    پذیرش فوری مهمان جدید
                  </button>
                  <button
                    onClick={() => {
                      setHkAssignRoom(selectedRoom);
                      setSelectedRoom(null);
                      setIsHkAssignOpen(true);
                    }}
                    className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 text-slate-600 dark:text-slate-300 px-4 py-3 rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    ارجاع به خانه‌داری جهت نظافت
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* MODAL 2: STEP BY STEP GUEST CHECK-IN WIZARD FORM */}
      {isCheckInOpen && checkInRoom && (
        <div className="fixed inset-0 bg-slate-950/70 z-[120] flex items-center justify-center p-3 sm:p-4 backdrop-blur-sm overflow-y-auto" dir="rtl">
          <div className="bg-white dark:bg-[#0a0d1e] border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg p-6 space-y-4 shadow-2xl relative text-right animate-in zoom-in-95 duration-200 my-auto max-h-[calc(100vh-2rem)] overflow-y-auto custom-scrollbar">
            
            <button
              onClick={() => {
                setIsCheckInOpen(false);
                setCheckInRoom(null);
              }}
              className="absolute left-4 top-4 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
                <UserPlus size={16} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">فرآیند پذیرش و تخصیص فیزیکی واچر</h3>
                <p className="text-[9px] text-slate-400 font-bold mt-1">تخصیص اتاق {checkInRoom.number} به مهمان • قیمت روزانه: {getCalculatedPrice(checkInRoom.pricePerNight).toLocaleString()} ریال</p>
              </div>
            </div>

            <form onSubmit={handleCheckInSubmit} className="space-y-4 pt-2">
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase block">نام و نام خانوادگی میهمان اصلی</label>
                <input
                  required
                  type="text"
                  value={checkInName}
                  onChange={e => setCheckInName(e.target.value)}
                  placeholder="مثال: رضا جعفری"
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0c0f24] border border-slate-200 dark:border-slate-850 rounded-xl text-slate-950 dark:text-white text-xs font-bold outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block">تلفن همراه</label>
                  <input
                    required
                    type="text"
                    value={checkInPhone}
                    onChange={e => setCheckInPhone(e.target.value)}
                    placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹"
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0c0f24] border border-slate-200 dark:border-slate-850 rounded-xl text-slate-950 dark:text-white text-xs font-bold outline-none text-left"
                    dir="ltr"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block">کد ملی ده رقمی</label>
                  <input
                    type="text"
                    value={checkInNId}
                    onChange={e => setCheckInNId(e.target.value)}
                    placeholder="مثال: ۰۰۱۲۳۴۵۶۷۸"
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0c0f24] border border-slate-200 dark:border-slate-850 rounded-xl text-slate-950 dark:text-white text-xs font-bold outline-none text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block">مدت اقامت مسافر</label>
                  <select
                    value={checkInNights}
                    onChange={e => setCheckInNights(parseInt(e.target.value))}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0c0f24] border border-slate-200 dark:border-slate-850 rounded-xl text-slate-950 dark:text-white text-xs font-bold outline-none cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 10, 14].map(n => (
                      <option key={n} value={n}>{n} شب اقامت</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block">جمع هزینه رنت اتاق</label>
                  <div className="w-full px-4 py-2.5 bg-slate-100 dark:bg-[#0c0f24] border border-slate-200 dark:border-slate-850 rounded-xl text-slate-950 dark:text-white text-xs font-bold text-left font-mono">
                    {(getCalculatedPrice(checkInRoom.pricePerNight) * checkInNights).toLocaleString()} ریال
                  </div>
                </div>
              </div>

              {/* Service additions checkboxes */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block">افزودن خدمات مازاد هتل:</label>
                <div className="space-y-2">
                  {[
                    { id: 'spa', label: 'کارت طلایی اسپا و آب‌درمانی (+۴,۰۰۰,۰۰۰ ریال)' },
                    { id: 'breakfast', label: 'بوفه سلف‌سرویس صبحانه لابی (+۲,۰۰۰,۰۰۰ ریال)' },
                    { id: 'transfer', label: 'ترانسفر تشریفاتی با لیموزین کلوپ (+۶,۰۰۰,۰۰۰ ریال)' }
                  ].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        if (checkInExtras.includes(item.id)) {
                          setCheckInExtras(prev => prev.filter(x => x !== item.id));
                        } else {
                          setCheckInExtras(prev => [...prev, item.id]);
                        }
                      }}
                      className="w-full flex items-center justify-between text-right text-[10px] font-bold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-850 hover:border-blue-500/30 p-2.5 rounded-xl cursor-pointer bg-white dark:bg-[#0a0d1e]"
                    >
                      <span>{item.label}</span>
                      {checkInExtras.includes(item.id) ? <CheckSquare size={13} className="text-blue-500" /> : <Square size={13} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit triggers */}
              <div className="flex gap-2 justify-end pt-2 border-t border-slate-100 dark:border-slate-900">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl shadow-lg transition cursor-pointer text-center"
                >
                  تایید پذیرش مسافر و واگذاری کلید اتاق
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsCheckInOpen(false);
                    setCheckInRoom(null);
                  }}
                  className="px-4 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 text-slate-500 dark:text-slate-300 rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  انصراف
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: HOUSEKEEPING TASK ASSIGNMENT OVERLAY */}
      {isHkAssignOpen && hkAssignRoom && (
        <div className="fixed inset-0 bg-slate-950/70 z-[120] flex items-center justify-center p-3 sm:p-4 backdrop-blur-sm overflow-y-auto" dir="rtl">
          <div className="bg-white dark:bg-[#0a0d1e] border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-md p-6 space-y-4 shadow-2xl relative text-right animate-in zoom-in-95 duration-200 my-auto max-h-[calc(100vh-2rem)] overflow-y-auto custom-scrollbar">
            
            <button
              onClick={() => {
                setIsHkAssignOpen(false);
                setHkAssignRoom(null);
              }}
              className="absolute left-4 top-4 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition"
            >
              <X size={18} />
            </button>

            {/* Title */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Coffee size={15} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white">ارجاع فضا به کادر نظافت و خانه‌داری</h3>
                <p className="text-[9px] text-slate-400 font-bold mt-1">تخصیص ماموریت نظافت و آماده‌سازی اتاق {hkAssignRoom.number}</p>
              </div>
            </div>

            <form onSubmit={handleAssignHkSubmit} className="space-y-4 pt-2">
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block">انتخاب پرسنل مجری نظافت</label>
                <select
                  value={hkSelectedStaff}
                  onChange={e => setHkSelectedStaff(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0c0f24] border border-slate-200 dark:border-slate-850 rounded-xl text-slate-950 dark:text-white text-xs font-bold outline-none"
                >
                  {housekeepers.map(hk => (
                    <option key={hk.id} value={hk.id}>{hk.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block">توضیحات و دستورالعمل ویژه نظافت</label>
                <textarea
                  value={hkNotes}
                  onChange={e => setHkNotes(e.target.value)}
                  placeholder="مثال: تعویض حتمی حوله حمام، بررسی کارکرد تهویه..."
                  rows={3}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0c0f24] border border-slate-200 dark:border-slate-850 rounded-xl text-slate-950 dark:text-white text-xs font-bold outline-none resize-none"
                />
              </div>

              <div className="flex gap-2 justify-end pt-2 border-t border-slate-100 dark:border-slate-900">
                <button
                  type="submit"
                  className="flex-1 bg-amber-500 hover:bg-blue-600 text-white font-bold text-xs py-3 rounded-xl shadow-lg transition cursor-pointer text-center"
                >
                  ثبت و ارجاع ماموریت نظافتی
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsHkAssignOpen(false);
                    setHkAssignRoom(null);
                  }}
                  className="px-4 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 text-slate-500 dark:text-slate-300 rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  انصراف
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: ADD PHYSICAL PMS ROOM */}
      {isAddRoomOpen && (
        <div className="fixed inset-0 bg-slate-950/70 z-[120] flex items-center justify-center p-3 sm:p-4 backdrop-blur-sm overflow-y-auto" dir="rtl">
          <div className="bg-white dark:bg-[#0a0d1e] border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-md p-6 space-y-4 shadow-2xl relative text-right animate-in zoom-in-95 duration-200 my-auto max-h-[calc(100vh-2rem)] overflow-y-auto custom-scrollbar">
            <button
              onClick={() => setIsAddRoomOpen(false)}
              className="absolute left-4 top-4 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <Plus size={16} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white">تعریف شماره اتاق فیزیکی جدید (PMS)</h3>
                <p className="text-[9px] text-slate-400 font-bold mt-1">افزودن اتاق فیزیکی جدید به چرخه پذیرش و خانه‌داری هتل</p>
              </div>
            </div>

            <form onSubmit={handleCreateRoomSubmit} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block">شماره اتاق *</label>
                <input
                  type="text"
                  required
                  value={newRoomNum}
                  onChange={e => setNewRoomNum(e.target.value)}
                  placeholder="مثال: ۱۰۶ یا ۳۰۵"
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0c0f24] border border-slate-200 dark:border-slate-850 rounded-xl text-slate-950 dark:text-white text-xs font-bold outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block">کلاس/تیپ اتاق *</label>
                  <select
                    value={newRoomCategory}
                    onChange={e => setNewRoomCategory(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0c0f24] border border-slate-200 dark:border-slate-850 rounded-xl text-slate-950 dark:text-white text-xs font-bold outline-none"
                  >
                    <option value="Double">اتاق دبل استاندارد</option>
                    <option value="Suite">سوئیت جونیور</option>
                    <option value="Twin">اتاق توئین لوکس</option>
                    <option value="Penthouse">پنت‌هاوس مجلل</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block">طبقه *</label>
                  <select
                    value={newRoomFloor}
                    onChange={e => setNewRoomFloor(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0c0f24] border border-slate-200 dark:border-slate-850 rounded-xl text-slate-950 dark:text-white text-xs font-bold outline-none"
                  >
                    <option value="1">طبقه اول</option>
                    <option value="2">طبقه دوم</option>
                    <option value="3">طبقه سوم</option>
                    <option value="4">طبقه چهارم (رویال)</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-2 border-t border-slate-100 dark:border-slate-900">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl shadow-lg transition cursor-pointer text-center"
                >
                  ثبت شماره اتاق جدید
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddRoomOpen(false)}
                  className="px-4 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 text-slate-500 dark:text-slate-300 rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  انصراف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 5: ADD ROOM CATEGORY / CLASS TYPE */}
      {isAddRoomTypeOpen && (
        <div className="fixed inset-0 bg-slate-950/60 z-[120] flex items-center justify-center p-3 sm:p-4 backdrop-blur-sm overflow-y-auto" dir="rtl">
          <div className="bg-white dark:bg-[#0a0d1e] border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl relative text-right animate-in zoom-in-95 duration-200 my-auto max-h-[calc(100vh-2rem)] overflow-y-auto custom-scrollbar">
            {/* Close button on the top-left */}
            <button
              onClick={() => setIsAddRoomTypeOpen(false)}
              className="absolute left-6 top-6 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition"
            >
              <X size={20} />
            </button>

            {/* Modal Title */}
            <div className="border-b border-slate-100 dark:border-slate-800/80 pb-4 mb-6">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">تعریف اتاق/سوئیت جدید</h3>
            </div>

            <form onSubmit={handleCreateRoomTypeSubmit} className="space-y-5">
              {/* Field 1: Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block">عنوان و نوع اتاق</label>
                <input
                  type="text"
                  required
                  value={newCategoryName}
                  onChange={e => setNewCategoryName(e.target.value)}
                  placeholder="مثلا: سوئیت رویال پرزیدنتال"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-[#0c0f24] border border-slate-200 dark:border-slate-800 rounded-xl text-slate-950 dark:text-white text-xs font-bold outline-none focus:border-blue-600 transition-colors"
                />
              </div>

              {/* Grid for Size and Price (Left: Price, Right: Size in RTL) */}
              <div className="grid grid-cols-2 gap-4">
                {/* Size */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block">متراژ (متر مربع)</label>
                  <input
                    type="text"
                    value={newCategorySize}
                    onChange={e => setNewCategorySize(e.target.value)}
                    placeholder="مثلا: 45"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-[#0c0f24] border border-slate-200 dark:border-slate-800 rounded-xl text-slate-950 dark:text-white text-xs font-bold outline-none focus:border-blue-600 transition-colors"
                  />
                </div>

                {/* Price */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block">قیمت هر شب (تومان)</label>
                  <input
                    type="text"
                    required
                    value={newCategoryPrice}
                    onChange={e => setNewCategoryPrice(e.target.value)}
                    placeholder="مثلا: 5,000,000"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-[#0c0f24] border border-slate-200 dark:border-slate-800 rounded-xl text-slate-950 dark:text-white text-xs font-bold outline-none focus:border-blue-600 transition-colors font-mono"
                  />
                </div>
              </div>

              {/* Field 4: Beds */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block">نوع و تعداد تخت</label>
                <input
                  type="text"
                  value={newCategoryBeds}
                  onChange={e => setNewCategoryBeds(e.target.value)}
                  placeholder="مثلا: ۱ تخت دبل کینگ + ۱ سینگل"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-[#0c0f24] border border-slate-200 dark:border-slate-800 rounded-xl text-slate-950 dark:text-white text-xs font-bold outline-none focus:border-blue-600 transition-colors"
                />
              </div>

              {/* Field 5: Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block">توضیحات کوتاه</label>
                <textarea
                  value={newCategoryDesc}
                  onChange={e => setNewCategoryDesc(e.target.value)}
                  placeholder="توضیح مختصری درباره امکانات و چشم‌انداز..."
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-[#0c0f24] border border-slate-200 dark:border-slate-800 rounded-xl text-slate-950 dark:text-white text-xs font-bold outline-none focus:border-blue-600 transition-colors resize-none"
                />
              </div>

              {/* Actions row: Cancel on right, Submit on left in RTL */}
              <div className="flex gap-3 justify-end pt-5 border-t border-slate-100 dark:border-slate-800/80">
                <button
                  type="button"
                  onClick={() => setIsAddRoomTypeOpen(false)}
                  className="px-6 py-2.5 bg-white hover:bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="bg-[#e05307] hover:bg-[#c24405] text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-lg transition cursor-pointer text-center"
                >
                  ثبت و ایجاد اتاق
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
