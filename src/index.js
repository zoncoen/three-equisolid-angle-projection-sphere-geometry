'use strict';

import THREE from 'three';

class EquisolidAngleProjectionSphereGeometry extends THREE.Geometry {
  constructor(radius = 50, widthSegments = 8, heightSegments = 6, phiStart = 0, phiLength = 2 * Math.PI, thetaStart = 0, thetaLength = Math.PI, verticalFoV = 360, aspectRatio = 1) {
    super();

    this.type = 'EquisolidAngleProjectionSphereGeometry';
    this.parameters = {
      radius,
      widthSegments,
      heightSegments,
      phiStart,
      phiLength,
      thetaStart,
      thetaLength,
      verticalFoV,
      aspectRatio
    };
    widthSegments = Math.max(3, Math.floor(widthSegments));
    heightSegments = Math.max(2, Math.floor(heightSegments));

    const uvs = [];
    for (let i = 0; i <= heightSegments; i++) {
      const v = i / heightSegments;
      const theta = Math.PI * v;
      const y = radius * Math.cos(theta);
      const r = radius * Math.sin(theta);

      const k = 0.5 / Math.sin(verticalFoV / 2.0 / 180.0 * Math.PI / 2.0);
      const rUv = k * Math.sin(theta / 2.0);

      for (let j = 0; j <= widthSegments; j++) {
        const u = j / widthSegments;
        const vertex = new THREE.Vector3();

        vertex.x = r * Math.sin(2 * Math.PI * u);
        vertex.y = y;
        vertex.z = -r * Math.cos(2 * Math.PI * u);
        this.vertices.push(vertex);

        const uv = new THREE.Vector2();

        uv.x = 0.5 + rUv / aspectRatio * Math.sin(2 * Math.PI * u);
        uv.y = 0.5 + rUv * Math.cos(2 * Math.PI * u);
        uvs.push(uv);
      }
    }
    for (let i = 0; i < heightSegments - 1; i++) {
      const base = i * (widthSegments + 1);

      for (let j = 0; j < widthSegments; j++) {
        this.faces.push(
            new THREE.Face3(base + j, base + j + 1, base + j + (widthSegments + 1)),
            new THREE.Face3(base + j + (widthSegments + 1), base + j + 1, base + j + 1 + (widthSegments + 1))
            );
        this.faceVertexUvs[0].push(
            [uvs[base + j], uvs[base + j + 1], uvs[base + j + (widthSegments + 1)]],
            [uvs[base + j + (widthSegments + 1)], uvs[base + j + 1], uvs[base + j + 1 + (widthSegments + 1)]]
            );
      }
    }

    this.computeFaceNormals();
    this.boundingSphere = new THREE.Sphere(new THREE.Vector3(), radius);
  }
}

export default EquisolidAngleProjectionSphereGeometry;
