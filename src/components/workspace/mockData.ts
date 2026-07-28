import { Business, TeamMember } from './types';

export const initialBusinesses: Business[] = [
  { 
    id: 'b1', 
    name: 'هتل ۵ ستاره اسپیناس پالاس', 
    type: 'Hotel', 
    status: 'Active', 
    modules: ['Dashboard', 'Rooms', 'Reservations', 'Finance', 'Reports', 'Team', 'Settings'],
    createdAt: '2025-01-15',
    revenue: 4850000000,
    activeBookings: 84,
    address: 'تهران، سعادت‌آباد، میدان بهرود',
    mobile: '09121112233',
    ownerName: 'جناب آقای مهندس امیری',
    completionPercentage: 100
  },
  { 
    id: 'b2', 
    name: 'رستوران سنتی اسکان (زیرمجموعه اسپیناس)', 
    type: 'Entertainment', 
    status: 'Active', 
    modules: ['Dashboard', 'Orders', 'Menu', 'Reservations', 'Customers'], 
    parentId: 'b1',
    isSubService: true,
    subServiceType: 'Restaurant',
    createdAt: '2025-02-20',
    revenue: 920000000,
    activeBookings: 24,
    address: 'داخل لابی اصلی هتل اسپیناس'
  },
  { 
    id: 'b3', 
    name: 'مجموعه تخصصی اسپا و ماساژ لوتوس (زیرمجموعه اسپیناس)', 
    type: 'Entertainment', 
    status: 'Active', 
    modules: ['Dashboard', 'Spa', 'Reservations', 'Customers'], 
    parentId: 'b1',
    isSubService: true,
    subServiceType: 'Massage',
    createdAt: '2025-03-01',
    revenue: 530000000,
    activeBookings: 12,
    address: 'طبقه منفی ۲ هتل اسپیناس'
  },
  { 
    id: 'b4', 
    name: 'آژانس هواپیمایی ماهان سیر', 
    type: 'Flight', 
    status: 'Active', 
    modules: ['Dashboard', 'Flights', 'Reservations', 'Finance', 'Reports'],
    createdAt: '2025-05-10',
    revenue: 12400000000,
    activeBookings: 192,
    address: 'تهران، خیابان ولیعصر، برج سایه'
  },
  { 
    id: 'b5', 
    name: 'ناوگان ریلی فدک البرز', 
    type: 'Train', 
    status: 'Active', 
    modules: ['Dashboard', 'Trains', 'Reservations', 'Finance'],
    createdAt: '2025-06-18',
    revenue: 7200000000,
    activeBookings: 320,
    address: 'تهران، میدان راه آهن، ساختمان اداری فدک'
  },
  { 
    id: 'b6', 
    name: 'املاک و تشریفات رنت کار پرشین', 
    type: 'CarRental', 
    status: 'Active', 
    modules: ['Dashboard', 'CarRental', 'Reservations', 'Settings'],
    createdAt: '2025-08-01',
    revenue: 1800000000,
    activeBookings: 18,
    address: 'فرودگاه امام خمینی، سالن پروازهای ورودی'
  },
  { 
    id: 'b7', 
    name: 'دهکده توریستی و ویلاهای ساحلی نمک‌آبرود', 
    type: 'Villa', 
    status: 'Active', 
    modules: ['Dashboard', 'Villas', 'Reservations', 'Settings'],
    createdAt: '2025-09-12',
    revenue: 3100000000,
    activeBookings: 15,
    address: 'مازندران، نمک‌آبرود، محله ساحلی'
  },
  { 
    id: 'b8', 
    name: 'مجموعه مستقل تفریحی کارتینگ و بولینگ کارن', 
    type: 'Entertainment', 
    status: 'Active', 
    modules: ['Dashboard', 'Customers', 'Reservations', 'Settings'],
    isSubService: false,
    subServiceType: 'Gaming',
    createdAt: '2025-11-05',
    revenue: 1450000000,
    activeBookings: 45,
    address: 'تهران، اتوبان بابایی، مجموعه ورزشی کارن'
  },
  { 
    id: 'b9', 
    name: 'کافه رستوران بین‌المللی شاندیز البرز', 
    type: 'Restaurant', 
    status: 'Active', 
    modules: ['Dashboard', 'Menu', 'Tables', 'RestaurantOrders', 'Reservations', 'Finance', 'Settings'],
    isSubService: false,
    createdAt: '2025-10-01',
    revenue: 2650000000,
    activeBookings: 38,
    address: 'تهران، خیابان فرشته، پلاک ۱۲',
    mobile: '09127778899',
    ownerName: 'جناب آقای خسرو شکیبا',
    completionPercentage: 92
  }
];

export const initialTeamMembers: TeamMember[] = [
  { id: 't1', name: 'امیر رضایی', email: 'amir@paradise.com', role: 'مدیر کل', mobile: '09121112233', businessName: 'کلیه صنف‌ها', status: 'Active', lastActive: 'هم‌اکنون', modules: ['Dashboard', 'Rooms', 'Reservations', 'Finance', 'Reports', 'Team', 'Settings'] },
  { id: 't2', name: 'سارا احمدی', email: 'sara@paradise.com', role: 'مدیر پذیرش', mobile: '09129876543', businessName: 'هتل ۵ ستاره اسپیناس پالاس', status: 'Active', lastActive: '۱۰ دقیقه پیش', businessId: 'b1', modules: ['Dashboard', 'Orders', 'Menu', 'Reservations', 'Customers'] },
  { id: 't3', name: 'علی کریمی', email: 'ali@paradise.com', role: 'حسابدار', mobile: '09123334455', businessName: 'آژانس هواپیمایی ماهان سیر', status: 'Active', lastActive: 'دیروز', businessId: 'b4', modules: ['Dashboard', 'CheckInOut', 'Reservations'] }
];
