/* ================================
   Blossom 2 — Global App
   ================================ */

document.addEventListener("DOMContentLoaded", () => {
    initializeApp();
});

function initializeApp() {
    applyStoreConfig();
}

function applyStoreConfig() {
    document.title = STORE_CONFIG.name;
}