<?php
// One-time script to update the admin email in the database
require_once 'config.php';

try {
    // Update the existing admin user email
    $stmt = $pdo->prepare("UPDATE users SET username = 'admin@gmail.com' WHERE username = 'sainithin9505@gmail.com'");
    
    if ($stmt->execute()) {
        if ($stmt->rowCount() > 0) {
            echo "✓ Admin email successfully updated from sainithin9505@gmail.com to admin@gmail.com<br>";
        } else {
            echo "ℹ No user found with sainithin9505@gmail.com. The admin email might already be updated or doesn't exist.<br>";
        }
    } else {
        echo "✗ Failed to update admin email.<br>";
    }
    
    // Verify the change
    $stmt = $pdo->prepare("SELECT username FROM users WHERE username = 'admin@gmail.com'");
    $stmt->execute();
    if ($stmt->rowCount() > 0) {
        echo "✓ Verified: admin@gmail.com exists in the database.<br>";
        echo "<br><strong>You can now log in with: admin@gmail.com / 123456789</strong><br>";
    }
    
} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
