#!/bin/bash

echo "📌 Début de l'extraction des pages..."
node src/scripts/extract_html_css.js

if [ $? -eq 0 ]; then
  echo "✅ Extraction terminée avec succès."
else
  echo "❌ Erreur lors de l'extraction."
fi
