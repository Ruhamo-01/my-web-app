pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'ruhamorose01/my-web-app'
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${DOCKER_IMAGE}:latest")
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS_ID) {
                        dockerImage.push('latest')
                    }
                }
            }
        }

        stage('Deploy to Local Docker Host') {
            steps {
                sh '''
                    docker rm -f my-web-app || true
                    docker run -d --name my-web-app -p 8080:80 ${DOCKER_IMAGE}:latest
                '''
            }
        }
    }
}

