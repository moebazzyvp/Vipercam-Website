import fs from 'fs'

// Image mapping from our analysis - mapping from product data IDs to image paths
const imageMapping: Record<string, string> = {
  // Eyeball cameras
  "ebd2704": "/product_images/Eyeball/GV-EBD2704_180.png",
  "ebd2705": "/product_images/Eyeball/GV-EBD2705_180.png",
  "ebd4700": "/product_images/Eyeball/GV-EBD4700_180.png",
  "ebd4701": "/product_images/Eyeball/GV-EBD4701_180.png",
  "ebd4702": "/product_images/Eyeball/GV-EBD4704_180.png", // Using 4704 image for 4702
  "ebd4704": "/product_images/Eyeball/GV-EBD4704_180.png",
  "ebd4813": "/product_images/Eyeball/GV-EBD4813_180.png",
  "ebd8800": "/product_images/Eyeball/GV-EBD8800_180.png",
  "ebd8813": "/product_images/Eyeball/GV-EBD8813_180.png",
  "ebfc5800": "/product_images/Eyeball/GV-EBFC5800_180.png",
  "geb4900": "/product_images/Eyeball/GV-GEB4900_180.png",
  "gebn4800": "/product_images/Eyeball/GV-GEBN4800_180.png",
  "geb4911": "/product_images/Eyeball/GV-GEBF4911_180.png",
  "reb5800": "/product_images/Eyeball/GV-REB5800_180.png",
  
  // Dome cameras
  "avd2700": "/product_images/Dome/GV-AVD2700_180.png",
  "efd4700": "/product_images/Dome/GV-EFD4700_180.png",
  "fd8700-fr": "/product_images/Dome/GV-FD8700-FR_180.png",
  "gdr4900": "/product_images/Dome/GV-GDR4900_180.png",
  "gvd4910": "/product_images/Dome/GV-GVD4910_180.png",
  "md8710-fd": "/product_images/Dome/GV-MD8710-FD_180.png",
  "tdr2702": "/product_images/Dome/GV-TDR2702_180.png",
  "tdr2704": "/product_images/Dome/GV-TDR2704_180.png",
  "tdr2705": "/product_images/Dome/GV-TDR2705_180.png",
  "tdr4700": "/product_images/Dome/GV-TDR4700_180.png",
  "tdr4702": "/product_images/Dome/GV-TDR4702_180.png",
  "tdr4704": "/product_images/Dome/GV-TDR4704_180.png",
  "tdr4803": "/product_images/Dome/GV-TDR4803_180.png",
  "tdr8805": "/product_images/Dome/GV-TDR8805_180.png",
  "tfd4700": "/product_images/Dome/GV-TFD4700_180.png",
  "tfd4800": "/product_images/Dome/GV-TFD4800_180.png",
  "tvd2712": "/product_images/Dome/GV-TVD2712_180.png",
  "tvd4700": "/product_images/Dome/GV-TVD4700_180.png",
  "tvd4710": "/product_images/Dome/GV-TVD4710_180.png",
  "tvd4711": "/product_images/Dome/GV-TVD4711_180.png",
  "tvd4810": "/product_images/Dome/GV-TVD4810_180.png",
  "tvd4811": "/product_images/Dome/GV-TVD4811_180.png",
  "tvd8710": "/product_images/Dome/GV-TVD8710_180.png",
  "tvd8810": "/product_images/Dome/GV-TVD8810_180.png",
  "vd2702": "/product_images/Dome/GV-VD2702_180.png",
  "vd2712": "/product_images/Dome/GV-VD2702_2712-1701201504450.png",
  "vd8700": "/product_images/Dome/GV-VD8700_180.png",
  
  // Bullet cameras
  "abl4701": "/product_images/Bullet/GV-ABL4701_180.png",
  "abl4712": "/product_images/Bullet/GV-ABL4712_180.png",
  "blfc5800": "/product_images/Bullet/GV-BLFC5800_180.png",
  "gbl4900": "/product_images/Bullet/GV-GBL4900_180.png",
  "gbl4911": "/product_images/Bullet/GV-GBL4911_180.png",
  "gbl12811": "/product_images/Bullet/GV-GBL12811_180.png",
  "gblf2802": "/product_images/Bullet/GV‐GBLF2802_180.png",
  "gbln4800": "/product_images/Bullet/GV-GBLN4800_180.png",
  "rbl5811": "/product_images/Bullet/GV-RBL5811_180.png",
  "tbl2705": "/product_images/Bullet/GV-TBL2705_180.png",
  "tbl2706": "/product_images/Bullet/GV-TBL2706_180.png",
  "tbl2718": "/product_images/Bullet/GV-TBL2718_180.png",
  "tbl4700": "/product_images/Bullet/GV-TBL4700_180.png",
  "tbl4703": "/product_images/Bullet/GV-TBL4703_180.png",
  "tbl4705": "/product_images/Bullet/GV-TBL4705_180.png",
  "tbl4711": "/product_images/Bullet/GV-TBL4711_180.png",
  "tbl4807": "/product_images/Bullet/GV-TBL4807_180.png",
  "tbl4810": "/product_images/Bullet/GV-TBL4810_180.png",
  "tbl8710": "/product_images/Bullet/GV-TBL8710_180.png",
  "tbl8810": "/product_images/Bullet/GV-TBL8810_180.png",
  "tbl8804": "/product_images/Bullet/GV-TBL8804_180.png",
  
  // Fisheye cameras
  "fer5702": "/product_images/Fisheye/GV-FER5702_180.png",
  "fer12700": "/product_images/Fisheye/GV-FER12700_180.png",
  "gfer6900": "/product_images/Fisheye/GV-GFER6900_180.png",
  "gfer12800": "/product_images/Fisheye/GV-GFER12800_180.png",
  "pfer12800": "/product_images/Fisheye/GV-PFER12800_180.png",
  "qfer12700": "/product_images/Fisheye/GV-QFER12700_180.png",
  "rfer12700": "/product_images/Fisheye/GV-RFER12700_180.png",
  
  // Multi-sensor cameras
  "ebdp5800": "/product_images/Multi-sensor _ Panoramic/GV-EBDP5800_180.png",
  "ebdp8800": "/product_images/Multi-sensor _ Panoramic/GV-EBDP8800_180.png",
  "pbl8800": "/product_images/Multi-sensor _ Panoramic/GV-PBL8800_180.png",
  "pdr8800": "/product_images/Multi-sensor _ Panoramic/GV-PDR8800_180.png",
  "tblp5800": "/product_images/Multi-sensor _ Panoramic/GV-TBLP5800_180.png",
  "tblp8800": "/product_images/Multi-sensor _ Panoramic/GV-TBLP8800_180.png",
  "tms8800": "/product_images/Multi-sensor _ Panoramic/GV-TMS8800_180.png",
  "tms20811": "/product_images/Multi-sensor _ Panoramic/GV-TMS20811_180.png",
  
  // Thermal cameras
  "tmeb5800": "/product_images/Thermal/GV-TMEB5800_180.png",
  
  // Box cameras
  "bx2700-fd": "/product_images/Box/GV-BX2700-FD_180.png",
  "bx2802": "/product_images/Box/GV-BX2802_180.png",
  "bx4700": "/product_images/Box/GV-BX4700-5700-1610061125350.png",
  "bx4802": "/product_images/Box/GV-BX4802_180.png",
  "bx12201": "/product_images/Box/GV-BX12201-1611091504410.png",
  
  // PTZ cameras
  "gptz4810": "/product_images/PTZ/GV-GPTZ4810_180.png",
  "ptz5810-ir": "/product_images/PTZ/GV-PTZ5810-IR_180.png",
  
  // Speed Dome cameras
  "qsd5730-indoor": "/product_images/IP Speed Dome/GV-QSD5730-Indoor_180.png",
  "qsd5731-ir": "/product_images/IP Speed Dome/GV-QSD5731-IR_180.png",
  "sd4825-ir": "/product_images/IP Speed Dome/GV-SD4825-IR_180.png",
  "sd4834-ir": "/product_images/IP Speed Dome/GV-SD4834-IR_180.png",
  "sd2722-ir": "/product_images/IP Speed Dome/GV-SD2322-IR-1612061348200.png",
  
  // People Counters
  "3dpeoplev2": "/product_images/3D People Counter/GV-3DpeopleV2_180.png",
  "3dpeoplecounterv3": "/product_images/3D People Counter/GV-3DPeopleCounterV3_180.png",
  
  // Accessories
  "cloud-bridge": "/product_images/Accessories/GV-Cloud Bridge_180.png",
  "cloud-bridge-pro": "/product_images/Accessories/GV-Cloud Bridge Pro_180.png",
  "housing104": "/product_images/Accessories/GV-Housing104_180.png",
  "housing102": "/product_images/Accessories/GV-Housing101-1612201557120.png",
  "joystick-v2": "/product_images/Accessories/GV-JoystickV2-1612021748050.png",
  "joystick-v3": "/product_images/Accessories/GV-Joystick V3_180.png",
  "wifi-adapter-v2": "/product_images/Accessories/WiFi USB-1612021541440.png",
  
  // Pinhole cameras
  "gph2800": "/product_images/Pinhole/GV-GPH2800_180.png",
}

