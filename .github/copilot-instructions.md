# Microsoft Learn Documentation Extension

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

Microsoft Learn Documentation Extension (MsDocExtension2) is a Chrome Extension built with React, TypeScript, Vite, and the CRXJS plugin. The extension enhances Microsoft Learn documentation pages by adding GitHub and RSS feed buttons for easy access to source files and commit feeds.

## Working Effectively

### Environment Setup
- Install Node.js 20+ (project tested with v20.19.4)
- **CRITICAL**: Install pnpm package manager: `npm install -g pnpm`
- This project uses pnpm (has pnpm-lock.yaml) - while npm works as fallback, always use pnpm for consistency

### Bootstrap and Install Dependencies
```bash
pnpm install
```
- **Timing**: Takes ~35 seconds on first install
- **NEVER CANCEL**: Set timeout to 60+ seconds minimum
- Installs React 19.1+, TypeScript 5.8+, Vite 7+, and CRXJS plugin
- You may see warning about "Ignored build scripts: esbuild" - this is normal, run `pnpm approve-builds` if needed

### Development Workflow
```bash
# Start development server (hot reload for extension development)
pnpm run dev
```
- **Timing**: Starts in ~1 second, NEVER CANCEL
- Creates `dist/` directory with unpacked extension
- **Manual Loading**: Load `dist/` folder as unpacked extension in Chrome at chrome://extensions/
- **Browser Testing**: Enable Developer mode → Load unpacked → Select dist folder
- The extension will show as "msdoc-extension" version 2.0.0

### Build for Production
```bash
pnpm run build
```
- **Timing**: Completes in 3-4 seconds consistently, NEVER CANCEL
- **Command**: Runs `tsc -b && vite build` (TypeScript compilation + Vite bundling)
- Creates optimized extension in `dist/` directory
- Creates packaged ZIP in `release/crx-msdoc-extension-2.0.0.zip`
- **Validation**: Always verify build success with: `ls -la dist/manifest.json dist/service-worker-loader.js`

### Type Checking
```bash
npx tsc --noEmit
```
- **Timing**: Completes in ~0.5 seconds
- Always run before committing changes
- No additional linting tools configured - TypeScript handles type safety

## Extension Functionality

### Target Website
- **Domain**: https://learn.microsoft.com/*
- **Purpose**: Adds GitHub and RSS feed buttons to Microsoft Learn documentation pages
- **User Flow**: Visit any learn.microsoft.com page → see new GitHub/RSS buttons in page header

### Extension Structure
- **Content Script**: `src/content/contentScript.ts` - Injects buttons into Microsoft Learn pages
- **Background Script**: `src/background/index.ts` - Service worker for extension lifecycle
- **Manifest**: `manifest.config.ts` - Chrome extension configuration (Manifest v3)
- **Assets**: `public/logo.png` - Extension icon (48x48px)

### Key Files to Monitor
- `src/content/contentScript.ts` - Main functionality for button injection
- `src/background/index.ts` - Service worker event handling  
- `manifest.config.ts` - Extension permissions and configuration
- `package.json` - Dependencies and build scripts
- `vite.config.ts` - Build configuration with CRXJS plugin

## Validation Steps

### Always Validate After Changes
```bash
# 1. Type check
npx tsc --noEmit

# 2. Clean build
rm -rf dist release
pnpm run build

# 3. Verify extension structure
ls -la dist/manifest.json dist/service-worker-loader.js dist/public/logo.png dist/assets/
```

### Manual Testing Requirements
1. **CRITICAL**: Always test actual extension functionality after code changes
2. Load unpacked extension in Chrome from `dist/` directory
3. Navigate to https://learn.microsoft.com/en-us/azure/ (or any Microsoft Learn page)
4. **Expected Result**: Should see GitHub and RSS feed buttons added to page header
5. **Functionality Test**: Click buttons should open GitHub source and commit feeds

### Chrome Extension Loading
1. Build the extension: `pnpm run build`
2. Open Chrome → navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked"
5. Select the `dist/` directory 
6. Extension should load as "msdoc-extension" version 2.0.0
7. **Validation**: Check that permissions show "Can read and change data on learn.microsoft.com"

## Build Timing and Expectations

- **Install Dependencies**: ~35 seconds (first time), ~5 seconds (subsequent)
- **Development Server**: ~1 second startup
- **Production Build**: ~3-4 seconds consistently  
- **Type Checking**: ~0.5 seconds
- **NEVER CANCEL** any build or install commands - they complete quickly but allow sufficient timeouts

## Common Tasks Reference

### Repository Structure
```
/home/runner/work/MsDocExtension2/MsDocExtension2/
├── .github/copilot-instructions.md
├── README.md
├── package.json
├── pnpm-lock.yaml
├── manifest.config.ts
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── src/
│   ├── background/index.ts
│   └── content/contentScript.ts
├── public/logo.png
├── dist/ (generated)
└── release/ (generated)
```

### Available NPM Scripts
- `pnpm run dev` - Development server with hot reload
- `pnpm run build` - Production build + ZIP packaging  
- `pnpm run preview` - Preview built extension (starts local server)

### Technology Stack
- **React**: 19.1+ with TypeScript
- **Build Tool**: Vite 7+ with CRXJS plugin for Chrome extension support
- **Package Manager**: pnpm 10+ (preferred) or npm 10+ (fallback)
- **Extension API**: Chrome Extension Manifest v3
- **Target Browser**: Chrome/Chromium (uses chrome.* APIs)

### Development Notes
- **Hot Reload**: Development server supports hot reload for extension files
- **Source Maps**: Generated for debugging in dev mode
- **Zip Packaging**: Production build automatically creates release ZIP
- **Permissions**: Extension requests "scripting" and "tabs" permissions for Microsoft Learn domain
- **Icon**: Uses public/logo.png (48x48px) for extension icon and action button

## Troubleshooting

### Build Failures
- Ensure Node.js 20+ is installed
- Clear node_modules and reinstall: `rm -rf node_modules && pnpm install`
- Check TypeScript errors: `npx tsc --noEmit`

### Extension Loading Issues
- Verify manifest.json exists in dist/
- Check Chrome Developer Tools Console for extension errors
- Ensure all required files present: manifest.json, service-worker-loader.js, assets/

### Functionality Issues  
- Test on correct domain: https://learn.microsoft.com/*
- Check browser console for JavaScript errors
- Verify content script injection on page load
- Confirm extension has proper permissions in Chrome settings