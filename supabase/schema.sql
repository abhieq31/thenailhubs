-- The Nail Hubs — Supabase schema
-- Run this once in the Supabase SQL Editor (Dashboard → SQL Editor → New query → paste → Run).

-- Needed for the overlap (no-double-booking) constraint
create extension if not exists btree_gist;

-- Range type over TIME so two appointments on the same day can't overlap
do $$ begin
  create type timerange as range (subtype = time);
exception when duplicate_object then null;
end $$;

create table if not exists appointments (
  id bigint generated always as identity primary key,
  confirmation_id text not null unique,
  customer_name text not null,
  customer_phone text not null,
  service text not null,
  service_duration integer not null,
  appointment_date date not null,
  appointment_time time not null,
  end_time time not null,
  status text not null default 'confirmed' check (status in ('confirmed', 'cancelled')),
  source text not null default 'website',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (end_time > appointment_time)
);

-- Double bookings are physically impossible: the database itself rejects any
-- confirmed appointment that overlaps another on the same date, even under
-- two simultaneous requests.
do $$ begin
  alter table appointments add constraint appointments_no_overlap
    exclude using gist (
      appointment_date with =,
      timerange(appointment_time, end_time) with &&
    ) where (status = 'confirmed');
exception when duplicate_object then null;
end $$;

create index if not exists idx_appointments_date_status
  on appointments (appointment_date, status);

-- Keep updated_at fresh
create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists appointments_updated_at on appointments;
create trigger appointments_updated_at
  before update on appointments
  for each row execute function set_updated_at();

-- Lock the table down: only the service-role key (used by the website's own
-- API routes) can read/write. No public access.
alter table appointments enable row level security;
