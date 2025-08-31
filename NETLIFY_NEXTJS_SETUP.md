# Netlify + Next.js Setup Guide

1. **Install Netlify CLI (optional, for local testing):**
   ```sh
   npm install -g netlify-cli
   ```

2. **Install the Netlify Next.js Plugin:**
   In your project root, run:
   ```sh
   npm install --save-dev @netlify/plugin-nextjs
   ```

3. **Add the Plugin to netlify.toml:**
   Create a `netlify.toml` file in your project root with:
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

4. **Set Environment Variables:**
   - In Netlify dashboard, go to Site settings > Environment variables.
   - Add all variables from your `.env.local` (e.g., `DB_HOST`, `DB_USER`, etc.).

5. **Deploy:**
   - Push your code to your Git provider (GitHub, GitLab, Bitbucket).
   - Connect your repo to Netlify and deploy.

6. **Notes:**
   - API routes and SSR/ISR pages will work only with the plugin.
   - If you use custom server features, you may need additional configuration.

For more details, see: https://github.com/netlify/netlify-plugin-nextjs
