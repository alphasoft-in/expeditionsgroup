
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.resolve(__dirname, '../src/assets');
const SRC_DIR = path.resolve(__dirname, '../src');

// Recursive function to get all image files
function getFiles(dir, extensions) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function (file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getFiles(file, extensions));
        } else {
            const ext = path.extname(file).toLowerCase();
            if (extensions.includes(ext)) {
                results.push(file);
            }
        }
    });
    return results;
}

// Function to update references in code files
function updateReferences(oldName, newName) {
    const codeFiles = getFiles(SRC_DIR, ['.astro', '.jsx', '.tsx', '.ts', '.js']);
    // Normalize paths for consistent replacement
    // We only care about the filename or relative path part usually imported
    // Imports usually look like: import foo from "../assets/slides/bar.png"
    // We can replace the extension if the basename matches.

    // Strategy: Read all files, look for the EXACT string of the filename or partial path.
    // Simpler strategy: Just regex replace `filename.png` with `filename.avif` in all files?
    // That might be risky if two files have same name but different dirs.
    // Better: Replace `.png";` or `.png';` or `.png"` if the file checks out?

    // Let's use the basename.
    const oldBase = path.basename(oldName);
    const newBase = path.basename(newName);

    let updatedCount = 0;

    codeFiles.forEach(file => {
        let content = fs.readFileSync(file, 'utf8');
        // Regex to find the import: 
        // 1. Literal match of the filename

        if (content.includes(oldBase)) {
            // Create a regex that ensures we are replacing the extension at the end of the filename
            // Escape dots
            const regex = new RegExp(oldBase.replace('.', '\\.'), 'g');
            const newContent = content.replace(regex, newBase);

            if (newContent !== content) {
                fs.writeFileSync(file, newContent, 'utf8');
                console.log(`Updated reference in ${path.relative(SRC_DIR, file)}`);
                updatedCount++;
            }
        }
    });
    return updatedCount;
}

async function convertImages() {
    console.log('Scanning for images in ' + ASSETS_DIR);
    const images = getFiles(ASSETS_DIR, ['.png', '.jpg', '.jpeg']);

    console.log(`Found ${images.length} images to convert.`);

    for (const imagePath of images) {
        const ext = path.extname(imagePath);
        const newPath = imagePath.replace(ext, '.avif');

        console.log(`Converting: ${path.basename(imagePath)} -> ${path.basename(newPath)}`);

        try {
            await sharp(imagePath)
                .avif({ quality: 80 })
                .toFile(newPath);

            // Verify new file exists
            if (fs.existsSync(newPath)) {
                // Update code references
                updateReferences(imagePath, newPath);

                // Delete old file
                fs.unlinkSync(imagePath);
                console.log('Conversion successful. Old file deleted.');
            }
        } catch (err) {
            console.error(`Error converting ${imagePath}:`, err);
        }
    }

    console.log('All done!');
}

convertImages();
