const fs = require('fs');
let code = fs.readFileSync('src/components/SupplierModal.tsx', 'utf8');

const oldUI = `<div className="space-y-2.5">
                        <label className="text-slate-500 dark:text-slate-400 block text-[11px] font-black">تصویر خدمت (یکی انتخاب کنید یا آدرس سفارشی بگذارید):</label>
                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { label: "رستوران", url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop" },
                            { label: "اسپا", url: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=600&auto=format&fit=crop" },
                            { label: "استخر", url: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=600&auto=format&fit=crop" },
                            { label: "کلوپ بازی", url: "https://images.unsplash.com/photo-1566454825481-4e48f80aa4d7?q=80&w=600&auto=format&fit=crop" }
                          ].map((img, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setServiceImage(img.url)}
                              className={cn(
                                "border p-1.5 rounded-xl text-[10px] font-bold transition flex flex-col items-center gap-1.5 cursor-pointer overflow-hidden",
                                serviceImage === img.url 
                                  ? "border-orange-600 bg-orange-500/10 text-orange-700 dark:text-orange-300" 
                                  : "border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
                              )}
                            >
                              <img src={img.url} alt={img.label} className="w-full h-10 object-cover rounded-lg" referrerPolicy="no-referrer" />
                              <span>{img.label}</span>
                            </button>
                          ))}
                        </div>
                        <input 
                          type="text" 
                          placeholder="یا آدرس اینترنتی تصویر (URL) دلخواه..."
                          value={serviceImage} 
                          onChange={(e) => setServiceImage(e.target.value)}
                          className="w-full border p-3 rounded-xl outline-none bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-mono mt-2" 
                        />
                      </div>`;

const oldUI2 = oldUI.replace('onClick={() => setServiceImage(img.url)}', 'onClick={() => setServiceImages([img.url])}')
                    .replace('value={serviceImage}', 'value={serviceImages[0] || ""}')
                    .replace('onChange={(e) => setServiceImage(e.target.value)}', 'onChange={(e) => setServiceImages([e.target.value])}')
                    .replace('serviceImage === img.url', 'serviceImages.includes(img.url)');

const newUI = `<div className="space-y-2.5">
                        <label className="text-slate-500 dark:text-slate-400 block text-[11px] font-black">تصاویر خدمت (تا ۵ تصویر انتخاب کنید):</label>
                        <div className="flex flex-wrap gap-2">
                           {serviceImages.map((img, i) => (
                              <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 group">
                                <img src={img} className="w-full h-full object-cover" />
                                <button 
                                  type="button" 
                                  onClick={() => setServiceImages(prev => prev.filter((_, idx) => idx !== i))} 
                                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-red-500"
                                >
                                  <X size={12} />
                                </button>
                              </div>
                           ))}
                           {serviceImages.length < 5 && (
                              <label className="w-20 h-20 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                                <Plus size={20} className="mb-1" />
                                <span className="text-[9px] font-bold">آپلود عکس</span>
                                <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
                              </label>
                           )}
                        </div>
                      </div>`;

// Wait, looking at grep, the original onClick was not replaced.
// I can just search and replace by regex.

let found = code.indexOf('<div className="space-y-2.5">');
if(found !== -1) {
    let before = code.substring(0, found);
    let after = code.substring(found);
    // find the end of this div
    let endMatch = after.match(/<\/div>\s*<\/div>\s*<div className="pt-5 flex gap-3">/);
    if(endMatch) {
        let endIndex = endMatch.index;
        code = before + newUI + "\n                    </div>\n\n                    <div className=\"pt-5 flex gap-3\">" + after.substring(endIndex + endMatch[0].length);
    }
}

fs.writeFileSync('src/components/SupplierModal.tsx', code);
