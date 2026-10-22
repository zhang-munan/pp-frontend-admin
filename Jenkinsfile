pipeline {
    agent any

    environment {
        PATH        = '/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
        IMAGE_NAME  = 'maoyu-admin'
        IMAGE_TAG   = "v${BUILD_NUMBER}"
        SERVER_IP   = '124.222.204.121'
        SERVER_USER = 'deploy'
        DEPLOY_DIR  = '/opt/apps/mao-yu-ye'
        BUILD_DIR   = '/opt/apps/mao-yu-ye/build-admin'
    }

    stages {
        stage('Checkout') {
            steps {
                git credentialsId: 'ghcr-credentials',
                    url: 'https://github.com/zhang-munan/send-frontend-admin.git',
                    branch: 'release/0.x'
            }
        }

        stage('Sync to Server') {
            steps {
                sshagent(credentials: ['server-ssh']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${SERVER_USER}@${SERVER_IP} 'mkdir -p ${BUILD_DIR}'
                    """
                    sh """
                        rsync -az --delete \
                            --exclude='.git' \
                            --exclude='node_modules' \
                            --exclude='dist' \
                            -e 'ssh -o StrictHostKeyChecking=no' \
                            ./ ${SERVER_USER}@${SERVER_IP}:${BUILD_DIR}/
                    """
                }
            }
        }

        stage('Build & Deploy on Server') {
            steps {
                sshagent(credentials: ['server-ssh']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${SERVER_USER}@${SERVER_IP} '
                            cd ${BUILD_DIR} &&
                            docker build -t ${IMAGE_NAME}:${IMAGE_TAG} -f Dockerfile.production . &&
                            cd ${DEPLOY_DIR} &&
                            sed -i "s|^ADMIN_IMAGE=.*|ADMIN_IMAGE=${IMAGE_NAME}:${IMAGE_TAG}|" .env.production &&
                            docker compose --env-file .env.production -f compose.yml up -d --no-deps admin &&
                            echo "✅ 构建部署完成: ${IMAGE_NAME}:${IMAGE_TAG}"
                        '
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ 管理端部署成功！镜像: ${IMAGE_NAME}:${IMAGE_TAG}"
        }
        failure {
            echo "❌ 管理端部署失败，请检查日志"
        }
    }
}
