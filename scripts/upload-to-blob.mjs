import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.BLOB_READ_WRITE_TOKEN;

async function uploadDir(dirPath) {
  const folders = fs.readdirSync(dirPath);
  const results = {};

  for (const folder of folders) {
    const fullPath = path.join(dirPath, folder);
    if (fs.lstatSync(fullPath).isDirectory()) {
      const files = fs.readdirSync(fullPath);
      results[folder] = [];
      
      for (const file of files) {
        const filePath = path.join(fullPath, file);
        const fileBuffer = fs.readFileSync(filePath);
        
        console.log(`Uploading ${folder}/${file}...`);
        const blob = await put(`products/${folder}/${file}`, fileBuffer, {
          access: 'public',
          token: token
        });
        
        results[folder].push({
          name: file,
          url: blob.url
        });
      }
    }
  }
  return results;
}

uploadDir('./web')
  .then(results => {
    fs.writeFileSync('./scripts/uploaded_assets.json', JSON.stringify(results, null, 2));
    console.log('Upload complete! Results saved to ./scripts/uploaded_assets.json');
  })
  .catch(err => {
    console.error('Error uploading:', err);
  });
