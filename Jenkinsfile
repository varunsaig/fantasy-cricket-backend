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

       stage('Run Docker Container') {
    steps {
        sh """
            # Stop and remove any existing container
            docker rm -f $CONTAINER_NAME || true

            # Kill any process using the port (safety check)
            fuser -k $PORT/tcp || true

            # Wait a second for cleanup
            sleep 2

            # Run the container
            docker run -d -p $PORT:$PORT --name $CONTAINER_NAME $IMAGE_NAME
        """
    }
}

