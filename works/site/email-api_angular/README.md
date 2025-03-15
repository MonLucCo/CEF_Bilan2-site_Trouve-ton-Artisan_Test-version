# **EmailApiAngular**

## **Technical and Functional Overview**

This project is a **full-stack application** combining a **front-end Angular** and a **back-end Node.js with Express**.  
It provides an **HTTP-SMTP gateway** to send emails over HTTP via an API and route them to **MailDev** for testing or simulations.  

The **Angular front-end** serves as an interactive **dashboard**, offering visualization of email exchanges and complete supervision of the gateway's functionality toward MailDev.  

Designed for both development and testing environments, this project is a **key tool for validating email sending functionality**, while offering centralized and clear control over interactions.

---

## **Table of Contents**

- [**EmailApiAngular**](#emailapiangular)
  - [**Technical and Functional Overview**](#technical-and-functional-overview)
  - [**Table of Contents**](#table-of-contents)
  - [**Prerequisites**](#prerequisites)
  - [**Starting Development Servers**](#starting-development-servers)
    - [**1. Start the Front-End (Angular)**](#1-start-the-front-end-angular)
    - [**2. Start the Back-End (Node.js)**](#2-start-the-back-end-nodejs)
    - [**3. Start MailDev**](#3-start-maildev)
  - [**Building the Project**](#building-the-project)
    - [**1. Build the Front-End**](#1-build-the-front-end)
    - [**2. Build the Back-End**](#2-build-the-back-end)
    - [**3. Build Both**](#3-build-both)
  - [**Running Tests**](#running-tests)
    - [**1. Unit Tests (Front-End)**](#1-unit-tests-front-end)
    - [**2. Linting**](#2-linting)
  - [**Testing the Back-End for Email Sending**](#testing-the-back-end-for-email-sending)
    - [**1. Sending Test Emails**](#1-sending-test-emails)
    - [**2. Viewing Emails in MailDev**](#2-viewing-emails-in-maildev)
  - [**Additional Resources**](#additional-resources)

---

## **Prerequisites**

Before you begin, ensure the following are installed on your machine:

- [Node.js](https://nodejs.org/) (version 14 or later)
- [Angular CLI](https://angular.dev/cli) (version 19.0.6 or later)
- **MailDev** for email testing (see [MailDev](https://github.com/maildev/maildev) for installation instructions)

Clone the repository and install dependencies:

```bash
git clone https://your-repo-url.git
cd email-api-angular
npm install
```

Next, install the necessary dependencies for your project locally:

1. **Install development tools**:

   ```bash
   npm install --save-dev nodemon ts-node eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
   ```

2. **Install back-end libraries**:

   ```bash
   npm install express body-parser nodemailer
   ```

3. **Install TypeScript types**:

   ```bash
   npm install --save-dev @types/express @types/body-parser @types/nodemailer @types/node typescript
   ```

4. **Install MailDev globally** if not already installed (for email testing):

   ```bash
   npm install -g maildev
   ```

5. **Install `Cross-Env` for multiplatform compatibility** (Uniform treatment of environmental variables for Windows, MacOS, Linux platforms):

   ```bash
   npm install --save-dev cross-env
   ```

---

## **Starting Development Servers**

### **1. Start the Front-End (Angular)**

To start the Angular development server, run:

```bash
npm run start:frontend
```

Once started, open your browser and go to:

```url
http://localhost:4200/
```

The application will automatically reload whenever source files are modified.

---

### **2. Start the Back-End (Node.js)**

To start the back-end in development mode with `ts-node` and `nodemon`, run:

```bash
npm run start-dev:backend
```

The back-end server will listen for requests at:

```url
http://localhost:3000/
```

To start the back-end in production mode after building it, use:

```bash
npm run start:backend
```

---

### **3. Start MailDev**

To intercept and view emails during testing, start MailDev:

```bash
maildev
```

- The MailDev SMTP server will be available at: `localhost:1025`
- The MailDev web interface will be accessible at: [http://localhost:1080](http://localhost:1080)

---

## **Building the Project**

To build both the front-end and back-end components for production, use the following commands:

### **1. Build the Front-End**

Compile the Angular application with:

```bash
npm run build:frontend
```

The build artifacts will be stored in the `dist/` directory.

### **2. Build the Back-End**

Compile the TypeScript back-end with:

```bash
npm run build:backend
```

The output will be placed in the `dist/server/` directory.

### **3. Build Both**

To build both the front-end and back-end simultaneously:

```bash
npm run build:all
```

---

## **Running Tests**

### **1. Unit Tests (Front-End)**

Run Angular unit tests with Karma:

```bash
npm run test:frontend
```

### **2. Linting**

Analyze TypeScript code to ensure compliance with coding standards:

```bash
npm run lint
```

---

## **Testing the Back-End for Email Sending**

### **1. Sending Test Emails**

To test the email sending functionality, use PowerShell to send a request to the back-end API:

```pwsh
Invoke-RestMethod -Uri "http://localhost:3000/api/send-email" `
    -Method Post `
    -Body (ConvertTo-Json -Depth 10 -InputObject @{
        from = "test@example.com";
        to = "test@localhost";
        subject = "Test Email";
        text = "This is a test with accents: é, à, ù, ô."
    }) `
    -ContentType "application/json"
```

### **2. Viewing Emails in MailDev**

After sending a test email, verify its reception in the MailDev interface:

- Access [http://localhost:1080](http://localhost:1080) in your browser.
- Check that the email appears with the specified subject and content.

---

## **Additional Resources**

- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [Nodemailer Documentation](https://nodemailer.com/about/)
- [MailDev Documentation](https://github.com/maildev/maildev)

---
