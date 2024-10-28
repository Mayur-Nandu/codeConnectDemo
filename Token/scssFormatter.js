import StyleDictionary from 'style-dictionary';

function formatVariableName(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .replace(/[()]/g, '')
    .replace(/&/g, 'and')
    .toLowerCase();
}

function formatTokenValue(token) {
  const type  = token['$type'];
  const value = token['$value']

  console.log("🚀 ~ formatTokenValue ~ type:", type)
  if (type === 'boxShadow') {
    const { x, y, blur, spread, color } = value;
    return `${x}px ${y}px ${blur}px ${spread}px ${color}`;
  }
  
  if (typeof value === 'string' && value.includes('linear-gradient')) {
    return `#{${value}}`;
  }
  
  return value;
}

StyleDictionary.registerFormat({
  name: 'scss/custom-variables',
  format: function({ dictionary }) {
    let output = '@mixin define-variables {\n';

    dictionary.allTokens.forEach(token => {
      const path = token.path.map(formatVariableName);
      const name = `--${path.join('-')}`;
      const value = formatTokenValue(token);
      output += `  ${name}: ${value};\n`;
    });

    output += '}\n\n';
    output += ':root {\n  @include define-variables;\n}\n\n';

    // Utility functions
    output += '// Utility functions\n';
    output += '@function color($name) {\n  @return var(--#{$name});\n}\n\n';
    output += '@function font-size($size) {\n  @return var(--font-size-#{$size});\n}\n\n';
    output += '@function font-weight($weight) {\n  @return var(--font-weight-#{$weight});\n}\n\n';
    output += '@function line-height($height) {\n  @return var(--line-height-#{$height});\n}\n';

    return output;
  }
});