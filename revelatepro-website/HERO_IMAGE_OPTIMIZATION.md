# Hero Image Optimization Guide

## 📱 Mobile Performance Optimization

This project uses responsive images to deliver optimized hero images for different device types, significantly improving mobile loading performance.

## 🖼️ Required Image Files

Create these optimized image files from your original `hero-revalate.jpg`:

### Mobile Images (640px width)
- `hero-mobile.webp` - 640×1138px, WebP format, quality 80-85%
- `hero-mobile-2x.webp` - 1280×2276px, WebP format (for high-DPI displays)
- `hero-mobile.jpg` - 640×1138px, JPEG format, quality 80-85% (fallback)
- `hero-mobile-2x.jpg` - 1280×2276px, JPEG format (fallback for high-DPI)

### Tablet Images (1024px width)
- `hero-tablet.webp` - 1024×768px, WebP format, quality 85-90%
- `hero-tablet-2x.webp` - 2048×1536px, WebP format
- `hero-tablet.jpg` - 1024×768px, JPEG format, quality 85-90%
- `hero-tablet-2x.jpg` - 2048×1536px, JPEG format

### Desktop Images (1920px width)
- `hero-desktop.webp` - 1920×1080px, WebP format, quality 90-95%
- `hero-desktop-2x.webp` - 3840×2160px, WebP format
- `hero-desktop.jpg` - 1920×1080px, JPEG format, quality 90-95%
- `hero-desktop-2x.jpg` - 3840×2160px, JPEG format

## 🛠️ Image Generation Commands

### Using ImageMagick (recommended)

```bash
# Mobile WebP (640x1138)
magick hero-revalate.jpg -resize 640x1138^ -gravity center -extent 640x1138 -quality 85 -format webp hero-mobile.webp
magick hero-revalate.jpg -resize 1280x2276^ -gravity center -extent 1280x2276 -quality 85 -format webp hero-mobile-2x.webp

# Mobile JPEG (640x1138)
magick hero-revalate.jpg -resize 640x1138^ -gravity center -extent 640x1138 -quality 85 hero-mobile.jpg
magick hero-revalate.jpg -resize 1280x2276^ -gravity center -extent 1280x2276 -quality 85 hero-mobile-2x.jpg

# Tablet WebP (1024x768)
magick hero-revalate.jpg -resize 1024x768^ -gravity center -extent 1024x768 -quality 90 -format webp hero-tablet.webp
magick hero-revalate.jpg -resize 2048x1536^ -gravity center -extent 2048x1536 -quality 90 -format webp hero-tablet-2x.webp

# Tablet JPEG (1024x768)
magick hero-revalate.jpg -resize 1024x768^ -gravity center -extent 1024x768 -quality 90 hero-tablet.jpg
magick hero-revalate.jpg -resize 2048x1536^ -gravity center -extent 2048x1536 -quality 90 hero-tablet-2x.jpg

# Desktop WebP (1920x1080)
magick hero-revalate.jpg -resize 1920x1080^ -gravity center -extent 1920x1080 -quality 95 -format webp hero-desktop.webp
magick hero-revalate.jpg -resize 3840x2160^ -gravity center -extent 3840x2160 -quality 95 -format webp hero-desktop-2x.webp

# Desktop JPEG (1920x1080)
magick hero-revalate.jpg -resize 1920x1080^ -gravity center -extent 1920x1080 -quality 95 hero-desktop.jpg
magick hero-revalate.jpg -resize 3840x2160^ -gravity center -extent 3840x2160 -quality 95 hero-desktop-2x.jpg
```

### Using Sharp (Node.js)

```javascript
const sharp = require('sharp');

// Mobile images
sharp('hero-revalate.jpg')
  .resize(640, 1138, { fit: 'cover', position: 'center' })
  .webp({ quality: 85 })
  .toFile('hero-mobile.webp');

sharp('hero-revalate.jpg')
  .resize(640, 1138, { fit: 'cover', position: 'center' })
  .jpeg({ quality: 85 })
  .toFile('hero-mobile.jpg');

// Repeat for other sizes...
```

### Using Online Tools

1. **Squoosh.app** (Google's image optimizer)
   - Upload your original image
   - Set dimensions and quality
   - Download WebP and JPEG versions

2. **TinyPNG/TinyJPG**
   - For JPEG compression
   - Maintains quality while reducing file size

## 📊 Expected File Sizes

| Device | WebP Size | JPEG Size | Savings |
|--------|-----------|-----------|---------|
| Mobile | ~50-80KB | ~120-180KB | ~60% |
| Tablet | ~80-120KB | ~200-300KB | ~60% |
| Desktop | ~150-250KB | ~400-600KB | ~60% |

## 🚀 Performance Benefits

- **Mobile loading time**: 60-70% faster
- **Data usage**: Reduced by 60% on mobile
- **Core Web Vitals**: Improved LCP (Largest Contentful Paint)
- **User experience**: Faster initial page load

## 📱 Mobile-Specific Optimizations

- **Aspect ratio**: 9:16 for mobile to reduce cropping
- **Focus area**: Banner text positioned optimally
- **File size**: Aggressive compression for mobile networks
- **Format**: WebP first with JPEG fallback

## 🔧 Installation

1. Generate all required image files using the commands above
2. Place them in the `/public` directory
3. Images will be automatically served based on device capabilities

## ✅ Testing

Test the optimization by:
1. Opening Developer Tools
2. Going to Network tab
3. Switching to mobile device simulation
4. Refreshing the page
5. Checking image file sizes loaded

The mobile device should load the smaller, optimized images instead of the original large file.
