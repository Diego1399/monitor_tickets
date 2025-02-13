-- Tabla para Tickets
-- create database monitorTicket;
-- use monitorTicket;

CREATE TABLE tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aranda_ticket_id INT NOT NULL,
    subject VARCHAR(255),
    description TEXT,
    status VARCHAR(50),
    created_at DATETIME,
    updated_at DATETIME,
    is_locked BOOLEAN DEFAULT TRUE,
    specialist_id INT,
    category_id INT,
    sla_id INT,
    project_id INT,
    urgency_id INT,
    user_id INT
);

-- Tabla para Usuarios
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aranda_user_id INT NOT NULL,
    username VARCHAR(255),
    email VARCHAR(255),
    password_hash VARCHAR(255),
    role VARCHAR(50),
    created_at DATETIME,
    updated_at DATETIME
);

-- Tabla para Casos
CREATE TABLE cases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    case_id INT NOT NULL,
    author_id INT,
    description TEXT,
    category_id INT,
    project_id INT,
    sla_id INT,
    status VARCHAR(50),
    created_at DATETIME,
    updated_at DATETIME,
    urgency_id INT
);

-- Tabla para Notas de Casos
CREATE TABLE case_notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    case_id INT NOT NULL,
    description TEXT,
    is_private BOOLEAN,
    created_at DATETIME,
    updated_at DATETIME,
    author_id INT
);

-- Tabla para Archivos Adjuntos
CREATE TABLE attachments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    case_id INT NOT NULL,
    file_name VARCHAR(255),
    file_path VARCHAR(255),
    uploaded_by_user_id INT,
    created_at DATETIME
);

CREATE VIEW ticket_view AS
SELECT 
    t.aranda_ticket_id,
    t.subject,
    t.description,
    t.status,
    date_format(t.created_at, '%d-%m-%Y') AS created_at,
    t.user_id,
    u1.username AS 'cliente',
    u2.username AS 'especialista'
FROM tickets t
INNER JOIN users u1 ON u1.id = t.user_id
INNER JOIN users u2 ON u2.id = t.specialist_id;


-- Tabla Tickets: Añadir claves foráneas
ALTER TABLE tickets
    ADD FOREIGN KEY (specialist_id) REFERENCES users(id),
    ADD FOREIGN KEY (user_id) REFERENCES users(id);

-- Tabla Casos: Añadir claves foráneas
ALTER TABLE cases
    ADD FOREIGN KEY (author_id) REFERENCES users(id),
    ADD FOREIGN KEY (category_id) REFERENCES categories(id),
    ADD FOREIGN KEY (project_id) REFERENCES projects(id),
    ADD FOREIGN KEY (sla_id) REFERENCES sla(id),
    ADD FOREIGN KEY (urgency_id) REFERENCES urgencies(id);

-- Tabla Notas de Casos: Añadir claves foráneas
ALTER TABLE case_notes
    ADD FOREIGN KEY (case_id) REFERENCES cases(id),
    ADD FOREIGN KEY (author_id) REFERENCES users(id);

-- Tabla Archivos Adjuntos: Añadir claves foráneas
ALTER TABLE attachments
    ADD FOREIGN KEY (case_id) REFERENCES cases(id),
    ADD FOREIGN KEY (uploaded_by_user_id) REFERENCES users(id);