import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const inputDir = path.join(process.cwd(), 'public', 'product_images')
const outputDir = path.join(process.cwd(), 'public', 'products')

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

async function optimizeImage(inputPath: string, outputPath: string) {
  try {
    await sharp(inputPath)
      .resize(800, 600, { 
        fit: 'inside',
        withoutEnlargement: true 
      })
      .webp({ 
        quality: 80,
        effort: 6 
      })
      .toFile(outputPath)
    
    console.log(`✅ Optimized: ${path.basename(inputPath)}`)
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error)
  }
}

async function processDirectory(dirPath: string, relativePath: string = '') {
  const items = fs.readdirSync(dirPath)
  
  for (const item of items) {
    const fullPath = path.join(dirPath, item)
    const stat = fs.statSync(fullPath)
    
    if (stat.isDirectory()) {
      // Create corresponding output directory
      const outputSubDir = path.join(outputDir, relativePath, item)
      if (!fs.existsSync(outputSubDir)) {
        fs.mkdirSync(outputSubDir, { recursive: true })
      }
      
      // Recursively process subdirectory
      await processDirectory(fullPath, path.join(relativePath, item))
    } else if (stat.isFile() && /\.(png|jpg|jpeg)$/i.test(item)) {
      // Process image file
      const outputPath = path.join(
        outputDir, 
        relativePath, 
        path.parse(item).name + '.webp'
      )
      
      await optimizeImage(fullPath, outputPath)
    }
  }
}

async function main() {
  console.log('🖼️  Starting image optimization...')
  console.log(`📁 Input directory: ${inputDir}`)
  console.log(`📁 Output directory: ${outputDir}`)
  
  if (!fs.existsSync(inputDir)) {
    console.error('❌ Input directory does not exist!')
    process.exit(1)
  }
  
  const startTime = Date.now()
  
  try {
    await processDirectory(inputDir)
    
    const endTime = Date.now()
    const duration = (endTime - startTime) / 1000
    
    console.log(`\n🎉 Image optimization completed in ${duration.toFixed(2)}s`)
    console.log(`📊 Optimized images saved to: ${outputDir}`)
  } catch (error) {
    console.error('❌ Error during optimization:', error)
    process.exit(1)
  }
}

main() 