'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EquisolidAngleProjectionSphereGeometry = function (_THREE$Geometry) {
  _inherits(EquisolidAngleProjectionSphereGeometry, _THREE$Geometry);

  function EquisolidAngleProjectionSphereGeometry() {
    var radius = arguments.length <= 0 || arguments[0] === undefined ? 50 : arguments[0];
    var widthSegments = arguments.length <= 1 || arguments[1] === undefined ? 8 : arguments[1];
    var heightSegments = arguments.length <= 2 || arguments[2] === undefined ? 6 : arguments[2];
    var phiStart = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
    var phiLength = arguments.length <= 4 || arguments[4] === undefined ? 2 * Math.PI : arguments[4];
    var thetaStart = arguments.length <= 5 || arguments[5] === undefined ? 0 : arguments[5];
    var thetaLength = arguments.length <= 6 || arguments[6] === undefined ? Math.PI : arguments[6];
    var verticalFoV = arguments.length <= 7 || arguments[7] === undefined ? 360 : arguments[7];
    var aspectRatio = arguments.length <= 8 || arguments[8] === undefined ? 1 : arguments[8];

    _classCallCheck(this, EquisolidAngleProjectionSphereGeometry);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(EquisolidAngleProjectionSphereGeometry).call(this));

    _this.type = 'EquisolidAngleProjectionSphereGeometry';
    _this.parameters = {
      radius: radius,
      widthSegments: widthSegments,
      heightSegments: heightSegments,
      phiStart: phiStart,
      phiLength: phiLength,
      thetaStart: thetaStart,
      thetaLength: thetaLength,
      verticalFoV: verticalFoV,
      aspectRatio: aspectRatio
    };
    widthSegments = Math.max(3, Math.floor(widthSegments));
    heightSegments = Math.max(2, Math.floor(heightSegments));

    var uvs = [];
    for (var i = 0; i <= heightSegments; i++) {
      var v = i / heightSegments;
      var theta = Math.PI * v;
      var y = radius * Math.cos(theta);
      var r = radius * Math.sin(theta);

      var k = 0.5 / Math.sin(verticalFoV / 2.0 / 180.0 * Math.PI / 2.0);
      var rUv = k * Math.sin(theta / 2.0);

      for (var j = 0; j <= widthSegments; j++) {
        var u = j / widthSegments;
        var vertex = new _three2.default.Vector3();

        vertex.x = r * Math.sin(2 * Math.PI * u);
        vertex.y = y;
        vertex.z = -r * Math.cos(2 * Math.PI * u);
        _this.vertices.push(vertex);

        var uv = new _three2.default.Vector2();

        uv.x = 0.5 + rUv / aspectRatio * Math.sin(2 * Math.PI * u);
        uv.y = 0.5 + rUv * Math.cos(2 * Math.PI * u);
        uvs.push(uv);
      }
    }
    for (var i = 0; i < heightSegments - 1; i++) {
      var base = i * (widthSegments + 1);

      for (var j = 0; j < widthSegments; j++) {
        _this.faces.push(new _three2.default.Face3(base + j, base + j + 1, base + j + (widthSegments + 1)), new _three2.default.Face3(base + j + (widthSegments + 1), base + j + 1, base + j + 1 + (widthSegments + 1)));
        _this.faceVertexUvs[0].push([uvs[base + j], uvs[base + j + 1], uvs[base + j + (widthSegments + 1)]], [uvs[base + j + (widthSegments + 1)], uvs[base + j + 1], uvs[base + j + 1 + (widthSegments + 1)]]);
      }
    }

    _this.computeFaceNormals();
    _this.boundingSphere = new _three2.default.Sphere(new _three2.default.Vector3(), radius);
    return _this;
  }

  return EquisolidAngleProjectionSphereGeometry;
}(_three2.default.Geometry);

