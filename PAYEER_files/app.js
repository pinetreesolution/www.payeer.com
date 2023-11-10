(function () {
  var canvas = [].slice.call(document.querySelectorAll("canvas"));
  var winWidth = window.innerWidth;

  var canvasBg = [].slice.call(document.querySelectorAll('[data-target="canvas-bg"]'));
  function is_retina_device() {
    return window.devicePixelRatio > 1;
  }

  var isLanding = false;

  if (canvas) {
    canvas.forEach(function(el, index) {
      // variables
      var width = el.offsetWidth,
          height = el.offsetHeight;
      var scene = new THREE.Scene();
      var mouse = new THREE.Vector2(-100,-100);
      var loader = new THREE.TextureLoader();
      var raycaster = new THREE.Raycaster();
      var galaxy = new THREE.Group();
      var dotsGeometry = new THREE.Geometry();
      var hovered = [];
      var prevHovered = [];
      var resizeTm;
      var colors = [
        new THREE.Color(0x1DC3FC),
        new THREE.Color(0x239799),
        new THREE.Color(0x02F1E4)];

      var renderer = new THREE.WebGLRenderer({
        canvas: el,
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true
      });

      renderer.setPixelRatio(1);
      // renderer.setSize(1920, 980);
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0.0);
      var altIndex;

      if (el.dataset.position === 'center') {
        altIndex = index
        isLanding = true;
      } else {
        if (!isLanding) {
           index = 1;
          altIndex = 0;
        } else {
          altIndex = index;
        }

      }


      if (index === 0) {
        var camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 2000);
        camera.position.set(0, 0, 360);
        camera.lookAt(new THREE.Vector3(0, 190, 0));
      } else {
        var camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 2000);
        camera.position.set(0, 0, 255);
        camera.lookAt(new THREE.Vector3(0, -580, 0));
      }

      canvasBg[altIndex].style.width = (width) + 'px';
      canvasBg[altIndex].style.height = (height / (width / height) + 115) + 'px';

      if (index === 1) {
        canvasBg[altIndex].style.width = (width / (width / height)) + 'px';

      }


      scene.add(galaxy);
      raycaster.params.Points.threshold = 6;

      // Create dots
      loader.crossOrigin = "";
      var dotTexture = loader.load('/style/images/dotTexture.png');
      // number of dots
      //console.log(el, index);
      var dotsAmount = 2900;
      var positions = new Float32Array(dotsAmount * 3);
      var sizes = new Float32Array(dotsAmount * 2);
      var colorsAttribute = new Float32Array(dotsAmount * 3);
      var vectorClone = [];
      var vectorScalar = [];
      var vector;
      var tempVector
      for (var i = 0; i < dotsAmount; i++) {
        vector = new THREE.Vector3();

        vector.color = Math.floor(Math.random() * colors.length);
        vector.theta = Math.random() * Math.PI * 2;
        vector.phi =
        (1 - Math.sqrt(Math.random())) *
        Math.PI /
        2 *
        (Math.random() > 0.5 ? 1 : -1);
        // console.log(vector.phi);
        if (index === 0) {
          vector.x = Math.cos(vector.theta) * Math.cos((vector.phi > 0 ? vector.phi : -1));
          vector.y = Math.sin((vector.phi > 0 ? vector.phi : -1));
          vector.z = Math.sin(vector.theta) * Math.cos((vector.phi > 0 ? vector.phi : -1));
          vector.multiplyScalar(200 + (Math.random() - 0.3) * 5);
        } else {
          vector.x = Math.cos(vector.theta) * Math.cos((vector.phi < 0 ? vector.phi : 1));
          vector.y = Math.sin((vector.phi < 0 ? vector.phi : 1));
          vector.z = Math.sin(vector.theta) * Math.cos((vector.phi < 0 ? vector.phi : 1)) - 0.6;
          vector.multiplyScalar(290 + (Math.random() - 0.3) * 5);
        }

        // vector.multiplyScalar(165 + (Math.random() - 0.3) * 5);
        vector.scaleX = 5;
        vector.amount = 0;

        if (Math.random() > 0.7) {
          moveDot(vector, i);
        }
        // vectorClone[i] = vector.clone()
        dotsGeometry.vertices.push(vector);


        // vectorScalar[i] = tempVector

        vector.toArray(positions, i * 3);
        colors[vector.color].toArray(colorsAttribute, i*3);

        // return vector;
        if (is_retina_device()) {
          sizes[i] = randomInteger(0, 3);
        } else {
          sizes[i] = randomInteger(1, 3);
        }
      }

      // animate the dots
      function moveDot(vector, index) {
        tempVector = vector.clone();
        tempVector.multiplyScalar((Math.random() - 0.5) * 0.2 + 1);

        TweenMax.to(vector, Math.random() * 3 + 3, {
          x: tempVector.x,
          y: tempVector.y,
          z: tempVector.z,
          yoyo: true,
          repeat: -1,
          delay: -0.5,
          ease: Power0.easeNone,
          onUpdate: function () {
            attributePositions.array[index*3] = vector.x;
            attributePositions.array[index*3+1] = vector.y;
            attributePositions.array[index*3+2] = vector.z;
          }
        });
      }


      // render
      function render() {
        dotsGeometry.verticesNeedUpdate = true;

        attributeSizes.needsUpdate = true;
        attributePositions.needsUpdate = true;

        renderer.render(scene, camera);
      }

      var bufferWrapGeom = new THREE.BufferGeometry();
      var attributePositions = new THREE.BufferAttribute(positions, 3);
      bufferWrapGeom.addAttribute('position', attributePositions);
      var attributeSizes = new THREE.BufferAttribute(sizes, 1);
      bufferWrapGeom.addAttribute('size', attributeSizes);
      var attributeColors = new THREE.BufferAttribute(colorsAttribute, 3);
      bufferWrapGeom.addAttribute('color', attributeColors);
      var shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
          texture: {
            value: dotTexture
          }
        },
        vertexShader: document.getElementById("wrapVertexShader").textContent,
        fragmentShader: document.getElementById("wrapFragmentShader").textContent,
        transparent:true
      });
      var wrap = new THREE.Points(bufferWrapGeom, shaderMaterial);
      scene.add(wrap);


      function onDotHover(index) {
        dotsGeometry.vertices[index].tl = new TimelineMax();
        // dotsGeometry.vertices[index].tl.to(dotsGeometry.vertices[index], 0.4, {
        dotsGeometry.vertices[index].tl.to(dotsGeometry.vertices[index], 1, {
          scaleX: 6,
          // ease: Bounce.easeIn,
          ease: Elastic.easeOut.config(2, 0.2),
          onUpdate: function() {
            attributeSizes.array[index] = dotsGeometry.vertices[index].scaleX;
          }
        });
      }

      function mouseOut(index) {
        dotsGeometry.vertices[index].tl.to(dotsGeometry.vertices[index], 0.7, {
          scaleX: randomInteger(1, 4),
          ease: Power2.easeOut,
          onUpdate: function() {
            attributeSizes.array[index] = dotsGeometry.vertices[index].scaleX;
          }
        });
      }

      function randomInteger(min, max) {
        var rand = min - 0.5 + Math.random() * (max - min + 1);
        rand = Math.round(rand);
        return rand;
      }


      function onMouseMove(e) {
        var canvasBounding = el.getBoundingClientRect();
        mouse.x = ((e.clientX - canvasBounding.left) / width) * 2 - 1;
        mouse.y = -((e.clientY - canvasBounding.top) / height) * 2 + 1;

        var i;
        raycaster.setFromCamera( mouse, camera );
        var intersections = raycaster.intersectObjects([wrap]);
        hovered = [];
        if (intersections.length) {
          for(i = 0; i < intersections.length; i++) {
            var index = intersections[i].index;
            hovered.push(index);
            if (prevHovered.indexOf(index) === -1) {
              onDotHover(index);
            }
          }
        }
        for(i = 0; i < prevHovered.length; i++){
          if(hovered.indexOf(prevHovered[i]) === -1){
            mouseOut(prevHovered[i]);
          }
        }
        prevHovered = hovered.slice(0);
      }

      TweenMax.ticker.addEventListener("tick", render, TweenMax.ticker, false, 1);

      window.addEventListener("mousemove", onMouseMove);

      window.addEventListener("resize", function(){
        console.log('works')
        resizeTm = clearTimeout(resizeTm);
        // resizeTm = setTimeout(onResize, 200);
        winWidth = window.innerWidth;


      });
    })
  }
}());
