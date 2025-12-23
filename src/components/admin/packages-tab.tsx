'use client';

import { useEffect, useState } from 'react';
import { Edit2, Trash2, Plus, X, Save } from 'lucide-react';

type Package = {
  id: string;
  name: string;
  price: string;
  type: 'membership' | 'personal-training';
  description?: string;
  note?: string;
  order: number;
};

export default function PackagesTab() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Package>>({
    name: '',
    price: '',
    type: 'membership',
    description: '',
    note: '',
    order: 0,
  });

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch('/api/admin/packages', { cache: 'no-store' });
        if (!res.ok) {
          throw new Error('Failed to load packages');
        }
        const data = (await res.json()) as Package[];
        setPackages(data.sort((a, b) => a.order - b.order));
      } catch (err) {
        console.error(err);
        setError('Could not load packages.');
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handleEdit = (pkg: Package) => {
    setEditingId(pkg.id);
    setFormData({
      name: pkg.name,
      price: pkg.price,
      type: pkg.type,
      description: pkg.description || '',
      note: pkg.note || '',
      order: pkg.order,
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData({
      name: '',
      price: '',
      type: 'membership',
      description: '',
      note: '',
      order: 0,
    });
    setError(null);
  };

  const handleSave = async () => {
    setError(null);
    try {
      if (editingId) {
        const res = await fetch('/api/admin/packages', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, ...formData }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || 'Failed to update package');
        }

        const updated = (await res.json()) as Package;
        setPackages((prev) =>
          prev
            .map((p) => (p.id === editingId ? updated : p))
            .sort((a, b) => a.order - b.order),
        );
        setEditingId(null);
      } else {
        const res = await fetch('/api/admin/packages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || 'Failed to create package');
        }

        const created = (await res.json()) as Package;
        setPackages((prev) =>
          [...prev, created].sort((a, b) => a.order - b.order),
        );
        setShowAddForm(false);
      }

      setFormData({
        name: '',
        price: '',
        type: 'membership',
        description: '',
        note: '',
        order: 0,
      });
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to save package.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this package?')) return;

    setError(null);
    try {
      const res = await fetch(`/api/admin/packages?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to delete package');
      }

      setPackages((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      setError('Failed to delete package.');
    }
  };

  const membershipPlans = packages.filter((p) => p.type === 'membership');
  const personalTraining = packages.filter((p) => p.type === 'personal-training');

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="heading-md text-white">Manage Packages</h2>
        <button
          onClick={() => {
            setShowAddForm(true);
            setEditingId(null);
            setFormData({
              name: '',
              price: '',
              type: 'membership',
              description: '',
              note: '',
              order: packages.length + 1,
            });
          }}
          className="flex items-center gap-2 px-4 py-2 bg-bright-purple text-black font-semibold rounded-lg hover:bg-bright-purple/90 transition-colors"
        >
          <Plus size={18} />
          Add Package
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {showAddForm && (
        <div className="mb-6 bg-deep-purple/20 border border-bright-purple/30 rounded-lg p-6">
          <h3 className="heading-md text-white mb-4">Add New Package</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-white/70 text-sm mb-2">Type</label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value as 'membership' | 'personal-training' })
                }
                className="w-full px-4 py-2 bg-deep-purple/40 border border-bright-purple/30 rounded-lg text-white"
              >
                <option value="membership">Membership</option>
                <option value="personal-training">Personal Training</option>
              </select>
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-deep-purple/40 border border-bright-purple/30 rounded-lg text-white"
                placeholder="e.g., Monthly, 3 Months"
              />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Price</label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 bg-deep-purple/40 border border-bright-purple/30 rounded-lg text-white"
                placeholder="e.g., ₹1,500 or Customized programs..."
              />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Description (optional)</label>
              <input
                type="text"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 bg-deep-purple/40 border border-bright-purple/30 rounded-lg text-white"
                placeholder="e.g., Includes 1 month of personal training free"
              />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Note (optional)</label>
              <input
                type="text"
                value={formData.note || ''}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                className="w-full px-4 py-2 bg-deep-purple/40 border border-bright-purple/30 rounded-lg text-white"
                placeholder="e.g., Pricing on consultation"
              />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Order</label>
              <input
                type="number"
                value={formData.order || 0}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 bg-deep-purple/40 border border-bright-purple/30 rounded-lg text-white"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-bright-purple text-black font-semibold rounded-lg hover:bg-bright-purple/90 transition-colors"
              >
                <Save size={18} />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 border border-bright-purple/30 text-bright-purple rounded-lg hover:bg-bright-purple/10 transition-colors"
              >
                <X size={18} />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-white/80">Loading packages...</p>
      ) : (
        <div className="space-y-8">
          {/* Membership Plans */}
          <div>
            <h3 className="heading-md text-white mb-4">Membership Plans</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {membershipPlans.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-deep-purple/20 border border-bright-purple/30 rounded-lg p-6"
                >
                  {editingId === pkg.id ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white/70 text-xs mb-1">Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3 py-1.5 bg-deep-purple/40 border border-bright-purple/30 rounded text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-white/70 text-xs mb-1">Price</label>
                        <input
                          type="text"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          className="w-full px-3 py-1.5 bg-deep-purple/40 border border-bright-purple/30 rounded text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-white/70 text-xs mb-1">Description</label>
                        <input
                          type="text"
                          value={formData.description || ''}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          className="w-full px-3 py-1.5 bg-deep-purple/40 border border-bright-purple/30 rounded text-white text-sm"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={handleSave}
                          className="flex-1 px-3 py-1.5 bg-bright-purple text-black text-sm font-semibold rounded hover:bg-bright-purple/90"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="px-3 py-1.5 border border-bright-purple/30 text-bright-purple text-sm rounded hover:bg-bright-purple/10"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="heading-md text-white">{pkg.name}</h4>
                          <p className="text-bright-purple font-oswald font-semibold">{pkg.price}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(pkg)}
                            className="p-2 text-bright-purple hover:bg-bright-purple/20 rounded transition-colors"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(pkg.id)}
                            className="p-2 text-red-500 hover:bg-red-500/20 rounded transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                      {pkg.description && (
                        <p className="text-white/60 text-sm italic">{pkg.description}</p>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Personal Training */}
          <div>
            <h3 className="heading-md text-white mb-4">Personal Training</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {personalTraining.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-deep-purple/20 border border-bright-purple/30 rounded-lg p-6"
                >
                  {editingId === pkg.id ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white/70 text-xs mb-1">Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3 py-1.5 bg-deep-purple/40 border border-bright-purple/30 rounded text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-white/70 text-xs mb-1">Price/Description</label>
                        <input
                          type="text"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          className="w-full px-3 py-1.5 bg-deep-purple/40 border border-bright-purple/30 rounded text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-white/70 text-xs mb-1">Note</label>
                        <input
                          type="text"
                          value={formData.note || ''}
                          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                          className="w-full px-3 py-1.5 bg-deep-purple/40 border border-bright-purple/30 rounded text-white text-sm"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={handleSave}
                          className="flex-1 px-3 py-1.5 bg-bright-purple text-black text-sm font-semibold rounded hover:bg-bright-purple/90"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="px-3 py-1.5 border border-bright-purple/30 text-bright-purple text-sm rounded hover:bg-bright-purple/10"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="heading-md text-white">{pkg.name}</h4>
                          <p className="text-white/70 text-sm">{pkg.price}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(pkg)}
                            className="p-2 text-bright-purple hover:bg-bright-purple/20 rounded transition-colors"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(pkg.id)}
                            className="p-2 text-red-500 hover:bg-red-500/20 rounded transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                      {pkg.note && (
                        <p className="text-white/60 text-sm italic">({pkg.note})</p>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
