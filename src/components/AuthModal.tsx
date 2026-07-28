import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { User, Phone, CheckCircle2, ShieldCheck, ArrowRight, UserPlus } from "lucide-react";

export function AuthModal({ onClose }: { onClose: () => void }) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [step, setStep] = useState<'phone' | 'otp' | 'register'>('phone');
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  
  // Registration data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nationalId, setNationalId] = useState("");

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length === 11) {
      setStep('otp');
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length === 5) {
      // Simulate checking if user exists
      if (mode === 'login') {
        // Direct successful login for the user
        localStorage.setItem("user_logged_in", "true");
        localStorage.setItem("user_phone", phoneNumber);
        window.dispatchEvent(new Event("user_state_changed"));
        onClose();
      } else {
        // Move to register step
        setStep('register');
      }
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName && lastName && nationalId.length === 10) {
      localStorage.setItem("user_logged_in", "true");
      localStorage.setItem("user_phone", phoneNumber);
      localStorage.setItem("user_name", `${firstName} ${lastName}`);
      window.dispatchEvent(new Event("user_state_changed"));
      onClose();
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 4) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="space-y-6 py-2">
      {/* Tab Switcher at the very top (Only visible on the initial phone input step) */}
      {step === 'phone' && (
        <div className="flex bg-slate-100 dark:bg-slate-900/50 p-1.5 rounded-2xl border border-slate-200/40 dark:border-slate-800/60 shadow-sm mb-2">
          <button
            type="button"
            onClick={() => { setMode('login'); }}
            className={cn(
              "flex-1 py-3 text-xs font-black rounded-xl transition-all duration-200 cursor-pointer text-center",
              mode === 'login'
                ? "bg-white dark:bg-slate-950 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
            )}
          >
            ورود به حساب کاربری
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); }}
            className={cn(
              "flex-1 py-3 text-xs font-black rounded-xl transition-all duration-200 cursor-pointer text-center",
              mode === 'register'
                ? "bg-white dark:bg-slate-950 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
            )}
          >
            ثبت‌نام و عضویت جدید
          </button>
        </div>
      )}

      {step === 'phone' && (
        <form onSubmit={handlePhoneSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-center space-y-3">
            <div className="mx-auto w-12 h-12 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 rounded-2xl flex items-center justify-center mb-2 shadow-sm">
                {mode === 'login' ? (
                  <User size={24} className="text-blue-600 dark:text-blue-400" />
                ) : (
                  <UserPlus size={24} className="text-blue-600 dark:text-blue-400" />
                )}
            </div>
            <h3 className="text-xl font-black text-slate-950 dark:text-white">
              {mode === 'login' ? "خوش آمدید" : "ایجاد حساب کاربری"}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">
              {mode === 'login' 
                ? "برای ورود به پنل کاربری، شماره موبایل خود را وارد کنید." 
                : "جهت عضویت در سامانه گردشگری پارادایس شماره همراه خود را وارد کنید."}
            </p>
          </div>
          <div>
            <div className="relative">
                <Phone size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input 
                  type="tel" 
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹" 
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full border border-slate-200/50 dark:border-slate-700/50 p-4 pl-12 rounded-2xl text-center font-mono text-lg outline-none tracking-widest bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-inner" 
                  autoFocus
                  maxLength={11}
                  dir="ltr"
                />
            </div>
          </div>
          <button 
            type="submit" 
            disabled={phoneNumber.length !== 11}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black disabled:opacity-50 transition-all shadow-lg hover:shadow-xl hover:shadow-blue-600/20 disabled:shadow-none transform hover:-translate-y-0.5 disabled:hover:translate-y-0 cursor-pointer"
          >
            {mode === 'login' ? "ورود به حساب کاربری" : "تایید شماره و عضویت"}
          </button>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center font-medium leading-relaxed flex items-center justify-center gap-1.5">
            <ShieldCheck size={14} className="text-blue-600 dark:text-blue-400" />
            با {mode === 'login' ? 'ورود' : 'ثبت‌نام'} شما <a href="#" className="text-slate-950 dark:text-white font-bold hover:underline">قوانین و مقررات</a> را می‌پذیرید.
          </p>
        </form>
      )}

      {step === 'otp' && (
        <form onSubmit={handleOtpSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
          <div className="text-center space-y-3">
            <div className="mx-auto w-12 h-12 bg-blue-50/50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50 rounded-2xl flex items-center justify-center mb-2 text-blue-600 dark:text-blue-400 shadow-sm">
                <CheckCircle2 size={24} />
            </div>
            <h3 className="text-xl font-black text-slate-950 dark:text-white">تایید شماره موبایل</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold flex flex-col items-center gap-2">
              <span>کد پیامک شده به <span className="font-mono text-slate-950 dark:text-white px-1">{phoneNumber}</span> را وارد کنید.</span>
              <button type="button" onClick={() => setStep('phone')} className="text-[10px] text-blue-600 dark:text-blue-400 font-black hover:underline flex items-center gap-1 cursor-pointer">
                <ArrowRight size={10} /> ویرایش شماره
              </button>
            </p>
          </div>
          
          <div className="flex justify-center gap-3" dir="ltr">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                className="w-12 h-14 border border-slate-200/50 dark:border-slate-700/50 rounded-xl text-center font-mono text-xl font-black outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-slate-50/50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white transition-all shadow-inner"
              />
            ))}
          </div>

          <button 
            type="submit" 
            disabled={otp.join("").length !== 5}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black disabled:opacity-50 transition-all shadow-lg hover:shadow-xl hover:shadow-blue-600/20 disabled:shadow-none transform hover:-translate-y-0.5 disabled:hover:translate-y-0 cursor-pointer"
          >
            تایید کد
          </button>
          
          <div className="text-center bg-slate-50/50 dark:bg-slate-900/50 py-2 rounded-xl border border-slate-100/50 dark:border-slate-800/50">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-bold font-mono">ارسال مجدد کد تا ۱:۵۹</span>
          </div>
        </form>
      )}

      {step === 'register' && (
        <form onSubmit={handleRegisterSubmit} className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-center space-y-2 mb-4">
            <h3 className="text-xl font-black text-slate-950 dark:text-white">تکمیل اطلاعات کاربری</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold leading-relaxed">لطفاً اطلاعات خود را جهت صدور واچر وارد کنید.</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-500 dark:text-slate-400 font-bold block mb-2">نام (فارسی)</label>
              <input 
                type="text" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border border-slate-200/50 dark:border-slate-700/50 p-3.5 rounded-2xl text-sm outline-none font-bold bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-inner" 
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 dark:text-slate-400 font-bold block mb-2">نام خانوادگی</label>
              <input 
                type="text" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border border-slate-200/50 dark:border-slate-700/50 p-3.5 rounded-2xl text-sm outline-none font-bold bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-inner" 
              />
            </div>
          </div>
          
          <div>
            <label className="text-xs text-slate-500 dark:text-slate-400 font-bold block mb-2">کد ملی (۱۰ رقم)</label>
            <input 
              type="text" 
              maxLength={10}
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
              className="w-full border border-slate-200/50 dark:border-slate-700/50 p-3.5 rounded-2xl text-center font-mono text-sm outline-none bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 tracking-widest transition-all shadow-inner" 
              dir="ltr"
            />
          </div>

          <button 
            type="submit" 
            disabled={!firstName || !lastName || nationalId.length !== 10}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black disabled:opacity-50 transition-all shadow-lg hover:shadow-xl hover:shadow-blue-600/20 disabled:shadow-none transform hover:-translate-y-0.5 disabled:hover:translate-y-0 mt-4 cursor-pointer"
          >
            ثبت‌نام و ورود
          </button>
        </form>
      )}
    </div>
  );
}
