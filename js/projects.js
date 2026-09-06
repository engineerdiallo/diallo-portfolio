
/* =========================================================
   PROJECTS.JS
   Gestion des interactions de la section Projets
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ÉLÉMENTS
    ====================================================== */

    const projectCards = document.querySelectorAll(".project-card");
    const featuredProject = document.querySelector(".project-featured");


    /* =====================================================
       VÉRIFICATION
    ====================================================== */

    if (!projectCards.length && !featuredProject) {
        return;
    }


    /* =====================================================
       ACCESSIBILITÉ DES CARTES
    ====================================================== */

    projectCards.forEach((card) => {

        /*
         * Les cartes restent des éléments non interactifs
         * tant qu'aucun bouton ou lien n'est prévu dans leur HTML.
         *
         * On ne transforme donc pas artificiellement toute
         * la carte en bouton : les vrais liens de la carte
         * restent responsables de la navigation.
         */

        const links = card.querySelectorAll("a");

        links.forEach((link) => {
            link.addEventListener("click", (event) => {

                /*
                 * Permet au navigateur de suivre normalement
                 * le lien tout en laissant la possibilité
                 * d'ajouter ultérieurement une logique JS.
                 */

                if (!link.href) {
                    event.preventDefault();
                }

            });
        });

    });


    /* =====================================================
       PROJET MIS EN AVANT
    ====================================================== */

    if (featuredProject) {

        const featuredLink = featuredProject.querySelector("a");

        if (featuredLink) {

            featuredLink.addEventListener("click", () => {

                /*
                 * Navigation normale vers la page du projet.
                 *
                 * Cette fonction pourra être enrichie plus tard
                 * si l'on ajoute un système de chargement dynamique.
                 */

            });

        }

    }


    /* =====================================================
       EFFET DE FOCUS SUR LES CARTES
    ====================================================== */

    projectCards.forEach((card) => {

        const links = card.querySelectorAll("a");

        links.forEach((link) => {

            link.addEventListener("focus", () => {
                card.classList.add("is-focused");
            });

            link.addEventListener("blur", () => {
                card.classList.remove("is-focused");
            });

        });

    });


    /* =====================================================
       NETTOYAGE DES ÉTATS
    ====================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key !== "Escape") {
            return;
        }

        projectCards.forEach((card) => {
            card.classList.remove("is-focused");
        });

    });

});
