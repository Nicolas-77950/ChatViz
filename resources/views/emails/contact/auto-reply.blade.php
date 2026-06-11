<!DOCTYPE html>
<html>
<head>
    <title>ChatViz - Votre message</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2>Bonjour {{ $name }},</h2>
    
    <p>{{ $replyBody }}</p>
    
    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
    
    <p style="font-size: 0.9em; color: #777;">
        L'équipe ChatViz<br>
        <a href="{{ url('/') }}">{{ url('/') }}</a>
    </p>
</body>
</html>
