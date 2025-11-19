import {
  ShieldCheck,
  Network,
  Layers,
  Router,
  Shield,
  Server,
  AlertTriangle,
  Eye,
  GitBranch,
  Waypoints,
  Target,
  FolderLock,
  Globe,
} from 'lucide-react';
import { NetworkingSecuritySlide } from './types';
import AnimatedTopologyBuilder from './components/AnimatedTopologyBuilder';
import AttackDefenseSimulator from './components/AttackDefenseSimulator';
import CertificateManager from './components/CertificateManager';
import DDoSSimulator from './components/DDoSSimulator';
import FirewallSimulator from './components/FirewallSimulator';
import ObservabilityDashboard from './components/ObservabilityDashboard';
import PacketSpoofing from './components/PacketSpoofing';
import PacketTracer from './components/PacketTracer';
import PortScanner from './components/PortScanner';
import SubnetCalculator from './components/SubnetCalculator';
import TLSHandsake from './components/TLSHandsake';
import VLanSim from './components/VLanSim';
import VPNSimulator from './components/VPNSimulator';
import ZeroTrust from './components/ZeroTrust';
import OSILayers from './components/OSILayers';


export const networkingSecurityCourseSlides: NetworkingSecuritySlide[] = [
  {
    title: 'Welcome to Networking & Security',
    icon: <Network className="w-8 h-8 text-blue-500" />,
    mode: 'lecture',
    content: (
      <div className="space-y-4 text-lg">
        <p>This course is your gateway to understanding how computer networks operate and how to protect them. We'll start with the basics and build up to advanced security concepts, using interactive simulations to make learning engaging and effective.</p>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-xl mb-2">What You'll Learn:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li><span className="font-semibold">The OSI Model:</span> Understand the seven layers of networking.</li>
            <li><span className="font-semibold">Core Protocols:</span> Learn how TCP/IP, DNS, and other protocols run the internet.</li>
            <li><span className="font-semibold">Network Design:</span> Create virtual networks, subnets, and VLANs.</li>
            <li><span className="font-semibold">Security Fundamentals:</span> Implement firewalls, VPNs, and zero-trust security.</li>
            <li><span className="font-semibold">Observability:</span> Monitor network health with modern tools like Prometheus and Grafana.</li>
          </ul>
        </div>
        <p>No prior experience is needed. Let's get started on your journey to becoming a networking and security pro!</p>
      </div>
    ),
  },
  {
    title: 'The OSI Model: A Layered Approach',
    icon: <Layers className="w-8 h-8 text-teal-500" />,
    mode: 'simulation',
    simulation: <OSILayers />,
    content: (
      <div className="mt-4 space-y-4 text-lg">
        <p>The OSI (Open Systems Interconnection) model is a foundational concept in networking. It's a conceptual framework that standardizes the functions of a telecommunication or computing system into seven distinct layers. Each layer performs specific tasks and communicates with the layers directly above and below it.</p>
        <p>Think of it like a postal service: each step (writing the letter, putting it in an envelope, addressing it, sorting it, delivering it) is a layer. Each layer has a specific job, and together they ensure the letter gets from sender to receiver.</p>
        <p className="font-semibold">Interact with the simulation to visualize how data is encapsulated (wrapped) as it moves down the layers on the sending device and de-encapsulated (unwrapped) as it moves up the layers on the receiving device. Pay attention to what information is added or removed at each stage.</p>
      </div>
    )
  },
  {
    title: 'Core Protocols: IP, TCP/UDP, and DNS',
    icon: <Globe className="w-8 h-8 text-green-500" />,
    mode: 'simulation',
    simulation: <PacketTracer />,
    content: (
      <div className="mt-4 space-y-4 text-lg">
        <p>The internet relies on a suite of protocols to function. Here are some of the most critical ones:</p>
        <ul className="list-disc list-inside space-y-2 bg-gray-50 p-4 rounded-lg">
          <li><span className="font-semibold">IP (Internet Protocol):</span> This is like the postal address system for the internet. Every device connected to a network has an IP address (e.g., 192.168.1.1 or 2001:0db8::1). IP is responsible for routing packets of data from a source host to a destination host solely based on their IP addresses. It doesn't guarantee delivery, just best-effort forwarding.</li>
          <li><span className="font-semibold">TCP (Transmission Control Protocol):</span> TCP sits on top of IP and provides reliable, ordered, and error-checked delivery of a stream of bytes between applications. It establishes a connection, ensures all data arrives, and re-sends anything lost. Think of it as sending a registered letter – you get a confirmation of receipt. Used for web browsing (HTTP/HTTPS), email (SMTP), and file transfer (FTP).</li>
          <li><span className="font-semibold">UDP (User Datagram Protocol):</span> Also sits on top of IP, but unlike TCP, UDP is connectionless and unreliable. It sends data packets without establishing a connection or guaranteeing delivery. This makes it faster and more efficient for applications where speed is more important than guaranteed delivery, like video streaming, online gaming, or DNS lookups. Think of it as shouting a message across a room – you hope they hear it, but you don't wait for confirmation.</li>
          <li><span className="font-semibold">DNS (Domain Name System):</span> This is the internet's phonebook. When you type a website address like "www.google.com" into your browser, DNS translates that human-readable name into an IP address (e.g., 142.250.190.78) that computers can understand. Without DNS, you'd have to remember long strings of numbers for every website you visit!</li>
        </ul>
        <p className="font-semibold">This simulation allows you to trace a packet's journey. Observe how the packet is addressed (IP), how its delivery is managed (TCP/UDP), and how domain names are resolved (DNS) to ensure it reaches its destination.</p>
      </div>
    )
  },
  {
    title: 'Subnetting and VLANs: Organizing Your Network',
    icon: <GitBranch className="w-8 h-8 text-indigo-500" />,
    mode: 'interactive',
    steps: [
      {
        title: 'Subnet Calculator: Dividing Networks',
        instructions: (
          <div className="space-y-2">
            <p>Subnetting is the practice of dividing a large network into smaller, more efficient sub-networks (subnets). This helps in managing IP addresses, improving network performance, and enhancing security by isolating traffic.</p>
            <p>An IP address consists of a network portion and a host portion. The subnet mask determines which part is which. CIDR (Classless Inter-Domain Routing) notation, like <code className="bg-gray-100 px-1 rounded">192.168.1.0/24</code>, is a concise way to represent an IP address and its subnet mask. The <code className="bg-gray-100 px-1 rounded">/24</code> indicates that the first 24 bits are for the network, leaving 8 bits for hosts.</p>
            <p>Use the calculator below to input an IP address and a CIDR mask. Observe how changing the mask affects the number of available IP addresses within that subnet and how many subnets can be created from a larger block. Experiment with different CIDR values (e.g., /16, /24, /27) to see their impact.</p>
          </div>
        ),
        component: <SubnetCalculator />,
        expected: 'You should be able to calculate network addresses, broadcast addresses, and the range of usable IP addresses for a given subnet. This is crucial for efficient IP address management and network design.',
      },
      {
        title: 'VLAN Simulator: Virtual Network Segmentation',
        instructions: (
          <div className="space-y-2">
            <p>VLANs (Virtual Local Area Networks) allow you to logically segment a network at Layer 2 (Data Link Layer) of the OSI model, even if devices are connected to the same physical switch. This means you can group devices together as if they were on their own separate network, regardless of their physical location.</p>
            <p>For example, you can create a "Marketing" VLAN and an "Engineering" VLAN. Devices in the Marketing VLAN can only communicate with each other directly, and similarly for Engineering. To communicate between VLANs, traffic must pass through a router or a Layer 3 switch, which can enforce security policies.</p>
            <p>In this simulator, create different VLANs and assign devices to them. Observe how traffic within a VLAN flows freely, but traffic between different VLANs is blocked unless explicitly routed. This demonstrates how VLANs enhance security by isolating sensitive traffic and improve network performance by reducing broadcast domains.</p>
          </div>
        ),
        component: <VLanSim />,
        expected: 'You should understand how VLANs provide logical segmentation, improve security by isolating traffic, and optimize network performance by reducing broadcast traffic within a segment.',
      },
    ],
  },
  {
    title: 'Firewalls and Basic Routing',
    icon: <Router className="w-8 h-8 text-red-500" />,
    mode: 'simulation',
    simulation: <FirewallSimulator />,
    content: (
      <div className="mt-4 space-y-4 text-lg">
        <p>A <span className="font-semibold">firewall</span> is your network's first line of defense. It's a security device (hardware or software) that monitors and filters incoming and outgoing network traffic based on a set of predefined security rules. Think of it as a security guard at the entrance of a building, checking IDs and deciding who gets in and out.</p>
        <p>Firewalls can block traffic based on IP addresses, port numbers, protocols, and even application-level content. They are crucial for preventing unauthorized access and protecting your internal network from external threats.</p>
        <p><span className="font-semibold">Routing</span> is the process of selecting the best path for data packets to travel across networks. Routers are specialized devices that connect different networks and forward packets between them. They use routing tables to determine where to send each packet based on its destination IP address.</p>
        <p className="font-semibold">This simulation allows you to configure firewall rules (e.g., block all traffic from a specific IP, allow only web traffic on port 80/443) and observe how they affect network communication. You can also see how packets are routed between different network segments.</p>
      </div>
    )
  },
  {
    title: 'Build Your Own Network Topology',
    icon: <Waypoints className="w-8 h-8 text-purple-500" />,
    mode: 'simulation',
    simulation: <AnimatedTopologyBuilder />,
    content: (
      <div className="mt-4 space-y-4 text-lg">
        <p>A <span className="font-semibold">network topology</span> describes the physical or logical arrangement of the elements (nodes, links, etc.) of a communication network. It's essentially the layout of your network.</p>
        <p>Common topologies include:</p>
        <ul className="list-disc list-inside space-y-1 bg-gray-50 p-4 rounded-lg">
          <li><span className="font-semibold">Star:</span> All devices connect to a central hub or switch. (e.g., most home networks)</li>
          <li><span className="font-semibold">Bus:</span> All devices share a single communication line. (less common now)</li>
          <li><span className="font-semibold">Ring:</span> Devices are connected in a circular fashion.</li>
          <li><span className="font-semibold">Mesh:</span> Every device is connected to every other device, providing high redundancy.</li>
        </ul>
        <p className="font-semibold">This interactive builder allows you to drag and drop various network components (routers, switches, PCs, servers) and connect them to design your own network topology. Experiment with different layouts and observe how they might affect data flow and redundancy. This helps you understand the practical implications of different network designs.</p>
      </div>
    )
  },
  {
    title: 'Principles of Network Security: The CIA Triad',
    icon: <ShieldCheck className="w-8 h-8 text-green-600" />,
    mode: 'lecture',
    content: (
        <div className="space-y-4 text-lg">
            <p>At the heart of network security are three fundamental principles, often referred to as the <span className="font-semibold">"CIA Triad"</span>:</p>
            <ul className="list-disc list-inside space-y-2 bg-gray-50 p-4 rounded-lg">
              <li><span className="font-semibold">Confidentiality:</span> This principle ensures that information is not disclosed to unauthorized individuals, entities, or processes. It's about keeping secrets secret.
                <ul className="list-circle list-inside ml-4">
                  <li><span className="font-medium">Example:</span> Encrypting sensitive data so only those with the correct key can read it. Using strong passwords and access controls.</li>
                </ul>
              </li>
              <li><span className="font-semibold">Integrity:</span> This principle ensures that data remains accurate, consistent, and trustworthy throughout its lifecycle. It's about preventing unauthorized modification or corruption of data.
                <ul className="list-circle list-inside ml-4">
                  <li><span className="font-medium">Example:</span> Using hashing algorithms to detect if a file has been tampered with. Implementing version control systems.</li>
                </ul>
              </li>
              <li><span className="font-semibold">Availability:</span> This principle ensures that authorized users can access information and resources when needed. It's about keeping systems and data operational.
                <ul className="list-circle list-inside ml-4">
                  <li><span className="font-medium">Example:</span> Implementing redundant systems (backups, failovers) to prevent downtime. Protecting against Denial-of-Service (DoS) attacks.</li>
                </ul>
              </li>
            </ul>
            <p>We will also explore the principle of <span className="font-semibold">Defense in Depth</span>, which involves layering multiple security controls (like firewalls, intrusion detection systems, and strong authentication) to protect assets. If one layer fails, another layer is there to provide protection.</p>
        </div>
    ),
  },
  {
    title: 'Modern Security Models: Zero Trust, VPNs, and TLS',
    icon: <Shield className="w-8 h-8 text-blue-600" />,
    mode: 'interactive',
    steps: [
      {
        title: 'Zero Trust Simulation: Never Trust, Always Verify',
        instructions: (
          <div className="space-y-2">
            <p>The <span className="font-semibold">Zero Trust</span> security model is a paradigm shift from traditional perimeter-based security. Instead of assuming everything inside the network is safe, Zero Trust operates on the principle of <span className="italic">"never trust, always verify."</span> This means no user or device is automatically trusted, regardless of whether they are inside or outside the network perimeter.</p>
            <p>Every access attempt to a resource must be authenticated, authorized, and continuously validated. This significantly reduces the risk of insider threats and lateral movement by attackers who might have breached an initial defense.</p>
            <p>In this simulation, you will enforce strict access controls. Observe how every request, even from an internal user, is subjected to rigorous authentication and authorization checks before access is granted. Try to bypass the system with an unverified request and see it blocked.</p>
          </div>
        ),
        component: <ZeroTrust />,
        expected: 'You should understand how Zero Trust minimizes the attack surface, prevents unauthorized lateral movement within a network, and enhances overall security posture by treating all access requests with suspicion.',
      },
      {
        title: 'VPN Simulator: Secure Remote Access',
        instructions: (
          <div className="space-y-2">
            <p>A <span className="font-semibold">VPN (Virtual Private Network)</span> creates a secure, encrypted "tunnel" over a public network, like the internet. It allows users to send and receive data across shared or public networks as if their computing devices were directly connected to the private network.</p>
            <p>VPNs are commonly used by remote employees to securely access their company's internal resources, protecting sensitive data from eavesdropping and tampering. The encryption ensures that even if data is intercepted, it cannot be read.</p>
            <p>In this simulator, set up a VPN connection between a remote user and a corporate network. Observe how the data traffic is encrypted before it leaves the user's device and decrypted only when it reaches the corporate network, ensuring confidentiality and integrity over an untrusted public internet connection.</p>
          </div>
        ),
        component: <VPNSimulator />,
        expected: 'You should gain practical knowledge of how VPNs provide confidentiality, integrity, and authenticity for remote connections, making them essential for secure remote work and accessing private resources over public networks.',
      },
      {
        title: 'TLS Handshake Explained: Securing Web Communication',
        instructions: (
          <div className="space-y-2">
            <p><span className="font-semibold">TLS (Transport Layer Security)</span>, the successor to SSL, is the cryptographic protocol that provides secure communication over a computer network. It's what makes HTTPS secure, ensuring that your web browsing, online banking, and other internet activities are private and protected.</p>
            <p>The <span className="font-semibold">TLS Handshake</span> is a complex series of steps that occurs when your browser (client) tries to establish a secure connection with a web server. During this handshake, the client and server:</p>
            <ol className="list-decimal list-inside ml-4 space-y-1">
              <li>Exchange "hello" messages to agree on the TLS version and cryptographic algorithms.</li>
              <li>Exchange digital certificates to verify each other's identities (server usually verifies to client).</li>
              <li>Generate and exchange session keys, which are used for encrypting the actual data transfer.</li>
            </ol>
            <p>This simulation breaks down each step of the TLS handshake. Pay close attention to the exchange of certificates, the role of public and private keys, and how a shared secret key is ultimately established for symmetric encryption of the data that follows.</p>
          </div>
        ),
        component: <TLSHandsake />,
        expected: 'You will have a clear visualization and understanding of the intricate steps involved in a TLS handshake, including certificate validation, key exchange, and the establishment of a secure, encrypted communication channel for web traffic.',
      },
      {
        title: 'Certificate Management: Trust on the Internet',
        instructions: (
          <div className="space-y-2">
            <p><span className="font-semibold">Digital Certificates</span> are electronic documents used to prove the ownership of a public key. They are issued by trusted third parties called <span className="font-semibold">Certificate Authorities (CAs)</span>. When you visit an HTTPS website, your browser checks the website's certificate to ensure it's legitimate and that the connection is secure.</p>
            <p>Certificates contain information about the owner (e.g., website domain), the CA that issued it, the public key, and a digital signature from the CA. This signature ensures the certificate hasn't been tampered with.</p>
            <p>Use this tool to simulate issuing a digital certificate for a service. Understand the different fields within a certificate, how it's signed by a CA, and how it's used by clients to establish trust and encrypt communication. Experiment with creating a self-signed certificate versus one issued by a recognized CA.</p>
          </div>
        ),
        component: <CertificateManager />,
        expected: 'You will understand the fundamental role of digital certificates and Certificate Authorities (CAs) in establishing trust and enabling secure, encrypted communication across the internet, particularly for HTTPS.',
      },
    ],
  },
  {
    title: 'Simulating Network Attacks: Understanding the Adversary',
    icon: <AlertTriangle className="w-8 h-8 text-red-600" />,
    mode: 'simulation',
    simulation: <AttackDefenseSimulator />,
    content: (
      <div className="mt-4 space-y-4 text-lg">
        <p>To effectively defend a network, you must understand how attackers operate. This simulation provides a safe environment to explore common attack vectors and their impact. By stepping into the shoes of an attacker, you can better appreciate the vulnerabilities in systems and the importance of robust defenses.</p>
        <p>This simulator allows you to launch various common attacks (e.g., SQL Injection, Cross-Site Scripting, Brute Force) against a simulated vulnerable web application. After launching an attack, you can switch to the defender's view to see how the attack manifests and what defensive measures (like input validation, WAF rules, strong authentication) can be implemented to mitigate or prevent it.</p>
        <p className="font-semibold">Launch an attack, observe its effects, and then apply a defensive measure to see how the system becomes more resilient. This hands-on experience reinforces the importance of secure coding practices and proper security configurations.</p>
      </div>
    )
  },
  {
    title: 'DDoS Attack Simulation: Overwhelming Defenses',
    icon: <Server className="w-8 h-8 text-red-700" />,
    mode: 'simulation',
    simulation: <DDoSSimulator />,
    content: (
      <div className="mt-4 space-y-4 text-lg">
        <p>A <span className="font-semibold">Distributed Denial-of-Service (DDoS)</span> attack is a malicious attempt to disrupt the normal traffic of a targeted server, service, or network by overwhelming the target or its surrounding infrastructure with a flood of Internet traffic. DDoS attacks achieve effectiveness by utilizing multiple compromised computer systems as sources of attack traffic.</p>
        <p>These attacks can lead to significant downtime, financial losses, and reputational damage for organizations. Understanding how they work is crucial for implementing effective mitigation strategies.</p>
        <p className="font-semibold">In this simulation, you can initiate a DDoS attack against a target server. Observe how the server's resources (CPU, memory, network bandwidth) are quickly exhausted, making it unresponsive to legitimate users. Then, activate various mitigation techniques (e.g., rate limiting, traffic filtering, using a cloud-based scrubbing service) and see how they help absorb or deflect the malicious traffic, restoring service availability.</p>
      </div>
    )
  },
  {
    title: 'Reconnaissance Techniques: Gathering Information',
    icon: <Target className="w-8 h-8 text-yellow-500" />,
    mode: 'interactive',
    steps: [
      {
        title: 'Port Scanner: Discovering Open Doors',
        instructions: (
          <div className="space-y-2">
            <p><span className="font-semibold">Port scanning</span> is a technique used by attackers to discover open ports on a network host. Each open port typically corresponds to a running service (e.g., web server on port 80/443, SSH on port 22). By identifying open ports, attackers can learn about the services running on a target and look for known vulnerabilities associated with those services.</p>
            <p>It's like rattling doorknobs on a building to see which ones are unlocked. While not inherently malicious, it's often the first step in an attack chain.</p>
            <p>Use the port scanner below to scan a simulated target machine. Observe which ports are reported as "open" or "closed." Try to infer what services might be running based on the open ports. This exercise demonstrates how attackers gather intelligence and why it's important to close unnecessary ports and secure all running services.</p>
          </div>
        ),
        component: <PortScanner />,
        expected: 'You will understand how port scanning works as a reconnaissance technique, how to interpret scan results, and the importance of minimizing your attack surface by closing unused ports and securing active services.',
      },
      {
        title: 'Packet Spoofing: Masquerading as Another',
        instructions: (
          <div className="space-y-2">
            <p><span className="font-semibold">Packet spoofing</span> is the creation of IP packets with a false source IP address. The attacker modifies the source address in the packet header to impersonate another computer system or to hide their identity.</p>
            <p>This technique can be used in various attacks, such as:</p>
            <ul className="list-disc list-inside ml-4">
              <li>Bypassing IP-based authentication.</li>
              <li>Launching Denial-of-Service attacks (making it harder to trace the attacker).</li>
              <li>Performing Man-in-the-Middle attacks.</li>
            </ul>
            <p>In this simulation, you will attempt to spoof a packet. Imagine a firewall rule that only allows traffic from a "trusted" internal IP address. Try to craft a packet with a fake source IP address that matches the trusted IP to see if you can bypass the firewall. Observe whether the firewall successfully detects and blocks the spoofed packet or if it allows it through.</p>
          </div>
        ),
        component: <PacketSpoofing />,
        expected: 'You will gain insight into how packet spoofing works, its potential uses in attacks, and the importance of implementing ingress filtering (blocking incoming packets with source IPs that should only originate from inside your network) to defend against it.',
      },
    ],
  },
  {
    title: 'Secure Network Architecture: Designing for Resilience',
    icon: <FolderLock className="w-8 h-8 text-gray-700" />,
    mode: 'lecture',
    content: (
        <div className="space-y-4 text-lg">
            <p>Designing a secure network is a proactive process that involves more than just deploying individual security tools. It requires a holistic approach to build resilience against various threats. Key architectural concepts include:</p>
            <ul className="list-disc list-inside space-y-2 bg-gray-50 p-4 rounded-lg">
              <li><span className="font-semibold">DMZ (Demilitarized Zone):</span> A DMZ is a perimeter network that protects an organization's internal local-area network (LAN) from untrusted traffic, usually from the internet. Public-facing servers, such as web servers, email servers, and DNS servers, are typically placed within the DMZ. This acts as a buffer zone; if a server in the DMZ is compromised, the attacker still has to breach another layer of security to reach the internal network.</li>
              <li><span className="font-semibold">Network Segmentation:</span> This involves dividing a computer network into smaller segments or subnets. The primary goal is to improve security by limiting the scope of a breach. If one segment is compromised, the attacker's ability to move laterally to other segments is restricted. Segmentation also improves network performance by reducing broadcast traffic and allows for more granular application of security policies. VLANs (which we discussed earlier) are a common way to achieve logical network segmentation.</li>
              <li><span className="font-semibold">Cloud Native Security:</span> In cloud environments, traditional network perimeters often dissolve. Cloud-native security focuses on leveraging the security features provided by cloud providers (like AWS, Azure, GCP) to protect resources. This includes:
                <ul className="list-circle list-inside ml-4">
                  <li><span className="font-medium">Security Groups/Network Security Groups:</span> Virtual firewalls that control inbound and outbound traffic for virtual machines or network interfaces. They allow for micro-segmentation, applying security policies at the instance level.</li>
                  <li><span className="font-medium">VPC (Virtual Private Cloud):</span> A logically isolated section of the cloud where you can launch resources in a virtual network that you define.</li>
                  <li><span className="font-medium">Identity and Access Management (IAM):</span> Granular control over who can do what with your cloud resources.</li>
                </ul>
                This approach emphasizes automation, API-driven security, and integrating security throughout the development lifecycle.
              </li>
            </ul>
            <p>By combining these architectural principles, organizations can build robust and resilient networks that are better equipped to withstand modern cyber threats.</p>
        </div>
    ),
  },
  // {
  //   title: 'Advanced Firewall Configuration: iptables and Cloud Firewalls',
  //   icon: <Cloud className="w-8 h-8 text-blue-400" />,
  //   mode: 'interactive',
  //   steps: [
  //     {
  //       title: 'iptables Simulator: Linux Firewall Management',
  //       instructions: (
  //         <div className="space-y-2">
  //           <p><span className="font-semibold">iptables</span> is a command-line firewall utility that uses policy chains to allow or block traffic. It's the standard firewall for Linux operating systems and provides highly granular control over network packets. Understanding iptables is crucial for managing security on Linux servers.</p>
  //           <p>iptables works by examining packets against a set of rules. These rules are organized into chains (INPUT, OUTPUT, FORWARD) and tables (filter, nat, mangle, raw). Each rule specifies criteria (source/destination IP, port, protocol) and an action (ACCEPT, DROP, REJECT).</p>
  //           <p>In this simulator, you will learn to create and manage iptables rules. Your task is to configure a firewall on a simulated Linux server to:</p>
  //           <ol className="list-decimal list-inside ml-4 space-y-1">
  //             <li>Allow incoming web traffic on standard HTTP (port 80) and HTTPS (port 443).</li>
  //             <li>Allow established and related incoming connections (for replies to your outgoing traffic).</li>
  //             <li>Block all other incoming connections by default.</li>
  //             <li>Allow all outgoing connections.</li>
  //           </ol>
  //           <p className="font-semibold">Experiment with adding and deleting rules, then test connectivity to see the effects of your firewall configuration. This hands-on experience will solidify your understanding of Linux firewall management.</p>
  //         </div>
  //       ),
  //       component: <div />,
  //     },
  //     {
  //       title: 'Cloud Firewall Simulator: Securing Cloud Resources',
  //       instructions: (
  //         <div className="space-y-2">
  //           <p><span className="font-semibold">Cloud firewalls</span>, often implemented as Security Groups (AWS) or Network Security Groups (Azure/GCP), are fundamental to securing resources in cloud environments. Unlike traditional network firewalls, cloud firewalls are typically stateless (for Security Groups) or stateful (for NSGs) and operate at the instance or network interface level, enabling micro-segmentation.</p>
  //           <p>They control inbound and outbound traffic for your virtual machines, databases, and other cloud services. The principle of least privilege is paramount here: only allow the traffic that is absolutely necessary.</p>
  //           <p>In this simulator, you will configure a cloud firewall for a simulated web server in a cloud environment. Your goal is to:</p>
  //           <ol className="list-decimal list-inside ml-4 space-y-1">
  //             <li>Allow SSH access (port 22) only from a specific IP address (e.g., your administrative workstation's public IP).</li>
  //             <li>Allow incoming HTTP (port 80) and HTTPS (port 443) traffic from anywhere (0.0.0.0/0) to make your web server publicly accessible.</li>
  //             <li>Block all other incoming traffic by default.</li>
  //             <li>Allow all outgoing traffic (a common default for simplicity, though in production, this would also be restricted).</li>
  //           </ol>
  //           <p className="font-semibold">Configure these rules and test access to the web server and SSH. This exercise demonstrates how to apply granular security controls in a cloud-native way.</p>
  //         </div>
  //       ),
  //       component: <div />,
  //     },
  //   ],
  // },
  {
    title: 'Network Observability: The Three Pillars',
    icon: <Eye className="w-8 h-8 text-cyan-500" />,
    mode: 'simulation',
    simulation: <ObservabilityDashboard />,
    content: (
      <div className="mt-4 space-y-4 text-lg">
        <p><span className="font-semibold">Observability</span> is the ability to infer the internal state of a system by examining its external outputs. In networking and distributed systems, this means understanding what's happening inside your applications and infrastructure by analyzing the data they generate. It's crucial for troubleshooting, performance monitoring, and security incident response.</p>
        <p>Observability is typically built upon three pillars:</p>
        <ul className="list-disc list-inside space-y-2 bg-gray-50 p-4 rounded-lg">
          <li><span className="font-semibold">Logs:</span> These are timestamped, immutable records of discrete events that happened within a system. Logs tell you "what happened" at a specific point in time (e.g., "User logged in," "Error: Database connection failed"). They are invaluable for debugging and auditing.</li>
          <li><span className="font-semibold">Metrics:</span> These are numerical measurements collected over time, representing the health and performance of your system. Metrics tell you "how much" or "how often" (e.g., CPU utilization, memory usage, request latency, error rates). They are ideal for trending, alerting, and dashboarding.</li>
          <li><span className="font-semibold">Traces:</span> In distributed systems, a single user request might travel through dozens of services. A trace represents the end-to-end journey of a request through all these services. Traces tell you "where time is spent" and "which services are involved," helping to pinpoint bottlenecks and failures in complex architectures.</li>
        </ul>
        <p className="font-semibold">This dashboard provides a unified view, integrating logs, metrics, and traces to give you a comprehensive understanding of your network and application health. Interact with the dashboard to see how these different data types complement each other.</p>
      </div>
    )
  },
];
