$( function() {

    var wind = $(window);

    wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 200,
        mobile: false,
        live: false
    });
    wow.init();


    // floating cursor move 
    const floatCursorContainers = document.querySelectorAll('.float-cursor-container');
    floatCursorContainers.forEach(container => {
        const floatCursor = container.querySelector('.float-cursor');
        let mouseX = 0, mouseY = 0;
        let isMoving = false;

        // When mouse enters the container
        container.addEventListener('mouseenter', () => {
            floatCursor.style.opacity = '1';
            floatCursor.style.transform = 'scale(1)';
        });

        // When mouse moves within the container
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            mouseX = e.clientX - rect.left - 75;
            mouseY = e.clientY - rect.top - 75;
            isMoving = true;
        });

        // Update cursor position using requestAnimationFrame for smoother performance
        function updateCursor() {
            if (isMoving) {
                floatCursor.style.left = `${mouseX}px`;
                floatCursor.style.top = `${mouseY}px`;
                isMoving = false;
            }
            requestAnimationFrame(updateCursor);
        }

        updateCursor();  // Start the update loop

        // When mouse leaves the container
        container.addEventListener('mouseleave', () => {
            floatCursor.style.opacity = '0';
            floatCursor.style.transform = 'scale(0)';
        });
    });

    

    // img height same width 
    var imgWidth = $(".img-h-w").width();
    $(".img-h-w").each(function() {
        $(this).css("height", imgWidth);
    });


    // ---------- background change -----------
    var pageSection = $(".bg-img");
    pageSection.each(function (indx) {

        if ($(this).attr("data-background")) {
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });

    // split text 
    const splits = document.querySelectorAll('.split-txt');
    splits.forEach(div => {
        const text = div.textContent;
        div.innerHTML = '';
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.textContent = text[i];
            div.appendChild(span);
        }
    });

    // ---------- to top -----------

    wind.on("scroll", function() {

        var bodyScroll = wind.scrollTop(),
            toTop = $("#to_top")

        if (bodyScroll > 700) {

            toTop.addClass("show");

        } else {

            toTop.removeClass("show");
        }
    });

    $('#to_top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 0);
        return false;
    });

    // -------- counter --------
    $('.counter').countUp({
        delay: 10,
        time: 2000
    });
    
    
    // -------- cls --------
    $(".cls").on("click", function(){
        $(this).parent().fadeOut();
    })

    // ------------ working in desktop -----------
    if ($(window).width() > 991) {
            $('.parallaxie').parallaxie({
        });
    }

    // ---------- tooltip -----------
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
    })
        
});

// -------- parralax img mouse move -------
$(function () {
    
    var b = document.getElementsByTagName("body")[0];  

    b.addEventListener("mousemove", function(event) {
    parallaxed(event);

    });

    function parallaxed(e) {
        var amountMovedX = (e.clientX * -0.3 / 8);
        var amountMovedY = (e.clientY * -0.3 / 8);
        var x = document.getElementsByClassName("parallaxed");
        var i;
        for (i = 0; i < x.length; i++) {
            x[i].style.transform='translate(' + amountMovedX + 'px,' + amountMovedY + 'px)'
        }
    }
});



// ------------ Preloader -----------
$( function() {
    const svg = document.getElementById("svg");
    const tl = gsap.timeline();
    const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
    const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

    tl.to(".loader-wrap-heading .load-text , .loader-wrap-heading .cont", {
        delay: 1.5,
        y: -100,
        opacity: 0,
    });
    tl.to(svg, {
        duration: 0.5,
        attr: { d: curve },
        ease: "power2.easeIn",
    }).to(svg, {
        duration: 0.5,
        attr: { d: flat },
        ease: "power2.easeOut",
    });
    tl.to(".loader-wrap", {
        y: -1500,
    });
    tl.to(".loader-wrap", {
        zIndex: -1,
        display: "none",
    });
    tl.from(
        "header",
        {
            y: 200,
        },
        "-=1.5"
    );
    tl.from(
        "header .container",
        {
            y: 40,
            opacity: 0,
            delay: 0.3,
        },
        "-=1.5"
    );
});


$(window).on("load", function () {

    // ------------ Preloader -----------
    // var body = $('body');
    // body.addClass('loaded');
    // setTimeout(function () {
    //     body.removeClass('loaded');
    // }, 1500);

});


  // ------------ mousecursor scripts -----------
  $( function() {
        function mousecursor() {
            if ($("body")) {
                const e = document.querySelector(".cursor-inner"),
                    t = document.querySelector(".cursor-outer");
                let n, i = 0,
                    o = !1;
                window.onmousemove = function (s) {
                    o || (t.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)"), e.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)", n = s.clientY, i = s.clientX
                },
                $("body").on("mouseenter", "a, .cursor-pointer", function () {
                    e.classList.add("cursor-hover"), t.classList.add("cursor-hover")
                })
                , $("body").on("mouseleave", "a, .cursor-pointer", function () {
                    e.classList.remove("cursor-hover"), t.classList.remove("cursor-hover")
                }),

                    // $("body").on("mouseenter", ".swiper-wrapper.curs-scroll", function () {
                    //     e.classList.add("cursor-scroll"), t.classList.add("cursor-scroll")
                    // }), $("body").on("mouseleave", ".swiper-wrapper.curs-scroll", function () {
                    //     $(this).is("a") && $(this).closest(".cursor-pointer").length || (e.classList.remove("cursor-scroll"), t.classList.remove("cursor-scroll"))
                    // }),

                    e.style.visibility = "visible", t.style.visibility = "visible"
            }
        };

        $(function () {
            mousecursor();
        });

    });



