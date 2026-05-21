pipeline {
    agent any

    environment {
        IMAGE = "swatikadam16/sample-nodejs-app"
        TAG = "${env.BRANCH_NAME}-${env.BUILD_NUMBER}"

        // Kubernetes master IP (kubeadm cluster)
        K8S_MASTER = "3.109.183.70"
        K8S_USER = "ubuntu"

        KUBECONFIG = "/var/lib/jenkins/.kube/config"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "${env.GIT_COMMIT}"
                sh "docker build -t ${IMAGE}:${TAG} ."
            }
        }

        stage('Docker Login & Push') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {

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
                export KUBECONFIG=$HOME/.kube/config

        ls -ltr

        kubectl apply -f deployment.yaml
        kubectl apply -f service.yaml

        kubectl set image deployment/nodeapp-deployment \
        nodeapp-container=swatikadam16/sample-nodejs-app:${TAG} || true

        kubectl rollout status deployment/nodeapp-deployment
        '''
    }
}
    }
}