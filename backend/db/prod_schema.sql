CREATE TABLE  users
(
    id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    avatar TEXT,
    email TEXT NOT NULL UNIQUE,
    password  TEXT,
    address TEXT,
    mobile TEXT UNIQUE,
    allow_notification INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role INTEGER
);

CREATE TABLE  priority
(
    id SERIAL PRIMARY KEY,
    priority TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE  status
(
    id SERIAL PRIMARY KEY,
    status TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE  ticket_type
(
    id SERIAL PRIMARY KEY,
    ticket_type TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE  projects
(
    id SERIAL PRIMARY KEY,
    title TEXT,
    description TEXT,
    deadline DATE,
    priority_id INTEGER REFERENCES priority (id),
    status_id INTEGER REFERENCES status (id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE  tickets
(
    id SERIAL PRIMARY KEY,
    title TEXT,
    description TEXT,
    priority_id INTEGER REFERENCES priority (id),
    user_id INTEGER REFERENCES users (id),
    status_id INTEGER REFERENCES status (id),
    ticket_type_id INTEGER REFERENCES ticket_type (id),
    project_id INTEGER REFERENCES projects (id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE  permission
(
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    access_type INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE  assignments
(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    project_id INTEGER NOT NULL,
    ticket_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);


