-- ===============================================
-- L'RAY TREAT: PHASE 2 DATABASE EXPANSION
-- Run this securely in your Supabase SQL Editor
-- ===============================================

-- Enable UUID extension if not enabled natively
create extension if not exists "uuid-ossp";

-- ===============================================
-- 1. CUSTOM CAKES TABLE
-- ===============================================
create table if not exists custom_cakes (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  full_name text not null,
  contact_number text not null,
  occasion_date date not null,
  shape text not null,
  size text not null,
  tiers integer not null default 1,
  flavour text not null,
  frosting text not null,
  frosting_color text,
  decorations text[], -- Array of strings
  theme text not null,
  message text,
  vision text,
  estimated_price numeric(10,2) not null,
  status text not null default 'pending_approval', -- 'pending_approval', 'approved', 'in_preparation', 'ready', 'delivered', 'rejected'
  admin_note text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table custom_cakes enable row level security;
create policy "Users can view their own custom cakes." on custom_cakes for select using (auth.uid() = user_id);
create policy "Users can insert their own custom cakes." on custom_cakes for insert with check (auth.uid() = user_id);

-- ===============================================
-- 2. REVIEWS TABLE
-- ===============================================
create table if not exists reviews (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  order_id uuid not null, -- Intentionally loose mapping to allow feedback on regular orders
  food_quality integer not null check (food_quality between 1 and 5),
  presentation integer not null check (presentation between 1 and 5),
  value_for_money integer not null check (value_for_money between 1 and 5),
  packaging integer not null check (packaging between 1 and 5),
  overall_rating numeric(2,1) not null,
  review_text text,
  photo_url text,
  user_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table reviews enable row level security;
create policy "Public reviews are viewable by everyone." on reviews for select using (true);
create policy "Users can insert their own reviews." on reviews for insert with check (auth.uid() = user_id);
create policy "Users can update their own reviews." on reviews for update using (auth.uid() = user_id);

-- ===============================================
-- 3. EXPANDED MENU ITEMS (PRODUCTS TABLE)
-- ===============================================
-- SWEETS & DESSERTS
insert into products (id, name, description, price, image_url, category, is_bestseller, is_chefs_choice, dietary_type)
values 
  (uuid_generate_v4(), 'Chocolate Lava Cake', 'Warm dark chocolate centre, dusted with cocoa snow', 180.00, 'https://source.unsplash.com/400x300/?chocolate,lava,cake', 'dessert', true, true, 'veg'),
  (uuid_generate_v4(), 'Mishti Doi', 'Classic Bengali sweetened yogurt, chilled and caramelised', 80.00, 'https://source.unsplash.com/400x300/?bengali,sweet,yogurt', 'dessert', true, false, 'veg'),
  (uuid_generate_v4(), 'Rasgolla', 'Soft chenna dumplings soaked in light sugar syrup', 60.00, 'https://source.unsplash.com/400x300/?rasgolla,sweet', 'dessert', false, false, 'veg'),
  (uuid_generate_v4(), 'Sandesh', 'Melt-in-mouth chenna sweet, flavoured with cardamom and saffron', 70.00, 'https://source.unsplash.com/400x300/?sandesh,sweet', 'dessert', false, true, 'veg'),
  (uuid_generate_v4(), 'Gulab Jamun', 'Deep-fried milk-solid dumplings in rose-scented syrup', 90.00, 'https://source.unsplash.com/400x300/?gulab,jamun,dessert', 'dessert', true, false, 'veg'),
  (uuid_generate_v4(), 'Tiramisu', 'Italian espresso-soaked layered dessert with mascarpone cream', 220.00, 'https://source.unsplash.com/400x300/?tiramisu,dessert', 'dessert', false, false, 'veg'),
  (uuid_generate_v4(), 'Mango Panna Cotta', 'Silky vanilla panna cotta with Alphonso mango coulis', 190.00, 'https://source.unsplash.com/400x300/?mango,panna,cotta', 'dessert', false, true, 'veg'),
  (uuid_generate_v4(), 'Brownie Sundae', 'Warm dark chocolate brownie with vanilla bean ice cream', 210.00, 'https://source.unsplash.com/400x300/?brownie,sundae', 'dessert', true, false, 'veg'),
  (uuid_generate_v4(), 'Payesh', 'Bengali rice kheer with milk, cardamom, and bay leaf', 100.00, 'https://source.unsplash.com/400x300/?kheer,payesh', 'dessert', false, false, 'veg'),
  (uuid_generate_v4(), 'Chum Chum', 'Cylindrical chenna sweet rolled in coconut or mawa', 65.00, 'https://source.unsplash.com/400x300/?chum,chum,sweet', 'dessert', false, false, 'veg');

-- BEVERAGES
insert into products (id, name, description, price, image_url, category, is_bestseller, is_chefs_choice, dietary_type)
values 
  (uuid_generate_v4(), 'Darjeeling First Flush Tea', 'Delicate floral notes from the foothills of the Himalayas', 120.00, 'https://source.unsplash.com/400x300/?darjeeling,tea,cup', 'beverage', true, true, 'veg'),
  (uuid_generate_v4(), 'Cold Brew Coffee', '18-hour cold steeped single-origin Coorg coffee', 160.00, 'https://source.unsplash.com/400x300/?cold,brew,coffee', 'beverage', true, false, 'veg'),
  (uuid_generate_v4(), 'Masala Chai', 'Spiced milk tea with ginger, cardamom, cinnamon and tulsi', 80.00, 'https://source.unsplash.com/400x300/?masala,chai,tea', 'beverage', true, false, 'veg'),
  (uuid_generate_v4(), 'Espresso', 'Double shot, rich crema, served with sparkling water', 130.00, 'https://source.unsplash.com/400x300/?espresso,coffee', 'beverage', false, true, 'veg'),
  (uuid_generate_v4(), 'Iced Caramel Latte', 'Cold milk, espresso, caramel drizzle, ice', 180.00, 'https://source.unsplash.com/400x300/?iced,caramel,latte', 'beverage', false, false, 'veg'),
  (uuid_generate_v4(), 'Mango Lassi', 'Thick chilled yogurt drink blended with Alphonso mango', 140.00, 'https://source.unsplash.com/400x300/?mango,lassi,drink', 'beverage', true, false, 'veg'),
  (uuid_generate_v4(), 'Nimbu Pani', 'Fresh-squeezed lime soda with black salt and mint', 70.00, 'https://source.unsplash.com/400x300/?nimbu,pani,drink', 'beverage', false, false, 'veg'),
  (uuid_generate_v4(), 'Virgin Mojito', 'Crushed mint, lime, soda, sugar syrup with crushed ice', 130.00, 'https://source.unsplash.com/400x300/?virgin,mojito,drink', 'beverage', false, false, 'veg'),
  (uuid_generate_v4(), 'Hot Chocolate', 'Belgian dark chocolate, steamed whole milk, cream rosette', 160.00, 'https://source.unsplash.com/400x300/?hot,chocolate,mug', 'beverage', true, true, 'veg'),
  (uuid_generate_v4(), 'Rose Sharbat', 'Chilled rose syrup drink with basil seeds and lemon', 90.00, 'https://source.unsplash.com/400x300/?rose,drink', 'beverage', false, false, 'veg');
