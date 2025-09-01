// Utility functions to interact with Vercel API for env CRUD
// Requires VERCEL_TOKEN and VERCEL_PROJECT_ID in .env file

const VERCEL_API_BASE = 'https://api.vercel.com/v10/projects';

export async function getEnvVars() {
  const token = import.meta.env.VITE_VERCEL_TOKEN;
  const projectId = import.meta.env.VITE_VERCEL_PROJECT_ID;
  const res = await fetch(`${VERCEL_API_BASE}/${projectId}/env`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch env vars');
  return res.json();
}

export async function addEnvVar(key: string, value: string, target: string[] = ['production']) {
  const token = import.meta.env.VITE_VERCEL_TOKEN;
  const projectId = import.meta.env.VITE_VERCEL_PROJECT_ID;
  const res = await fetch(`${VERCEL_API_BASE}/${projectId}/env`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ key, value, target }),
  });
  if (!res.ok) throw new Error('Failed to add env var');
  return res.json();
}

export async function updateEnvVar(id: string, value: string) {
  const token = import.meta.env.VITE_VERCEL_TOKEN;
  const projectId = import.meta.env.VITE_VERCEL_PROJECT_ID;
  const res = await fetch(`${VERCEL_API_BASE}/${projectId}/env/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ value }),
  });
  if (!res.ok) throw new Error('Failed to update env var');
  return res.json();
}

export async function deleteEnvVar(id: string) {
  const token = import.meta.env.VITE_VERCEL_TOKEN;
  const projectId = import.meta.env.VITE_VERCEL_PROJECT_ID;
  const res = await fetch(`${VERCEL_API_BASE}/${projectId}/env/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to delete env var');
  return res.json();
}
