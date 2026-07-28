import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
  isWizard?: boolean;
}

export function Modal({ isOpen, onClose, title, children, className, isWizard = false }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-[150] flex items-center justify-center p-3 sm:p-4 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className={cn(
          "bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-[2rem] w-full shadow-2xl flex flex-col border border-slate-200/50 dark:border-slate-800/50 animate-in zoom-in-95 duration-200 my-auto max-h-[calc(100vh-2rem)] overflow-hidden",
          !isWizard && "max-w-lg p-6",
          className
        )}
      >
        {!isWizard && title && (
          <div className="flex justify-between items-center border-b border-slate-100/50 dark:border-slate-800/50 pb-3 mb-4 shrink-0">
            <h3 className="text-sm font-black text-slate-950 dark:text-white">{title}</h3>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1 rounded-lg">
              <X size={20} />
            </button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-0.5">
          {children}
        </div>
      </div>
    </div>
  );
}
