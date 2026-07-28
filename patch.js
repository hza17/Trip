const fs = require('fs');
let code = fs.readFileSync('src/components/SupplierModal.tsx', 'utf-8');

// Add icons
const iconImportReplacement = `  Check,
  Coffee,
  Award,
  Search,
  LogOut,
  LogIn,
  CreditCard,
  Briefcase`;
code = code.replace('  Award', iconImportReplacement);

// Add state for PMS
const pmsStateStr = `  // PMS States
  const [pmsGuests, setPmsGuests] = useState([
    { id: 'G-1001', name: 'علیرضا مرادی', room: '۱۰۲', checkIn: '۱۴۰۲/۰۴/۱۲', checkOut: '۱۴۰۲/۰۴/۱۵', status: 'in-house', debt: 450000, type: 'VIP', nights: 3, pax: 2 },
    { id: 'G-1002', name: 'مینا رضایی', room: '۱۰۵', checkIn: '۱۴۰۲/۰۴/۱۲', checkOut: '۱۴۰۲/۰۴/۱۴', status: 'departure', debt: 0, type: 'Standard', nights: 2, pax: 1 },
    { id: 'G-1003', name: 'خانواده حسینی', room: 'تخصیص نیافته', checkIn: '۱۴۰۲/۰۴/۱۴', checkOut: '۱۴۰۲/۰۴/۱۸', status: 'arrival', debt: 0, type: 'Suite', nights: 4, pax: 4 },
    { id: 'G-1004', name: 'سامان کریمی', room: '۲۰۴', checkIn: '۱۴۰۲/۰۴/۱۳', checkOut: '۱۴۰۲/۰۴/۱۶', status: 'in-house', debt: 120000, type: 'Standard', nights: 3, pax: 1 },
    { id: 'G-1005', name: 'گروه تور طبیعت‌گردی', room: 'چندگانه (۳)', checkIn: '۱۴۰۲/۰۴/۱۴', checkOut: '۱۴۰۲/۰۴/۱۵', status: 'arrival', debt: 0, type: 'Group', nights: 1, pax: 6 },
  ]);
  const [pmsFilter, setPmsFilter] = useState('all');
  const [pmsSearch, setPmsSearch] = useState('');

  // PMS Actions
  const handleCheckIn = (id: string) => {
    setPmsGuests(prev => prev.map(g => g.id === id ? { ...g, status: 'in-house', room: g.room === 'تخصیص نیافته' ? '۳۰۸' : g.room } : g));
    showToast("پذیرش مسافر با موفقیت انجام شد و اتاق تخصیص یافت.");
  };

  const handleSettleDebt = (id: string) => {
    setPmsGuests(prev => prev.map(g => g.id === id ? { ...g, debt: 0 } : g));
    showToast("بدهی و مصارف جانبی مسافر تسویه گردید.");
  };

  const handleCheckOut = (id: string) => {
    setPmsGuests(prev => prev.map(g => g.id === id ? { ...g, status: 'checkout' } : g));
    showToast("ترخیص مسافر با موفقیت انجام شد و اتاق در لیست نظافت قرار گرفت.");
  };
`;
// find where to insert
code = code.replace('  const [newStaffName, setNewStaffName] = useState("");', pmsStateStr + '\n  const [newStaffName, setNewStaffName] = useState("");');

fs.writeFileSync('src/components/SupplierModal.tsx', code);
