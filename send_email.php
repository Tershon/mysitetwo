<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $service = htmlspecialchars($_POST["service"]);
    $message = htmlspecialchars($_POST["message"]);

    $to = "gansta252552525@gmail.com";  // Замени на свою почту
    $subject = "Новая заявка на услугу";
    $body = "Имя: $name\nEmail: $email\nУслуга: $service\nСообщение:\n$message";
    $headers = "From: $email\r\nReply-To: $email\r\nContent-Type: text/plain; charset=UTF-8";

    if (mail($to, $subject, $body, $headers)) {
        echo "Заявка успешно отправлена!";
    } else {
        echo "Ошибка отправки заявки.";
    }
}
?>
