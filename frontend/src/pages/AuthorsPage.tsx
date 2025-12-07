import React, { useEffect, useState } from 'react';
import api from '../api/axiosClient';

type Author = {
  id: number;
  name: string;
  bio?: string | null;
};

const AuthorsPage: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAuthors = async () => {
    try {
      setError(null);
      const res = await api.get<Author[]>('/authors');
      setAuthors(res.data);
    } catch (err: any) {
      console.error(err);
      setError('Failed to load authors');
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const handleAddAuthor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    setError(null);
    try {
      await api.post('/authors', { name, bio: bio || undefined });
      setName('');
      setBio('');
      await fetchAuthors();
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || 'Failed to add author');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this author?')) return;
    try {
      await api.delete(`/authors/${id}`);
      await fetchAuthors();
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || 'Failed to delete author');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>Authors</h2>
        <div className="muted">{authors.length} author(s)</div>
      </div>

      <section className="form-card" style={{ maxWidth: 720 }}>
        <h3 style={{ marginBottom: 12 }}>Add Author</h3>
        <form onSubmit={handleAddAuthor}>
          <div className="form-field">
            <label>Name</label>
            <input
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Author full name"
            />
          </div>
          <div className="form-field">
            <label>Bio</label>
            <textarea
              className="textarea"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              placeholder="Short biography"
            />
          </div>
          {error && <div style={{ color: '#ef4444', marginBottom: 8 }}>{error}</div>}
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn" type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Add Author'}
            </button>
            <button type="button" className="btn ghost" onClick={() => { setName(''); setBio(''); }}>
              Clear
            </button>
          </div>
        </form>
      </section>

      <section className="card" style={{ marginTop: 24 }}>
        <h3 style={{ marginBottom: 12 }}>Authors List</h3>
        {authors.length === 0 ? (
          <p>No authors yet.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: 70 }}>ID</th>
                <th>Name</th>
                <th>Bio</th>
                <th style={{ width: 140 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {authors.map((a) => (
                <tr key={a.id}>
                  <td>{a.id}</td>
                  <td>{a.name}</td>
                  <td>{a.bio || '-'}</td>
                  <td>
                    <div className="actions">
                      <button
                        onClick={() => handleDelete(a.id)}
                        className="btn danger"
                        style={{ padding: '6px 10px', borderRadius: 8, fontSize: 13 }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default AuthorsPage;
