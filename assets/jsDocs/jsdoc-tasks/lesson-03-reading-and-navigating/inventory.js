/**
 * Updates the stock level for a specific product.
 * 
 * @param {string} productId - The unique identifier for the product (e.g., "APP-001").
 * @param {number} quantity - The amount to add (positive) or subtract (negative).
 * @returns {boolean} True if the stock was successfully updated, false if productId was not found.
 */
function updateStock(productId, quantity) {
  // Logic for updating stock
  return true;
}

/**
 * Calculates the sales tax for an item based on the state.
 * 
 * @param {number} price - The price of the item.
 * @param {string} stateCode - The two-letter state code (e.g., "NY", "CA").
 * @returns {number} The calculated tax amount.
 */
function calculateTax(price, stateCode) {
  const taxRates = { "NY": 0.08, "CA": 0.09, "TX": 0.06 };
  const rate = taxRates[taxRates] || 0.05;
  return price * rate;
}

/**
 * [BUG HUNT] 
 * This documentation claims the function returns a boolean (true/false),
 * but if you read the code, it's actually returning a formatted string.
 * 
 * @param {string} productName - The name of the item.
 * @param {number} currentStock - How many are left in the warehouse.
 * @returns {boolean} A formatted alert message.
 */
function getRestockAlert(productName, currentStock) {
  if (currentStock < 10) {
    return `ALERT: ${productName} is low on stock (${currentStock} left).`;
  }
  return `Stock level for ${productName} is healthy.`;
}

// ---------------------------------------------------------
// NEW UTILITY FUNCTIONS (NEEDS DOCUMENTATION)
// ---------------------------------------------------------

function applyBulkDiscount(items, threshold, discountRate) {
  return items.map(item => {
    if (item.quantity >= threshold) {
      return { ...item, price: item.price * (1 - discountRate) };
    }
    return item;
  });
}

function calculateInventoryValue(inventory) {
  return inventory.reduce((total, product) => {
    return total + (product.price * product.stock);
  }, 0);
}

function generateProductSKU(category, name, id) {
  const prefix = category.substring(0, 3).toUpperCase();
  const code = name.substring(0, 2).toUpperCase();
  return `${prefix}-${code}-${id}`;
}
