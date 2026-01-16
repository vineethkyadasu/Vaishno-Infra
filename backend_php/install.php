<?php
require_once 'config.php';

try {
    // 1. Users Table
    $sql = "CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    $pdo->exec($sql);
    echo "Users table created successfully.<br>";

    // Create default admin user if not exists
    // Default: admin / admin123 (hashed)
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE username = 'admin'");
    $stmt->execute();
    if ($stmt->fetchColumn() == 0) {
        $password = password_hash('admin123', PASSWORD_BCRYPT);
        $sql = "INSERT INTO users (username, password) VALUES ('admin', '$password')";
        $pdo->exec($sql);
        echo "Default admin user created.<br>";
    }

    // 2. Projects Table
    $sql = "CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        location VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        image VARCHAR(255) NOT NULL,
        features JSON, 
        completion_date VARCHAR(100),
        status VARCHAR(50) DEFAULT 'Ongoing',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    $pdo->exec($sql);
    echo "Projects table created successfully.<br>";

    // 3. Careers Table
    $sql = "CREATE TABLE IF NOT EXISTS careers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        department VARCHAR(100),
        type VARCHAR(50) DEFAULT 'Full-time',
        description TEXT NOT NULL,
        requirements JSON,
        is_open BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    $pdo->exec($sql);
    echo "Careers table created successfully.<br>";

    // 4. Applications Table
    $sql = "CREATE TABLE IF NOT EXISTS applications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        job_id INT, -- Can be NULL for general inquiries
        job_title VARCHAR(255),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        resume VARCHAR(255) NOT NULL,
        cover_letter TEXT,
        status VARCHAR(50) DEFAULT 'Applied',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (job_id) REFERENCES careers(id) ON DELETE SET NULL
    )";
    $pdo->exec($sql);
    echo "Applications table created successfully.<br>";

    echo "<h3>Database setup complete!</h3>";

} catch(PDOException $e) {
    echo "Error creating tables: " . $e->getMessage();
}
?>
