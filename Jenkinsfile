pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'ruhamorose01/my-web-app'      // Your Docker Hub username/image
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials' // Jenkins credentials ID for Docker Hub
        REMOTE_SSH = 'remote-host-ssh-key'           // Optional: Jenkins SSH credentials ID for remote
        REMOTE_USER = 'ubuntu'                        // Remote host username
        REMOTE_HOST = '192.168.1.100'                // Remote host IP or hostname
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
                    docker run -d --name my-web-app -p 9090:8080 ${DOCKER_IMAGE}:latest
                '''
            }
        }

        stage('Deploy to Remote Docker Host') {
            steps {
                sshagent([REMOTE_SSH]) {
                    sh """
                        ssh ${REMOTE_USER}@${REMOTE_HOST} 'docker pull ${DOCKER_IMAGE}:latest'
                        ssh ${REMOTE_USER}@${REMOTE_HOST} 'docker rm -f my-web-app || true'
                        ssh ${REMOTE_USER}@${REMOTE_HOST} 'docker run -d --name my-web-app -p 8080:8080 ${DOCKER_IMAGE}:latest'
                    """
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline finished"
        }
    }
}
