/**
 * Formats a complex address object into a single line string for labels.
 * 
 * @param {Object} address - The address data.
 * @param {string} address.street - The street name and number.
 * @param {string} address.city - The city.
 * @param {string} address.zip - The postal code.
 * @param {string} address.country - The ISO country code.
 * @returns {string} The formatted address string.
 */
function formatShippingLabel(address) {
  return `${address.street}, ${address.city}, ${address.zip}, ${address.country}`;
}

/**
 * Calculates the estimated delivery date based on shipping method and distance.
 */
function calculateDeliveryDate(shippingMethod, distanceInKm) {
  const today = new Date();
  let daysToAdd = 0;

  if (shippingMethod === "EXPRESS") {
    daysToAdd = Math.ceil(distanceInKm / 1000);
  } else {
    daysToAdd = Math.ceil(distanceInKm / 300) + 2;
  }

  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + daysToAdd);
  return deliveryDate.toDateString();
}

/**
 * Filter a list of shipments by their status.
 */
function filterShipmentsByStatus(shipments, targetStatus) {
  return shipments.filter(shipment => shipment.status === targetStatus);
}

// ---------------------------------------------------------
// ADVANCED LOGISTICS FUNCTIONS (STUDENT TASKS)
// ---------------------------------------------------------

function calculateFuelSurcharge(distance, fuelPrice, vehicleType) {
  const baseRate = 0.05;
  const multipliers = { "TRUCK": 1.5, "VAN": 1.2, "CAR": 1.0 };
  const multiplier = multipliers[vehicleType] || 1.0;
  return distance * fuelPrice * baseRate * multiplier;
}

function processRefund(order, reason) {
  if (order.status !== "DELIVERED") {
    return { success: false, error: "Order must be delivered before refunding." };
  }
  
  const refundAmount = order.total * 0.9; // 10% restocking fee
  return { 
    success: true, 
    refundAmount, 
    reason, 
    processedDate: new Date().toISOString() 
  };
}

function validateShippingLabel(labelData) {
  const requiredFields = ["sender", "receiver", "weight", "trackingNumber"];
  const missingFields = requiredFields.filter(field => !labelData[field]);
  
  return {
    isValid: missingFields.length === 0,
    missingFields
  };
}
