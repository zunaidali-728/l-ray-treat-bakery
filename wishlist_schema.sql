-- Enable UUID extension if not enabled
create extension if not exists "uuid-ossp";

-- Create Wishlist Table
create table wishlist (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  product_id uuid references products(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- ensure a user can only wishlist a specific product once
  unique(user_id, product_id)
);

-- Enable RLS
alter table wishlist enable row level security;

-- Policies for Wishlist
create policy "Users can view their own wishlist items." on wishlist for select using (auth.uid() = user_id);
create policy "Users can insert their own wishlist items." on wishlist for insert with check (auth.uid() = user_id);
create policy "Users can delete their own wishlist items." on wishlist for delete using (auth.uid() = user_id);
