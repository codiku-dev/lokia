const { execSync } = require('child_process');
const path = require('path');

const MODEL_PATH = path.join(__dirname, '../assets/Llama-3.2-1B-Instruct-Q6_K_L.gguf');
const TARGET_DIR = '/storage/emulated/0/Download/lokia_models';

try {
    // Create directory in emulator
    execSync(`adb shell "mkdir -p ${TARGET_DIR}"`);
    
    // Push the file
    execSync(`adb push "${MODEL_PATH}" ${TARGET_DIR}/`);
    
    console.log('Model file pushed successfully to emulator');
} catch (error) {
    console.error('Error pushing model file:', error.message);
} 