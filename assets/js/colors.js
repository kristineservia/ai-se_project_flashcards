const colorMap = {
  green: "#64d583",
  blue: "#91a8f9",
  orange: "#ee955e",
  pink: "#ee92d7",
  purple: "#aa8ef0",
  yellow: "#f5d770",
  default: "#64d583",
};

/**
 * Function converts a color-name string, like "blue", into its corresponding
 * hexadecimal color string, like "#91a8f9". If the provided color-name string isn't found
 * in the colorMap object, return the colorMap.default hexadecimal color string of "#64d583".
 *
 *
 * @param {string} colorName
 * @returns {string} A hexadecimal color string.
 */
function stringToHex(colorName) {
  const color = colorMap[colorName];

  return color || colorMap.default;
}

/**
 * Does the reverse of stringToHex(). This function converts a hexadecimal color string,
 * like "#91a8f9", into its corresponding color-name string, like "blue".
 * Accepts a hexadecimal string and returns the corresponding color-name key,
 * if found in colorMap. If a match isn't found, null is returned.
 *
 * @param {string} hexValue - The hexadecimal color string value to convert into a color-name.
 * @returns {string|null} - The corresponding color-name string, or null if no match is found.
 */
function hexToString(hexValue) {
  const colorString = Object.keys(colorMap).find((key) => {
    return colorMap[key] === hexValue;
  });

  return colorString || null;
}

/**
 * Function that removes any color-related BEM CSS classes, such as "card_color_blue",
 * from an HTML element while leaving its other classes unchanged.
 *
 * The function checks each class on the element and removes any class that contains "_color_".
 *
 * @param {HTMLElement} element - The HTML element whose color classes will be removed.
 */
function removeColorClasses(element) {
  [...element.classList].forEach((cls) => {
    if (cls.includes("_color_")) {
      element.classList.remove(cls);
    }
  });
}

export { stringToHex, hexToString, removeColorClasses };
