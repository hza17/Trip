import React, { useState } from 'react';
import { X, CalendarDays, Users, Check, MapPin, Compass, Clock, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export interface ServiceInfo {
  id: string;
  title: string;
  category: string;
  location?: string;
  image: string;
  pricePerPerson: number;
}

interface BookingModalProps {
  service: ServiceInfo;
  onClose: () => void;
  onSuccess: (details: { dateStr: string; timeLabel: string; guests: number; totalCost: number }) => void;
}

export function BookingModal({ service, onClose, onSuccess }: BookingModalProps) {
  const [bookingDate, setBookingDate] = useState("۱۴۰۵/۰۴/۲۸");
  const [bookingTime, setBookingTime] = useState("۱۶:۰۰ الی ۲۰:۰۰ (سانس عصر)");
  const [bookingGuests, setBookingGuests] = useState(2);
  const [isReservation, setIsReservation] = useState(true);

  const totalCost = isReservation ? service.pricePerPerson * bookingGuests : service.pricePerPerson * bookingGuests * 0.9;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/40 dark:bg-slate-950/80 backdrop-blur-sm overflow-y-auto" dir="rtl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-lg shadow-2xl overflow-hidden flex flex-col border border-slate-100 dark:border-slate-800 my-auto max-h-[calc(100vh-2rem)]"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 shrink-0">
            <h2 className="font-black text-base text-slate-950 dark:text-white flex items-center gap-2">
              <Compass size={18} className="text-amber-500" />
              رزرو و تهیه بلیت
            </h2>
            <button 
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-950 dark:hover:text-white transition font-bold"
            >
              <X size={16} />
            </button>
          </div>
          
          <div className="p-6 space-y-6 overflow-y-auto flex-1 custom-scrollbar text-right" dir="rtl">
            {/* Service Summary */}
            <div className="bg-amber-50/50 dark:bg-amber-950/10 border border-amber-200/50 dark:border-amber-900/30 rounded-3xl p-4 flex gap-4">
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-20 h-20 rounded-2xl object-cover shrink-0 shadow-sm border border-amber-200/50 dark:border-amber-900/50"
              />
              <div className="flex flex-col justify-center">
                <span className="text-[10px] font-black bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 px-2 py-1 rounded-lg w-fit mb-1.5">
                  {service.category}
                </span>
                <h4 className="font-black text-slate-950 dark:text-white text-sm leading-snug">
                  {service.title}
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold mt-1.5 flex items-center gap-1">
                  <MapPin size={12} className="text-amber-500" />
                  {service.location || 'تهران'}
                </p>
              </div>
            </div>

            {/* Booking Mode Selector */}
            <div className="space-y-2.5">
              <label className="text-xs font-black text-slate-800 dark:text-slate-300 block">نحوه و شرایط مراجعه:</label>
              <div className="grid grid-cols-2 gap-2 bg-slate-50 dark:bg-slate-950/50 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-850">
                <button
                  type="button"
                  onClick={() => setIsReservation(true)}
                  className={cn(
                    "py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5",
                    isReservation 
                      ? "bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-sm"
                      : "text-slate-400 dark:text-slate-500 hover:text-slate-700"
                  )}
                >
                  <CalendarDays size={14} />
                  با رزرو زمان مشخص
                </button>
                <button
                  type="button"
                  onClick={() => setIsReservation(false)}
                  className={cn(
                    "py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5",
                    !isReservation 
                      ? "bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-sm"
                      : "text-slate-400 dark:text-slate-500 hover:text-slate-700"
                  )}
                >
                  <Check size={14} />
                  بدون رزرو (Open Ticket)
                </button>
              </div>
            </div>

            {isReservation && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-4"
              >
                <div>
                  <label className="text-xs font-black text-slate-800 dark:text-slate-300 block mb-2.5">انتخاب تاریخ:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["۱۴۰۵/۰۴/۲۸", "۱۴۰۵/۰۴/۲۹", "۱۴۰۵/۰۴/۳۰"].map((date) => (
                      <button
                        key={date}
                        onClick={() => setBookingDate(date)}
                        className={cn(
                          "py-3 rounded-2xl text-[11px] font-black transition-all border",
                          bookingDate === date 
                            ? "bg-amber-50 dark:bg-amber-500/10 border-amber-500 text-amber-700 dark:text-amber-400"
                            : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-amber-300"
                        )}
                      >
                        {date}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black text-slate-800 dark:text-slate-300 block mb-2.5">انتخاب سانس:</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {["۰۸:۰۰ الی ۱۲:۰۰ (سانس صبح)", "۱۲:۰۰ الی ۱۶:۰۰ (سانس ظهر)", "۱۶:۰۰ الی ۲۰:۰۰ (سانس عصر)", "۲۰:۰۰ الی ۲۴:۰۰ (سانس شب)"].map((time) => (
                      <button
                        key={time}
                        onClick={() => setBookingTime(time)}
                        className={cn(
                          "py-3 px-3 rounded-2xl text-[11px] font-black transition-all border flex items-center gap-2",
                          bookingTime === time 
                            ? "bg-amber-50 dark:bg-amber-500/10 border-amber-500 text-amber-700 dark:text-amber-400"
                            : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-amber-300"
                        )}
                      >
                        <Clock size={13} className={bookingTime === time ? "text-amber-500" : "text-slate-400"} />
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {!isReservation && (
              <div className="bg-blue-50/50 dark:bg-blue-900/10 p-4 rounded-2xl border border-blue-100 dark:border-blue-800/30 flex items-start gap-3">
                <Info size={16} className="text-blue-500 shrink-0 mt-0.5" />
                <p className="text-[11px] text-blue-700 dark:text-blue-300 font-bold leading-relaxed">
                  بلیت‌های Open Ticket به مدت ۳۰ روز از تاریخ خرید اعتبار دارند و با ۱۰٪ تخفیف ارائه می‌شوند. اولویت پذیرش با مراجعینی است که رزرو قبلی دارند.
                </p>
              </div>
            )}

            <div>
              <label className="text-xs font-black text-slate-800 dark:text-slate-300 block mb-2.5">تعداد نفرات:</label>
              <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900/60 w-fit p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
                <button 
                  onClick={() => setBookingGuests(Math.max(1, bookingGuests - 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-sm border border-slate-100 dark:border-slate-700 hover:bg-slate-50 transition"
                >
                  -
                </button>
                <div className="w-12 text-center font-black text-sm text-slate-900 dark:text-white flex items-center justify-center gap-1.5">
                  <Users size={14} className="text-amber-500" />
                  {bookingGuests}
                </div>
                <button 
                  onClick={() => setBookingGuests(bookingGuests + 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-sm border border-slate-100 dark:border-slate-700 hover:bg-slate-50 transition"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 shrink-0">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-black text-slate-500 dark:text-slate-400">مبلغ کل قابل پرداخت:</span>
              <div className="text-left">
                {!isReservation && (
                  <span className="block text-[10px] text-slate-400 line-through mb-0.5">
                    {(service.pricePerPerson * bookingGuests).toLocaleString()}
                  </span>
                )}
                <span className="text-amber-600 dark:text-amber-400 font-black text-xl font-sans tracking-tight leading-none block">
                  {totalCost.toLocaleString()} <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 font-sans tracking-normal">تومان</span>
                </span>
              </div>
            </div>
            <button 
              onClick={() => {
                onSuccess({
                  dateStr: isReservation ? bookingDate : "Open Ticket (۳۰ روز)",
                  timeLabel: isReservation ? bookingTime : "تمام سانس‌ها",
                  guests: bookingGuests,
                  totalCost: totalCost
                });
              }}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-amber-500/20 active:scale-95 transition-all text-sm flex items-center justify-center gap-2"
            >
              تایید رزرو و صدور بلیت
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
