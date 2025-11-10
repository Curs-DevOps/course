

import React from 'react';
import { Cpu, GitBranch, Shield, Server, Zap, HeartPulse, MessageSquare, Box, Key, Telescope, BarChart, FileText, GitCommit } from 'lucide-react';
import { MicroservicesSlide } from './types';
import ApiGatewaySimulation from './components/ApiGatewaySimulation';
import ServiceDiscoveryAnimation from './components/ServiceDiscoveryAnimation';
import CircuitBreakerAnimation from './components/CircuitBreakerAnimation';
import EventDrivenArchitectureAnimation from './components/EventDrivenArchitectureAnimation';
import SidecarPatternAnimation from './components/SidecarPatternAnimation';
import OutboxPatternAnimation from './components/OutboxPatternAnimation';
import VaultAnimation from './components/VaultAnimation';
import ObservabilityAnimation from './components/ObservabilityAnimation';
import MetricsLogsTracesDiagram from './components/MetricsLogsTracesDiagram';

export const microservicesCourseSlides: MicroservicesSlide[] = [
  {
    title: 'Introduction to Microservices',
    icon: <GitBranch className="w-8 h-8" />,
    mode: 'lecture',
    content: (
      <div className="space-y-4">
        <p className="text-lg">Welcome to the Microservices Architecture course! We'll explore how to build scalable, resilient, and maintainable applications.</p>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Core Concepts</h3>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Decomposition:</strong> Breaking down large applications into smaller, independent services.</li>
            <li><strong>Autonomy:</strong> Each service can be developed, deployed, and scaled independently.</li>
            <li><strong>Resilience:</strong> Failure in one service does not cascade to the entire application.</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: 'API Gateway Pattern',
    icon: <Shield className="w-8 h-8" />,
    mode: 'interactive',
    steps: [
      {
        title: 'What is an API Gateway?',
        instructions: 'An API Gateway is a single entry point for all clients. It handles requests by routing them to the appropriate microservice, and can also be used for authentication, SSL termination, and rate limiting.',
        simulation: 'ApiGateway',
        expected: 'The simulation shows how requests are routed to different services. Notice that requests to `/api/orders` fail because no route is configured yet.',
      },
      {
        title: 'Try it: Add a Route',
        instructions: 'Let\'s add a route for the Orders Service. Modify the configuration below to map `/api/orders` to the `orders` service.',
        code: {
          language: 'json',
          content: `{\n  "/api/users": "users",\n  "/api/products": "products"\n}`,
        },
        expected: 'After adding the route, requests to `/api/orders` in the simulation should now succeed.',
      },
    ],
  },
  {
    title: 'Service Discovery',
    icon: <Server className="w-8 h-8 text-cyan-500" />,
    mode: 'interactive',
    steps: [
      {
        title: 'The Problem of Service Location',
        instructions: 'In a dynamic microservices environment, service instances are constantly starting and stopping, and their IP addresses change. How does a client find the correct, healthy instance of a service? This is where Service Discovery comes in.',
        simulation: 'ServiceDiscovery',
        expected: 'The simulation shows a client asking the Discovery Server for a service location and getting routed to a healthy instance.',
      },
      {
        title: 'Try it: Service Failure',
        instructions: 'Services can become unhealthy. Click the green checkmark next to a "Users Service" instance to simulate a failure. Now, when the client requests the Users Service, it should be routed to the remaining healthy instance.',
        expected: 'Requests should avoid the unhealthy service instance.',
      },
    ],
  },
  {
    title: 'Circuit Breaker Pattern',
    icon: <HeartPulse className="w-8 h-8 text-red-500" />,
    mode: 'interactive',
    steps: [
      {
        title: 'Preventing Cascading Failures',
        instructions: 'When one service is slow or unavailable, repeated requests can overwhelm it and also exhaust resources in the calling service. The Circuit Breaker pattern prevents this by "tripping" and stopping further requests for a while.',
        simulation: 'CircuitBreaker',
        expected: 'The simulation shows a client making requests to a service through a circuit breaker.',
      },
      {
        title: 'Try it: Induce Failures',
        instructions: 'Start the simulation and then toggle the service to "Failing". Observe how the circuit breaker trips to the "OPEN" state after 3 consecutive failures. It will stop sending requests to the failing service and start short-circuiting them immediately.',
        expected: 'The breaker opens, and subsequent requests are short-circuited, preventing the failing service from being called.',
      },
      {
        title: 'Try it: Service Recovery',
        instructions: 'After 5 seconds in the "OPEN" state, the breaker moves to "HALF-OPEN". It will send a single test request. If it succeeds, the breaker will close. Toggle the service back to "Healthy" to see this in action.',
        expected: 'The breaker moves to HALF-OPEN, and upon a successful request, returns to the CLOSED state, resuming normal operation.',
      },
    ],
  },
  {
    title: 'Event-Driven Architecture',
    icon: <MessageSquare className="w-8 h-8 text-pink-500" />,
    mode: 'interactive',
    steps: [
      {
        title: 'Decoupling Services with Events',
        instructions: 'Instead of making direct requests, services can communicate asynchronously by producing and consuming events. This decouples services and improves resilience.',
        simulation: 'EventDrivenArchitecture',
        expected: 'The simulation shows an Order Service publishing an event to a message broker.',
      },
      {
        title: 'Try it: Queue vs. Pub/Sub',
        instructions: 'Switch between "Message Queue" and "Publish/Subscribe" modes. In Queue mode, only one consumer (Payments) receives the event. In Pub/Sub mode, both Payments and Notifications receive a copy of the event.',
        expected: 'Observe how the event is delivered to one or many consumers based on the selected mode.',
      },
    ],
  },
  {
    title: 'Sidecar Pattern',
    icon: <Box className="w-8 h-8 text-purple-500" />,
    mode: 'interactive',
    steps: [
      {
        title: 'Handling Cross-Cutting Concerns',
        instructions: 'A sidecar is a container that runs alongside your main application container. It\'s used to add functionality like logging, monitoring, and security without changing the application code.',
        simulation: 'SidecarPattern',
        expected: 'The simulation shows a request hitting the App Container, which then offloads telemetry data to its OpenTelemetry (OTel) sidecar.',
      },
      {
        title: 'Follow the Telemetry',
        instructions: 'When you send a request, the App Container generates telemetry (logs/traces). The OTel sidecar collects this data and forwards it to the Observability Platform, keeping the main application clean and focused on its business logic.',
        expected: 'The animation shows telemetry flowing from the app to the sidecar, and then from the sidecar to the backend platform.',
      },
    ],
  },
  {
    title: 'Outbox Pattern',
    icon: <GitCommit className="w-8 h-8 text-blue-500" />,
    mode: 'interactive',
    steps: [
      {
        title: 'The Challenge: Dual Writes',
        instructions: (
          <div className="space-y-2">
            <p>Imagine your Order Service needs to save an order to its database AND publish an `OrderCreated` event to a message broker. What happens if the database write succeeds, but the message broker is down and the publish fails?</p>
            <p>You end up with inconsistent state—the order exists in your system, but no other services (like notifications or payments) ever find out about it. This is known as the "dual write problem."</p>
          </div>
        ),
        expected: 'A failure in one system can lead to data inconsistency across your application.',
      },
      {
        title: 'The Solution: The Outbox Pattern',
        instructions: (
          <div className="space-y-2">
            <p>This pattern solves the problem by making the state change and the event creation part of the same, single, atomic database transaction.</p>
            <ul className="list-disc list-inside pl-4">
              <li>An "outbox" table is added to the service's own database.</li>
              <li>When creating an order, the service starts a transaction, saves the order to the `orders` table, AND saves the event to the `outbox` table. It then commits the transaction.</li>
              <li>This guarantees that the event is captured if, and only if, the order was successfully created.</li>
            </ul>
          </div>
        ),
        expected: 'Atomicity is achieved by using a local database transaction.',
      },
      {
        title: 'Try it: Run the Simulation',
        instructions: 'Click "Run Simulation" to see the full, automated flow. A separate "Message Relay" process monitors the outbox table. It will pick up the event, publish it to the broker, and then delete it from the outbox, ensuring reliable, at-least-once delivery.',
        simulation: 'OutboxPattern',
        expected: 'Observe how the database transaction is atomic and how the relay ensures the message is sent.',
      },
    ],
  },
  {
    title: 'Vault for Secrets Management',
    icon: <Key className="w-8 h-8 text-gray-700" />,
    mode: 'interactive',
    steps: [
      {
        title: 'Dynamic Secrets',
        instructions: 'Hardcoding credentials is a major security risk. A secrets manager like Vault allows services to fetch secrets dynamically and securely at runtime.',
        simulation: 'Vault',
        expected: 'Follow the steps to see how a service gets its database credentials from Vault.',
      },
      {
        title: 'Step-by-Step Simulation',
        instructions: 'Use the "Next Step" button to walk through the flow: 1. The service authenticates to Vault. 2. Vault returns a temporary token. 3. The service uses the token to request the DB secret. 4. Vault provides the secret. 5. The service can now connect to the database.',
        expected: 'The service starts successfully without ever having credentials stored in its code or configuration.',
      },
    ],
  },
  {
    title: 'Observability with OpenTelemetry',
    icon: <Telescope className="w-8 h-8 text-indigo-500" />,
    mode: 'interactive',
    steps: [
      {
        title: 'What is Distributed Tracing?',
        instructions: 'In a microservices architecture, a single user request can travel through dozens of services. If something fails or is slow, how do you find out where the problem is? Distributed tracing assigns a unique Trace ID to each request, allowing you to follow its entire journey.',
        expected: 'A trace gives you a complete picture of a request\'s lifecycle.',
      },
      {
        title: 'Try it: Generate a Trace',
        instructions: 'Click "Generate Trace" to simulate a request. You\'ll see the request flow through the services and then see the corresponding "flame graph" get built. This graph visualizes how much time was spent in each service and shows the parent/child relationships between operations (spans).',
        simulation: 'Observability',
        expected: 'The flame graph shows the full request path and helps identify bottlenecks.',
      },
    ],
  },
  {
    title: 'Metrics, Logs, and Traces',
    icon: <BarChart className="w-8 h-8" />,
    mode: 'interactive',
    steps: [
      {
        title: 'The Three Pillars of Observability',
        instructions: 'Metrics, logs, and traces are often called the three pillars of observability. They give you different views into your system\'s health.',
        simulation: 'MetricsLogsTraces',
        expected: 'The diagram shows the three pillars.',
      },
      {
        title: 'Try it: Correlate the Pillars',
        instructions: 'This diagram shows the relationship between the three pillars. Click the red spike in the "Metrics" graph. This simulates an increase in errors. Notice how the corresponding error logs are highlighted. The `traceId` in those logs would then lead you to the full distributed trace for each failed request.',
        expected: 'See how you can pivot from high-level metrics to specific logs and traces to debug an issue.',
      },
    ],
  },
];

