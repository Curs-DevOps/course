
import { HardHat, Layers, ShieldCheck, Terminal, Sailboat, FileCode } from 'lucide-react';
import { DockerSlide } from './types';

export const dockerCourseSlides: DockerSlide[] = [
  {
    title: 'Introduction to Docker',
    icon: <Sailboat className="w-8 h-8" />,
    mode: 'lecture',
    content: (
      <div className="space-y-4">
        <p className="text-lg">Docker is a platform for developing, shipping, and running applications in containers.</p>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Why Docker?</h3>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Consistency:</strong> Ensures your application works the same everywhere.</li>
            <li><strong>Isolation:</strong> Keeps applications and their dependencies separate.</li>
            <li><strong>Efficiency:</strong> Containers are lightweight and start quickly.</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: 'The Java Project',
    icon: <FileCode className="w-8 h-8" />,
    mode: 'lecture',
    content: (
      <div className="space-y-4">
        <p className="text-lg">We will be containerizing a simple Java application. Here is the project structure:</p>
        <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm">
          {
`java-app/
├── pom.xml
└── src/
    └── main/
        └── java/
            └── com/
                └── example/
                    └── Main.java`
          }
        </pre>
        <p className="text-lg">And here is the code for `Main.java`:</p>
        <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm">
          {
`package com.example;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Docker!");
    }
}`
          }
        </pre>
      </div>
    ),
  },
  {
    title: 'Basic Build - Step by Step',
    icon: <HardHat className="w-8 h-8" />,
    mode: 'interactive',
    steps: [
      {
        title: 'Step 1: The Base Image',
        instructions: 'Every Dockerfile starts with a `FROM` instruction. This specifies the base image to use. For our Java application, we will use an OpenJDK image. Fill in the blank to use `openjdk`.',
        dockerfile: `
FROM ____:8-jdk-alpine
`,
        expected: 'The Dockerfile now has a base image.',
        command: 'docker build -t basic-build .'
      },
      {
        title: 'Step 2: The Working Directory',
        instructions: 'The `WORKDIR` instruction sets the working directory for any subsequent instructions. Fill in the blank to set the working directory to `/app`.',
        dockerfile: `
FROM openjdk:8-jdk-alpine

____ /app
`,
        expected: 'The working directory is set.',
        command: 'docker build -t basic-build .'
      },
      {
        title: 'Step 3: Copying Files',
        instructions: 'The `COPY` instruction copies files from the host to the container. Fill in the blank to copy the JAR file to the container.',
        dockerfile: `
FROM openjdk:8-jdk-alpine

WORKDIR /app

____ java-app/target/simple-java-app-1.0.0-jar-with-dependencies.jar /app/app.jar
`,
        expected: 'The JAR file is copied to the container.',
        command: 'docker build -t basic-build .'
      },
      {
        title: 'Step 4: The Command',
        instructions: 'The `CMD` instruction specifies the command to run when the container starts. Fill in the blank to run the Java application.',
        dockerfile: `
FROM openjdk:8-jdk-alpine

WORKDIR /app

COPY java-app/target/simple-java-app-1.0.0-jar-with-dependencies.jar /app/app.jar

____ ["java", "-jar", "/app/app.jar"]
`,
        expected: 'The container will run the Java application on start.',
        command: 'docker run basic-build'
      },
    ],
  },
  {
    title: 'Multi-stage Builds - Step by Step',
    icon: <Layers className="w-8 h-8" />,
    mode: 'interactive',
    steps: [
      {
        title: 'Step 1: The Build Stage',
        instructions: 'A multi-stage build has multiple `FROM` instructions. The first stage will be our build stage. We will use a Maven image to build our application. Fill in the blank to name this stage `build`.',
        dockerfile: `
# Build stage
FROM maven:3.6.3-jdk-8-alpine AS ____

WORKDIR /app

COPY java-app/pom.xml .
COPY java-app/src ./src

RUN mvn -f pom.xml clean package
`,
        expected: 'The build stage is now defined.',
        command: 'docker build --target build -t multi-stage-build .'
      },
      {
        title: 'Step 2: The Package Stage',
        instructions: 'The second stage is the package stage. We will use a lightweight JRE image. Then we will copy the built JAR from the `build` stage. Fill in the blank to copy from the `build` stage.',
        dockerfile: `
# Build stage
FROM maven:3.6.3-jdk-8-alpine AS build

WORKDIR /app

COPY java-app/pom.xml .
COPY java-app/src ./src

RUN mvn -f pom.xml clean package

# Package stage
FROM openjdk:8-jre-alpine

WORKDIR /app

COPY --from=____ /app/target/simple-java-app-1.0.0-jar-with-dependencies.jar /app/app.jar

CMD ["java", "-jar", "/app/app.jar"]
`,
        expected: 'A smaller, more secure image.',
        command: 'docker build -t multi-stage-build .'
      },
    ],
  },
  {
    title: 'Security Features',
    icon: <ShieldCheck className="w-8 h-8" />,
    mode: 'interactive',
    steps: [
      {
        title: 'Run as a Non-root User',
        instructions: 'Running as a non-root user is a security best practice. We will create a new user and group, and then switch to that user. Fill in the blank to switch to the `appuser` user.',
        dockerfile: `
FROM openjdk:8-jre-alpine

WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

____ appuser

COPY --from=build /app/target/simple-java-app-1.0.0-jar-with-dependencies.jar /app/app.jar

CMD ["java", "-jar", "/app/app.jar"]
`,
        expected: 'The application runs as a non-root user.',
        command: 'docker build -t secure-build .'
      },
    ],
  },
  {
    title: 'Docker Compose',
    icon: <Terminal className="w-8 h-8" />,
    mode: 'interactive',
    steps: [
      {
        title: 'Step 1: The Services',
        instructions: 'A `docker-compose.yml` file defines a set of services. We will define two services: `app` for our Java application and `db` for the PostgreSQL database. Fill in the blanks to define the services.',
        dockerfile: `
version: '3.8'
services:
  ____:
    build: .
    ports:
      - "8080:8080"
    environment:
      - DB_HOST=db
      - DB_NAME=postgres
      - DB_USER=postgres
      - DB_PASSWORD=postgres
    depends_on:
      - db

  ____:
    image: postgres:13
    environment:
      - POSTGRES_DB=postgres
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
`,
        expected: 'The services are now defined.',
        command: 'docker-compose up -d'
      },
    ],
  },
];
