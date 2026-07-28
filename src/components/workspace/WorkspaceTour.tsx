import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const TOUR_STEPS = [
  {
    target: '[data-tour="dash-brand-banner"]',
    title: 'پیشخوان اختصاصی صنف شما',
    content: 'به محض اتمام ثبت‌نام، این پنل کاملاً اختصاصی با نام صنف شما شخصی‌سازی می‌شود و سیستم مانیتورینگ لایو فضاها در بستر پارادایس فعال می‌گردد.',
    placement: 'bottom'
  },
  {
    target: '[data-tour="dash-tab-spaces"]',
    title: 'تب مانیتورینگ لایو فضاها',
    content: 'در این تب می‌توانید وضعیت لحظه‌ای ظرفیت فیزیکی مجموعه (اتاق‌ها، میزها یا سانس‌ها) را مانیتور کنید.',
    placement: 'bottom'
  },
  {
    target: '[data-tour="dash-spaces-grid"]',
    title: 'تغییر لایو وضعیت با کلیک',
    content: 'با کلیک روی دکمه «تغییر وضعیت» در هر کارت، می‌توانید وضعیت را به صورت آنلاین بین سه حالت آزاد، اشغال و نیاز به نظافت جابجا و شبیه‌سازی کنید.',
    placement: 'top'
  },
  {
    target: '[data-tour="dash-tab-bookings"]',
    title: 'تب دفترچه رزرواسیون',
    content: 'از این قسمت به کل تاریخچه واچرها و رزروها دسترسی دارید و تب‌ها به طور خودکار جابجا می‌شوند.',
    placement: 'bottom'
  },
  {
    target: '[data-tour="dash-booking-form"]',
    title: 'صدور دستی واچر رزرو سریع',
    content: 'در این بخش می‌توانید با وارد کردن نام میهمان و انتخاب واحد، یک واچر رزرو لایو را ثبت و صادر کنید.',
    placement: 'top'
  },
  {
    target: '[data-tour="dash-bookings-table"]',
    title: 'لیست رزروهای صادر شده صنف',
    content: 'جدول کامل مشخصات میهمانان پذیرش‌شده در اینجا قرار دارد. همچنین امکان لغو رزروها برای کنترل ظرفیت فراهم است.',
    placement: 'top'
  },
  {
    target: '[data-tour="dash-tab-settings"]',
    title: 'تنظیمات ظرفیت فیزیکی',
    content: 'با استفاده از تب تنظیمات، می‌توانید گنجایش صنف و نام تجاری شعبه را ویرایش و ذخیره کنید.',
    placement: 'bottom'
  },
  {
    target: '[data-tour="dash-btn-logout"]',
    title: 'راهنمای تعاملی و خروج',
    content: 'در پایان، می‌توانید هر زمان مایل بودید تور راهنما را مجدداً آغاز کنید یا خارج شوید. از همراهی شما در این مسیر سپاسگزاریم!',
    placement: 'top'
  }
];

interface WorkspaceTourProps {
  active?: boolean;
}

