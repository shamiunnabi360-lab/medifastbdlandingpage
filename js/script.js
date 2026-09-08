/* ============================================================
   MediFastBD Landing Page Scripts
   ============================================================ */

/* ---------- CONFIGURATION ---------- */
const CONFIG = {
    webAppUrl: "WEB_APP_URL",
    androidUrl: "assets/downloads/medifastbd.apk",
    windowsUrl: "WINDOWS_DOWNLOAD_URL",
    githubUrl: "GITHUB_REPOSITORY_URL",
    demoVideoUrl: "assets/videos/medifastbd-demo.mp4",
    posterUrl: "assets/downloads/MediFastBD-Project-Poster.pdf"
};

/* ---------- SCROLL PROGRESS BAR ---------- */
(function () {
    var bar = document.createElement("div");
    bar.className = "scroll-progress";
    bar.setAttribute("aria-hidden", "true");
    document.body.prepend(bar);

    function update() {
        var scrollTop = window.scrollY;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = progress + "%";
    }

    window.addEventListener("scroll", update, { passive: true });
    update();
})();

/* ---------- NAVIGATION ---------- */
(function () {
    var navbar = document.getElementById("navbar");
    var navToggle = document.getElementById("navToggle");
    var navLinks = document.getElementById("navLinks");
    var navLinkItems = document.querySelectorAll(".navbar__link");

    function handleScroll() {
        if (window.scrollY > 10) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    navToggle.addEventListener("click", function () {
        var isOpen = navLinks.classList.toggle("open");
        navToggle.classList.toggle("active");
        navToggle.setAttribute("aria-expanded", isOpen);
    });

    navLinkItems.forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("open");
            navToggle.classList.remove("active");
            navToggle.setAttribute("aria-expanded", "false");
        });
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && navLinks.classList.contains("open")) {
            navLinks.classList.remove("open");
            navToggle.classList.remove("active");
            navToggle.setAttribute("aria-expanded", "false");
            navToggle.focus();
        }
    });
})();

/* ---------- SCROLL ANIMATIONS ---------- */
(function () {
    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
        document.querySelectorAll(".fade-in, .fade-in-left, .fade-in-right, .scale-in").forEach(function (el) {
            el.classList.add("visible");
        });
        return;
    }

    var observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );

    document.querySelectorAll(".fade-in, .fade-in-left, .fade-in-right, .scale-in").forEach(function (el) {
        observer.observe(el);
    });
})();

/* ---------- STAGGERED CARD ANIMATIONS ---------- */
(function () {
    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    var gridObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var cards = entry.target.children;
                    for (var i = 0; i < cards.length; i++) {
                        (function (card, index) {
                            setTimeout(function () {
                                card.classList.add("visible");
                            }, index * 100);
                        })(cards[i], i);
                    }
                    gridObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    document.querySelectorAll(".problem__grid, .management__grid, .cross-platform__grid, .for-customers__grid, .about__tech-grid").forEach(function (grid) {
        var children = grid.children;
        for (var i = 0; i < children.length; i++) {
            children[i].classList.add("fade-in");
        }
        gridObserver.observe(grid);
    });
})();

/* ---------- ACTIVE NAV LINK ---------- */
(function () {
    var sections = document.querySelectorAll("section[id]");
    var navLinkItems = document.querySelectorAll(".navbar__link");

    function highlightNav() {
        var scrollY = window.scrollY + 100;

        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute("id");

            if (scrollY >= top && scrollY < top + height) {
                navLinkItems.forEach(function (link) {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === "#" + id) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", highlightNav, { passive: true });
})();

/* ---------- CONFIG LINKS ---------- */
(function () {
    var configMap = {
        webAppUrl: CONFIG.webAppUrl,
        androidUrl: CONFIG.androidUrl,
        windowsUrl: CONFIG.windowsUrl,
        githubUrl: CONFIG.githubUrl,
        demoVideoUrl: CONFIG.demoVideoUrl,
        posterUrl: CONFIG.posterUrl
    };

    document.querySelectorAll("[data-config]").forEach(function (el) {
        var key = el.getAttribute("data-config");
        var val = configMap[key];
        if (val && val !== key.toUpperCase()) {
            if (el.tagName === "SOURCE") {
                el.setAttribute("src", val);
            } else {
                el.setAttribute("href", val);
            }
        } else if (el.tagName !== "SOURCE") {
            el.setAttribute("aria-disabled", "true");
            el.classList.add("btn--disabled");
            el.setAttribute("tabindex", "-1");
            el.addEventListener("click", function (e) { e.preventDefault(); });
        }
    });

    var githubLink = document.querySelector('a[href="https://github.com"]');
    if (githubLink && CONFIG.githubUrl && CONFIG.githubUrl !== "GITHUB_REPOSITORY_URL") {
        githubLink.setAttribute("href", CONFIG.githubUrl);
    } else if (githubLink) {
        githubLink.setAttribute("aria-disabled", "true");
        githubLink.setAttribute("tabindex", "-1");
        githubLink.addEventListener("click", function (e) { e.preventDefault(); });
    }
})();

/* ---------- PARTICLES ---------- */
(function () {
    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    var canvas = document.createElement("canvas");
    canvas.id = "particles";
    canvas.setAttribute("aria-hidden", "true");
    document.body.prepend(canvas);

    var ctx = canvas.getContext("2d");
    var particles = [];
    var particleCount = 40;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    function Particle() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.15 + 0.03;
    }

    Particle.prototype.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    };

    Particle.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(13, 159, 79, " + this.opacity + ")";
        ctx.fill();
    };

    for (var i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function connectParticles() {
        for (var a = 0; a < particles.length; a++) {
            for (var b = a + 1; b < particles.length; b++) {
                var dx = particles[a].x - particles[b].x;
                var dy = particles[a].y - particles[b].y;
                var dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = "rgba(13, 159, 79, " + (0.03 * (1 - dist / 150)) + ")";
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }

        connectParticles();
        requestAnimationFrame(animate);
    }

    animate();
})();

/* ---------- TILT EFFECT ON CARDS ---------- */
(function () {
    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;
    if (window.innerWidth < 768) return;

    var cards = document.querySelectorAll(".problem__card, .management__card, .cross-platform__card, .for-customers__card");

    cards.forEach(function (card) {
        card.addEventListener("mousemove", function (e) {
            var rect = card.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var centerX = rect.width / 2;
            var centerY = rect.height / 2;
            var rotateX = ((y - centerY) / centerY) * -4;
            var rotateY = ((x - centerX) / centerX) * 4;

            card.style.transform = "perspective(800px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) translateY(-4px)";
        });

        card.addEventListener("mouseleave", function () {
            card.style.transform = "perspective(800px) rotateX(0) rotateY(0) translateY(0)";
        });
    });
})();

/* ---------- SMOOTH SCROLL FOR NAV LINKS ---------- */
(function () {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener("click", function (e) {
            var targetId = this.getAttribute("href");
            if (targetId === "#") return;

            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                var offset = 80;
                var top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: top, behavior: "smooth" });
            }
        });
    });
})();

