import React, { useState } from 'react';
import { 
  ArrowRight, 
  Plus, 
  Building2, 
  Users, 
  Wallet, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle, 
  Briefcase, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  Sparkles,
  Clock, 
  Lock, 
  Unlock, 
  ExternalLink, 
  ShieldAlert, 
  Check, 
  Plane, 
  Train, 
  Car, 
  Home, 
  Activity, 
  Coffee, 
  RefreshCw, 
  Sliders, 
  ShieldCheck,
  Trash2
} from 'lucide-react';
import { Business, TeamMember, BusinessType } from './types';
import { cn } from '@/lib/utils';
import { NotificationCenter } from './NotificationCenter';

// Helper to get Business Icon
function getBusinessIcon(type: BusinessType, className = "w-6 h-6") {
  switch (type) {
    case 'Hotel':
      return <Building2 className={className} />;
    case 'Flight':
      return <Plane className={className} />;
    case 'Train':
      return <Train className={className} />;
    case 'CarRental':
      return <Car className={className} />;
    case 'Villa':
      return <Home className={className} />;
    case 'Entertainment':
      return <Activity className={className} />;
    default:
      return <Building2 className={className} />;
  }
}

// Helper to get Business Name in Persian
function getBusinessLabel(type: BusinessType) {
  switch (type) {
    case 'Hotel': return 'هتل و اقامتگاه';
    case 'Flight': return 'بلیت پرواز';
    case 'Train': return 'بلیت قطار';
    case 'CarRental': return 'اجاره خودرو';
    case 'Villa': return 'ویلا و بومگردی';
    case 'Entertainment': return 'تفریحی و سرگرمی';
    default: return 'سرویس خدمات';
  }
}

