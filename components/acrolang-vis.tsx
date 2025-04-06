'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface AcrolangVisProps {
  width?: number;
  height?: number;
}

interface RotationStep {
  theta: number;
  phi: number;
  psi: number;
  thetaInput: string;
  phiInput: string;
  psiInput: string;
  id: string; // Unique identifier for each step
}

// Create a component for rotation input controls
const RotationInputControls: React.FC<{
  step: RotationStep;
  onChange: (id: string, field: 'theta' | 'phi' | 'psi' | 'thetaInput' | 'phiInput' | 'psiInput', value: number | string) => void;
  onRemove: (id: string) => void;
  disabled: boolean;
  isRemovable: boolean;
}> = ({ step, onChange, onRemove, disabled, isRemovable }) => {
  return (
    <div className="rotation-step" style={{ 
      border: '1px solid #ddd', 
      padding: '10px', 
      marginBottom: '10px',
      borderRadius: '4px',
      position: 'relative'
    }}>
      <div className="input-container" style={{ marginBottom: '10px' }}>
        <label>
          θ (Y-axis rotation):
          <input 
            type="number" 
            value={step.thetaInput} 
            onChange={(e) => {
              const inputValue = e.target.value;
              onChange(step.id, 'thetaInput', inputValue);
              const parsed = parseFloat(inputValue);
              onChange(step.id, 'theta', isNaN(parsed) ? 0 : parsed);
            }}
            disabled={disabled}
            style={{ marginLeft: '10px', width: '60px' }}
          />
          °
        </label>
      </div>
      
      <div className="input-container" style={{ marginBottom: '10px' }}>
        <label>
          φ (X-axis rotation):
          <input 
            type="number" 
            value={step.phiInput} 
            onChange={(e) => {
              const inputValue = e.target.value;
              onChange(step.id, 'phiInput', inputValue);
              const parsed = parseFloat(inputValue);
              onChange(step.id, 'phi', isNaN(parsed) ? 0 : parsed);
            }}
            disabled={disabled}
            style={{ marginLeft: '10px', width: '60px' }}
          />
          °
        </label>
      </div>
      
      <div className="input-container" style={{ marginBottom: '10px' }}>
        <label>
          ψ (Z-axis rotation):
          <input 
            type="number" 
            value={step.psiInput} 
            onChange={(e) => {
              const inputValue = e.target.value;
              onChange(step.id, 'psiInput', inputValue);
              const parsed = parseFloat(inputValue);
              onChange(step.id, 'psi', isNaN(parsed) ? 0 : parsed);
            }}
            disabled={disabled}
            style={{ marginLeft: '10px', width: '60px' }}
          />
          °
        </label>
      </div>

      {isRemovable && (
        <button 
          onClick={() => onRemove(step.id)}
          disabled={disabled}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '5px 10px',
            cursor: disabled ? 'not-allowed' : 'pointer'
          }}
        >
          Remove
        </button>
      )}
    </div>
  );
};

