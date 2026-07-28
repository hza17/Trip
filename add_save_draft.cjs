const fs = require('fs');

let content = fs.readFileSync('src/components/TripPlanner.tsx', 'utf8');

// 1. Add Save icon
if (!content.includes('Save,')) {
  content = content.replace('ArrowRight,', 'ArrowRight,\n  Save,');
}

// 2. Add the saveDraft function and the load effect
const loadEffect = `
  useEffect(() => {
    const draft = localStorage.getItem('tripPlannerDraft');
    if (draft) {
      // Use setTimeout to avoid hydration mismatch if any, but since it's client-side rendering mostly, it's fine
      const parsed = JSON.parse(draft);
      if (window.confirm('یک پیش‌نویس ذخیره‌شده پیدا شد. آیا می‌خواهید از ادامه آن شروع کنید؟')) {
        setStep(parsed.step || 1);
        setSelectedCity(parsed.selectedCity || "شیراز");
        setSelectedStyle(parsed.selectedStyle || "cultural");
        setSelectedDuration(parsed.selectedDuration || 3);
        setSelectedBudget(parsed.selectedBudget || "balanced");
        setCustomPrompt(parsed.customPrompt || "");
        setCustomCity(parsed.customCity || "");
        setCustomDuration(parsed.customDuration || 0);
        setActiveItinerary(parsed.activeItinerary || null);
        setActiveDay(parsed.activeDay || 1);
        setActiveTab(parsed.activeTab || "itinerary");
        setCheckedItems(parsed.checkedItems || {});
        setActiveResultTab(parsed.activeResultTab || "overview");
        setSelectedHotelId(parsed.selectedHotelId || "");
        setSelectedRestaurantIds(parsed.selectedRestaurantIds || []);
        setSelectedServiceIds(parsed.selectedServiceIds || ["anc-transfer", "anc-insurance"]);
      }
    }
  }, []);

  const saveDraft = () => {
    const draft = {
      step,
      selectedCity,
      selectedStyle,
      selectedDuration,
      selectedBudget,
      customPrompt,
      customCity,
      customDuration,
      activeItinerary,
      activeDay,
      activeTab,
      checkedItems,
      activeResultTab,
      selectedHotelId,
      selectedRestaurantIds,
      selectedServiceIds
    };
    localStorage.setItem('tripPlannerDraft', JSON.stringify(draft));
    alert('پیش‌نویس سفر شما با موفقیت ذخیره شد.');
  };
`;

content = content.replace('const [voucherCode, setVoucherCode] = useState("");', 'const [voucherCode, setVoucherCode] = useState("");\n' + loadEffect);

// 3. Add the Save Draft button next to the Back button
const buttons = `          <div className="flex gap-2">
            <button 
              onClick={saveDraft} 
              className="px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-xss font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800 transition-all flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <Save size={14} />
              <span>ذخیره پیش‌نویس</span>
            </button>
            <button 
              onClick={onBack} 
              className="px-4 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-white/5 text-xss font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <ArrowRight size={14} />
              <span>بازگشت به صفحه اصلی</span>
            </button>
          </div>`;

content = content.replace(/<button\s+onClick=\{onBack\}\s+className="px-4 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200\/80 dark:border-white\/5 text-xss font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all flex items-center gap-2 shadow-sm cursor-pointer"\s*>\s*<ArrowRight size=\{14\} \/>\s*<span>بازگشت به صفحه اصلی<\/span>\s*<\/button>/g, buttons);

fs.writeFileSync('src/components/TripPlanner.tsx', content);
console.log("Done adding Save Draft.");
