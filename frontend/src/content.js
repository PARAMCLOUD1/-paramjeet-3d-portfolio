// Sources and verification limits are recorded in PROJECT_SOURCES.md.
export const portfolioViews = [
  ['about', 'About Me'], ['projects', 'Projects'], ['skills', 'Skills'],
  ['education', 'Education'], ['certifications', 'Certifications'], ['contact', 'Contact'],
]

export const projects = [
  {
    id: 'electricity', category: 'Algorithms', title: 'Smart Electricity Load Management System',
    description: 'Turning limited electricity supply into better allocation decisions. A browser-based dashboard with algorithm labs and an interactive city view.',
    tools: ['Python', 'Flask', 'HTML', 'CSS', 'JavaScript', 'Chart.js'],
    repository: 'https://github.com/PARAMCLOUD1/Smart_electricity',
    demo: 'https://paramsmartelectricitysystem.onrender.com/',
    suppliedDemo: 'https://smart-electricity.onrender.com/',
    image: '/images/projects/electricity.webp',
    notes: 'Explore Greedy allocation, 0/1 Knapsack, Merge Sort and Binary Search, with step playback and measured performance reports. The web edition runs in the browser and stores records locally. The repository also preserves the original Python/Tkinter edition.',
  },
  {
    id: 'linux', category: 'Systems', title: 'Server Health Monitoring System',
    description: 'A lightweight Ubuntu monitor that collects system metrics, reports service health and raises alerts when status changes.',
    tools: ['Bash', 'Linux', 'systemd'], repository: 'https://github.com/PARAMCLOUD1/server-health-monitor',
    notes: 'Checks CPU, memory, disk, load, services and network reachability. Includes terminal reports, CSV history and an auto-refreshing HTML dashboard, with scheduled runs through a systemd timer.',
  },
  {
    id: 'banking', category: 'Web applications', title: 'Mini Banking System',
    description: 'Account management and transactions backed by Oracle, with banking rules implemented in PL/SQL and a Flask web interface.',
    tools: ['Python', 'Flask', 'Oracle', 'PL/SQL'], repository: 'https://github.com/PARAMCLOUD1/mini-banking-system',
    notes: 'Customer and account workflows include deposits, withdrawals, atomic transfers and transaction statements. The database package enforces balance and account rules, while Flask calls the stored procedures.',
  },
  {
    id: 'pathfinding', category: 'Algorithms', title: 'Pathfinding Visualizer',
    description: 'Make an algorithm visible. Explore paths, obstacles, weighted grids and mazes through an interactive browser visualizer.',
    tools: ['JavaScript', 'HTML', 'CSS', 'BFS', 'DFS', 'Dijkstra', 'A*', 'Greedy Best-First Search'], repository: 'https://github.com/PARAMCLOUD1/Pathfinding-Visualizer',
    notes: 'Visualizes BFS, DFS and Dijkstra’s algorithm, with maze generation, obstacle customization and algorithm performance comparison.',
  },
  {
    id: 'quizmaster', category: 'Desktop applications', title: 'QuizMaster',
    description: 'A Python desktop quiz with multiple categories, a countdown timer, scoring and instant results.',
    tools: ['Python', 'Tkinter'], repository: 'https://github.com/PARAMCLOUD1/QuizMaster_Paramjeet-kaur_26mcc20021',
    notes: 'A Tkinter-based desktop interface brings category selection, timed questions, scoring and result feedback into one application.',
  },
  {
    id: 'employees', category: 'Web applications', title: 'Employee Management System',
    description: 'A Java application for managing employee records, with browser and console interfaces sharing the same Hibernate data layer.',
    tools: ['Java', 'Spring Boot', 'Hibernate', 'H2', 'Thymeleaf'], repository: 'https://github.com/PARAMCLOUD1/WorkforceHub',
    notes: 'Employee CRUD operations are exposed through REST endpoints and a browser interface. Records persist in the embedded H2 database, with MySQL available through configuration.',
  },
  {
    id: 'delivery', category: 'Algorithms', title: 'Smart Delivery Route Optimizer',
    description: 'Exploring efficient route planning for delivery journeys.', tools: ['Dijkstra', 'Quick Sort', 'AVL Tree', '0/1 Knapsack', 'TSP'],
    notes: 'Academic route planning using Dijkstra, Quick Sort, AVL Tree, 0/1 Knapsack and TSP. Algorithm details supplied by Paramjeet; repository and screenshot are not yet available.',
  },
]

export const skillCategories = [
  { title: 'Programming', description: 'The languages behind my application and algorithm projects.', tools: ['Python', 'Java', 'C', 'C++', 'SQL', 'Bash', 'JavaScript'] },
  { title: 'Linux Administration', description: 'Working with the operating system behind the application.', tools: ['Ubuntu', 'CentOS', 'Linux Administration', 'Shell Scripting', 'systemd', 'System monitoring'] },
  { title: 'Cloud Computing', description: 'Building my foundation in cloud services and infrastructure.', tools: [], learning: ['AWS'] },
  { title: 'DevOps', description: 'From version control toward automated, repeatable delivery.', tools: ['Git'], learning: ['Docker', 'Kubernetes', 'CI/CD', 'Infrastructure automation'] },
  { title: 'Git / GitHub', description: 'Version control and source collaboration across my projects.', tools: ['Git', 'GitHub'] },
  { title: 'Backend Development', description: 'Connecting application logic, APIs and persistent data.', tools: ['Flask', 'Spring Boot', 'Hibernate', 'JDBC', 'JSP', 'Servlets', 'REST APIs'] },
  { title: 'Databases', description: 'Relational data, stored procedures and application persistence.', tools: ['SQL', 'Oracle', 'MySQL', 'PL/SQL', 'H2'] },
  { title: 'Tools', description: 'Tools for building, reviewing and managing code.', tools: ['Git', 'GitHub', 'Maven', 'VS Code'] },
  { title: 'Web Development', description: 'Interfaces that make systems and algorithms easier to use.', tools: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Web deployment'] },
]

export const profile = [
  'I am an MCA Cloud Computing & DevOps student at Chandigarh University with an interest in backend development, Linux, databases, cloud infrastructure, and automation.',
  'I enjoy creating practical applications using Python, Java, SQL, Flask, Spring Boot, and Linux tools.',
  'I am developing my skills in cloud technologies, Docker, Kubernetes, and CI/CD through hands-on learning and projects.',
  'My career objective is to work as a Cloud & DevOps Engineer.',
]

export const education = [
  { date: '2026–2028 (Expected)', title: 'MCA — Cloud Computing & DevOps', school: 'Chandigarh University', result: 'Pursuing' },
  { date: '2026', title: 'Bachelor of Computer Applications', school: 'DAV College', result: '77%' },
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
  { id: 'projects', object: 'Monitor', title: 'Projects', description: 'Explore my application and systems work.', link: 'View project areas' },
  { id: 'about', object: 'Portrait', title: 'About me', description: 'Meet the person behind the workspace.', link: 'Read about me' },
  { id: 'skills', object: 'Server', title: 'Skills', description: 'Practical foundations and the cloud tools I am learning.', link: 'Explore my skills' },
  { id: 'education', object: 'Books', title: 'Education', description: 'My current Cloud Computing & DevOps studies.', link: 'View my education' },
]
