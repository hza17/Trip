import React, { useState } from 'react';
import { X, ArrowLeft, ArrowRight, Building2, Upload, MapPin, CheckCircle2, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HotelRegistrationWizardProps {
  onClose: (completionPercentage?: number) => void;
}

export function HotelRegistrationWizard({ onClose }: HotelRegistrationWizardProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (finalStep: boolean) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // If they complete up to step 2 and choose to finish, it's ~70%
      // If they complete step 3, it's 100%
      onClose(finalStep ? 100 : 70);
    }, 1000);
  };

  return (
    <div className="w-full text-right" dir="rtl">
      {/* Wizard Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">تکمیل پرونده اقامتگاه</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-bold">
          جهت فعال‌سازی کامل حساب و شروع دریافت رزرو، اطلاعات زیر را تکمیل نمایید.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute left-0 right-0 top-1/2 h-1 bg-slate-100 dark:bg-slate-800 -translate-y-1/2 z-0 rounded-full"></div>
        <div 
          className="absolute right-0 top-1/2 h-1 bg-blue-500 -translate-y-1/2 z-0 rounded-full transition-all duration-500"
          style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
        ></div>

        <div className={cn("relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-4 transition-colors", step >= 1 ? "bg-blue-600 border-blue-100 dark:border-blue-900/50 text-white" : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400")}>۱</div>
        <div className={cn("relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-4 transition-colors", step >= 2 ? "bg-blue-600 border-blue-100 dark:border-blue-900/50 text-white" : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400")}>۲</div>
        <div className={cn("relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-4 transition-colors", step >= 3 ? "bg-blue-600 border-blue-100 dark:border-blue-900/50 text-white" : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400")}>۳</div>
      </div>
      
      <div className="flex justify-between text-xs font-bold text-slate-500 mb-8 px-2">
        <span>اطلاعات پایه</span>
        <span className="translate-x-3">امکانات و تصاویر</span>
        <span>مدارک (اختیاری در این مرحله)</span>
      </div>

      {/* Step Content */}
      <div className="min-h-[300px]">
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <h3 className="text-lg font-black text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-4">
              <Building2 size={18} className="text-blue-500" />
              اطلاعات پایه اقامتگاه
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">نام اقامتگاه / هتل</label>
                <input type="text" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="مثال: هتل پارسیان" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">نوع اقامتگاه</label>
                <select className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                  <option>هتل</option>
                  <option>اقامتگاه بوم‌گردی</option>
                  <option>هتل آپارتمان</option>
                  <option>ویلا</option>
                </select>
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">آدرس دقیق</label>
                <textarea className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all h-24" placeholder="آدرس کامل را وارد کنید..." />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <h3 className="text-lg font-black text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-4">
              <MapPin size={18} className="text-blue-500" />
              امکانات و تصاویر
            </h3>
            
            <div className="p-8 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors cursor-pointer mb-6">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-3">
                <Upload size={24} />
              </div>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">آپلود تصاویر اقامتگاه</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">تصاویر با کیفیت از نما، لابی و اتاق‌ها (حداکثر ۱۰ تصویر)</p>
            </div>

            <div className="space-y-2">
               <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">امکانات اصلی (انتخاب کنید)</label>
               <div className="flex flex-wrap gap-2">
                 {['وای‌فای رایگان', 'پارکینگ', 'رستوران', 'استخر', 'باشگاه بدنسازی', 'خدمات اتاق ۲۴ ساعته'].map((item) => (
                   <button key={item} className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors cursor-pointer">
                     {item}
                   </button>
                 ))}
               </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-2xl p-4 flex gap-3 mb-6">
              <ShieldAlert size={20} className="text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-sm font-black text-amber-900 dark:text-amber-400">بارگذاری مدارک (اختیاری در این مرحله)</h4>
                <p className="text-xs font-bold text-amber-700/80 dark:text-amber-500/80 leading-relaxed">
                  شما می‌توانید ثبت‌نام اولیه را هم‌اکنون به پایان برسانید تا پرونده شما جهت تایید اولیه به جریان بیفتد. بارگذاری مدارک را می‌توانید بعداً از طریق پنل کاربری تکمیل کنید (نقص پرونده).
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { title: 'تصویر کارت ملی مدیرعامل / مالک', desc: 'فرمت JPG یا PNG' },
                { title: 'پروانه بهره‌برداری / مجوز فعالیت', desc: 'مجوز رسمی از وزارت گردشگری' },
                { title: 'تصویر روزنامه رسمی (اشخاص حقوقی)', desc: 'شامل آخرین تغییرات' }
              ].map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl">
                  <div>
                    <div className="text-xs font-black text-slate-800 dark:text-slate-200">{doc.title}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{doc.desc}</div>
                  </div>
                  <button className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">
                    انتخاب فایل
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={step === 1 ? () => onClose() : handleBack}
          className="px-5 py-2.5 rounded-xl text-xs font-black text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <ArrowRight size={16} />
          {step === 1 ? 'انصراف' : 'مرحله قبل'}
        </button>

        <div className="flex items-center gap-3">
          {step === 3 && (
            <button
              onClick={() => handleSubmit(false)}
              disabled={loading}
              className="px-5 py-2.5 rounded-xl text-xs font-black bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              ثبت‌نام اولیه و تکمیل مدارک در آینده
            </button>
          )}
          
          <button
            onClick={step === 3 ? () => handleSubmit(true) : handleNext}
            disabled={loading}
            className="px-6 py-2.5 rounded-xl text-xs font-black bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 flex items-center gap-2 cursor-pointer"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
            ) : (
              <>
                {step === 3 ? 'تکمیل نهایی پرونده' : 'مرحله بعدی'}
                {step !== 3 && <ArrowLeft size={16} />}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
