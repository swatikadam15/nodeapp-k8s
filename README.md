

## 📌 Project Overview

This project demonstrates a complete CI/CD pipeline for deploying a Node.js application using:

- Jenkins
- Docker
- Docker Hub
- Kubernetes (K8s)
- AWS EC2

The pipeline automatically:

1. Pulls code from GitHub
2. Builds Docker image
3. Pushes image to Docker Hub
4. Deploys application on Kubernetes cluster

---

## 🛠️ Technologies Used

- Node.js
- Jenkins
- Docker
- Docker Hub
- Kubernetes
- AWS EC2
- Git & GitHub

---

## 🏗️ Architecture

GitHub → Jenkins → Docker Build → Docker Hub → Kubernetes Deployment

---

## 📂 Project Structure

```bash
sample-nodejs-app/
│── Dockerfile
│── Jenkinsfile
│── package.json
│── package-lock.json
│── server.js
│── deployment.yaml
│── service.yaml
└── README.md
```

---

## 🚀 Jenkins Pipeline Stages

### 1. Checkout Code
Jenkins pulls source code from GitHub repository.

### 2. Build Docker Image
Docker image is created using Dockerfile.

```bash
docker build -t image-name .
```

### 3. Push Image to Docker Hub

```bash
docker push username/image-name
```

### 4. Deploy to Kubernetes

```bash
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

---

## 🐳 Docker Setup

Build Docker image manually:

```bash
docker build -t sample-nodejs-app .
```

Run container:

```bash
docker run -d -p 3000:3000 sample-nodejs-app
```

---

## ☸️ Kubernetes Setup

Deploy application:

```bash
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

Check pods:

```bash
kubectl get pods
```

Check services:

```bash
kubectl get svc
```

---

## 🔧 Jenkins Configuration

- Installed Jenkins on EC2
- Added Docker Hub credentials
- Configured SSH for deployment server
- Created Multibranch Pipeline Job

---

## 📸 Screenshots

Add screenshots here:

- Jenkins Pipeline Success


Option 2: Kubernetes
Create:
● Deployment
● Service

<img width="1801" height="1003" alt="image" src="https://github.com/user-attachments/assets/d1e7ef55-86f3-4620-9254-d27c406a7daa" />


- Docker Hub Image
<img width="1727" height="965" alt="image" src="https://github.com/user-attachments/assets/a90674b2-c17d-4472-9d66-58355d7f25d1" />


- Kubernetes Pods

- Running Application
   http://3.6.39.238:30080/

  <img width="687" height="157" alt="image" src="https://github.com/user-attachments/assets/ca82e680-1bbf-4980-a676-648115e1fa6d" />

  Configured monitoring using Helm:
  ● Grafana
  <img width="940" height="532" alt="image" src="https://github.com/user-attachments/assets/dce9224f-a134-49be-a33f-108c5cacd0a0" />



## 👩‍💻 Author

Swati Kadam
