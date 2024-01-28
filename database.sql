DROP TABLE IF EXISTS "gallery";

CREATE TABLE "gallery" (
  "id" SERIAL PRIMARY KEY,
  "url" VARCHAR,
  "title" VARCHAR,
  "description" TEXT,
  "likes" INTEGER DEFAULT 0
);

INSERT INTO "gallery" 
("url", "title", "description")
VALUES
('images/goat_small.jpg', 'Goat!', 'Photo of a goat taken at Glacier National Park.'),
('images/DwarfRanger.jpg', 'Ranger', 'Image of a Dwarven Ranger for use in Pathfinder'),
('images/GrahamBoys.jpg', 'Graham Boys', '3 generations of Grahams at a Vikings game in LA'),
('images/titanite.jpg', 'Titanite', 'My Prime Academy cohort''s namesake')  ;
 