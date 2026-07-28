const fs = require('fs');
let content = fs.readFileSync('src/components/Header.tsx', 'utf-8');

content = content.replace(/<button onClick=\{\(\) => showToast\(".*?"\)\} className="(.*?)"/g, (match, classes) => {
    // Remove hover effects, add opacity-50 and cursor-not-allowed
    let newClasses = classes.replace(/hover:bg-slate-50 /g, '')
                            .replace(/dark:hover:bg-slate-800\/50 /g, '')
                            .replace(/hover:text-blue-500 /g, '')
                            .replace(/dark:hover:text-blue-400 /g, '')
                            .replace(/hover:text-rose-500 /g, '')
                            .replace(/dark:hover:text-rose-400 /g, '')
                            .replace(/cursor-pointer/g, '');
    
    // Also remove any group-hover: text/bg effects from spans if possible, but let's just add the disabled styles
    newClasses = `${newClasses} opacity-50 cursor-not-allowed grayscale hover:bg-transparent`;
    return `<button onClick={() => showToast("این بخش به زودی فعال می‌شود.")} className="${newClasses}"`;
});

fs.writeFileSync('src/components/Header.tsx', content);
