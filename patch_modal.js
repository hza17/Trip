const fs = require('fs');
let code = fs.readFileSync('src/components/SupplierModal.tsx', 'utf8');

const modalCode = `
            {showAddRoomModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-2xl max-w-md w-full space-y-4 text-xs font-bold animate-in zoom-in-95">
                        <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                            <span className="font-black text-sm text-slate-950 dark:text-white">تعریف اتاق/سوئیت جدید</span>
                            <button onClick={() => setShowAddRoomModal(false)} className="text-slate-400 hover:text-slate-600 text-sm"><X size={16} /></button>
                        </div>
                        <form onSubmit={handleAddRoom} className="space-y-4 text-right">
                            <div>
                                <label className="block text-slate-500 mb-1.5">عنوان و نوع اتاق</label>
                                <input type="text" value={newRoomType} onChange={(e) => setNewRoomType(e.target.value)} placeholder="مثلا: سوئیت رویال پرزیدنتال" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 outline-none focus:border-blue-500 transition-all dark:text-white" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-slate-500 mb-1.5">متراژ (متر مربع)</label>
                                    <input type="number" value={newRoomSize} onChange={(e) => setNewRoomSize(e.target.value)} placeholder="مثلا: 45" className="w-full font-mono bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 outline-none focus:border-blue-500 transition-all dark:text-white" required />
                                </div>
                                <div>
                                    <label className="block text-slate-500 mb-1.5">قیمت هر شب (تومان)</label>
                                    <input type="text" value={newRoomPrice} onChange={(e) => {
                                        const val = e.target.value.replace(/\\D/g, '');
                                        setNewRoomPrice(val ? parseInt(val).toLocaleString() : '');
                                    }} placeholder="مثلا: 5,000,000" className="w-full font-mono bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 outline-none focus:border-blue-500 transition-all dark:text-white" required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-slate-500 mb-1.5">نوع و تعداد تخت</label>
                                <input type="text" value={newRoomBeds} onChange={(e) => setNewRoomBeds(e.target.value)} placeholder="مثلا: ۱ تخت دبل کینگ + ۱ سینگل" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 outline-none focus:border-blue-500 transition-all dark:text-white" required />
                            </div>
                            <div>
                                <label className="block text-slate-500 mb-1.5">توضیحات کوتاه</label>
                                <textarea value={newRoomDesc} onChange={(e) => setNewRoomDesc(e.target.value)} placeholder="توضیح مختصری درباره امکانات و چشم‌انداز..." rows={2} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 outline-none focus:border-blue-500 transition-all dark:text-white resize-none" required></textarea>
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <button type="button" onClick={() => setShowAddRoomModal(false)} className="border px-4 py-2 rounded-xl text-xs cursor-pointer text-slate-700 dark:text-slate-300">انصراف</button>
                                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-xs font-bold cursor-pointer">ثبت و ایجاد اتاق</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
`;

code = code.replace(/(\s*)<\/div>\s*<\/div>\s*<\/div>\s*\);\s*}/g, (match, p1) => {
    return modalCode + match;
});

fs.writeFileSync('src/components/SupplierModal.tsx', code);
