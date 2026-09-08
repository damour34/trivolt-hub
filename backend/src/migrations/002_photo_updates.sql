-- Add update type to existing updates
ALTER TABLE updates
ADD COLUMN IF NOT EXISTS type TEXT NOT NULL DEFAULT 'TEXT';

-- Only allow TEXT or PHOTO
ALTER TABLE updates
DROP CONSTRAINT IF EXISTS updates_type_check;

ALTER TABLE updates
ADD CONSTRAINT updates_type_check
CHECK (type IN ('TEXT', 'PHOTO'));

-- Store photos belonging to an update
CREATE TABLE IF NOT EXISTS update_images (
  id SERIAL PRIMARY KEY,

  update_id INTEGER NOT NULL
    REFERENCES updates(id)
    ON DELETE CASCADE,

  image_url TEXT NOT NULL,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Faster lookup of images for an update
CREATE INDEX IF NOT EXISTS idx_update_images_update_id
ON update_images(update_id);