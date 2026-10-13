/* =========================================
   RENDA EXTRA NA PRÁTICA
   Animações e botões de checkout
========================================= */

"use strict";

/* 1. ANO AUTOMÁTICO NO RODAPÉ */

const yearElement = document.getElementById("current-year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

/* 2. ANIMAÇÃO FADE-IN */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -30px 0px"
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}

/* 3. LINKS DE PAGAMENTO
   Substitua os textos abaixo pelos links
   verdadeiros gerados nas plataformas.
*/

const CHECKOUT_URLS = {
    kiwify: "COLE_AQUI_O_LINK_REAL_DA_KIWIFY",
    cakto: "COLE_AQUI_O_LINK_REAL_DA_CAKTO"
};

/* 4. BOTÕES DE COMPRA */

const checkoutButtons = document.querySelectorAll("[data-checkout]");
const checkoutWarning = document.getElementById("checkout-warning");

function isValidCheckoutUrl(url) {
    if (typeof url !== "string" || !url.trim()) {
        return false;
    }

    if (
        url.includes("COLE_AQUI") ||
        url.includes("SEU_LINK") ||
        url === "#"
    ) {
        return false;
    }

    try {
        const parsedUrl = new URL(url);

        return (
            parsedUrl.protocol === "https:" &&
            Boolean(parsedUrl.hostname)
        );
    } catch {
        return false;
    }
}

checkoutButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        event.preventDefault();

        const platform = button.dataset.checkout;
        const checkoutUrl = CHECKOUT_URLS[platform];

        if (!isValidCheckoutUrl(checkoutUrl)) {
            if (checkoutWarning) {
                checkoutWarning.hidden = false;
                checkoutWarning.textContent =
                    "O link de pagamento ainda não foi configurado. Tente novamente mais tarde.";
                checkoutWarning.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest"
                });
            }

            return;
        }

        window.location.href = checkoutUrl;
    });
});

/* 5. FECHAR AVISO QUANDO OS LINKS ESTIVEREM CONFIGURADOS */

const allCheckoutLinksReady = Object.values(CHECKOUT_URLS).every(
    isValidCheckoutUrl
);

if (checkoutWarning && allCheckoutLinksReady) {
    checkoutWarning.hidden = true;
}
