pipeline {
    agent { 
        node {
            label 'docker-agent-nodejs'
            }
      }
    triggers {
        pollSCM '* * * * *'
    }
    stages {
        stage('Build') {
            steps {
                echo "Building.."
                sh '''
                cd myapp
                npm i
                node server.js

                '''
            }
        }
        stage('Test') {
            steps {
                echo "Testing.."
                sh '''
                npm i
                node server.js
                '''
            }
        }
        stage('Deliver') {
            steps {
                echo 'Deliver....'
                sh '''
                echo "doing delivery stuff.."
                '''
            }
        }
    }
}