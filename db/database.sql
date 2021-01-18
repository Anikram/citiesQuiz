CREATE DATABASE jwt_tut;

create extension if not exists "uuid-ossp";

CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    game_id INTEGER NOT NULL,
    FOREIGN KEY (game_id) REFERENCES games(game_id) ON DELETE CASCADE
);

CREATE TABLE games (
    game_id BIGSERIAL primary key,
    user_id uuid NOT NULL references users(user_id),
    region_id INTEGER NOT NULL references regions(region_id),
    game_finished BOOLEAN NOT NULL DEFAULT false,
    FOREIGN KEY (region_id) REFERENCES regions(region_id) ON DELETE CASCADE
);

CREATE TABLE regions (
    region_id INTEGER NOT NULL PRIMARY KEY,
    region_name VARCHAR(255) NOT NULL UNIQUE,
    cities JSONB NOT NULL,
    game_id INTEGER NOT NULL,
    FOREIGN KEY (game_id) REFERENCES games(game_id) ON DELETE CASCADE
);



--insert

INSERT INTO users (user_name, user_email, user_password) VALUES ('Sam','example@gmail.com','password');
INSERT INTO games (user_id, region_id, game_finished) VALUES ('d5904e47-569e-44ae-988f-a2b906f55c07',1,false);


--alter
ALTER TABLE regions DROP COLUMN region_id;
ALTER TABLE games DROP COLUMN user_id;
ALTER TABLE regions ADD COLUMN region_id BIGSERIAL PRIMARY KEY;
ALTER TABLE users ADD COLUMN top_score INTEGER DEFAULT 0;

ALTER TABLE regions ADD COLUMN game_id INTEGER;
ALTER TABLE regions
    ADD CONSTRAINT fk_regions_games
        FOREIGN KEY (game_id)
            REFERENCES games(game_id);


ALTER TABLE regions ADD CONSTRAINT constraint_name UNIQUE (region_name);
ALTER TABLE users ADD CONSTRAINT constraint_name UNIQUE (user_email);
ALTER TABLE users ADD UNIQUE (user_email);

ALTER TABLE users
    ADD CONSTRAINT fk_users_games
        FOREIGN KEY (game_id)
            REFERENCES games(game_id);

ALTER TABLE games
    ADD CONSTRAINT fk_games_regions
        FOREIGN KEY (region_id)
            REFERENCES regions(region_id);

ALTER TABLE games
    DROP CONSTRAINT fk_games_regions;