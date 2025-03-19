// Interface pour les données de l'email
export interface EmailData {
    from: string;    // Adresse email de l'expéditeur
    to: string;      // Adresse email du destinataire
    subject: string; // Sujet de l'email
    body: string;    // Contenu de l'email
}

// Interface pour la réponse du backend lors de l'envoi
export interface EmailResponse {
    message: string; // Message de confirmation ou autre réponse du backend
}

// Optionnel : Interface pour une erreur d'email
export interface EmailError {
    status: number;  // Code HTTP de l'erreur
    message: string; // Message d'erreur
    errorDetails?: any; // Détails supplémentaires éventuels
}
