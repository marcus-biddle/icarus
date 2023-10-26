/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
import * as posedetection from '@tensorflow-models/pose-detection';
import * as scatter from 'scatter-gl';

import * as params from './params';

// These anchor points allow the pose pointcloud to resize according to its
// position in the input.
// const ANCHOR_POINTS = [[0, 0, 0], [0, 1, 0], [-1, 0, 0], [-1, -1, 0]];

// #ffffff - White
// #800000 - Maroon
// #469990 - Malachite
// #e6194b - Crimson
// #42d4f4 - Picton Blue
// #fabed4 - Cupid
// #aaffc3 - Mint Green
// #9a6324 - Kumera
// #000075 - Navy Blue
// #f58231 - Jaffa
// #4363d8 - Royal Blue
// #ffd8b1 - Caramel
// #dcbeff - Mauve
// #808000 - Olive
// #ffe119 - Candlelight
// #911eb4 - Seance
// #bfef45 - Inchworm
// #f032e6 - Razzle Dazzle Rose
// #3cb44b - Chateau Green
// #a9a9a9 - Silver Chalice
// const COLOR_PALETTE = [
//   '#ffffff', '#800000', '#469990', '#e6194b', '#42d4f4', '#fabed4', '#aaffc3',
//   '#9a6324', '#000075', '#f58231', '#4363d8', '#ffd8b1', '#dcbeff', '#808000',
//   '#ffe119', '#911eb4', '#bfef45', '#f032e6', '#3cb44b', '#a9a9a9'
// ];
export class RendererCanvas2d {
  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.scatterGLEl = document.querySelector('#scatter-gl-container');
    this.scatterGL = new scatter.ScatterGL(this.scatterGLEl, {
      'rotateOnStart': true,
      'selectEnabled': false,
      'styles': {polyline: {defaultOpacity: 1, deselectedOpacity: 1}}
    });
    this.scatterGLHasInitialized = false;
    this.videoWidth = canvas.width;
    this.videoHeight = canvas.height;
    // this.flip(this.videoWidth, this.videoHeight);
  }

  flip(videoWidth, videoHeight) {
    // Because the image from camera is mirrored, need to flip horizontally.
    this.ctx.translate(videoWidth, 0);
    this.ctx.scale(-1, 1);

    this.scatterGLEl.style =
        `width: ${videoWidth}px; height: ${videoHeight}px;`;
    this.scatterGL.resize();

    this.scatterGLEl.style.display =
        params.STATE.modelConfig.render3D ? 'inline-block' : 'none';
  }

  draw(rendererParams) {
    const [video, poses, isModelChanged] = rendererParams;
    this.drawCtx(video);

    // The null check makes sure the UI is not in the middle of changing to a
    // different model. If during model change, the result is from an old model,
    // which shouldn't be rendered.
    if (poses && poses.length > 0 && !isModelChanged) {
      this.drawResults(poses);
    }
  }

  drawCtx(video) {
    this.ctx.drawImage(video, 0, 0, this.videoWidth, this.videoHeight);
  }

  clearCtx() {
    this.ctx.clearRect(0, 0, this.videoWidth, this.videoHeight);
  }

  /**
   * Draw the keypoints and skeleton on the video.
   * @param poses A list of poses to render.
   */
  // drawResults(poses) {
  //   for (const pose of poses) {
  //     this.drawResult(pose);
  //   }
  // }

  /**
   * Draw the keypoints and skeleton on the video.
   * @param pose A pose with keypoints to render.
   */
  drawResult(pose) {
    try {
      const landmarks = [];

      for (const keypoint of pose.keypoints) {
        landmarks.push(keypoint.name);
      }

      console.log(landmarks);
      
      // We can start building the angles for pushups
      // options for successful pushup
      // 1) left side view - left arm, left ankle
      // 2) right side view - right arm, right ankle
      // 3) front view - right arm, left arm
      const rightArmAngle = this.calculateAngleFor(pose, 'right_shoulder', 'right_elbow', 'right_wrist');
      const leftArmAngle = this.calculateAngleFor(pose, 'left_shoulder', 'left_elbow', 'left_wrist');

      if (rightArmAngle < 90 && leftArmAngle < 90) {
        console.log('ANGLE LESS THAN 90 DEGREES');
      }

    } catch (err) {
      console.log('low visibility', err);
    }

    if (pose.keypoints != null) {
      this.drawKeypoints(pose.keypoints);
      this.drawSkeleton(pose);
    }
    
    //https://github.com/nicknochnack/MediaPipePoseEstimation/blob/main/.ipynb_checkpoints/Media%20Pipe%20Pose%20Tutorial-checkpoint.ipynb

  }

  calculateAngleFor(pose, x, y, z) {
    const first = pose.keypoints.find(obj => obj.name === x && obj.score >= .80);
    const second = pose.keypoints.find(obj => obj.name === y && obj.score >= .80);
    const third = pose.keypoints.find(obj => obj.name === z && obj.score >= .80);

    const a = [first.x, first.y];
    const b = [second.x, second.y];
    const c = [third.x, third.y];
    
    const angle = this.calculateAngle(a, b, c);
    this.drawText(angle, b[0], b[1]);

    return angle;
  }

  drawText(angle, x, y) {
    const angleStr = angle.toString();
    console.log(angleStr);

    this.ctx.font = '12px Arial';

    this.ctx.fillStyle = 'white'; 
    this.ctx.strokeStyle = 'white'; 
    this.ctx.lineWidth = 2;

    this.ctx.fillText(angleStr, x, y);
    this.ctx.strokeText(angleStr, x, y);

    console.log('VISIBLE', angleStr, x, y)
  }

  /**
   * Draw the keypoints on the video.
   * @param a first point
   * @param b second point
   * @param c third point
   */
  calculateAngle(a, b, c) {
    const arrayA = [...a];
    const arrayB = [...b];
    const arrayC = [...c];

    const radians = Math.atan2(arrayC[1] - arrayB[1], arrayC[0] - arrayB[0]) - Math.atan2(arrayA[1] - arrayB[1], arrayA[0] - arrayB[0]);
    let angle = Math.abs((radians*180) / Math.PI);

    if (angle > 180) {
      angle = 360 - angle;
    }

    return angle;
  }

  /**
   * Draw the keypoints on the video.
   * @param keypoints A list of keypoints.
   */
  drawKeypoints(keypoints) {
    const keypointInd = posedetection.util.getKeypointIndexBySide(params.STATE.model || "BlazePose");
    this.ctx.fillStyle = 'Red';
    this.ctx.strokeStyle = 'White';
    this.ctx.lineWidth = params.DEFAULT_LINE_WIDTH;

    for (const i of keypointInd.middle) {
      if (keypoints[i]) {
        this.drawKeypoint(keypoints[i]);
      }
    }

    this.ctx.fillStyle = 'Green';
    for (const i of keypointInd.left) {
      if (keypoints[i]) {
        this.drawKeypoint(keypoints[i]);
      }
    }

    this.ctx.fillStyle = 'Orange';
    for (const i of keypointInd.right) {
      if (keypoints[i]) {
        this.drawKeypoint(keypoints[i]);
      }
    }
  }

  drawKeypoint(keypoint) {
    // If score is null, just show the keypoint.
    const score = keypoint.score != null ? keypoint.score : 1;
    const scoreThreshold = params.STATE.modelConfig.scoreThreshold || 0.5;

    if (score >= scoreThreshold) {
      const circle = new Path2D();
      circle.arc(keypoint.x, keypoint.y, params.DEFAULT_RADIUS, 0, 2 * Math.PI);
      this.ctx.fill(circle);
      this.ctx.stroke(circle);
    }
  }

  /**
   * Draw the skeleton of a body on the video.
   * @param keypoints A list of keypoints.
   */
  drawSkeleton(pose) {
    // Each poseId is mapped to a color in the color palette.
    const color = 'White';
    this.ctx.fillStyle = color;
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = params.DEFAULT_LINE_WIDTH;

    posedetection.util.getAdjacentPairs(params.STATE.model || "BlazePose").forEach(([i, j]) => {
      const kp1 = pose.keypoints[i];
      const kp2 = pose.keypoints[j];

      if (kp1 && kp2) {
        // If score is null, just show the keypoint.
        const score1 = kp1.score != null ? kp1.score : 1;
        const score2 = kp2.score != null ? kp2.score : 1;
        const scoreThreshold = params.STATE.modelConfig.scoreThreshold || 0.75;

        if (score1 >= scoreThreshold && score2 >= scoreThreshold) {
          this.ctx.beginPath();
          this.ctx.moveTo(kp1.x, kp1.y);
          this.ctx.lineTo(kp2.x, kp2.y);
          this.ctx.stroke();
        }
      }
      
    });
  }

  // drawKeypoints3D(keypoints) {
  //   const scoreThreshold = params.STATE.modelConfig.scoreThreshold || 0;
  //   const pointsData =
  //       keypoints.map(keypoint => ([-keypoint.x, -keypoint.y, -keypoint.z]));

  //   const dataset =
  //       new scatter.ScatterGL.Dataset([...pointsData, ...ANCHOR_POINTS]);

  //   const keypointInd =
  //       posedetection.util.getKeypointIndexBySide(params.STATE.model);
  //   this.scatterGL.setPointColorer((i) => {
  //     if (keypoints[i] == null || keypoints[i].score < scoreThreshold) {
  //       // hide anchor points and low-confident points.
  //       return '#ffffff';
  //     }
  //     if (i === 0) {
  //       return '#ff0000' /* Red */;
  //     }
  //     if (keypointInd.left.indexOf(i) > -1) {
  //       return '#00ff00' /* Green */;
  //     }
  //     if (keypointInd.right.indexOf(i) > -1) {
  //       return '#ffa500' /* Orange */;
  //     }
  //   });

  //   if (!this.scatterGLHasInitialized) {
  //     this.scatterGL.render(dataset);
  //   } else {
  //     this.scatterGL.updateDataset(dataset);
  //   }
  //   const connections = posedetection.util.getAdjacentPairs(params.STATE.model);
  //   const sequences = connections.map(pair => ({indices: pair}));
  //   this.scatterGL.setSequences(sequences);
  //   this.scatterGLHasInitialized = true;
  // }
}