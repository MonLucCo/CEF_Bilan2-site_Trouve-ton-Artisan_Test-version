#!/bin/bash

echo "📌 Début de la validation W3C..."
node src/scripts/validate_w3c.js

if [ $? -eq 0 ]; then
  echo "✅ Validation terminée avec succès."
else
  echo "❌ Erreur lors de la validation."
fi
