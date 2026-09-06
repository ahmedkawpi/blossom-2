/* ================================
   Blossom 2 — Global App
   ================================ */

const supabaseClient = supabase.createClient(
    SUPABASE_CONFIG.url,
    SUPABASE_CONFIG.publishableKey
);

document.addEventListener("DOMContentLoaded", () => {
    initializeApp();
});

function initializeApp() {
    applyStoreConfig();
    testSupabaseConnection();
}

function applyStoreConfig() {
    document.title = STORE_CONFIG.name;
}

async function testSupabaseConnection() {
    const { error } = await supabaseClient
        .from("products")
        .select("id")
        .limit(1);

    if (error) {
        console.error("Supabase connection error:", error);
        return;
    }

    console.log("Supabase connected successfully.");
}