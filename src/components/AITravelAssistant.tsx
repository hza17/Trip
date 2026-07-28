import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Sparkles, X, Send, Bot, User, Loader2, PlaneTakeoff, Hotel, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string | React.ReactNode;
}

export function AITravelAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "سلام! من دستیار هوشمند سفر شما هستم (قدرت گرفته از Gemini). چطور می‌تونم برای برنامه‌ریزی سفرتون کمک کنم؟"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), type: "user", content: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let aiContent: React.ReactNode = "";
      
      const lowerInput = userMsg.content.toString().toLowerCase();
      
      if (lowerInput.includes("کیش")) {
         aiContent = (
             <div className="space-y-3">
                 <p>کیش در این فصل آب و هوای عالی داره! بر اساس جستجوهای اخیر و امتیازات کاربران، چند پیشنهاد ویژه برای شما دارم:</p>
                 <div className="bg-white/50 dark:bg-slate-800/50 p-2 rounded-xl border border-blue-500/20 text-xs">
                     <div className="flex items-center gap-2 font-bold mb-1"><Hotel size={14} className="text-blue-500"/> هتل ترنج کیش</div>
                     <p className="text-slate-600 dark:text-slate-400 text-[10px] leading-relaxed">روی آب با منظره بی‌نظیر. مناسب برای ماه عسل و سفرهای رمانتیک.</p>
                 </div>
                 <div className="bg-white/50 dark:bg-slate-800/50 p-2 rounded-xl border border-blue-500/20 text-xs">
                     <div className="flex items-center gap-2 font-bold mb-1"><Hotel size={14} className="text-blue-500"/> هتل داریوش</div>
                     <p className="text-slate-600 dark:text-slate-400 text-[10px] leading-relaxed">معماری هخامنشی مجلل. دسترسی عالی به مراکز خرید و ساحل.</p>
                 </div>
                 <button className="text-blue-600 dark:text-blue-400 font-bold text-xs mt-2 hover:underline">جستجوی پرواز و هتل کیش</button>
             </div>
         )
      } else if (lowerInput.includes("ارزان") || lowerInput.includes("اقتصادی")) {
          aiContent = "برای سفرهای اقتصادی در این زمان، شهرهای **کاشان** و **یزد** رو پیشنهاد می‌کنم. اقامتگاه‌های بوم‌گردی باکیفیت و قیمت مناسبی دارن. مایلید لیستشون رو ببینید؟"
      } else {
         aiContent = "من در حال یادگیری سلیقه شما هستم. می‌تونید از من بخواید تا نظرات کاربران در مورد هتل خاصی رو خلاصه کنم، یا مقصدهای مناسب با بودجه‌تون رو پیشنهاد بدم!";
      }

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: aiContent
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            aria-label="باز کردن دستیار هوشمند سفر"
            aria-expanded="false"
            aria-haspopup="dialog"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 left-6 z-50 p-4 rounded-full bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-500 text-white shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:scale-105 group"
          >
            <Sparkles size={24} className="group-hover:animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-label="پنجره دستیار هوشمند"
            aria-modal="true"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 left-6 w-[340px] h-[500px] z-50 flex flex-col bg-white/70 dark:bg-[#0a0d24]/70 backdrop-blur-2xl border border-white/40 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-blue-600/90 to-indigo-600/90 dark:from-blue-600/50 dark:to-indigo-900/50 backdrop-blur-md flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-black text-sm">دستیار هوشمند</h3>
                  <p className="text-blue-100 text-[10px] font-medium">Powered by Gemini</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="بستن دستیار هوشمند"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide flex flex-col" dir="rtl">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={cn(
                    "flex max-w-[85%] gap-2 animate-in fade-in slide-in-from-bottom-2",
                    msg.type === "user" ? "self-end flex-row-reverse" : "self-start"
                  )}
                >
                  <div className={cn(
                    "w-6 h-6 rounded-full shrink-0 flex items-center justify-center mt-1",
                    msg.type === "user" ? "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400" : "bg-gradient-to-br from-blue-500 to-indigo-500 text-white"
                  )}>
                    {msg.type === "user" ? <User size={12} /> : <Sparkles size={12} />}
                  </div>
                  <div className={cn(
                    "p-3 rounded-2xl text-xs leading-relaxed font-medium",
                    msg.type === "user" 
                      ? "bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 rounded-tr-sm" 
                      : "bg-blue-50 dark:bg-blue-900/20 text-slate-800 dark:text-slate-200 rounded-tl-sm border border-blue-100 dark:border-blue-800/30 shadow-sm"
                  )}>
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                 <div className="flex max-w-[85%] gap-2 self-start animate-in fade-in">
                    <div className="w-6 h-6 rounded-full shrink-0 bg-gradient-to-br from-blue-500 to-indigo-500 text-white flex items-center justify-center mt-1">
                      <Sparkles size={12} />
                    </div>
                    <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/20 rounded-tl-sm border border-blue-100 dark:border-blue-800/30 flex items-center gap-1.5 h-10">
                      <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                      <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                      <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                    </div>
                 </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white/50 dark:bg-[#070913]/50 border-t border-slate-200 dark:border-slate-800 shrink-0">
              <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-1 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="سوال خود را بپرسید..."
                  aria-label="پیام خود را بنویسید"
                  className="flex-1 bg-transparent border-none focus:outline-none text-xs px-3 py-2 text-slate-800 dark:text-slate-200 placeholder:text-slate-400"
                  dir="rtl"
                />
                <button 
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  aria-label="ارسال پیام"
                  className="w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-slate-300 disabled:dark:bg-slate-700 text-white flex items-center justify-center transition-colors shrink-0"
                >
                  <Send size={14} className={cn("ml-0.5", inputValue.trim() ? "translate-x-0" : "-translate-x-0.5")} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
