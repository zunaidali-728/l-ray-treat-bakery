-- 1. Add contact_number to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS contact_number text;

-- 2. Create Addresses Table
CREATE TABLE IF NOT EXISTS addresses (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL, -- e.g., 'Home Sanctuary'
  address_line text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for addresses
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;

-- Policies for addresses
CREATE POLICY "Users can view their own addresses." ON addresses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own addresses." ON addresses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own addresses." ON addresses FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own addresses." ON addresses FOR DELETE USING (auth.uid() = user_id);

-- 3. Add stored payment methods to simplify future checkouts
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS saved_payments jsonb DEFAULT '[]'::jsonb;
