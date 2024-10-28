import StyleDictionary from 'style-dictionary';

function formatTokenValue(value) {
  if (typeof value === 'object' && value !== null) {
    if (value.$value) {
      return formatTokenValue(value.$value);
    }
    return Object.entries(value).reduce((acc, [key, val]) => {
      acc[key] = formatTokenValue(val);
      return acc;
    }, {});
  }
  return value;
}

function createNestedObject(tokens) {
  const result = {};
  for (const [key, value] of Object.entries(tokens)) {
    const parts = key.split('.');
    let current = result;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (i === parts.length - 1) {
        current[part] = formatTokenValue(value);
      } else {
        current[part] = current[part] || {};
        current = current[part];
      }
    }
  }
  return result;
}

StyleDictionary.registerFormat({
  name: 'javascript/nested',
  format: function({ dictionary }) {
    const nested = createNestedObject(dictionary.tokens);
    return `export const tokens = ${JSON.stringify(nested, null, 2)};`;
  }
});
