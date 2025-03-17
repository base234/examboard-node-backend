# Examboard Backend

This is the backend of the examboard application.

The frontend repo of the project: [http://github.com/base234/examboard-react-frontend](http://github.com/base234/examboard-react-frontend)

AI repo of the project: [http://github.com/base234/examboard-fastapi-ai](http://github.com/base234/examboard-fastapi-ai)

You can either use Docker or install the dependencies manually. Both the methods are explained below.

## Manually
### 1. Download the project to your local machine (SSH)
```
git clone git@github.com:base234/examboard-node-backend.git
```

### 2. Navigate to the project directory
```
cd examboard-node-backend
```

### 3. Installation

```
npm install
```

## 4. Run

```
npm run dev
```

## Docker
### 1. Build the image
```
docker compose up -d --build
```

### 2. Run the image
```
docker run -p 3333:3333 -d examboard-backend
```

The project running link or PORT: [http://localhost:3000](http://localhost:3333)
