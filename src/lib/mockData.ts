export const products = [
  { id: "1", name: "Chlorophyll Juice", price: 250, category: "Wellness", image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&h=400&fit=crop", description: "Natural detox drink" },
  { id: "2", name: "Chlorophyll Drops", price: 180, category: "Wellness", image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop", description: "Concentrated chlorophyll" },
  { id: "3", name: "Turmeric Soap", price: 85, category: "Skincare", image: "https://images.unsplash.com/photo-1600857062241-98e5dba60f2f?w=400&h=400&fit=crop", description: "Anti-inflammatory soap" },
  { id: "4", name: "Turmeric Lotion", price: 120, category: "Skincare", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop", description: "Moisturizing lotion" },
  { id: "5", name: "Turmeric Scrub", price: 95, category: "Skincare", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop", description: "Exfoliating scrub" },
  { id: "6", name: "Collagen Powder", price: 350, category: "Wellness", image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=400&fit=crop", description: "Pure collagen supplement" },
  { id: "7", name: "Hibiscus Tea", price: 95, category: "Teas", image: "https://images.unsplash.com/photo-1597318181175-6e6de6be02cb?w=400&h=400&fit=crop", description: "Antioxidant tea" },
  { id: "8", name: "Rose Petal Tea", price: 95, category: "Teas", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop", description: "Relaxing floral tea" },
  { id: "9", name: "Sea Moss", price: 280, category: "Wellness", image: "https://images.unsplash.com/photo-1614251057681-5ff5c4b2e8b6?w=400&h=400&fit=crop", description: "Nutrient-rich superfood" },
  { id: "10", name: "Rooibos Tissue Oil", price: 145, category: "Skincare", image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&h=400&fit=crop", description: "Skin nourishing oil" },
  { id: "11", name: "Carrot Tissue Oil", price: 145, category: "Skincare", image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop", description: "Vitamin-rich oil" },
  { id: "12", name: "Dark Inner Thighs Cream", price: 165, category: "Skincare", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop", description: "Lightening treatment" },
  { id: "13", name: "Stretch Marks Remover", price: 185, category: "Skincare", image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop", description: "Fade stretch marks" },
  { id: "14", name: "Activated Charcoal Scrub", price: 110, category: "Skincare", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop", description: "Deep cleansing scrub" },
  { id: "15", name: "Glow Serum", price: 220, category: "Skincare", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop", description: "Radiance boosting serum" },
];

export const mockIboData = {
  name: "Sarah Johnson",
  rank: "Silver",
  nextRank: "Gold",
  currentSales: 8500,
  targetSales: 10000,
  commission: 2340,
  recruits: 12,
  targetRecruits: 30,
  generation1: 5,
  generation2: 4,
  generation3: 3,
};

export const mockNetworkData = [
  { name: "John Smith", sales: 1500, generation: 1, status: "Active" },
  { name: "Mary Brown", sales: 2200, generation: 1, status: "Active" },
  { name: "David Lee", sales: 900, generation: 2, status: "Active" },
  { name: "Emma Wilson", sales: 1800, generation: 2, status: "Inactive" },
  { name: "Michael Chen", sales: 1200, generation: 3, status: "Active" },
];

export const mockAdminData = {
  totalRevenue: 145000,
  totalIbos: 87,
  activeIbos: 72,
  totalOrders: 342,
  topProducts: [
    { name: "Chlorophyll Juice", sales: 45 },
    { name: "Collagen Powder", sales: 38 },
    { name: "Sea Moss", sales: 32 },
  ],
  topIbos: [
    { name: "Sarah Johnson", sales: 8500, rank: "Silver" },
    { name: "Michael Chen", sales: 7200, rank: "Silver" },
    { name: "Emma Wilson", sales: 6800, rank: "Bronze" },
  ],
};

export const currentUser = {
  name: "Sarah Johnson",
  iboNumber: "IBO001",
  rank: "Silver",
  email: "sarah@example.com"
};

export const mockIbos = [
  { 
    name: "John Smith", 
    iboNumber: "IBO002", 
    sponsorId: "IBO001",
    sales: 1500,
    totalSales: 1500,
    totalCommission: 300,
    generation: 1, 
    status: "Active",
    rank: "Bronze" 
  },
  { 
    name: "Mary Brown", 
    iboNumber: "IBO003", 
    sponsorId: "IBO001",
    sales: 2200,
    totalSales: 2200,
    totalCommission: 484,
    generation: 1, 
    status: "Active",
    rank: "Silver" 
  },
  { 
    name: "David Lee", 
    iboNumber: "IBO004", 
    sponsorId: "IBO002",
    sales: 900,
    totalSales: 900,
    totalCommission: 180,
    generation: 2, 
    status: "Active",
    rank: "Bronze" 
  },
  { 
    name: "Emma Wilson", 
    iboNumber: "IBO005", 
    sponsorId: "IBO003",
    sales: 1800,
    totalSales: 1800,
    totalCommission: 360,
    generation: 2, 
    status: "Inactive",
    rank: "Bronze" 
  },
  { 
    name: "Michael Chen", 
    iboNumber: "IBO006", 
    sponsorId: "IBO002",
    sales: 1200,
    totalSales: 1200,
    totalCommission: 240,
    generation: 3, 
    status: "Active",
    rank: "Bronze" 
  },
  { 
    name: "Lisa Wang", 
    iboNumber: "IBO007", 
    sponsorId: "IBO001",
    sales: 5200,
    totalSales: 5200,
    totalCommission: 1300,
    generation: 1, 
    status: "Active",
    rank: "Gold" 
  },
  { 
    name: "James Rodriguez", 
    iboNumber: "IBO008", 
    sponsorId: "IBO001",
    sales: 8900,
    totalSales: 8900,
    totalCommission: 2670,
    generation: 1, 
    status: "Active",
    rank: "Platinum" 
  },
];
