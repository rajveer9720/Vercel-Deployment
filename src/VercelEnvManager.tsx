import React, { useEffect, useState } from 'react';
import { getEnvVars, addEnvVar, updateEnvVar, deleteEnvVar } from './vercelApi';

interface EnvVar {
  id: string;
  key: string;
  value: string;
  target: string[];
}

export default function VercelEnvManager() {
  const [envs, setEnvs] = useState<EnvVar[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  const fetchEnvs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getEnvVars();
      setEnvs(data.envs || []);
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEnvs();
  }, []);

  const handleAdd = async () => {
    if (!newKey || !newValue) return;
    setLoading(true);
    try {
      await addEnvVar(newKey, newValue);
      setNewKey('');
      setNewValue('');
      fetchEnvs();
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  };

  const handleUpdate = async (id: string, value: string) => {
    setLoading(true);
    try {
      await updateEnvVar(id, value);
      fetchEnvs();
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await deleteEnvVar(id);
      fetchEnvs();
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: 24, border: '1px solid #eee', borderRadius: 8 }}>
      <h2>Vercel Env Manager</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div style={{ marginBottom: 16 }}>
        <input
          placeholder="Key"
          value={newKey}
          onChange={e => setNewKey(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <input
          placeholder="Value"
          value={newValue}
          onChange={e => setNewValue(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <button onClick={handleAdd} disabled={loading}>Add</button>
      </div>
      {loading ? <div>Loading...</div> : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {envs.map(env => (
              <tr key={env.id}>
                <td>{env.key}</td>
                <td>
                  <input
                    type="text"
                    defaultValue={env.value}
                    onBlur={e => handleUpdate(env.id, e.target.value)}
                  />
                </td>
                <td>
                  <button onClick={() => handleDelete(env.id)} disabled={loading}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
