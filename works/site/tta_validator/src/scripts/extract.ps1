Write-Output "📌 Début de l'extraction des pages..."
node src/scripts/extract_html_css.js

if ($?) { 
    Write-Output "✅ Extraction terminée avec succès." 
} else { 
    Write-Output "❌ Erreur lors de l'extraction." 
}
