import React, { useState, useEffect, useRef } from 'react';
import { Bell, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  { id: '1', title: 'درخواست تایید کسب‌وکار', message: 'اطلاعات "رستوران بام پارادایس" نیاز به تایید شما دارد.', type: 'warning', time: '10 دقیقه پیش', read: false },
  { id: '2', title: 'بروزرسانی سیستم', message: 'ماژول رزرو آنلاین با امکانات جدید بروزرسانی شد.', type: 'info', time: '2 ساعت پیش', read: false },
  { id: '3', title: 'شعبه جدید فعال شد', message: 'شعبه "هتل کوهستان" با موفقیت راه‌اندازی و در دسترس قرار گرفت.', type: 'success', time: 'دیروز', read: true },
  { id: '4', title: 'هشدار ظرفیت', message: 'ظرفیت اتاق‌های خالی در شعبه مرکزی رو به اتمام است.', type: 'warning', time: 'دیروز', read: true }
];

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-950"></span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-12 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl z-50 overflow-hidden"
          >
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
              <h3 className="font-bold text-slate-900 dark:text-white">اعلان‌ها</h3>
              {unreadCount > 0 && (
                <button 
                  onClick={markAllAsRead}
                  className="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline"
                >
                  تیک‌زدن همه به عنوان خوانده شده
                </button>
              )}
            </div>

            <div className="max-h-[400px] overflow-y-auto">
              {notifications.length > 0 ? (
                <div className="flex flex-col">
                  {notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={cn(
                        "p-4 border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors relative group",
                        !notification.read && "bg-blue-50/50 dark:bg-blue-900/10"
                      )}
                    >
                      <div className="flex gap-3">
                        <div className="shrink-0 mt-0.5">
                          {notification.type === 'success' && <CheckCircle size={18} className="text-emerald-500" />}
                          {notification.type === 'warning' && <AlertTriangle size={18} className="text-amber-500" />}
                          {notification.type === 'info' && <Info size={18} className="text-blue-500" />}
                        </div>
                        <div className="flex-1 pr-1">
                          <h4 className={cn("text-sm font-bold mb-1", !notification.read ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300")}>
                            {notification.title}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-2">
                            {notification.message}
                          </p>
                          <span className="text-[10px] text-slate-400 font-medium">{notification.time}</span>
                        </div>
                        <button 
                          onClick={(e) => removeNotification(notification.id, e)}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 dark:hover:text-slate-200 opacity-0 group-hover:opacity-100 transition-all shrink-0"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center flex flex-col items-center justify-center text-slate-500">
                  <Bell size={32} className="text-slate-300 dark:text-slate-600 mb-3" />
                  <p className="text-sm">هیچ اعلانی وجود ندارد.</p>
                </div>
              )}
            </div>
            <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-center">
              <button className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors">
                مشاهده همه اعلان‌ها
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
