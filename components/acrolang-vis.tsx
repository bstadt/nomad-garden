'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface AcrolangVisProps {
  width?: number;
  height?: number;
}

const AcrolangVis: React.FC<AcrolangVisProps> = ({ 
  width = 800, 
  height = 600 
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [theta, setTheta] = useState(0); // Y-axis rotation
  const [phi, setPhi] = useState(0);     // X-axis rotation
  const [psi, setPsi] = useState(0);     // Z-axis rotation (opposite of right-hand rule)
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Reference to store scene objects for animation
  const sceneRef = useRef<{
    axesHelper?: THREE.AxesHelper;
    coordinateSystem?: THREE.Group;
  }>({});

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(3, 3, 5);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Add renderer to the DOM
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Create coordinate system
    const axesHelper = new THREE.AxesHelper(2);
    scene.add(axesHelper);
    
    // Create a group for the coordinate system that will be rotated
    const coordinateSystem = new THREE.Group();
    
    // X-axis (red)
    const xAxis = createAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 0, 0), 0xff0000);
    coordinateSystem.add(xAxis);
    
    // Y-axis (green)
    const yAxis = createAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0), 0x00ff00);
    coordinateSystem.add(yAxis);
    
    // Z-axis (blue)
    const zAxis = createAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 1), 0x0000ff);
    coordinateSystem.add(zAxis);
    
    // Add coordinate labels
    addCoordinateLabel(coordinateSystem, 'X', new THREE.Vector3(1.2, 0, 0), 0xff0000);
    addCoordinateLabel(coordinateSystem, 'Y', new THREE.Vector3(0, 1.2, 0), 0x00ff00);
    addCoordinateLabel(coordinateSystem, 'Z', new THREE.Vector3(0, 0, 1.2), 0x0000ff);
    
    scene.add(coordinateSystem);
    
    // Store references for animation
    sceneRef.current = {
      axesHelper,
      coordinateSystem
    };

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    // Cleanup on unmount
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          } else if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          }
        }
      });
    };
  }, [width, height]);

  // Function to create an axis arrow
  const createAxis = (start: THREE.Vector3, end: THREE.Vector3, color: number) => {
    const direction = new THREE.Vector3().subVectors(end, start).normalize();
    const length = start.distanceTo(end);
    
    const arrowHelper = new THREE.ArrowHelper(
      direction,
      start,
      length,
      color,
      length * 0.2,
      length * 0.1
    );
    
    return arrowHelper;
  };
  
  // Function to add text labels for coordinates
  const addCoordinateLabel = (parent: THREE.Group, text: string, position: THREE.Vector3, color: number) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context) {
      canvas.width = 64;
      canvas.height = 64;
      
      context.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
      context.font = '48px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(text, 32, 32);
      
      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(material);
      sprite.position.copy(position);
      sprite.scale.set(0.5, 0.5, 0.5);
      
      parent.add(sprite);
    }
  };

  // Apply rotations to the coordinate system
  useEffect(() => {
    if (sceneRef.current.coordinateSystem) {
      // Reset rotation
      sceneRef.current.coordinateSystem.rotation.set(0, 0, 0);
      
      // Apply rotations in the correct order
      // First rotate around Y (theta)
      sceneRef.current.coordinateSystem.rotateY(THREE.MathUtils.degToRad(theta));
      // Then rotate around X (phi)
      sceneRef.current.coordinateSystem.rotateX(THREE.MathUtils.degToRad(phi));
      // Finally rotate around Z (psi) - note the negative sign for opposite of right-hand rule
      sceneRef.current.coordinateSystem.rotateZ(THREE.MathUtils.degToRad(-psi));
    }
  }, [theta, phi, psi]);

  // Animation function
  const animateRotation = () => {
    setIsAnimating(true);
    
    // Start with all rotations at 0
    let currentTheta = 0;
    let currentPhi = 0;
    let currentPsi = 0;
    
    const targetTheta = theta;
    const targetPhi = phi;
    const targetPsi = psi;
    
    const duration = 1000; // Animation duration in ms
    const startTime = Date.now();
    
    const animate = () => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Use easing function for smooth animation
      const easedProgress = easeInOutCubic(progress);
      
      currentTheta = easedProgress * targetTheta;
      currentPhi = easedProgress * targetPhi;
      currentPsi = easedProgress * targetPsi;
      
      setTheta(currentTheta);
      setPhi(currentPhi);
      setPsi(currentPsi);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };
    
    animate();
  };
  
  // Easing function for smooth animation
  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  return (
    <div className="acrolang-vis-container">
      <div 
        ref={mountRef} 
        className="acrolang-vis-canvas"
        style={{ width: `${width}px`, height: `${height}px` }}
      />
      
      {!isLoaded && <div className="loading">Loading 3D scene...</div>}
      
      <div className="rotation-controls" style={{ marginTop: '20px' }}>
        <div className="slider-container">
          <label>
            θ (Y-axis rotation): {theta.toFixed(1)}°
            <input 
              type="range" 
              min="-180" 
              max="180" 
              value={theta} 
              onChange={(e) => setTheta(parseFloat(e.target.value))}
              disabled={isAnimating}
              style={{ width: '100%' }}
            />
          </label>
        </div>
        
        <div className="slider-container">
          <label>
            φ (X-axis rotation): {phi.toFixed(1)}°
            <input 
              type="range" 
              min="-180" 
              max="180" 
              value={phi} 
              onChange={(e) => setPhi(parseFloat(e.target.value))}
              disabled={isAnimating}
              style={{ width: '100%' }}
            />
          </label>
        </div>
        
        <div className="slider-container">
          <label>
            ψ (Z-axis rotation): {psi.toFixed(1)}°
            <input 
              type="range" 
              min="-180" 
              max="180" 
              value={psi} 
              onChange={(e) => setPsi(parseFloat(e.target.value))}
              disabled={isAnimating}
              style={{ width: '100%' }}
            />
          </label>
        </div>
        
        <button 
          onClick={animateRotation} 
          disabled={isAnimating}
          style={{
            marginTop: '10px',
            padding: '8px 16px',
            backgroundColor: isAnimating ? '#cccccc' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isAnimating ? 'not-allowed' : 'pointer'
          }}
        >
          {isAnimating ? 'Animating...' : 'Animate Rotation'}
        </button>
      </div>
    </div>
  );
};

export default AcrolangVis;
