const fs = require('fs');
let code = fs.readFileSync('src/components/SupplierModal.tsx', 'utf8');

const statsHTML = `
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4">
                        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                            <div>
                                <p className="text-slate-500 text-[10px] font-bold mb-1">کل اتاق‌ها</p>
                                <p className="text-lg font-black text-slate-800 dark:text-white font-mono">{rooms.length}</p>
                            </div>
                            <div className="bg-blue-50 dark:bg-blue-900/30 p-2.5 rounded-xl text-blue-600 dark:text-blue-400">
                                <Building size={18} />
                            </div>
                        </div>
                        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                            <div>
                                <p className="text-slate-500 text-[10px] font-bold mb-1">اتاق‌های فعال (قابل رزرو)</p>
                                <p className="text-lg font-black text-slate-800 dark:text-white font-mono">{rooms.filter(r => r.status === 'active').length}</p>
                            </div>
                            <div className="bg-emerald-50 dark:bg-emerald-900/30 p-2.5 rounded-xl text-emerald-600 dark:text-emerald-400">
                                <CheckCircle size={18} />
                            </div>
                        </div>
                        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                            <div>
                                <p className="text-slate-500 text-[10px] font-bold mb-1">متوسط قیمت هر شب</p>
                                <p className="text-lg font-black text-slate-800 dark:text-white font-mono">{toPersianDigits(Math.round(rooms.reduce((acc, curr) => acc + curr.price, 0) / (rooms.length || 1)).toLocaleString())}</p>
                            </div>
                            <div className="bg-amber-50 dark:bg-amber-900/30 p-2.5 rounded-xl text-amber-600 dark:text-amber-400">
                                <Coins size={18} />
                            </div>
                        </div>
                        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-4 flex items-center justify-between shadow-sm cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-dashed border-2 border-slate-300 dark:border-slate-700 flex-col justify-center" onClick={() => setShowAddRoomModal(true)}>
                             <Plus size={20} className="text-slate-400 mb-1" />
                             <span className="text-xs font-bold text-slate-500">افزودن اتاق جدید</span>
                        </div>
                    </div>
`;

code = code.replace('<div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-2xl overflow-hidden text-xs shadow-sm font-semibold">', statsHTML + '\n                    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-2xl overflow-hidden text-xs shadow-sm font-semibold">');

fs.writeFileSync('src/components/SupplierModal.tsx', code);
