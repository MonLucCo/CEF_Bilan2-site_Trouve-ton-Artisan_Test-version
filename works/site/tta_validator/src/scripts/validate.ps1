Write-Output "📌 Début de la validation W3C..."
node src/scripts/validate_w3c.js

if ($?) { 
    Write-Output "✅ Validation terminée avec succès." 
} else { 
    Write-Output "❌ Erreur lors de la validation." 
}
