# 🚀 Hostinger Deployment Guide for electrobolt.electro

This guide provides step-by-step instructions for hosting **electrobolt.electro AI Product Advisor** on **Hostinger** (Shared Web Hosting, Cloud Hosting, or VPS).

---

## 📦 What Was Converted For Hostinger

The project has been converted and bundled into two ready-to-use artifacts:
1. **`hostinger-deployment.zip`** (274 KB) — **Recommended**: A single zip archive ready to upload to Hostinger's File Manager and extract with 1 click.
2. **`hostinger-package/`** — An uncompressed folder containing all converted files if you prefer FTP.

### Key Hostinger Platform Adaptations:
- **`.htaccess` (LiteSpeed / Apache Optimized)**: Configures SPA rewrite routing (prevents 404 on page reload), sets up browser caching for static assets, enables Gzip/Brotli compression, and adds security headers.
- **Native PHP API Layer (`api/`)**: Hostinger Shared Hosting runs PHP out of the box with zero configuration required. The API endpoints (`/api/chat`, `/api/products`, `/api/leads`, `/api/health`) are implemented in PHP so the full app works immediately without needing a separate Node.js server.
- **Node.js & PM2 Support (`server.cjs` + `ecosystem.config.cjs`)**: If you are using Hostinger Business/Cloud Hosting or Hostinger VPS with Node.js, the standalone bundled server and PM2 process configuration are included.
- **Catalogue Synchronization (`api/products.json`)**: Pre-synchronized database of all 31 verified electrical & electronics products.

---

## 🛠️ Method 1: Hostinger Shared Web Hosting (Easiest & Fastest)
*Works on Single, Premium, and Business Web Hosting plans.*

### Step 1: Access Hostinger hPanel File Manager
1. Log in to [Hostinger hPanel](https://hpanel.hostinger.com).
2. Go to **Websites** and click **Manage** next to your domain.
3. In the sidebar, navigate to **Files** ➔ **File Manager** (Access files of your domain).
4. Double-click to open the **`public_html`** directory.

### Step 2: Upload and Extract
1. If there is a default Hostinger `default.php` or `index.php` placeholder, delete it.
2. Click the **Upload** icon in the top right menu, choose **File**, and select **`hostinger-deployment.zip`**.
3. Once uploaded, right-click **`hostinger-deployment.zip`** and select **Extract**.
4. Set the extraction destination to **`public_html`** and click **Extract**.
5. Delete the uploaded `.zip` file to keep your storage clean.

### Step 3: Configure Gemini API Key (Optional)
The application has a built-in **Grounded Rule Engine** that works immediately without any API key. However, to enable live Gemini AI models:
1. In `public_html`, find or create a **`.env`** file.
2. Add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
3. Save the file. The PHP and Node handlers will automatically read this key.

### Step 4: Test Your Live Website
Visit your domain in any browser:
- Home & Chat: `https://yourdomain.com/`
- API Health: `https://yourdomain.com/api/health`
- Products Catalogue: `https://yourdomain.com/api/products`

---

## ⚙️ Method 2: Hostinger Node.js Application (hPanel Node.js Selector & Git Deploy)
*For Hostinger plans with Node.js support (Cloud, Business, VPS, or Hostinger Git Deployment).*

### Configuration Parameters:
- **Node.js version**: `18.x`, `20.x`, or `22.x`
- **Application root**: Path where files are placed (e.g., `/home/u123456789/public_html` or `/domains/yourdomain.com/public_html`)
- **Application startup file / Entry File**: **`server.js`**
  *(A universal `server.js` entry point is provided at the root and in `dist/`. It automatically resolves and launches the production Express server seamlessly).*
- **Build Command**: `npm run build`
- **Output Directory**: Leave empty or set to `dist` (Since Express serves its own compiled static files directly from `dist`, the backend handles routing).
- **Run NPM Install**: Click **Run NPM Install** (or run `npm install`)
- **Environment Variables**:
  - `GEMINI_API_KEY`: your Gemini API key (optional, for AI generation)
  - `PORT`: set by Hostinger automatically, or defaults to 3000

---

## 🖥️ Method 3: Hostinger VPS (Ubuntu / Debian + PM2)
*For Hostinger KVM VPS plans.*

1. Connect via SSH to your Hostinger VPS:
   ```bash
   ssh root@your_vps_ip
   ```
2. Create project directory and upload files:
   ```bash
   mkdir -p /var/www/electrobolt
   cd /var/www/electrobolt
   ```
3. Start with PM2:
   ```bash
   npm install -g pm2
   pm2 start ecosystem.config.cjs --env production
   pm2 save
   pm2 startup
   ```
4. Configure Nginx Reverse Proxy:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com www.yourdomain.com;

       location / {
           proxy_pass http://127.0.0.1:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
5. Install SSL using Certbot:
   ```bash
   certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

---

## 🔄 How to Re-build Hostinger Package After Future Changes

Whenever you modify product data, components, or styles in this project:
```bash
npm run build:hostinger
```
This single command re-compiles the React app, syncs the product catalogue, regenerates the `.htaccess` and PHP endpoints, and creates a fresh `hostinger-deployment.zip`.
