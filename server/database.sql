CREATE DATABASE jwt_tut;

create extension if not exists "uuid-ossp";

CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL
);

CREATE TABLE games (
    game_id BIGSERIAL primary key,
    user_id uuid NOT NULL references users(user_id),
    region_id INTEGER NOT NULL references regions(region_id),
    game_finished BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE regions (
    region_id INTEGER NOT NULL PRIMARY KEY,
    region_name VARCHAR(255) NOT NULL UNIQUE,
    cities JSONB NOT NULL
);



--insert

INSERT INTO users (user_name, user_email, user_password) VALUES ('Sam','example@gmail.com','password');
INSERT INTO games (user_id, region_id, game_finished) VALUES ('1ad84956-f9d9-414b-aa86-beaf30d5ceca',1);
INSERT INTO regions (region_name, cities) VALUES ('europe','{"title":"Geneva","lat":46.204391,"long":6.143158}');

--alter
ALTER TABLE regions DROP COLUMN region_id;
ALTER TABLE games DROP COLUMN user_id;
ALTER TABLE regions ADD COLUMN region_id BIGSERIAL PRIMARY KEY;

ALTER TABLE regions ADD CONSTRAINT constraint_name UNIQUE (region_name);
ALTER TABLE users ADD CONSTRAINT constraint_name UNIQUE (user_email);
ALTER TABLE users ADD UNIQUE (user_email);