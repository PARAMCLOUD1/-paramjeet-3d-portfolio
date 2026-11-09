// Sources and verification limits are recorded in PROJECT_SOURCES.md.
export const portfolioViews = [
  ['about', 'About Me'], ['projects', 'Projects'], ['skills', 'Technical Skills'],
  ['education', 'Education'], ['certifications', 'Certifications'], ['contact', 'Get in Touch'],
]

export const professionalTitle = 'MCA Student | Cloud Computing & DevOps'
export const introduction = 'Developing practical skills in Linux, backend development, cloud infrastructure, and automation.'
export const contactIntroduction = "I'm open to internship opportunities, technical collaborations, and conversations about cloud infrastructure, Linux, and backend development."

export const projects = [
  {
    id: 'electricity', category: 'Algorithms', title: 'Smart Electricity Load Management System',
    description: 'Built an application to allocate limited electricity capacity across areas based on demand and priority.',
    tools: ['Python', 'Flask', 'HTML', 'CSS', 'JavaScript', 'Chart.js'],
    repository: 'https://github.com/PARAMCLOUD1/Smart_electricity',
    demo: 'https://paramsmartelectricitysystem.onrender.com/',
    suppliedDemo: 'https://smart-electricity.onrender.com/',
    image: '/images/projects/electricity.webp',
    notes: 'Implemented Greedy and 0/1 Knapsack allocation, Merge Sort for demand data, and Binary Search. The browser edition uses JavaScript, Chart.js, and local storage; the repository also includes the original Python/Tkinter edition.',
  },
  {
    id: 'linux', category: 'Systems', title: 'Server Health Monitoring System',
    description: 'Developed a Bash tool to monitor system health on Linux.',
    tools: ['Bash', 'Linux', 'systemd'], repository: 'https://github.com/PARAMCLOUD1/server-health-monitor',
    notes: 'Checks CPU usage, memory, disk space, running services, and network reachability. Added alerts, CSV history, and an HTML dashboard, with scheduled checks through a systemd timer.',
  },
  {
    id: 'banking', category: 'Web applications', title: 'Mini Banking System',
    description: 'Developed a banking application for managing accounts and transactions with Flask and Oracle PL/SQL.',
    tools: ['Python', 'Flask', 'Oracle', 'PL/SQL'], repository: 'https://github.com/PARAMCLOUD1/mini-banking-system',
    notes: 'Implemented deposits, withdrawals, transfers, and transaction records. Flask calls stored procedures, with account and balance validation handled in the database.',
  },
  {
    id: 'pathfinding', category: 'Algorithms', title: 'Pathfinding Visualizer',
    description: 'Created an interactive visualizer to compare pathfinding algorithms on a grid.',
    tools: ['HTML', 'CSS', 'JavaScript', 'Algorithms'], repository: 'https://github.com/PARAMCLOUD1/Pathfinding-Visualizer',
    notes: 'Displays explored nodes, resulting paths, and execution measurements for BFS, DFS, Dijkstra’s algorithm, A*, and Greedy Best-First Search. Added weighted grids, obstacles, and maze generation to compare how the algorithms find routes.',
  },
  {
    id: 'quizmaster', category: 'Desktop applications', title: 'QuizMaster',
    description: 'Built a Python desktop quiz with category selection and timed questions.',
    tools: ['Python', 'Tkinter'], repository: 'https://github.com/PARAMCLOUD1/QuizMaster_Paramjeet-kaur_26mcc20021',
    notes: 'Used Tkinter for the interface and countdown timer. Added scoring and a results screen to show feedback after each quiz.',
  },
  {
    id: 'employees', category: 'Web applications', title: 'Employee Management System',
    description: 'Developed a Java application to create, view, update, and delete employee records.',
    tools: ['Java', 'Spring Boot', 'Hibernate', 'H2', 'Thymeleaf'], repository: 'https://github.com/PARAMCLOUD1/WorkforceHub',
    notes: 'Used Spring Boot and Hibernate to connect browser and console interfaces to the same data layer. Records are stored in H2, with REST endpoints for employee operations and MySQL available through configuration.',
  },
  {
    id: 'delivery', category: 'Algorithms', title: 'Smart Delivery Route Optimizer',
    description: 'Built an academic project to explore delivery route planning.', tools: ['Dijkstra', 'Quick Sort', 'AVL Tree', '0/1 Knapsack', 'TSP'],
    notes: 'Used Dijkstra’s algorithm, Quick Sort, AVL trees, 0/1 Knapsack, and the travelling salesperson problem to study routing decisions. A source link and live demo are not available yet.',
  },
]

