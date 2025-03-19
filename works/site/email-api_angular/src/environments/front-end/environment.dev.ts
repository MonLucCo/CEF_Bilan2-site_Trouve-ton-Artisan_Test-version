export const environment = {
    production: false,
    backendUrl: 'http://localhost:3000', // URL du backend local
    apiService: {
        email: '/api/send-email', // Service Email du Back-End
        message: '/api/messages', // Service de l'historique des messages du Back-End
        status: {
            server: '/api/status/server', // Service Status du serveur Back-End
            maildev: '/api/status/maildev' // Service Status du serveur MailDev
        }
    }
};
