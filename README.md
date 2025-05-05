# Crypto Converter: Backend and Frontend with AWS Lambda, AWS Amplify, and Next.js

This is a monorepo project that includes both the backend and frontend of an application. The backend is based on AWS Lambda using AWS SAM for deployment, and the frontend is hosted on AWS Amplify with Next.js for consuming APIs and rendering the user interface.


You can see the application running at:
[https://main.d26wywtdu2y5ih.amplifyapp.com/](https://main.d26wywtdu2y5ih.amplifyapp.com/)

## 🛠️ Monorepo Structure

This monorepo is divided into two main folders:

- **`/backend`**: Contains Lambda functions, AWS SAM configurations, and secret management with AWS Secrets Manager.

- **`/frontend`**: **Next.js** application that consumes backend APIs and renders data. This application is deployed on **AWS Amplify**.

## 🚀 Technologies

### Backend
- **TypeScript**: Programming language used for the backend.
- **AWS Lambda**: Serverless functions for handling backend logic.
- **AWS SAM**: Framework for deploying and managing Lambda functions.
- **AWS Secrets Manager**: Secrets management for protecting sensitive keys and configurations.

### Frontend

- **Next.js**: React framework for the frontend, used to create pages and consume backend APIs.
- **AWS Amplify**: AWS service that facilitates frontend deployment, authentication, and other integrations.
- - **TypeScript**: Programming language used for the frontend.

## 🔧 Installation

### Backend

To configure the backend:

Navigate to the **backend** folder:

```bash
cd backend
npm install
aws configure
sam build
sam deploy --guided
```

### Frontend
Navigate to the **frontend** folder:
```bash
cd frontend
npm install
npm run dev
```