export const skillCategories = [
  { title: 'Programming Languages', description: 'Languages I use in coursework and application projects.', tools: ['Python', 'Java', 'C', 'C++', 'SQL', 'Bash', 'JavaScript'] },
  { title: 'Backend Development', description: 'Application logic, REST APIs, and database integration.', tools: ['Flask', 'Spring Boot', 'Hibernate', 'JDBC', 'JSP', 'Servlets', 'REST APIs'] },
  { title: 'Databases', description: 'Relational data, stored procedures, and transactions.', tools: ['Oracle', 'MySQL', 'PL/SQL', 'H2'] },
  { title: 'Linux & System Administration', description: 'Shell scripts, service checks, and system monitoring.', tools: ['Ubuntu', 'CentOS', 'Shell Scripting', 'systemd', 'System monitoring'] },
  { title: 'Developer Tools', description: 'Tools for version control, builds, and web interfaces.', tools: ['Git', 'GitHub', 'Maven', 'VS Code', 'HTML', 'CSS', 'React', 'Tailwind CSS'] },
  { title: 'Cloud & DevOps — Currently Learning', description: 'Studying cloud services, containers, and deployment workflows.', tools: [], learning: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Infrastructure automation'] },
]

export const profile = [
  "I'm currently pursuing an MCA in Cloud Computing & DevOps at Chandigarh University. My technical interests include Linux, Python, databases, backend development, and cloud infrastructure.",
  "I learn best by working on projects. I've built applications involving database transactions, system monitoring, algorithms, and web development.",
  "I'm expanding my knowledge of Docker, cloud platforms, and deployment workflows, with the goal of starting my career in Cloud and DevOps engineering.",
]

export const education = [
  { date: 'Expected 2028', title: 'MCA — Cloud Computing & DevOps', school: 'Chandigarh University', result: 'Pursuing' },
  { date: '2026', title: 'BCA', school: 'DAV College', result: '77%' },
  { date: '2023', title: 'Class XII', school: 'Government Model Senior Secondary School, Phase 3B1', result: '87.2%' },
  { date: '2021', title: 'Class X', school: 'Sir McAuliffe High School', result: '87.6%' },
]

// Names supplied by Paramjeet; no issuer, credential URL or certificate image inferred.
export const certifications = [
  'Fundamentals of Cloud Computing', 'Python Programming', 'Introduction to Data Science',
  'Introduction to Artificial Intelligence', 'Introduction to NLP', 'Computer Vision 101',
  'Introduction to Deep Learning', 'Introduction to RPA', 'Microsoft Office (MS Office) — Basic & Advanced',
]

export const destinations = [
  { id: 'projects', object: 'Monitor', title: 'Projects', description: 'My application, algorithm, and Linux projects.', link: 'View Projects' },
  { id: 'about', object: 'Portrait', title: 'About Me', description: 'My studies, technical interests, and career plans.', link: 'About Me' },
  { id: 'skills', object: 'Server', title: 'Technical Skills', description: 'Tools I use and cloud technologies I am learning.', link: 'Technical Skills' },
  { id: 'education', object: 'Books', title: 'Education', description: 'My academic qualifications and current MCA studies.', link: 'View Education' },
]
