CREATE TYPE rating_range AS ENUM ('1','2','3','4','5');

CREATE TABLE bookmarks (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY, 
    title TEXT NOT NULL,
    url TEXT NOT NULL, 
    description TEXT,
    rating rating_range NOT NULL
);