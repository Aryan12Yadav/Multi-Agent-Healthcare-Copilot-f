# MedSphere AI Environment Variables & Secrets Reference

This document lists all the environment variables and secrets required to run and deploy **MedSphere AI**.

---

## 1. GitHub Actions Secrets
Configure these in your GitHub repository under **Settings > Secrets and variables > Actions > Secrets**:

| Secret Name | Purpose | Example Value / Format |
| :--- | :--- | :--- |
| `RENDER_API_KEY` | Render Account API Key for triggering deployment. Get it from Render Account Settings > API Keys. | `rnd_xxxxxxxxxxxxxxxxxxxxxxxx` |
| `RENDER_SERVICE_ID` | Render Web Service ID for your backend. Get it from the Web Service dashboard URL or settings. | `srv-xxxxxxxxxxxxxxxx` |

---

## 2. Render Web Service Environment Variables
Configure these in the Render Dashboard under your Web Service's **Environment** tab:

| Variable Name | Required Value / Description | Example Value |
| :--- | :--- | :--- |
| `APP_NAME` | Name of the application | `MedSphere AI` |
| `DEBUG` | Enable/Disable debug mode (keep False in prod) | `False` |
| `SECRET_KEY` | JWT signing key (use a secure random string) | `9b1deb4d3b7d4d82b43b679a9e3a6c117e11f7c...` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | JWT expiration time in minutes | `1440` |
| `JWT_ALGORITHM` | Algorithm for JWT | `HS256` |
| `POSTGRES_USER` | PostgreSQL Username | `calculator_db_v95z_user` |
| `POSTGRES_PASSWORD` | PostgreSQL Password | `wtuYCrdv8gdfvKxghNM13FEyDXXBqQFO` |
| `POSTGRES_HOST` | PostgreSQL Host (Internal/External) | `dpg-d8o46i48aovs73ffpssg-a` |
| `POSTGRES_PORT` | PostgreSQL Port | `5432` |
| `POSTGRES_DB` | PostgreSQL Database name | `calculator_db_v95z` |
| `ALLOWED_ORIGINS` | CORS allowed origins (Vercel URL + local) | `http://localhost:5173,http://127.0.0.1:5173,https://your-vercel-domain.vercel.app` |
| `MONGO_URI` | MongoDB Connection URI | `mongodb+srv://aryan:cluster4149@cluster0.pmh2shd.mongodb.net/?appName=Cluster0` |
| `MONGO_DATABASE` | MongoDB Database Name | `medsphere_ai` |
| `AWS_ACCESS_KEY` | AWS S3 IAM User Access Key | `AKIA4CFOER4MFAWOZ2HF` |
| `AWS_SECRET_KEY` | AWS S3 IAM User Secret Key | `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` |
| `AWS_REGION` | AWS S3 Region | `ap-south-1` |
| `AWS_BUCKET_NAME` | AWS S3 Bucket Name | `medsphere-ai-storage` |
| `NVIDIA_API_KEY` | NVIDIA / LLM API Key | `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` |
| `NVIDIA_BASE_URL` | NVIDIA / LLM Base Endpoint | `https://integrate.api.nvidia.com/v1` |
| `NVIDIA_MODEL` | NVIDIA / LLM Model name | `meta/llama-3.3-70b-instruct` |
| `UPLOAD_DIRECTORY` | Local uploads backup folder | `storage` |

---

## 3. Vercel Environment Variables
Configure these in the Vercel Dashboard under your Project's **Settings > Environment Variables**:

| Variable Name | Required Value / Description | Example Value |
| :--- | :--- | :--- |
| `VITE_API_URL` | Public endpoint URL of your deployed Render backend | `https://your-backend-service.onrender.com` |
