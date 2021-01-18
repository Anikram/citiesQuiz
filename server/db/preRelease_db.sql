CREATE DATABASE citiesQuiz;

create extension if not exists "uuid-ossp";

CREATE TABLE users (
                       user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                       user_name VARCHAR(255) NOT NULL,
                       user_email VARCHAR(255) NOT NULL UNIQUE,
                       user_password VARCHAR(255) NOT NULL,
                       game_id INTEGER NOT NULL,
                       top_score INTEGER NOT NULL, DEFAULT 0,
                       FOREIGN KEY (game_id) REFERENCES games(game_id) ON DELETE CASCADE
);

CREATE TABLE games (
                       game_id BIGSERIAL primary key,
                       user_id uuid NOT NULL references users(user_id),
                       region_id INTEGER NOT NULL references regions(region_id),
                       game_finished BOOLEAN NOT NULL DEFAULT false,
                       score INTEGER NOT NULL DEFAULT 0,
                       FOREIGN KEY (region_id) REFERENCES regions(region_id) ON DELETE CASCADE
);

CREATE TABLE regions (
                         region_id BIGSERIAL PRIMARY KEY,
                         region_name VARCHAR(255) NOT NULL UNIQUE,
                         cities JSONB NOT NULL,
                         game_id INTEGER NOT NULL,
                         FOREIGN KEY (game_id) REFERENCES games(game_id) ON DELETE CASCADE
);

-- seed
INSERT INTO regions (region_name, cities)
VALUES ('europe', '[{
  "capitalCity": "Zurich",
  "lat": 47.373878,
  "long": 8.545094
},
  {
    "capitalCity": "Paris",
    "lat": 48.864716,
    "long": 2.349014
  },
  {
    "capitalCity": "Madrid",
    "lat": 40.416775,
    "long": -3.703790
  },
  {
    "capitalCity": "London",
    "lat": 51.509865,
    "long": -0.118092
  },
  {
    "capitalCity": "Berlin",
    "lat": 52.520008,
    "long": 13.404954
  },
  {
    "capitalCity": "Amsterdam",
    "lat": 52.377956,
    "long": 4.897070
  },
  {
    "capitalCity": "Rome",
    "lat": 41.902782,
    "long": 12.496366
  },
  {
    "capitalCity": "Oslo",
    "lat": 59.924545,
    "long": 10.768063
  },
  {
    "capitalCity": "Vienna",
    "lat": 48.210033,
    "long": 16.363449
  }
]');