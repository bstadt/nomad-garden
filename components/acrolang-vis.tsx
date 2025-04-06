'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Matrix4, Quaternion, Euler, Vector3 } from 'three';

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
  
  // Replace individual rotation states with a single transformation matrix
  const [currentTransform, setCurrentTransform] = useState(new Matrix4().identity());
  
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

  // Apply transformation matrix to the coordinate system
  useEffect(() => {
    if (sceneRef.current.coordinateSystem) {
      // Apply the current transformation matrix directly to the coordinate system
      sceneRef.current.coordinateSystem.matrix.copy(currentTransform);
      sceneRef.current.coordinateSystem.matrixAutoUpdate = false;
      sceneRef.current.coordinateSystem.matrixWorldNeedsUpdate = true;
    }
  }, [currentTransform]);

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

  // Create a transformation matrix from Euler angles (in degrees)
  const createTransformMatrix = (thetaDeg: number, phiDeg: number, psiDeg: number): Matrix4 => {
    // Convert degrees to radians
    const thetaRad = THREE.MathUtils.degToRad(thetaDeg);
    const phiRad = THREE.MathUtils.degToRad(phiDeg);
    const psiRad = THREE.MathUtils.degToRad(-psiDeg); // Negative for Z to match convention
    
    // Create rotation matrices for each axis
    const rotY = new Matrix4().makeRotationY(thetaRad);
    const rotX = new Matrix4().makeRotationX(phiRad);
    const rotZ = new Matrix4().makeRotationZ(psiRad);
    
    // Create a new matrix for the combined transformation
    const transformMatrix = new Matrix4().identity();
    
    // Apply rotations in the correct order: Y (theta) -> X (phi) -> Z (psi)
    transformMatrix.multiply(rotY);
    transformMatrix.multiply(rotX);
    transformMatrix.multiply(rotZ);
    
    return transformMatrix;
  };

  // Animation function for sequence of rotations
  const animateRotationSequence = () => {
    if (rotationSteps.length === 0 || isAnimating) return;
    
    setIsAnimating(true);
    setCurrentStepIndex(0);

    // Reset the coordinate system to the default position at the beginning of animation
    setCurrentTransform(new Matrix4().identity());
    
    // Start the animation sequence after a short delay
    setTimeout(() => {
      // Start with the identity matrix
      const startMatrix = new Matrix4().identity();
      
      // Get the first step
      const firstStep = rotationSteps[0];
      
      // Create the target transformation matrix for the first step
      const targetMatrix = createTransformMatrix(
        firstStep.theta, 
        firstStep.phi, 
        firstStep.psi
      );
      
      // Animate to the first transformation
      animateTransformation(startMatrix, targetMatrix, 0);
    }, 500);
  };
  
  // New function to animate between transformation matrices
  const animateTransformation = (
    startMatrix: Matrix4,
    targetMatrix: Matrix4,
    currentIndex: number
  ) => {
    const duration = 1000; // Animation duration in ms
    const startTime = Date.now();
    
    // Extract position, rotation quaternion, and scale from matrices
    const startPosition = new Vector3();
    const startQuaternion = new Quaternion();
    const startScale = new Vector3();
    startMatrix.decompose(startPosition, startQuaternion, startScale);
    
    const targetPosition = new Vector3();
    const targetQuaternion = new Quaternion();
    const targetScale = new Vector3();
    targetMatrix.decompose(targetPosition, targetQuaternion, targetScale);
    
    const animate = () => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Use easing function for smooth animation
      const easedProgress = easeInOutCubic(progress);
      
      // Interpolate between quaternions for smooth rotation
      const currentPosition = new Vector3().lerpVectors(startPosition, targetPosition, easedProgress);
      const currentQuaternion = new Quaternion().slerpQuaternions(startQuaternion, targetQuaternion, easedProgress);
      const currentScale = new Vector3().lerpVectors(startScale, targetScale, easedProgress);
      
      // Create the current transformation matrix
      const currentMatrix = new Matrix4().compose(
        currentPosition,
        currentQuaternion,
        currentScale
      );
      
      // Apply the current transformation
      setCurrentTransform(currentMatrix);
      
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
            
            // For sequential rotations, we need to create a new transformation
            // that represents the incremental change in the local frame
            const incrementalMatrix = createTransformMatrix(
              nextStep.theta,
              nextStep.phi,
              nextStep.psi
            );
            
            // Apply the incremental transformation to the current matrix
            // This properly handles local frame transformations
            const newTargetMatrix = new Matrix4().multiplyMatrices(currentMatrix, incrementalMatrix);
            
            // Animate to the new target transformation
            animateTransformation(currentMatrix, newTargetMatrix, nextIndex);
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
        
        <div className="animate-button" style={{ marginBottom: '15px' }}>
          <button 
            onClick={animateRotationSequence} 
            disabled={isAnimating}
            style={{
              padding: '8px 16px',
              backgroundColor: isAnimating ? '#cccccc' : '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isAnimating ? 'not-allowed' : 'pointer',
              width: '100%'
            }}
          >
            {isAnimating ? `Animating Step ${currentStepIndex + 1}/${rotationSteps.length}` : 'Animate Sequence'}
          </button>
        </div>
        
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
        
        <div className="add-step-button" style={{ marginTop: '15px' }}>
          <button 
            onClick={addRotationStep} 
            disabled={isAnimating}
            style={{
              padding: '8px 16px',
              backgroundColor: isAnimating ? '#cccccc' : '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isAnimating ? 'not-allowed' : 'pointer',
              width: '100%'
            }}
          >
            Add Step
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcrolangVis;
