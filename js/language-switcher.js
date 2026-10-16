
const languageButton = document.getElementById("language-switcher");

function setLanguage(language) {
    if (!Object.hasOwn(translations, language)) {
        return;
    }

    document.documentElement.lang = language;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.dataset.i18n;
        const translation = translations[language][key];

        if (typeof translation === "string") {
            element.textContent = translation;
        }
    });

    document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
        const key = element.dataset.i18nAlt;
        const translation = translations[language][key];

        if (typeof translation === "string") {
            element.setAttribute("alt", translation);
        }
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
        const key = element.dataset.i18nAriaLabel;
        const translation = translations[language][key];

        if (typeof translation === "string") {
            element.setAttribute("aria-label", translation);
        }
    });

    if (languageButton) {
        languageButton.textContent = language === "en" ? "Dansk" : "English";
    }

    try {
        localStorage.setItem("portfolioLanguage", language);
    } catch (error) {
    }
}

if (languageButton) {
    languageButton.addEventListener("click", () => {
        const currentLanguage = document.documentElement.lang;
        const newLanguage = currentLanguage === "en" ? "da" : "en";

        setLanguage(newLanguage);
    });
}

let savedLanguage = "en";

try {
    const storedLanguage = localStorage.getItem("portfolioLanguage");

    if (storedLanguage && Object.hasOwn(translations, storedLanguage)) {
        savedLanguage = storedLanguage;
    }
} catch (error) {
}

setLanguage(savedLanguage);
