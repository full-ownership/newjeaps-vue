# 1단계: Vue 애플리케이션 빌드
FROM node:18 AS build-stage

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 설치
COPY package*.json ./
RUN npm install

# 소스 코드 복사
COPY . .

# Vue 애플리케이션 빌드
RUN npm run build

# 2단계: Nginx를 사용하여 빌드된 파일 서빙
FROM nginx:alpine AS production-stage

# Nginx의 기본 설정 파일 덮어쓰기 (필요시)
COPY ./nginx.conf /etc/nginx/nginx.conf

# 빌드된 Vue 애플리케이션을 Nginx의 html 폴더로 복사
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 포트 60에서 실행
EXPOSE 60

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