const AcrolangVis: React.FC<AcrolangVisProps> = ({ 
  width = 800, 
  height = 600 
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [theta, setTheta] = useState(0); // Y-axis rotation
  const [phi, setPhi] = useState(0);     // X-axis rotation
  const [psi, setPsi] = useState(0);     // Z-axis rotation 
  
  // Replace individual inputs with a sequence of rotation steps
  const [rotationSteps, setRotationSteps] = useState<RotationStep[]>([
    { theta: 0, phi: 0, psi: 0, thetaInput: '0', phiInput: '0', psiInput: '0', id: '1' }
  ]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Reference to store scene objects for animation
  const sceneRef = useRef<{
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

    // Create a group for the coordinate system that will be rotated
    const coordinateSystem = new THREE.Group();
    
    // X-axis (red)
    const xAxis = createAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 0, 0), 0xff0000);
    coordinateSystem.add(xAxis);
    
    // Y-axis (green)
    const yAxis = createAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0), 0x00ff00);
    coordinateSystem.add(yAxis);
    
    // Z-axis (blue)
    const zAxis = createAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1), 0x0000ff);
    coordinateSystem.add(zAxis);
    
    // Add coordinate labels
    addCoordinateLabel(coordinateSystem, 'X', new THREE.Vector3(1.2, 0, 0), 0xff0000);
    addCoordinateLabel(coordinateSystem, 'Y', new THREE.Vector3(0, 1.2, 0), 0x00ff00);
    addCoordinateLabel(coordinateSystem, 'Z', new THREE.Vector3(0, 0, -1.2), 0x0000ff);
    
    scene.add(coordinateSystem);
    
    // Store references for animation
    sceneRef.current = {
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

  // Update a specific rotation step
  const handleStepChange = (id: string, field: 'theta' | 'phi' | 'psi' | 'thetaInput' | 'phiInput' | 'psiInput', value: number | string) => {
    setRotationSteps(steps => 
      steps.map(step => 
        step.id === id ? { ...step, [field]: value } : step
      )
    );
  };

  // Add a new rotation step
  const addRotationStep = () => {
    const newId = Date.now().toString();
    setRotationSteps(steps => [
      ...steps, 
      { theta: 0, phi: 0, psi: 0, thetaInput: '0', phiInput: '0', psiInput: '0', id: newId }
    ]);
  };

  // Remove a rotation step
  const removeRotationStep = (id: string) => {
    setRotationSteps(steps => steps.filter(step => step.id !== id));
  };

  // Animation function for sequence of rotations
  const animateRotationSequence = () => {
    if (rotationSteps.length === 0 || isAnimating) return;
    
    setIsAnimating(true);
    setCurrentStepIndex(0);

    // Reset the coordinate system to the default position at the beginning of animation
    setTheta(0);
    setPhi(0);
    setPsi(0);
    
    // Start the animation sequence
    setTimeout(() => {
      // Start fresh with the first step
      const firstStep = rotationSteps[0];
      
      // For the first step, animate directly to its values
      animateToRotation(0, 0, 0, firstStep.theta, firstStep.phi, firstStep.psi, 0);
    }, 500);
  };
  
  // New function to animate to a specific rotation
  const animateToRotation = (
    startTheta: number, 
    startPhi: number, 
    startPsi: number, 
    targetTheta: number, 
    targetPhi: number, 
    targetPsi: number, 
    currentIndex: number
  ) => {
    const duration = 1000; // Animation duration in ms
    const startTime = Date.now();
    
    // Ensure we're taking the shortest path for each rotation
    // by normalizing the angle differences
    const normalizeAngleDifference = (start: number, target: number): number => {
      let diff = target - start;
      // Ensure we rotate the shortest way (never more than 180 degrees)
      while (diff > 180) diff -= 360;
      while (diff < -180) diff += 360;
      return diff;
    };
    
    const thetaDiff = normalizeAngleDifference(startTheta, targetTheta);
    const phiDiff = normalizeAngleDifference(startPhi, targetPhi);
    const psiDiff = normalizeAngleDifference(startPsi, targetPsi);
    
    const animate = () => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Use easing function for smooth animation
      const easedProgress = easeInOutCubic(progress);
      
      // Interpolate between start and target values using the normalized differences
      const newTheta = startTheta + thetaDiff * easedProgress;
      const newPhi = startPhi + phiDiff * easedProgress;
      const newPsi = startPsi + psiDiff * easedProgress;
      
      setTheta(newTheta);
      setPhi(newPhi);
      setPsi(newPsi);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Animation for this step is complete
        
        // Move to the next step after a short delay
        const nextIndex = currentIndex + 1;
        if (nextIndex < rotationSteps.length) {
          setCurrentStepIndex(nextIndex);
          setTimeout(() => {
            // Get the next step
            const nextStep = rotationSteps[nextIndex];
            
            // For sequential rotations, we want to apply the next rotation directly
            // rather than calculating a combined matrix, which can lead to unexpected results
            animateToRotation(
              newTheta, 
              newPhi, 
              newPsi, 
              newTheta + nextStep.theta, 
              newPhi + nextStep.phi, 
              newPsi + nextStep.psi, 
              nextIndex
            );
          }, 500);
        } else {
          // Animation sequence is complete
          setIsAnimating(false);
          setCurrentStepIndex(-1);
        }
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
      
      <div className="rotation-controls" style={{ marginTop: '20px', maxWidth: '500px' }}>
        <h3>Rotation Sequence</h3>
        
        <div className="rotation-steps">
          {rotationSteps.map((step, index) => (
            <RotationInputControls
              key={step.id}
              step={step}
              onChange={handleStepChange}
              onRemove={removeRotationStep}
              disabled={isAnimating}
              isRemovable={rotationSteps.length > 1}
            />
          ))}
        </div>
        
        <div className="controls-buttons" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button 
            onClick={addRotationStep} 
            disabled={isAnimating}
            style={{
              padding: '8px 16px',
              backgroundColor: isAnimating ? '#cccccc' : '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isAnimating ? 'not-allowed' : 'pointer'
            }}
          >
            Add Step
          </button>
          
          <button 
            onClick={animateRotationSequence} 
            disabled={isAnimating}
            style={{
              padding: '8px 16px',
              backgroundColor: isAnimating ? '#cccccc' : '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isAnimating ? 'not-allowed' : 'pointer'
            }}
          >
            {isAnimating ? `Animating Step ${currentStepIndex + 1}/${rotationSteps.length}` : 'Animate Sequence'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcrolangVis;
