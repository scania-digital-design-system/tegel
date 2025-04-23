#!/usr/bin/env node
import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const FILE_ID = process.env.FIGMA_FILE_ID;

console.log(FIGMA_TOKEN, FILE_ID);

// Get current file's directory
const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = path.dirname(currentFilePath);

// Get target directory from command line argument, resolve to absolute path
const targetDir = path.resolve(process.cwd(), process.argv[2] || './src/tokens');

// Define output paths
const SCSS_OUTPUT_PATH = path.join(targetDir, 'tokens.scss');

async function fetchFigmaVariables() {
    try {
        console.log("🔄 Fetching variables from Figma...");
        
        // Add this line to bypass SSL verification
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        
        const response = await fetch(`https://api.figma.com/v1/files/${FILE_ID}/variables/local`, {
            headers: { 'X-Figma-Token': FIGMA_TOKEN }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        // Ensure target directory exists
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        // Save full response for debugging
        fs.writeFileSync(
            path.join(targetDir, 'figma-response.json'), 
            JSON.stringify(data, null, 2)
        );

        console.log("✅ Variables JSON saved. Now processing...");

        generateSCSS(data);

    } catch (error) {
        console.error('❌ Error fetching Figma variables:', error);
    }
}

function resolveVariableAlias(value, variables, depth = 0) {
    // Prevent infinite recursion
    if (depth > 10) return null;

    if (value && value.type === 'VARIABLE_ALIAS') {
        const referencedVar = variables[value.id];
        if (referencedVar) {
            const firstModeValue = Object.values(referencedVar.valuesByMode)[0];
            return resolveVariableAlias(firstModeValue, variables, depth + 1);
        }
    }
    return value;
}

function generateSCSS(data) {
    console.log("🔄 Generating SCSS variables...");

    const variables = data.meta.variables;
    let scssOutput = `:root {\n`;

    // Define structured categories
    const categories = {
        colors: {
            "traton-blue": [],
            "traton-yellow": [],
            "traton-warm-grey": [],
            "traton-transparent": [],
            "traton-transparent-inverse": [],
            "traton-base": [],
            "traton-extended-red": [],
            "traton-extended-green": [],
            "misc": []
        },
        typography: {
            "kerning": [],
            "font-size": [],
            "line-height": [],
            "font-family": [],
            "font-weight": [],
            "misc": []
        }
    };

    // Process variables
    for (const varId in variables) {
        const variable = variables[varId];
        const name = variable.name.toLowerCase().replace(/\//g, "-");
        const firstModeValue = Object.values(variable.valuesByMode)[0];
        const resolvedValue = resolveVariableAlias(firstModeValue, variables);

        // Process COLOR variables
        if (variable.resolvedType === "COLOR") {
            processColorVariable(variable, name, categories.colors, resolvedValue);
        }
        // Process Typography-related variables
        else if (variable.name.toLowerCase().includes('typography') || 
                 ['float', 'string'].includes(variable.resolvedType.toLowerCase())) {
            processTypographyVariable(variable, name, categories.typography, resolvedValue);
        }
    }

    // Generate output
    scssOutput += generateCategoryOutput("Colors", categories.colors);
    scssOutput += generateCategoryOutput("Typography", categories.typography);
    scssOutput += "}\n";

    // Save the SCSS output
    fs.writeFileSync(SCSS_OUTPUT_PATH, scssOutput);
    console.log(`✅ SCSS variables saved to ${SCSS_OUTPUT_PATH}`);
}

function processColorVariable(variable, name, colorCategories, resolvedValue) {
    if (resolvedValue && resolvedValue.r !== undefined) {
        const rgba = `rgba(${Math.round(resolvedValue.r * 255)}, ${Math.round(resolvedValue.g * 255)}, ${Math.round(resolvedValue.b * 255)}, ${resolvedValue.a})`;

        let added = false;
        for (const category in colorCategories) {
            if (name.includes(category)) {
                colorCategories[category].push(`  --${name}: ${rgba};`);
                added = true;
                break;
            }
        }

        if (!added) {
            colorCategories["misc"].push(`  --${name}: ${rgba};`);
        }
    }
}

function processTypographyVariable(variable, name, typographyCategories, resolvedValue) {
    let value;

    // Handle different types of typography values
    switch (variable.resolvedType) {
        case "FLOAT":
            value = resolvedValue;
            break;
        case "STRING":
            value = typeof resolvedValue === 'string' ? `"${resolvedValue}"` : resolvedValue;
            break;
        default:
            value = resolvedValue;
    }

    // Skip if value is undefined or an unresolved object
    if (value === undefined || value === null || value === '[object Object]') {
        console.log(`Skipping invalid value for ${name}`);
        return;
    }

    let added = false;
    for (const category in typographyCategories) {
        if (name.includes(category)) {
            typographyCategories[category].push(`  --${name}: ${value};`);
            added = true;
            break;
        }
    }

    if (!added) {
        typographyCategories["misc"].push(`  --${name}: ${value};`);
    }
}

function generateCategoryOutput(sectionTitle, categories) {
    let output = `  /* ${sectionTitle} */\n`;
    for (const category in categories) {
        if (categories[category].length > 0) {
            const formattedCategory = category
                .replace('-', ' ')
                .replace('traton', 'Traton')
                .replace('misc', 'Miscellaneous');
            output += `  /* ${formattedCategory} */\n`;
            output += categories[category].join("\n") + "\n\n";
        }
    }
    return output;
}

// Run the script
fetchFigmaVariables();
