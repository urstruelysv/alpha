'use client';

import { useEffect, useState } from 'react';
import { Edit2, Trash2, Plus, X, Save } from 'lucide-react';

// This type should be in sync with the one in adminDataStore.ts
type Package = {
  id: string;
  name: string;
  price: string;
  type: 'membership' | 'personal-training';
  order: number;
  line?: string;
  features?: string[];
  popular?: boolean;
  icon?: string;
  description?: string; // Legacy, can be merged with line
  note?: string;
};

const EMPTY_FORM_DATA: Partial<Package> = {
  name: '',
  price: '',
  type: 'membership',
  line: '',
  features: [],
  icon: '',
  popular: false,
  order: 0,
  note: '',
};

export default function PackagesTab() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPackage, setEditingPackage] = useState<Partial<Package> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch('/api/admin/packages', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load packages');
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

  const handleAddNew = () => {
    setEditingPackage({ ...EMPTY_FORM_DATA, order: packages.length + 1 });
  };

  const handleEdit = (pkg: Package) => {
    setEditingPackage(pkg);
  };

  const handleCancel = () => {
    setEditingPackage(null);
    setError(null);
  };

  const handleSave = async (formData: Partial<Package>) => {
    setError(null);
    try {
      const isEditing = 'id' in formData;
      const url = '/api/admin/packages';
      const method = isEditing ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Failed to ${isEditing ? 'update' : 'create'} package`);
      }

      const savedPackage = (await res.json()) as Package;
      
      if (isEditing) {
        setPackages((prev) =>
          prev.map((p) => (p.id === savedPackage.id ? savedPackage : p)).sort((a, b) => a.order - b.order)
        );
      } else {
        setPackages((prev) => [...prev, savedPackage].sort((a, b) => a.order - b.order));
      }

      setEditingPackage(null);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to save package.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this package?')) return;
    setError(null);
    try {
      const res = await fetch(`/api/admin/packages?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete package');
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
          onClick={handleAddNew}
          className="flex items-center gap-2 px-4 py-2 bg-bright-purple text-black font-semibold rounded-lg hover:bg-bright-purple/90 transition-colors"
        >
          <Plus size={18} />
          Add Package
        </button>
      </div>

      {error && <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">{error}</div>}

      {editingPackage && (
        <EditForm
          pkg={editingPackage}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      {loading ? (
        <p className="text-white/80">Loading packages...</p>
      ) : (
        <div className="space-y-8">
          <PackageGroup title="Membership Plans" packages={membershipPlans} onEdit={handleEdit} onDelete={handleDelete} />
          <PackageGroup title="Personal Training" packages={personalTraining} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      )}
    </div>
  );
}

function PackageGroup({ title, packages, onEdit, onDelete }: { title: string, packages: Package[], onEdit: (pkg: Package) => void, onDelete: (id: string) => void }) {
  return (
    <div>
      <h3 className="heading-md text-white mb-4">{title}</h3>
      {packages.length === 0 ? (
        <p className="text-white/60">No packages of this type yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-deep-purple/20 border border-bright-purple/30 rounded-lg p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="heading-md text-white">{pkg.name}</h4>
                    <p className="text-bright-purple font-oswald font-semibold">{pkg.price}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => onEdit(pkg)} className="p-2 text-bright-purple hover:bg-bright-purple/20 rounded transition-colors"><Edit2 size={18} /></button>
                    <button onClick={() => onDelete(pkg.id)} className="p-2 text-red-500 hover:bg-red-500/20 rounded transition-colors"><Trash2 size={18} /></button>
                  </div>
                </div>
                {pkg.line && <p className="text-white/70 text-sm mb-2">{pkg.line}</p>}
                {pkg.features && pkg.features.length > 0 && (
                  <ul className="text-white/60 text-sm space-y-1 list-disc list-inside mb-2">
                    {pkg.features.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                )}
                {pkg.note && <p className="text-white/60 text-xs italic">({pkg.note})</p>}
              </div>
              {pkg.popular && <div className="mt-4 text-center text-xs font-bold text-purple-400 uppercase tracking-wider">Most Popular</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function EditForm({ pkg, onSave, onCancel }: { pkg: Partial<Package>, onSave: (formData: Partial<Package>) => void, onCancel: () => void }) {
  const [formData, setFormData] = useState(pkg);

  const handleSubmit = () => {
    const featuresArray = Array.isArray(formData.features) 
      ? formData.features.filter(f => f.trim() !== '') 
      : [];
    onSave({ ...formData, features: featuresArray });
  };

  return (
    <div className="mb-6 bg-deep-purple/20 border border-bright-purple/30 rounded-lg p-6">
      <h3 className="heading-md text-white mb-4">{'id' in pkg ? 'Edit Package' : 'Add New Package'}</h3>
      <div className="space-y-4">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white/70 text-sm mb-2">Name</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 bg-deep-purple/40 border border-bright-purple/30 rounded-lg text-white" />
          </div>
          <div>
            <label className="block text-white/70 text-sm mb-2">Price</label>
            <input type="text" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full px-4 py-2 bg-deep-purple/40 border border-bright-purple/30 rounded-lg text-white" />
          </div>
        </div>
        
        {/* Type and Order */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-white/70 text-sm mb-2">Type</label>
            <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value as Package['type'] })} className="w-full px-4 py-2 bg-deep-purple/40 border border-bright-purple/30 rounded-lg text-white">
              <option value="membership">Membership</option>
              <option value="personal-training">Personal Training</option>
            </select>
          </div>
          <div>
            <label className="block text-white/70 text-sm mb-2">Display Order</label>
            <input type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2 bg-deep-purple/40 border border-bright-purple/30 rounded-lg text-white" />
          </div>
          <div>
            <label className="block text-white/70 text-sm mb-2">Icon Name</label>
            <input type="text" value={formData.icon || ''} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} className="w-full px-4 py-2 bg-deep-purple/40 border border-bright-purple/30 rounded-lg text-white" placeholder="e.g., Calendar, Dumbbell" />
          </div>
        </div>

        {/* Display Fields */}
        <div>
          <label className="block text-white/70 text-sm mb-2">Subtitle (Line)</label>
          <input type="text" value={formData.line || ''} onChange={(e) => setFormData({ ...formData, line: e.target.value })} className="w-full px-4 py-2 bg-deep-purple/40 border border-bright-purple/30 rounded-lg text-white" placeholder="e.g., For people testing the routine" />
        </div>
        <div>
          <label className="block text-white/70 text-sm mb-2">Features (one per line)</label>
          <textarea value={Array.isArray(formData.features) ? formData.features.join('\n') : ''} onChange={(e) => setFormData({ ...formData, features: e.target.value.split('\n') })} className="w-full px-4 py-2 bg-deep-purple/40 border border-bright-purple/30 rounded-lg text-white" rows={4}></textarea>
        </div>
        <div>
          <label className="block text-white/70 text-sm mb-2">Note (optional)</label>
          <input type="text" value={formData.note || ''} onChange={(e) => setFormData({ ...formData, note: e.target.value })} className="w-full px-4 py-2 bg-deep-purple/40 border border-bright-purple/30 rounded-lg text-white" />
        </div>
        <div className="flex items-center gap-4">
          <input type="checkbox" id="popular" checked={formData.popular || false} onChange={(e) => setFormData({ ...formData, popular: e.target.checked })} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
          <label htmlFor="popular" className="text-white/70 text-sm">Mark as Popular</label>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4">
          <button onClick={handleSubmit} className="flex items-center gap-2 px-4 py-2 bg-bright-purple text-black font-semibold rounded-lg hover:bg-bright-purple/90 transition-colors"><Save size={18} /> Save</button>
          <button onClick={onCancel} className="flex items-center gap-2 px-4 py-2 border border-bright-purple/30 text-bright-purple rounded-lg hover:bg-bright-purple/10 transition-colors"><X size={18} /> Cancel</button>
        </div>
      </div>
    </div>
  );
}