export function WorkspaceTour({ active = false }: WorkspaceTourProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  const updateRect = useCallback(() => {
    if (!isOpen) return;
    const currentStepObj = TOUR_STEPS[step];
    if (!currentStepObj) return;

    const targetEl = document.querySelector(currentStepObj.target);
    if (targetEl) {
      const rect = targetEl.getBoundingClientRect();
      setTargetRect(rect);
      
      // Scroll into view if needed
      if (rect.top < 100 || rect.bottom > window.innerHeight - 100) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
          setTargetRect(targetEl.getBoundingClientRect());
        }, 300);
      }
    } else {
      // Element not found in current view (e.g. on another screen or tab)
      setTargetRect(null);
    }
  }, [isOpen, step]);

  // Force close when active becomes false
  useEffect(() => {
    if (!active) {
      setIsOpen(false);
    }
  }, [active]);

  // Auto-switch tabs in dashboard depending on the target element
  useEffect(() => {
    if (!isOpen) return;
    const currentStepObj = TOUR_STEPS[step];
    if (!currentStepObj) return;

    if (currentStepObj.target === '[data-tour="dash-spaces-grid"]') {
      const tabBtn = document.querySelector('[data-tour="dash-tab-spaces"]') as HTMLButtonElement;
      if (tabBtn) tabBtn.click();
    } else if (
      currentStepObj.target === '[data-tour="dash-booking-form"]' || 
      currentStepObj.target === '[data-tour="dash-bookings-table"]'
    ) {
      const tabBtn = document.querySelector('[data-tour="dash-tab-bookings"]') as HTMLButtonElement;
      if (tabBtn) tabBtn.click();
    } else if (currentStepObj.target === '[data-tour="dash-tab-settings"]') {
      const tabBtn = document.querySelector('[data-tour="dash-tab-settings"]') as HTMLButtonElement;
      if (tabBtn) tabBtn.click();
    }
  }, [step, isOpen]);

  // Check if tour should auto-start on mount (first time)
  useEffect(() => {
    if (!active) return;
    const hasSeenTour = localStorage.getItem('hasSeenWorkspaceOnboardingTour');
    if (!hasSeenTour) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [active]);

  // Listen to external triggers to restart the tour
  useEffect(() => {
    const handleTrigger = () => {
      setStep(0);
      setIsOpen(true);
    };
    window.addEventListener('triggerWorkspaceTour', handleTrigger);
    return () => {
      window.removeEventListener('triggerWorkspaceTour', handleTrigger);
    };
  }, []);

  // Update spotlight rect when step changes or resize/scroll occurs
  useEffect(() => {
    if (isOpen) {
      // Short delay to allow tabs to switch and render
      const timer = setTimeout(() => {
        updateRect();
      }, 200);

      window.addEventListener('resize', updateRect);
      window.addEventListener('scroll', updateRect, true);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', updateRect);
        window.removeEventListener('scroll', updateRect, true);
      };
    }
  }, [isOpen, step, updateRect]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenWorkspaceOnboardingTour', 'true');
  };

  const handleNext = () => {
    if (step < TOUR_STEPS.length - 1) {
      setStep(step + 1);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  if (!isOpen) return null;

  const currentStepData = TOUR_STEPS[step];

  return (
    <div className="fixed inset-0 z-[100] pointer-events-auto" dir="rtl">
      {/* SVG Mask Background for Spotlight Cutout */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-300">
        <defs>
          <mask id="spotlight-mask-onboarding">
            <rect width="100%" height="100%" fill="white" />
            {targetRect && (
              <rect 
                x={targetRect.left - 10} 
                y={targetRect.top - 10} 
                width={targetRect.width + 20} 
                height={targetRect.height + 20} 
                fill="black" 
                rx="16"
              />
            )}
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="rgba(7, 9, 20, 0.75)" mask="url(#spotlight-mask-onboarding)" />
      </svg>

      {/* Spotlight Border Accent */}
      {targetRect && (
        <div 
          className="absolute border-2 border-blue-500 rounded-[16px] transition-all duration-300 shadow-[0_0_0_8px_rgba(59,130,246,0.25)] pointer-events-none animate-pulse"
          style={{
            top: targetRect.top - 10,
            left: targetRect.left - 10,
            width: targetRect.width + 20,
            height: targetRect.height + 20
          }}
        />
      )}

      {/* Tooltip Card Overlay */}
      <div 
        className="absolute w-80 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 transition-all duration-300 z-[101]"
        style={targetRect ? {
          top: currentStepData.placement === 'bottom' 
            ? Math.min(window.innerHeight - 260, targetRect.bottom + 20)
            : Math.max(20, targetRect.top - 240),
          left: Math.max(20, Math.min(window.innerWidth - 340, targetRect.left + (targetRect.width / 2) - 160))
        } : {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <Sparkles size={16} className="animate-spin-slow" />
            </div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white">
              {currentStepData.title}
            </h3>
          </div>
          <button onClick={handleClose} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer">
            <X size={16} />
          </button>
        </div>
        
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-6 leading-relaxed font-semibold">
          {currentStepData.content}
        </p>
        
        <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/60 pt-4">
          <div className="text-[10px] font-black text-slate-400">
            مرحله {step + 1} از {TOUR_STEPS.length}
          </div>
          <div className="flex gap-2">
            {step > 0 && (
              <button 
                onClick={handlePrev}
                className="bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-0.5 border border-slate-200/40 dark:border-slate-700 cursor-pointer"
              >
                <ChevronRight size={14} />
                قبلی
              </button>
            )}
            <button 
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-0.5 shadow-lg shadow-blue-500/20 cursor-pointer"
            >
              {step === TOUR_STEPS.length - 1 ? 'پایان' : 'بعدی'}
              {step < TOUR_STEPS.length - 1 && <ChevronLeft size={14} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
