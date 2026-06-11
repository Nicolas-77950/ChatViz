<!DOCTYPE html>
<html>
<head>
    <title>Nouveau message de contact</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2>Nouveau message depuis le formulaire de contact</h2>
    
    <p><strong>Nom :</strong> {{ $name }}</p>
    <p><strong>Email :</strong> <a href="mailto:{{ $email }}">{{ $email }}</a></p>
    
    <h3>Message :</h3>
    <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #6366f1;">
        {!! nl2br(e($msg)) !!}
    </div>

    <br>
    <p style="font-size: 0.9em; color: #777;">Cet email a été généré automatiquement par ChatViz.</p>
</body>
</html>
