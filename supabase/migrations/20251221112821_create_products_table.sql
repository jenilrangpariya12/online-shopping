-- Create the products table
create table if not exists products (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    name text not null,
    price numeric not null,
    description text,
    image text,
    category text default 'Electronics',
    stock integer default 0
);

-- Basic permissions (Allow anyone to use the table for now)
alter table products enable row level security;

create policy "Allow all access" on products
    for all using (true)
    with check (true);

-- Ensure storage bucket exists
insert into storage.buckets (id, name, public) 
values ('products', 'products', true)
on conflict (id) do nothing;

-- Ensure storage policies exist
drop policy if exists "Public Access" on storage.objects;
drop policy if exists "Allow Upload" on storage.objects;

create policy "Public Access" on storage.objects
    for select using (bucket_id = 'products');

create policy "Allow Upload" on storage.objects
    for insert with check (bucket_id = 'products');