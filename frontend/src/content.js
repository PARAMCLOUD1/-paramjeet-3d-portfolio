// Sources and verification limits are recorded in PROJECT_SOURCES.md.
export const projects = [
  {
    id: 'electricity', category: 'Algorithms', title: 'Smart Electricity Load Management System',
    description: 'Turning limited electricity supply into better allocation decisions. A browser-based dashboard with algorithm labs and an interactive city view.',
    tools: ['JavaScript', 'HTML / CSS', 'Chart.js'],
    repository: 'https://github.com/PARAMCLOUD1/Smart_electricity',
    demo: 'https://paramsmartelectricitysystem.onrender.com/',
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
    tools: ['JavaScript', 'HTML', 'CSS'], repository: 'https://github.com/PARAMCLOUD1/Pathfinding-Visualizer',
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
    tools: ['Java', 'Spring Boot', 'Hibernate', 'H2'], repository: 'https://github.com/PARAMCLOUD1/WorkforceHub',
    notes: 'Employee CRUD operations are exposed through REST endpoints and a browser interface. Records persist in the embedded H2 database, with MySQL available through configuration.',
  },
  {
    id: 'delivery', category: 'Algorithms', title: 'Smart Delivery Route Optimizer',
    description: 'Exploring efficient route planning for delivery journeys.', tools: [],
    notes: 'A route-optimization project from my academic portfolio.',
  },
]

export const skillCategories = [
  { title: 'Programming', description: 'The languages behind my application and algorithm projects.', tools: ['Python', 'Java', 'JavaScript'] },
  { title: 'Linux Administration', description: 'Working with the operating system behind the application.', tools: ['Ubuntu', 'Bash', 'systemd', 'System monitoring'] },
  { title: 'Cloud Computing', description: 'Building my foundation in cloud services and infrastructure.', tools: [], learning: ['AWS'] },
  { title: 'DevOps', description: 'From version control toward automated, repeatable delivery.', tools: ['Git'], learning: ['Docker', 'Kubernetes', 'CI/CD', 'Infrastructure automation'] },
  { title: 'Git / GitHub', description: 'Version control and source collaboration across my projects.', tools: ['Git', 'GitHub'] },
  { title: 'Backend Development', description: 'Connecting application logic, APIs and persistent data.', tools: ['Flask', 'Spring Boot', 'REST APIs'] },
  { title: 'Databases', description: 'Relational data, stored procedures and application persistence.', tools: ['SQL', 'Oracle', 'PL/SQL', 'H2', 'Hibernate'] },
  { title: 'Web Development', description: 'Interfaces that make systems and algorithms easier to use.', tools: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Web deployment'] },
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
