const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './images';
const outputDir = './images-webp';

/**
 * Recursively walks through a directory and converts images to WebP
 */
async function convertFolder(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const relativePath = path.relative(inputDir, fullPath);
        const targetPath = path.join(outputDir, relativePath);

        if (fs.statSync(fullPath).isDirectory()) {
            // If it's a folder, create it in the output dir and dive in
            if (!fs.existsSync(targetPath)) {
                fs.mkdirSync(targetPath, { recursive: true });
            }
            await convertFolder(fullPath);
        } else {
            // If it's an image, convert it
            const ext = path.extname(fullPath).toLowerCase();
            if (['.jpg', '.jpeg', '.png', '.tiff'].includes(ext)) {
                const webpPath = targetPath.replace(ext, '.webp');
                
                await sharp(fullPath)
                    .webp({ quality: 80 })
                    .toFile(webpPath)
                    .then(() => console.log(`Converted: ${relativePath} -> .webp`))
                    .catch(err => console.error(`Error processing ${file}:`, err));
            }
        }
    }
}

console.log('🚀 Starting recursive conversion...');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
convertFolder(inputDir).then(() => console.log('✅ All images converted!'));