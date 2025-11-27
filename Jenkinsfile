pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'yourdockerhubusername/my-web-app'
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials' // Jenkins Docker Hub credentials
        DEPLOY_TARGET = 'local' // change to 'remote' for remote deployment
        REMOTE_HOST = 'user@remote-host' // only used if DEPLOY_TARGET=remote
        SSH_CREDENTIALS_ID = 'remote-host-ssh-key' // Jenkins SSH credentials ID for remote
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

        stage('Deploy Docker Image') {
            steps {
                script {
                    if (DEPLOY_TARGET == 'local') {
                        sh '''
                            docker rm -f my-web-app || true
                            docker run -d --name my-web-app -p 8080:80 ${DOCKER_IMAGE}:latest
                        '''
                    } else if (DEPLOY_TARGET == 'remote') {
                        sshagent([SSH_CREDENTIALS_ID]) {
                            sh """
                                ssh ${REMOTE_HOST} "docker pull ${DOCKER_IMAGE}:latest"
                                ssh ${REMOTE_HOST} "docker rm -f my-web-app || true"
                                ssh ${REMOTE_HOST} "docker run -d --name my-web-app -p 8080:80 ${DOCKER_IMAGE}:latest"
                            """
                        }
                    } else {
                        error "DEPLOY_TARGET must be 'local' or 'remote'"
                    }
                }
            }
        }
    }
}
