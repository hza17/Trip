import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, RotateCcw, Calendar, Check } from "lucide-react";

export interface JalaliDate {
  day: number;
  month: number; // 1 to 12
  year: number;
}

export const MONTHS_INFO = [
  { id: 4, name: "تیر", year: 1405, days: 31, offset: 4, prevDays: [28, 29, 30, 31] },
  { id: 5, name: "مرداد", year: 1405, days: 31, offset: 0, prevDays: [] },
  { id: 6, name: "شهریور", year: 1405, days: 31, offset: 3, prevDays: [29, 30, 31] },
];

export function formatJalaliDate(date: JalaliDate | null): string {
  if (!date) return "انتخاب تاریخ";
  const selectedMonth = MONTHS_INFO.find(m => m.id === date.month);
  const monthName = selectedMonth ? selectedMonth.name : "تیر";
  return `${date.day} ${monthName} ${date.year}`;
}

// Convert a JalaliDate to a comparable numeric value for range checking
export function getAbsoluteDayValue(date: JalaliDate | null): number {
  if (!date) return 0;
  return date.year * 10000 + date.month * 100 + date.day;
}

interface DateRangePickerProps {
  startDate: JalaliDate | null;
  endDate: JalaliDate | null;
  onSelectRange: (start: JalaliDate | null, end: JalaliDate | null) => void;
  onClose: () => void;
}

