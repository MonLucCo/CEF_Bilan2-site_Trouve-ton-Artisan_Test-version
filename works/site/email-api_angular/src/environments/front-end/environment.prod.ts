export const environment = {
  production: true,
  backendUrl: 'https://mon-backend-production.com', // URL du backend en production
  apiService: {
    email: '/api/send-email', // Service Email du Back-End
    message: '/api/messages', // Service de l'historique des messages du Back-End
    status: {
      server: '/api/status/server', // Service Status du serveur Back-End
      maildev: '/api/status/maildev' // Service Status du serveur MailDev
    }
  }
};
