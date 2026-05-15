import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load env vars
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../.env.local');

dotenv.config({ path: envPath });

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
  console.error("Missing Cloudinary environment variables in .env.local");
  process.exit(1);
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const IMAGES_DIR = path.resolve(__dirname, '../public/images');
const CLOUDINARY_FOLDER = 'fibercity';

async function uploadImages() {
  console.log(`Scanning directory: ${IMAGES_DIR}`);
  
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`Directory not found: ${IMAGES_DIR}`);
    return;
  }

  const files = fs.readdirSync(IMAGES_DIR);
  const imageFiles = files.filter(file => /\.(jpg|jpeg|png|webp|avif|svg)$/i.test(file));
  
  console.log(`Found ${imageFiles.length} images to upload.`);
  
  const results = [];

  for (const file of imageFiles) {
    const filePath = path.join(IMAGES_DIR, file);
    const publicId = path.parse(file).name; // Use filename without extension as public_id
    
    console.log(`Uploading ${file}...`);
    
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: CLOUDINARY_FOLDER,
        public_id: publicId,
        resource_type: 'auto',
        overwrite: true
      });
      
      console.log(`✅ Success: ${result.secure_url}`);
      results.push({
        file,
        url: result.secure_url,
        public_id: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes
      });
    } catch (error) {
      console.error(`❌ Failed to upload ${file}:`, error);
    }
  }

  console.log('\n--- Upload Summary ---');
  console.log(`Successfully uploaded: ${results.length}/${imageFiles.length}`);
  
  // Write a mapping file for reference
  const mappingPath = path.resolve(__dirname, 'cloudinary-mapping.json');
  fs.writeFileSync(mappingPath, JSON.stringify(results, null, 2));
  console.log(`Mapping saved to ${mappingPath}`);
  
  return results;
}

uploadImages()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
