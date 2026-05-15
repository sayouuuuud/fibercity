-- ========================================================================
-- Fiber City — Supabase schema
-- Run this SQL in the Supabase SQL editor (or psql) on a fresh project.
-- Idempotent enough to re-run safely except for seed inserts.
-- ========================================================================
 
create extension if not exists "pgcrypto";
 
-- ---------- helper trigger ----------
create or replace function public.tg_set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;
 
-- ---------- profiles (mirrors auth.users) ---------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'viewer' check (role in ('admin','editor','viewer')),
  created_at timestamptz not null default now()
);
 
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public, auth as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;
 
create or replace function public.is_editor_or_admin()
returns boolean language sql stable security definer set search_path = public, auth as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin','editor')
  );
$$;
 
-- Auto-create a profile when a new auth user is created.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public, auth as $$
declare
  v_count integer;
  v_role text := 'viewer';
begin
  select count(*) into v_count from public.profiles;
  if v_count = 0 then
    v_role := 'admin';
  end if;
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', null), v_role)
  on conflict (id) do nothing;
  return new;
end $$;
 
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();
 
alter table public.profiles enable row level security;
 
drop policy if exists "profiles read self or admin" on public.profiles;
create policy "profiles read self or admin" on public.profiles
for select using (auth.uid() = id or public.is_admin());
 
drop policy if exists "profiles update admin" on public.profiles;
create policy "profiles update admin" on public.profiles
for update using (public.is_admin()) with check (public.is_admin());
 
drop policy if exists "profiles insert admin" on public.profiles;
create policy "profiles insert admin" on public.profiles
for insert with check (public.is_admin());
 
-- ---------- works ----------
create table if not exists public.works (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_en text not null,
  title_ar text,
  excerpt_en text,
  excerpt_ar text,
  content_en text,
  content_ar text,
  cover_image text,
  gallery jsonb default '[]'::jsonb,
  category text,
  client text,
  location_en text,
  location_ar text,
  year text,
  meta jsonb default '{}'::jsonb,
  status text not null default 'published' check (status in ('draft','published')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists works_status_idx on public.works(status);
create index if not exists works_category_idx on public.works(category);
drop trigger if exists works_set_updated_at on public.works;
create trigger works_set_updated_at before update on public.works
for each row execute function public.tg_set_updated_at();
 
alter table public.works enable row level security;
drop policy if exists "works public read" on public.works;
create policy "works public read" on public.works
for select using (status = 'published' or public.is_editor_or_admin());
drop policy if exists "works editor write" on public.works;
create policy "works editor write" on public.works
for all using (public.is_editor_or_admin()) with check (public.is_editor_or_admin());
 
-- ---------- news ----------
create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_en text not null,
  title_ar text,
  excerpt_en text,
  excerpt_ar text,
  content_en text,
  content_ar text,
  cover_image text,
  category text,
  author text,
  read_minutes integer not null default 5,
  status text not null default 'published' check (status in ('draft','published')),
  published_at timestamptz default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists news_status_idx on public.news(status);
create index if not exists news_published_at_idx on public.news(published_at desc);
drop trigger if exists news_set_updated_at on public.news;
create trigger news_set_updated_at before update on public.news
for each row execute function public.tg_set_updated_at();
 
alter table public.news enable row level security;
drop policy if exists "news public read" on public.news;
create policy "news public read" on public.news
for select using (status = 'published' or public.is_editor_or_admin());
drop policy if exists "news editor write" on public.news;
create policy "news editor write" on public.news
for all using (public.is_editor_or_admin()) with check (public.is_editor_or_admin());
 
-- ---------- partners ----------
create table if not exists public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  website_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);
alter table public.partners enable row level security;
drop policy if exists "partners public read" on public.partners;
create policy "partners public read" on public.partners
for select using (true);
drop policy if exists "partners editor write" on public.partners;
create policy "partners editor write" on public.partners
for all using (public.is_editor_or_admin()) with check (public.is_editor_or_admin());
 
-- ---------- services ----------
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  icon text,
  title_en text not null,
  title_ar text,
  description_en text,
  description_ar text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);
alter table public.services enable row level security;
drop policy if exists "services public read" on public.services;
create policy "services public read" on public.services
for select using (true);
drop policy if exists "services editor write" on public.services;
create policy "services editor write" on public.services
for all using (public.is_editor_or_admin()) with check (public.is_editor_or_admin());
 
