with open('src/components/SerpView.tsx', 'r') as f:
    content = f.read()

# Replace CustomService card main div
content = content.replace(
    '"bg-white/70 hover:bg-white/90 dark:bg-[#070913]/60 backdrop-blur-2xl border border-white/40 dark:border-white/10 rounded-[1.5rem] p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:shadow-xl transition-all duration-500 flex group h-full",',
    '"bg-white/40 hover:bg-white/60 dark:bg-slate-950/40 dark:hover:bg-slate-950/60 backdrop-blur-md border border-white/20 dark:border-slate-800/30 rounded-2xl p-2 shadow-sm hover:shadow-xl transition-all duration-500 flex group h-full",'
)

content = content.replace(
    '"relative overflow-hidden shrink-0 rounded-[1.25rem] bg-slate-100 dark:bg-slate-800",',
    '"relative overflow-hidden shrink-0 rounded-xl bg-slate-100 dark:bg-slate-800",'
)

with open('src/components/SerpView.tsx', 'w') as f:
    f.write(content)
