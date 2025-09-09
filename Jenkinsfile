pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/pardparw/ticket-app.git'
            }
        }

        stage('Build Backend') {
            steps {
                script {
                    docker.build("your-dockerhub-user/backend:latest", "./backend")
                }
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    docker.build("your-dockerhub-user/frontend:latest", "./frontend")
                }
            }
        }

        stage('Push Images') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-cred', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh """
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                        docker push your-dockerhub-user/backend:latest
                        docker push your-dockerhub-user/frontend:latest
                    """
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s-deployment.yaml'
            }
        }
    }
}
