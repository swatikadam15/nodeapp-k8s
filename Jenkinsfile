pipeline {
    agent any

    environment {
        IMAGE = "swatikadam16/sample-nodejs-app"
        TAG = "${env.BRANCH_NAME}-${env.BUILD_NUMBER}"

        // Kubernetes master IP (kubeadm cluster)
        K8S_MASTER = "3.109.183.70"
        K8S_USER = "ubuntu"

        KUBECONFIG = "/home/ubuntu/.kube/config"
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

        stage('Deploy to Kubeadm Cluster') {
            steps {

                sshagent(['master-node-ssh']) {

                    sh """
                    ssh -o StrictHostKeyChecking=no ${K8S_USER}@${K8S_MASTER} '
                    
                    export KUBECONFIG=${KUBECONFIG}

                    kubectl set image deployment/nodeapp-deployment \
                    nodeapp-container=${IMAGE}:${TAG} || true

                    kubectl apply -f /home/ubuntu/sample-node-k8s/deployment.yaml
                    kubectl apply -f /home/ubuntu/sample-node-k8s/service.yaml

                    kubectl rollout status deployment/nodeapp-deployment

                    '
                    """
                }
            }
        }
    }
}