/* ---------- COUNTER ANIMATION ---------- */
(function () {
    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    var counterObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var el = entry.target;
                    var target = parseInt(el.getAttribute("data-count"), 10);
                    if (isNaN(target)) return;

                    var duration = 1500;
                    var start = 0;
                    var startTime = null;

                    function step(timestamp) {
                        if (!startTime) startTime = timestamp;
                        var progress = Math.min((timestamp - startTime) / duration, 1);
                        var eased = 1 - Math.pow(1 - progress, 3);
                        el.textContent = Math.floor(eased * target);
                        if (progress < 1) requestAnimationFrame(step);
                    }

                    requestAnimationFrame(step);
                    counterObserver.unobserve(el);
                }
            });
        },
        { threshold: 0.5 }
    );

    document.querySelectorAll("[data-count]").forEach(function (el) {
        counterObserver.observe(el);
    });
})();

/* ---------- TYPING EFFECT ---------- */
(function () {
    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    var heroTitle = document.querySelector(".hero__title");
    if (!heroTitle) return;

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                heroTitle.style.opacity = "1";
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(heroTitle);
})();

/* ---------- NAVBAR LINK HOVER UNDERLINE ---------- */
(function () {
    document.querySelectorAll(".navbar__link").forEach(function (link) {
        link.classList.add("animated-underline");
    });
})();

/* ---------- PHONE MOCKUP CARD ANIMATIONS ---------- */
(function () {
    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    var mockupCards = document.querySelectorAll(".mockup__card");

    function animateCards() {
        mockupCards.forEach(function (card, index) {
            card.style.opacity = "0";
            card.style.transform = "translateX(20px)";
            card.style.transition = "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)";

            setTimeout(function () {
                card.style.opacity = "1";
                card.style.transform = "translateX(0)";
            }, 800 + index * 200);
        });
    }

    var phoneObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                animateCards();
                phoneObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    var phone = document.querySelector(".hero__phone");
    if (phone) phoneObserver.observe(phone);
})();

/* ---------- SCROLL-BASED PARALLAX FOR HERO ---------- */
(function () {
    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    var heroVisual = document.querySelector(".hero__visual");

    window.addEventListener("scroll", function () {
        var scrollY = window.scrollY;
        if (scrollY < 800 && heroVisual) {
            heroVisual.style.transform = "translateY(" + (scrollY * 0.08) + "px)";
        }
    }, { passive: true });
})();

/* ============================================================
   DARK / LIGHT MODE
   ============================================================ */
(function () {
    var themeToggle = document.getElementById("themeToggle");
    var themeIcon = document.getElementById("themeIcon");
    var html = document.documentElement;

    var saved = localStorage.getItem("theme");
    if (saved) {
        html.setAttribute("data-theme", saved);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        html.setAttribute("data-theme", "dark");
    }

    function updateIcon() {
        if (!themeIcon) return;
        themeIcon.textContent = html.getAttribute("data-theme") === "dark" ? "\u2600" : "\u263D";
    }
    updateIcon();

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            var current = html.getAttribute("data-theme");
            var next = current === "dark" ? "light" : "dark";
            html.setAttribute("data-theme", next);
            localStorage.setItem("theme", next);
            updateIcon();
        });
    }

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
        if (!localStorage.getItem("theme")) {
            html.setAttribute("data-theme", e.matches ? "dark" : "light");
            updateIcon();
        }
    });
})();

/* ============================================================
   i18n TRANSLATION SYSTEM
   ============================================================ */
