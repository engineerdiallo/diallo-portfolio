/* =========================================================
   MAIN.JS
   Initialisation et comportements généraux du portfolio
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. INDIQUER QUE JAVASCRIPT EST DISPONIBLE
    ====================================================== */

    document.documentElement.classList.add("js-enabled");


    /* =====================================================
       2. ANNÉE AUTOMATIQUE DU FOOTER
    ====================================================== */

    const currentYear = new Date().getFullYear();

    const yearElements = document.querySelectorAll(
        "[data-current-year]"
    );

    yearElements.forEach((element) => {
        element.textContent = currentYear;
    });


    /* =====================================================
       3. NAVIGATION VERS LES ANCRES
    ====================================================== */

    const anchorLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    const header = document.querySelector(".site-header");


    anchorLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            /*
             * "#" seul ne correspond pas à une section.
             */

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight = header
                ? header.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                16;

            window.scrollTo({
                top: Math.max(targetPosition, 0),
                behavior: "smooth"
            });


            /*
             * Mettre à jour l'URL sans provoquer
             * un déplacement supplémentaire.
             */

            if (history.pushState) {
                history.pushState(
                    null,
                    "",
                    targetId
                );
            }

        });

    });


    /* =====================================================
       4. ANNULATION DU SCROLL AUTOMATIQUE DU NAVIGATEUR
    ====================================================== */

    window.addEventListener("hashchange", () => {

        /*
         * La navigation interne est déjà gérée
         * par le système d'ancres ci-dessus.
         */

    });


    /* =====================================================
       5. APPARITION PROGRESSIVE DES ÉLÉMENTS
    ====================================================== */

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    if (!prefersReducedMotion) {

        const animatedElements = document.querySelectorAll(
            ".section-header, " +
            ".service-card, " +
            ".skill-card, " +
            ".project-card, " +
            ".project-featured, " +
            ".exploring-item, " +
            ".timeline__item, " +
            ".contact-link"
        );


        /*
         * Observer les éléments lorsqu'ils entrent
         * dans la zone visible de l'écran.
         */

        const observer = new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add(
                        "is-visible"
                    );

                    observerInstance.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


        animatedElements.forEach((element) => {

            element.classList.add("reveal");

            observer.observe(element);

        });

    }


    /* =====================================================
       6. VÉRIFICATION DES IMAGES
    ====================================================== */

    const images = document.querySelectorAll("img");


    images.forEach((image) => {

        image.addEventListener("error", () => {

            image.classList.add("image-error");

        });

    });


    /* =====================================================
       7. LOG DE DÉVELOPPEMENT
    ====================================================== */

    console.info(
        "Portfolio Abdoulaye Diallo — interface initialisée."
    );

});