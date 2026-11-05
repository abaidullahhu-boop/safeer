import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const EARTH_MAP = 'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg';

export const HeroGlobe: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;

    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    camera.position.set(0, 0.28, 2.22);

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'none';
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0x8eb4d8, 0.55);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.35);
    keyLight.position.set(2.4, 1.2, 2.2);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x3ebfd2, 0.55);
    rimLight.position.set(-2.2, -0.4, -1.4);
    scene.add(rimLight);

    const globeGroup = new THREE.Group();
    globeGroup.rotation.y = 0.9;
    globeGroup.rotation.x = 0.12;
    globeGroup.position.y = -0.55;
    globeGroup.scale.setScalar(1.12);
    scene.add(globeGroup);
    const basePosY = globeGroup.position.y;

    const loader = new THREE.TextureLoader();
    const earthGeo = new THREE.SphereGeometry(1, 40, 40);
    const earthMat = new THREE.MeshPhongMaterial({
      color: 0x1a4a7a,
      shininess: 12,
      specular: new THREE.Color(0x334455),
    });
    const earth = new THREE.Mesh(earthGeo, earthMat);
    globeGroup.add(earth);

    loader.load(EARTH_MAP, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 1;
      tex.minFilter = THREE.LinearFilter;
      earthMat.map = tex;
      earthMat.color = new THREE.Color(0xffffff);
      earthMat.needsUpdate = true;
    });

    const atmosGeo = new THREE.SphereGeometry(1.045, 32, 32);
    const atmosMat = new THREE.MeshBasicMaterial({
      color: 0x3ebfd2,
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide,
    });
    globeGroup.add(new THREE.Mesh(atmosGeo, atmosMat));

    const mouseOffset = { x: 0, y: 0 };
    const targetPos = { x: 0, y: 0 };
    let idleY = globeGroup.rotation.y;
    const baseX = globeGroup.rotation.x;

    const onMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mouseOffset.x = nx * 0.28;
      mouseOffset.y = ny * 0.1;
      targetPos.x = nx * 0.08;
      targetPos.y = -ny * 0.05;
    };

    if (isFinePointer && !prefersReduced) {
      window.addEventListener('mousemove', onMouseMove, { passive: true });
    }

    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(mount);

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!visible) return;

      if (!prefersReduced) {
        idleY += 0.0014;
      }

      globeGroup.rotation.y += (idleY + mouseOffset.x - globeGroup.rotation.y) * 0.07;
      globeGroup.rotation.x += (baseX + mouseOffset.y - globeGroup.rotation.x) * 0.07;
      globeGroup.position.x += (targetPos.x - globeGroup.position.x) * 0.06;
      globeGroup.position.y += (basePosY + targetPos.y - globeGroup.position.y) * 0.06;

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / Math.max(h, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      earthGeo.dispose();
      earthMat.map?.dispose();
      earthMat.dispose();
      atmosGeo.dispose();
      atmosMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 z-0 pointer-events-none opacity-[0.52]"
      aria-hidden="true"
    />
  );
};
