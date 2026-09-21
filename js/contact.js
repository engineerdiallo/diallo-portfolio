
/* =========================================================
   CONTACT.JS
   Validation du formulaire de contact
   Envoi réel assuré par Formspree
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ÉLÉMENTS DU FORMULAIRE
    ====================================================== */

    const form = document.querySelector(".contact-form");

    if (!form) {
        return;
    }

    const nameInput = form.querySelector("#name");
    const emailInput = form.querySelector("#email");
    const subjectInput = form.querySelector("#subject");
    const messageInput = form.querySelector("#message");

    const status = form.querySelector(".contact-form__status");


    /* =====================================================
       FONCTION : AFFICHER UNE ERREUR
    ====================================================== */

    const showError = (input, message) => {

        const group = input.closest(".form-group");

        if (!group) {
            return false;
        }

        let error = group.querySelector(".form-error");

        if (!error) {

            error = document.createElement("small");

            error.className = "form-error";

            error.setAttribute("role", "alert");

            group.appendChild(error);
        }

        error.textContent = message;

        input.setAttribute("aria-invalid", "true");

        return false;
    };


    /* =====================================================
       FONCTION : SUPPRIMER UNE ERREUR
    ====================================================== */

    const clearError = (input) => {

        const group = input.closest(".form-group");

        if (!group) {
            return;
        }

        const error = group.querySelector(".form-error");

        if (error) {
            error.remove();
        }

        input.removeAttribute("aria-invalid");
    };


    /* =====================================================
       FONCTION : AFFICHER LE STATUT LOCAL
    ====================================================== */

    const showStatus = (message, type) => {

        if (!status) {
            return;
        }

        status.textContent = message;

        status.className = "contact-form__status";
        status.classList.add("is-visible");


        if (type === "error") {
            status.classList.add("contact-form__status--error");
        }

        status.setAttribute(
            "role",
            type === "error" ? "alert" : "status"
        );
    };



    /* ===================================================== 
        FONCTION : EFFACER LE STATUT LOCAL 
    ====================================================== */
    const clearStatus = () => {
        if (!status) {
            return;
        }
        status.textContent = "";
        status.className = "contact-form__status";
    };


    /* =====================================================
       FONCTION : VALIDATION DE L'E-MAIL
    ====================================================== */

    const isValidEmail = (email) => {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailPattern.test(email);
    };


    /* =====================================================
       VALIDATION D'UN CHAMP
    ====================================================== */

    const validateField = (input, message) => {

        if (!input) {
            return true;
        }

        const value = input.value.trim();

        if (!value) {
            showError(input, message);
            return false;
        }

        clearError(input);

        return true;
    };


    /* =====================================================
       VALIDATION DE L'E-MAIL
    ====================================================== */

    const validateEmail = () => {

        if (!emailInput) {
            return true;
        }

        const email = emailInput.value.trim();

        if (!email) {
            showError(
                emailInput,
                "Veuillez renseigner votre adresse e-mail."
            );

            return false;
        }

        if (!isValidEmail(email)) {
            showError(
                emailInput,
                "Veuillez renseigner une adresse e-mail valide."
            );

            return false;
        }

        clearError(emailInput);

        return true;
    };


    /* =====================================================
       VALIDATION COMPLÈTE
    ====================================================== */

    const validateForm = () => {

        let isValid = true;

        if (nameInput) {
            const validName = validateField(
                nameInput,
                "Veuillez renseigner votre nom."
            );

            if (!validName) {
                isValid = false;
            }
        }


        if (emailInput) {
            const validEmail = validateEmail();

            if (!validEmail) {
                isValid = false;
            }
        }


        if (subjectInput) {
            const validSubject = validateField(
                subjectInput,
                "Veuillez renseigner le sujet."
            );

            if (!validSubject) {
                isValid = false;
            }
        }


        if (messageInput) {
            const validMessage = validateField(
                messageInput,
                "Veuillez renseigner votre message."
            );

            if (!validMessage) {
                isValid = false;
            }
        }

        return isValid;
    };


    /* =====================================================
       VALIDATION EN TEMPS RÉEL
    ====================================================== */

    const fields = [
        nameInput,
        emailInput,
        subjectInput,
        messageInput
    ].filter(Boolean);


    fields.forEach((input) => {

        input.addEventListener("input", () => {

            /*
             * On retire immédiatement l'erreur lorsque
             * l'utilisateur recommence à saisir.
             */

            clearError(input);
            clearStatus();

        });

        input.addEventListener("blur", () => {

            if (!input.value.trim()) {
                return;
            }

            if (input === emailInput) {
                validateEmail();
                return;
            }

            clearError(input);

        });

    });


    /* =====================================================
       VALIDATION AVANT ENVOI
    ====================================================== */

    form.addEventListener("submit", (event) => {

        clearStatus();

        const isValid = validateForm();

        if (!isValid) {

            event.preventDefault();

            showStatus(
                "Veuillez corriger les champs indiqués.",
                "error"
            );

            /*
             * Focus sur le premier champ invalide.
             */

            const invalidField = form.querySelector(
                '[aria-invalid="true"]'
            );

            if (invalidField) {
                invalidField.focus();
            }

            return;
        }


        /* 
         Les données sont valides. 
         IMPORTANT : 
         On ne fait PAS event.preventDefault(). 
         
         @formspree/ajax peut donc prendre en charge 
         l'envoi réel vers Formspree. 
        */

    });

});