-- ---------- customers ----------
create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_en text not null,
  name_ar text,
  industry text,
  tier text check (tier in ('Enterprise','Growth','Starter')) default 'Growth',
  region_en text,
  region_ar text,
  description_en text,
  description_ar text,
  logo_url text,
  cover_image text,
  website_url text,
  since text,
  projects_count integer not null default 0,
  testimonial_en text,
  testimonial_ar text,
  testimonial_author text,
  featured boolean not null default false,
  sort_order integer not null default 0,
  status text not null default 'published' check (status in ('draft','published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists customers_status_idx on public.customers(status);
create index if not exists customers_tier_idx on public.customers(tier);
drop trigger if exists customers_set_updated_at on public.customers;
create trigger customers_set_updated_at before update on public.customers
for each row execute function public.tg_set_updated_at();
 
alter table public.customers enable row level security;
drop policy if exists "customers public read" on public.customers;
create policy "customers public read" on public.customers
for select using (status = 'published' or public.is_editor_or_admin());
drop policy if exists "customers editor write" on public.customers;
create policy "customers editor write" on public.customers
for all using (public.is_editor_or_admin()) with check (public.is_editor_or_admin());
 
-- ---------- contact_messages ----------
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  company text,
  subject text,
  message text not null,
  status text not null default 'new' check (status in ('new','read','archived')),
  created_at timestamptz not null default now()
);
alter table public.contact_messages enable row level security;
drop policy if exists "contact_messages public insert" on public.contact_messages;
create policy "contact_messages public insert" on public.contact_messages
for insert with check (true);
drop policy if exists "contact_messages admin read" on public.contact_messages;
create policy "contact_messages admin read" on public.contact_messages
for select using (public.is_editor_or_admin());
drop policy if exists "contact_messages admin write" on public.contact_messages;
create policy "contact_messages admin write" on public.contact_messages
for update using (public.is_editor_or_admin()) with check (public.is_editor_or_admin());
drop policy if exists "contact_messages admin delete" on public.contact_messages;
create policy "contact_messages admin delete" on public.contact_messages
for delete using (public.is_editor_or_admin());
 
-- ---------- page_views ----------
create table if not exists public.page_views (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  referrer text,
  user_agent text,
  device text,
  country text,
  session_id text,
  locale text,
  created_at timestamptz not null default now()
);
create index if not exists page_views_created_at_idx on public.page_views(created_at desc);
create index if not exists page_views_path_idx on public.page_views(path);
alter table public.page_views enable row level security;
-- writes go through RPC only — block direct inserts/selects from clients.
drop policy if exists "page_views admin read" on public.page_views;
create policy "page_views admin read" on public.page_views
for select using (public.is_editor_or_admin());
 
create or replace function public.record_page_view(
  _path text,
  _referrer text,
  _user_agent text,
  _device text,
  _session_id text,
  _locale text
) returns uuid
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  new_id uuid;
begin
  insert into public.page_views (path, referrer, user_agent, device, session_id, locale)
  values (_path, _referrer, _user_agent, _device, _session_id, _locale)
  returning id into new_id;
  return new_id;
end $$;
grant execute on function public.record_page_view(text, text, text, text, text, text) to anon, authenticated;
 
-- ---------- site_settings ----------
create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.site_settings enable row level security;
drop policy if exists "site_settings public read" on public.site_settings;
create policy "site_settings public read" on public.site_settings
for select using (true);
drop policy if exists "site_settings admin write" on public.site_settings;
create policy "site_settings admin write" on public.site_settings
for all using (public.is_editor_or_admin()) with check (public.is_editor_or_admin());
 
-- ---------- media ----------
create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  public_id text,
  alt text,
  width integer,
  height integer,
  format text,
  bytes integer,
  created_at timestamptz not null default now()
);
alter table public.media enable row level security;
drop policy if exists "media public read" on public.media;
create policy "media public read" on public.media
for select using (true);
drop policy if exists "media editor write" on public.media;
create policy "media editor write" on public.media
for all using (public.is_editor_or_admin()) with check (public.is_editor_or_admin());
 
-- =========================================================================
-- Analytics views (admin only)
-- =========================================================================
create or replace view public.v_visits_by_day as
select to_char(created_at, 'MM-DD') as day, count(*)::int as visits
from public.page_views
where created_at >= now() - interval '30 days'
group by 1
order by 1 asc;
 
create or replace view public.v_top_pages as
select path, count(*)::int as visits
from public.page_views
where created_at >= now() - interval '30 days'
group by 1
order by visits desc;
 
