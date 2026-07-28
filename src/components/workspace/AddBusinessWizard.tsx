import React, { useState } from 'react';
import { 
  ArrowRight, 
  Building2, 
  Plane, 
  Home, 
  Activity, 
  CheckCircle2, 
  ChevronLeft, 
  Check, 
  FileCheck, 
  Building, 
  MapPin, 
  Map, 
  Image as ImageIcon, 
  Info, 
  CreditCard, 
  Trash2,
  Lock,
  Timer,
  Utensils
} from 'lucide-react';
import { Business, BusinessType, ModuleType } from './types';
import { cn } from '@/lib/utils';
import { InteractiveMapPicker } from './InteractiveMapPicker';

const businessTypes: { type: BusinessType; icon: React.ReactNode; label: string; desc: string; disabled?: boolean }[] = [
  { type: 'Hotel', icon: <Building2 />, label: 'هتل و اقامتگاه', desc: 'مدیریت اتاق‌ها، رزرو و پذیرش' },
  { type: 'Restaurant', icon: <Utensils />, label: 'رستوران و کافی‌شاپ', desc: 'مدیریت منوی غذا، رزرو آنلاین میز و سفارشات' },
  { type: 'Entertainment', icon: <Activity />, label: 'سرگرمی و خدمات رفاهی', desc: 'مدیریت بلیت، سانس و استخر/ماساژ' },
  { type: 'Flight', icon: <Plane />, label: 'بلیت پرواز', desc: 'مدیریت بلیت و خطوط پروازی', disabled: true },
  { type: 'Train', icon: <Plane />, label: 'بلیت قطار', desc: 'مدیریت کوپه‌ها و رکوردهای لوکوموتیو', disabled: true },
  { type: 'CarRental', icon: <Plane />, label: 'اجاره خودرو', desc: 'مدیریت وسایل نقلیه و رنت', disabled: true },
  { type: 'Villa', icon: <Home />, label: 'ویلا و اقامتگاه', desc: 'مدیریت خانه‌ها و بومگردی‌ها', disabled: true },
];

