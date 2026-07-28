import React, { useState } from 'react';
import { 
  ArrowRight, 
  User, 
  Users, 
  Building2, 
  ShieldCheck, 
  KeyRound, 
  Plus, 
  Phone, 
  Mail, 
  CreditCard, 
  CheckCircle2, 
  X, 
  Edit3, 
  Trash2, 
  Search, 
  Sparkles, 
  Shield, 
  Clock, 
  Laptop, 
  Smartphone, 
  LogOut, 
  ChevronLeft,
  Lock,
  UserCheck,
  UserX,
  Hotel,
  Ticket,
  Menu,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import { Business, TeamMember } from './types';
import { cn } from '@/lib/utils';

interface UserProfilePanelProps {
  ownerName: string;
  mobile: string;
  businesses: Business[];
  teamMembers: TeamMember[];
  onBack: () => void;
  onUpdateOwnerName: (newName: string) => void;
  onUpdateTeamMembers: (members: TeamMember[]) => void;
  onNavigateToBusiness?: (businessId: string) => void;
  onLogout?: () => void;
}

type TabType = 'profile' | 'team' | 'businesses' | 'security';

export function UserProfilePanel({
  ownerName,
  mobile,
  businesses,
  teamMembers,
  onBack,
  onUpdateOwnerName,
  onUpdateTeamMembers,
  onNavigateToBusiness,
  onLogout
}: UserProfilePanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Profile Form State
  const [name, setName] = useState(ownerName || 'امیر رضایی');
  const [nationalCode, setNationalCode] = useState('0012345678');
  const [email, setEmail] = useState('a.rezaei@example.com');
  const [companyName, setCompanyName] = useState('گروه هتلداری و گردشگری پارادایس');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Team Management State
  const [membersList, setMembersList] = useState<TeamMember[]>(teamMembers);
  const [searchMember, setSearchMember] = useState('');
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  
  // New Member Form State
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberMobile, setNewMemberMobile] = useState('');
  const [newMemberRole, setNewMemberRole] = useState<'مدیر کل' | 'مدیر پذیرش' | 'حسابدار' | 'پشتیبان خدمات'>('مدیر پذیرش');
  const [newMemberBusinessId, setNewMemberBusinessId] = useState<string>(businesses[0]?.id || 'b1');

  const getInitials = (fullName: string) => {
    const parts = fullName.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]} ${parts[1][0]}`;
    return fullName.slice(0, 2) || 'US';
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateOwnerName(name.trim());
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleAddMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim() || !newMemberMobile.trim()) return;

    const assignedB = businesses.find(b => b.id === newMemberBusinessId);

    const newMember: TeamMember = {
      id: `tm-${Date.now()}`,
      name: newMemberName.trim(),
      role: newMemberRole,
      mobile: newMemberMobile.trim(),
      businessName: assignedB?.name || 'کلیه صنف‌ها',
      status: 'Active',
      lastActive: 'هم‌اکنون'
    };

    const updated = [newMember, ...membersList];
    setMembersList(updated);
    onUpdateTeamMembers(updated);

    // Reset Form
    setNewMemberName('');
    setNewMemberMobile('');
    setShowAddMemberModal(false);
  };

  const handleToggleMemberStatus = (id: string) => {
    const updated = membersList.map(m => {
      if (m.id === id) {
        return {
          ...m,
          status: (m.status === 'Active' ? 'Pending' : 'Active') as 'Active' | 'Pending'
        };
      }
      return m;
    });
    setMembersList(updated);
    onUpdateTeamMembers(updated);
  };

  const handleDeleteMember = (id: string) => {
    const updated = membersList.filter(m => m.id !== id);
    setMembersList(updated);
    onUpdateTeamMembers(updated);
  };

  const filteredMembers = membersList.filter(m => 
    (m.name || '').includes(searchMember) || 
    (m.mobile || '').includes(searchMember) || 
    (m.role || '').includes(searchMember) ||
    (m.businessName || '').includes(searchMember)
  );

  const navigationItems = [
    {
      id: 'profile' as TabType,
      title: 'مشخصات فردی و تجاری',
      subtitle: 'اطلاعات مالک و برند مادر',
      icon: User,
      badge: null
    },
    {
      id: 'team' as TabType,
      title: 'مدیریت همکاران و دسترسی‌ها',
      subtitle: 'پرسنل، پذیرش و حسابداران',
      icon: Users,
      badge: membersList.length
    },
    {
      id: 'businesses' as TabType,
      title: 'صنف‌های تحت مدیریت',
      subtitle: 'مجموعه‌های ثبت‌شده در پارادایس',
      icon: Building2,
      badge: businesses.length
    },
    {
      id: 'security' as TabType,
      title: 'امنیت و نشست‌های فعال',
      subtitle: 'دستگاه‌های متصل و رمز عبور',
      icon: ShieldCheck,
      badge: null
    }
  ];

  return (
    <div className="flex flex-col min-h-screen h-full bg-slate-50 dark:bg-[#070913] text-slate-900 dark:text-white" dir="rtl">
      
      {/* Top Header Bar for Mobile & Desktop */}
      <header className="h-16 border-b border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8 shadow-xs">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl text-slate-700 dark:text-slate-200 transition-colors flex items-center gap-2 cursor-pointer font-bold text-xs shrink-0"
            title="بازگشت"
          >
            <ArrowRight size={18} />
            <span className="hidden sm:inline">بازگشت به هاب مرکزی</span>
          </button>

          <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h1 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-tight">
                پنل مدیریت کاربری و اعضای تیم
              </h1>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold hidden md:block">
                سامانه متمرکز سطوح دسترسی، هویتی و مجموعه‌های پارادایس
              </p>
            </div>
          </div>
        </div>

        {/* User Info Quick Badge */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-black text-slate-900 dark:text-white">{name}</span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">مالک ارشد (Owner)</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-xs shadow-md border-2 border-white dark:border-slate-800 shrink-0">
            {getInitials(name)}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 lg:hidden cursor-pointer"
            aria-label="منوی ناوبری"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Main Full Page Body Layout: Sidebar + Main Content Container */}
      <div className="flex-1 flex flex-col lg:flex-row w-full max-w-7xl mx-auto overflow-hidden">
        
        {/* RIGHT SIDEBAR (Desktop Permanent, Mobile Slide-over Drawer) */}
        <aside className={cn(
          "lg:w-80 border-l border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-950/80 p-4 lg:p-6 flex flex-col justify-between shrink-0 transition-all duration-300 z-20",
          mobileMenuOpen ? "block border-b lg:border-b-0" : "hidden lg:flex"
        )}>
          
          <div className="space-y-6">
            
            {/* User Profile Mini Banner in Sidebar */}
            <div className="p-4 rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-950 text-white shadow-lg border border-blue-800/40 relative overflow-hidden">
              <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-blue-500/20 rounded-full blur-xl pointer-events-none" />
              <div className="relative z-10 flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center font-black text-base text-white shadow-md shrink-0">
                  {getInitials(name)}
                </div>
                <div className="min-w-0">
                  <h2 className="text-sm font-black truncate">{name}</h2>
                  <p className="text-[11px] text-blue-200/80 font-bold truncate mt-0.5">{mobile || '09123456789'}</p>
                  <span className="inline-block mt-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[9px] font-bold px-2 py-0.5 rounded-md">
                    مالک ارشد حساب
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Menu Vertical List */}
            <div className="space-y-1.5">
              <p className="text-[11px] font-black text-slate-400 dark:text-slate-500 px-3 uppercase tracking-wider mb-2">
                بخش‌های مدیریتی
              </p>

              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={cn(
                      "w-full text-right p-3.5 rounded-2xl transition-all duration-200 flex items-center justify-between cursor-pointer group min-h-[48px] relative overflow-hidden",
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/25 scale-[1.01] ring-1 ring-white/20"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-900/80 hover:translate-x-[-2px]"
                    )}
                  >
                    {/* Active State Indicator Bar */}
                    {isActive && (
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-7 bg-white rounded-l-full shadow-sm animate-in fade-in zoom-in duration-200" />
                    )}

                    <div className="flex items-center gap-3 min-w-0 pr-1">
                      <div className={cn(
                        "w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 shrink-0 group-hover:scale-105",
                        isActive
                          ? "bg-white/20 text-white shadow-xs"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/60 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                      )}>
                        <IconComponent size={18} className="transition-transform duration-200 group-hover:rotate-3" />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-xs font-black truncate">{item.title}</span>
                        <span className={cn(
                          "block text-[10px] font-bold truncate mt-0.5 transition-colors",
                          isActive ? "text-blue-100" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-400"
                        )}>
                          {item.subtitle}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 mr-2">
                      {item.badge !== null && (
                        <span className={cn(
                          "px-2 py-0.5 rounded-lg text-[10px] font-black shrink-0 transition-transform duration-200 group-hover:scale-105",
                          isActive
                            ? "bg-white text-blue-900 shadow-xs"
                            : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 group-hover:text-blue-700 dark:group-hover:text-blue-300"
                        )}>
                          {item.badge}
                        </span>
                      )}

                      <ChevronLeft 
                        size={14} 
                        className={cn(
                          "transition-all duration-200",
                          isActive 
                            ? "text-white opacity-100 translate-x-0" 
                            : "text-slate-400 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
                        )} 
                      />
                    </div>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Sidebar Footer Action */}
          <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800/80 mt-6 space-y-2">
            <button
              onClick={onBack}
              className="w-full py-3 px-4 rounded-2xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-black transition-all flex items-center justify-between cursor-pointer min-h-[44px]"
            >
              <div className="flex items-center gap-2">
                <ArrowRight size={16} />
                <span>بازگشت به هاب اصلی</span>
              </div>
              <ChevronLeft size={16} className="text-slate-400" />
            </button>

            {onLogout && (
              <button
                onClick={onLogout}
                className="w-full py-3 px-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-400 text-xs font-black transition-all flex items-center gap-2 cursor-pointer min-h-[44px]"
              >
                <LogOut size={16} />
                <span>خروج از حساب</span>
              </button>
            )}
          </div>

        </aside>

        {/* MOBILE TOP SCROLLABLE TABS (Visible only on mobile/tablet) */}
        <div className="lg:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 p-2 overflow-x-auto flex items-center gap-2 shrink-0">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 shrink-0 transition-all cursor-pointer min-h-[44px]",
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : "bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300"
                )}
              >
                <IconComponent size={16} />
                <span>{item.title}</span>
                {item.badge !== null && (
                  <span className={cn(
                    "px-1.5 py-0.5 rounded-md text-[10px]",
                    isActive ? "bg-white text-blue-900" : "bg-slate-200 dark:bg-slate-800"
                  )}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* MAIN PAGE CONTENT AREA */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto space-y-6">
          
          {/* TAB 1: Profile & Company Details */}
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Header Box */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <User className="text-blue-600" size={22} />
                    <span>مشخصات فردی و حقوقی نماینده اصلی</span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                    اطلاعات کاربری اصلی جهت صدور رسمی اسناد، فاکتورها و احراز هویت مجموعه‌ها
                  </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-900/50 px-3.5 py-2 rounded-2xl text-xs font-bold text-blue-700 dark:text-blue-300 flex items-center gap-2 shrink-0">
                  <ShieldCheck size={16} />
                  <span>تایید شده توسط پارادایس</span>
                </div>
              </div>

              {savedSuccess && (
                <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 p-4 rounded-2xl text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2.5 animate-in fade-in">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                  <span>اطلاعات کاربری شما با موفقیت بروزرسانی شد.</span>
                </div>
              )}

              {/* Form Card */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-8 shadow-xs">
                <form onSubmit={handleSaveProfile} className="space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                    
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-700 dark:text-slate-300 block">
                        نام و نام خانوادگی مالک / نماینده <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                          type="text" 
                          value={name}
                          onChange={e => setName(e.target.value)}
                          className="w-full pr-11 pl-4 py-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all min-h-[44px]"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-700 dark:text-slate-300 block">
                        شماره همراه ورود به پنل (ورود دو مرحله‌ای)
                      </label>
                      <div className="relative">
                        <Phone size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                          type="text" 
                          value={mobile || '09123456789'}
                          disabled
                          className="w-full pr-11 pl-4 py-3.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold text-slate-500 dark:text-slate-400 cursor-not-allowed dir-ltr text-right min-h-[44px]"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-700 dark:text-slate-300 block">
                        نام برند مادر یا شرکت حقوقی
                      </label>
                      <div className="relative">
                        <Building2 size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                          type="text" 
                          value={companyName}
                          onChange={e => setCompanyName(e.target.value)}
                          placeholder="مثال: گروه هتلداری پارادایس"
                          className="w-full pr-11 pl-4 py-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all min-h-[44px]"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-700 dark:text-slate-300 block">
                        کد ملی نماینده حقوقی
                      </label>
                      <div className="relative">
                        <CreditCard size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                          type="text" 
                          value={nationalCode}
                          onChange={e => setNationalCode(e.target.value)}
                          className="w-full pr-11 pl-4 py-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all min-h-[44px]"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <label className="text-xs font-black text-slate-700 dark:text-slate-300 block">
                        پست الکترونیک رسمی جهت دریافت اطلاعیه‌ها و فاکتورها
                      </label>
                      <div className="relative">
                        <Mail size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                          type="email" 
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          className="w-full pr-11 pl-4 py-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all min-h-[44px]"
                        />
                      </div>
                    </div>

                  </div>

                  <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-2xl font-black text-xs transition-all shadow-lg shadow-blue-600/20 cursor-pointer min-h-[44px]"
                    >
                      ذخیره و بروزرسانی مشخصات
                    </button>
                  </div>
                </form>
              </div>

            </div>
          )}

          {/* TAB 2: Co-Workers & Roles Management */}
          {activeTab === 'team' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Header with Search and Add Co-Worker Button */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shadow-xs">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <Users size={22} className="text-blue-600" />
                    <span>لیست همکاران و سطوح دسترسی</span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                    تعریف پرسنل، مدیران پذیرش، حسابداران و تعیین دسترسی اختصاصی به مجموعه‌ها
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="relative">
                    <Search size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      value={searchMember}
                      onChange={e => setSearchMember(e.target.value)}
                      placeholder="جستجو نام، موبایل یا نقش..."
                      className="w-full sm:w-60 pr-10 pl-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px]"
                    />
                  </div>

                  <button
                    onClick={() => setShowAddMemberModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-black text-xs transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 shrink-0 cursor-pointer min-h-[44px]"
                  >
                    <Plus size={18} />
                    <span>افزودن همکار جدید</span>
                  </button>
                </div>
              </div>

              {/* Roles Description Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 rounded-2xl space-y-1">
                  <span className="bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-[10px] font-black px-2.5 py-1 rounded-lg inline-block">
                    مدیر کل (Full Admin)
                  </span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    دسترسی به تمام تنظیمات، بخش مالی، تغییر نرخ‌ها و مدیریت اعضا
                  </p>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 rounded-2xl space-y-1">
                  <span className="bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[10px] font-black px-2.5 py-1 rounded-lg inline-block">
                    مدیر پذیرش (Front Desk)
                  </span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    ثبت و تایید پذیرش، چک‌این، چک‌اوت مسافران و تقویم رزروها
                  </p>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 rounded-2xl space-y-1">
                  <span className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-black px-2.5 py-1 rounded-lg inline-block">
                    حسابدار (Finance)
                  </span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    دسترسی اختصاصی به گزارش‌های تسویه‌حساب، فاکتورها و تراکنش‌ها
                  </p>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 rounded-2xl space-y-1">
                  <span className="bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-[10px] font-black px-2.5 py-1 rounded-lg inline-block">
                    پشتیبان (Services)
                  </span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    بروزرسانی خدمات، نظافت اتاق‌ها و کنترل سانس‌های تفریحی
                  </p>
                </div>
              </div>

              {/* Mobile View Cards for Team Members */}
              <div className="space-y-3 md:hidden">
                {filteredMembers.map((member) => (
                  <div key={member.id} className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black text-xs shrink-0">
                          {getInitials(member.name)}
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-slate-900 dark:text-white">{member.name}</h4>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono block dir-ltr text-right">{member.mobile || '۰۹۱۲۰۰۰۰۰۰۰'}</span>
                        </div>
                      </div>

                      <span className={cn(
                        "px-2.5 py-1 rounded-lg text-[10px] font-black shrink-0",
                        member.role === 'مدیر کل' ? "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300" :
                        member.role === 'مدیر پذیرش' ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300" :
                        member.role === 'حسابدار' ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" :
                        "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                      )}>
                        {member.role}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-600 dark:text-slate-400 font-medium space-y-1 bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl">
                      <p>مجموعه: <strong className="text-slate-900 dark:text-white">{member.businessName || 'کلیه صنف‌ها'}</strong></p>
                      <p>آخرین فعالیت: {member.lastActive || 'هم‌اکنون'}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <UserCheck size={12} /> دسترسی فعال
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleMemberStatus(member.id)}
                          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 cursor-pointer text-xs font-bold"
                        >
                          تغییر وضعیت
                        </button>
                        <button
                          onClick={() => handleDeleteMember(member.id)}
                          className="p-2 hover:bg-rose-50 text-rose-600 rounded-lg cursor-pointer text-xs font-bold"
                        >
                          حذف
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-right border-collapse">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200/80 dark:border-slate-800 text-[11px] font-black text-slate-500 dark:text-slate-400">
                        <th className="p-4 pr-6">نام همکار</th>
                        <th className="p-4">شماره همراه</th>
                        <th className="p-4">سطح دسترسی</th>
                        <th className="p-4">مجموعه تخصیصی</th>
                        <th className="p-4">آخرین ورود</th>
                        <th className="p-4">وضعیت</th>
                        <th className="p-4 pl-6 text-center">عملیات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
                      {filteredMembers.map((member) => (
                        <tr key={member.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                          <td className="p-4 pr-6">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center font-black text-xs shrink-0">
                                {getInitials(member.name)}
                              </div>
                              <span className="font-black text-slate-900 dark:text-white">{member.name}</span>
                            </div>
                          </td>

                          <td className="p-4 dir-ltr text-right font-mono text-slate-600 dark:text-slate-400">
                            {member.mobile || '۰۹۱۲۰۰۰۰۰۰۰'}
                          </td>

                          <td className="p-4">
                            <span className={cn(
                              "px-2.5 py-1 rounded-lg text-[10px] font-black inline-block",
                              member.role === 'مدیر کل' ? "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300" :
                              member.role === 'مدیر پذیرش' ? "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300" :
                              member.role === 'حسابدار' ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300" :
                              "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                            )}>
                              {member.role}
                            </span>
                          </td>

                          <td className="p-4 text-slate-800 dark:text-slate-200">
                            {member.businessName || 'کلیه صنف‌ها'}
                          </td>

                          <td className="p-4 text-slate-400 text-[11px] font-medium">
                            {member.lastActive || 'هم‌اکنون'}
                          </td>

                          <td className="p-4">
                            {member.status === 'Active' ? (
                              <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 text-[10px] font-black px-2.5 py-1 rounded-lg border border-emerald-200/80 dark:border-emerald-900/40">
                                <UserCheck size={12} /> فعال
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 text-[10px] font-black px-2.5 py-1 rounded-lg border border-amber-200/80 dark:border-amber-900/40">
                                <UserX size={12} /> معلق
                              </span>
                            )}
                          </td>

                          <td className="p-4 pl-6 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleToggleMemberStatus(member.id)}
                                title="تغییر وضعیت دسترسی"
                                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors cursor-pointer"
                              >
                                {member.status === 'Active' ? <Lock size={15} /> : <UserCheck size={15} />}
                              </button>

                              <button
                                onClick={() => handleDeleteMember(member.id)}
                                title="حذف همکار"
                                className="p-2 hover:bg-rose-100 dark:hover:bg-rose-950/50 rounded-lg text-rose-600 dark:text-rose-400 transition-colors cursor-pointer"
                              >
                                <Trash2 size={15} />
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

          {/* TAB 3: Registered Businesses */}
          {activeTab === 'businesses' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <Building2 size={22} className="text-blue-600" />
                    <span>صنف‌ها و مجموعه‌های تحت مدیریت شما</span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                    مشاهده هتل‌ها، مجموعه‌های تفریحی و سایر اصناف ثبت شده
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {businesses.map((b) => (
                  <div 
                    key={b.id}
                    className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4 hover:border-blue-300 dark:hover:border-blue-800 transition-all shadow-xs"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                          {b.type === 'Hotel' ? <Hotel size={22} /> : <Ticket size={22} />}
                        </div>
                        <div>
                          <h3 className="text-sm font-black text-slate-900 dark:text-white">{b.name}</h3>
                          <span className="text-[11px] text-slate-500 font-bold block mt-0.5">
                            نوع: {b.type === 'Hotel' ? 'هتل و اقامتگاه' : b.type === 'Entertainment' ? 'تفریحات و سرگرمی' : 'خدماتی'}
                          </span>
                        </div>
                      </div>

                      {b.completionPercentage && b.completionPercentage < 100 ? (
                        <span className="bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400 text-[10px] font-black px-2.5 py-1 rounded-lg border border-amber-200 dark:border-amber-900">
                          نقص پرونده ({b.completionPercentage}٪)
                        </span>
                      ) : (
                        <span className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 text-[10px] font-black px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-900">
                          تایید شده
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium space-y-1 bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl">
                      <p>آدرس: <span className="text-slate-800 dark:text-slate-200 font-bold">{b.address || 'ثبت در سامانه'}</span></p>
                      <p>ظرفیت / واحدها: <span className="text-slate-800 dark:text-slate-200 font-bold">{b.facilityCount || 12} مورد</span></p>
                    </div>

                    {onNavigateToBusiness && (
                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => onNavigateToBusiness(b.id)}
                          className="bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer shadow-sm min-h-[44px]"
                        >
                          <span>ورود به پنل اختصاصی</span>
                          <ChevronLeft size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 4: Security & Active Sessions */}
          {activeTab === 'security' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs">
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck size={22} className="text-blue-600" />
                  <span>امنیت حساب و نشست‌های فعال</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                  مدیریت دستگاه‌های متصل، تاریخچه ورود و احراز پیامکی
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-8 space-y-4 shadow-xs">
                
                <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                      <Laptop size={20} />
                    </div>
                    <div>
                      <h3 className="text-xs font-black text-slate-900 dark:text-white">مرورگر فعلی (این دستگاه)</h3>
                      <p className="text-[11px] text-slate-500 font-mono mt-0.5">IP: 188.253.12.94 • Chrome / Linux • فعال هم‌اکنون</p>
                    </div>
                  </div>

                  <span className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-black px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-900 shrink-0">
                    نشست جاری
                  </span>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center shrink-0">
                      <Smartphone size={20} />
                    </div>
                    <div>
                      <h3 className="text-xs font-black text-slate-900 dark:text-white">اپلیکیشن موبایل مدیریت پارادایس</h3>
                      <p className="text-[11px] text-slate-500 font-mono mt-0.5">Samsung Galaxy S23 • آخرین ورود: ۲ ساعت پیش</p>
                    </div>
                  </div>

                  <button className="text-[11px] text-rose-600 hover:text-rose-700 font-bold cursor-pointer min-h-[44px]">
                    خروج از دستگاه
                  </button>
                </div>

              </div>

            </div>
          )}

        </main>
      </div>

      {/* Add Co-Worker Modal Dialog */}
      {showAddMemberModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Users size={18} className="text-blue-600" />
                <span>افزودن همکار / پرسنل جدید</span>
              </h3>
              <button 
                onClick={() => setShowAddMemberModal(false)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddMemberSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  نام و نام خانوادگی همکار <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={newMemberName}
                  onChange={e => setNewMemberName(e.target.value)}
                  placeholder="مثال: سارا محمدی"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px]"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  شماره همراه (ارسال پیامک دعوت و کد ورود) <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={newMemberMobile}
                  onChange={e => setNewMemberMobile(e.target.value)}
                  placeholder="09120000000"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 dir-ltr text-right min-h-[44px]"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  سطح دسترسی / نقش مسئولیت
                </label>
                <select
                  value={newMemberRole}
                  onChange={e => setNewMemberRole(e.target.value as any)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer min-h-[44px]"
                >
                  <option value="مدیر پذیرش">مدیر پذیرش (ثبت و مدیریت پذیرش/رزروها)</option>
                  <option value="مدیر کل">مدیر کل (دسترسی کامل به تمام بخش‌ها)</option>
                  <option value="حسابدار">حسابدار (مشاهده مالی و تسویه‌ها)</option>
                  <option value="پشتیبان خدمات">پشتیبان خدمات (مدیریت سانس/اتاق/امکانات)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  تخصیص به صنف / مجموعه
                </label>
                <select
                  value={newMemberBusinessId}
                  onChange={e => setNewMemberBusinessId(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer min-h-[44px]"
                >
                  {businesses.map(b => (
                    <option key={b.id} value={b.id}>{b.name} ({b.type === 'Hotel' ? 'هتل' : 'سرگرمی'})</option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddMemberModal(false)}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer min-h-[44px]"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-black text-xs transition-all shadow-md shadow-blue-600/20 cursor-pointer min-h-[44px]"
                >
                  افزودن همکار و ارسال پیامک
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
