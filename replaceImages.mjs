import fs from 'fs';
import path from 'path';

const pagesDir = path.resolve('./src/pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));
let totalReplaced = 0;

for (const file of files) {
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // We only touch file if it has "<img"
    if (!content.includes('<img')) continue;
    
    // Ensure import exists (skip if already has SmartImage to prevent double imports)
    if (!content.includes('SmartImage')) {
        content = content.replace(/(import .*?;\n)/, `$1import SmartImage from '../components/SmartImage';\n`);
    }

    // Replace <img ... /> or <img ... > with <SmartImage />
    const originalLength = content.length;
    content = content.replace(/<img([^>]*)>/g, '<SmartImage$1/>');
    
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${file}`);
    totalReplaced++;
}

console.log(`Successfully migrated ${totalReplaced} files bounding SmartImage handling globally.`);
