CREATE TABLE IF NOT EXISTS updates (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_type
    WHERE typname = 'internship_track'
  ) THEN
    CREATE TYPE internship_track AS ENUM (
      'networking_internet_tech',
      'software_development',
      'computer_systems_architecture'
    );
  END IF;
END
$$;

CREATE TABLE IF NOT EXISTS applications (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  university TEXT NOT NULL,
  year_of_study TEXT NOT NULL,
  track internship_track NOT NULL,
  motivation TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);