document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById('three-canvas');
  if (canvas) {
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    // (Do not set scene.background, so the canvas remains transparent)
    const camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1, 4);
    
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // Create a robot group (tank-like robot)
    const robot = new THREE.Group();

    // Main body (tank chassis)
    const bodyGeometry = new THREE.BoxGeometry(1.5, 0.5, 2);
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
    const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
    robot.add(bodyMesh);

    // Turret on top of the body
    const turretGeometry = new THREE.BoxGeometry(0.8, 0.3, 0.8);
    const turretMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    const turretMesh = new THREE.Mesh(turretGeometry, turretMaterial);
    turretMesh.position.set(0, 0.5, 0);
    robot.add(turretMesh);

    // Gun barrel on the turret
    const barrelGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 32);
    const barrelMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
    const barrelMesh = new THREE.Mesh(barrelGeometry, barrelMaterial);
    barrelMesh.rotation.z = Math.PI / 2;
    barrelMesh.position.set(0.6, 0.5, 0);
    robot.add(barrelMesh);

    // Wheels simulating tank tracks
    const wheelGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.4, 32);
    const wheelMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    
    // Front left wheel
    const leftWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    leftWheel.rotation.z = Math.PI / 2;
    leftWheel.position.set(-0.8, -0.25, 0.9);
    robot.add(leftWheel);
    
    // Front right wheel
    const rightWheel = leftWheel.clone();
    rightWheel.position.set(-0.8, -0.25, -0.9);
    robot.add(rightWheel);
    
    // Rear left wheel
    const leftRearWheel = leftWheel.clone();
    leftRearWheel.position.set(0.8, -0.25, 0.9);
    robot.add(leftRearWheel);
    
    // Rear right wheel
    const rightRearWheel = rightWheel.clone();
    rightRearWheel.position.set(0.8, -0.25, -0.9);
    robot.add(rightRearWheel);

    // Add the robot to the scene
    scene.add(robot);

    // Adjust renderer and camera on window resize
    window.addEventListener('resize', function() {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });

    // Animation loop: Slowly rotate the robot
    function animate() {
      requestAnimationFrame(animate);
      robot.rotation.y += 0.005;
      renderer.render(scene, camera);
    }
    animate();
  }
});
