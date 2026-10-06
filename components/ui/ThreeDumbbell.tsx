"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function ThreeDumbbell() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 3.8);
    camera.lookAt(0, 0, 0);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = false;
    container.appendChild(renderer.domElement);

    // 4. Lighting (Industrial Gym Studio)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // Key light (Chalk white overhead)
    const keyLight = new THREE.DirectionalLight(0xedebe4, 1.8);
    keyLight.position.set(3, 5, 4);
    scene.add(keyLight);

    // Volt Rim Light (Subtle gym accent bounce)
    const voltRimLight = new THREE.DirectionalLight(0xd4ff3f, 1.4);
    voltRimLight.position.set(-4, -2, -3);
    scene.add(voltRimLight);

    // Back rim light
    const backLight = new THREE.DirectionalLight(0x8a8f98, 1.0);
    backLight.position.set(0, 4, -4);
    scene.add(backLight);

    // 5. Construct 3D Dumbbell
    const dumbbellGroup = new THREE.Group();

    // Materials
    const steelMaterial = new THREE.MeshStandardMaterial({
      color: 0xd8d8d8,
      metalness: 0.88,
      roughness: 0.25,
    });

    const knurledMaterial = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      metalness: 0.9,
      roughness: 0.45,
    });

    const ironPlateMaterial = new THREE.MeshStandardMaterial({
      color: 0x17181b,
      metalness: 0.5,
      roughness: 0.6,
    });

    const voltRingMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4ff3f,
      metalness: 0.3,
      roughness: 0.3,
      emissive: 0xd4ff3f,
      emissiveIntensity: 0.15,
    });

    // Central Shaft (Handle)
    const handleGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.3, 32);
    handleGeo.rotateZ(Math.PI / 2);
    const handleMesh = new THREE.Mesh(handleGeo, knurledMaterial);
    dumbbellGroup.add(handleMesh);

    // Handle end stops
    const stopGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.05, 32);
    stopGeo.rotateZ(Math.PI / 2);
    const leftStop = new THREE.Mesh(stopGeo, steelMaterial);
    leftStop.position.x = -0.55;
    const rightStop = new THREE.Mesh(stopGeo, steelMaterial);
    rightStop.position.x = 0.55;
    dumbbellGroup.add(leftStop);
    dumbbellGroup.add(rightStop);

    // Plates Assembly Function
    const createPlateStack = (direction: number) => {
      const stack = new THREE.Group();

      // Outer Heavy Plate (10kg)
      const outerPlateGeo = new THREE.CylinderGeometry(0.52, 0.52, 0.14, 32);
      outerPlateGeo.rotateZ(Math.PI / 2);
      const outerPlate = new THREE.Mesh(outerPlateGeo, ironPlateMaterial);
      outerPlate.position.x = direction * 0.72;

      // Volt Accent Rim Ring on Outer Plate
      const rimRingGeo = new THREE.TorusGeometry(0.48, 0.018, 16, 48);
      rimRingGeo.rotateY(Math.PI / 2);
      const rimRing = new THREE.Mesh(rimRingGeo, voltRingMaterial);
      rimRing.position.x = direction * 0.79;

      // Second Plate (7.5kg)
      const midPlateGeo = new THREE.CylinderGeometry(0.46, 0.46, 0.12, 32);
      midPlateGeo.rotateZ(Math.PI / 2);
      const midPlate = new THREE.Mesh(midPlateGeo, ironPlateMaterial);
      midPlate.position.x = direction * 0.88;

      // Third Plate (5kg)
      const innerPlateGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.1, 32);
      innerPlateGeo.rotateZ(Math.PI / 2);
      const innerPlate = new THREE.Mesh(innerPlateGeo, ironPlateMaterial);
      innerPlate.position.x = direction * 1.02;

      // End Cap Nut (Steel)
      const capGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.06, 6); // Hex nut
      capGeo.rotateZ(Math.PI / 2);
      const capMesh = new THREE.Mesh(capGeo, steelMaterial);
      capMesh.position.x = direction * 1.1;

      stack.add(outerPlate);
      stack.add(rimRing);
      stack.add(midPlate);
      stack.add(innerPlate);
      stack.add(capMesh);

      return stack;
    };

    dumbbellGroup.add(createPlateStack(-1));
    dumbbellGroup.add(createPlateStack(1));

    // Initial slight isometric tilt
    dumbbellGroup.rotation.x = 0.25;
    dumbbellGroup.rotation.y = 0.65;
    dumbbellGroup.rotation.z = -0.15;

    scene.add(dumbbellGroup);

    // 6. Interactive Drag to Rotate
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let targetRotationX = 0.25;
    let targetRotationY = 0.65;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      setIsInteracting(true);
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      previousMouseX = clientX;
      previousMouseY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - previousMouseX;
      const deltaY = clientY - previousMouseY;

      targetRotationY += deltaX * 0.012;
      targetRotationX += deltaY * 0.012;

      previousMouseX = clientX;
      previousMouseY = clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    const dom = renderer.domElement;
    dom.addEventListener("mousedown", onPointerDown);
    dom.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("mouseup", onPointerUp);
    window.addEventListener("touchend", onPointerUp);

    // 7. Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Auto gentle rotation when not dragging
      if (!isDragging && !prefersReduced) {
        targetRotationY += 0.005;
      }

      // Smooth damping interpolation
      dumbbellGroup.rotation.y += (targetRotationY - dumbbellGroup.rotation.y) * 0.08;
      dumbbellGroup.rotation.x += (targetRotationX - dumbbellGroup.rotation.x) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Handle Resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      dom.removeEventListener("mousedown", onPointerDown);
      dom.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      window.removeEventListener("touchend", onPointerUp);

      renderer.dispose();
      if (dom.parentNode) {
        dom.parentNode.removeChild(dom);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`w-full h-full min-h-[380px] sm:min-h-[460px] md:min-h-[520px] cursor-grab active:cursor-grabbing select-none relative ${
        isInteracting ? "ring-1 ring-[#D4FF3F]/30" : ""
      }`}
    />
  );
}
