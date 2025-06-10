import { execSync, spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import inquirer from 'inquirer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEVICE_MODELS_DIR = '/storage/emulated/0/Android/data/com.lokia/files/';

async function getDeviceModels() {
    try {
        const output = execSync(`adb shell "ls ${DEVICE_MODELS_DIR}"`).toString();
        const splitOutput = output.split(/\r?\n/);
        const filteredOutput = splitOutput
            .map(file => file.trim())
            .filter(file => file.endsWith('.gguf'))
            .filter(Boolean);
        return filteredOutput;
    } catch (error) {
        console.error('❌ Error reading device models:', error.message);
        return [];
    }
}

async function listModels() {
    try {
        const deviceModels = await getDeviceModels();
        
        if (deviceModels.length === 0) {
            console.log('ℹ️ No models found on device');
            return;
        }

        console.log('\n📋 Models on device:');
        deviceModels.forEach((model, index) => {
            console.log(`${index + 1}. ${model}`);
        });
        console.log(''); // Add a newline for better readability
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

async function deleteModel() {
    try {
        const deviceModels = await getDeviceModels();
        
        if (deviceModels.length === 0) {
            console.log('ℹ️ No models found on device');
            return;
        }

        const { selectedModel } = await inquirer.prompt([
            {
                type: 'radio',
                name: 'selectedModel',
                message: 'Select a model to delete:',
                choices: deviceModels
            }
        ]);

        const { confirm } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'confirm',
                message: `Are you sure you want to delete ${selectedModel}?`,
                default: false
            }
        ]);

        if (confirm) {
            execSync(`adb shell "rm ${DEVICE_MODELS_DIR}/${selectedModel}"`);
            console.log(`✅ Model ${selectedModel} deleted successfully`);
        }
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

async function pushModel() {
    try {
        // Get list of models from assets/models directory
        const modelsDir = path.join(__dirname, '../assets/models');
        const files = fs.readdirSync(modelsDir);
        const models = files.filter(file => file.endsWith('.gguf'));

        if (models.length === 0) {
            console.error('❌ No .gguf models found in assets/models directory');
            return;
        }

        const { selectedModel } = await inquirer.prompt([
            {
                type: 'radio',
                name: 'selectedModel',
                message: 'Select a model to push:',
                choices: models
            }
        ]);

        // Create directory in app's private storage
        console.log('📁 Creating directory in app\'s private storage...');
        execSync(`adb shell "mkdir -p ${DEVICE_MODELS_DIR}"`);
        
        // Push the file directly to app's private storage
        const MODEL_PATH = path.join(modelsDir, selectedModel);
        console.log(`📤 Pushing model ${selectedModel} to device...`);
        
        return new Promise((resolve, reject) => {
            const push = spawn('adb', ['push', MODEL_PATH, DEVICE_MODELS_DIR]);
            
            push.stdout.on('data', (data) => {
                process.stdout.write(data);
            });
            
            push.stderr.on('data', (data) => {
                process.stderr.write(data);
            });
            
            push.on('close', (code) => {
                if (code === 0) {
                    console.log(`\n✅ Model ${selectedModel} pushed successfully to app's private storage`);
                    resolve();
                } else {
                    reject(new Error(`Push failed with code ${code}`));
                }
            });
        });
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

async function main() {
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                { name: '📋   List models on device', value: 'list' },
                { name: '📥   Add a model to device', value: 'push' },
                { name: '🗑️   Delete a model from device', value: 'delete' }
            ]
        }
    ]);

    if (action === 'push') {
        await pushModel();
    } else if (action === 'delete') {
        await deleteModel();
    } else {
        await listModels();
    }
}

main(); 