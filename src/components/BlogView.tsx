import { 
  ArrowRight, 
  Calendar, 
  User, 
  Clock, 
  Share2, 
  Bookmark, 
  MessageSquare, 
  ChevronLeft, 
  Heart, 
  MapPin, 
  CheckCircle, 
  HelpCircle, 
  Sparkles, 
  Send,
  Info
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface BlogViewProps {
  onBack: () => void;
}

export function BlogView({ onBack }: BlogViewProps) {
  const [likes, setLikes] = useState(148);
  const [hasLiked, setHasLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "سارا احمدی",
      date: "۲ روز پیش",
      avatar: "س",
      text: "مطلب فوق‌العاده جامع و مفیدی بود. من قصد سفر خانوادگی به کویر مرنجاب را در بهمن ماه دارم. آیا وضعیت کاروانسرای شاه‌عباسی برای اقامت شبانه مناسب و امن است؟",
      replies: [
        {
          id: 101,
          author: "مهران پارسا (نویسنده)",
          date: "۱ روز پیش",
          avatar: "م",
          isAuthor: true,
          text: "سلام سارا جان. بله کاروانسرای مرنجاب پس از بازسازی‌های اخیر به یکی از اقامتگاه‌های بوم‌گردی بسیار مجهز و امن منطقه تبدیل شده است. امنیت پاسگاه محیط‌بانی اطراف هم تضمین‌شده است؛ با این حال پیشنهاد می‌کنم رزرو خود را حتماً از ۲ هفته قبل قطعی فرمایید."
        }
      ]
    },
    {
      id: 2,
      author: "پوریا حمیدی",
      date: "۴ روز پیش",
      avatar: "پ",
      text: "عکاسی از دره مجسمه‌های هرمز واقعاً شگفت‌انگیز است. مرسی از این راهنمای بی‌نظیر. عکس‌های النگدره هم محشر بودند.",
      replies: []
    }
  ]);
  const [newCommentText, setNewCommentText] = useState("");

  const handleLike = () => {
    if (hasLiked) {
      setLikes(p => p - 1);
      setHasLiked(false);
    } else {
      setLikes(p => p + 1);
      setHasLiked(true);
    }
  };

  const handleAddComment = () => {
    if (!newCommentText.trim()) return;
    const newComment = {
      id: Date.now(),
      author: "علیرضا مرادی (شما)",
      date: "هم‌اکنون",
      avatar: "ع",
      text: newCommentText,
      replies: []
    };
    setComments([newComment, ...comments]);
    setNewCommentText("");
    showToast("دیدگاه شما با موفقیت ثبت گردید.");
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast("لینک مقاله با موفقیت در حافظه کپی شد!");
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 animate-in fade-in duration-700">
      
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2 bg-blue-50/90 dark:bg-blue-950/90 backdrop-blur-md p-4 rounded-2xl border border-blue-100/50 dark:border-blue-900/50 shadow-xl animate-in fade-in slide-in-from-top-4">
          <Info size={14} className="shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation and Actions Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-all group bg-white dark:bg-slate-900 px-4 py-2 rounded-xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm hover:shadow-md w-max"
        >
          <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
          <span>بازگشت به هوم‌پیج</span>
        </button>

        <div className="flex items-center gap-2">
          <button 
            onClick={handleLike}
            className={cn(
              "h-10 px-4 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all shadow-sm",
              hasLiked 
                ? "bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950/30 dark:border-rose-900/50" 
                : "bg-white dark:bg-slate-900 border-slate-200/50 dark:border-slate-800/50 text-slate-500 hover:text-rose-500"
            )}
          >
            <Heart size={16} fill={hasLiked ? "currentColor" : "none"} />
            <span>{likes} پسندیدن</span>
          </button>
          
          <button 
            onClick={() => setBookmarked(!bookmarked)}
            className={cn(
              "w-10 h-10 rounded-xl border flex items-center justify-center transition-all shadow-sm",
              bookmarked 
                ? "bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-950/30 dark:border-blue-900/50" 
                : "bg-white dark:bg-slate-900 border-slate-200/50 dark:border-slate-800/50 text-slate-500 hover:text-blue-600"
            )}
            title="ذخیره مقاله"
          >
            <Bookmark size={16} fill={bookmarked ? "currentColor" : "none"} />
          </button>

          <button 
            className="w-10 h-10 rounded-xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center text-slate-500 hover:text-blue-600 transition-all"
            title="اشتراک‌گذاری"
            onClick={handleShare}
          >
            <Share2 size={16} />
          </button>
        </div>
      </div>

      {/* Main Column */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        
        {/* Right Sidebar: Table of Contents & Info Block (Editorial-style) */}
        <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-8 self-start">
          
          {/* Article Meta Panel */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-5 space-y-4 shadow-sm">
            <span className="bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border border-blue-100/50 dark:border-blue-800/40 px-3 py-1 rounded-full text-[10px] font-black tracking-wide inline-block">
              راهنمای سفر ویژه
            </span>
            <div className="text-xs text-slate-400 dark:text-slate-500 space-y-2.5 font-bold">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-blue-500" />
                <span>۷ دقیقه زمان مطالعه</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-blue-500" />
                <span>انتشار: ۲۴ دی ۱۴۰۵</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={14} className="text-blue-500" />
                <span>نویسنده: مهران پارسا</span>
              </div>
            </div>
          </div>

          {/* Table of Contents Box */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-5 shadow-sm">
            <h4 className="font-black text-slate-900 dark:text-white text-sm mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
              فهرست عناوین مطالب
            </h4>
            <nav className="space-y-3">
              {[
                { label: "۱. جنگل‌های هیرکانی هرمز", id: "#hircanian" },
                { label: "۲. کویر طلایی مرنجاب", id: "#maranjab" },
                { label: "۳. جزیره جادویی هرمز", id: "#hormuz" },
                { label: "نکات ویژه سفر گروهی", id: "#tips" },
                { label: "سوالات متداول (FAQ)", id: "#faq" },
                { label: "بخش دیدگاه‌های مسافران", id: "#comments" }
              ].map((item, idx) => (
                <a 
                  key={idx}
                  href={item.id}
                  className="block text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors pr-2 border-r-2 border-transparent hover:border-blue-600"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

        </div>

        {/* Content Column - Spans 3 Columns */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Article Header */}
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-[1.3] tracking-tight">
              راهنمای جامع سفر به جزیره جادویی هرمز در زمستان؛ سرزمین رویایی خاک‌های سرخ و نقره‌ای
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-bold leading-relaxed">
              کشف اسرار‌آمیزترین جزیره زمین‌شناسی خاورمیانه در دل آب‌های فیروزه‌ای خلیج همیشه فارس با معرفی جاذبه‌ها، هتل‌ها و بوم‌گردی‌های خاص.
            </p>
          </div>

          {/* Featured Hero Frame */}
          <div className="aspect-[21/9] w-full rounded-[2.5rem] overflow-hidden relative shadow-lg group border border-slate-200/30 dark:border-slate-800/30">
            <img 
              src="https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?q=80&w=1200&auto=format&fit=crop" 
              alt="Hormuz Island"
              className="w-full h-full object-cover transition-transform duration-[15s] group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Redesigned Rich Article Content blocks */}
          <div className="prose prose-slate dark:prose-invert max-w-none prose-p:leading-loose text-slate-600 dark:text-slate-300 space-y-8 font-medium">
            
            {/* Block 1: Intro */}
            <p className="text-base sm:text-lg leading-[1.8] text-slate-700 dark:text-slate-200">
              هنگامی که زمستان بر اکثر نقاط فلات ایران چادر سفید سرما را می‌گستراند، جنوب کشور و مشخصاً جزایر تنگه هرمز، به بهشت‌های معتدلی با دمای ایده‌آل ۲۰ تا ۲۵ درجه تبدیل می‌شوند. در میان این نقاط، جزیره بیضی‌شکل هرمز با وسعت ۴۲ کیلومتر مربع، مانند یک موزه جواهرات زمین‌شناسی در جهان منحصربه‌فرد است. خاک‌های رنگین، دره‌های تندیس‌گون و سواحل نقره‌ای در زمستان شما را فرا می‌خوانند.
            </p>

            {/* Block 2: Hircanian Section */}
            <section id="hircanian" className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 p-6 sm:p-8 rounded-[2rem] space-y-4 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold font-mono text-sm">۱</span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white border-r-4 border-blue-500 pr-3">جنگل‌های حرا و سواحل سرخ هرمز</h2>
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-slate-500 dark:text-slate-400">
                یکی از عجایب طبیعی هرمز سواحل سرخ رنگ آن است که به واسطه وجود مقادیر بالای اکسید آهن در کانی‌ها ایجاد شده است. این خاک نه تنها زیبا و خوراکی است (که محلی‌ها از آن ادویه معروف سس سوراغ درست می‌کنند)، بلکه به لحاظ هنری جلوه‌ای ابدی به جزیره می‌بخشد.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <h4 className="font-extrabold text-slate-950 dark:text-white text-sm mb-2 flex items-center gap-2">
                    <CheckCircle size={15} className="text-blue-600" />
                    دره تندیس‌ها و مجسمه‌ها
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">باد و باران طی هزاران سال، صخره‌های آهکی این دره را به شکل سر حیوانات و اهریمن‌های افسانه‌ای تراشیده‌اند.</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <h4 className="font-extrabold text-slate-950 dark:text-white text-sm mb-2 flex items-center gap-2">
                    <CheckCircle size={15} className="text-blue-600" />
                    الهه نمک (کوه نمک فیروزه‌ای)
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">بلورهای بی‌نظیر نمک کوهی که جاذب انرژی‌های منفی محیط بوده و صدایی زنگ‌دار دارد.</p>
                </div>
              </div>
            </section>

            {/* Block 3: Maranjab Desert section */}
            <section id="maranjab" className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold font-mono text-sm">۲</span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white border-r-4 border-blue-500 pr-3">شکوه کویر مرنجاب؛ سمفونی بی‌پایان سکوت</h2>
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-slate-500 dark:text-slate-400">
                در مقابل رطوبت فیروزه‌ای جنوب، کویر طلایی مرنجاب در نزدیکی کاشان قرار دارد. مرنجاب آمیزه‌ای از تپه‌های ماسه‌ای روان بی‌پایان، آسمان شفاف کریستالی شب و عظمت سفید دریاچه نمک است. در شب‌های پاییزی و زمستانی، تماشای بازتاب کهکشان راه شیری بر سطح آینه‌ای کویر یکی از زیباترین قاب‌های آفرینش است.
              </p>
              
              <blockquote className="border-r-4 border-blue-600 bg-blue-50/80 dark:bg-blue-950/20 p-6 rounded-l-2xl text-slate-800 dark:text-slate-200 font-extrabold italic shadow-sm leading-relaxed">
                «کویر تهی نیست؛ بلکه مالامال از حضور است. جایی که هر ستاره نجوایی است از آرامش گم‌شده بشر مدرن.»
              </blockquote>
            </section>

            {/* Block 4: Tips section */}
            <section id="tips" className="bg-blue-50/30 dark:bg-blue-950/20 border border-blue-100/50 dark:border-blue-900/30 p-6 sm:p-8 rounded-[2.5rem] space-y-4">
              <h3 className="font-black text-slate-950 dark:text-white text-lg flex items-center gap-2 border-r-4 border-blue-500 pr-3">
                <Sparkles size={18} className="text-blue-600 dark:text-blue-400" />
                توصیه‌های حرفه‌ای کانسیرژ اونجا برای سفر گروهی
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="text-blue-600 dark:text-blue-400 shrink-0 mt-1">✔</span>
                  <span>کفش پیاده‌روی ساق‌دار برای عبور از مناطق سنگلاخی جزیره و رمل‌های کویری به همراه داشته باشید.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-blue-600 dark:text-blue-400 shrink-0 mt-1">✔</span>
                  <span>در اقامتگاه‌های بوم‌گردی محلی، فرهنگ پوششی و حریم جوامع محلی صبور را محترم شماریم.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-blue-600 dark:text-blue-400 shrink-0 mt-1">✔</span>
                  <span>بطری آب چندبار مصرف به همراه داشته باشید تا به کاهش آلودگی پلاستیکی جزیره بکر کمک کنیم.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-blue-600 dark:text-blue-400 shrink-0 mt-1">✔</span>
                  <span>برنامه‌ریزی کنید تا در ساحل سرخ، تماشای خورشید در حال غروب خلیج فارس را از دست ندهید.</span>
                </li>
              </ul>
            </section>

            {/* Block 5: FAQ Section styled beautifully */}
            <section id="faq" className="space-y-6">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                <HelpCircle className="text-blue-600 dark:text-blue-400" size={22} />
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white border-r-4 border-blue-500 pr-3">سوالات متداول سفرهای فصلی</h3>
              </div>

              <div className="space-y-4">
                {[
                  { q: "بهترین زمان دقیق برای سفر به جزیره هرمز چه ماه‌هایی است؟", a: "آذر، دی، بهمن و اوایل اسفند بهترین شرایط آب و هوایی را در خلیج فارس دارند." },
                  { q: "آیا در جزیره هرمز هتل‌های لوکس پنج ستاره وجود دارد؟", a: "خیر، هرمز بافت طبیعی و بوم‌گردی دارد. اقامت در بوم‌گردی‌های سنتی مجهز یا رزرو هتل‌های مجلل قشم با استفاده از گشت‌های روزانه قایق تندرو اونجا بهترین جایگزین است." },
                  { q: "آیا مسیر جاده‌ای کویر مرنجاب نیاز به خودروهای شاسی بلند دودیفرانسیل دارد؟", a: "تا کاروانسرا مسیر شنی و خاکی نسبتا هموار است و با خودروی سواری معمولی نیز امکان تردد با سرعت کم وجود دارد، اما برای ورود عمیق به رمل‌ها حتماً خودروهای آفرود نیاز است." }
                ].map((item, index) => (
                  <div key={index} className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200/40 dark:border-slate-800/40">
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-sm mb-2">{item.q}</h4>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Block 6: Author Profile Card */}
            <div className="bg-slate-100 dark:bg-slate-900/80 rounded-[2rem] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 border border-slate-200/30 dark:border-slate-800/30 shadow-sm">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center font-black text-2xl shadow-md shrink-0">
                م پ
              </div>
              <div className="space-y-2 text-center sm:text-right">
                <div className="font-black text-slate-950 dark:text-white text-base">مهران پارسا</div>
                <div className="text-xs text-blue-600 dark:text-blue-400 font-extrabold">سردبیر ارشد و کارشناس ارزیابی اقامتگاه‌های اونجا</div>
                <p className="text-xs text-slate-400 leading-relaxed">مهران بیش از یک دهه است که وجب به وجب خاک ایران، کاروانسراهای کویری و بوم‌گردی‌های جزایر خلیج فارس را برای معرفی بهترین تجارب اقامتی با هدف ارتقای گردشگری پایدار زیسته است.</p>
              </div>
            </div>

          </div>

          {/* Related Articles block */}
          <div className="border-t border-slate-200/50 dark:border-slate-800/50 pt-8 mt-12 space-y-6">
              <h3 className="font-black text-slate-950 dark:text-white text-lg border-r-4 border-blue-500 pr-3">مطالب و راهنماهای خواندنی مرتبط</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { title: "معرفی بهترین بوتیک هتل‌های تاریخی کاشان در فصل بهار و پاییز", category: "معرفی هتل", time: "۵ دقیقه", img: "https://images.unsplash.com/photo-1634674720612-4293f9c6c5a0?q=80&w=600&auto=format&fit=crop" },
                    { title: "چک‌لیست کامل وسایل camping حرفه‌ای در کویرهای بکر ایران", category: "آموزش بقا", time: "۴ دقیقه", img: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=600&auto=format&fit=crop" }
                  ].map((art, idx) => (
                      <div key={idx} className="group bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl overflow-hidden shadow-sm flex items-center gap-4 p-3 hover:shadow-md transition-shadow">
                          <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 relative bg-slate-100">
                              <img src={art.img} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          </div>
                          <div className="space-y-1 min-w-0">
                              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold">{art.category}</span>
                              <h4 className="text-xs font-black text-slate-900 dark:text-white truncate leading-snug group-hover:text-blue-600">{art.title}</h4>
                              <span className="text-[9px] text-slate-400 block font-bold">{art.time} زمان مطالعه</span>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          {/* Upgraded Comment section block */}
          <section id="comments" className="border-t border-slate-200/50 dark:border-slate-800/50 pt-8 mt-12 space-y-6">
            <div className="flex items-center gap-3 text-slate-900 dark:text-white font-black text-lg bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm w-max">
              <MessageSquare size={20} className="text-blue-600" />
              <span>دیدگاه‌های ثبت‌شده ({comments.length})</span>
            </div>

            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="space-y-4">
                  
                  {/* Primary Comment Card */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 p-6 rounded-[2rem] shadow-sm flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400 font-black flex items-center justify-center shrink-0">
                      {comment.avatar}
                    </div>
                    <div className="space-y-2 flex-grow">
                      <div className="flex justify-between items-center">
                        <span className="font-extrabold text-slate-900 dark:text-white text-sm">{comment.author}</span>
                        <span className="text-[10px] text-slate-400 bg-slate-50 dark:bg-slate-950 px-2 py-1 rounded-lg font-bold">{comment.date}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-bold">
                        {comment.text}
                      </p>
                    </div>
                  </div>

                  {/* Replies Map */}
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100/50 dark:border-blue-900/30 p-6 rounded-[2rem] shadow-sm mr-8 sm:mr-16 flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-black flex items-center justify-center text-xs shrink-0">
                        {reply.avatar}
                      </div>
                      <div className="space-y-2 flex-grow">
                        <div className="flex justify-between items-center">
                          <span className="font-extrabold text-blue-950 dark:text-blue-300 text-xs sm:text-sm flex items-center gap-1.5">
                            {reply.author}
                            {reply.isAuthor && <span className="bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 text-[9px] px-2 py-0.5 rounded-full border border-blue-200/30 font-bold">نویسنده</span>}
                          </span>
                          <span className="text-[9px] text-slate-400 bg-white/50 dark:bg-slate-950/60 px-2 py-0.5 rounded font-bold">{reply.date}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-bold">
                          {reply.text}
                        </p>
                      </div>
                    </div>
                  ))}

                </div>
              ))}
            </div>

            {/* Comment Post Form */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 p-6 rounded-[2.5rem] shadow-sm space-y-4">
              <h4 className="font-black text-slate-900 dark:text-white text-base">ثبت دیدگاه یا سوال جدید</h4>
              <textarea 
                rows={4} 
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="تجربه شخصی، سوال یا دیدگاه ارزشمند خود را با ما در میان بگذارید..."
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-4 text-xs sm:text-sm font-bold outline-none focus:border-blue-500 dark:text-white resize-none shadow-inner"
              ></textarea>
              <button 
                onClick={handleAddComment}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl text-xs sm:text-sm font-black transition-all shadow-lg shadow-blue-600/20 transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
              >
                <Send size={14} />
                <span>ارسال دیدگاه</span>
              </button>
            </div>

          </section>

        </div>

      </div>

    </div>
  );
}
