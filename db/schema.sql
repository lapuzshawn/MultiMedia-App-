DROP DATABASE IF EXISTS social_db;
CREATE DATABASE social_db;

USE social_db;

CREATE TABLE user (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  facebook_url VARCHAR(255),
  instagram_url VARCHAR(255),
  twitter_url VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE bio (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  link_url VARCHAR(255) NOT NULL,
  thumbnail VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE link (
  id INT NOT NULL AUTO_INCREMENT,
  bio_id INT NOT NULL,
  link_url VARCHAR(255) NOT NULL,
  label VARCHAR(255) NOT NULL,
  image_url VARCHAR(255),
  PRIMARY KEY (id)
);
