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
  'GV-VD2712': 'GV-VD2702_2712-1701201504450.png',
  'GV-Cloud Bridge': 'GV-Cloud Bridge_180.png',
  'GV-SD2722-IR': 'GV-SD2322-IR-1612061348200.png',
  'GV-3D People Counter V2': 'GV-3DpeopleV2_180.png',
  'GV-Housing102': 'GV-Housing101-1612201557120.png',
  'GV-WiFi Adaptor V2': 'WiFi USB-1612021541440.png',
}

// Read products.txt to get the product list
const productsText = fs.readFileSync('product_images/products.txt', 'utf-8')
const productLines = productsText.split('\n').filter(line => line.trim())

// Parse products from products.txt
const productsFromFile = productLines.map(line => {
  const [productId, ...rest] = line.split(' | ')
  const categoryMatch = rest.find(part => part.startsWith('Category: '))
  const category = categoryMatch ? categoryMatch.replace('Category: ', '') : ''
  const filtersMatch = rest.find(part => part.startsWith('Filters: '))
  const filters = filtersMatch ? filtersMatch.replace('Filters: ', '') : ''
  
  return {
    id: productId.trim(),
    category: category.trim(),
    filters: filters.trim()
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

// Analyze each product from products.txt
const analysis = productsFromFile.map(product => {
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
      normalizedImageName: normalizeImageName(manualCorrections[product.id]),
      filters: product.filters
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
    normalizedImageName: matchingImage ? normalizeImageName(matchingImage) : '',
    filters: product.filters
  }
})

// Read current product data to check what's actually in the app
const productDataContent = fs.readFileSync('lib/product-data.ts', 'utf-8')

// Extract product IDs from the product data file
const productIdMatches = productDataContent.match(/id:\s*"([^"]+)"/g) || []
const productIdsInApp = productIdMatches.map(match => match.replace(/id:\s*"/, '').replace(/"/, ''))

// Filter out non-product IDs (like filter options)
const actualProductIds = productIdsInApp.filter(id => 
  !['all', 'eyeball', 'dome', 'bullet', 'fisheye', 'multi-sensor', 'thermal', 'box', 'ptz', 'speed-dome', 'people-counter', 'pinhole', 'networking', 'accessory', 'fixed', 'varifocal', 'motorized', 'zoom', 'interchangeable', 'AI', 'WDR', 'Full Color', 'Starlight', 'Face Recognition', 'License Plate', 'Audio', 'PoE+', 'Weatherproof', 'Vandal Resistant', 'PTZ', '360°', 'Ultra HD', '2MP', '4MP', '5MP', '6MP', '8MP', '12MP', '20MP', 'IP66', 'IP67', 'IP68', 'IK10', 'IK10+', 'ai-enabled', 'ai-isp', 'face-recognition', 'face-detection', 'no-ai', 'wdr-pro', 'standard-wdr', 'no-wdr', 'full-color', 'super-low-lux'].includes(id)
)

// Generate comprehensive report
console.log('=== COMPREHENSIVE PRODUCT AUDIT ===\n')

// Products with images
const withImages = analysis.filter(p => p.hasImage)
console.log(`✅ Products with images: ${withImages.length}`)

// Products missing images
const missingImages = analysis.filter(p => !p.hasImage)
console.log(`❌ Products missing images: ${missingImages.length}`)

// Products in app vs products.txt
const productsInAppOnly = actualProductIds.filter(id => 
  !productsFromFile.some(p => normalizeProductId(p.id) === normalizeProductId(id))
)
const productsInFileOnly = productsFromFile.filter(p => 
  !actualProductIds.some(id => normalizeProductId(id) === normalizeProductId(p.id))
)

console.log(`📱 Products in app only: ${productsInAppOnly.length}`)
console.log(`📄 Products in file only: ${productsInFileOnly.length}`)

// Generate complete mapping for product data
console.log('\n=== COMPLETE IMAGE MAPPING FOR PRODUCT-DATA.TS ===\n')
console.log('const imageMapping: Record<string, string> = {')

// Map from product data IDs to image paths
const productDataToImageMapping: Record<string, string> = {}

withImages.forEach(p => {
  const imagePath = `/product_images/${p.categoryDir}/${p.matchingImage}`
  
  // Find corresponding product ID in app
  const correspondingAppId = actualProductIds.find(id => 
    normalizeProductId(id) === normalizeProductId(p.productId)
  )
  
  if (correspondingAppId) {
    productDataToImageMapping[correspondingAppId] = imagePath
    console.log(`  "${correspondingAppId}": "${imagePath}",`)
  }
})

console.log('}')

// Generate missing product report
console.log('\n=== MISSING PRODUCTS REPORT ===\n')

if (missingImages.length > 0) {
  console.log('Products missing images:')
  missingImages.forEach(p => {
    console.log(`  ${p.productId} (${p.category})`)
    if (p.availableImages.length > 0) {
      console.log(`    Available images: ${p.availableImages.join(', ')}`)
    }
  })
}

if (productsInAppOnly.length > 0) {
  console.log('\nProducts in app but not in products.txt:')
  productsInAppOnly.forEach(id => {
    console.log(`  ${id}`)
  })
}

if (productsInFileOnly.length > 0) {
  console.log('\nProducts in products.txt but not in app:')
  productsInFileOnly.forEach(p => {
    console.log(`  ${p.productId} (${p.category})`)
  })
}

// Summary
console.log('\n📊 SUMMARY:')
console.log(`Total products in products.txt: ${productsFromFile.length}`)
console.log(`Total products in app: ${actualProductIds.length}`)
console.log(`Products with images: ${withImages.length}`)
console.log(`Products missing images: ${missingImages.length}`)
console.log(`Image coverage: ${((withImages.length / productsFromFile.length) * 100).toFixed(1)}%`)

// Export the mapping for use in other scripts
export { productDataToImageMapping, analysis, productsFromFile, actualProductIds } 