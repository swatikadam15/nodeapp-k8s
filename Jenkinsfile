pipeline {
    agent any

    environment {
        IMAGE = "swatikadam16/sample-nodejs-app"
        TAG = "${env.BRANCH_NAME}-${env.BUILD_NUMBER}"
        EC2 = "43.205.195.222"
        USER = "ubuntu"
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

        stage('Deploy to EC2') {
            steps {

                sshagent(['ec2-ssh-key']) {

                    sh '''
                    ssh -o StrictHostKeyChecking=no ${USER}@${EC2} "

                    docker pull ${IMAGE}:${TAG}

                    docker stop nodeapp || true
                    docker rm nodeapp || true

                    docker run -d \
                    -p 3000:3000 \
                    --name nodeapp \
                    ${IMAGE}:${TAG}

                    "
                    '''
                }
            }
        }
    }
}