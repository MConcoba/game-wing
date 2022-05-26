var sceneEl = document.querySelector('a-scene');

AFRAME.registerComponent('guategeeks', {
  init: function () {
    console.log('guategeeks');
  },
});

AFRAME.registerComponent('asteroid', {
  tick: (function () {
    return function (time, timeDelta) {
      if (time > 250) {
        if (this.el.object3D.visible) {
          let position = this.el.getAttribute('position');
          this.el.setAttribute('position', {
            x: position.x,
            y: position.y,
            z: position.z + 0.5,
          });
        }
      }
    };
  })(),
});

AFRAME.registerComponent('move', {
  schema: {},
  tick: function () {
    let el = this.el;
    let position = el.getAttribute('position');
    position.z = position.z + 0.027;
  },
});

AFRAME.registerComponent('click-to-shoot', {
  init: function () {
    document.body.addEventListener('mousedown', () => {
      this.el.emit('shoot');
      console.log('disparo');
    });
  },
});

function getCameraPosition() {
  let camera = document.getElementById('camera');
  let position = camera.getAttribute('position');
  console.log(position);
  return position;
}

function setCylinderPosition(position) {
  let cylinder = document.getElementById('cylinder');
  cylinder.setAttribute('position', position);
}

AFRAME.registerComponent('hit-handler', {
  dependencies: ['material'],

  init: function () {
    var color;
    var el = this.el;
    color = new THREE.Color();
    el.addEventListener('hit', () => {
      el.object3D.visible = false;
    });
    el.addEventListener('die', () => {
      //color.setRGB(1, 0, 0);
      console.log('se fue');
      el.object3D.visible = false;
    });

    setTimeout(() => {
      if (!this.el.object3D.visible) {
        console.log('hay invisiblre');
      }
    }, 5);
  },

  tick: function () {
    let el = this.el;
    let position = el.getAttribute('position');
    position.z = position.z + 0.008;
  },
});
