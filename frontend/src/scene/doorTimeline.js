import { gsap } from 'gsap'

export const DOOR_ANGLE = Math.PI * .49
export const DOOR_WIDTH = 1.4
export const DOOR_Z = 4
export const ENTRY_START = [0, 1.65, 9.4]
export const OFFICE_VIEW = [3.6, 2.35, 2.3]
export const OFFICE_TARGET = [0, 1.3, -1.8]

export function constrainOfficePosition(position) {
  // Remain inside the room and in front of the open leaves/furniture.
  position.set(Math.max(-3.9, Math.min(3.9, position.x)), Math.max(1.7, Math.min(3.3, position.y)), Math.max(.8, Math.min(2.35, position.z)))
}

// Actual Object3D rotations and camera/vector positions, never CSS transforms.
export function createDoorTimeline({ left, right, handleLeft, handleRight, camera, look, update, complete }) {
  // Every fresh entrance/replay starts in the foyer, including requests made
  // while already exploring. Never travel backwards through the front wall.
  left.rotation.set(0, 0, 0); right.rotation.set(0, 0, 0)
  handleLeft.rotation.set(0, 0, 0); handleRight.rotation.set(0, 0, 0)
  camera.position.set(...ENTRY_START)
  look.set(0, 1.65, 0)
  update()
  const timeline = gsap.timeline({ paused: true, onUpdate: update, onComplete: complete })
  timeline.addLabel('approach', 0)
    // Keep the 3.2 m door height inside a 50 degree vertical field before opening.
    .to(camera.position, { z: 7.6, duration: 1.4, ease: 'power2.inOut' }, 0)
    .addLabel('handles', 1.2)
    .to(handleLeft.rotation, { z: .28, duration: .3 }, 1.2)
    .to(handleRight.rotation, { z: -.28, duration: .3 }, 1.2)
    .addLabel('open', 1.6)
    .to(left.rotation, { y: DOOR_ANGLE, duration: 1.8, ease: 'power2.inOut' }, 1.6)
    .to(right.rotation, { y: -DOOR_ANGLE, duration: 1.8, ease: 'power2.inOut' }, 1.6)
    .to(handleLeft.rotation, { z: 0, duration: .45 }, 2.4)
    .to(handleRight.rotation, { z: 0, duration: .45 }, 2.4)
    .addLabel('threshold', 3.5)
    .to(camera.position, { x: 0, y: 1.65, z: 1.8, duration: 2.3, ease: 'power2.inOut' }, 3.5)
    .to(look, { x: 0, y: 1.3, z: -2, duration: 2.3, ease: 'power2.inOut' }, 3.5)
    .addLabel('workstation', 5.8)
    .to(camera.position, { x: OFFICE_VIEW[0], y: OFFICE_VIEW[1], z: OFFICE_VIEW[2], duration: 2, ease: 'power2.inOut' }, 5.8)
    .to(look, { x: OFFICE_TARGET[0], y: OFFICE_TARGET[1], z: OFFICE_TARGET[2], duration: 2, ease: 'power2.inOut' }, 5.8)
  return timeline
}

export const officeDestinations = [
  { id: 'about', object: 'Workstation monitor', title: 'About Me', description: 'Paramjeet Kaur — MCA Cloud Computing & DevOps student, seeking internships in Cloud and DevOps.', camera: [1.6, 1.85, .9], target: [0, 1.25, -2] },
  { id: 'projects', object: 'Server rack', title: 'Projects', description: 'Explore my electricity simulator, Linux monitor, banking system, visualizer and other application projects.', camera: [1.9, 1.85, .8], target: [3.2, 1.2, -3.7] },
  { id: 'skills', object: 'Technical display', title: 'Technical Skills', description: 'I work with Python, Linux, databases, backend development, and Git. I am learning AWS, Docker, Kubernetes, and CI/CD.', camera: [1.4, 2, .8], target: [.2, 2.65, -4.8] },
  { id: 'certifications', object: 'Certificate display', title: 'Certifications', description: 'My certifications in cloud computing, programming, and related subjects.', camera: [-.9, 1.9, .8], target: [-2, 2.15, -4.8] },
  { id: 'contact', object: 'Contact terminal', title: 'Get in Touch', description: 'Email param1539064@gmail.com, call +91 7814433864, or connect through GitHub and LinkedIn.', camera: [2.3, 1.8, .9], target: [1.1, 1, -1.75] },
]
