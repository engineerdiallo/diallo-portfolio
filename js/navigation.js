/* =========================================================
   NAVIGATION.JS
   Gestion de la navigation et du menu mobile
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ÉLÉMENTS DE NAVIGATION
    ====================================================== */

    const toggle = document.querySelector(".navbar__toggle");
    const menu = document.querySelector(".navbar__menu");
    const links = document.querySelectorAll(".navbar__link");


    /* =====================================================
       VÉRIFICATION
    ====================================================== */

    if (!toggle || !menu) {
        return;
    }


    /* =====================================================
       FONCTIONS
    ====================================================== */

    const openMenu = () => {
        menu.classList.add("is-open");

        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute("aria-label", "Fermer le menu");

        document.body.classList.add("menu-open");
    };


    const closeMenu = () => {
        menu.classList.remove("is-open");

        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Ouvrir le menu");

        document.body.classList.remove("menu-open");
    };


    const toggleMenu = () => {
        const isOpen = menu.classList.contains("is-open");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    };


    /* =====================================================
       ÉTAT INITIAL
    ====================================================== */

    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Ouvrir le menu");

    menu.setAttribute("aria-hidden", "true");


    /* =====================================================
       OUVERTURE / FERMETURE
    ====================================================== */

    toggle.addEventListener("click", toggleMenu);


    /* =====================================================
       ACCESSIBILITÉ DU MENU
    ====================================================== */

    const updateMenuAccessibility = () => {
        const isOpen = menu.classList.contains("is-open");

        menu.setAttribute("aria-hidden", String(!isOpen));

        links.forEach((link) => {
            link.setAttribute("tabindex", isOpen ? "0" : "0");
        });
    };


    const observer = new MutationObserver(updateMenuAccessibility);

    observer.observe(menu, {
        attributes: true,
        attributeFilter: ["class"]
    });


    /* =====================================================
       FERMETURE APRÈS CLIC SUR UN LIEN
    ====================================================== */

    links.forEach((link) => {

        link.addEventListener("click", () => {
            closeMenu();
        });

    });


    /* =====================================================
       FERMETURE AVEC ESCAPE
    ====================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeMenu();
            toggle.focus();
        }

    });


    /* =====================================================
       FERMETURE LORS D'UN CLIC À L'EXTÉRIEUR
    ====================================================== */

    document.addEventListener("click", (event) => {

        const clickedInsideMenu = menu.contains(event.target);
        const clickedToggle = toggle.contains(event.target);

        if (
            menu.classList.contains("is-open") &&
            !clickedInsideMenu &&
            !clickedToggle
        ) {
            closeMenu();
        }

    });


    /* =====================================================
       GESTION DU REDIMENSIONNEMENT
    ====================================================== */

    window.addEventListener("resize", () => {

        /*
         * À partir de 1024px, le menu devient
         * automatiquement visible grâce au CSS.
         *
         * On réinitialise néanmoins son état JS
         * afin d'éviter de conserver un état mobile.
         */

        if (window.innerWidth >= 1024) {
            closeMenu();
        }

    });

});
