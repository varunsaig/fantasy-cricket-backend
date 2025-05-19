pipeline {
    agent any

    environment {
        IMAGE_NAME = "fantasy-cricket-backend"
    }

    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/varunsaig/fantasy-cricket-backend.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Run Docker Container') {
            steps {
                sh '''
                    docker rm -f fantasy-backend || true
                    docker run -d -p 3030:3030 --name fantasy-backend $IMAGE_NAME
                '''
            }
        }
    }
}
