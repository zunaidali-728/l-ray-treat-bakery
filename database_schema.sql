-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Create Profiles Table (Triggered on Auth Signup)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  avatar_url text,
  loyalty_points integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on Row Level Security (RLS)
alter table profiles enable row level security;
create policy "Public profiles are viewable by everyone." on profiles for select using (true);
create policy "Users can insert their own profile." on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);

-- 2. Create Orders Table
create table orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete set null,
  items jsonb not null default '[]'::jsonb,
  total_amount decimal(10,2) not null,
  status text not null default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on Row Level Security (RLS)
alter table orders enable row level security;
create policy "Users can view their own orders." on orders for select using (auth.uid() = user_id);
create policy "Users can insert their own orders." on orders for insert with check (auth.uid() = user_id);

-- Optional: Function to automatically create a profile after signup
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for the function
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
