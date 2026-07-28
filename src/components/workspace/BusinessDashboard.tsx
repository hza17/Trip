import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Coffee, 
  Activity, 
  Plane, 
  Train, 
  Car, 
  Home, 
  CheckCircle, 
  Settings, 
  LogOut, 
  Sparkles, 
  DoorOpen, 
  Plus, 
  Trash2, 
  HelpCircle, 
  ChevronLeft, 
  UserPlus, 
  Calendar, 
  Compass, 
  ArrowRight, 
  ShieldAlert, 
  ArrowLeft,
  Users,
  Layers,
  Search,
  DollarSign,
  MapPin,
  Sliders,
  X,
  Link as LinkIcon,
  Waves,
  Dumbbell,
  ChevronDown
} from 'lucide-react';
import { Business, BusinessType, ModuleType } from './types';
import { cn } from '@/lib/utils';
import { HotelPremiumDashboard } from './HotelPremiumDashboard';

interface BusinessDashboardProps {
  business: Business;
  allBusinesses: Business[];
  teamMembers?: any[];
  onBackToHub: () => void;
  onSwitchBusiness?: (id: string) => void;
  onUpdateTeam?: (members: any[]) => void;
  onUpdateBusiness?: (business: Business) => void;
}

export function BusinessDashboard(props: BusinessDashboardProps) {
  const { business: initialActiveBusiness, allBusinesses: initialAllBusinesses, onBackToHub } = props;

  // State for all managed businesses (can be expanded locally)
  const [businesses, setBusinesses] = useState<Business[]>(() => {
    return Array.from(new Map(initialAllBusinesses.map(b => [b.id, b])).values());
  });

  // Synchronize businesses array from localStorage / events
  useEffect(() => {
    const handleSync = () => {
      const saved = localStorage.getItem('paradise_businesses');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setBusinesses(Array.from(new Map(parsed.map(b => [b.id, b])).values()));
          }
        } catch (e) {
          // ignore
        }
      }
    };
    window.addEventListener('businesses_updated', handleSync);
    return () => window.removeEventListener('businesses_updated', handleSync);
  }, []);

  const [activeId, setActiveId] = useState<string>(initialActiveBusiness?.id || 'b1');
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);
  const [switcherSearch, setSwitcherSearch] = useState('');

  // Find active business
  const activeBusiness = businesses.find(b => b.id === activeId) || businesses[0] || initialActiveBusiness;

  // Active Workspace Tab
  const [activeTab, setActiveTab] = useState<'spaces' | 'bookings' | 'settings'>('spaces');

  // Business Creation Dialog Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newBizName, setNewBizName] = useState('');
  const [newBizType, setNewBizType] = useState<BusinessType>('Hotel');
  const [newBizCapacity, setNewBizCapacity] = useState('10');
  const [newBizAddress, setNewBizAddress] = useState('');
  
  // Specific to Entertainment type creation
  const [isEntertainmentSubService, setIsEntertainmentSubService] = useState(false);
  const [parentHotelId, setParentHotelId] = useState('');
  const [entertainmentSubType, setEntertainmentSubType] = useState<'Restaurant' | 'Gaming' | 'Pool' | 'Massage' | 'Other'>('Restaurant');

  // Dictionary state to store items (spaces/slots/vehicles) for each business ID
  const [businessItems, setBusinessItems] = useState<Record<string, any[]>>({
    'b1': [ // Hotel rooms
      { id: '۱۰۱', name: 'اتاق دبل استاندارد', status: 'Available', detail: 'طبقه اول • ۲ تخت دبل' },
      { id: '۱۰۲', name: 'اتاق توئین لوکس', status: 'Occupied', detail: 'طبقه اول • رو به کوهستان' },
      { id: '۱۰۳', name: 'سوئیت رویال امپریال', status: 'Cleaning', detail: 'طبقه سوم • جکوزی اختصاصی' },
      { id: '۱۰۴', name: 'اتاق توئین تراس‌دار', status: 'Available', detail: 'طبقه دوم • بالکن بزرگ' },
      { id: '۱۰۵', name: 'سوئیت رویال جکوزی', status: 'Available', detail: 'طبقه چهارم • رو به جنگل' },
      { id: '۱۰۶', name: 'اتاق سینگل کوزی', status: 'Cleaning', detail: 'طبقه اول • ۱ تخت سینگل' },
    ],
    'b2': [ // Restaurant tables
      { id: 'T-1', name: 'میز ۲ نفره دنج', status: 'Available', detail: 'کنار پنجره لابی • ویو باغ' },
      { id: 'T-2', name: 'میز ۴ نفره سالن', status: 'Occupied', detail: 'بخش مرکزی سالن سنتی' },
      { id: 'T-3', name: 'میز ۶ نفره خانوادگی', status: 'Cleaning', detail: 'کنار حوضچه سنتی رستوران' },
      { id: 'T-4', name: 'میز ۸ نفره شاه‌نشین VIP', status: 'Available', detail: 'مستقل • دکوراسیون سنتی ویژه' },
    ],
    'b3': [ // Spa/Massage cabins
      { id: 'C-1', name: 'کابین تایلندی VIP', status: 'Occupied', detail: 'ماساژ سنتی همراه با آروماتراپی' },
      { id: 'C-2', name: 'کابین سوئدی ۱', status: 'Available', detail: 'تخت ماساژ برقی • دکور چوبی' },
      { id: 'C-3', name: 'کابین اسپا جکوزی', status: 'Cleaning', detail: 'سونا بخار و وان اختصاصی پرسنل' },
    ],
    'b4': [ // Flight routes
      { id: 'F-101', name: 'تهران (THR) - مشهد (MHD)', status: 'OnTime', detail: 'ساعت پرواز: ۰۸:۳۰ • ایرباس A320', capacity: '۱۶۰ صندلی', price: '۲,۵۰۰,۰۰۰ تومان' },
      { id: 'F-102', name: 'تهران (THR) - کیش (KIH)', status: 'Boarding', detail: 'ساعت پرواز: ۱۱:۱۵ • بوئینگ ۷۳۷', capacity: '۱۴5 صندلی', price: '۳,۸۰۰,۰۰۰ تومان' },
      { id: 'F-103', name: 'تهران (THR) - استانبول (IST)', status: 'Delayed', detail: 'ساعت پرواز: ۱۴:۴۵ • ایرباس A330', capacity: '۲۹۰ صندلی', price: '۱۲,۰۰۰,۰۰۰ تومان' },
    ],
    'b5': [ // Train lines
      { id: 'TR-302', name: 'قطار ۵ ستاره فدک (تهران - مشهد)', status: 'Available', detail: 'حرکت: ۱۷:۴۰ • کوپه ۴ نفره ویژه با پذیرایی شام', capacity: '۴۰ کوپه', price: '۹۸۰,۰۰۰ تومان' },
      { id: 'TR-408', name: 'قطار نورالرضا (اصفهان - تهران)', status: 'Occupied', detail: 'حرکت: ۲۱:۱۵ • سالنی ۴ تخته اکونومی', capacity: '۳۲ کوپه', price: '۴۵۰,۰۰۰ تومان' },
      { id: 'TR-119', name: 'قطار لوکس غزال (تهران - بندرعباس)', status: 'Available', detail: 'حرکت: ۱۳:۱۰ • کوپه‌ای ۴ تخته لوکس', capacity: '۴۸ کوپه', price: '۷۲۰,۰۰۰ تومان' },
    ],
    'b6': [ // Car Rental fleet
      { id: 'CAR-1', name: 'بنز کلاس E (نقره‌ای لوکس)', status: 'Available', detail: 'مدل ۲۰۲۱ • اتوماتیک • بیمه بدنه کامل تشریفاتی', capacity: 'روزانه: ۵,۰۰۰,۰۰۰', price: 'سوخت فول' },
      { id: 'CAR-2', name: 'سوناتا YF (سفید صدفی)', status: 'Occupied', detail: 'مدل ۲۰۱۶ • اتوماتیک • ترانسفر فرودگاهی رایگان', capacity: 'روزانه: ۲,۲۰۰,۰۰۰', price: 'سوخت نصفه' },
      { id: 'CAR-3', name: 'پژو ۲۰۷ اتوماتیک (مشکی)', status: 'Cleaning', detail: 'مدل ۱۴۰۳ • سقف شیشه‌ای پانوراما • کارکرد کم', capacity: 'روزانه: ۱,۲۰۰,۰۰۰', price: 'سوخت فول' },
    ],
    'b7': [ // Villas
      { id: 'V-101', name: 'ویلا ساحلی دوبلکس استخردار (رامسر)', status: 'Occupied', detail: '۴ خوابه • استخر آبگرم داخلی • دسترسی مستقیم دریا', capacity: '۴ خواب', price: '۶,۵۰۰,۰۰۰ تومان' },
      { id: 'V-102', name: 'کلبه سوئیسی جنگلی مدرن (ماسال)', status: 'Available', detail: '۲ خوابه • تراس شیشه‌ای معلق • باربیکیو ذغالی', capacity: '۲ خواب', price: '۳,۲۰۰,۰۰۰ تومان' },
      { id: 'V-103', name: 'پنت‌هائوس ساحلی مدرن (کیش)', status: 'Available', detail: '۳ خوابه • جکوزی رو به افق خلیج فارس', capacity: '۳ خواب', price: '۸,۰۰۰,۰۰۰ تومان' },
    ],
    'b8': [ // Independent Entertainment
      { id: 'ENT-1', name: 'پیست کارتینگ فرمول یک کارن', status: 'Available', detail: 'طول مسیر ۱۲۰۰ متر • ماشین‌های هوندا ۲۰۰ سی‌سی', capacity: 'ظرفیت لایو: ۱۵ خودرو' },
      { id: 'ENT-2', name: 'سالن بولینگ هوشمند ۱۶ لاین', status: 'Occupied', detail: 'سیستم ثبت لایو امتیازها • لاین ۱ الی ۴ رزرو تورنمنت', capacity: 'ظرفیت لایو: ۱۰ لاین' },
    ]
  });

  // Dictionary state to store bookings for each business ID
  const [businessBookings, setBusinessBookings] = useState<Record<string, any[]>>({
    'b1': [
      { id: 'b-101', guest: 'کیوان خسروی', spaceId: '۱۰۱', date: '۱۴۰۵/۰۴/۲۶', status: 'تایید شده', voucher: 'V-401' },
      { id: 'b-102', guest: 'مهسا علیزاده', spaceId: '۱۰۲', date: '۱۴۰۵/۰۴/۲۷', status: 'پذیرش شده', voucher: 'V-402' },
    ],
    'b2': [
      { id: 'b-201', guest: 'دکتر علیرضا محمدی', spaceId: 'T-2', date: '۱۴۰۵/۰۴/۲۶', status: 'تایید شده', voucher: 'VR-211' },
    ],
    'b3': [
      { id: 'b-301', guest: 'خانم الهام نوری', spaceId: 'C-1', date: '۱۴۰۵/۰۴/۲۶', status: 'در حال خدمات', voucher: 'VS-981' },
    ],
    'b4': [
      { id: 'b-401', guest: 'فرزاد اکبری • سهراب فرزانه', spaceId: 'F-101', date: '۱۴۰۵/۰۴/۲۶', status: 'صادر شده', voucher: 'FL-612' },
      { id: 'b-402', guest: 'آرزو شاکری', spaceId: 'F-102', date: '۱۴۰۵/۰۴/۲۸', status: 'صادر شده', voucher: 'FL-903' }
    ],
    'b5': [
      { id: 'b-501', guest: 'سید علی حسینی (کوپه دربست)', spaceId: 'TR-302', date: '۱۴۰۵/۰۴/۲۶', status: 'قطعی', voucher: 'TRN-105' }
    ],
    'b6': [
      { id: 'b-601', guest: 'محمد جمشیدی (۳ روز)', spaceId: 'CAR-2', date: '۱۴۰۵/۰۴/۲۶', status: 'درحال استفاده', voucher: 'RENT-742' }
    ],
    'b7': [
      { id: 'b-701', guest: 'خانواده محترم کریمی (۲ شب)', spaceId: 'V-101', date: '۱۴۰۵/۰۴/۲۶', status: 'رزرو قطعی', voucher: 'VIL-332' }
    ],
    'b8': [
      { id: 'b-801', guest: 'امید شاهین (بولینگ)', spaceId: 'ENT-2', date: '۱۴۰۵/۰۴/۲۶', status: 'فعال', voucher: 'ENT-119' }
    ]
  });

  // State for Booking Form Input
  const [guestNameInput, setGuestNameInput] = useState('');
  const [selectedSpaceInput, setSelectedSpaceInput] = useState('');

  // Auto-set the first available space/route as selection when active business changes
  useEffect(() => {
    const items = businessItems[activeId] || [];
    if (items.length > 0) {
      setSelectedSpaceInput(items[0].id);
    } else {
      setSelectedSpaceInput('');
    }
  }, [activeId, businessItems]);

  // Handle cycle/toggle status of rooms/vehicles/flights
  const handleToggleStatus = (itemId: string) => {
    setBusinessItems(prev => {
      const currentItems = prev[activeId] || [];
      const updatedItems = currentItems.map(item => {
        if (item.id === itemId) {
          // Check business type to toggle states logically
          if (activeBusiness.type === 'Flight') {
            const nextMap: Record<string, string> = {
              'OnTime': 'Boarding',
              'Boarding': 'Delayed',
              'Delayed': 'OnTime'
            };
            return { ...item, status: nextMap[item.status] || 'OnTime' };
          } else if (activeBusiness.type === 'Train') {
            const nextMap: Record<string, string> = {
              'Available': 'Occupied',
              'Occupied': 'Available'
            };
            return { ...item, status: nextMap[item.status] || 'Available' };
          } else if (activeBusiness.type === 'CarRental' || activeBusiness.type === 'Hotel' || activeBusiness.type === 'Entertainment' || activeBusiness.type === 'Villa') {
            const nextMap: Record<string, string> = {
              'Available': 'Occupied',
              'Occupied': 'Cleaning',
              'Cleaning': 'Available'
            };
            return { ...item, status: nextMap[item.status] || 'Available' };
          }
        }
        return item;
      });
      return { ...prev, [activeId]: updatedItems };
    });
  };

  // Add Item (Quick item injection)
  const [newItemName, setNewItemName] = useState('');
  const [newItemDetail, setNewItemDetail] = useState('');
  const [newItemCode, setNewItemCode] = useState('');

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim() || !newItemCode.trim()) return;

    const newItem = {
      id: newItemCode,
      name: newItemName,
      status: activeBusiness.type === 'Flight' ? 'OnTime' : 'Available',
      detail: newItemDetail || 'ثبت شده توسط همکار پیشخوان',
      capacity: activeBusiness.type === 'Flight' || activeBusiness.type === 'Train' ? '۱۰۰ صندلی/کوپه' : undefined,
      price: activeBusiness.type === 'CarRental' ? 'روزانه: توافقی' : activeBusiness.type === 'Villa' ? 'شبی: توافقی' : undefined
    };

    setBusinessItems(prev => ({
      ...prev,
      [activeId]: [...(prev[activeId] || []), newItem]
    }));

    setNewItemName('');
    setNewItemCode('');
    setNewItemDetail('');
  };

  // Handle Manual Quick Booking Submission
  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestNameInput.trim() || !selectedSpaceInput) return;

    const voucherCodes: Record<BusinessType, string> = {
      'Hotel': 'HTL',
      'Restaurant': 'RST',
      'Flight': 'FLT',
      'Train': 'TRN',
      'CarRental': 'CAR',
      'Villa': 'VIL',
      'Entertainment': 'ENT',
      'Tour': 'TUR',
      'Other': 'OTH'
    };

    const prefix = voucherCodes[activeBusiness.type] || 'VP';
    const newBooking = {
      id: `b-${Date.now()}`,
      guest: guestNameInput,
      spaceId: selectedSpaceInput,
      date: '۱۴۰۵/۰۴/۲۶',
      status: activeBusiness.type === 'Flight' ? 'صادر شده' : 'تایید شده',
      voucher: `${prefix}-${Math.floor(100 + Math.random() * 900)}`
    };

    setBusinessBookings(prev => ({
      ...prev,
      [activeId]: [newBooking, ...(prev[activeId] || [])]
    }));

    // Update item status to Occupied automatically for rooms/villas/cars
    if (['Hotel', 'Villa', 'CarRental'].includes(activeBusiness.type)) {
      setBusinessItems(prev => {
        const currentItems = prev[activeId] || [];
        return {
          ...prev,
          [activeId]: currentItems.map(item => item.id === selectedSpaceInput ? { ...item, status: 'Occupied' } : item)
        };
      });
    }

    setGuestNameInput('');
  };

  // Remove Booking
  const handleCancelBooking = (bookingId: string) => {
    setBusinessBookings(prev => ({
      ...prev,
      [activeId]: (prev[activeId] || []).filter(item => item.id !== bookingId)
    }));
  };

  // Switch Business
  const handleSwitch = (id: string) => {
    setActiveId(id);
    setActiveTab('spaces');
  };

  // Add / Define New Business Handler
  const handleCreateBusinessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBizName.trim()) {
      alert('لطفاً نام کسب‌وکار را وارد کنید.');
      return;
    }

    const newId = `b-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
    const newBiz: Business = {
      id: newId,
      name: newBizName,
      type: newBizType,
      status: 'Active',
      modules: ['Dashboard', 'Reservations', 'Settings'],
      createdAt: new Date().toISOString().split('T')[0],
      address: newBizAddress || 'پیش‌فرض ثبت الکترونیکی صنف',
      facilityCount: parseInt(newBizCapacity) || 10,
      revenue: 0,
      activeBookings: 0,
      isSubService: newBizType === 'Entertainment' && isEntertainmentSubService,
      parentId: (newBizType === 'Entertainment' && isEntertainmentSubService) ? parentHotelId : undefined,
      subServiceType: newBizType === 'Entertainment' ? entertainmentSubType : undefined
    };

    // Add business to list, deduplicate, and persist
    setBusinesses(prev => {
      const next = [...prev, newBiz];
      const unique = Array.from(new Map(next.map(b => [b.id, b])).values());
      localStorage.setItem('paradise_businesses', JSON.stringify(unique));
      window.dispatchEvent(new Event('businesses_updated'));
      return unique;
    });

    // Setup initial customized operational items for the new business
    let defaultItems: any[] = [];
    if (newBizType === 'Hotel') {
      defaultItems = [
        { id: '۱۰۱', name: 'واحد اقامتی تیپ A', status: 'Available', detail: 'اتاق استاندارد ظرفیت پایه' },
        { id: '۱۰۲', name: 'واحد اقامتی تیپ B', status: 'Available', detail: 'سوئیت خانوادگی لوکس' },
      ];
    } else if (newBizType === 'Flight') {
      defaultItems = [
        { id: 'FL-701', name: 'تهران - کیش', status: 'OnTime', detail: 'ساعت حرکت: ۱۰:۰۰', capacity: '۱۵۰ صندلی', price: '۳,۰۰۰,۰۰۰ تومان' },
      ];
    } else if (newBizType === 'Train') {
      defaultItems = [
        { id: 'TR-102', name: 'تهران - مشهد (سریع‌السیر)', status: 'Available', detail: 'حرکت: ۱۵:۲۰ • کوپه ۴ نفره', capacity: '۴۰ کوپه', price: '۶۵۰,۰۰۰ تومان' },
      ];
    } else if (newBizType === 'CarRental') {
      defaultItems = [
        { id: 'CAR-X', name: 'پژو ۲۰۷ دنده‌ای (سفید)', status: 'Available', detail: 'روزانه: ۱,۱۰۰,۰۰۰ تومان', capacity: 'مخزن سوخت کامل' },
      ];
    } else if (newBizType === 'Villa') {
      defaultItems = [
        { id: 'VIL-1', name: 'ویلای کوهستانی جنگلی چوبین', status: 'Available', detail: 'ظرفیت ۴ نفر • جکوزی روباز آبگرم' },
      ];
    } else if (newBizType === 'Entertainment') {
      const typeLabel = entertainmentSubType === 'Restaurant' ? 'رستوران و بوفه مجلل' : 
                         entertainmentSubType === 'Gaming' ? 'کلوب بازی واقعیت مجازی' :
                         entertainmentSubType === 'Pool' ? 'استخر آبگرم و سونا بخار' : 'اتاق ماساژVIP لایف';
      defaultItems = [
        { id: 'ENT-Z', name: `${typeLabel} اختصاصی`, status: 'Available', detail: 'ثبت شده در بستر همگام شرکا' },
      ];
    }

    setBusinessItems(prev => ({
      ...prev,
      [newId]: defaultItems
    }));

    setBusinessBookings(prev => ({
      ...prev,
      [newId]: []
    }));

    // Reset fields & switch active business to new
    setNewBizName('');
    setNewBizAddress('');
    setNewBizCapacity('10');
    setIsEntertainmentSubService(false);
    setParentHotelId('');
    setShowCreateModal(false);
    setActiveId(newId);
    setActiveTab('spaces');
  };

  const handleUpdateRevenue = (id: string, newRevenue: number) => {
    setBusinesses(prev => {
      const next = prev.map(b => b.id === id ? { ...b, revenue: newRevenue } : b);
      localStorage.setItem('paradise_businesses', JSON.stringify(next));
      return next;
    });
  };

  // Get active items and bookings
  const currentItems = businessItems[activeId] || [];
  const currentBookings = businessBookings[activeId] || [];

  // Helper to get Icon based on Business Type
  const getBusinessIcon = (type: BusinessType, size = 18) => {
    switch(type) {
      case 'Hotel': return <Building2 size={size} />;
      case 'Flight': return <Plane size={size} />;
      case 'Train': return <Train size={size} />;
      case 'CarRental': return <Car size={size} />;
      case 'Villa': return <Home size={size} />;
      case 'Entertainment': return <Activity size={size} />;
    }
  };

  // Helper to translate Business Type to Persian Label
  const getBusinessLabel = (type: BusinessType) => {
    switch(type) {
      case 'Hotel': return 'هتل و اقامتگاه';
      case 'Flight': return 'بلیت هواپیما';
      case 'Train': return 'بلیت قطار';
      case 'CarRental': return 'رنت خودرو';
      case 'Villa': return 'ویلا و سوئیت';
      case 'Entertainment': return 'خدمات تفریحی و ورزشی';
    }
  };

  // Helper to get sub-service icon badge details
  const getSubServiceTypeLabel = (subType?: string) => {
    switch (subType) {
      case 'Restaurant': return 'رستوران و کافی‌شاپ';
      case 'Gaming': return 'بازی و سرگرمی';
      case 'Pool': return 'استخر و آب‌درمانی';
      case 'Massage': return 'اسپا و ماساژ';
      default: return 'سایر سرگرمی‌ها';
    }
  };

  const getSubServiceIcon = (subType?: string, size = 14) => {
    switch (subType) {
      case 'Restaurant': return <Coffee size={size} />;
      case 'Gaming': return <Activity size={size} />;
      case 'Pool': return <Waves size={size} />;
      case 'Massage': return <Dumbbell size={size} />;
      default: return <Sparkles size={size} />;
    }
  };

  // Only list hotels for potential parent linkage
  const hotelBusinesses = businesses.filter(b => b.type === 'Hotel');

  return (
    <div className="flex-1 flex h-full bg-slate-50 dark:bg-[#070913] text-right font-sans overflow-hidden" dir="rtl">
      
      {/* ==================== ACTIVE CONTENT DISPLAY CONTAINER (FULL SCREEN) ==================== */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Top Header Row of Main Workspace with Dropdown Selector */}
        <header className="h-20 border-b border-slate-200/50 dark:border-slate-900/50 bg-white dark:bg-[#0a0d1e] flex items-center justify-between px-8 shrink-0 relative z-10 select-none">
          <div className="flex items-center gap-4">
            
            {/* Interactive Workspace Dropdown Selector */}
            <div className="relative">
              <button 
                onClick={() => setIsSwitcherOpen(!isSwitcherOpen)}
                className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-900/50 dark:hover:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 transition-all text-right cursor-pointer shadow-sm group animate-in fade-in"
              >
                <div className="w-8 h-8 rounded-xl bg-orange-500/10 text-[#e05307] flex items-center justify-center shrink-0 border border-orange-500/20">
                  {getBusinessIcon(activeBusiness.type, 16)}
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-black text-slate-900 dark:text-white group-hover:text-[#e05307] transition-colors">
                      {activeBusiness.name}
                    </span>
                    <ChevronDown size={14} className={cn("text-slate-400 dark:text-slate-500 transition-transform duration-200", isSwitcherOpen && "rotate-180")} />
                  </div>
                  <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold block mt-0.5">
                    {getBusinessLabel(activeBusiness.type)} {activeBusiness.isSubService && '• سرویس وابسته'}
                  </span>
                </div>
              </button>

              {/* The switcher dropdown overlay */}
              {isSwitcherOpen && (
                <>
                  {/* Backdrop click closer */}
                  <div className="fixed inset-0 z-40 cursor-default" onClick={() => setIsSwitcherOpen(false)} />
                  
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-[#0a0d1e] border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xl p-4 z-50 text-right animate-in fade-in slide-in-from-top-3 duration-200 flex flex-col gap-3">
                    
                    {/* Switcher Header */}
                    <div className="border-b border-slate-100 dark:border-slate-800/60 pb-2 flex items-center justify-between">
                      <span className="text-[10px] font-black text-slate-400 dark:text-slate-500">کسب‌وکارهای فعال شما</span>
                      <button 
                        onClick={() => {
                          setShowCreateModal(true);
                          setIsSwitcherOpen(false);
                        }}
                        className="text-[9px] font-black text-[#e05307] hover:text-[#c24405] bg-orange-500/5 px-2 py-1 rounded-lg border border-orange-500/10 transition cursor-pointer"
                      >
                        + تعریف صنف جدید
                      </button>
                    </div>

                    {/* Search Input inside Dropdown */}
                    <div className="relative">
                      <input 
                        type="text"
                        placeholder="جستجوی صنف..."
                        value={switcherSearch}
                        onChange={(e) => setSwitcherSearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 bg-slate-50 dark:bg-[#0c0f24] border border-slate-200 dark:border-slate-850 rounded-xl text-[10px] font-bold text-slate-900 dark:text-white outline-none focus:border-[#e05307] transition-all text-right"
                      />
                      <Search size={12} className="absolute left-3 top-2.5 text-slate-400" />
                    </div>

                    {/* Businesses Scroll List */}
                    <div className="space-y-1 max-h-[220px] overflow-y-auto pr-0.5 custom-scrollbar">
                      {businesses
                        .filter(biz => biz.name.toLowerCase().includes(switcherSearch.toLowerCase()) || getBusinessLabel(biz.type).includes(switcherSearch))
                        .map((biz) => {
                          const isActive = biz.id === activeId;
                          return (
                            <button 
                              key={biz.id}
                              onClick={() => {
                                handleSwitch(biz.id);
                                setIsSwitcherOpen(false);
                              }}
                              className={cn(
                                "w-full p-2.5 rounded-xl border text-right transition-all flex items-center gap-2.5 select-none cursor-pointer",
                                isActive 
                                  ? "bg-orange-500/10 dark:bg-orange-950/20 border-[#e05307] text-[#e05307]" 
                                  : "bg-transparent hover:bg-slate-50 dark:hover:bg-slate-900/60 border-transparent text-slate-700 dark:text-slate-300"
                              )}
                            >
                              <div className={cn(
                                "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border",
                                isActive ? "bg-[#e05307]/10 border-[#e05307]/20 text-[#e05307]" : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400"
                              )}>
                                {getBusinessIcon(biz.type, 14)}
                              </div>
                              <div className="overflow-hidden flex-1">
                                <span className={cn(
                                  "text-[10px] font-black truncate block",
                                  isActive ? "text-[#e05307]" : "text-slate-900 dark:text-white"
                                )}>
                                  {biz.name}
                                </span>
                                <span className="text-[8px] text-slate-400 dark:text-slate-500 font-bold block">
                                  {getBusinessLabel(biz.type)}
                                </span>
                              </div>
                              {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#e05307] shrink-0" />}
                            </button>
                          );
                        })}
                    </div>

                    {/* Footer Utility Actions inside Dropdown */}
                    <div className="border-t border-slate-100 dark:border-slate-800/60 pt-2 flex flex-col gap-1">
                      <button 
                        onClick={() => {
                          setIsSwitcherOpen(false);
                          window.dispatchEvent(new Event('triggerWorkspaceTour'));
                        }}
                        className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-900/50 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg text-[9px] font-black transition cursor-pointer"
                      >
                        <span className="flex items-center gap-1.5">
                          <Sparkles size={11} className="text-orange-500 animate-pulse" />
                          راهنمای تعاملی پیشخوان
                        </span>
                        <span className="text-[8px] opacity-50 font-mono">✦ Tour</span>
                      </button>

                      <button 
                        onClick={() => {
                          setIsSwitcherOpen(false);
                          onBackToHub();
                        }}
                        className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-lg text-[9px] font-black transition cursor-pointer"
                      >
                        <span className="flex items-center gap-1.5">
                          <LogOut size={11} />
                          خروج از پیشخوان شرکا
                        </span>
                        <span className="text-[8px] opacity-50 font-mono">✦ Exit</span>
                      </button>
                    </div>

                  </div>
                </>
              )}
            </div>

            {/* Sub-Service Parent Indicator */}
            {activeBusiness.isSubService && activeBusiness.parentId && (
              <div className="flex items-center gap-1.5 text-[9px] font-black bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full border border-amber-500/15 animate-in fade-in">
                <LinkIcon size={10} />
                وابسته به: {businesses.find(b => b.id === activeBusiness.parentId)?.name || 'هتل مرجع'}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 font-bold bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800">
              تاریخ همگام‌سازی: امروز (۱۴۰۵/۰۴/۲۶)
            </span>
          </div>
        </header>

        {activeBusiness.type === 'Hotel' ? (
          <HotelPremiumDashboard 
            business={activeBusiness} 
            onUpdateRevenue={handleUpdateRevenue}
            onUpdateBusiness={props.onUpdateBusiness}
          />
        ) : (
          <>
            {/* Scrollable Workspace Area */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 relative space-y-6">
          
          {/* Dashboard mini metrics ribbon */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-[#0a0d1e] border border-slate-200/50 dark:border-slate-850 p-4 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[9px] text-slate-400 block font-bold">بلیت‌ها / رزروهای فعال امروز</span>
                <span className="text-sm font-black text-slate-900 dark:text-white mt-1 block">{currentBookings.length} واچر صادر شده</span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                <Calendar size={16} />
              </div>
            </div>

            <div className="bg-white dark:bg-[#0a0d1e] border border-slate-200/50 dark:border-slate-850 p-4 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[9px] text-slate-400 block font-bold">مجموع درآمد ثبت شده صنف</span>
                <span className="text-sm font-black text-emerald-500 mt-1 block">{(activeBusiness.revenue || 0).toLocaleString()} ریال</span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <DollarSign size={16} />
              </div>
            </div>

            <div className="bg-white dark:bg-[#0a0d1e] border border-slate-200/50 dark:border-slate-850 p-4 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[9px] text-slate-400 block font-bold">واحدهای فیزیکی تحت مانیتور</span>
                <span className="text-sm font-black text-slate-900 dark:text-white mt-1 block">{currentItems.length} {activeBusiness.type === 'Flight' ? 'خط پروازی' : activeBusiness.type === 'Train' ? 'خط ریلی' : 'واحد فعال'}</span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                <Layers size={16} />
              </div>
            </div>
          </div>

          {/* ==================== TAB 1: OPERATIONS (CUSTOM FOR EVERY SINGLE BUSINESS TYPE) ==================== */}
          {activeTab === 'spaces' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Top sub-header & legend */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-200/40 dark:border-slate-800/40">
                <div>
                  <h3 className="text-xs font-black text-slate-900 dark:text-white">نمای وضعیت مانیتورینگ آنلاین صنف</h3>
                  <p className="text-[10px] text-slate-400 font-bold mt-1">
                    {(activeBusiness.type as string) === 'Hotel' && 'برای تغییر فیزیکی وضعیت اتاق‌ها بین حالت‌های خالی، پر و در حال نظافت، روی دکمه کلیک کنید.'}
                    {activeBusiness.type === 'Flight' && 'خطوط پروازی فعال امروز شرکت هواپیمایی. وضعیت‌ها به صورت خودکار با رادار هماهنگ می‌شوند.'}
                    {activeBusiness.type === 'Train' && 'وضعیت واگن‌ها و لوکوموتیوهای ریلی مسافربری ناوگان همگام.'}
                    {activeBusiness.type === 'CarRental' && 'ناوگان خودروهای لوکس و تشریفاتی. وضعیت‌های بنزین، بیمه و کاربری.'}
                    {activeBusiness.type === 'Villa' && 'وضعیت رزرو و آماده‌سازی اقامتگاه‌ها و ویلاهای تفریحی کلوپ.'}
                    {activeBusiness.type === 'Entertainment' && 'فضاها، میزها، باجه‌ها یا کابین‌های تفریحی فعال برای مشتریان.'}
                  </p>
                </div>

                {/* Logically adapted Status Badge Legends based on business type */}
                <div className="flex gap-2 text-[8px] font-black flex-wrap">
                  {activeBusiness.type === 'Flight' ? (
                    <>
                      <span className="px-2 py-1 bg-emerald-55/10 text-emerald-500 border border-emerald-500/10 rounded-lg">✓ به موقع (On Time)</span>
                      <span className="px-2 py-1 bg-amber-55/10 text-amber-500 border border-amber-500/10 rounded-lg">✦ در حال سوار کردن مسافر</span>
                      <span className="px-2 py-1 bg-rose-55/10 text-rose-500 border border-rose-500/10 rounded-lg">⚠ تاخیر در پرواز</span>
                    </>
                  ) : activeBusiness.type === 'Train' ? (
                    <>
                      <span className="px-2 py-1 bg-emerald-55/10 text-emerald-500 border border-emerald-500/10 rounded-lg">● آماده مسافرگیری</span>
                      <span className="px-2 py-1 bg-blue-55/10 text-blue-500 border border-blue-500/10 rounded-lg">● در حال سفر / پر</span>
                    </>
                  ) : (
                    <>
                      <span className="px-2 py-1 bg-emerald-55/10 text-emerald-500 border border-emerald-500/10 rounded-lg">● آزاد و آماده پذیرش</span>
                      <span className="px-2 py-1 bg-blue-55/10 text-blue-500 border border-blue-500/10 rounded-lg">● اشغال / دارای پذیرش فعال</span>
                      <span className="px-2 py-1 bg-amber-55/10 text-amber-500 border border-amber-500/10 rounded-lg">● در حال نظافت / بازسازی</span>
                    </>
                  )}
                </div>
              </div>

              {/* Dynamic Operations Grid */}
              <div data-tour="dash-spaces-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentItems.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-white dark:bg-[#0a0d1e] rounded-2xl border border-slate-200/60 dark:border-slate-850 p-5 flex flex-col justify-between h-40 hover:border-blue-500/30 transition-all shadow-sm relative text-right"
                  >
                    {/* Item Card Upper Body */}
                    <div className="flex justify-between items-start gap-2">
                      <div className="overflow-hidden">
                        <span className="text-[9px] text-slate-400 font-bold block font-mono">کد مرجع: {item.id}</span>
                        <h4 className="text-xs font-black text-slate-900 dark:text-white mt-1 truncate">{item.name}</h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold mt-1 leading-normal line-clamp-2">
                          {item.detail}
                        </p>
                      </div>

                      {/* Status Badges logical mapping */}
                      <span className={cn(
                        "px-2.5 py-1 rounded-full text-[8px] font-black border shrink-0",
                        // Flight states
                        item.status === 'OnTime' ? 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30' :
                        item.status === 'Boarding' ? 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30' :
                        item.status === 'Delayed' ? 'bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/30' :
                        // General states
                        item.status === 'Available' ? 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30' :
                        item.status === 'Occupied' ? 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30' :
                        'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30'
                      )}>
                        {/* Flight states label */}
                        {item.status === 'OnTime' && "به موقع"}
                        {item.status === 'Boarding' && "در حال سوارگیری"}
                        {item.status === 'Delayed' && "تاخیر مجاز"}
                        {/* General states label */}
                        {item.status === 'Available' && (activeBusiness.type === 'Train' ? "آماده حرکت" : "آزاد / آماده")}
                        {item.status === 'Occupied' && (activeBusiness.type === 'Flight' || activeBusiness.type === 'Train' ? "تکمیل ظرفیت" : activeBusiness.type === 'CarRental' ? "در اختیار مشتری" : "پذیرش شده")}
                        {item.status === 'Cleaning' && (activeBusiness.type === 'CarRental' ? "کارواش / پولیش" : "در حال نظافت")}
                      </span>
                    </div>

                    {/* Meta info ribbon */}
                    {(item.capacity || item.price) && (
                      <div className="flex gap-4 text-[9px] font-black text-slate-400 mt-2">
                        {item.capacity && <span> ظرفیت: {item.capacity} </span>}
                        {item.price && <span className="text-blue-600 dark:text-blue-400"> قیمت: {item.price} </span>}
                      </div>
                    )}

                    {/* Item Card Interactive Footer */}
                    <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-900/60 mt-2">
                      <span className="text-[9px] text-slate-400 font-bold">تغییر وضعیت لایو:</span>
                      <button 
                        onClick={() => handleToggleStatus(item.id)}
                        className="bg-slate-50 hover:bg-blue-50 dark:bg-slate-900 dark:hover:bg-blue-950/30 text-slate-600 dark:text-slate-300 hover:text-blue-600 px-3.5 py-1.5 rounded-xl text-[9px] font-black transition border border-slate-200/40 dark:border-slate-800/80 cursor-pointer"
                      >
                        {activeBusiness.type === 'Flight' ? 'تغییر وضعیت پرواز' : 'تغییر وضعیت صنف'}
                      </button>
                    </div>

                  </div>
                ))}

                {/* Empty Operational Items Placeholder */}
                {currentItems.length === 0 && (
                  <div className="col-span-full bg-slate-100/40 dark:bg-slate-900/10 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-10 text-center">
                    <Sliders size={24} className="text-slate-400 mx-auto mb-3" />
                    <p className="text-xs font-black text-slate-600 dark:text-slate-400">هیچ واحد، خودرو یا مسیری در حال حاضر تعریف نشده است.</p>
                    <p className="text-[10px] text-slate-400 mt-1">میتوانید از فرم پایین همین بخش واحد دلخواه جدیدتان را اضافه کنید.</p>
                  </div>
                )}
              </div>

              {/* Form to ADD a new item/resource to the active business */}
              <div className="bg-white dark:bg-[#0a0d1e] p-5 rounded-2xl border border-slate-200/60 dark:border-slate-850 space-y-4">
                <h4 className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Plus size={14} className="text-blue-600" /> 
                  تعریف واحد فیزیکی یا منبع جدید برای «{activeBusiness.name}»
                </h4>
                
                <form onSubmit={handleAddItem} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-bold block">
                      {activeBusiness.type === 'Flight' ? 'شماره پرواز' : activeBusiness.type === 'Train' ? 'شماره لوکوموتیو / خط' : activeBusiness.type === 'CarRental' ? 'کد خودرو / پلاک' : 'شماره واحد / شناسه'}
                    </label>
                    <input 
                      required
                      type="text" 
                      value={newItemCode} 
                      onChange={e => setNewItemCode(e.target.value)}
                      placeholder="مثال: ۱۰۷" 
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0c0f24] border border-slate-200 dark:border-slate-850 rounded-xl text-slate-950 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 font-bold transition-all text-left" 
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-bold block">
                      {activeBusiness.type === 'Flight' ? 'مسیر پروازی' : activeBusiness.type === 'Train' ? 'خط ریلی مبدا - مقصد' : activeBusiness.type === 'CarRental' ? 'مدل دقیق خودرو' : 'نام دقیق واحد / موقعیت'}
                    </label>
                    <input 
                      required
                      type="text" 
                      value={newItemName} 
                      onChange={e => setNewItemName(e.target.value)}
                      placeholder={activeBusiness.type === 'Flight' ? 'شیراز به مشهد' : activeBusiness.type === 'CarRental' ? 'لندکروز نیوفیس' : 'اتاق تریپل روبه باغ'} 
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0c0f24] border border-slate-200 dark:border-slate-850 rounded-xl text-slate-950 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 font-bold transition-all" 
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-bold block">توضیحات کوتاه / جزئیات امکانات</label>
                    <input 
                      type="text" 
                      value={newItemDetail} 
                      onChange={e => setNewItemDetail(e.target.value)}
                      placeholder="تخت دبل، قیمت روزانه، بیمه بدنه و..." 
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0c0f24] border border-slate-200 dark:border-slate-850 rounded-xl text-slate-950 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 font-bold transition-all" 
                    />
                  </div>

                  <button 
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-black py-2.5 rounded-xl text-xs transition shadow-md hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Plus size={14} />
                    افزودن منبع به صنف
                  </button>
                </form>
              </div>

            </div>
          )}

          {/* ==================== TAB 2: BOOKINGS / VOUCHERS ==================== */}
          {activeTab === 'bookings' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              <div className="flex justify-between items-center pb-4 border-b border-slate-200/40 dark:border-slate-800/40">
                <div>
                  <h3 className="text-xs font-black text-slate-900 dark:text-white">
                    {activeBusiness.type === 'Flight' ? 'فروش بلیت و لیست پروازها' : activeBusiness.type === 'Train' ? 'سامانه صدور بلیت لوکوموتیو' : 'دفترچه متمرکز ثبت رزرواسیون صنف'}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold mt-1">کلیه رکوردهای صادر شده به صورت دستی یا آنلاین توسط شرکای گردشگری پارادایس.</p>
                </div>
              </div>

              {/* Booking/Voucher Quick Form */}
              <div data-tour="dash-booking-form" className="bg-white dark:bg-[#0a0d1e] p-5 rounded-2xl border border-slate-200/60 dark:border-slate-850 space-y-4">
                <h4 className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Plus size={14} className="text-blue-600" /> 
                  صدور دستی واچر رزرو و بلیت جدید در پیشخوان
                </h4>

                <form onSubmit={handleCreateBooking} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-bold block">نام کامل میهمان / مسافر اصلی</label>
                    <input 
                      required
                      type="text" 
                      value={guestNameInput} 
                      onChange={e => setGuestNameInput(e.target.value)}
                      placeholder="مثال: رضا جعفری" 
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0c0f24] border border-slate-200 dark:border-slate-850 rounded-xl text-slate-950 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 font-bold transition-all" 
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-bold block">
                      {activeBusiness.type === 'Flight' ? 'انتخاب مسیر پروازی' : activeBusiness.type === 'Train' ? 'انتخاب کوپه ریلی' : activeBusiness.type === 'CarRental' ? 'انتخاب خودرو تشریفات' : 'انتخاب واحد / سوئیت فیزیکی'}
                    </label>
                    <select 
                      value={selectedSpaceInput} 
                      onChange={e => setSelectedSpaceInput(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0c0f24] border border-slate-200 dark:border-slate-850 rounded-xl text-slate-950 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 font-bold transition-all"
                    >
                      {currentItems.map(s => (
                        <option key={s.id} value={s.id}>{s.id} • {s.name}</option>
                      ))}
                    </select>
                  </div>

                  <button 
                    type="submit"
                    className="bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-black py-2.5 rounded-xl text-xs transition shadow-md hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle size={14} />
                    صدور واچر و قفل گنجایش
                  </button>
                </form>
              </div>

              {/* Bookings/Tickets List Table */}
              <div data-tour="dash-bookings-table" className="bg-white dark:bg-[#0a0d1e] rounded-2xl border border-slate-200/60 dark:border-slate-850 overflow-hidden shadow-sm">
                <table className="w-full text-xs text-right text-slate-500 dark:text-slate-400">
                  <thead className="bg-slate-50 dark:bg-[#0c0f24] text-slate-400 text-[10px] font-black border-b border-slate-100 dark:border-slate-850">
                    <tr>
                      <th className="px-5 py-3.5">شناسه واچر واگذار شده</th>
                      <th className="px-5 py-3.5">نام میهمان / مسافر</th>
                      <th className="px-5 py-3.5">واحد تخصیصی / سرویس</th>
                      <th className="px-5 py-3.5">تاریخ ثبت واچر</th>
                      <th className="px-5 py-3.5">وضعیت پذیرش</th>
                      <th className="px-5 py-3.5 text-left">عملیات شرکاء</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-900/50 font-bold">
                    {currentBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/10 transition-colors">
                        <td className="px-5 py-3.5 font-mono text-blue-600 dark:text-blue-400">{b.voucher}</td>
                        <td className="px-5 py-3.5 text-slate-900 dark:text-white">{b.guest}</td>
                        <td className="px-5 py-3.5">
                          {activeBusiness.type === 'Flight' ? `پرواز ${b.spaceId}` : activeBusiness.type === 'Train' ? `قطار ${b.spaceId}` : activeBusiness.type === 'CarRental' ? `خودرو ${b.spaceId}` : `واحد ${b.spaceId}`}
                        </td>
                        <td className="px-5 py-3.5 text-slate-400 font-mono">{b.date}</td>
                        <td className="px-5 py-3.5">
                          <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 text-[9px] font-black rounded-md border border-emerald-100 dark:border-emerald-900/30">
                            {b.status}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-left">
                          <button 
                            onClick={() => handleCancelBooking(b.id)}
                            className="text-rose-500 hover:text-rose-700 hover:underline cursor-pointer font-black text-[10px] transition-all"
                          >
                            ابطال نهایی واچر
                          </button>
                        </td>
                      </tr>
                    ))}

                    {currentBookings.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-5 py-10 text-center text-slate-400 font-bold">
                          هیچ واچر یا بلیت فعالی برای این صنف تا این لحظه صادر نشده است.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* ==================== TAB 3: BASIC SETTINGS ==================== */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-in fade-in duration-300 max-w-xl">
              
              <div className="flex justify-between items-center pb-4 border-b border-slate-200/40 dark:border-slate-800/40">
                <div>
                  <h3 className="text-xs font-black text-slate-900 dark:text-white">تنظیمات پایه صنف و اطلاعات تجاری</h3>
                  <p className="text-[10px] text-slate-400 font-bold mt-1">مشخصات عمومی، ظرفیت اسمی و وضعیت حقوقی فعالیت صنف در پیشخوان.</p>
                </div>
              </div>

              <div className="bg-white dark:bg-[#0a0d1e] p-6 rounded-2xl border border-slate-200/60 dark:border-slate-850 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block">نام تجاری کسب‌وکار / صنف</label>
                  <input 
                    type="text" 
                    value={activeBusiness.name} 
                    onChange={e => {
                      const updatedVal = e.target.value;
                      setBusinesses(prev => prev.map(b => b.id === activeId ? { ...b, name: updatedVal } : b));
                    }}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0c0f24] border border-slate-200 dark:border-slate-850 rounded-xl text-slate-950 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 font-bold transition-all" 
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block">ظرفیت فیزیکی واگذاری بستر</label>
                  <input 
                    type="number" 
                    value={activeBusiness.facilityCount || 10} 
                    onChange={e => {
                      const updatedVal = parseInt(e.target.value) || 0;
                      setBusinesses(prev => prev.map(b => b.id === activeId ? { ...b, facilityCount: updatedVal } : b));
                    }}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0c0f24] border border-slate-200 dark:border-slate-850 rounded-xl text-slate-950 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 font-bold transition-all text-left" 
                    dir="ltr"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block">آدرس دقیق موقعیت فیزیکی یا آدرس ثبتی دفتر مرکزی</label>
                  <textarea 
                    value={activeBusiness.address || ''} 
                    onChange={e => {
                      const updatedVal = e.target.value;
                      setBusinesses(prev => prev.map(b => b.id === activeId ? { ...b, address: updatedVal } : b));
                    }}
                    rows={3}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0c0f24] border border-slate-200 dark:border-slate-850 rounded-xl text-slate-950 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 font-bold transition-all resize-none" 
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-900 text-left">
                  <button 
                    onClick={() => alert('تغییرات با موفقیت در فضای کار همگام‌سازی و ذخیره شد.')}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-black px-6 py-2.5 rounded-xl text-xs transition shadow-md cursor-pointer"
                  >
                    ذخیره تغییرات صنف
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

            {/* Footer */}
            <footer className="text-center text-[10px] text-slate-400 dark:text-slate-500 font-bold p-4 border-t border-slate-100 dark:border-slate-900 bg-white dark:bg-[#0a0d1e] shrink-0 select-none">
              کلیه اطلاعات در بستر محلی شرکا به‌روزرسانی لایو می‌شود • پارادایس ۱۴۰۵
            </footer>
          </>
        )}

      </main>

      {/* ==================== DEFINE NEW BUSINESS MODAL OVERLAY ==================== */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-950/70 z-[110] flex items-center justify-center p-3 sm:p-4 backdrop-blur-sm overflow-y-auto" dir="rtl">
          <div className="bg-white dark:bg-[#0a0d1e] border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg p-6 space-y-5 shadow-2xl relative text-right animate-in zoom-in-95 duration-200 my-auto max-h-[calc(100vh-2rem)] overflow-y-auto custom-scrollbar">
            
            {/* Modal Close Button */}
            <button 
              onClick={() => setShowCreateModal(false)}
              className="absolute left-4 top-4 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition"
            >
              <X size={18} />
            </button>

            {/* Modal Title */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500/10 text-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles size={16} />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white">تعریف کسب‌وکار و صنف جدید در پیشخوان</h3>
                <p className="text-[9px] text-slate-400 font-bold">بصورت نامحدود کسب‌وکارهای گردشگری و خدماتی جدید تعریف کنید.</p>
              </div>
            </div>

            <form onSubmit={handleCreateBusinessSubmit} className="space-y-4 pt-2">
              
              {/* Business Name Input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase block">نام دقیق صنف / شعبه جدید</label>
                <input 
                  required
                  type="text" 
                  value={newBizName} 
                  onChange={e => setNewBizName(e.target.value)}
                  placeholder="مثال: هتل رویال ترنج، بلیت قطار خلیج فارس، رنت کار سفیر و..." 
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0c0f24] border border-slate-200 dark:border-slate-850 rounded-xl text-slate-950 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 font-bold transition-all" 
                />
              </div>

              {/* Business Type Grid Selection */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase block">انتخاب نوع کسب‌وکار</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {(['Hotel', 'Flight', 'Train', 'CarRental', 'Villa', 'Entertainment'] as BusinessType[]).map((type) => {
                    const isSelected = newBizType === type;
                    return (
                      <button 
                        key={type}
                        type="button"
                        onClick={() => {
                          setNewBizType(type);
                          if (type !== 'Entertainment') {
                            setIsEntertainmentSubService(false);
                          }
                        }}
                        className={cn(
                          "p-2.5 rounded-xl border text-right transition-all flex flex-col justify-between h-20 cursor-pointer select-none",
                          isSelected 
                            ? "bg-blue-600 border-blue-600 text-white" 
                            : "bg-slate-50 dark:bg-slate-900/40 hover:bg-slate-100 border-slate-200 dark:border-slate-850 text-slate-700 dark:text-slate-300"
                        )}
                      >
                        <div className={cn(
                          "w-6 h-6 rounded-lg flex items-center justify-center shrink-0",
                          isSelected ? "bg-white/10 text-white" : "bg-white dark:bg-slate-950 text-slate-500 dark:text-slate-400 border border-slate-200/50"
                        )}>
                          {getBusinessIcon(type, 13)}
                        </div>
                        <span className="text-[9px] font-black mt-2">{getBusinessLabel(type)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Specific Sub-service layout options if type is Entertainment */}
              {newBizType === 'Entertainment' && (
                <div className="p-3.5 bg-blue-50/20 dark:bg-blue-950/20 rounded-2xl border border-blue-100/50 dark:border-blue-900/30 space-y-3 animate-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black text-slate-900 dark:text-white block">رابطه فیزیکی و تشکیلاتی</span>
                      <p className="text-[8px] text-slate-400 font-bold">آیا این سرگرمی زیرمجموعه و درون یکی از هتل‌های شماست یا مستقل است؟</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        type="button"
                        onClick={() => setIsEntertainmentSubService(true)}
                        className={cn(
                          "px-2.5 py-1 rounded-lg text-[9px] font-black cursor-pointer",
                          isEntertainmentSubService ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                        )}
                      >
                        زیرمجموعه هتل
                      </button>
                      <button 
                        type="button"
                        onClick={() => {
                          setIsEntertainmentSubService(false);
                          setParentHotelId('');
                        }}
                        className={cn(
                          "px-2.5 py-1 rounded-lg text-[9px] font-black cursor-pointer",
                          !isEntertainmentSubService ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                        )}
                      >
                        مستقل
                      </button>
                    </div>
                  </div>

                  {/* Hotel Linkage Selector if set to sub-service */}
                  {isEntertainmentSubService && (
                    <div className="space-y-1 animate-in slide-in-from-top-1 duration-150">
                      <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 block">انتخاب هتل مرجع</label>
                      <select 
                        required
                        value={parentHotelId}
                        onChange={e => setParentHotelId(e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-[#0c0f24] border border-slate-200 dark:border-slate-850 rounded-xl text-slate-950 dark:text-white text-[10px] font-bold focus:outline-none"
                      >
                        <option value="">-- یک هتل را انتخاب کنید --</option>
                        {hotelBusinesses.map(h => (
                          <option key={h.id} value={h.id}>{h.name}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Entertainment Type category picker */}
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 block">دسته‌بندی دقیق نوع سرگرمی</label>
                    <div className="flex gap-1.5 flex-wrap">
                      {[
                        { id: 'Restaurant', label: 'رستوران و کافی‌شاپ' },
                        { id: 'Gaming', label: 'بازی و گیمینگ / تفریحات' },
                        { id: 'Pool', label: 'استخر و آب‌درمانی' },
                        { id: 'Massage', label: 'اسپا و ماساژ' },
                        { id: 'Other', label: 'سایر موارد' }
                      ].map((sub) => (
                        <button 
                          key={sub.id}
                          type="button"
                          onClick={() => setEntertainmentSubType(sub.id as any)}
                          className={cn(
                            "px-2.5 py-1 rounded-lg text-[8px] font-black border cursor-pointer transition-all",
                            entertainmentSubType === sub.id 
                              ? "bg-amber-500 border-amber-500 text-white" 
                              : "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-850 text-slate-600 dark:text-slate-400"
                          )}
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Initial units limit and address inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 block">ظرفیت اولیه واحدها / خدمات</label>
                  <input 
                    type="number" 
                    value={newBizCapacity} 
                    onChange={e => setNewBizCapacity(e.target.value)}
                    placeholder="10" 
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0c0f24] border border-slate-200 dark:border-slate-850 rounded-xl text-slate-950 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 font-bold transition-all text-left" 
                    dir="ltr"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 block">دفتر مرکزی / آدرس دقیق</label>
                  <input 
                    type="text" 
                    value={newBizAddress} 
                    onChange={e => setNewBizAddress(e.target.value)}
                    placeholder="مثال: تهران، خیابان ونک، پلاک ۱۰" 
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0c0f24] border border-slate-200 dark:border-slate-850 rounded-xl text-slate-950 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 font-bold transition-all" 
                  />
                </div>
              </div>

              {/* Action submission buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-850">
                <button 
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="text-xs font-black text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
                >
                  انصراف و بستن
                </button>
                <button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-black px-6 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition shadow-lg shadow-blue-500/10 cursor-pointer"
                >
                  <CheckCircle size={14} />
                  ثبت و راه‌اندازی صنف تجاری
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
