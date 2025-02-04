

// ------------ swiper sliders -----------
$(document).ready(function () {
  // about marq slider
  var swiper = new Swiper(".ui-about-st1 .marq-slider", {
    slidesPerView: "auto",
    spaceBetween: 50,
    centeredSlides: true,
    pagination: false,
    navigation: false,
    mousewheel: false,
    keyboard: true,
    speed: 30000,
    allowTouchMove: false,
    autoplay: {
      delay: 1,
    },
    loop: true,
  });

  // testimonials slider
  var galleryThumbs = new Swiper(".ui-testimonials-st1 .gallery-thumbs", {
    spaceBetween: 10,
    slidesPerView: 4,
    loop: false,
    freeMode: true,
    loopedSlides: 5,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    speed: 1500,
    direction: "vertical",
    slidesPerView: 3,
    // centeredSlides: true,
    autoplay: {
      delay: 2000,
    },
    breakpoints: {
        0: {
            slidesPerView: 3,
            direction: "horizontal",
        },
        480: {
            slidesPerView: 3,
            direction: "horizontal",
        },
        787: {
            slidesPerView: 3,
            direction: "horizontal",
        },
        991: {
            slidesPerView: 3,
            direction: "vertical",
        },
        1200: {
            slidesPerView: 3,
            direction: "vertical",
        }
    }
  });


  var galleryTop = new Swiper(".ui-testimonials-st1 .testimonials-slider", {
    spaceBetween: 30,
    loop: false,
    loopedSlides: 5,
    navigation: {
      nextEl: ".ui-testimonials-st1 .swiper-button-next",
      prevEl: ".ui-testimonials-st1 .swiper-button-prev",
    },
    thumbs: {
      swiper: galleryThumbs,
    },
    speed: 1500,
    autoplay: {
      delay: 2000,
    },
  });

  // testimonials slider
  var galleryThumbs1 = new Swiper(".ui-experience-st2 .years-slider", {
    spaceBetween: 10,
    slidesPerView: 5,
    loop: false,
    freeMode: true,
    loopedSlides: 5,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    speed: 1500,
    direction: "vertical",
    // centeredSlides: true,
    autoplay: {
      delay: 2000,
    },
  });
  var galleryTop = new Swiper(".ui-experience-st2 .exp-slider", {
    spaceBetween: 30,
    loop: false,
    loopedSlides: 5,
    navigation: false,
    thumbs: {
      swiper: galleryThumbs1,
    },
    speed: 1500,
    autoplay: {
      delay: 2000,
    },
  });

  // about marq slider
  var swiper = new Swiper(".ui-portfolio-st4 .marq-slider", {
    slidesPerView: "auto",
    spaceBetween: 15,
    centeredSlides: true,
    pagination: false,
    navigation: false,
    mousewheel: false,
    keyboard: true,
    speed: 20000,
    allowTouchMove: false,
    autoplay: {
      delay: 1,
    },
    loop: true,
  });
});

// ------------ gsap scripts -----------
$(function () {
  gsap.utils
    .toArray(".ui-portfolio-st1 .portfolio-slider .item")
    .forEach((item) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top bottom",
          end: "bottom+=150% center",
          scrub: true,
        },
      });

      tl.from(item, {
        translateY: "0",
        rotateX: "-50deg",
        scale: 0.9,
        // ease: "power1.inOut"
        ease: "linear",
      })
      .to(item, {
        translateY: "0",
        rotateX: "50deg",
        scale: 0.9,
        // ease: "power1.inOut"
        ease: "linear",
      });
    });
});

// ------- canvas
const imgSize = [1250, 833];

const vertex = `
                    attribute vec2 uv;
                    attribute vec2 position;
                    varying vec2 vUv;
                    void main() {
                            vUv = uv;
                            gl_Position = vec4(position, 0, 1);
                    }
            `;