create or replace view public.v_top_referrers as
select coalesce(referrer, '(direct)') as referrer, count(*)::int as visits
from public.page_views
where created_at >= now() - interval '30 days'
group by 1
order by visits desc;
 
create or replace view public.v_device_breakdown as
select coalesce(device, 'unknown') as device, count(*)::int as visits
from public.page_views
where created_at >= now() - interval '30 days'
group by 1
order by visits desc;
 
-- =========================================================================
-- Seed data — safe to skip if you already inserted content.
-- =========================================================================
insert into public.services (slug, icon, title_en, title_ar, description_en, description_ar, sort_order)
values
  ('design','Compass','Optical Network Design','تصميم الشبكات البصرية',
    'Link-budget engineering, splice plans, and acceptance documentation built around your operating life.',
    'هندسة ميزان الخسائر، خرائط اللحام، ووثائق الاستلام المبنية على عمر التشغيل لديك.', 10),
  ('supply','Layers','Supply & Logistics','التوريد واللوجستيات',
    'OFC, OPGW, ADSS, OEMs and accessories — sourced, tested, and traceable to the reel.',
    'كابلات OFC وOPGW وADSS وملحقاتها — مورّدة ومختبرة وقابلة للتتبع حتى رقم البكرة.', 20),
  ('installation','Wrench','Installation & Splicing','التركيب واللحام',
    'Fusion splicing, OTDR/OLTS testing, and rapid cutovers with zero-defect handover.',
    'لحام بالاندماج، اختبارات OTDR/OLTS، وتحويلات سريعة بدون عيوب.', 30),
  ('maintenance','LifeBuoy','Maintenance & Repair','الصيانة والإصلاح',
    'On-call repair, preventive inspections, and 24/7 incident response across Egypt.',
    'صيانة طارئة، تفتيش وقائي، واستجابة 24/7 في جميع أنحاء مصر.', 40)
on conflict (slug) do nothing;
 
insert into public.partners (name, logo_url, website_url, sort_order) values
  ('Vodafone Egypt','/images/customer-vodafone.svg','https://www.vodafone.com.eg', 10),
  ('WE','/images/customer-we.svg','https://www.te.eg', 20),
  ('Orange Egypt','/images/customer-orange.svg','https://www.orange.eg', 30),
  ('Smart Village','/images/customer-smart-village.svg', null, 40),
  ('Madinaty','/images/customer-madinaty.svg', null, 50),
  ('ITIDA','/images/customer-itida.svg', null, 60)
on conflict do nothing;
 
insert into public.customers (
  slug, name_en, name_ar, industry, tier, region_en, region_ar,
  description_en, description_ar, logo_url, cover_image, website_url,
  since, projects_count, testimonial_en, testimonial_ar, testimonial_author,
  featured, sort_order
) values
  ('vodafone-egypt','Vodafone Egypt','فودافون مصر','Telecom','Enterprise','Nationwide','على مستوى الجمهورية',
    'Tier-1 mobile operator. Long-term framework partner across FTTX and backhaul.',
    'مشغّل Tier-1 للاتصالات المحمولة. شريك إطاري طويل الأجل في FTTX و backhaul.',
    '/images/customer-vodafone.svg','/images/project-1.jpg','https://www.vodafone.com.eg',
    '2016', 184,
    'Fiber City''s engineering documentation has set a new internal benchmark for our acceptance teams.',
    'وثائق فايبر سيتي الهندسية وضعت معياراً داخلياً جديداً لفرق الاستلام لدينا.',
    'VP Network Engineering', true, 10),
  ('we-telecom-egypt','WE — Telecom Egypt','وي — المصرية للاتصالات','Telecom','Enterprise','Nationwide','على مستوى الجمهورية',
    'National fixed-line carrier. Long-haul backbone, GPON, and ODN programmes.',
    'المشغّل الوطني للخطوط الثابتة. برامج long-haul و GPON و ODN.',
    '/images/customer-we.svg','/images/project-2.jpg','https://www.te.eg',
    '2015', 220,
    'They run our most demanding cutovers without us needing to be in the field.',
    'ينفّذون أصعب عمليات التحويل دون حاجة إلى حضورنا في الميدان.',
    'Director, Outside Plant', true, 20),
  ('orange-egypt','Orange Egypt','أورانج مصر','Telecom','Enterprise','Lower & Upper Egypt','الدلتا والصعيد',
    'Tier-1 carrier. ADSS aerial migrations and microwave-to-fibre backhaul.',
    'مشغّل Tier-1. تحويلات ADSS الهوائية و backhaul من المايكروويف إلى الألياف.',
    '/images/customer-orange.svg','/images/project-4.jpg','https://www.orange.eg',
    '2018', 96, null, null, null, false, 30),
  ('smart-village','Smart Village','القرية الذكية','Real Estate','Growth','Giza','الجيزة',
    'Tech business park. Campus-wide FTTO and tenant-grade splicing.',
    'مجمع أعمال تقني. FTTO داخل الحرم و وصلات بجودة المستأجرين.',
    '/images/customer-smart-village.svg','/images/project-3.jpg', null,
    '2020', 32, null, null, null, false, 40),
  ('madinaty','Madinaty','مدينتي','Real Estate','Growth','Cairo East','شرق القاهرة',
    'Master-planned community. Premium FTTH for 100k+ residents.',
    'مجتمع عمراني متكامل. FTTH بريميوم لأكثر من 100 ألف ساكن.',
    '/images/customer-madinaty.svg','/images/project-5.jpg', null,
    '2019', 58,
    'Highest first-time acceptance rates in our project''s history. Fiber City changed what quality means to us.',
    'أعلى معدلات استلام أولى في تاريخ مشروعنا. فايبر سيتي تغير معنى الجودة.',
    'Head of IT, Madinaty', true, 50),
  ('itida','ITIDA','إيتيدا','Government','Starter','Cairo','القاهرة',
    'Government technology authority. Secure inter-building dark-fibre links.',
    'هيئة تكنولوجيا المعلومات. وصلات Dark Fibre تامّنة بين المباني.',
    '/images/customer-itida.svg','/images/project-6.jpg', null,
    '2022', 8, null, null, null, false, 60)
