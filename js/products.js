document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
});

async function loadProducts() {
    const productsList = document.getElementById("products-list");

    if (!productsList) return;

    productsList.innerHTML = "<p>جاري تحميل المنتجات...</p>";

    const { data, error } = await supabaseClient
        .from("products")
        .select(`
            id,
            name_ar,
            name_fr,
            name_en,
            description_ar,
            description_fr,
            description_en,
            price,
            old_price,
            stock,
            category,
            image_url
        `)
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

    if (error) {
        console.error("Products loading error:", error);
        productsList.innerHTML = "<p>حدث خطأ في تحميل المنتجات.</p>";
        return;
    }

    renderProducts(data);
}

function renderProducts(products) {
    const productsList = document.getElementById("products-list");

    if (!products.length) {
        productsList.innerHTML = "<p>لا توجد منتجات حالياً.</p>";
        return;
    }

    productsList.innerHTML = products.map(product => `
        <article class="product-card">

            <a href="product.html?id=${product.id}" class="product-link">

                <div class="product-image">
                    ${
                        product.image_url
                            ? `<img src="${product.image_url}" alt="${product.name_ar}">`
                            : `<span>صورة المنتج</span>`
                    }
                </div>

                <div class="product-info">
                    <h3>${product.name_ar}</h3>

                    ${
                        product.description_ar
                            ? `<p>${product.description_ar}</p>`
                            : ""
                    }

                    <strong>
                        ${Number(product.price).toLocaleString("fr-DZ")} DZD
                    </strong>
                </div>

            </a>

        </article>
    `).join("");
}