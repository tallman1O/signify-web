"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ARButton, XR, Controllers, Interactive } from "@react-three/xr";
import { Text, useGLTF } from "@react-three/drei";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);

  return (
    <primitive object={scene} scale={[0.5, 0.5, 0.5]} position={[0, 0, -1]} />
  );
}

function FloatingText() {
  return (
    <Text
      position={[0, 1, -1]}
      fontSize={0.2}
      color="black"
      anchorX="center"
      anchorY="middle"
    >
      Hello AR World!
    </Text>
  );
}

export default function ARScene() {
  const [isARSupported, setIsARSupported] = useState(false);

  useEffect(() => {
    if ("xr" in navigator) {
      navigator.xr
        ?.isSessionSupported("immersive-ar")
        .then((supported) => setIsARSupported(supported));
    }
  }, []);

  if (!isARSupported) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            AR Not Supported
          </h2>
          <p className="text-gray-600">
            Your device or browser doesn&apos;t support WebXR AR features.
            Please try using a compatible device and browser.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen">
      <ARButton className="absolute top-4 left-4 z-10" onClick={() => {}} />
      <Canvas>
        <XR>
          <Controllers />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Model url="/models/avatar.glb" />
          <FloatingText />
        </XR>
      </Canvas>
    </div>
  );
}