on conflict (slug) do nothing;
 
insert into public.site_settings (key, value) values
  ('contact_info', jsonb_build_object(
    'address_en','12 Cornish El-Nile, Maadi, Cairo, Egypt',
    'address_ar','12 كورنيش النيل، المعادي، القاهرة، مصر',
    'phone','+20 2 2528 4488',
    'email','engineering@fibercity.eg',
    'whatsapp','+201234567890',
    'map_lat',29.9602,
    'map_lng',31.2569,
    'instagram','https://instagram.com/fibercity',
    'linkedin','https://linkedin.com/company/fibercity',
    'twitter','https://x.com/fibercity',
    'facebook','https://facebook.com/fibercity'
  )),
  ('hero_stats', jsonb_build_object(
    'fiber_laid','12,400 km',
    'homes_passed','480k',
    'splice_joints','1.2M',
    'uptime','99.997%',
    'years_active','18',
    'projects_delivered','340+'
  )),
  ('brand', jsonb_build_object(
    'name_en','Fiber City',
    'name_ar','فايبر سيتي',
    'tagline_en','Fiber Optic Infrastructure · Egypt',
    'tagline_ar','بنية تحتية للألياف الضوئية · مصر'
  )),
  ('home_hero', jsonb_build_object(
    'eyebrow_en','Fiber Optic Infrastructure · B2B · Egypt',
    'eyebrow_ar','بنية تحتية للألياف الضوئية · B2B · مصر',
    'body_en','Fiber City designs, supplies, installs and maintains optical networks for Egypt''s most demanding telecom operators and enterprises. From the first site survey to the last splice — one partner, end to end.',
    'body_ar','فايبر سيتي تُصمّم وتُورّد وتُركّب وتُصلِح الشبكات البصرية لأكبر شركات الاتصالات والمؤسسات في مصر. من أول معاينة موقع إلى آخر وصلة لحام — شريك واحد، من النهاية إلى النهاية.'
  ))
on conflict (key) do update set value = excluded.value, updated_at = now();
 


-- =========================================================================
-- Extended CMS tables for the professional admin panel
-- =========================================================================

