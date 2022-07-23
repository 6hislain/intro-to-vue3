app.component("product-display", {
	props: { premium: { type: Boolean, required: true } },
	template:
		/*html*/
		`<div class="product-display">
	        <div class="product-container">
	          <div class="product-image"><img :src="image" /></div>
	          <div class="product-info">
	            <h1>{{ title }}</h1>
	            <p v-if="inStock">In Stock</p>
	            <p v-else>Out of Stock</p>
	            <p>Shipping: {{ shipping }}</p>
	            <ul>
	              <li v-for="(detail, id) in details" :key="id">{{ detail }}</li>
	            </ul>
	            <div
	              v-for="(variant, index) in variants"
	              :key="variant.id"
	              @mouseover="updateVariant(index)"
	              class="color-circle"
	              :style="{backgroundColor: variant.color}"
	            ></div>
	            <button
	              class="button"
	              @click="addToCart"
	              :disabled="!inStock"
	              :class="{disabledButton: !inStock}"
	            >
	              Add to Cart
	            </button>
	          </div>
	        </div>
	        <review-list v-if='reviews.length' :reviews='reviews'></review-list>
	        <review-form @review-submitted='addReview'></review-form>
		</div>`,
	data() {
		return {
			product: "Socks",
			brand: "Vue Mastery",
			selectedVariant: 0,
			reviews: [],
			details: ["50% cotton", "30% wool", "20% polyester"],
			variants: [
				{
					id: 21,
					color: "green",
					quantity: 40,
					image: "./assets/images/socks_green.jpg",
				},
				{
					id: 22,
					color: "blue",
					quantity: 0,
					image: "./assets/images/socks_blue.jpg",
				},
			],
		};
	},
	methods: {
		addToCart() {
			this.$emit("add-to-cart", this.variants[this.selectedVariant].id);
		},
		updateVariant(index) {
			this.selectedVariant = index;
		},
		addReview(review) {
			this.reviews.push(review);
		},
	},
	computed: {
		title() {
			return this.brand + " " + this.product;
		},
		image() {
			return this.variants[this.selectedVariant].image;
		},
		inStock() {
			return this.variants[this.selectedVariant].quantity;
		},
		shipping() {
			if (this.premium) return "Free";
			else return 2.99;
		},
	},
});
