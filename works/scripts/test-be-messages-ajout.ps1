# Test le Back-End pour la gestion des 'ajouts' dans les messages historisés
Write-Host "*** Test l'ajout dans l'historisation des messages dans le Back-End ***"
# URL du backend
$baseUrl = "http://localhost:3000/api/messages"

# 1. Test GET (récupérer tous les messages)
Write-Host "=== [GET] Récupérer tous les messages ==="
$response = Invoke-RestMethod -Uri $baseUrl -Method GET
$response | ForEach-Object { Write-Output "Message: $_" }

# 2. Test POST (ajouter un message)
Write-Host "=== [POST] Ajouter un message ==="
$newMessage = @{
    id = "4"
    from = "example4@example.com"
    to = "example5@example.com"
    subject = "Hello 4"
    body = "Message content 4"
    date = "2025-03-16"
}
$response = Invoke-RestMethod -Uri $baseUrl -Method POST -Body ($newMessage | ConvertTo-Json -Depth 10) -ContentType "application/json"
Write-Output $response

# 3. Test final GET (vérifier que le message est ajouté)
Write-Host "=== [GET] Vérification des messages après ajout ==="
$response = Invoke-RestMethod -Uri $baseUrl -Method GET
$response | ForEach-Object { Write-Output "Message: $_" }
