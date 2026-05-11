CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  tagline TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  brand TEXT DEFAULT '',
  price NUMERIC(10,2) NOT NULL,
  old_price NUMERIC(10,2),
  discount TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS offers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  description TEXT DEFAULT '',
  price TEXT DEFAULT '',
  tag TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contact (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone TEXT DEFAULT '',
  whatsapp TEXT DEFAULT '',
  address TEXT DEFAULT '',
  address_ar TEXT DEFAULT '',
  hours TEXT DEFAULT '',
  hours_ar TEXT DEFAULT '',
  facebook TEXT DEFAULT '',
  maps_query TEXT DEFAULT '',
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  items JSONB NOT NULL DEFAULT '[]',
  notes TEXT DEFAULT '',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
