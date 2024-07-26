import * as THREE from 'three';

// Create Scene, Camera, and Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add CSS using JavaScript
const style = document.createElement('style');
style.textContent = `
    body {
        margin: 0;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background: radial-gradient(circle, rgba(0,36,71,1) 0%, rgba(0,121,178,1) 100%);
    }
    canvas {
        border: 2px solid #ffffff;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
        border-radius: 10px;
    }
`;
document.head.appendChild(style);

// Load Texture
const textureLoader = new THREE.TextureLoader();
const globeTexture = textureLoader.load('images/2k_mars.jpg'); 

// Create Globe-like Sphere
const globeGeometry = new THREE.SphereGeometry(5, 64, 64); 
const globeMaterial = new THREE.MeshPhongMaterial({
    map: globeTexture
});
const globe = new THREE.Mesh(globeGeometry, globeMaterial);
scene.add(globe);

// Add Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10).normalize();
scene.add(directionalLight);

// Position Camera
camera.position.z = 15;

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    
    // Self-Rotation
    globe.rotation.y += 0.009; 
    
    renderer.render(scene, camera);
}
animate();

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
