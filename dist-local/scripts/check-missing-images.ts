import { products } from "../lib/product-data"

console.log("🔍 Checking for missing product images...\n")

const missingImages: string[] = []
const placeholderImages: string[] = []

products.forEach((product) => {
  if (product.image.includes("placeholder.svg")) {
    placeholderImages.push(`${product.id}: ${product.displayName}`)
  }

  // Check if image path exists (in a real environment, you'd check the file system)
  if (product.image.includes("placeholder.svg") || !product.image.startsWith("/products/")) {
    missingImages.push(`${product.id}: ${product.displayName} - ${product.image}`)
  }
})

console.log(`📊 Product Analysis:`)
console.log(`Total products: ${products.length}`)
console.log(`Products with placeholder images: ${placeholderImages.length}`)
console.log(`Products with missing images: ${missingImages.length}\n`)

if (placeholderImages.length > 0) {
  console.log("🖼️  Products using placeholder images:")
  placeholderImages.forEach((item, index) => {
    console.log(`${index + 1}. ${item}`)
  })
  console.log("")
}

if (missingImages.length > 0) {
  console.log("❌ Products with missing images:")
  missingImages.forEach((item, index) => {
    console.log(`${index + 1}. ${item}`)
  })
} else {
  console.log("✅ All products have proper image paths!")
}

console.log("\n📝 Summary:")
console.log(`- ${products.length - missingImages.length} products have proper images`)
console.log(`- ${missingImages.length} products need image files`)
console.log(`- ${placeholderImages.length} products are using placeholders`)

// Generate missing images list for debugging
const missingImagesList = missingImages.map((item) => item.split(":")[0]).join("\n")
console.log("\n📋 Missing image IDs for reference:")
console.log(missingImagesList)