const fragment = `
                    precision highp float;
                    precision highp int;
                    uniform sampler2D tWater;
                    uniform sampler2D tFlow;
                    uniform float uTime;
                    varying vec2 vUv;
                    uniform vec4 res;

                    void main() {

                            // R and G values are velocity in the x and y direction
                            // B value is the velocity length
                            vec3 flow = texture2D(tFlow, vUv).rgb;

                            vec2 uv = .5 * gl_FragCoord.xy / res.xy ;
                            vec2 myUV = (uv - vec2(0.5))*res.zw + vec2(0.5);
                            myUV -= flow.xy * (0.15 * 0.7);

                            vec3 tex = texture2D(tWater, myUV).rgb;

                            gl_FragColor = vec4(tex.r, tex.g, tex.b, 1.0);
                    }
            `;
{
  const renderer = new ogl.Renderer({ dpr: 2 });
  const gl = renderer.gl;
  if (document.body.classList.contains("canvas-body")) {
    document.body.appendChild(gl.canvas);
  }

  // Variable inputs to control flowmap
  let aspect = 1;
  const mouse = new ogl.Vec2(-1);
  const velocity = new ogl.Vec2();
  function resize() {
    let a1, a2;
    var imageAspect = imgSize[1] / imgSize[0];
    if (window.innerHeight / window.innerWidth < imageAspect) {
      a1 = 1;
      a2 = window.innerHeight / window.innerWidth / imageAspect;
    } else {
      a1 = (window.innerWidth / window.innerHeight) * imageAspect;
      a2 = 1;
    }
    mesh.program.uniforms.res.value = new ogl.Vec4(
      window.innerWidth,
      window.innerHeight,
      a1,
      a2
    );

    renderer.setSize(window.innerWidth, window.innerHeight);
    aspect = window.innerWidth / window.innerHeight;
  }
  const flowmap = new ogl.Flowmap(gl);
  // Triangle that includes -1 to 1 range for 'position', and 0 to 1 range for 'uv'.
  const geometry = new ogl.Geometry(gl, {
    position: {
      size: 2,
      data: new Float32Array([-1, -1, 3, -1, -1, 3]),
    },
    uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
  });
  const texture = new ogl.Texture(gl, {
    minFilter: gl.LINEAR,
    magFilter: gl.LINEAR,
  });
  const img = new Image();
  img.onload = () => (texture.image = img);
  img.crossOrigin = "Anonymous";
  img.src = "assets/img/body-shap.png";
  // img.src = "assets/img/body-shap3.jpg";

  let a1, a2;
  var imageAspect = imgSize[1] / imgSize[0];
  if (window.innerHeight / window.innerWidth < imageAspect) {
    a1 = 1;
    a2 = window.innerHeight / window.innerWidth / imageAspect;
  } else {
    a1 = (window.innerWidth / window.innerHeight) * imageAspect;
    a2 = 1;
  }

  const program = new ogl.Program(gl, {
    vertex,
    fragment,
    uniforms: {
      uTime: { value: 0 },
      tWater: { value: texture },
      res: {
        value: new ogl.Vec4(window.innerWidth, window.innerHeight, a1, a2),
      },
      img: { value: new ogl.Vec2(imgSize[0], imgSize[1]) },
      // Note that the uniform is applied without using an object and value property
      // This is because the class alternates this texture between two render targets
      // and updates the value property after each render.
      tFlow: flowmap.uniform,
    },
  });
  const mesh = new ogl.Mesh(gl, { geometry, program });

  window.addEventListener("resize", resize, false);
  resize();

  // Create handlers to get mouse position and velocity
  const isTouchCapable = "ontouchstart" in window;
  if (isTouchCapable) {
    window.addEventListener("touchstart", updateMouse, false);
    window.addEventListener("touchmove", updateMouse, { passive: false });
  } else {
    window.addEventListener("mousemove", updateMouse, false);
  }
  let lastTime;
  const lastMouse = new ogl.Vec2();
  function updateMouse(e) {
    e.preventDefault();
    if (e.changedTouches && e.changedTouches.length) {
      e.x = e.changedTouches[0].pageX;
      e.y = e.changedTouches[0].pageY;
    }
    if (e.x === undefined) {
      e.x = e.pageX;
      e.y = e.pageY;
    }
    // Get mouse value in 0 to 1 range, with y flipped
    mouse.set(e.x / gl.renderer.width, 1.0 - e.y / gl.renderer.height);
    // Calculate velocity
    if (!lastTime) {
      // First frame
      lastTime = performance.now();
      lastMouse.set(e.x, e.y);
    }

    const deltaX = e.x - lastMouse.x;
    const deltaY = e.y - lastMouse.y;

    lastMouse.set(e.x, e.y);

    let time = performance.now();

    // Avoid dividing by 0
    let delta = Math.max(10.4, time - lastTime);
    lastTime = time;
    velocity.x = deltaX / delta;
    velocity.y = deltaY / delta;
    // Flag update to prevent hanging velocity values when not moving
    velocity.needsUpdate = true;
  }
  requestAnimationFrame(update);
  function update(t) {
    requestAnimationFrame(update);
    // Reset velocity when mouse not moving
    if (!velocity.needsUpdate) {
      mouse.set(-1);
      velocity.set(0);
    }
    velocity.needsUpdate = false;
    // Update flowmap inputs
    flowmap.aspect = aspect;
    flowmap.mouse.copy(mouse);
    // Ease velocity input, slower when fading out
    flowmap.velocity.lerp(velocity, velocity.len ? 0.15 : 0.1);
    flowmap.update();
    program.uniforms.uTime.value = t * 0.01;
    renderer.render({ scene: mesh });
  }
}

