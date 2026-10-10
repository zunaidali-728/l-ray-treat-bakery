import fs from 'fs';
import path from 'path';

const pagesDir = path.resolve('./src/pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));

for (const file of files) {
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    if (content.includes('//>')) {
        // Fix double trailing slashes from the original regex
        content = content.replace(/<SmartImage([^>]*?)\/\/>/g, '<SmartImage$1/>');
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Fixed ${file}`);
    }
}