exports.default = EquisolidAngleProjectionSphereGeometry;
//# sourceMappingURL=data:application/json;base64,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Iiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5jbGFzcyBFcXVpc29saWRBbmdsZVByb2plY3Rpb25TcGhlcmVHZW9tZXRyeSBleHRlbmRzIFRIUkVFLkdlb21ldHJ5IHtcbiAgY29uc3RydWN0b3IocmFkaXVzID0gNTAsIHdpZHRoU2VnbWVudHMgPSA4LCBoZWlnaHRTZWdtZW50cyA9IDYsIHBoaVN0YXJ0ID0gMCwgcGhpTGVuZ3RoID0gMiAqIE1hdGguUEksIHRoZXRhU3RhcnQgPSAwLCB0aGV0YUxlbmd0aCA9IE1hdGguUEksIHZlcnRpY2FsRm9WID0gMzYwLCBhc3BlY3RSYXRpbyA9IDEpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy50eXBlID0gJ0VxdWlzb2xpZEFuZ2xlUHJvamVjdGlvblNwaGVyZUdlb21ldHJ5JztcbiAgICB0aGlzLnBhcmFtZXRlcnMgPSB7XG4gICAgICByYWRpdXMsXG4gICAgICB3aWR0aFNlZ21lbnRzLFxuICAgICAgaGVpZ2h0U2VnbWVudHMsXG4gICAgICBwaGlTdGFydCxcbiAgICAgIHBoaUxlbmd0aCxcbiAgICAgIHRoZXRhU3RhcnQsXG4gICAgICB0aGV0YUxlbmd0aCxcbiAgICAgIHZlcnRpY2FsRm9WLFxuICAgICAgYXNwZWN0UmF0aW9cbiAgICB9O1xuICAgIHdpZHRoU2VnbWVudHMgPSBNYXRoLm1heCgzLCBNYXRoLmZsb29yKHdpZHRoU2VnbWVudHMpKTtcbiAgICBoZWlnaHRTZWdtZW50cyA9IE1hdGgubWF4KDIsIE1hdGguZmxvb3IoaGVpZ2h0U2VnbWVudHMpKTtcblxuICAgIGNvbnN0IHV2cyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IGhlaWdodFNlZ21lbnRzOyBpKyspIHtcbiAgICAgIGNvbnN0IHYgPSBpIC8gaGVpZ2h0U2VnbWVudHM7XG4gICAgICBjb25zdCB0aGV0YSA9IE1hdGguUEkgKiB2O1xuICAgICAgY29uc3QgeSA9IHJhZGl1cyAqIE1hdGguY29zKHRoZXRhKTtcbiAgICAgIGNvbnN0IHIgPSByYWRpdXMgKiBNYXRoLnNpbih0aGV0YSk7XG5cbiAgICAgIGNvbnN0IGsgPSAwLjUgLyBNYXRoLnNpbih2ZXJ0aWNhbEZvViAvIDIuMCAvIDE4MC4wICogTWF0aC5QSSAvIDIuMCk7XG4gICAgICBjb25zdCByVXYgPSBrICogTWF0aC5zaW4odGhldGEgLyAyLjApO1xuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8PSB3aWR0aFNlZ21lbnRzOyBqKyspIHtcbiAgICAgICAgY29uc3QgdSA9IGogLyB3aWR0aFNlZ21lbnRzO1xuICAgICAgICBjb25zdCB2ZXJ0ZXggPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gICAgICAgIHZlcnRleC54ID0gciAqIE1hdGguc2luKDIgKiBNYXRoLlBJICogdSk7XG4gICAgICAgIHZlcnRleC55ID0geTtcbiAgICAgICAgdmVydGV4LnogPSAtciAqIE1hdGguY29zKDIgKiBNYXRoLlBJICogdSk7XG4gICAgICAgIHRoaXMudmVydGljZXMucHVzaCh2ZXJ0ZXgpO1xuXG4gICAgICAgIGNvbnN0IHV2ID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblxuICAgICAgICB1di54ID0gMC41ICsgclV2IC8gYXNwZWN0UmF0aW8gKiBNYXRoLnNpbigyICogTWF0aC5QSSAqIHUpO1xuICAgICAgICB1di55ID0gMC41ICsgclV2ICogTWF0aC5jb3MoMiAqIE1hdGguUEkgKiB1KTtcbiAgICAgICAgdXZzLnB1c2godXYpO1xuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhlaWdodFNlZ21lbnRzIC0gMTsgaSsrKSB7XG4gICAgICBjb25zdCBiYXNlID0gaSAqICh3aWR0aFNlZ21lbnRzICsgMSk7XG5cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgd2lkdGhTZWdtZW50czsgaisrKSB7XG4gICAgICAgIHRoaXMuZmFjZXMucHVzaChcbiAgICAgICAgICAgIG5ldyBUSFJFRS5GYWNlMyhiYXNlICsgaiwgYmFzZSArIGogKyAxLCBiYXNlICsgaiArICh3aWR0aFNlZ21lbnRzICsgMSkpLFxuICAgICAgICAgICAgbmV3IFRIUkVFLkZhY2UzKGJhc2UgKyBqICsgKHdpZHRoU2VnbWVudHMgKyAxKSwgYmFzZSArIGogKyAxLCBiYXNlICsgaiArIDEgKyAod2lkdGhTZWdtZW50cyArIDEpKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgdGhpcy5mYWNlVmVydGV4VXZzWzBdLnB1c2goXG4gICAgICAgICAgICBbdXZzW2Jhc2UgKyBqXSwgdXZzW2Jhc2UgKyBqICsgMV0sIHV2c1tiYXNlICsgaiArICh3aWR0aFNlZ21lbnRzICsgMSldXSxcbiAgICAgICAgICAgIFt1dnNbYmFzZSArIGogKyAod2lkdGhTZWdtZW50cyArIDEpXSwgdXZzW2Jhc2UgKyBqICsgMV0sIHV2c1tiYXNlICsgaiArIDEgKyAod2lkdGhTZWdtZW50cyArIDEpXV1cbiAgICAgICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5jb21wdXRlRmFjZU5vcm1hbHMoKTtcbiAgICB0aGlzLmJvdW5kaW5nU3BoZXJlID0gbmV3IFRIUkVFLlNwaGVyZShuZXcgVEhSRUUuVmVjdG9yMygpLCByYWRpdXMpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVxdWlzb2xpZEFuZ2xlUHJvamVjdGlvblNwaGVyZUdlb21ldHJ5O1xuIl19