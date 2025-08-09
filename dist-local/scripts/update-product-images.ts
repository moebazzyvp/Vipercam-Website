import fs from 'fs'
import path from 'path'

// Product categories and their image directories
const categories = {
  '3D People Counter': '3D People Counter',
  'Accessories': 'Accessories',
  'Box': 'Box',
  'Bullet': 'Bullet',
  'Dome': 'Dome',
  'Eyeball': 'Eyeball',
  'Fisheye': 'Fisheye',
  'IP Speed Dome': 'IP Speed Dome',
  'Multi-sensor / Panoramic': 'Multi-sensor _ Panoramic',
  'Pinhole': 'Pinhole',
  'PTZ': 'PTZ',
  'Thermal': 'Thermal'
}

// Manual corrections for problematic matches
const manualCorrections: Record<string, string> = {
  'GV-VD2712': 'GV-VD2702_2712-1701201504450.png', // This is the correct image for VD2712
  'GV-Cloud Bridge': 'GV-Cloud Bridge_180.png', // Use the correct Cloud Bridge image
  'GV-SD2722-IR': 'GV-SD2322-IR-1612061348200.png', // Use the available SD image
  'GV-3D People Counter V2': 'GV-3DpeopleV2_180.png', // Use the correct V2 image
  'GV-Housing102': 'GV-Housing101-1612201557120.png', // Use Housing101 as fallback
  'GV-WiFi Adaptor V2': 'WiFi USB-1612021541440.png', // Use the WiFi USB image
}

// Read products.txt to get the product list
const productsText = fs.readFileSync('product_images/products.txt', 'utf-8')
const productLines = productsText.split('\n').filter(line => line.trim())

// Parse products
const products = productLines.map(line => {
  const [productId, ...rest] = line.split(' | ')
  const categoryMatch = rest.find(part => part.startsWith('Category: '))
  const category = categoryMatch ? categoryMatch.replace('Category: ', '') : ''
  
  return {
    id: productId.trim(),
    category: category.trim()
  }
})

// Function to get available images for a category
function getAvailableImages(categoryDir: string): string[] {
  const fullPath = path.join('product_images', categoryDir)
  if (!fs.existsSync(fullPath)) {
    return []
  }
  
  const files = fs.readdirSync(fullPath)
  return files.filter(file => file.endsWith('.png'))
}

// Function to normalize product ID for matching
function normalizeProductId(id: string): string {
  return id.toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, '')
    .replace(/series/g, '')
    .trim()
}

// Function to normalize image filename for matching
function normalizeImageName(filename: string): string {
  return filename.toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, '')
    .replace(/_180\.png$/, '')
    .replace(/\.png$/, '')
    .trim()
}

// Analyze each product
const analysis = products.map(product => {
  const categoryDir = categories[product.category as keyof typeof categories]
  const availableImages = getAvailableImages(categoryDir)
  
  // Check for manual correction first
  if (manualCorrections[product.id]) {
    return {
      productId: product.id,
      category: product.category,
      categoryDir,
      availableImages,
      matchingImage: manualCorrections[product.id],
      hasImage: true,
      normalizedProductId: normalizeProductId(product.id),
      normalizedImageName: normalizeImageName(manualCorrections[product.id])
    }
  }
  
  // Find matching image with better matching logic
  const normalizedProductId = normalizeProductId(product.id)
  const matchingImage = availableImages.find(img => {
    const normalizedImageName = normalizeImageName(img)
    
    // Direct match
    if (normalizedImageName.includes(normalizedProductId) || 
        normalizedProductId.includes(normalizedImageName)) {
      return true
    }
    
    // Handle special cases
    if (product.id.includes('Series')) {
      const baseId = product.id.replace(' Series', '')
      const normalizedBaseId = normalizeProductId(baseId)
      return normalizedImageName.includes(normalizedBaseId)
    }
    
    // Handle special characters and variations
    const productIdVariations = [
      normalizedProductId,
      normalizedProductId.replace('gv', ''),
      normalizedProductId.replace(/^gv/, ''),
      product.id.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')
    ]
    
    return productIdVariations.some(variant => 
      normalizedImageName.includes(variant) || 
      variant.includes(normalizedImageName)
    )
  })
  
  return {
    productId: product.id,
    category: product.category,
    categoryDir,
    availableImages,
    matchingImage,
    hasImage: !!matchingImage,
    normalizedProductId,
    normalizedImageName: matchingImage ? normalizeImageName(matchingImage) : ''
  }
})

// Generate report
console.log('=== PRODUCT IMAGE ANALYSIS ===\n')

// Products with images
const withImages = analysis.filter(p => p.hasImage)
console.log(`✅ Products with images: ${withImages.length}`)
withImages.forEach(p => {
  console.log(`  ${p.productId} -> ${p.matchingImage}`)
})

console.log('\n❌ Products missing images:')
const missingImages = analysis.filter(p => !p.hasImage)
missingImages.forEach(p => {
  console.log(`  ${p.productId} (${p.category})`)
  if (p.availableImages.length > 0) {
    console.log(`    Available images: ${p.availableImages.join(', ')}`)
  }
})

console.log('\n📊 Summary:')
console.log(`Total products: ${products.length}`)
console.log(`With images: ${withImages.length}`)
console.log(`Missing images: ${missingImages.length}`)
console.log(`Coverage: ${((withImages.length / products.length) * 100).toFixed(1)}%`)

// Generate mapping for product-data.ts
console.log('\n=== IMAGE MAPPING FOR PRODUCT-DATA.TS ===\n')
withImages.forEach(p => {
  const imagePath = `/product_images/${p.categoryDir}/${p.matchingImage}`
  console.log(`"${p.productId}": "${imagePath}",`)
})

// Generate TypeScript object for easy copy-paste
console.log('\n=== TYPESCRIPT OBJECT ===\n')
console.log('const imageMapping = {')
withImages.forEach(p => {
  const imagePath = `/product_images/${p.categoryDir}/${p.matchingImage}`
  console.log(`  "${p.productId}": "${imagePath}",`)
})
console.log('}') 