export function WorkspaceHub({ 
  businesses, 
  teamMembers, 
  onClose, 
  onAddBusiness, 
  onManageBusiness,
  onUpdateBusinesses,
  onOpenProfile
}: { 
  businesses: Business[], 
  teamMembers: TeamMember[], 
  onClose: () => void,
  onAddBusiness: (b?: Business) => void,
  onManageBusiness: (id: string) => void,
  onUpdateBusinesses?: (businesses: Business[]) => void,
  onOpenProfile?: () => void
}) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [currentOwnerName, setCurrentOwnerName] = useState(() => businesses.find(b => b.ownerName)?.ownerName || 'امیر رضایی');

  const currentMobile = businesses.find(b => b.mobile)?.mobile || '09123456789';

  const handleUpdateOwnerName = (newName: string) => {
    setCurrentOwnerName(newName);
    if (onUpdateBusinesses) {
      onUpdateBusinesses(businesses.map(b => ({ ...b, ownerName: newName })));
    }
  };

  const getInitials = (fullName: string) => {
    const parts = fullName.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]} ${parts[1][0]}`;
    return fullName.slice(0, 2) || 'US';
  };

  const totalCount = businesses.length;
  const pendingCount = businesses.filter(b => b.status === 'Pending').length;
  const activeCount = businesses.filter(b => b.status === 'Active').length;
  const suspendedCount = businesses.filter(b => b.status === 'Suspended').length;

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(businesses.map(b => b.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds(prev => [...prev, id]);
    } else {
      setSelectedIds(prev => prev.filter(i => i !== id));
    }
  };

  const handleBulkStatusChange = (status: 'Active' | 'Pending' | 'Suspended') => {
    if (!onUpdateBusinesses) return;
    const updated = businesses.map(b => selectedIds.includes(b.id) ? { ...b, status } : b);
    onUpdateBusinesses(updated);
    setSelectedIds([]);
  };

  const updateSingleStatus = (id: string, status: 'Active' | 'Pending' | 'Suspended') => {
    if (!onUpdateBusinesses) return;
    const updated = businesses.map(b => b.id === id ? { ...b, status } : b);
    onUpdateBusinesses(updated);
  };

  const deleteBusiness = (id: string) => {
    if (!onUpdateBusinesses) return;
    const updated = businesses.filter(b => b.id !== id);
    onUpdateBusinesses(updated);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50/50 dark:bg-[#070913]">
      {/* Header */}
      <header data-tour="hub-header" className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center justify-between px-6 shrink-0 relative z-20">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors">
            <ArrowRight size={20} />
          </button>
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-lg">
            <Briefcase className="text-blue-600 dark:text-blue-500" />
            هاب مرکزی شرکا
          </div>
        </div>
        <div className="flex items-center gap-4">
          <NotificationCenter />
          <button 
            onClick={() => onOpenProfile ? onOpenProfile() : setShowProfileModal(true)}
            className="flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-800/60 px-3 py-1.5 rounded-2xl transition-all cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
            title="پنل مدیریت حساب کاربری و همکاران"
          >
            <div className="hidden md:block text-left">
              <div className="text-xs font-black text-slate-900 dark:text-white">{currentOwnerName}</div>
              <div className="text-[10px] text-blue-600 dark:text-blue-400 font-bold">پنل مدیریت حساب و همکاران</div>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-xs shadow-md border-2 border-white dark:border-slate-800">
              {getInitials(currentOwnerName)}
            </div>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10 space-y-8">
          
          {/* Main welcome banner */}
          <div className="bg-gradient-to-l from-slate-900 via-slate-950 to-[#0e122b] rounded-3xl border border-slate-800 p-6 md:p-8 shadow-2xl relative overflow-hidden text-right">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.15),transparent_50%)]" />
            <div className="absolute top-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10 max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-1.5 bg-blue-500/10 text-blue-400 text-[10px] font-black px-3 py-1 rounded-full border border-blue-500/20">
                <Sparkles size={11} className="text-blue-400 fill-blue-400" /> معماری نوین غیرمتمرکز خدمات پارادایس
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white leading-snug">به هاب یکپارچه شرکای گردشگری خوش آمدید!</h1>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-semibold">
                در ساختار جدید پارادایس، ورک‌اسپیس هاب بستری متمرکز جهت ثبت و تعریف کسب‌وکار شماست. کلیه خدمات ثبت‌شده ابتدا باید توسط سوپرادمین‌ها در پنل کنترلر مرکزی تأیید شوند. پس از تأیید، لینک ورود به پیشخوان مدیریت اختصاصی به صورت کاملاً تفکیک‌شده فعال خواهد شد.
              </p>
            </div>
          </div>

          {/* Top Overview Section */}
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white mb-2">تعریف و پیگیری کسب‌وکارهای شما</h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm">لیست کلیه صنف‌ها و شعب که در بستر پارادایس تعریف کرده‌اید.</p>
            </div>
            <button data-tour="add-business" onClick={() => onAddBusiness()} className="bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-transform hover:scale-105 shadow-xl shadow-slate-900/10 cursor-pointer">
              <Plus size={18} />
              تعریف صنف / کسب‌وکار جدید
            </button>
          </div>

          {/* KPI Cards */}
          <div data-tour="kpi-cards" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between group hover:border-blue-500/50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  <Building2 size={24} />
                </div>
                <span className="text-sm font-bold text-slate-500">کل کسب‌وکارهای ثبت شده</span>
              </div>
              <div>
                <div className="text-3xl font-black text-slate-900 dark:text-white">{totalCount}</div>
                <div className="text-xs font-semibold text-slate-400 mt-1">سرویس‌های مستقل و وابسته</div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between group hover:border-blue-500/50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                  <Clock size={24} />
                </div>
                <span className="text-sm font-bold text-slate-500">در انتظار تایید سوپر ادمین</span>
              </div>
              <div>
                <div className="text-3xl font-black text-slate-900 dark:text-white">{pendingCount}</div>
                <div className="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-1">نیازمند بازبینی مدارک</div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between group hover:border-blue-500/50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                  <CheckCircle size={24} />
                </div>
                <span className="text-sm font-bold text-slate-500">مجموعه‌های فعال</span>
              </div>
              <div>
                <div className="text-3xl font-black text-slate-900 dark:text-white">{activeCount}</div>
                <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">پنل مدیریت اختصاصی باز است</div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between group hover:border-blue-500/50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-900/30 flex items-center justify-center text-rose-600 dark:text-rose-400 group-hover:scale-110 transition-transform">
                  <ShieldAlert size={24} />
                </div>
                <span className="text-sm font-bold text-slate-500">تعلیق دسترسی</span>
              </div>
              <div>
                <div className="text-3xl font-black text-slate-900 dark:text-white">{suspendedCount}</div>
                <div className="text-xs font-semibold text-rose-600 dark:text-rose-400 mt-1">مسدودیت به علت نقض شرایط</div>
              </div>
            </div>
          </div>

          {/* Businesses List */}
          <div data-tour="business-list" className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 md:p-8 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={selectedIds.length === businesses.length && businesses.length > 0}
                    onChange={handleSelectAll}
                    className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                </label>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">فهرست صنف‌های ثبت شده</h2>
              </div>
              
              <div className="flex items-center gap-2">
                {selectedIds.length > 0 ? (
                  <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-4 duration-300">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-full ml-2">
                      {selectedIds.length} مورد انتخاب شده
                    </span>
                    <button onClick={() => handleBulkStatusChange('Active')} className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer">
                      تأیید انبوه
                    </button>
                    <button onClick={() => handleBulkStatusChange('Suspended')} className="bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-900/20 dark:text-rose-400 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer">
                      تعلیق انبوه
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="text-xs font-bold text-slate-500">مرتب‌سازی بر اساس:</div>
                    <select className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-900 dark:text-white outline-none">
                      <option>جدیدترین‌ها</option>
                      <option>قدیمی‌ترین‌ها</option>
                    </select>
                  </>
                )}
              </div>
            </div>

            {businesses.length === 0 ? (
              <div className="p-8 md:p-16 text-center max-w-xl mx-auto my-12 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/30 dark:to-slate-950/20 border border-slate-100 dark:border-slate-800/80 rounded-3xl shadow-sm animate-in fade-in slide-in-from-bottom-6 duration-700">
                <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  {/* Glowing decorative backdrops */}
                  <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-400/10 rounded-full blur-xl animate-pulse"></div>
                  <div className="absolute inset-2 bg-blue-500/5 dark:bg-blue-400/5 rounded-full border border-blue-500/10 dark:border-blue-400/10"></div>
                  
                  {/* Centered building icon */}
                  <div className="relative w-14 h-14 rounded-2xl bg-blue-600/10 dark:bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm">
                    <Building2 size={28} />
                  </div>
                  
                  {/* Floating sparkles badge */}
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-md animate-bounce">
                    <Sparkles size={12} />
                  </div>
                </div>

                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">
                  هنوز هیچ صنف یا کسب‌وکاری ثبت نکرده‌اید!
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold max-w-sm mx-auto leading-relaxed mb-8">
                  جهت ورود به پنل مدیریت شرکای پارادایس و بهره‌مندی از خدمات ویژه صنف‌ها، لطفاً نخستین کسب‌وکار یا خدمات صنف خود را ثبت کنید.
                </p>

                {/* Main Call to Action Button */}
                <button
                  onClick={() => onAddBusiness()}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-2xl text-xs font-black transition-all duration-200 hover:shadow-lg hover:shadow-blue-600/20 active:scale-98 cursor-pointer"
                >
                  <Plus size={16} />
                  ثبت نخستین صنف و کسب‌وکار
                </button>

                {/* Minimal Feature List to guide user */}
                <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800/40 grid grid-cols-1 sm:grid-cols-3 gap-4 text-right">
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-md bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">
                      <Check size={12} />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-black text-slate-800 dark:text-slate-200">پنل رزرو و مدیریت</h4>
                      <p className="text-[9px] text-slate-400 dark:text-slate-500 font-bold mt-0.5">دسترسی به خدمات رزروها</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-md bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">
                      <Check size={12} />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-black text-slate-800 dark:text-slate-200">تعریف خدمات زیرمجموعه</h4>
                      <p className="text-[9px] text-slate-400 dark:text-slate-500 font-bold mt-0.5">تاسیس رستوران، اسپا و کلوپ</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-md bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">
                      <Check size={12} />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-black text-slate-800 dark:text-slate-200">گزارشات و تسویه مالی</h4>
                      <p className="text-[9px] text-slate-400 dark:text-slate-500 font-bold mt-0.5">امور حسابداری و تراکنش‌ها</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {businesses.map(business => {
                  const isSub = !!business.parentId;
                  const parent = isSub ? businesses.find(b => b.id === business.parentId) : null;
                  
                  return (
                    <div 
                      key={business.id} 
                      className={cn(
                        "p-6 md:p-8 hover:bg-slate-50/70 dark:hover:bg-slate-800/20 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-6 group", 
                        selectedIds.includes(business.id) && "bg-blue-50/50 dark:bg-blue-900/10",
                        business.status === 'Pending' && "opacity-85"
                      )}
                    >
                      {/* Left: General info */}
                      <div className="flex items-start gap-4 lg:w-1/3">
                        <div className="flex items-center pt-2.5">
                          <input 
                            type="checkbox" 
                            checked={selectedIds.includes(business.id)}
                            onChange={(e) => handleSelectOne(business.id, e.target.checked)}
                            className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                          />
                        </div>
                        <div className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border",
                          business.status === 'Active' 
                            ? "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/30 dark:border-blue-800/50 dark:text-blue-400" 
                            : business.status === 'Pending'
                            ? "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/20 dark:border-amber-800/50 dark:text-amber-400 animate-pulse"
                            : "bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-900/20 dark:border-rose-800/50 dark:text-rose-400"
                        )}>
                          {getBusinessIcon(business.type, "w-6 h-6")}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center flex-wrap gap-2">
                            <h3 className="text-base font-black text-slate-900 dark:text-white transition-colors">
                              {business.name}
                            </h3>
                            {isSub && parent && (
                              <span className="text-[9px] bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 px-2 py-0.5 rounded-md font-bold">
                                زیرمجموعه {parent.name}
                              </span>
                            )}
                          </div>
                          
                          <div className="text-xs text-slate-500 flex items-center gap-2">
                            <span className="font-bold">{getBusinessLabel(business.type)}</span>
                            {business.address && (
                              <>
                                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                                <span className="truncate max-w-xs">{business.address}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Middle: Status Specific Panel Information */}
                      <div className="lg:w-1/3 flex flex-col justify-center">
                        {business.completionPercentage && business.completionPercentage < 100 ? (
                          <div className="space-y-1.5 bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 p-3 rounded-2xl">
                            <div className="flex items-center justify-between text-amber-800 dark:text-amber-400 text-xs font-black">
                              <div className="flex items-center gap-1.5">
                                <AlertCircle size={14} className="text-amber-600 dark:text-amber-500" />
                                <span>نقص پرونده ({business.completionPercentage}٪)</span>
                              </div>
                              <button 
                                onClick={() => onAddBusiness(business)} 
                                className="text-[10px] bg-amber-600 hover:bg-amber-700 text-white font-bold px-2 py-0.5 rounded-lg transition-colors cursor-pointer"
                              >
                                تکمیل پرونده
                              </button>
                            </div>
                            <div className="w-full bg-amber-100 dark:bg-amber-900/40 h-1.5 rounded-full overflow-hidden">
                              <div 
                                className="bg-amber-500 h-full rounded-full transition-all duration-500" 
                                style={{ width: `${business.completionPercentage}%` }}
                              />
                            </div>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal font-semibold">
                              اطلاعات پایه را جهت نهایی‌سازی ثبت‌نام تکمیل کنید.
                            </p>
                          </div>
                        ) : business.status === 'Active' ? (
                          <div className="space-y-1 bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-100/60 dark:border-emerald-900/30 p-3 rounded-2xl">
                            <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 text-xs font-black">
                              <CheckCircle size={14} />
                              دسترسی به پنل مجزا فعال است
                            </div>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal font-semibold">
                              مدارک صنف تأیید شده است. پیوند ورود به محیط کاری فعال می‌باشد.
                            </p>
                          </div>
                        ) : business.status === 'Pending' ? (
                          <div className="space-y-1 bg-amber-50/50 dark:bg-amber-950/10 border border-amber-100/60 dark:border-amber-900/30 p-3 rounded-2xl">
                            <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-500 text-xs font-black">
                              <Clock size={14} className="animate-spin" />
                              در انتظار بررسی و تأیید مدارک
                            </div>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal font-semibold">
                              اطلاعات صنف دریافت شده و در حال تطابق واچر با سازمان است.
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-1 bg-rose-50/50 dark:bg-rose-950/10 border border-rose-100/60 dark:border-rose-900/30 p-3 rounded-2xl">
                            <div className="flex items-center gap-1.5 text-rose-700 dark:text-rose-400 text-xs font-black">
                              <ShieldAlert size={14} />
                              دسترسی موقتاً تعلیق شده است
                            </div>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal font-semibold">
                              پشتیبانی مرکزی به دلایل انضباطی دسترسی این پنل را مسدود کرده است.
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-4 lg:w-1/4 justify-end">
                        {business.facilityCount !== undefined && (
                          <div className="text-left hidden xl:block pl-4">
                            <div className="text-sm font-black text-slate-900 dark:text-white">
                              {business.facilityCount} <span className="text-xs text-slate-500">واحد</span>
                            </div>
                            <div className="text-[10px] text-slate-500 mt-0.5">ظرفیت کل فضا</div>
                          </div>
                        )}
                        
                        {business.status === 'Active' ? (
                          <button 
                            onClick={() => onManageBusiness(business.id)}
                            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white hover:scale-[1.02] active:scale-[0.98] px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 group/btn shadow-md shadow-blue-500/10 cursor-pointer"
                          >
                            ورود به پیشخوان مدیریت اختصاصی
                            <ExternalLink size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                          </button>
                        ) : business.status === 'Pending' ? (
                          <button 
                            disabled
                            className="w-full sm:w-auto bg-slate-100 dark:bg-slate-800/80 text-slate-400 dark:text-slate-600 border border-slate-200 dark:border-slate-800/50 px-5 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-2 cursor-not-allowed select-none"
                          >
                            <Lock size={13} />
                            لینک ورود قفل است
                          </button>
                        ) : (
                          <button 
                            disabled
                            className="w-full sm:w-auto bg-rose-50/40 dark:bg-rose-950/10 text-rose-400 dark:text-rose-900 border border-rose-100/30 dark:border-rose-950/50 px-5 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-2 cursor-not-allowed select-none"
                          >
                            <ShieldAlert size={13} />
                            مسدود شده
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
