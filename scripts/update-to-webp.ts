import fs from 'fs'
import path from 'path'

const productDataPath = path.join(process.cwd(), 'lib', 'product-data.ts')
const productsDir = path.join(process.cwd(), 'public', 'products')

// Read the product data file
const productDataContent = fs.readFileSync(productDataPath, 'utf-8')

// Function to convert PNG path to WebP path
function convertToWebP(imagePath: string): string {
  if (!imagePath || imagePath === '/placeholder.svg') {
    return imagePath
  }
  
  // Extract the filename and convert to WebP
  const filename = path.basename(imagePath, path.extname(imagePath))
  const category = path.dirname(imagePath).split('/').pop()
  
  return `/products/${category}/${filename}.webp`
}

// Update image paths in the product data
let updatedContent = productDataContent

// Find and replace image paths
const imagePathRegex = /image:\s*"([^"]+)"/g
updatedContent = updatedContent.replace(imagePathRegex, (match, imagePath) => {
  const webpPath = convertToWebP(imagePath)
  return `image: "${webpPath}"`
})

// Write the updated content back to the file
fs.writeFileSync(productDataPath, updatedContent, 'utf-8')

console.log('✅ Updated product data to use WebP images')
console.log('📊 All image paths converted to optimized WebP format') 