// ------------ gsap scripts -----------
$(function () {
    if (window.innerWidth > 991) {
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

        const smoother = ScrollSmoother.create({
            content: "#scrollsmoother-container",
            smooth: 1.5,
            normalizeScroll: true,
            ignoreMobileResize: true,
            effects: true,
        });

        let headings = gsap.utils.toArray(".js-title").reverse();
        headings.forEach((heading, i) => {
            let headingIndex = i + 1;
            let mySplitText = new SplitText(heading, { type: "chars" });
            let chars = mySplitText.chars;

            chars.forEach((char, i) => {
                smoother.effects(char, { lag: (i + headingIndex) * 0.1, speed: 1 });
            });
        });

        let splitTextLines = gsap.utils.toArray(".js-splittext-lines");
        splitTextLines.forEach(splitTextLine => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: splitTextLine,
                    start: 'top 90%',
                    end: 'bottom 60%',
                    scrub: false,
                    markers: false,
                    toggleActions: 'play none none none'
                }
            });

            const itemSplitted = new SplitText(splitTextLine, { type: "lines" });
            gsap.set(splitTextLine, { perspective: 400 });
            itemSplitted.split({ type: "lines" });
            tl.from(itemSplitted.lines, {
                duration: 1,
                delay: 0.5,
                opacity: 0,
                rotationX: -50,
                force3D: false,
                transformOrigin: "top center -50",
                stagger: 0.1
            });
        });
    }
});




// -------- side menu scripts --------
$(function () {

    // Create variables to store the animations
    let menuToggleTimeline, mainLinkTimeline, menuInfoTimeline, scrollSmootherTimeline, whiteLine, socialLinks;

    // When the menu toggle button is clicked
    $(".menu-toggle-btn").on("click", function () {
        menuToggleTimeline = gsap.to(".ui-sidemenu-st1", {
            opacity: 1,
            visibility: "visible",
            duration: 0.5,
            translateY: 0,
            delay: 0.3,
            // ease: "back.out",
            // zIndex: 999,
        });
        mainLinkTimeline = gsap.to(".main-link", {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            translateX: 0,
            delay: 0.5,
            stagger: {
                amount: 0.5,
                from: "start"
            }
        });
        menuInfoTimeline = gsap.to(".menu-info", {
            opacity: 1,
            scale: 1,
            visibility: "visible",
            duration: 0.5,
            delay: 1.5,
            ease: "power2.out"
        });
        // scrollSmootherTimeline = gsap.to("#scrollsmoother-container", {
        //     opacity: 0.1,
        //     scale: 0.97,
        //     visibility: "visible",
        //     duration: 1,
        //     delay: 0,
        //     ease: "power2.out"
        // });
        whiteLine = gsap.to(".ui-sidemenu-st1 .white-line", {
            translateY: 0,
            delay: 1,
            ease: "power2.out"
        });
        socialLinks = gsap.to(".social-links a", {
            x: 0,
            y: 0,
            opacity: 1,
            translateX: 0,
            delay: 0.7,
            stagger: {
                amount: 0.8,
                from: "start"
            }
        });
    });

    // When the close button is clicked
    $(".clss").on("click", function () {
        if (menuToggleTimeline) menuToggleTimeline.reverse().delay(1.2);
        if (mainLinkTimeline) mainLinkTimeline.reverse();
        if (menuInfoTimeline) menuInfoTimeline.reverse();
        if (scrollSmootherTimeline) scrollSmootherTimeline.reverse().delay(1.1);
        if (whiteLine) whiteLine.reverse().delay(1);
        if (socialLinks) socialLinks.reverse().delay(0.2);
    });


    // ----------- text animation color -----------
    const spans = gsap.utils.toArray(".split-txt span");
    spans.forEach((span, i) => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".split-txt",
                start: "top 200%",
                // end: "bottom 50%",
                scrub: true,
            }
        });
        tl.to(span, {
            color: "#fff",
            filter: "drop-shadow(0px 0px 10px rgba(255, 255, 255, 1))",
            duration: 1,
            delay: i * 0.8,
        })
        .to(span, {
            color: "transparent",
            filter: "drop-shadow(0px 0px 30px rgba(255, 255, 255, 0))",
            duration: 1,
        });
    });


});
  