// Read the current product data file
const productDataPath = 'lib/product-data.ts'
let productDataContent = fs.readFileSync(productDataPath, 'utf-8')

// Function to update image paths
function updateImagePaths() {
  let updatedContent = productDataContent
  let updateCount = 0

  // Update each product's image path
  Object.entries(imageMapping).forEach(([productId, imagePath]) => {
    // Find the product in the file and update its image path
    const imagePattern = new RegExp(`(id:\\s*"${productId}",[\\s\\S]*?image:\\s*")([^"]*)"`, 'g')
    const replacement = `$1${imagePath}"`
    
    if (imagePattern.test(updatedContent)) {
      updatedContent = updatedContent.replace(imagePattern, replacement)
      updateCount++
      console.log(`✅ Updated ${productId} -> ${imagePath}`)
    } else {
      console.log(`⚠️  Could not find image pattern for ${productId}`)
    }
  })

  return { updatedContent, updateCount }
}

// Update the file
console.log('🔄 Updating product image paths...\n')
const { updatedContent, updateCount } = updateImagePaths()

// Write the updated content back to the file
fs.writeFileSync(productDataPath, updatedContent, 'utf-8')

console.log(`\n✅ Successfully updated ${updateCount} product image paths!`)
console.log(`📁 Updated file: ${productDataPath}`)
console.log(`📊 Total products with images: ${Object.keys(imageMapping).length}`) 