export function AddBusinessWizard({ 
  businesses, 
  initialBusiness,
  onCancel, 
  onComplete 
}: { 
  businesses: Business[], 
  initialBusiness?: Business | null,
  onCancel: () => void,
  onComplete: (b: Business) => void
}) {
  // If editing an existing incomplete business profile, open at Step 2; if creating a brand new business, start at Step 1
  const [step, setStep] = useState(initialBusiness ? 2 : 1);
  const [type, setType] = useState<BusinessType | null>(initialBusiness?.type || null);
  
  // Base State
  // Default name: if empty or contains default placeholder keywords, leave empty so input is blank for user to type
  const [name, setName] = useState(
    initialBusiness?.name && !initialBusiness.name.includes('جدید') 
      ? initialBusiness.name 
      : ''
  );
  const [ownerName, setOwnerName] = useState(
    initialBusiness?.ownerName && !initialBusiness.ownerName.includes('جدید') && initialBusiness.ownerName !== 'کاربر جدید پارادایس'
      ? initialBusiness.ownerName 
      : ''
  );
  const [address, setAddress] = useState(
    initialBusiness?.address && !initialBusiness.address.includes('پرونده') 
      ? initialBusiness.address 
      : ''
  );
  const [facilityCount, setFacilityCount] = useState<number | ''>(
    initialBusiness?.facilityCount || ''
  );
  const [modules, setModules] = useState<ModuleType[]>(
    initialBusiness?.modules || ['Dashboard', 'Rooms', 'Reservations', 'CheckInOut', 'Team', 'Settings']
  );
  const [showMapPicker, setShowMapPicker] = useState(false);

  // Dynamic Hotel State
  const [stars, setStars] = useState('5');
  const [description, setDescription] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [checkIn, setCheckIn] = useState('14:00');
  const [checkOut, setCheckOut] = useState('12:00');
  const [hotelFacilities, setHotelFacilities] = useState<string[]>([
    'پارکینگ اختصاصی مسقف',
    'اینترنت Wi-Fi پرسرعت'
  ]);

  // Dynamic Entertainment State
  const [entertainmentType, setEntertainmentType] = useState('escape');
  const [ageLimit, setAgeLimit] = useState('12');
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('22:00');
  const [entFacilities, setEntFacilities] = useState<string[]>([
    'بلیت الکترونیک سریع',
    'کمد امانات الکترونیکی'
  ]);

  // Unified Document Upload State
  const [docFiles, setDocFiles] = useState<{ id: string; name: string; size: string }[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, string>>({});

  const handleAddDocument = () => {
    const newDoc = {
      id: `doc-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: `اسکن_مدرک_کسب‌وکار_${docFiles.length + 1}.jpg`,
      size: `${(Math.random() * 1.5 + 1).toFixed(1)} مگابایت`
    };
    setDocFiles(prev => [...prev, newDoc]);
  };

  const handleRemoveDocument = (id: string) => {
    setDocFiles(prev => prev.filter(d => d.id !== id));
  };

  const handleSelectType = (selectedType: BusinessType) => {
    const selectedObj = businessTypes.find(b => b.type === selectedType);
    if (selectedObj?.disabled) return;

    setType(selectedType);
    if (selectedType === 'Hotel') {
      setModules(['Dashboard', 'Rooms', 'Reservations', 'CheckInOut', 'Team', 'Settings']);
    } else if (selectedType === 'Restaurant') {
      setModules(['Dashboard', 'Menu', 'Tables', 'RestaurantOrders', 'Reservations', 'Finance', 'Settings']);
    } else if (selectedType === 'Entertainment') {
      setModules(['Dashboard', 'Reservations', 'Customers', 'Settings']);
    } else {
      setModules(['Dashboard', 'Reservations', 'Settings']);
    }
  };

  const handleSimulateUpload = (key: string, name: string) => {
    setUploadedFiles(prev => ({ ...prev, [key]: name }));
  };

  const handleRemoveSimulatedFile = (key: string) => {
    setUploadedFiles(prev => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const toggleHotelFacility = (facility: string) => {
    setHotelFacilities(prev => 
      prev.includes(facility) ? prev.filter(f => f !== facility) : [...prev, facility]
    );
  };

  const toggleEntFacility = (facility: string) => {
    setEntFacilities(prev => 
      prev.includes(facility) ? prev.filter(f => f !== facility) : [...prev, facility]
    );
  };

  const isNextDisabled = () => {
    if (step === 1 && !type) return true;
    // Step 2 title is now optional; if empty, a default name is auto-generated
    if (step === 3) {
      if (type === 'Hotel' && !nationalId) return true;
      if (type === 'Entertainment' && (!nationalId || !facilityCount)) return true;
    }
    return false;
  };

  const getDefaultBusinessName = () => {
    if (type === 'Hotel') return 'هتل و اقامتگاه جدید';
    if (type === 'Restaurant') return 'رستوران و کافی‌شاپ جدید';
    if (type === 'Entertainment') return 'مجموعه جدید تفریحی و سرگرمی';
    return 'مجموعه جدید پارادایس';
  };

  const handleCompleteRegistration = () => {
    const finalCount = facilityCount !== '' ? Number(facilityCount) : (type === 'Hotel' ? 12 : 30);
    const finalBusinessName = name.trim() || initialBusiness?.name || getDefaultBusinessName();

    const updatedBusiness: Business = {
      id: initialBusiness?.id || `b-${Date.now()}-${Math.floor(Math.random() * 100000)}`,
      name: finalBusinessName,
      type: type || initialBusiness?.type || 'Hotel',
      status: 'Active',
      completionPercentage: 100, // Finalize registration at 100%
      modules: modules.length > 0 ? modules : (type === 'Hotel' ? ['Dashboard', 'Rooms', 'Reservations', 'CheckInOut', 'Team', 'Settings'] : ['Dashboard', 'Reservations', 'Customers', 'Settings']),
      createdAt: initialBusiness?.createdAt || new Date().toISOString().split('T')[0],
      address: address.trim() || initialBusiness?.address || 'ثبت شده در اطلاعات پایه',
      facilityCount: finalCount,
      mobile: initialBusiness?.mobile || '09123456789',
      ownerName: ownerName.trim() || initialBusiness?.ownerName || 'کاربر جدید پارادایس',
      revenue: initialBusiness?.revenue || 0,
      activeBookings: initialBusiness?.activeBookings || 0
    };
    onComplete(updatedBusiness);
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleCompleteRegistration();
    }
  };

  const steps = [
    { id: 1, label: "صنف کسب‌وکار" },
    { id: 2, label: "اطلاعات پایه" },
    { id: 3, label: "مدارک و خدمات" },
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50/50 dark:bg-[#070913]">
      <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center justify-between px-4 sm:px-6 shrink-0 z-10">
        <button 
          onClick={onCancel} 
          className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-700 dark:text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer min-h-[44px]"
        >
          <ArrowRight size={18} />
          <span className="font-bold text-xs">بازگشت</span>
        </button>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {steps.map((s, idx) => (
            <React.Fragment key={s.id}>
              <div className="flex items-center gap-1.5">
                <div className={cn(
                  "w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 shrink-0", 
                  step > s.id ? "bg-emerald-600 text-white" :
                  step === s.id ? "bg-blue-600 text-white ring-4 ring-blue-500/10 shadow-lg shadow-blue-500/20" : 
                  "bg-slate-200 dark:bg-slate-800 text-slate-500"
                )}>
                  {step > s.id ? <Check size={14} strokeWidth={3} /> : s.id}
                </div>
                <span className={cn(
                  "hidden md:inline text-xs font-black transition-colors",
                  step === s.id ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-600"
                )}>
                  {s.label}
                </span>
              </div>
              {idx < steps.length - 1 && <div className={cn("w-4 sm:w-8 md:w-16 h-1 rounded-full transition-colors", step > s.id ? "bg-emerald-600" : "bg-slate-200 dark:bg-slate-800")} />}
            </React.Fragment>
          ))}
        </div>

        <div className="w-12 sm:w-20"></div> {/* Spacer for symmetry */}
      </header>

      <div className="flex-1 overflow-y-auto p-3 sm:p-6 md:p-8 flex justify-center items-start pt-4 sm:pt-8">
        <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl sm:rounded-[2.5rem] border border-slate-200/60 dark:border-slate-800/60 shadow-xl p-5 sm:p-8 md:p-12 relative overflow-hidden">
          
          {/* Backdrop blur circle */}
          <div className="absolute -top-32 -left-32 w-72 h-72 bg-blue-500/5 dark:bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>
          
          {/* Step 1: Select Type */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 leading-tight flex items-center gap-2">
                <span className="w-2.5 h-7 bg-blue-600 rounded-full inline-block"></span> انتخاب صنف کسب‌وکار
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mb-8 font-bold text-xs leading-relaxed">ساختار پنل مدیریت بر اساس این انتخاب برای شما شخصی‌سازی می‌شود.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {businessTypes.map(b => (
                  <button 
                    key={b.type}
                    disabled={b.disabled}
                    onClick={() => handleSelectType(b.type)}
                    className={cn(
                      "p-6 rounded-2xl border-2 text-right transition-all flex flex-col gap-4 relative overflow-hidden",
                      b.disabled 
                        ? "opacity-60 cursor-not-allowed border-slate-100 dark:border-slate-800/40 bg-slate-50/50 dark:bg-slate-950/20"
                        : type === b.type 
                        ? "border-blue-600 bg-blue-50/70 dark:bg-blue-950/25 cursor-pointer ring-4 ring-blue-500/5" 
                        : "border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer"
                    )}
                  >
                    {b.disabled && (
                      <span className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-sm">
                        بزودی
                      </span>
                    )}
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center transition-all", 
                      b.disabled
                        ? "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600"
                        : type === b.type 
                        ? "bg-blue-600 text-white scale-110 shadow-md shadow-blue-500/20" 
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                    )}>
                      {b.icon}
                    </div>
                    <div>
                      <div className="font-black text-lg text-slate-900 dark:text-white">{b.label}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-bold leading-relaxed">{b.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Basic Info (Dynamic) */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 leading-tight flex items-center gap-2">
                <span className="w-2.5 h-7 bg-blue-600 rounded-full inline-block"></span> اطلاعات پایه {type === 'Hotel' ? 'هتلدار' : type === 'Restaurant' ? 'رستوران و کافی‌شاپ' : 'تفریحی'}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mb-8 font-bold text-xs leading-relaxed">نام، ساختار مدیریتی و اطلاعات شعبه یا مجموعه جدید را وارد کنید.</p>
              
              {type === 'Hotel' ? (
                // HOTEL BASIC FORM
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-bold">
                  {/* Hotel Name Input */}
                  <div className="space-y-2">
                    <label className="text-slate-700 dark:text-slate-300 block text-xs flex items-center justify-between">
                      <span>عنوان / نام هتل یا اقامتگاه</span>
                      <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded-md">
                        وارد کردن نام اصلی
                      </span>
                    </label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="مثال: هتل رویال شیراز (نام هتل خود را تایپ کنید)" 
                      className="w-full border border-slate-200 dark:border-slate-800 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-inner" 
                    />
                    <p className="text-[10px] text-slate-400 font-normal">
                      * فیلد فوق را خالی نگذارید؛ لطفاً نام کامل و رسمی هتل خود را وارد کنید.
                    </p>
                  </div>

                  {/* Owner / Representative Full Name Input */}
                  <div className="space-y-2">
                    <label className="text-slate-700 dark:text-slate-300 block text-xs">
                      نام و نام خانوادگی مالک / نماینده اصلی مجموعه
                    </label>
                    <input 
                      type="text" 
                      value={ownerName}
                      onChange={e => setOwnerName(e.target.value)}
                      placeholder="مثال: امیر رضایی" 
                      className="w-full border border-slate-200 dark:border-slate-800 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-inner" 
                    />
                    <p className="text-[10px] text-slate-400 font-normal">
                      * مشخصات مالک یا نماینده رسمی جهت درج در پرونده و قراردادها.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-slate-500 dark:text-slate-400 block text-xs">کلاس اقامتگاه</label>
                    <select 
                      value={stars}
                      onChange={e => setStars(e.target.value)}
                      className="w-full border border-slate-200 dark:border-slate-800 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-950/50 text-slate-700 dark:text-slate-300 outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer shadow-inner"
                    >
                      <option value="5">۵ ستاره (لوکس)</option>
                      <option value="4">۴ ستاره</option>
                      <option value="3">۳ ستاره</option>
                      <option value="eco">بوتیک / بوم‌گردی ویژه</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-slate-500 dark:text-slate-400 block text-xs">تعداد کل اتاق‌های قابل رزرو</label>
                    <input 
                      type="number" 
                      value={facilityCount}
                      onChange={e => setFacilityCount(e.target.value === '' ? '' : Number(e.target.value))}
                      placeholder="مثال: ۴۵" 
                      className="w-full border border-slate-200 dark:border-slate-800 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-blue-500/10 font-mono text-left transition-all shadow-inner" 
                      dir="ltr"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-slate-500 dark:text-slate-400 block text-xs">آدرس دقیق پستی</label>
                      <button
                        type="button"
                        onClick={() => setShowMapPicker(true)}
                        className="text-xs font-black text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Map size={12} />
                        <span>انتخاب و آدرس‌یابی روی نقشه</span>
                      </button>
                    </div>
                    <div className="relative">
                      <MapPin size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        type="text" 
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        placeholder="استان، شهر، خیابان اصلی، پلاک..." 
                        className="w-full border border-slate-200 dark:border-slate-800 p-4 pr-12 pl-36 rounded-2xl bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-inner" 
                      />
                      <button
                        type="button"
                        onClick={() => setShowMapPicker(true)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/80 text-blue-600 dark:text-blue-400 text-[10px] font-black px-3.5 py-2 rounded-xl border border-blue-100 dark:border-blue-900/30 shadow-sm flex items-center gap-1 cursor-pointer transition-all hover:scale-105 active:scale-95"
                      >
                        <Map size={11} className="shrink-0" />
                        <span>مکان‌یابی نقشه</span>
                      </button>
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-slate-500 dark:text-slate-400 block text-xs">توضیحات کوتاه و شعار هتل</label>
                    <textarea 
                      rows={3} 
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      placeholder="توضیحاتی درباره موقعیت خاص یا ویژگی‌های منحصر‌به‌فرد هتل..." 
                      className="w-full border border-slate-200 dark:border-slate-800 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-blue-500/10 transition-all resize-none leading-relaxed shadow-inner"
                    ></textarea>
                  </div>
                </div>
              ) : type === 'Restaurant' ? (
                // RESTAURANT BASIC FORM
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-bold">
                  {/* Restaurant Name Input */}
                  <div className="space-y-2">
                    <label className="text-slate-700 dark:text-slate-300 block text-xs flex items-center justify-between">
                      <span>عنوان / نام رستوران یا کافی‌شاپ</span>
                      <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded-md">
                        وارد کردن نام اصلی
                      </span>
                    </label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="مثال: کافه رستوران سنتی و بین‌المللی شاندیز" 
                      className="w-full border border-slate-200 dark:border-slate-800 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-inner" 
                    />
                    <p className="text-[10px] text-slate-400 font-normal">
                      * فیلد فوق را خالی نگذارید؛ لطفاً نام کامل رستوران یا کافه خود را وارد کنید.
                    </p>
                  </div>

                  {/* Owner Full Name Input */}
                  <div className="space-y-2">
                    <label className="text-slate-700 dark:text-slate-300 block text-xs">
                      نام و نام خانوادگی مالک / مدیر مسؤول رستوران
                    </label>
                    <input 
                      type="text" 
                      value={ownerName}
                      onChange={e => setOwnerName(e.target.value)}
                      placeholder="مثال: خسرو شکیبا" 
                      className="w-full border border-slate-200 dark:border-slate-800 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-inner" 
                    />
                    <p className="text-[10px] text-slate-400 font-normal">
                      * مشخصات مدیر جهت درج در قرارداد و پرونده رسمی.
                    </p>
                  </div>

                  {/* Cuisine / Menu Style */}
                  <div className="space-y-2">
                    <label className="text-slate-500 dark:text-slate-400 block text-xs">سبک آشپزی و منو</label>
                    <select 
                      value={stars}
                      onChange={e => setStars(e.target.value)}
                      className="w-full border border-slate-200 dark:border-slate-800 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-950/50 text-slate-700 dark:text-slate-300 outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer shadow-inner"
                    >
                      <option value="5">سفره‌خانه و رستوران اصیل ایرانی</option>
                      <option value="4">ایتالیایی و بین‌المللی / فرنگی</option>
                      <option value="3">بوفه سلف‌سرویس و ملل</option>
                      <option value="eco">کافه، باریستا و روف‌گاردن</option>
                    </select>
                  </div>

                  {/* Capacity / Tables */}
                  <div className="space-y-2">
                    <label className="text-slate-500 dark:text-slate-400 block text-xs">تعداد کل میزها / ظرفیت همزمان</label>
                    <input 
                      type="number" 
                      value={facilityCount}
                      onChange={e => setFacilityCount(e.target.value === '' ? '' : Number(e.target.value))}
                      placeholder="مثال: ۳۰" 
                      className="w-full border border-slate-200 dark:border-slate-800 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-blue-500/10 font-mono text-left transition-all shadow-inner" 
                      dir="ltr"
                    />
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2 space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-slate-500 dark:text-slate-400 block text-xs">آدرس دقیق پستی رستوران</label>
                      <button
                        type="button"
                        onClick={() => setShowMapPicker(true)}
                        className="text-xs font-black text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Map size={12} />
                        <span>انتخاب و آدرس‌یابی روی نقشه</span>
                      </button>
                    </div>
                    <div className="relative">
                      <MapPin size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        type="text" 
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        placeholder="استان، شهر، خیابان اصلی، پلاک..." 
                        className="w-full border border-slate-200 dark:border-slate-800 p-4 pr-12 pl-36 rounded-2xl bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-inner" 
                      />
                      <button
                        type="button"
                        onClick={() => setShowMapPicker(true)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/80 text-blue-600 dark:text-blue-400 text-[10px] font-black px-3.5 py-2 rounded-xl border border-blue-100 dark:border-blue-900/30 shadow-sm flex items-center gap-1 cursor-pointer transition-all hover:scale-105 active:scale-95"
                      >
                        <Map size={11} className="shrink-0" />
                        <span>مکان‌یابی نقشه</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // ENTERTAINMENT BASIC FORM
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-bold">
                  {/* Entertainment Name Input */}
                  <div className="space-y-2">
                    <label className="text-slate-700 dark:text-slate-300 block text-xs flex items-center justify-between">
                      <span>عنوان / نام مجموعه تفریحی</span>
                      <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded-md">
                        وارد کردن نام اصلی
                      </span>
                    </label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="مثال: شهربازی سرپوشیده ستارگان (نام مجموعه خود را تایپ کنید)" 
                      className="w-full border border-slate-200 dark:border-slate-800 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-inner" 
                    />
                    <p className="text-[10px] text-slate-400 font-normal">
                      * فیلد فوق را خالی نگذارید؛ لطفاً نام کامل مجموعه تفریحی را وارد کنید.
                    </p>
                  </div>

                  {/* Owner / Representative Full Name Input */}
                  <div className="space-y-2">
                    <label className="text-slate-700 dark:text-slate-300 block text-xs">
                      نام و نام خانوادگی مالک / نماینده اصلی مجموعه
                    </label>
                    <input 
                      type="text" 
                      value={ownerName}
                      onChange={e => setOwnerName(e.target.value)}
                      placeholder="مثال: علیرضا خسروی" 
                      className="w-full border border-slate-200 dark:border-slate-800 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-inner" 
                    />
                    <p className="text-[10px] text-slate-400 font-normal">
                      * مشخصات مالک یا نماینده رسمی جهت درج در پرونده و قراردادها.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-slate-500 dark:text-slate-400 block text-xs">نوع تفریح و سرگرمی</label>
                    <select 
                      value={entertainmentType}
                      onChange={e => setEntertainmentType(e.target.value)}
                      className="w-full border border-slate-200 dark:border-slate-800 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-950/50 text-slate-700 dark:text-slate-300 outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer shadow-inner"
                    >
                      <option value="escape">اتاق فرار (Escape Room)</option>
                      <option value="themepark">شهربازی و پارک تفریحی</option>
                      <option value="waterpark">مجموعه آبی و استخر</option>
                      <option value="karting">کارتینگ و تفریحات ورزشی</option>
                      <option value="spa">اسپا، ماساژ و مراقبتی</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-slate-500 dark:text-slate-400 block text-xs">محدودیت سنی پذیرش</label>
                    <select 
                      value={ageLimit}
                      onChange={e => setAgeLimit(e.target.value)}
                      className="w-full border border-slate-200 dark:border-slate-800 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-950/50 text-slate-700 dark:text-slate-300 outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer shadow-inner"
                    >
                      <option value="0">بدون محدودیت سنی</option>
                      <option value="7">مخصوص افراد بالای ۷ سال</option>
                      <option value="12">مخصوص افراد بالای ۱۲ سال</option>
                      <option value="16">مخصوص افراد بالای ۱۶ سال</option>
                      <option value="18">بزرگسالان (بالای ۱۸ سال)</option>
                    </select>
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-slate-500 dark:text-slate-400 block text-xs">آدرس دقیق پستی شعبه تفریحی</label>
                      <button
                        type="button"
                        onClick={() => setShowMapPicker(true)}
                        className="text-xs font-black text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Map size={12} />
                        <span>انتخاب و آدرس‌یابی روی نقشه</span>
                      </button>
                    </div>
                    <div className="relative">
                      <MapPin size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        type="text" 
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        placeholder="مثال: تهران، پاسداران، مجتمع تجاری پلاتین، طبقه ۳" 
                        className="w-full border border-slate-200 dark:border-slate-800 p-4 pr-12 pl-36 rounded-2xl bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-inner" 
                      />
                      <button
                        type="button"
                        onClick={() => setShowMapPicker(true)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/80 text-blue-600 dark:text-blue-400 text-[10px] font-black px-3.5 py-2 rounded-xl border border-blue-100 dark:border-blue-900/30 shadow-sm flex items-center gap-1 cursor-pointer transition-all hover:scale-105 active:scale-95"
                      >
                        <Map size={11} className="shrink-0" />
                        <span>مکان‌یابی نقشه</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Documents and Services/Facilities */}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 leading-tight flex items-center gap-2">
                <span className="w-2.5 h-7 bg-blue-600 rounded-full inline-block"></span> مدارک ثبتی و خدمات صنف
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mb-8 font-bold text-xs leading-relaxed">اسناد و پروانه‌های کسب را بارگذاری کرده و فیلدهای اجرایی را پر کنید.</p>
              
              {type === 'Hotel' ? (
                // HOTEL DOCUMENTS & FACILITIES
                <div className="space-y-8 font-bold">
                  {/* Single Unified Document Upload Section */}
                  <div className="space-y-3 bg-slate-50/40 dark:bg-slate-900/30 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                    <label className="text-slate-800 dark:text-slate-200 block text-xs font-black flex items-center justify-between">
                      <span>مدارک و مجوزها</span>
                      <span className="text-[10px] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md font-bold">
                        بارگذاری چندگانه
                      </span>
                    </label>

                    <div 
                      onClick={handleAddDocument}
                      className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-600 bg-white dark:bg-slate-950/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all group shadow-sm hover:shadow-md"
                    >
                      <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <ImageIcon size={22} />
                      </div>
                      <span className="text-slate-800 dark:text-slate-200 text-xs font-black">
                        بارگذاری اسکن/تصویر مدارک، پروانه بهره‌برداری یا جواز کسب
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 font-bold">
                        جهت افزودن عکس یا فایل کلیک کنید (فرمت JPG, PNG, PDF - حداکثر ۵ مگابایت)
                      </span>
                    </div>

                    {/* Render uploaded document list */}
                    {docFiles.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {docFiles.map((doc, idx) => (
                          <div key={doc.id} className="border border-emerald-500/30 bg-emerald-50/40 dark:bg-emerald-950/20 rounded-xl p-3.5 flex items-center justify-between">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 rounded-lg flex items-center justify-center shrink-0">
                                <FileCheck size={16} />
                              </div>
                              <div className="min-w-0">
                                <span className="block text-xs font-black text-slate-900 dark:text-white truncate">
                                  مدرک {idx + 1}: {doc.name}
                                </span>
                                <span className="block text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">
                                  {doc.size} • تایید و پیوست شد
                                </span>
                              </div>
                            </div>
                            <button 
                              type="button"
                              onClick={() => handleRemoveDocument(doc.id)}
                              className="p-1.5 hover:bg-rose-100 dark:hover:bg-rose-950/60 text-rose-600 rounded-lg transition-colors shrink-0 cursor-pointer"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[11px] text-slate-400 font-normal text-center py-1">
                        هنوز هیچ مدرکی پیوست نشده است. می‌توانید یک یا چند تصویر مدرک را اینجا بارگذاری کنید.
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-slate-500 dark:text-slate-400 block text-xs">شناسه ملی شرکت / کد ملی مالک حقیقی</label>
                    <input 
                      type="text" 
                      value={nationalId}
                      onChange={e => setNationalId(e.target.value)}
                      placeholder="شناسه ۱۱ رقمی شرکت یا کد ملی ۱۰ رقمی" 
                      className="w-full border border-slate-200 dark:border-slate-800 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-blue-500/10 font-mono tracking-widest text-left transition-all shadow-inner" 
                      dir="ltr"
                    />
                  </div>

                  <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/60">
                    <label className="text-slate-500 dark:text-slate-400 block text-xs">امکانات رایگان و خدمات ویژه هتل</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      {[
                        "پارکینگ اختصاصی مسقف",
                        "اینترنت Wi-Fi پرسرعت",
                        "مجموعه آبی و استخر",
                        "ترانسفر فرودگاهی (VIP)",
                        "باشگاه ورزشی مجهز",
                        "صبحانه بوفه کامل",
                        "لاندری ۲۴ ساعته",
                        "رستوران بین‌المللی"
                      ].map((item, idx) => {
                        const isChecked = hotelFacilities.includes(item);
                        return (
                          <label 
                            key={idx} 
                            onClick={() => toggleHotelFacility(item)}
                            className={cn(
                              "flex items-center gap-3 cursor-pointer bg-slate-50/30 dark:bg-slate-900/30 border p-3.5 rounded-xl transition-all shadow-sm group",
                              isChecked 
                                ? "border-blue-500/30 bg-blue-50/20 dark:bg-blue-950/15" 
                                : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                            )}
                          >
                            <div className={cn(
                              "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                              isChecked ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 dark:border-slate-700"
                            )}>
                              {isChecked && <Check size={12} strokeWidth={4} />}
                            </div>
                            <span className={cn(
                              "transition-colors",
                              isChecked ? "text-slate-900 dark:text-white font-black" : "text-slate-600 dark:text-slate-400"
                            )}>{item}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800/60">
                    <div className="space-y-2">
                      <label className="text-slate-500 dark:text-slate-400 block text-xs">ساعت ورود استاندارد (Check-in)</label>
                      <input 
                        type="time" 
                        value={checkIn}
                        onChange={e => setCheckIn(e.target.value)}
                        className="w-full border border-slate-200 dark:border-slate-800 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-blue-500/10 font-mono text-center text-lg transition-all shadow-inner" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-slate-500 dark:text-slate-400 block text-xs">ساعت خروج استاندارد (Check-out)</label>
                      <input 
                        type="time" 
                        value={checkOut}
                        onChange={e => setCheckOut(e.target.value)}
                        className="w-full border border-slate-200 dark:border-slate-800 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-blue-500/10 font-mono text-center text-lg transition-all shadow-inner" 
                      />
                    </div>
                  </div>
                </div>
              ) : (
                // ENTERTAINMENT DOCUMENTS, SERVICES & HOURS
                <div className="space-y-8 font-bold">
                  {/* Single Unified Document Upload Section */}
                  <div className="space-y-3 bg-slate-50/40 dark:bg-slate-900/30 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                    <label className="text-slate-800 dark:text-slate-200 block text-xs font-black flex items-center justify-between">
                      <span>مدارک و مجوزها</span>
                      <span className="text-[10px] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md font-bold">
                        بارگذاری چندگانه
                      </span>
                    </label>

                    <div 
                      onClick={handleAddDocument}
                      className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-600 bg-white dark:bg-slate-950/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all group shadow-sm hover:shadow-md"
                    >
                      <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <ImageIcon size={22} />
                      </div>
                      <span className="text-slate-800 dark:text-slate-200 text-xs font-black">
                        بارگذاری اسکن/تصویر مدارک، جواز کسب صنف یا تاییدیه ایمنی
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 font-bold">
                        جهت افزودن عکس یا فایل کلیک کنید (فرمت JPG, PNG, PDF - حداکثر ۵ مگابایت)
                      </span>
                    </div>

                    {/* Render uploaded document list */}
                    {docFiles.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {docFiles.map((doc, idx) => (
                          <div key={doc.id} className="border border-emerald-500/30 bg-emerald-50/40 dark:bg-emerald-950/20 rounded-xl p-3.5 flex items-center justify-between">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 rounded-lg flex items-center justify-center shrink-0">
                                <FileCheck size={16} />
                              </div>
                              <div className="min-w-0">
                                <span className="block text-xs font-black text-slate-900 dark:text-white truncate">
                                  مدرک {idx + 1}: {doc.name}
                                </span>
                                <span className="block text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">
                                  {doc.size} • تایید و پیوست شد
                                </span>
                              </div>
                            </div>
                            <button 
                              type="button"
                              onClick={() => handleRemoveDocument(doc.id)}
                              className="p-1.5 hover:bg-rose-100 dark:hover:bg-rose-950/60 text-rose-600 rounded-lg transition-colors shrink-0 cursor-pointer"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[11px] text-slate-400 font-normal text-center py-1">
                        هنوز هیچ مدرکی پیوست نشده است. می‌توانید یک یا چند تصویر مدرک را اینجا بارگذاری کنید.
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-slate-500 dark:text-slate-400 block text-xs">شماره مجوز صنف تفریحی / کدملی مالک</label>
                      <input 
                        type="text" 
                        value={nationalId}
                        onChange={e => setNationalId(e.target.value)}
                        placeholder="کد ۱۰ رقمی مالک یا پروانه کسب" 
                        className="w-full border border-slate-200 dark:border-slate-800 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-blue-500/10 font-mono tracking-widest text-left transition-all shadow-inner" 
                        dir="ltr"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-slate-500 dark:text-slate-400 block text-xs">ظرفیت پذیرش همزمان (حداکثر تعداد نفرات)</label>
                      <input 
                        type="number" 
                        value={facilityCount}
                        onChange={e => setFacilityCount(e.target.value === '' ? '' : Number(e.target.value))}
                        placeholder="مثال: ۴۰ نفر در هر سانس" 
                        className="w-full border border-slate-200 dark:border-slate-800 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-blue-500/10 font-mono text-left transition-all shadow-inner" 
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/60">
                    <label className="text-slate-500 dark:text-slate-400 block text-xs">امکانات جانبی و خدمات مجموعه تفریحی</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      {[
                        "بلیت الکترونیک سریع",
                        "کمد امانات الکترونیکی",
                        "بوفه و کافی‌شاپ",
                        "پارکینگ اختصاصی",
                        "سیستم صوتی حرفه‌ای",
                        "بیمه مسئولیت مدنی مسافران",
                        "راهنما و مربی مجرب",
                        "سیستم تهویه مطبوع هوا"
                      ].map((item, idx) => {
                        const isChecked = entFacilities.includes(item);
                        return (
                          <label 
                            key={idx} 
                            onClick={() => toggleEntFacility(item)}
                            className={cn(
                              "flex items-center gap-3 cursor-pointer bg-slate-50/30 dark:bg-slate-900/30 border p-3.5 rounded-xl transition-all shadow-sm group",
                              isChecked 
                                ? "border-blue-500/30 bg-blue-50/20 dark:bg-blue-950/15" 
                                : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                            )}
                          >
                            <div className={cn(
                              "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                              isChecked ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 dark:border-slate-700"
                            )}>
                              {isChecked && <Check size={12} strokeWidth={4} />}
                            </div>
                            <span className={cn(
                              "transition-colors",
                              isChecked ? "text-slate-900 dark:text-white font-black" : "text-slate-600 dark:text-slate-400"
                            )}>{item}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800/60">
                    <div className="space-y-2">
                      <label className="text-slate-500 dark:text-slate-400 block text-xs">ساعت شروع فعالیت روزانه</label>
                      <input 
                        type="time" 
                        value={startTime}
                        onChange={e => setStartTime(e.target.value)}
                        className="w-full border border-slate-200 dark:border-slate-800 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-blue-500/10 font-mono text-center text-lg transition-all shadow-inner" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-slate-500 dark:text-slate-400 block text-xs">ساعت پایان فعالیت روزانه</label>
                      <input 
                        type="time" 
                        value={endTime}
                        onChange={e => setEndTime(e.target.value)}
                        className="w-full border border-slate-200 dark:border-slate-800 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-blue-500/10 font-mono text-center text-lg transition-all shadow-inner" 
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Wizard Action Controls */}
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
            <button 
              type="button"
              onClick={() => step > 1 ? setStep(step - 1) : onCancel()}
              className="px-6 py-3 font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer text-xs"
            >
              {step > 1 ? 'مرحله قبل' : 'انصراف'}
            </button>
            
            <div className="flex items-center gap-3">
              {step === 1 && (
                <button 
                  type="button"
                  onClick={handleNext}
                  disabled={isNextDisabled()}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-500/30 cursor-pointer text-xs"
                >
                  <span>مرحله بعد: اطلاعات پایه</span>
                  <ChevronLeft size={18} />
                </button>
              )}

              {step === 2 && (
                <>
                  <button 
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-5 py-3 rounded-xl font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 text-xs cursor-pointer"
                  >
                    <span>تکمیل مدارک و خدمات (اختیاری)</span>
                    <ChevronLeft size={16} />
                  </button>
                  <button 
                    type="button"
                    onClick={handleCompleteRegistration}
                    className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white px-8 py-3 rounded-xl font-black text-xs flex items-center gap-2 transition-all shadow-lg shadow-emerald-600/25 cursor-pointer"
                  >
                    <CheckCircle2 size={18} />
                    <span>تکمیل و نهایی‌سازی ثبت‌نام</span>
                  </button>
                </>
              )}

              {step === 3 && (
                <button 
                  type="button"
                  onClick={handleCompleteRegistration}
                  disabled={isNextDisabled()}
                  className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white px-8 py-3 rounded-xl font-black text-xs flex items-center gap-2 transition-all shadow-lg shadow-emerald-600/25 cursor-pointer"
                >
                  <CheckCircle2 size={18} />
                  <span>ثبت نهایی پرونده کسب‌وکار</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {showMapPicker && (
        <InteractiveMapPicker 
          initialAddress={address}
          onSelectAddress={(newAddr) => setAddress(newAddr)}
          onClose={() => setShowMapPicker(false)}
        />
      )}
    </div>
  );
}
