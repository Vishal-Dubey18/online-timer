# Deploying Your React Online Timer to Vercel: Step-by-Step Guide

This guide will walk you through deploying your project to [Vercel](https://vercel.com/) for the first time.  
**No prior deployment experience is needed!**

---

## 1. **Create a Vercel Account**

- Go to [https://vercel.com/signup](https://vercel.com/signup)
- Sign up with your GitHub, GitLab, Bitbucket, or email.

---

## 2. **Install Vercel CLI (Optional but Recommended)**

- Open your terminal (Command Prompt, PowerShell, or Terminal on Mac/Linux).
- Install Vercel CLI globally:

  ```bash
  npm install -g vercel
  ```

---

## 3. **Prepare Your Project**

- Make sure your project is in a folder (e.g., `online-timer`).
- Open a terminal and navigate to your project folder:

  ```bash
  cd path/to/online-timer
  ```

- If you haven't already, initialize a git repository:

  ```bash
  git init
  git add .
  git commit -m "Initial commit"
  ```

---

## 4. **Push Your Project to GitHub (Recommended)**

- Create a new repository on [GitHub](https://github.com/new).
- Follow the instructions to push your local code to GitHub:

  ```bash
  git remote add origin https://github.com/your-username/online-timer.git
  git branch -M main
  git push -u origin main
  ```

---

## 5. **Deploy via Vercel Web Dashboard (Easiest)**

1. **Go to [https://vercel.com/dashboard](https://vercel.com/dashboard)**
2. Click **"New Project"**.
3. **Import your GitHub repository** (you may need to connect your GitHub account).
4. Select your `online-timer` repo.
5. **Configure Project:**
   - **Framework Preset:** Select **Vite** (or "Other" if not listed).
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - Leave other settings as default.
6. Click **"Deploy"**.
7. Wait for the build to finish. You’ll get a live URL (e.g., `https://online-timer-yourname.vercel.app`).

---

## 6. **Deploy via Vercel CLI (Alternative)**

If you want to deploy directly from your computer:

1. In your project folder, run:

   ```bash
   vercel
   ```

2. Answer the prompts:
   - **Set up and deploy “online-timer”?** Yes
   - **Which scope do you want to deploy to?** (Pick your username)
   - **Link to existing project?** No (create a new project)
   - **What’s your project’s name?** (Press Enter to accept default)
   - **In which directory is your code located?** `.` (just press Enter)
   - **Framework:** Vite (or Other if not listed)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Override settings?** No

3. Wait for deployment to finish. The CLI will show you a live URL.

---

## 7. **Visit Your Deployed App**

- Open the provided URL in your browser.
- Your app is now live on the internet!

---

## 8. **(Optional) Custom Domain**

- In the Vercel dashboard, go to your project.
- Click **"Settings" > "Domains"**.
- Add your custom domain and follow the DNS instructions.

---

## 9. **Future Deployments**

- Every time you push to your GitHub repo, Vercel will automatically redeploy.
- Or, run `vercel --prod` in your project folder to trigger a manual deployment.

---

## 10. **Troubleshooting**

- If you see build errors, check:
  - Your `build` script in `package.json` is set to `vite build`.
  - Your output directory is `dist`.
  - All dependencies are installed (`npm install`).
- For help, see [Vercel Docs](https://vercel.com/docs).

---

## **Summary Table**

| Step | Action                        | Command/Link                        |
|------|-------------------------------|-------------------------------------|
| 1    | Create Vercel account         | https://vercel.com/signup           |
| 2    | Install Vercel CLI            | `npm install -g vercel`             |
| 3    | Prepare project               | `cd online-timer`                   |
| 4    | Push to GitHub                | `git push ...`                      |
| 5    | Deploy via Dashboard          | https://vercel.com/dashboard        |
| 6    | Deploy via CLI                | `vercel`                            |
| 7    | Visit your app                | (URL from Vercel)                   |
| 8    | Add custom domain (optional)  | Dashboard > Settings > Domains      |

---

## **You’re Done!**

Your React Online Timer is now live on Vercel 🚀  
You can share your URL with anyone!

---
