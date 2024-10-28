import StyleDictionary from 'style-dictionary';
import config from './style-dictionary.config.js';



const myStyleDictionary = new StyleDictionary(config);

await myStyleDictionary.cleanAllPlatforms();
await myStyleDictionary.buildAllPlatforms();