-- Enable UUID extension if not enabled natively
create extension if not exists "uuid-ossp";

-- 1. Create Products Table
create table products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  price decimal(10,2) not null,
  image_url text,
  category text not null, -- 'pizza', 'pasta', 'dessert', 'beverage', 'cake'
  is_bestseller boolean default false,
  is_chefs_choice boolean default false,
  dietary_type text default 'veg' -- 'veg', 'non-veg'
);

-- Turn on Row Level Security (RLS)
alter table products enable row level security;
-- Products should be read-only for public/authenticated users
create policy "Public products are viewable by everyone." on products for select using (true);
-- Admin insertions can be handled elsewhere, we secure insert/update
-- create policy "Admins can manage products." on products ... (left generic for future)

-- 2. Seed Mock Data
insert into products (id, name, description, price, image_url, category, is_bestseller, is_chefs_choice, dietary_type)
values 
  ('1e48eb80-0aee-4cff-8f19-b22de7d49ba1'::uuid, 'Chicken Tomatina', 'Zesty tomato sauce, grilled chicken breast, sun-dried tomatoes, and fresh mozzarella.', 360.00, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvzn8bpBTSnC2mr6n-8ArP-TcQGhFSxG94ogH-3hmVdq-2AbPMJPqVO43nbn4P0yWVONpjxaZa04fN0p4iGUVFblv-NsgVX6z6iqqjzhOXTUcsavSUCqqxW6plmt_aSwcBqvnwjWMzTx_UHw5NwsFTGZWjx-HqvaFGuBb4hGyNUyrWZG0CFvghGdzqBsFaktzzvfLr_VV8lpHPIFlLMCs12gxijVnRzLTFQB5FgvGULamdMc69lwilVA-c6T1Sep5ztb_EFBrRX4Yq', 'pizza', true, false, 'non-veg'),
  ('2e48eb80-0aee-4cff-8f19-b22de7d49ba2'::uuid, 'Double Mushroom Garlic', 'Portobello and button mushrooms with a heavy garlic confit and white truffle oil drizzle.', 370.00, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJftte4OoHZaKj5PBlzhp4BzcZ7Vtz3rE1X__qzaMROhJTAHzuW0CVvE1CCrGDghPbBEt_cstDowsHiH6GZC6FKgM_qavJ2gdg0iECVCuapTzmJ9RhLa_ak-sARdLk1A8CG_raC92KpAd8miOlDpT3EuStiyBHSbBv0WzWTBQbmtvhnZte7xZbiu7Mbp6tTq5w-2n1syHZVnjPzqnb9Mndp82E2Hc5y1GwfMyKpSiGq79Z3_86VYlvOsJ4OGxdvphwSYZEnsqTmg2p', 'pizza', false, false, 'veg'),
  ('3e48eb80-0aee-4cff-8f19-b22de7d49ba3'::uuid, 'Chicken Hawaiian', 'Tropical sweetness meets savory chicken on stone-baked crust.', 390.00, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBF_joND8Dy6IJ6TSFgU-2HAifqVaUTqEMy_9JKO_ve9Vc1rErWWo3RTZe8KiMJeXVPLJaWcE2Gyqr-tvtKBkXa7d6CtLCKac_Ivmu6Lqn20JFj84EmkObzhJ9mxvA74CU0zdLmSHLoTJep440K-NUqJhQUQDnHjHfskN5mtwrgsLMl9INjGJUrv3FBDatL7uYPXhxEZpgZpCpgjCNq8701qAZqpcfUTElewEWWxd-hrVcN5L7AVNAOTotWVT1wPYvWkNdH-BXpppyz', 'pizza', true, false, 'non-veg'),
  ('4e48eb80-0aee-4cff-8f19-b22de7d49ba4'::uuid, 'Meatball Dynamite', 'Juicy lamb meatballs glazed in spicy Dynamite sauce.', 420.00, 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzQ0EkLsoxMtSaonqn1ghTNGIuXFkzx2I7CIprTrUg4ehKixhiQyHTVcUwevwGmA8isLCddqom0vPM2eQN-5W_H1u0rF3WKgrg1uk8RPQdENyxdVv0HVFArbXtfSXV2cr1ef6NBBBXMSRp8OHclO_jrA5IvOd3al7Hrp_9Kpfk3GsYZ52GjI6TvfHlWvOvbrj_yA_sgT2bi47ug0pHO8ycfaedH8xJZDez4ObOcegheZAFcRKpxyeVzf8qkoWNAbQatUAuiyg42Wff', 'pizza', false, true, 'non-veg'),
  ('5e48eb80-0aee-4cff-8f19-b22de7d49ba5'::uuid, 'Chicken Arrabiata', 'Penne tossed in a spicy, slow-simmered tomato sauce with succulent chicken chunks.', 340.00, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHJYlyAesaMgFMGnNXjGlmDeWYPHsjAnYzDdv2p2dSoYIgxVbjcYH33UN9ErAq7e0HX9BYtToF-rK_9BPWwouInSLmrMySwgUJDMRYuRinphvE5U8zSZODD4LPfe3CRxJ9568wg_fwgj61jL1_WEJc8fNqFxIjzP25VIgDtDvDSCSwxDxCbCdDFFPMFlOvm3nR6_Pr8Tw_7GWZCURtf6KB6lWA_ID8xP-j2eH7n9XtWzW4Vm1S5LcLexYKAUGI4zu7FUiY7wlnZC4n', 'pasta', false, false, 'non-veg'),
  ('6e48eb80-0aee-4cff-8f19-b22de7d49ba6'::uuid, 'The Apu Trilogy Sourdough', 'Seared Artisan Crust. Classic masterpiece.', 150.00, 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7IBOmodVnO0SUsPHrEHDNil5QWCHWdK2hQKZVL1XPpWpP85vBya4aSRi0s1TcIGRx7ru_LVEidNI0VN6mLwxlyT8B3U-P7RxZt6-yaEYQU-NaWBYNVh3nDxycJ3IhqBikFk2S93DbZW6T5ccOYGWsLOLp3JtDaM28RSFm-UXlUaOaF4kqv8h5XADafgmEVIwyASKUDRRaXbXD_oWyMFEvzdctiVKAHuAQfYeLgNhaLmoM2cOIP-08RZ-m27KQWdig3bnQDI2g7DQ3', 'bakery', false, true, 'veg'),
  ('7e48eb80-0aee-4cff-8f19-b22de7d49ba7'::uuid, 'Director''s Dark Cocoa Tart', 'Melt in your mouth dark chocolate ganache pie.', 250.00, 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-W1B7W--icZLrIT4lFqT7fQJowde99ZIjdZHVPDtPaPwMuNpwJWe9mrYPIdcVuRIlCG7D6QNa9yx4gLOfroC1rBoNu9t_7eDgTsyipj8JzL6hCoatzgkN9yEqvUTXk86JkUJvYcQbXxh_jUuYc36nNrgniSK6oCpRy46MkB5ETylU27aloAjfWdVI9uxMLxpTVYf7vldRmSxBN5pccyARYX6eZftj7cpIjj1HwASH7jS3u3ahCCqjelgfT-x5ye7IoF4OC8-_zIRe', 'dessert', true, false, 'veg');
