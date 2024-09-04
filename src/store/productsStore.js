import { create as createStore } from "zustand";

export const useStore = createStore((set, get) => ({
  products: [],
  cart: [],
  searchTerm: "",
  searchType: "title",
  setSearchType: (type) => set({ searchType: type }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  clearCart: () => set({ cart: [] }),
  initializeProducts: (products) => set({ products: products }),
  updateProductStock: (product, operation) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === product.id ? { ...p, inStock: p.inStock + operation } : p
      )
    })),
  addToCart: (productId, quantity = 1) =>
    set((state) => {
      const product = state.products.find((p) => p.id === productId);
      if (product) {
        if (product.inStock <= 0 && quantity > 0) {
          return {};
        }

        const existingCartItem = state.cart.find(
          (item) => item.id === productId
        );
        if (existingCartItem) {
          const newQuantity = existingCartItem.quantity + quantity;

          if (newQuantity > 0) {
            state.updateProductStock(product, -quantity);
            return {
              cart: state.cart.map((item) =>
                item.id === productId
                  ? { ...item, quantity: newQuantity }
                  : item
              )
            };
          } else {
            state.updateProductStock(product, existingCartItem.quantity);
            return {
              cart: state.cart.filter((item) => item.id !== productId)
            };
          }
        } else if (quantity > 0 && product.inStock > 0) {
          state.updateProductStock(product, -quantity);
          return {
            cart: [
              ...state.cart,
              {
                ...product,
                quantity,
                total: function () {
                  return this.quantity * this.price;
                }
              }
            ]
          };
        }
      }
      return {};
    }),

  // Selector function for search results
  searchProducts: (type) => {
    const products = get().products;
    if (type === "category") {
      return products.filter((product) =>
        product.category
          .map((str) => str.toLowerCase())
          .includes(get().searchTerm.toLowerCase())
      );
    } else if (type === "title") {
      return products.filter((product) =>
        product.title.toLowerCase().includes(get().searchTerm.toLowerCase())
      );
    }
    return [];
  }
}));
