import { useEffect, useRef } from 'react'
import './App.css'

import * as tf from '@tensorflow/tfjs';
import * as poseDetection from '@tensorflow-models/pose-detection';
import Webcam from 'react-webcam';
import { RendererCanvas2d } from './utilities/tensor/index.js';
import React from 'react';

function App() {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const detect = async (instance: poseDetection.PoseDetector) => {
    if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null && webcamRef.current?.video?.readyState === 4) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;
      
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      const pose = await instance.estimatePoses(video);
      console.log('pose', pose);

      drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
    }
  }

  const drawCanvas = (pose: poseDetection.Pose[], video: HTMLVideoElement, videoWidth: number, videoHeight: number, canvas: React.RefObject<HTMLCanvasElement>) => {
    // const poseId = Math.floor(Math.random() * 21);
    // if (canvas.current) {
      const canvasElement = canvas.current as HTMLCanvasElement;
      canvasElement.width = videoWidth;
      canvasElement.height = videoHeight;
    // }


      // const poseId = Math.floor(Math.random() * 21); // Generate a unique pose ID for each pose
      const renderer = new RendererCanvas2d(canvas.current);
      console.log('rend', renderer);

      // renderer.drawKeypoints(pose[0].keypoints); // Use the generated poseId
      // renderer.drawSkeleton(pose[0].keypoints, poseId);  // Use the generated poseId

    // drawKeypoints(pose.keypoints, poseId);
    // drawSkeleton(pose["keypoints"], poseId);
  }
// https://codesandbox.io/s/posedetection-demo-fxy4h?file=/src/renderer_canvas2d.js
  const runPoseDetection = async () => {
    await tf.ready();
    await tf.setBackend('webgl');
    const model = poseDetection.SupportedModels.PoseNet;
    const detector = await poseDetection.createDetector(model, { runtime: 'tfjs' });

    setInterval(() => {
      detect(detector);
    }, 5000);
  };

  runPoseDetection();

  useEffect(() => {
    const canvasElement = canvasRef.current;

    if (canvasElement) {
      const handleContextLost = (event) => {
        event.preventDefault();
        // Handle context loss gracefully.
      };
    
      const handleContextRestored = () => {
        // Re-create WebGL resources and state.
        // setupWebGLStateAndResources();
      };
    
      canvasElement.addEventListener("webglcontextlost", handleContextLost, false);
      canvasElement.addEventListener("webglcontextrestored", handleContextRestored, false);
    
      // Return a cleanup function to remove the event listeners when the component unmounts.
      return () => {
        canvasElement.removeEventListener("webglcontextlost", handleContextLost);
        canvasElement.removeEventListener("webglcontextrestored", handleContextRestored);
      };
    }
  
    
  }, []);

  return (
    <>
      <Webcam ref={webcamRef}/>
      <div id="scatter-gl-container">
        <canvas ref={canvasRef} width="500" height="500"/>
      </div>
      
    </>
  )
}

export default App
