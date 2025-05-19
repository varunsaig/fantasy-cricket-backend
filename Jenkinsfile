pipeline {
    agent any

    environment {
        IMAGE_NAME = "fantasy-cricket-backend"
        CONTAINER_NAME = "fantasy-backend"
        PORT = "3030"
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
                sh "docker build -t $IMAGE_NAME ."
            }
        }

        stage('Stop and Remove Existing Container') {
            steps {
                script {
                    // Stop container if running
                    sh "docker ps -q -f name=$CONTAINER_NAME | grep -q . && docker stop $CONTAINER_NAME || echo 'No container running'"

                    // Remove container if exists
                    sh "docker ps -aq -f name=$CONTAINER_NAME | grep -q . && docker rm $CONTAINER_NAME || echo 'No container to remove'"
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                sh "docker run -d -p $PORT:$PORT --name $CONTAINER_NAME $IMAGE_NAME"
            }
        }
    }
}