create table if not exists public.site_pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_en text not null,
  title_ar text,
  seo_title text,
  seo_description text,
  status text not null default 'published' check (status in ('draft','published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists site_pages_set_updated_at on public.site_pages;
create trigger site_pages_set_updated_at before update on public.site_pages
for each row execute function public.tg_set_updated_at();

alter table public.site_pages enable row level security;
drop policy if exists "site_pages public read" on public.site_pages;
create policy "site_pages public read" on public.site_pages
for select using (status = 'published' or public.is_editor_or_admin());
drop policy if exists "site_pages editor write" on public.site_pages;
create policy "site_pages editor write" on public.site_pages
for all using (public.is_editor_or_admin()) with check (public.is_editor_or_admin());

create table if not exists public.page_sections (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references public.site_pages(id) on delete cascade,
  section_key text not null,
  title_en text,
  title_ar text,
  body_en text,
  body_ar text,
  image_url text,
  data jsonb not null default '{}'::jsonb,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(page_id, section_key)
);

drop trigger if exists page_sections_set_updated_at on public.page_sections;
create trigger page_sections_set_updated_at before update on public.page_sections
for each row execute function public.tg_set_updated_at();

alter table public.page_sections enable row level security;
drop policy if exists "page_sections public read" on public.page_sections;
create policy "page_sections public read" on public.page_sections
for select using (true);
drop policy if exists "page_sections editor write" on public.page_sections;
create policy "page_sections editor write" on public.page_sections
for all using (public.is_editor_or_admin()) with check (public.is_editor_or_admin());

create table if not exists public.admin_activity (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists admin_activity_created_at_idx on public.admin_activity(created_at desc);
alter table public.admin_activity enable row level security;
drop policy if exists "admin_activity admin read" on public.admin_activity;
create policy "admin_activity admin read" on public.admin_activity
for select using (public.is_editor_or_admin());
drop policy if exists "admin_activity admin insert" on public.admin_activity;
create policy "admin_activity admin insert" on public.admin_activity
for insert with check (public.is_editor_or_admin());

insert into public.site_pages (slug, title_en, title_ar, seo_title, seo_description) values
  ('home','Home','الرئيسية','Fiber City — Fiber Optic Infrastructure','Fiber optic infrastructure design, supply, installation, testing and maintenance in Egypt.'),
  ('about','About us','من نحن','About Fiber City','Meet the engineering team behind Fiber City optical infrastructure programmes.'),
  ('work','Works','أعمالنا','Fiber City Works','Selected FTTH, backbone, data centre, audit and maintenance projects.'),
  ('news','News','الأخبار','Fiber City News','Company announcements and field notes from Fiber City.'),
  ('contact','Contact','تواصل معنا','Contact Fiber City','Send Fiber City a project brief, BOQ, audit request or maintenance ticket.')
on conflict (slug) do update set
  title_en = excluded.title_en,
  title_ar = excluded.title_ar,
  seo_title = excluded.seo_title,
  seo_description = excluded.seo_description,
  updated_at = now();

insert into public.page_sections (page_id, section_key, title_en, title_ar, body_en, body_ar, data, sort_order)
select p.id, section_key, title_en, title_ar, body_en, body_ar, data, sort_order
from public.site_pages p
cross join (values
  ('hero','Light moves through glass. We move it across Egypt.','الضوء يتحرك داخل الزجاج. ونحن نحركه عبر مصر.', 'Fiber City designs, supplies, installs and maintains optical networks for telecom operators and enterprises.', 'فايبر سيتي تصمم وتورد وتركب وتدير الشبكات البصرية لشركات الاتصالات والمؤسسات.', '{"cta":"Start a Project"}'::jsonb, 10),
  ('stats','Numbers that prove delivery','أرقام تثبت التنفيذ', 'Track kilometres, projects, acceptance rate, and active clients from the dashboard.', 'تتبع الكيلومترات والمشاريع ونسب القبول والعملاء من لوحة التحكم.', '{"editable":true}'::jsonb, 20),
  ('contact','Send a project brief','أرسل تفاصيل مشروعك', 'Contact submissions are stored in contact_messages after Supabase is connected.', 'يتم تخزين رسائل التواصل في contact_messages بعد ربط Supabase.', '{"form":"contact_messages"}'::jsonb, 30)
) as s(section_key, title_en, title_ar, body_en, body_ar, data, sort_order)
where p.slug in ('home','contact')
on conflict (page_id, section_key) do update set
  title_en = excluded.title_en,
  title_ar = excluded.title_ar,
  body_en = excluded.body_en,
  body_ar = excluded.body_ar,
  data = excluded.data,
  sort_order = excluded.sort_order,
  updated_at = now();

-- =========================================================================
-- Done. Next steps:
--   1) Create your first admin user via Supabase Auth (Email & password).
--      The first ever user becomes 'admin' automatically.
--   2) For subsequent users, the trigger sets role = 'viewer' by default.
--      Sign in to /admin/users to promote them.
-- =========================================================================