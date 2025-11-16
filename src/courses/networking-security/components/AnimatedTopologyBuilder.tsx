import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
  Node,
  Edge,
  Connection,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { Router, Shield, Server } from 'lucide-react';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Internet' },
    position: { x: 250, y: 5 },
  },
];

let id = 2;
const getId = () => `${id++}`;

const Sidebar = ({ onClear, onRestore }: { onClear: () => void; onRestore: (nodes: Node[], edges: Edge[]) => void; }) => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const simpleWebServerTopology = {
    nodes: [
      { id: '1', type: 'input', data: { label: 'Internet' }, position: { x: 250, y: 5 } },
      { id: '2', type: 'Firewall', data: { label: 'Firewall' }, position: { x: 250, y: 100 } },
      { id: '3', type: 'Server', data: { label: 'Web Server' }, position: { x: 250, y: 200 } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
    ],
  };

  const dmzTopology = {
    nodes: [
        { id: '1', type: 'input', data: { label: 'Internet' }, position: { x: 350, y: 5 } },
        { id: '2', type: 'Firewall', data: { label: 'External Firewall' }, position: { x: 350, y: 100 } },
        { id: '3', type: 'Server', data: { label: 'Web Server (DMZ)' }, position: { x: 200, y: 200 } },
        { id: '4', type: 'Firewall', data: { label: 'Internal Firewall' }, position: { x: 350, y: 300 } },
        { id: '5', type: 'Server', data: { label: 'App Server' }, position: { x: 350, y: 400 } },
        { id: '6', type: 'Server', data: { label: 'Database' }, position: { x: 500, y: 400 } },
    ],
    edges: [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' },
        { id: 'e2-4', source: '2', target: '4' },
        { id: 'e4-5', source: '4', target: '5' },
        { id: 'e4-6', source: '4', target: '6' },
    ],
  };

  return (
    <aside className="border-r-2 border-gray-200 p-4 text-sm bg-gray-50 w-64">
      <h3 className="text-xl font-semibold mb-4">Network Components</h3>
      <div className="space-y-4">
        <div
          className="p-4 border rounded-lg flex items-center space-x-2 cursor-grab bg-white shadow-md"
          onDragStart={(event) => onDragStart(event, 'Router')}
          draggable
        >
          <Router className="w-6 h-6" />
          <span>Router</span>
        </div>
        <div
          className="p-4 border rounded-lg flex items-center space-x-2 cursor-grab bg-white shadow-md"
          onDragStart={(event) => onDragStart(event, 'Firewall')}
          draggable
        >
          <Shield className="w-6 h-6" />
          <span>Firewall</span>
        </div>
        <div
          className="p-4 border rounded-lg flex items-center space-x-2 cursor-grab bg-white shadow-md"
          onDragStart={(event) => onDragStart(event, 'Server')}
          draggable
        >
          <Server className="w-6 h-6" />
          <span>Server</span>
        </div>
      </div>
      <h3 className="text-xl font-semibold mt-8 mb-4">Examples</h3>
      <div className="space-y-2">
        <button onClick={() => onRestore(simpleWebServerTopology.nodes, simpleWebServerTopology.edges)} className="w-full text-left p-2 rounded-lg hover:bg-gray-200">Simple Web Server</button>
        <button onClick={() => onRestore(dmzTopology.nodes, dmzTopology.edges)} className="w-full text-left p-2 rounded-lg hover:bg-gray-200">DMZ Setup</button>
      </div>
      <h3 className="text-xl font-semibold mt-8 mb-4">Actions</h3>
      <button onClick={onClear} className="w-full p-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Clear</button>
    </aside>
  );
};

const TopologyExplanation = () => (
    <div className="p-6 bg-gray-50 rounded-lg shadow-inner mt-6">
      <h2 className="text-2xl font-bold mb-4">Understanding Network Topologies</h2>
      <div className="space-y-4">
        <p>A network topology is the arrangement of the elements (links, nodes, etc.) of a communication network. It can be used to define or describe the arrangement of various types of telecommunication networks, including command and control radio networks, industrial fieldbusses, and computer networks.</p>
        
        <h3 className="text-xl font-semibold mt-4">When and How to Set Up a Network Topology</h3>
        <p>You design a network topology based on your application's requirements for security, scalability, and availability. For example:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>A simple blog might only need a single web server behind a firewall.</li>
          <li>A corporate network needs to separate its internal network from the internet, often using a Demilitarized Zone (DMZ) to host public-facing servers.</li>
          <li>A large-scale microservices application requires a complex topology with service discovery, load balancing, and potentially a service mesh.</li>
        </ul>
        <p>The builder above allows you to drag and drop components to visualize these architectures. You can connect them by dragging from the handles of each node.</p>

        <h3 className="text-xl font-semibold mt-4">On-Premise vs. Cloud Networking</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-bold mb-2">On-Premise</h4>
            <p>In a traditional on-premise setup, you are responsible for everything:</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li><strong>Physical Hardware:</strong> You buy and maintain physical routers, switches, firewalls, and servers.</li>
              <li><strong>Cabling:</strong> You run and manage all the physical network cables.</li>
              <li><strong>Configuration:</strong> You manually configure IP addresses, subnets, routing tables, and firewall rules on each device.</li>
              <li><strong>Scalability:</strong> Scaling up requires purchasing and installing new hardware, which can be slow and expensive.</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-bold mb-2">Cloud (e.g., AWS, Azure, GCP)</h4>
            <p>Cloud providers abstract away the physical layer and provide networking as a service:</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li><strong>Virtual Networking:</strong> You define your network using software. For example, in AWS, you create a Virtual Private Cloud (VPC).</li>
              <li><strong>Under the Hood:</strong> The cloud provider manages a massive physical infrastructure. Your "virtual router" is a highly available, distributed system running on their hardware. When you create a subnet, they allocate a CIDR block and manage the underlying VLANs and routing.</li>
              <li><strong>Software-Defined:</strong> Firewalls (Security Groups, NACLs), Load Balancers, and Gateways are all software-defined services you configure through an API or web console.</li>
              <li><strong>Scalability:</strong> You can create or resize networks and components in minutes, paying only for what you use. This is achieved through massive automation and resource pooling on the provider's side.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

const AnimatedTopologyBuilder: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (reactFlowWrapper.current) {
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData('application/reactflow');

        if (typeof type === 'undefined' || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });
        const newNode: Node = {
          id: getId(),
          type,
          position,
          data: { label: `${type}` },
        };

        setNodes((nds) => nds.concat(newNode));
      }
    },
    [reactFlowInstance, setNodes]
  );

  const onClear = () => {
    setNodes(initialNodes);
    setEdges([]);
  };

  const onRestore = (nodes: Node[], edges: Edge[]) => {
    setNodes(nodes);
    setEdges(edges);
  };

  return (
    <div>
        <div className="flex h-[600px] border rounded-lg" ref={reactFlowWrapper}>
        <ReactFlowProvider>
            <Sidebar onClear={onClear} onRestore={onRestore} />
            <div className="flex-grow h-full">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={setReactFlowInstance}
                onDrop={onDrop}
                onDragOver={onDragOver}
                fitView
            >
                <Controls />
                <MiniMap />
                <Background gap={12} size={1} />
            </ReactFlow>
            </div>
        </ReactFlowProvider>
        </div>
        <TopologyExplanation />
    </div>
  );
};

export default AnimatedTopologyBuilder;
