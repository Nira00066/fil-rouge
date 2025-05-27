<?php
try {
    $pdo = new PDO('mysql:host=localhost;dbname=pepites;charset=utf8mb4', 'root', '');
    // Active le mode exception pour voir les erreurs s'il y en a
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "❌ Erreur de connexion : " . $e->getMessage();
    exit;
}
?>