(function () {
    var translations = {
        en: {
            nav_home: "Home",
            nav_features: "Features",
            nav_how_it_works: "How It Works",
            nav_for_pharmacies: "For Pharmacies",
            nav_about: "About",
            nav_try_web: "Try Web App",
            nav_download: "Download App",

            hero_badge: "MediFastBD \u2022 by Nexora Labs",
            hero_title_1: "Finding Medicine",
            hero_title_2: "Faster, Cheaper & Closer.",
            hero_text: "Search medicines, discover affordable options, connect with nearby pharmacies and access intelligent healthcare support \u2014 all in one connected platform.",
            hero_cta_web: "Try Web App",
            hero_cta_android: "Download App",
            hero_windows: "Windows Version",
            hero_chip1: "Affordable options",
            hero_chip2: "5 KM emergency alerts",
            hero_chip3: "Nearby hospitals",
            hero_chip4: "MediFast AI",

            trust_affordable: "Affordable Options",
            trust_smart_search: "Medicine Search",
            trust_nearby: "Nearby Pharmacies",
            trust_cost: "Cost Comparison",
            trust_emergency: "Emergency 5 KM Mode",
            trust_hospitals: "Nearby Hospitals",
            trust_ai: "MediFast AI",

            problem_label: "The Problem",
            problem_title: "Finding medicine shouldn\u2019t be this difficult.",
            problem_card1_title: "Uncertain Availability",
            problem_card1_text: "Medicine availability is uncertain \u2014 you may travel to a pharmacy only to find the medicine out of stock.",
            problem_card2_title: "Varying Prices",
            problem_card2_text: "Prices can vary significantly between pharmacies for the same medicine, making it hard to find the best deal.",
            problem_card3_title: "Unnecessary Travel",
            problem_card3_text: "Customers may travel long distances to find medicines that are actually available closer to home.",
            problem_card4_title: "Emergency Access",
            problem_card4_text: "Finding an open pharmacy during emergencies, especially late at night, can be extremely difficult.",
            problem_card5_title: "Forgotten Doses",
            problem_card5_text: "Forgetting scheduled medicines is common \u2014 and family members far away often have no way to know.",
            problem_card6_title: "Hospital Discovery",
            problem_card6_text: "Finding a nearby hospital with directions and a call option during an urgent situation is harder than it should be.",
            problem_card7_title: "No Quick Guidance",
            problem_card7_text: "There is rarely a quick, easy-to-understand source for general medicine information and platform help.",

            solution_label: "The Solution",
            solution_title: "One platform for the complete medicine journey.",
            solution_step1: "Search",
            solution_step2: "Compare",
            solution_step3: "Choose",
            solution_step4: "Order",
            solution_step5: "Manage",
            solution_text: "MediFastBD brings medicine discovery, pharmacy comparison, ordering and medicine management into one unified platform.",

            acquisition_label: "Find Affordable Medicine Options",
            acquisition_title: "Make a Smarter, More Affordable Choice",
            acquisition_subtitle: "Find affordable medicine options based on price, distance and travel cost.",
            chain_medicine: "Medicine",
            chain_pharmacy: "Pharmacy options",
            chain_price: "Price",
            chain_distance: "Distance",
            chain_travel: "Travel cost",
            chain_decision: "Better decision",
            acquisition_demo_note: "Illustrative example figures \u2014 not real market prices.",
            acquisition_medicine_price: "Medicine Price",
            acquisition_travel_cost: "Estimated Travel Cost",
            acquisition_total: "Total Acquisition Cost",
            acquisition_text: "MediFastBD helps users evaluate medicine options using available price, pharmacy distance, travel time and estimated travel cost \u2014 so the decision is about the full journey, not price alone.",

            search_label: "Medicine Search",
            search_title: "Find the Medicine You Need",
            search_subtitle: "Search for medicines and discover available pharmacies and relevant medicine information from one place.",
            search_cta: "Explore the Web App \u2192",

            emergency_badge: "Emergency Medicine Mode",
            emergency_title: "When You Can\u2019t Find the Medicine Nearby",
            emergency_text: "Can\u2019t find a required medicine nearby? Set the medicine and required time, and MediFastBD can alert connected pharmacies within a 5 KM radius so they can contact the customer.",
            emergency_step1: "Enter medicine",
            emergency_step2: "Set required time",
            emergency_step3: "5 KM pharmacy alert",
            emergency_step4: "Pharmacy contacts you",
            emergency_note: "Not an ambulance or emergency medical response service. For medical emergencies, contact local emergency services.",
            emergency_feature1: "5 KM Radius Alert",
            emergency_feature2: "Required Time",
            emergency_feature3: "Connected Pharmacies",
            emergency_feature4: "Pharmacy Contact",
            hospitals_label: "New \u2022 Nearby Hospitals",
            hospitals_title: "Help Is Closer When You Need It",
            hospitals_subtitle: "Using your location, MediFastBD helps find nearby hospitals and provides useful actions such as directions and calling.",
            hospitals_map_label: "Illustrative map \u2022 real list loads in the app",
            hospitals_ss_caption: "Nearby Hospitals \u2014 real app screen",
            hospital_card1_name: "Nearby hospital",
            hospital_card1_dist: "Distance shown in app",
            hospital_card2_name: "Nearby hospital",
            hospital_card2_dist: "Distance shown in app",
            hospital_directions: "Get Directions",
            hospital_call: "Call",
            hospital_directions2: "Get Directions",
            hospital_call2: "Call",
            hospitals_demo_note: "Illustrative layout \u2014 hospital names, distances and ratings appear from real data in the app.",
            ai_label: "Meet MediFast AI \u2022 Core Feature",
            ai_title: "Your Intelligent Healthcare Companion",
            ai_text: "MediFast AI helps users get quick, easy-to-understand information about medicines and general health-related questions, while also helping users navigate and use the MediFastBD platform.",
            ai_point1: "\uD83D\uDC8A Ask about medicines & usage information",
            ai_point2: "\uD83E\uDE7A Get general health information",
            ai_point3: "\uD83E\uDDED Get help using MediFastBD",
            ai_disclaimer: "MediFast AI provides informational assistance and does not replace professional medical advice. AI-generated information should be verified with qualified healthcare professionals when appropriate.",
            ai_online: "Online",
            ai_ex_user: "What is Napa used for?",
            ai_ex_ai: "Napa (Paracetamol) is commonly used for fever and mild-to-moderate pain. Dosage depends on age and health conditions \u2014 check the pack or ask a pharmacist.",
            ai_chip1: "Medicine question",
            ai_chip2: "Usage info",
            ai_chip3: "Platform help",
            ai_placeholder: "Ask about medicines\u2026",
            ai_demo_note: "Illustrative conversation preview.",
            carelink_label: "CareLink",
            carelink_title: "CareLink Keeps Families Connected",
            carelink_subtitle: "Even when family members are far away, CareLink helps selected caregivers stay informed when configured medicine reminders are repeatedly missed.",
            carelink_step1: "Medicine reminder",
            carelink_step2: "Taken \u2192 Normal",
            carelink_step3: "Skipped \u2192 Missed",
            carelink_step4: "Repeated misses \u2192 Caregiver notified",
            carelink_note: "CareLink notifies selected caregivers when the configured missed-dose condition is reached. It is a family-connection feature, not an emergency medical alert.",

            management_label: "Reminders & Medicine Cabinet",
            management_title: "Manage Your Medicines Easily",
            management_subtitle: "Reminders, taking schedules, medicine stock, expiry tracking and notifications \u2014 plus CareLink caregiver notifications when doses are repeatedly missed.",
            management_card1_title: "Medicine Cabinet",
            management_card1_text: "Manage personal medicine stock. Keep track of what you have at home.",
            management_card2_title: "Expiry Tracking",
            management_card2_text: "Keep track of medicines approaching expiry. Never use expired medicine again.",
            management_card3_title: "Smart Reminders",
            management_card3_text: "Stay on schedule with medicine reminders. Never miss a dose.",

            ordering_label: "Orders, Payment & Direct Chat",
            ordering_title: "Connect Directly With Pharmacies",
            ordering_subtitle: "Customer \u2194 pharmacy chat, calls and directions \u2014 plus the order and payment flow supported in the app. (Separate from MediFast AI.)",
            ordering_step1: "Search medicine",
            ordering_step2: "Compare pharmacies",
            ordering_step3: "Add to cart",
            ordering_step4: "Place order",
            ordering_step5: "Track order",

            pharmacy_label: "For Pharmacies",
            pharmacy_title: "More Than a Customer App",
            pharmacy_text: "MediFastBD provides pharmacy owners with a comprehensive dashboard to manage their business efficiently.",
            pharmacy_feature1: "\u2713 Inventory Management",
            pharmacy_feature2: "\u2713 Order Management",
            pharmacy_feature3: "\u2713 Sales Tracking",
            pharmacy_feature4: "\u2713 Pharmacy Status",
            pharmacy_feature5: "\u2713 Business Insights",
            pharmacy_feature6: "\u2713 Medicine Stock",
            pharmacy_cta: "Join MediFastBD",

            admin_label: "Admin Control",
            admin_title: "Built With Centralized Control",
            admin_customers: "Total Customers",
            admin_pharmacies: "Total Pharmacies",
            admin_orders: "Total Orders",
            admin_sales: "Total Sales",
            admin_revenue: "Revenue",
            admin_commission: "Commission",
            admin_top_pharmacy: "Top Performing Pharmacy",
            admin_best_medicine: "Best-Selling Medicine",
            admin_verification: "Pharmacy Verification",
            admin_pending: "Pending",
            admin_management: "Customer Management",
            admin_active: "Active",

            business_label: "One Connected Ecosystem",
            business_title: "Customers, pharmacies and intelligent services \u2014 connected.",
            business_customer: "Customer",
            business_pharmacy: "Pharmacy",
            business_platform: "MediFastBD",
            business_purchase: "Medicine Purchase",
            business_commission: "Platform Commission",
            business_text: "MediFastBD can support a transparent per-medicine commission model, creating value for customers, pharmacies and the platform.",

            crossplatform_label: "Cross-Platform",
            crossplatform_title: "Use MediFastBD your way.",
            crossplatform_web_title: "Web",
            crossplatform_web_text: "Use MediFastBD directly from your browser.",
            crossplatform_web_cta: "Try Web Version",
            crossplatform_android_title: "Android",
            crossplatform_android_text: "Download the Android application.",
            crossplatform_android_cta: "Download Android",
            crossplatform_android_badge: "Popular",
            crossplatform_windows_title: "Windows",
            crossplatform_windows_text: "Use MediFastBD on Windows.",
            crossplatform_windows_cta: "Download Windows",

            howit_label: "How It Works",
            howit_title: "Get started in four simple steps.",
            howit_step1_title: "Search",
            howit_step1_text: "Search medicines, hospitals or ask MediFast AI.",
            howit_step2_title: "Compare & Discover",
            howit_step2_text: "Evaluate affordable options and nearby availability.",
            howit_step3_title: "Connect",
            howit_step3_text: "Chat, call or get directions to the pharmacy or hospital.",
            howit_step4_title: "Get Care",
            howit_step4_text: "Get your medicine and healthcare support, with reminders and CareLink.",

            customers_label: "Core Features",
            customers_title: "One connected healthcare ecosystem.",
            customers_subtitle: "Eleven integrated capabilities across customers, pharmacies, caregivers, AI and nearby healthcare services.",
            customers_card1_title: "Find Affordable Options",
            customers_card1_text: "Make more affordable decisions using available price, distance, travel time and estimated travel cost.",
            customers_card2_title: "Medicine Search",
            customers_card2_text: "Search medicines and discover available pharmacies and relevant medicine information from one place.",
            customers_card3_title: "Emergency Medicine Mode",
            customers_card3_text: "Set medicine + required time to alert connected pharmacies within 5 KM so they can contact you.",
            customers_card4_title: "Nearby Hospitals",
            customers_card4_text: "Discover nearby hospitals using your location, with directions and call actions.",
            customers_card5_title: "MediFast AI",
            customers_card5_text: "Quick, easy-to-understand medicine and general health information plus platform help. Informational only.",
            customers_card6_title: "CareLink",
            customers_card6_text: "Selected caregivers stay informed when configured medicine reminders are repeatedly missed.",
            customers_card7_title: "Reminders & Cabinet",
            customers_card7_text: "Schedules, personal stock, expiry tracking and notifications.",
            customers_card8_title: "Pharmacy Chat",
            customers_card8_text: "Customer \u2194 pharmacy chat, calls and directions. Separate from MediFast AI.",
            customers_card9_title: "Pharmacy Management",
            customers_card9_text: "Inventory, catalog, orders, availability, customer communication and business tools.",
            customers_card10_title: "Admin Control",
            customers_card10_text: "Verification, user and order monitoring, analytics and revenue insight.",
            customers_card11_title: "Payment & Orders",
            customers_card11_text: "The order and payment flow supported in the app \u2014 only implemented methods shown.",

            different_label: "Why MediFastBD",
            different_title: "What Makes MediFastBD Different?",
            different_subtitle: "More than a medicine-search app \u2014 a connected healthcare platform.",
            different_card1_title: "Affordable Decisions",
            different_card1_text: "Compare price, distance, travel time and estimated travel cost \u2014 not just medicine price alone.",
            different_card2_title: "Emergency Medicine Mode",
            different_card2_text: "Alert connected pharmacies within 5 KM when a medicine is hard to find nearby.",
            different_card3_title: "CareLink",
            different_card3_text: "Selected caregivers stay informed when a patient repeatedly misses configured medicine reminders.",
            different_card4_title: "MediFast AI",
            different_card4_text: "Quick, easy-to-understand medicine information and platform guidance \u2014 informational assistance only.",
            different_card5_title: "Nearby Hospitals",
            different_card5_text: "Discover nearby hospitals using your location, with directions and calling actions.",

            about_label: "About MediFastBD \u2022 by Nexora Labs",
            about_title: "Technology designed around real healthcare needs.",
            about_text: "MediFastBD by Nexora Labs is a Bangladesh-focused digital healthcare platform connecting customers, pharmacy owners and administrators \u2014 making finding medicine more affordable, faster, closer and smarter.",
            preview_label: "App Preview",
            preview_title: "See MediFastBD in action.",
            preview_subtitle: "Real application screens where available. New screens (AI chat, CareLink) ship in the app \u2014 illustrative previews shown on this page.",
            preview_cap1: "Customer dashboard",
            preview_cap2: "Medicine search",
            preview_cap3: "Emergency Mode",
            preview_cap4: "Pharmacy dashboard",
            preview_cap5: "Nearby Hospitals",
            preview_cap6: "MediFast AI chat \u2014 in app",
            preview_cap7: "CareLink & reminders \u2014 in app",
            preview_cap8: "Alerts & expiry",

            demo_label: "Demo",
            demo_title: "See MediFastBD in Action",
            demo_subtitle: "Explore how MediFastBD connects medicine search, affordability, pharmacies, AI, emergency medicine discovery, nearby hospitals and caregiver support in one platform.",
            demo_text: "90-second project demonstration video",
            demo_hint: "The 90-second project demonstration video will be available here.",
            demo_fallback: "Demo video coming soon",
            demo_btn: "Watch 90-sec Demo",

            trustsec_label: "Trust & Security",
            trustsec_title: "Built on a secure foundation.",
            trustsec1_title: "Firebase Authentication",
            trustsec1_text: "Signed-in access with role-based permissions.",
            trustsec2_title: "Role-based access",
            trustsec2_text: "Separate customer, pharmacy and admin experiences.",
            trustsec3_title: "Secure backend",
            trustsec3_text: "Protected user data and secure notification handling.",
            trustsec4_title: "Honest AI",
            trustsec4_text: "MediFast AI is informational only \u2014 never a doctor replacement.",

            cta_title: "Finding Medicine Faster, Cheaper & Closer.",
            cta_text: "Connecting people, pharmacies and intelligent healthcare services in one platform.",
            cta_web: "Try Web Version \u2192",
            cta_android: "Download App",
            cta_features: "Explore Features",
            cta_windows: "Download Windows",

            footer_tagline: "Finding Medicine Faster, Cheaper & Closer \u2014 by Nexora Labs",
            footer_product: "Product",
            footer_web: "Web App",
            footer_android: "Android",
            footer_windows: "Windows",
            footer_platform: "Platform",
            footer_customers: "Customers",
            footer_owners: "Pharmacy Owners",
            footer_admin: "Administration",
            footer_resources: "Resources",
            footer_features: "Features",
            footer_howit: "How It Works",
            footer_trust: "Trust & Security",
            footer_about: "About",
            footer_developer: "Developer",
            footer_github: "GitHub",
            footer_copy: "\u00a9 2026 MediFastBD \u2022 by Nexora Labs. All rights reserved."
        },
        bn: {
            nav_home: "হোম",
            nav_features: "বৈশিষ্ট্য",
            nav_how_it_works: "কীভাবে কাজ করে",
            nav_for_pharmacies: "ফার্মেসির জন্য",
            nav_about: "আমাদের সম্পর্কে",
            nav_try_web: "ওয়েব ট্রাই করুন",
            nav_download: "অ্যাপ ডাউনলোড",

            hero_badge: "MediFastBD • Nexora Labs",
            hero_title_1: "ওষুধ খোঁজা এখন",
            hero_title_2: "দ্রুত, সাশ্রয়ী ও কাছেই।",
            hero_text: "ওষুধ খুঁজুন, সাশ্রয়ী অপশন আবিষ্কার করুন, কাছের ফার্মেসির সাথে সংযুক্ত হন এবং স্মার্ট স্বাস্থ্যসেবা সহায়তা পান \u2014 সব একটি সংযুক্ত প্ল্যাটফর্মে।",
            hero_cta_web: "ওয়েব অ্যাপ চেষ্টা করুন",
            hero_cta_android: "অ্যাপ ডাউনলোড",
            hero_windows: "উইন্ডোজ ভার্সন",
            hero_chip1: "সাশ্রয়ী অপশন",
            hero_chip2: "৫ কিমি জরুরি অ্যালার্ট",
            hero_chip3: "কাছের হাসপাতাল",
            hero_chip4: "MediFast AI",
            trust_affordable: "সাশ্রয়ী অপশন",
            trust_smart_search: "ওষুধ সার্চ",
            trust_nearby: "কাছের ফার্মেসি",
            trust_cost: "খরচ তুলনা",
            trust_emergency: "জরুরি ৫ কিমি মোড",
            trust_hospitals: "কাছের হাসপাতাল",
            trust_ai: "MediFast AI",

            problem_label: "সমস্যা",
            problem_title: "ওষুধ খোঁজা এত কঠিন হওয়া উচিত নয়।",
            problem_card1_title: "অনিশ্চিত প্রাপ্যতা",
            problem_card1_text: "ওষুধের প্রাপ্যতা অনিশ্চিত — ফার্মেসিতে গিয়ে দেখা যায় ওষুধ স্টকে নেই।",
            problem_card2_title: "দামের ভিন্নতা",
            problem_card2_text: "একই ওষুধের দাম ফার্মেসি ভেদে অনেক পার্থক্য হতে পারে, সেরা দাম খুঁজে পাওয়া কঠিন।",
            problem_card3_title: "অপ্রয়োজনীয় যাতায়াত",
            problem_card3_text: "কাছেই ওষুধ পাওয়া গেলেও গ্রাহকরা অনেক দূর পর্যন্ত খুঁজতে যান।",
            problem_card4_title: "জরুরি প্রাপ্যতা",
            problem_card4_text: "জরুরি মুহূর্তে, বিশেষ করে রাতে খোলা ফার্মেসি খুঁজে পাওয়া খুব কঠিন।",
            problem_card5_title: "ডোজ ভুলে যাওয়া",
            problem_card5_text: "নির্ধারিত ওষুধ খেতে ভুলে যাওয়া খুব স্বাভাবিক — আর দূরে থাকা পরিবারের সদস্যরা তা জানতেও পারেন না।",
            problem_card6_title: "হাসপাতাল খোঁজা",
            problem_card6_text: "জরুরি মুহূর্তে দিকনির্দেশনা ও কল অপশনসহ কাছের হাসপাতাল খুঁজে পাওয়া কঠিন।",
            problem_card7_title: "দ্রুত তথ্যের অভাব",
            problem_card7_text: "ওষুধ সম্পর্কে সহজ ভাষায় দ্রুত তথ্য ও প্ল্যাটফর্ম ব্যবহারে সাহায্যের উৎস খুব কম।",

            solution_label: "সমাধান",
            solution_title: "ওষুধের সম্পূর্ণ যাত্রার জন্য একটি প্ল্যাটফর্ম।",
            solution_step1: "খুঁজুন",
            solution_step2: "তুলনা করুন",
            solution_step3: "বেছে নিন",
            solution_step4: "অর্ডার করুন",
            solution_step5: "ম্যানেজ করুন",
            solution_text: "MediFastBD ওষুধ আবিষ্কার, ফার্মেসি তুলনা, অর্ডার এবং ওষুধ ব্যবস্থাপনাকে একটি প্ল্যাটফর্মে একত্রিত করেছে।",

            acquisition_label: "সাশ্রয়ী ওষুধের অপশন",
            acquisition_title: "আরও স্মার্ট, আরও সাশ্রয়ী সিদ্ধান্ত নিন",
            acquisition_subtitle: "দাম, দূরত্ব ও যাতায়াত খরচের ভিত্তিতে সাশ্রয়ী ওষুধের অপশন খুঁজুন।",
            chain_medicine: "ওষুধ",
            chain_pharmacy: "ফার্মেসি অপশন",
            chain_price: "দাম",
            chain_distance: "দূরত্ব",
            chain_travel: "যাতায়াত খরচ",
            chain_decision: "ভালো সিদ্ধান্ত",
            acquisition_demo_note: "উদাহরণস্বরূপ চিত্র — বাস্তব বাজারদর নয়।",
            acquisition_medicine_price: "ওষুধের দাম",
            acquisition_travel_cost: "আনুমানিক যাতায়াত খরচ",
            acquisition_total: "মোট সংগ্রহ খরচ",
            acquisition_text: "MediFastBD প্রাপ্য দাম, ফার্মেসির দূরত্ব, যাতায়াত সময় ও আনুমানিক যাতায়াত খরচ মিলিয়ে ওষুধের অপশন মূল্যায়নে সাহায্য করে — শুধু দামে নয়, পুরো যাত্রা বিবেচনায়।",

            search_label: "ওষুধ সার্চ",
            search_title: "প্রয়োজনীয় ওষুধ খুঁজুন",
            search_subtitle: "এক জায়গা থেকেই ওষুধ খুঁজুন, প্রাপ্য ফার্মেসি ও প্রাসঙ্গিক ওষুধ-তথ্য আবিষ্কার করুন।",
            search_cta: "ওয়েব অ্যাপ এক্সপ্লোর করুন →",

            emergency_badge: "জরুরি ওষুধ মোড",
            emergency_title: "কাছে ওষুধ না পেলে",
            emergency_text: "কাছে প্রয়োজনীয় ওষুধ না পেলে ওষুধের নাম ও প্রয়োজনীয় সময় দিন — MediFastBD ৫ কিমি ব্যাসার্ধের যুক্ত ফার্মেসিগুলোকে অ্যালার্ট পাঠাতে পারে, যাতে তারা গ্রাহকের সাথে যোগাযোগ করতে পারে।",
            emergency_step1: "ওষুধ লিখুন",
            emergency_step2: "প্রয়োজনীয় সময় দিন",
            emergency_step3: "৫ কিমি ফার্মেসি অ্যালার্ট",
            emergency_step4: "ফার্মেসি যোগাযোগ করবে",
            emergency_note: "এটি অ্যাম্বুলেন্স বা জরুরি চিকিৎসা সেবা নয়। চিকিৎসা জরুরি অবস্থায় স্থানীয় জরুরি সেবায় যোগাযোগ করুন।",
            emergency_feature1: "৫ কিমি ব্যাসার্ধে অ্যালার্ট",
            emergency_feature2: "প্রয়োজনীয় সময়",
            emergency_feature3: "যুক্ত ফার্মেসি",
            emergency_feature4: "ফার্মেসি যোগাযোগ",
            hospitals_label: "নতুন • কাছের হাসপাতাল",
            hospitals_title: "প্রয়োজনের মুহূর্তে সাহায্য কাছেই",
            hospitals_subtitle: "আপনার অবস্থান ব্যবহার করে MediFastBD কাছের হাসপাতাল খুঁজতে ও দিকনির্দেশনা-কল সুবিধা দিতে সাহায্য করে।",
            hospitals_map_label: "চিত্রমূলক মানচিত্র • অ্যাপে আসল তালিকা",
            hospitals_ss_caption: "কাছের হাসপাতাল — আসল অ্যাপ স্ক্রিন",
            hospital_card1_name: "কাছের হাসপাতাল",
            hospital_card1_dist: "দূরত্ব অ্যাপে দেখা যাবে",
            hospital_card2_name: "কাছের হাসপাতাল",
            hospital_card2_dist: "দূরত্ব অ্যাপে দেখা যাবে",
            hospital_directions: "দিকনির্দেশনা",
            hospital_call: "কল",
            hospital_directions2: "দিকনির্দেশনা",
            hospital_call2: "কল",
            hospitals_demo_note: "চিত্রমূলক লেআউট — হাসপাতালের নাম, দূরত্ব ও রেটিং অ্যাপে আসল ডেটা থেকে আসবে।",
            ai_label: "MediFast AI • মূল ফিচার",
            ai_title: "আপনার স্মার্ট স্বাস্থ্য সহযোগী",
            ai_text: "MediFast AI ওষুধ ও সাধারণ স্বাস্থ্য বিষয়ে দ্রুত, সহজ ভাষায় তথ্য দেয় এবং MediFastBD প্ল্যাটফর্ম ব্যবহারে সাহায্য করে।",
            ai_point1: "💊 ওষুধ ও ব্যবহারবিধি সম্পর্কে জিজ্ঞাসা",
            ai_point2: "🩺 সাধারণ স্বাস্থ্য তথ্য",
            ai_point3: "🧭 MediFastBD ব্যবহারে সাহায্য",
            ai_disclaimer: "MediFast AI শুধু তথ্যগত সহায়তা দেয়, পেশাদার চিকিৎসা পরামর্শের বিকল্প নয়। প্রয়োজনে যোগ্য স্বাস্থ্যকর্মীর পরামর্শ নিন।",
            ai_online: "অনলাইন",
            ai_ex_user: "Napa কী কাজে লাগে?",
            ai_ex_ai: "Napa (Paracetamol) সাধারণত জ্বর ও হালকা-মাঝারি ব্যথায় ব্যবহৃত হয়। মাত্রা বয়স ও শারীরিক অবস্থার ওপর নির্ভর করে — প্যাকেট দেখুন বা ফার্মাসিস্টকে জিজ্ঞাসা করুন।",
            ai_chip1: "ওষুধ বিষয়ে প্রশ্ন",
            ai_chip2: "ব্যবহারবিধি",
            ai_chip3: "প্ল্যাটফর্ম সাহায্য",
            ai_placeholder: "ওষুধ সম্পর্কে জিজ্ঞাসা করুন…",
            ai_demo_note: "চিত্রমূলক কথোপকথন।",
            carelink_label: "CareLink",
            carelink_title: "CareLink পরিবারকে যুক্ত রাখে",
            carelink_subtitle: "পরিবারের সদস্য দূরে থাকলেও, নির্ধারিত ওষুধ বারবার মিস হলে CareLink নির্বাচিত কেয়ারগিভারকে জানতে সাহায্য করে।",
            carelink_step1: "ওষুধের রিমাইন্ডার",
            carelink_step2: "খেলে → স্বাভাবিক",
            carelink_step3: "বাদ পড়লে → মিসড",
            carelink_step4: "বারবার মিস → কেয়ারগিভারকে জানানো",
            carelink_note: "নির্ধারিত শর্ত পূরণ হলে CareLink নির্বাচিত কেয়ারগিভারকে জানায়। এটি পারিবারিক সংযোগ ফিচার, জরুরি চিকিৎসা অ্যালার্ট নয়।",

            management_label: "রিমাইন্ডার ও ওষুধের আলমারি",
            management_title: "ওষুধ ম্যানেজ করুন সহজে",
            management_subtitle: "রিমাইন্ডার, খাওয়ার সময়সূচি, ওষুধের স্টক, মেয়াদ ট্র্যাকিং ও নোটিফিকেশন — বারবার ডোজ মিস হলে CareLink কেয়ারগিভার নোটিফিকেশনসহ।",
            management_card1_title: "ওষুধের আলমারি",
            management_card1_text: "ব্যক্তিগত ওষুধের স্টক ম্যানেজ করুন। বাড়িতে কী আছে তার হিসাব রাখুন।",
            management_card2_title: "মেয়াদ ট্র্যাকিং",
            management_card2_text: "মেয়াদ শেষ হতে যাওয়া ওষুধের হিসাব রাখুন। মেয়াদোত্তীর্ণ ওষুধ ব্যবহার এড়িয়ে চলুন।",
            management_card3_title: "স্মার্ট রিমাইন্ডার",
            management_card3_text: "ওষুধের রিমাইন্ডার দিয়ে সময়মতো ওষুধ নিন। কোনো ডোজ মিস করবেন না।",

            ordering_label: "অর্ডার, পেমেন্ট ও সরাসরি চ্যাট",
            ordering_title: "ফার্মেসির সাথে সরাসরি যুক্ত হোন",
            ordering_subtitle: "গ্রাহক ↔ ফার্মেসি চ্যাট, কল ও দিকনির্দেশনা — সাথে অ্যাপে সমর্থিত অর্ডার ও পেমেন্ট ফ্লো। (MediFast AI থেকে আলাদা।)",
            ordering_step1: "ওষুধ খুঁজুন",
            ordering_step2: "ফার্মেসি তুলনা করুন",
            ordering_step3: "কার্টে যোগ করুন",
            ordering_step4: "অর্ডার করুন",
            ordering_step5: "অর্ডার ট্র্যাক করুন",

            pharmacy_label: "ফার্মেসির জন্য",
            pharmacy_title: "শুধু গ্রাহক অ্যাপ নয়",
            pharmacy_text: "MediFastBD ফার্মেসি মালিকদের ব্যবসা দক্ষভাবে পরিচালনার জন্য একটি সম্পূর্ণ ড্যাশবোর্ড প্রদান করে।",
            pharmacy_feature1: "✓ ইনভেন্টরি ম্যানেজমেন্ট",
            pharmacy_feature2: "✓ অর্ডার ম্যানেজমেন্ট",
            pharmacy_feature3: "✓ বিক্রয় ট্র্যাকিং",
            pharmacy_feature4: "✓ ফার্মেসি স্ট্যাটাস",
            pharmacy_feature5: "✓ বিজনেস ইনসাইট",
            pharmacy_feature6: "✓ ওষুধের স্টক",
            pharmacy_cta: "MediFastBD-তে যোগ দিন",

            admin_label: "অ্যাডমিন কন্ট্রোল",
            admin_title: "কেন্দ্রীয় নিয়ন্ত্রণে তৈরি",
            admin_customers: "মোট গ্রাহক",
            admin_pharmacies: "মোট ফার্মেসি",
            admin_orders: "মোট অর্ডার",
            admin_sales: "মোট বিক্রয়",
            admin_revenue: "রেভিনিউ",
            admin_commission: "কমিশন",
            admin_top_pharmacy: "সেরা পারফর্মিং ফার্মেসি",
            admin_best_medicine: "সর্বাধিক বিক্রিত ওষুধ",
            admin_verification: "ফার্মেসি ভেরিফিকেশন",
            admin_pending: "পেন্ডিং",
            admin_management: "গ্রাহক ব্যবস্থাপনা",
            admin_active: "সক্রিয়",

            business_label: "একটি সংযুক্ত ইকোসিস্টেম",
            business_title: "গ্রাহক, ফার্মেসি ও স্মার্ট সেবা — সংযুক্ত।",
            business_customer: "গ্রাহক",
            business_pharmacy: "ফার্মেসি",
            business_platform: "MediFastBD",
            business_purchase: "ওষুধ ক্রয়",
            business_commission: "প্ল্যাটফর্ম কমিশন",
            business_text: "MediFastBD একটি স্বচ্ছ প্রতি-ওষুধ কমিশন মডেল সমর্থন করে, যা গ্রাহক, ফার্মেসি এবং প্ল্যাটফর্ম সবার জন্য মূল্য তৈরি করে।",

            crossplatform_label: "ক্রস-প্ল্যাটফর্ম",
            crossplatform_title: "আপনার মতো করে MediFastBD ব্যবহার করুন।",
            crossplatform_web_title: "ওয়েব",
            crossplatform_web_text: "ব্রাউজার থেকেই সরাসরি MediFastBD ব্যবহার করুন।",
            crossplatform_web_cta: "ওয়েব ভার্সন ট্রাই করুন",
            crossplatform_android_title: "অ্যান্ড্রয়েড",
            crossplatform_android_text: "অ্যান্ড্রয়েড অ্যাপ ডাউনলোড করুন।",
            crossplatform_android_cta: "অ্যান্ড্রয়েড ডাউনলোড",
            crossplatform_android_badge: "জনপ্রিয়",
            crossplatform_windows_title: "উইন্ডোজ",
            crossplatform_windows_text: "উইন্ডোজে MediFastBD ব্যবহার করুন।",
            crossplatform_windows_cta: "উইন্ডোজ ডাউনলোড",

            howit_label: "কীভাবে কাজ করে",
            howit_title: "চারটি সহজ ধাপে শুরু করুন।",
            howit_step1_title: "খুঁজুন",
            howit_step1_text: "ওষুধ, হাসপাতাল খুঁজুন বা MediFast AI-কে জিজ্ঞাসা করুন।",
            howit_step2_title: "তুলনা ও আবিষ্কার",
            howit_step2_text: "সাশ্রয়ী অপশন ও কাছের প্রাপ্যতা মূল্যায়ন করুন।",
            howit_step3_title: "যোগাযোগ",
            howit_step3_text: "ফার্মেসি বা হাসপাতালে চ্যাট, কল বা দিকনির্দেশনা নিন।",
            howit_step4_title: "সেবা নিন",
            howit_step4_text: "ওষুধ ও স্বাস্থ্য সহায়তা নিন — রিমাইন্ডার ও CareLink সহ।",

            customers_label: "মূল ফিচার",
            customers_title: "একটি সংযুক্ত হেলথকেয়ার ইকোসিস্টেম।",
            customers_subtitle: "গ্রাহক, ফার্মেসি, কেয়ারগিভার, AI ও কাছের স্বাস্থ্যসেবা মিলিয়ে এগারোটি সমন্বিত সুবিধা।",
            customers_card1_title: "সাশ্রয়ী অপশন",
            customers_card1_text: "প্রাপ্য দাম, দূরত্ব, যাতায়াত সময় ও আনুমানিক খরচ মিলিয়ে আরও সাশ্রয়ী সিদ্ধান্ত নিন।",
            customers_card2_title: "ওষুধ সার্চ",
            customers_card2_text: "এক জায়গা থেকে ওষুধ খুঁজুন, প্রাপ্য ফার্মেসি ও প্রাসঙ্গিক তথ্য আবিষ্কার করুন।",
            customers_card3_title: "জরুরি ওষুধ মোড",
            customers_card3_text: "ওষুধ + প্রয়োজনীয় সময় দিলে ৫ কিমির যুক্ত ফার্মেসিতে অ্যালার্ট যায়, তারা যোগাযোগ করে।",
            customers_card4_title: "কাছের হাসপাতাল",
            customers_card4_text: "অবস্থান ব্যবহার করে কাছের হাসপাতাল আবিষ্কার, দিকনির্দেশনা ও কল সুবিধাসহ।",
            customers_card5_title: "MediFast AI",
            customers_card5_text: "ওষুধ ও সাধারণ স্বাস্থ্য বিষয়ে দ্রুত সহজ তথ্য ও প্ল্যাটফর্ম সাহায্য। শুধু তথ্যগত।",
            customers_card6_title: "CareLink",
            customers_card6_text: "নির্ধারিত রিমাইন্ডার বারবার মিস হলে নির্বাচিত কেয়ারগিভার জানতে পারেন।",
            customers_card7_title: "রিমাইন্ডার ও আলমারি",
            customers_card7_text: "সময়সূচি, ব্যক্তিগত স্টক, মেয়াদ ট্র্যাকিং ও নোটিফিকেশন।",
            customers_card8_title: "ফার্মেসি চ্যাট",
            customers_card8_text: "গ্রাহক ↔ ফার্মেসি চ্যাট, কল ও দিকনির্দেশনা। MediFast AI থেকে আলাদা।",
            customers_card9_title: "ফার্মেসি ম্যানেজমেন্ট",
            customers_card9_text: "ইনভেন্টরি, ক্যাটালগ, অর্ডার, প্রাপ্যতা, গ্রাহক যোগাযোগ ও বিজনেস টুলস।",
            customers_card10_title: "অ্যাডমিন কন্ট্রোল",
            customers_card10_text: "ভেরিফিকেশন, ব্যবহারকারী ও অর্ডার মনিটরিং, অ্যানালিটিক্স ও রেভিনিউ ইনসাইট।",
            customers_card11_title: "পেমেন্ট ও অর্ডার",
            customers_card11_text: "অ্যাপে সমর্থিত অর্ডার ও পেমেন্ট ফ্লো — শুধু চালু পদ্ধতিই দেখানো হয়।",

            different_label: "কেন MediFastBD",
            different_title: "MediFastBD কেন আলাদা?",
            different_subtitle: "শুধু ওষুধ খোঁজার অ্যাপ নয় — একটি সংযুক্ত স্বাস্থ্যসেবা প্ল্যাটফর্ম।",
            different_card1_title: "সাশ্রয়ী সিদ্ধান্ত",
            different_card1_text: "মূল্য, দূরত্ব, ভ্রমণ সময় ও আনুমানিক ভ্রমণ খরচ তুলনা করুন — শুধু ওষুধের দাম নয়।",
            different_card2_title: "ইমারজেন্সি মেডিসিন মোড",
            different_card2_text: "কাছে ওষুধ না পেলে ৫ কিমির মধ্যে সংযুক্ত ফার্মেসিকে সতর্ক করুন।",
            different_card3_title: "CareLink",
            different_card3_text: "রোগী বারবার নির্ধারিত রিমাইন্ডার মিস করলে নির্বাচিত কেয়ারগিভার জানতে পারেন।",
            different_card4_title: "MediFast AI",
            different_card4_text: "দ্রুত ও সহজ ওষুধ তথ্য ও প্ল্যাটফর্ম নির্দেশনা — শুধু তথ্যমূলক সহায়তা।",
            different_card5_title: "কাছের হাসপাতাল",
            different_card5_text: "আপনার অবস্থান ব্যবহার করে কাছের হাসপাতাল খুঁজুন, দিকনির্দেশনা ও কল সহ।",

            about_label: "MediFastBD সম্পর্কে • Nexora Labs",
            about_title: "বাস্তব স্বাস্থ্যসেবার চাহিদা ঘিরে ডিজাইন করা প্রযুক্তি।",
            about_text: "Nexora Labs-এর MediFastBD বাংলাদেশ-কেন্দ্রিক ডিজিটাল স্বাস্থ্য প্ল্যাটফর্ম — গ্রাহক, ফার্মেসি মালিক ও অ্যাডমিনকে যুক্ত করে ওষুধ খোঁজাকে আরও সাশ্রয়ী, দ্রুত ও কাছের করে।",
            preview_label: "অ্যাপ প্রিভিউ",
            preview_title: "MediFastBD কাজে দেখুন।",
            preview_subtitle: "যেখানে প্রাপ্য সেখানে আসল অ্যাপ স্ক্রিন। নতুন স্ক্রিন (AI চ্যাট, CareLink) অ্যাপে আছে — এই পেজে চিত্রমূলক প্রিভিউ।",
            preview_cap1: "গ্রাহক ড্যাশবোর্ড",
            preview_cap2: "ওষুধ সার্চ",
            preview_cap3: "জরুরি মোড",
            preview_cap4: "ফার্মেসি ড্যাশবোর্ড",
            preview_cap5: "কাছের হাসপাতাল",
            preview_cap6: "MediFast AI চ্যাট — অ্যাপে",
            preview_cap7: "CareLink ও রিমাইন্ডার — অ্যাপে",
            preview_cap8: "অ্যালার্ট ও মেয়াদ",

            demo_label: "ডেমো",
            demo_title: "MediFastBD কাজ করতে দেখুন",
            demo_subtitle: "কীভাবে MediFastBD ওষুধ অনুসন্ধান, সাশ্রয়ীতা, ফার্মেসি, AI, ইমারজেন্সি ওষুধ আবিষ্কার, কাছের হাসপাতাল ও কেয়ারগিভার সহায়তাকে এক প্ল্যাটফর্মে সংযুক্ত করে তা অন্বেষণ করুন।",
            demo_text: "৯০ সেকেন্ডের প্রজেক্ট ডেমো ভিডিও",
            demo_hint: "৯০ সেকেন্ডের প্রজেক্ট ডেমো ভিডিও এখানে উপলব্ধ হবে।",
            demo_fallback: "ডেমো ভিডিও শীঘ্রই আসছে",
            demo_btn: "৯০ সেকেন্ডের ডেমো দেখুন",

            trustsec_label: "আস্থা ও নিরাপত্তা",
            trustsec_title: "নিরাপদ ভিত্তির ওপর তৈরি।",
            trustsec1_title: "Firebase Authentication",
            trustsec1_text: "রোল-ভিত্তিক অনুমতিসহ সাইন-ইন অ্যাক্সেস।",
            trustsec2_title: "রোল-ভিত্তিক অ্যাক্সেস",
            trustsec2_text: "গ্রাহক, ফার্মেসি ও অ্যাডমিনের আলাদা অভিজ্ঞতা।",
            trustsec3_title: "নিরাপদ ব্যাকএন্ড",
            trustsec3_text: "সুরক্ষিত ব্যবহারকারী ডেটা ও নিরাপদ নোটিফিকেশন।",
            trustsec4_title: "সৎ AI",
            trustsec4_text: "MediFast AI শুধু তথ্যগত — ডাক্তারের বিকল্প কখনোই নয়।",

            cta_title: "ওষুধ খোঁজা দ্রুত, সাশ্রয়ী ও কাছেই।",
            cta_text: "মানুষ, ফার্মেসি ও স্মার্ট স্বাস্থ্যসেবাকে এক প্ল্যাটফর্মে যুক্ত করছে।",
            cta_web: "ওয়েব ভার্সন ট্রাই করুন →",
            cta_android: "অ্যাপ ডাউনলোড",
            cta_features: "ফিচার দেখুন",
            cta_windows: "উইন্ডোজ ডাউনলোড",

            footer_tagline: "ওষুধ দ্রুত, সাশ্রয়ী ও কাছেই — Nexora Labs",
            footer_product: "প্রোডাক্ট",
            footer_web: "ওয়েব অ্যাপ",
            footer_android: "অ্যান্ড্রয়েড",
            footer_windows: "উইন্ডোজ",
            footer_platform: "প্ল্যাটফর্ম",
            footer_customers: "গ্রাহক",
            footer_owners: "ফার্মেসি মালিক",
            footer_admin: "প্রশাসন",
            footer_resources: "রিসোর্স",
            footer_features: "ফিচার",
            footer_howit: "কীভাবে কাজ করে",
            footer_trust: "আস্থা ও নিরাপত্তা",
            footer_about: "আমাদের সম্পর্কে",
            footer_developer: "ডেভেলপার",
            footer_github: "গিটহাব",
            footer_copy: "© 2026 MediFastBD • Nexora Labs। সর্বস্বত্ব সংরক্ষিত।"
        }
    };

    var currentLang = localStorage.getItem("lang") || "en";
    var langToggle = document.getElementById("langToggle");
    var langLabel = document.getElementById("langLabel");
    var html = document.documentElement;

    function applyTranslations(lang) {
        html.setAttribute("lang", lang);
        var dict = translations[lang] || translations.en;
        document.querySelectorAll("[data-i18n]").forEach(function (el) {
            var key = el.getAttribute("data-i18n");
            if (dict[key] !== undefined) {
                el.textContent = dict[key];
            }
        });
        if (langLabel) {
            langLabel.textContent = lang === "en" ? "EN" : "\u09ac\u09be\u0982";
        }
        document.title = lang === "bn"
            ? "\u09ae\u09c7\u09a1\u09bf\u09ab\u09be\u09b8\u09cd\u099f\u09ac\u09bf\u09a1\u09bf \u2014 \u0993\u09b7\u09a7 \u09a6\u09cd\u09b0\u09c1\u09a4, \u09b8\u09be\u09b6\u09cd\u09b0\u09df\u09c0 \u0993 \u0995\u09be\u099b\u09c7"
            : "MediFastBD \u2014 Finding Medicine Faster, Cheaper & Closer";
    }

    applyTranslations(currentLang);

    if (langToggle) {
        langToggle.addEventListener("click", function () {
            currentLang = currentLang === "en" ? "bn" : "en";
            localStorage.setItem("lang", currentLang);
            applyTranslations(currentLang);
        });
    }
})();