export function DateRangePicker({
  startDate,
  endDate,
  onSelectRange,
  onClose,
}: DateRangePickerProps) {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(0); // Index in MONTHS_INFO (0 = Tir, 1 = Mordad, etc.)
  const [hoveredDate, setHoveredDate] = useState<JalaliDate | null>(null);

  const activeMonth = MONTHS_INFO[currentMonthIdx];

  const handleDayClick = (day: number) => {
    const clickedDate: JalaliDate = {
      day,
      month: activeMonth.id,
      year: activeMonth.year,
    };

    const clickedVal = getAbsoluteDayValue(clickedDate);
    const startVal = getAbsoluteDayValue(startDate);
    const endVal = getAbsoluteDayValue(endDate);

    if (!startDate || (startDate && endDate) || clickedVal < startVal) {
      // First click, or reset if both are set, or if clicked date is before start date
      onSelectRange(clickedDate, null);
    } else if (clickedVal === startVal) {
      // Clicking same day resets
      onSelectRange(null, null);
    } else {
      // Second click (clicked date is after start date)
      onSelectRange(startDate, clickedDate);
    }
  };

  const handleNextMonth = () => {
    if (currentMonthIdx < MONTHS_INFO.length - 1) {
      setCurrentMonthIdx(currentMonthIdx + 1);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonthIdx > 0) {
      setCurrentMonthIdx(currentMonthIdx - 1);
    }
  };

  const isDaySelected = (day: number) => {
    const dVal = getAbsoluteDayValue({ day, month: activeMonth.id, year: activeMonth.year });
    return dVal === getAbsoluteDayValue(startDate) || dVal === getAbsoluteDayValue(endDate);
  };

  const isDayInRange = (day: number) => {
    const dVal = getAbsoluteDayValue({ day, month: activeMonth.id, year: activeMonth.year });
    const startVal = getAbsoluteDayValue(startDate);
    const endVal = getAbsoluteDayValue(endDate);

    if (startDate && endDate) {
      return dVal > startVal && dVal < endVal;
    }

    if (startDate && hoveredDate) {
      const hoverVal = getAbsoluteDayValue(hoveredDate);
      return dVal > startVal && dVal <= hoverVal;
    }

    return false;
  };

  const isStartDate = (day: number) => {
    const dVal = getAbsoluteDayValue({ day, month: activeMonth.id, year: activeMonth.year });
    return dVal === getAbsoluteDayValue(startDate);
  };

  const isEndDate = (day: number) => {
    const dVal = getAbsoluteDayValue({ day, month: activeMonth.id, year: activeMonth.year });
    return dVal === getAbsoluteDayValue(endDate);
  };

  const handleClear = () => {
    onSelectRange(null, null);
    setHoveredDate(null);
  };

  return (
    <div className="w-full bg-white dark:bg-[#0b0e26] border border-slate-200 dark:border-slate-800 shadow-2xl rounded-[2rem] p-6 z-50 animate-in slide-in-from-top-2 cursor-default" dir="rtl">
      {/* Date Header Summary */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800/60">
        <div className="flex gap-4">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold block mb-0.5">تاریخ ورود</span>
            <span className={cn(
              "text-xs font-black transition-all",
              startDate ? "text-blue-600 dark:text-blue-400" : "text-slate-400"
            )}>
              {startDate ? formatJalaliDate(startDate) : "انتخاب کنید"}
            </span>
          </div>
          <div className="w-px h-8 bg-slate-200 dark:bg-slate-800"></div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold block mb-0.5">تاریخ خروج</span>
            <span className={cn(
              "text-xs font-black transition-all",
              endDate ? "text-blue-600 dark:text-blue-400" : "text-slate-400"
            )}>
              {endDate ? formatJalaliDate(endDate) : "انتخاب کنید"}
            </span>
          </div>
        </div>
        
        {startDate && (
          <button 
            onClick={handleClear}
            className="flex items-center gap-1.5 text-[10px] font-black text-rose-500 hover:text-rose-600 transition-colors bg-rose-500/10 px-2.5 py-1.5 rounded-xl border border-rose-500/10 cursor-pointer"
          >
            <RotateCcw size={10} />
            <span>پاک کردن</span>
          </button>
        )}
      </div>

      {/* Month Navigation */}
      <div className="flex justify-between items-center mb-5">
        <span className="font-extrabold text-slate-900 dark:text-white text-base">
          {activeMonth.name} {activeMonth.year}
        </span>
        <div className="flex items-center gap-1.5">
          <button 
            type="button"
            disabled={currentMonthIdx === 0}
            onClick={handlePrevMonth}
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center transition-colors border border-slate-100 dark:border-slate-800",
              currentMonthIdx === 0 
                ? "text-slate-300 dark:text-slate-700 cursor-not-allowed bg-transparent" 
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            )}
          >
            <ChevronRight size={16} />
          </button>
          <button 
            type="button"
            disabled={currentMonthIdx === MONTHS_INFO.length - 1}
            onClick={handleNextMonth}
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center transition-colors border border-slate-100 dark:border-slate-800",
              currentMonthIdx === MONTHS_INFO.length - 1 
                ? "text-slate-300 dark:text-slate-700 cursor-not-allowed bg-transparent" 
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            )}
          >
            <ChevronLeft size={16} />
          </button>
        </div>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-extrabold mb-3">
        <div className="text-slate-400 dark:text-slate-500 pb-1.5">ش</div>
        <div className="text-slate-400 dark:text-slate-500 pb-1.5">ی</div>
        <div className="text-slate-400 dark:text-slate-500 pb-1.5">د</div>
        <div className="text-slate-400 dark:text-slate-500 pb-1.5">س</div>
        <div className="text-slate-400 dark:text-slate-500 pb-1.5">چ</div>
        <div className="text-slate-400 dark:text-slate-500 pb-1.5">پ</div>
        <div className="text-rose-500 pb-1.5">ج</div>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-y-1 gap-x-0.5 text-center text-xs font-bold mb-4">
        {/* Previous Month Days (Disabled) */}
        {activeMonth.prevDays.map((d) => (
          <div key={`prev-${d}`} className="py-2.5 text-slate-300 dark:text-slate-700 cursor-not-allowed select-none font-medium opacity-50">
            {d}
          </div>
        ))}

        {/* Current Month Days */}
        {Array.from({ length: activeMonth.days }).map((_, i) => {
          const day = i + 1;
          const isSelected = isDaySelected(day);
          const isRange = isDayInRange(day);
          const isStart = isStartDate(day);
          const isEnd = isEndDate(day);
          const isFriday = (day + activeMonth.offset) % 7 === 0;

          return (
            <div
              key={`day-${day}`}
              onClick={() => handleDayClick(day)}
              onMouseEnter={() => {
                if (startDate && !endDate) {
                  setHoveredDate({ day, month: activeMonth.id, year: activeMonth.year });
                }
              }}
              className={cn(
                "py-2 rounded-lg cursor-pointer transition-all duration-150 relative select-none font-black text-center flex items-center justify-center h-9",
                // selected start/end styling
                isStart || isEnd 
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20 z-10" 
                  : "",
                // range highlight styling
                isRange && !isSelected
                  ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400 rounded-none first-of-type:rounded-r-lg last-of-type:rounded-l-lg"
                  : "",
                // standard styling
                !isSelected && !isRange
                  ? "hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-800 dark:text-slate-200" 
                  : "",
                // Friday styling
                isFriday && !isSelected && !isRange ? "text-rose-500" : ""
              )}
            >
              <span>{day}</span>
              {isStart && (
                <span className="absolute bottom-0.5 text-[7px] font-medium leading-none scale-90">ورود</span>
              )}
              {isEnd && (
                <span className="absolute bottom-0.5 text-[7px] font-medium leading-none scale-90">خروج</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Confirmation Actions */}
      <div className="flex gap-2">
        <button 
          type="button"
          onClick={onClose}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl transition-colors font-black text-xs sm:text-sm shadow-lg shadow-blue-600/20 flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Check size={14} strokeWidth={2.5} />
          <span>تایید تاریخ و بستن</span>
        </button>
      </div>
    </div>
  );
}
