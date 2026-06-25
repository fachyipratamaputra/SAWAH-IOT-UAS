CREATE DATABASE sawah_iot;
USE sawah_iot;

CREATE TABLE water_logs(
    id INT AUTO_INCREMENT PRIMARY KEY,
    water_level FLOAT,
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pest_logs(
    id INT AUTO_INCREMENT PRIMARY KEY,
    pir_detected BOOLEAN,
    vibration_detected BOOLEAN,
    pest_detected BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE images(
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_path VARCHAR(255),
    result VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE activity_logs(
    id INT AUTO_INCREMENT PRIMARY KEY,
    activity TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);