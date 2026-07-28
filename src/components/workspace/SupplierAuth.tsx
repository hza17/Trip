import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Phone, 
  User, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  KeyRound,
  CheckCircle2,
  RefreshCw,
  Building,
  Sparkle,
  Hotel,
  Ticket,
  Compass,
  Briefcase,
  Home,
  Car,
  Utensils
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Business, BusinessType } from './types';

interface SupplierAuthProps {
  onLogin: (business: Business) => void;
  existingBusinesses: Business[];
  onBack?: () => void;
}

export function SupplierAuth({ onLogin, existingBusinesses, onBack }: SupplierAuthProps) {
  const [step, setStep] = useState<'phone' | 'otp' | 'category'>('phone');
  const [mobile, setMobile] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [businessTitleInput, setBusinessTitleInput] = useState('');
  const [selectedType, setSelectedType] = useState<BusinessType>('Hotel');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [errorMsg, setErrorMsg] = useState('');

  // Matched business if mobile exists
  const [matchedBusiness, setMatchedBusiness] = useState<Business | null>(null);
  const [isExistingUser, setIsExistingUser] = useState<boolean>(false);

  // Countdown timer for OTP resend
  useEffect(() => {
    let timer: any = null;
    if (step === 'otp' && countdown > 0) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [step, countdown]);

  // Clean Iranian mobile number helper
  const cleanMobile = (val: string) => {
    return val.replace(/[^\d]/g, '');
  };

  // Handle step 1: Submit Phone Number
  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const numericMobile = cleanMobile(mobile);
    if (!numericMobile || numericMobile.length < 10) {
      setErrorMsg('لطفاً شماره تلفن همراه ۱۱ رقمی معتبر وارد کنید (مثال: ۰۹۱۲۳۴۵۶۷۸۹)');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);

      // Check if mobile number matches an existing business
      const found = existingBusinesses.find(b => 
        b.mobile && cleanMobile(b.mobile) === numericMobile
      ) || existingBusinesses.find(b => b.id === 'b1' && (numericMobile === '09121112233' || numericMobile === '09123456789'));

      if (found) {
        setMatchedBusiness(found);
        setIsExistingUser(true);
      } else {
        setMatchedBusiness(null);
        setIsExistingUser(false);
      }

      setOtpCode('1234'); // Auto-fill test SMS code for convenient testing
      setStep('otp');
      setCountdown(60);
    }, 800);
  };

  // Handle step 2: Verify OTP
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!otpCode || otpCode.length < 4) {
      setErrorMsg('کد تایید ۴ رقمی پیامک شده را وارد کنید.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      if (isExistingUser && matchedBusiness) {
        // Log in existing business directly to hub
        onLogin(matchedBusiness);
      } else {
        // New user verified -> move to category selection step
        setStep('category');
      }
    }, 800);
  };

  // Handle step 3: Select Category & Create Business
  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      const numericMobile = cleanMobile(mobile);
      const defaultBName = businessTitleInput.trim() || (
        selectedType === 'Hotel' ? 'هتل و اقامتگاه جدید' : 
        selectedType === 'Entertainment' ? 'مجموعه جدید تفریحی' : 
        selectedType === 'Tour' ? 'آژانس جدید گردشگری' : 
        selectedType === 'Villa' ? 'مجموعه جدید اقامتی و ویلا' :
        selectedType === 'CarRental' ? 'مجموعه جدید ترانسفر و رنت' :
        'کسب‌وکار جدید پارادایس'
      );

      const newBusiness: Business = {
        id: `b-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        name: defaultBName,
        type: selectedType,
        status: 'Active',
        modules: ['Dashboard', 'Rooms', 'Reservations', 'Customers', 'Finance', 'Settings'],
        createdAt: new Date().toISOString().split('T')[0],
        address: 'ثبت شده با شماره همراه • پرونده نیازمند تکمیل',
        mobile: numericMobile,
        ownerName: 'کاربر جدید پارادایس',
        completionPercentage: 60,
        facilityCount: 4,
        revenue: 0,
        activeBookings: 0
      };

      onLogin(newBusiness);
    }, 1000);
  };

  // Demo shortcut number selection
  const selectDemoMobile = (num: string, isExisting: boolean) => {
    setMobile(num);
    setErrorMsg('');
  };

  return (
    <div className="flex-1 flex h-screen bg-slate-50 dark:bg-[#080a16] overflow-hidden" dir="rtl">
      
      {/* 1. RIGHT SIDE: Clean, Minimalist Mobile-First Auth Form (Takes 60%) */}
      <div className="w-full lg:w-[60%] flex flex-col justify-between p-6 md:p-12 lg:p-16 overflow-y-auto bg-white dark:bg-[#0a0d1e]">
        
        {/* Top Header Row with Back Button */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600/10 dark:bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm">
              <Building2 size={18} />
            </div>
            <div>
              <span className="text-xs font-black text-slate-900 dark:text-white block leading-none">میزکار و پنل هتل‌داران</span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold block mt-1 leading-none">ورود و ثبت‌نام سریع با شماره همراه</span>
            </div>
          </div>

          {onBack && (
            <button 
              type="button"
              onClick={onBack}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 flex items-center gap-1.5 cursor-pointer transition-colors bg-slate-50 hover:bg-slate-100 dark:bg-slate-900/50 dark:hover:bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-200/40 dark:border-slate-800/60 shadow-sm"
            >
              <span>بازگشت به سایت</span>
              <ArrowRight size={14} className="rotate-180" />
            </button>
          )}
        </div>

        {/* Form Container */}
        <div className="my-auto max-w-md w-full mx-auto py-6">
          
          {errorMsg && (
            <div className="bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 text-xs font-black p-4 rounded-2xl border border-rose-100 dark:border-rose-900/30 mb-6 text-center animate-in fade-in">
              {errorMsg}
            </div>
          )}

          {step === 'phone' && (
            /* STEP 1: PHONE NUMBER ENTRY */
            <form onSubmit={handlePhoneSubmit} className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-1.5">
                  ورود یا ثبت‌نام شرکای تجاری
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold leading-relaxed">
                  شماره تلفن همراه خود را وارد کنید تا کد تایید یک‌بار مصرف برای شما ارسال شود.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-700 dark:text-slate-300 block">
                  شماره تلفن همراه
                </label>
                <div className="relative">
                  <Phone size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                  <input 
                    required 
                    type="tel" 
                    dir="ltr"
                    value={mobile} 
                    onChange={e => setMobile(e.target.value)}
                    placeholder="09121234567" 
                    className="w-full pr-11 pl-4 py-3.5 bg-slate-50 dark:bg-[#0c0f24] border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-950 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono font-bold transition-all shadow-inner" 
                  />
                </div>
              </div>

              {/* Demo Sample Number Chips */}
              <div className="bg-slate-50 dark:bg-slate-900/40 p-3.5 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block">
                  💡 نمونه شماره‌ها جهت تست سریع:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => selectDemoMobile('09121112233', true)}
                    className="text-[10px] font-bold bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950 text-slate-700 dark:text-slate-300 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 transition"
                  >
                    ۰۹۱۲۱۱۱۲۲۳۳ (حساب موجود: هتل اسپیناس)
                  </button>
                  <button
                    type="button"
                    onClick={() => selectDemoMobile('09129998877', false)}
                    className="text-[10px] font-bold bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950 text-slate-700 dark:text-slate-300 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 transition"
                  >
                    ۰۹۱۲۹۹۹۸۸۷۷ (عضویت جدید)
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl text-xs transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-500/20 hover:scale-[1.01]"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <KeyRound size={16} />
                    <span>ادامه و دریافت کد تایید SMS</span>
                  </>
                )}
              </button>
            </form>
          )}

          {step === 'otp' && (
            /* STEP 2: OTP VERIFICATION */
            <form onSubmit={handleOtpSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                    <Phone size={14} /> کد تایید به شماره {mobile} ارسال شد
                  </span>
                  <button 
                    type="button" 
                    onClick={() => setStep('phone')} 
                    className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 underline cursor-pointer"
                  >
                    ویرایش شماره
                  </button>
                </div>
                <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-1">
                  تایید کد پیامکی
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold leading-relaxed">
                  کد ۴ رقمی پیامک شده را وارد نمایید. (کد تست: ۱۲۳۴)
                </p>
              </div>

              {/* OTP Code Input */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-700 dark:text-slate-300 block">
                  کد تایید پیامکی (OTP)
                </label>
                <div className="relative">
                  <KeyRound size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                  <input 
                    required 
                    type="text" 
                    dir="ltr"
                    maxLength={4}
                    value={otpCode} 
                    onChange={e => setOtpCode(e.target.value)}
                    placeholder="1234" 
                    className="w-full pr-11 pl-4 py-3.5 bg-slate-50 dark:bg-[#0c0f24] border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-950 dark:text-white text-lg font-mono font-black text-center tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-inner" 
                  />
                </div>
              </div>

              {/* USER RECOGNITION BADGE */}
              {isExistingUser ? (
                <div className="bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/40 p-4 rounded-2xl space-y-2 animate-in zoom-in-95">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-black text-xs">
                    <CheckCircle2 size={16} />
                    <span>حساب شریک تجاری شناسایی شد</span>
                  </div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    مجموعه: <span className="font-black text-emerald-800 dark:text-emerald-300">{matchedBusiness?.name}</span>
                    {matchedBusiness?.ownerName && ` (${matchedBusiness.ownerName})`}
                  </div>
                </div>
              ) : (
                <div className="bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/40 p-3.5 rounded-2xl text-xs font-bold text-blue-700 dark:text-blue-300 flex items-center gap-2">
                  <Sparkles size={16} />
                  <span>عضو جدید • پس از تایید کد، زمینه فعالیت کسب‌وکار خود را انتخاب خواهید کرد.</span>
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-slate-400 font-bold pt-1">
                {countdown > 0 ? (
                  <span>امکان ارسال مجدد کد تا {countdown} ثانیه دیگر</span>
                ) : (
                  <button 
                    type="button" 
                    onClick={() => setCountdown(60)} 
                    className="text-blue-600 dark:text-blue-400 font-black flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <RefreshCw size={12} /> ارسال مجدد کد SMS
                  </button>
                )}
              </div>

              <button 
                disabled={loading}
                type="submit" 
                className={cn(
                  "w-full font-black py-4 rounded-2xl text-xs transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]",
                  isExistingUser 
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20"
                )}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <ShieldCheck size={18} />
                    <span>{isExistingUser ? 'ورود به هاب شرکای تجاری' : 'تایید کد و انتخاب زمینه فعالیت'}</span>
                  </>
                )}
              </button>
            </form>
          )}

          {step === 'category' && (
            /* STEP 3: BUSINESS CATEGORY SELECTION (FOR NEW USERS) */
            <form onSubmit={handleCategorySubmit} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-1.5">
                  انتخاب زمینه فعالیت اصلی
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold leading-relaxed">
                  حوزه فعالیت مجموعه خود را انتخاب کنید. اطلاعات تکمیلی پرونده و مالکان در گام‌های بعدی تکمیل می‌شوند.
                </p>
              </div>

              {/* Business Category Selection - 7 Options */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-700 dark:text-slate-300 block">
                  زمینه‌های فعالیت اصلی در سامانه:
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  
                  {/* 1. Hotel */}
                  <button
                    type="button"
                    onClick={() => setSelectedType('Hotel')}
                    className={cn(
                      "p-3 rounded-2xl border text-xs font-black flex items-center gap-3 transition-all cursor-pointer text-right min-h-[64px]",
                      selectedType === 'Hotel'
                        ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20"
                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/60"
                    )}
                  >
                    <div className={cn(
                      "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
                      selectedType === 'Hotel' ? "bg-white/20 text-white" : "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400"
                    )}>
                      <Hotel size={18} />
                    </div>
                    <div>
                      <span className="block font-black">هتل و اقامتگاه</span>
                      <span className="text-[9px] opacity-80 font-normal block mt-0.5">رزرو اتاق، هتل‌داری</span>
                    </div>
                  </button>

                  {/* 2. Restaurant */}
                  <button
                    type="button"
                    onClick={() => setSelectedType('Restaurant')}
                    className={cn(
                      "p-3 rounded-2xl border text-xs font-black flex items-center gap-3 transition-all cursor-pointer text-right min-h-[64px]",
                      selectedType === 'Restaurant'
                        ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20"
                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/60"
                    )}
                  >
                    <div className={cn(
                      "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
                      selectedType === 'Restaurant' ? "bg-white/20 text-white" : "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400"
                    )}>
                      <Utensils size={18} />
                    </div>
                    <div>
                      <span className="block font-black">رستوران و کافی‌شاپ</span>
                      <span className="text-[9px] opacity-80 font-normal block mt-0.5">منوی آنلاین، رزرو میز</span>
                    </div>
                  </button>

                  {/* 3. Entertainment */}
                  <button
                    type="button"
                    onClick={() => setSelectedType('Entertainment')}
                    className={cn(
                      "p-3 rounded-2xl border text-xs font-black flex items-center gap-3 transition-all cursor-pointer text-right min-h-[64px]",
                      selectedType === 'Entertainment'
                        ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20"
                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/60"
                    )}
                  >
                    <div className={cn(
                      "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
                      selectedType === 'Entertainment' ? "bg-white/20 text-white" : "bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400"
                    )}>
                      <Ticket size={18} />
                    </div>
                    <div>
                      <span className="block font-black">تفریحات و سرگرمی</span>
                      <span className="text-[9px] opacity-80 font-normal block mt-0.5">پارک آبی، بلیت، اسپا</span>
                    </div>
                  </button>

                  {/* 4. Tour */}
                  <button
                    type="button"
                    onClick={() => setSelectedType('Tour')}
                    className={cn(
                      "p-3 rounded-2xl border text-xs font-black flex items-center gap-3 transition-all cursor-pointer text-right min-h-[64px]",
                      selectedType === 'Tour'
                        ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20"
                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/60"
                    )}
                  >
                    <div className={cn(
                      "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
                      selectedType === 'Tour' ? "bg-white/20 text-white" : "bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400"
                    )}>
                      <Compass size={18} />
                    </div>
                    <div>
                      <span className="block font-black">تور و گردشگری</span>
                      <span className="text-[9px] opacity-80 font-normal block mt-0.5">تورهای داخلی، گشت شهری</span>
                    </div>
                  </button>

                  {/* 5. Villa */}
                  <button
                    type="button"
                    onClick={() => setSelectedType('Villa')}
                    className={cn(
                      "p-3 rounded-2xl border text-xs font-black flex items-center gap-3 transition-all cursor-pointer text-right min-h-[64px]",
                      selectedType === 'Villa'
                        ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20"
                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/60"
                    )}
                  >
                    <div className={cn(
                      "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
                      selectedType === 'Villa' ? "bg-white/20 text-white" : "bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400"
                    )}>
                      <Home size={18} />
                    </div>
                    <div>
                      <span className="block font-black">ویلا و اقامتگاه بومی</span>
                      <span className="text-[9px] opacity-80 font-normal block mt-0.5">رزرو ویلا، بوم‌گردی</span>
                    </div>
                  </button>

                  {/* 6. CarRental */}
                  <button
                    type="button"
                    onClick={() => setSelectedType('CarRental')}
                    className={cn(
                      "p-3 rounded-2xl border text-xs font-black flex items-center gap-3 transition-all cursor-pointer text-right min-h-[64px]",
                      selectedType === 'CarRental'
                        ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20"
                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/60"
                    )}
                  >
                    <div className={cn(
                      "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
                      selectedType === 'CarRental' ? "bg-white/20 text-white" : "bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400"
                    )}>
                      <Car size={18} />
                    </div>
                    <div>
                      <span className="block font-black">ترانسفر و رنت خودرو</span>
                      <span className="text-[9px] opacity-80 font-normal block mt-0.5">کرایه خودرو، ترانسفر</span>
                    </div>
                  </button>

                  {/* 7. Other */}
                  <button
                    type="button"
                    onClick={() => setSelectedType('Other')}
                    className={cn(
                      "p-3 rounded-2xl border text-xs font-black flex items-center gap-3 transition-all cursor-pointer text-right min-h-[64px]",
                      selectedType === 'Other'
                        ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20"
                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/60"
                    )}
                  >
                    <div className={cn(
                      "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
                      selectedType === 'Other' ? "bg-white/20 text-white" : "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400"
                    )}>
                      <Briefcase size={18} />
                    </div>
                    <div>
                      <span className="block font-black">سایر خدمات و مشاغل</span>
                      <span className="text-[9px] opacity-80 font-normal block mt-0.5">رستوران، اسپا، خدمات جانبی</span>
                    </div>
                  </button>

                </div>
              </div>

              <button 
                disabled={loading}
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl text-xs transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] min-h-[48px]"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <ShieldCheck size={18} />
                    <span>ثبت اولیه و ورود به هاب</span>
                  </>
                )}
              </button>
            </form>
          )}

        </div>

        {/* Footer info */}
        <div className="text-center text-[10px] text-slate-400 dark:text-slate-500 font-bold pt-6 border-t border-slate-100 dark:border-slate-850">
          سامانه یکپارچه شرکای گردشگری و هتل‌داران پارادایس • ورود امن بر بستر SMS OTP
        </div>

      </div>

      {/* 2. LEFT SIDE: Text-Free Ultra-Professional Enterprise Portal Gateway & Visual Canvas (Takes 40%) */}
      <div className="hidden lg:flex lg:w-[40%] relative bg-[#03050e] overflow-hidden select-none border-r border-slate-900/90 items-center justify-center p-10">
        
        {/* Atmospheric Radial Lights */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,#1e293b_0%,transparent_70%)] opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_85%,#1d4ed8_0%,transparent_50%)] opacity-25" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,#059669_0%,transparent_50%)] opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#4f46e5_0%,transparent_60%)] opacity-15" />
        
        {/* Architectural Grid & Tech Crosses Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-[0.2]" />

        {/* Pulsing Grid Intersection Glow Nodes */}
        <div className="absolute top-[20%] left-[25%] w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_12px_#60a5fa] animate-ping [animation-duration:3s]" />
        <div className="absolute top-[60%] left-[75%] w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399] animate-ping [animation-duration:4s]" />
        <div className="absolute top-[80%] left-[30%] w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_12px_#818cf8] animate-ping [animation-duration:5s]" />
        <div className="absolute top-[30%] left-[70%] w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee] animate-ping [animation-duration:3.5s]" />

        {/* Large Diffused Ambient Light Orbs */}
        <div className="absolute w-[420px] h-[420px] rounded-full bg-blue-600/15 blur-[150px] animate-pulse" />
        <div className="absolute w-[300px] h-[300px] rounded-full bg-indigo-600/10 blur-[120px] -translate-x-32 translate-y-32" />

        {/* Central Futuristic Gateway Console Showcase */}
        <div className="relative z-10 w-full max-w-md aspect-square flex items-center justify-center">
          
          {/* Concentric Rotating Cyber Orbits */}
          <div className="absolute w-[360px] h-[360px] rounded-full border border-slate-800/80 flex items-center justify-center animate-[spin_120s_linear_infinite] shadow-2xl">
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-blue-500 shadow-[0_0_16px_#3b82f6]" />
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_14px_#34d399]" />
            <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-indigo-400 shadow-[0_0_12px_#818cf8]" />
            <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]" />
          </div>

          <div className="absolute w-[280px] h-[280px] rounded-full border border-blue-500/20 flex items-center justify-center animate-[spin_80s_linear_infinite_reverse]">
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_8px_#67e8f9]" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc]" />
          </div>

          {/* Central Glassmorphic Portal Dashboard Card */}
          <div className="w-[260px] rounded-3xl bg-slate-900/90 border border-slate-700/60 backdrop-blur-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(37,99,235,0.2)] flex flex-col gap-4 relative z-20 group hover:border-blue-500/50 transition-all duration-500">
            
            {/* Card Header: Platform Status Pill */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/30">
                  <ShieldCheck size={18} />
                </div>
                <div className="space-y-1">
                  <div className="w-16 h-2 rounded-full bg-slate-200 dark:bg-slate-100" />
                  <div className="w-10 h-1.5 rounded-full bg-blue-500/80" />
                </div>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="w-6 h-1 rounded-full bg-emerald-400/80" />
              </div>
            </div>

            {/* Sparkline Analytics Wave Graphic */}
            <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Sparkles size={12} className="text-blue-400" />
                  <div className="w-12 h-1.5 rounded-full bg-slate-400" />
                </div>
                <div className="w-8 h-1.5 rounded-full bg-emerald-400" />
              </div>
              {/* SVG Sparkline */}
              <div className="h-10 w-full pt-1">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 200 40">
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,35 Q30,10 60,25 T120,8 T180,20 T200,5 L200,40 L0,40 Z" fill="url(#grad)" />
                  <path d="M0,35 Q30,10 60,25 T120,8 T180,20 T200,5" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="200" cy="5" r="3.5" fill="#60a5fa" className="animate-ping" />
                </svg>
              </div>
            </div>

            {/* Micro Stats Grid Rows */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-950/60 border border-slate-800/60 p-2.5 rounded-xl flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0">
                  <Building2 size={14} />
                </div>
                <div className="space-y-1">
                  <div className="w-10 h-1.5 rounded-full bg-slate-300" />
                  <div className="w-6 h-1 rounded-full bg-slate-500" />
                </div>
              </div>
              <div className="bg-slate-950/60 border border-slate-800/60 p-2.5 rounded-xl flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                  <Utensils size={14} />
                </div>
                <div className="space-y-1">
                  <div className="w-12 h-1.5 rounded-full bg-slate-300" />
                  <div className="w-7 h-1 rounded-full bg-slate-500" />
                </div>
              </div>
            </div>

          </div>

          {/* Floating Orbiting Satellite Card 1 (Top Right: Active Security) */}
          <div className="absolute -top-6 -right-6 bg-slate-900/90 border border-slate-700/70 backdrop-blur-xl p-3 rounded-2xl shadow-2xl flex items-center gap-3 z-30 animate-bounce [animation-duration:6s] hover:scale-105 transition-transform">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-400 flex items-center justify-center shadow-inner">
              <KeyRound size={18} />
            </div>
            <div className="space-y-1 pr-1">
              <div className="w-12 h-2 rounded-full bg-slate-200" />
              <div className="w-8 h-1.5 rounded-full bg-blue-400/80" />
            </div>
          </div>

          {/* Floating Orbiting Satellite Card 2 (Bottom Left: Fast Connection) */}
          <div className="absolute -bottom-6 -left-6 bg-slate-900/90 border border-slate-700/70 backdrop-blur-xl p-3 rounded-2xl shadow-2xl flex items-center gap-3 z-30 animate-bounce [animation-duration:8s] hover:scale-105 transition-transform">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 flex items-center justify-center shadow-inner">
              <Compass size={18} />
            </div>
            <div className="space-y-1 pr-1">
              <div className="w-14 h-2 rounded-full bg-slate-200" />
              <div className="w-9 h-1.5 rounded-full bg-emerald-400/80" />
            </div>
          </div>

          {/* Floating Orbiting Satellite Card 3 (Top Left: Verified Partner) */}
          <div className="absolute top-10 -left-10 bg-slate-900/90 border border-slate-700/70 backdrop-blur-xl p-2.5 rounded-2xl shadow-2xl flex items-center gap-2.5 z-25 animate-bounce [animation-duration:7s] hover:scale-105 transition-transform">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-400/30 text-amber-400 flex items-center justify-center">
              <Sparkles size={14} />
            </div>
            <div className="w-10 h-1.5 rounded-full bg-slate-300" />
          </div>

        </div>

      </div>

    </div>
  );
}
