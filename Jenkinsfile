pipeline {
    agent any
    triggers {
        githubPush()
    }
    environment {
        IMAGE = "swatikadam16/sample-nodejs-app"
        TAG = "${env.BRANCH_NAME}-${env.BUILD_NUMBER}"

        // KUBECONFIG = "/home/ubuntu/.kube/config"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${IMAGE}:${TAG} ."
            }
        }

        stage('Docker Login & Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    docker push ${IMAGE}:${TAG}
                    '''
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                kubectl version --client
                kubectl get nodes

                kubectl apply -f deployment.yaml --validate=false
                kubectl apply -f service.yaml --validate=false

                kubectl set image deployment/nodejs-deployment \
                nodeapp-container=${IMAGE}:${TAG} || true

                kubectl rollout status deployment/nodeapp-deployment
                '''
            }
        }
    }
}