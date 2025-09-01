
# Vercel Environment Variables Manager (React + Vite + TypeScript)

This project provides a UI and API integration to manage (CRUD) Vercel environment variables directly from your React frontend using the Vercel REST API.

## Features

- List all Vercel environment variables for your project
- Add new environment variables (with `type: encrypted`)
- Update existing environment variable values
- Delete environment variables

All actions are performed securely via the official Vercel API.

---
## Getting Started

1. **Clone the repo and install dependencies:**
  ```sh
  npm install
  ```

2. **Configure Vercel API credentials:**
  - Copy `.env.example` to `.env` and fill in:
    - `VITE_VERCEL_TOKEN` (your Vercel personal API token)
    - `VITE_VERCEL_PROJECT_ID` (your Vercel project ID)

3. **Start the development server:**
  ```sh
  npm run dev
  ```

4. **Open the app:**
  - Visit `http://localhost:5173` (or the port shown in your terminal)
  - Use the UI to view, add, update, and delete Vercel environment variables.

---
## How it Works

- The frontend uses the Vercel REST API (`/v10/projects/{projectId}/env`) to perform CRUD operations.
- All API calls require a valid Vercel API token and project ID, provided via environment variables in `.env`.
- The `add` operation uses `type: encrypted` for security.

### Example: Add Environment Variable

```ts
await addEnvVar('MY_KEY', 'my_value', ['production']);
// Sends POST with { key, value, target, type: 'encrypted' }
```

### Example: Update Environment Variable

```ts
await updateEnvVar(envId, 'new_value');
```

### Example: Delete Environment Variable

```ts
await deleteEnvVar(envId);
```

---
## Security Note

**Never commit your real `.env` file or Vercel API token to public repositories.**

---
## References

- [Vercel REST API Docs](https://vercel.com/docs/rest-api/endpoints#endpoints.env.create-environment-variable)


This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