/* ============================================================
   ANDROID VISUALIZATION — staggered reveal + hero auto-scroll
   ============================================================ */
(function () {
    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Staggered reveal for Android galleries
    if (!prefersReducedMotion) {
        var gallObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var phones = entry.target.querySelectorAll(".medicine-search__phone, .pharmacy-owner__phone");
                    phones.forEach(function (phone, i) {
                        phone.style.opacity = "0";
                        phone.style.transform = "translateY(28px) scale(0.96)";
                        phone.style.transition = "all 0.7s cubic-bezier(0.22,1,0.36,1)";
                        setTimeout(function () {
                            phone.style.opacity = "1";
                            phone.style.transform = "translateY(0) scale(1)";
                        }, i * 120 + 200);
                    });
                    gallObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        document.querySelectorAll(".medicine-search__screenshots, .pharmacy-owner__gallery").forEach(function (g) {
            gallObserver.observe(g);
        });

        var emerObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var phone = entry.target.querySelector(".emergency__phone");
                    if (phone) {
                        phone.style.opacity = "0";
                        phone.style.transform = "translateY(30px) scale(0.97)";
                        phone.style.transition = "all 0.8s cubic-bezier(0.22,1,0.36,1)";
                        setTimeout(function () {
                            phone.style.opacity = "1";
                            phone.style.transform = "translateY(0) scale(1)";
                        }, 200);
                    }
                    emerObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        var emer = document.querySelector(".emergency__visual");
        if (emer) emerObserver.observe(emer);
    }

    // Hero dashboard auto-scroll (show both customer dashboards)
    var heroScreen = document.querySelector(".hero__phone-screen--dashboard");
    if (heroScreen && !prefersReducedMotion) {
        var scrollDir = 1;
        var scrollPos = 0;
        var maxScroll = 0;

        function updateMax() {
            maxScroll = heroScreen.scrollHeight - heroScreen.clientHeight;
        }
        updateMax();
        window.addEventListener("resize", updateMax);

        var heroObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var timer = setInterval(function () {
                        if (maxScroll <= 0) return;
                        scrollPos += scrollDir * 0.4;
                        if (scrollPos >= maxScroll) { scrollPos = maxScroll; scrollDir = -1; }
                        if (scrollPos <= 0) { scrollPos = 0; scrollDir = 1; }
                        heroScreen.scrollTop = scrollPos;
                    }, 16);

                    heroScreen.addEventListener("mouseenter", function () { clearInterval(timer); });
                    heroScreen.addEventListener("mouseleave", function () {
                        timer = setInterval(function () {
                            scrollPos += scrollDir * 0.4;
                            if (scrollPos >= maxScroll) { scrollPos = maxScroll; scrollDir = -1; }
                            if (scrollPos <= 0) { scrollPos = 0; scrollDir = 1; }
                            heroScreen.scrollTop = scrollPos;
                        }, 16);
                    }, { once: true });

                    heroObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });

        heroObserver.observe(heroScreen);
    }

    // Back to top
    var btt = document.getElementById("backToTop");
    if (btt) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 600) btt.classList.add("visible");
            else btt.classList.remove("visible");
        }, { passive: true });
        btt.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
})();
