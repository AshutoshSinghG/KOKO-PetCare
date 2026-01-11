// Script to copy SDK to main dist folder after build
import { copyFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const sdkSource = join(__dirname, '../dist/sdk/chatbot.js');
const sdkDest = join(__dirname, '../dist/chatbot.js');

// Check if SDK was built
if (existsSync(sdkSource)) {
    copyFileSync(sdkSource, sdkDest);
    console.log('✓ SDK copied to dist/chatbot.js');
} else {
    console.log('⚠ SDK not found at', sdkSource);
}
