'use client';

import { useEffect, useState } from 'react';
import { Download, Trash2 } from 'lucide-react';

type LeadStatus = 'new' | 'contacted' | 'joined';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  package: string;
  message: string;
  date: string;
  status: LeadStatus;
}

export default function LeadsTab() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch('/api/admin/leads', { cache: 'no-store' });
        if (!res.ok) {
          throw new Error('Failed to load leads from the server.');
        }
        const data = (await res.json()) as Lead[];
        setLeads(data);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        setLeads([]); // Set to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const exportCSV = () => {
    if (leads.length === 0) return;

    const escapeCsvField = (field: unknown) => {
      const stringField = String(field);
      // Escape double quotes by doubling them
      const escaped = stringField.replace(/"/g, '""');
      // Wrap the whole field in double quotes
      return `"${escaped}"`;
    };

    const headers = ['Name', 'Email', 'Phone', 'Package', 'Date', 'Status', 'Message'];
    const rows = leads.map((lead) =>
      [
        escapeCsvField(lead.name),
        escapeCsvField(lead.email),
        escapeCsvField(lead.phone),
        escapeCsvField(lead.package),
        escapeCsvField(lead.date),
        escapeCsvField(lead.status),
        escapeCsvField(lead.message),
      ].join(',')
    );

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-t8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leads.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const deleteLead = async (id: string) => {
    const previous = [...leads];
    setLeads(leads.filter((lead) => lead.id !== id));

    try {
      const res = await fetch(`/api/admin/leads?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to delete lead on the server.');
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred while deleting.');
      setLeads(previous); // Revert on error
    }
  };

  const updateStatus = async (id: string, status: LeadStatus) => {
    const previous = [...leads];
    setLeads(
      leads.map((lead) =>
        lead.id === id ? { ...lead, status } : lead
      )
    );

    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) {
        throw new Error('Failed to update status on the server.');
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred while updating status.');
      setLeads(previous); // Revert on error
    }
  };

  const renderStatusBadge = (status: LeadStatus) => {
    const base = 'px-3 py-1 rounded-full text-xs font-semibold';
    if (status === 'new') return <span className={`${base} bg-blue-500/20 text-blue-400`}>New</span>;
    if (status === 'contacted') return <span className={`${base} bg-yellow-500/20 text-yellow-400`}>Contacted</span>;
    return <span className={`${base} bg-green-500/20 text-green-400`}>Joined</span>;
  };

  if (loading) {
    return <p className="text-white/80">Loading leads...</p>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h2 className="heading-md text-white">Leads ({leads.length})</h2>
        <button
          onClick={exportCSV}
          disabled={leads.length === 0}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-bright-purple text-black font-semibold rounded-lg hover:bg-bright-purple/90 transition-colors w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download size={18} />
          Export CSV
        </button>
      </div>

      {error && <p className="text-sm text-red-400 mb-3">{error}</p>}

      {leads.length === 0 && !error && (
        <p className="text-white/60">No new leads yet.</p>
      )}

      {/* Mobile cards */}
      <div className="space-y-4 md:hidden">
        {leads.map((lead) => (
          <div key={lead.id} className="rounded-lg border border-bright-purple/20 bg-deep-purple/30 p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-white font-semibold">{lead.name}</p>
                <p className="text-xs text-white/60">{new Date(lead.date).toLocaleDateString()}</p>
              </div>
              {renderStatusBadge(lead.status)}
            </div>
            <p className="text-sm text-white/70 break-words">{lead.phone} · {lead.email}</p>
            {lead.package && <p className="text-xs text-white/60">Package: <span className="font-medium">{lead.package}</span></p>}
            {lead.message && <p className="text-xs text-white/70 line-clamp-3">“{lead.message}”</p>}
            <div className="flex items-center justify-between gap-2 pt-2">
              <select
                aria-label="Lead status"
                value={lead.status}
                onChange={(e) => updateStatus(lead.id, e.target.value as LeadStatus)}
                className="flex-1 px-3 py-2 rounded-md bg-black/60 border border-bright-purple/40 text-xs text-white focus:outline-none focus:border-bright-purple"
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="joined">Joined</option>
              </select>
              <button
                aria-label="Delete lead"
                onClick={() => deleteLead(lead.id)}
                className="p-2 text-red-500 hover:bg-red-500/20 rounded transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-bright-purple/20">
              <th className="px-4 py-3 text-left text-white font-oswald">Name</th>
              <th className="px-4 py-3 text-left text-white font-oswald">Contact</th>
              <th className="px-4 py-3 text-left text-white font-oswald">Package</th>
              <th className="px-4 py-3 text-left text-white font-oswald">Date</th>
              <th className="px-4 py-3 text-left text-white font-oswald">Status</th>
              <th className="px-4 py-3 text-left text-white font-oswald">Message</th>
              <th className="px-4 py-3 text-left text-white font-oswald">Action</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-bright-purple/10 hover:bg-deep-purple/20 transition-colors">
                <td className="px-4 py-3 text-white">{lead.name}</td>
                <td className="px-4 py-3 text-white/70 text-sm">{lead.email}<br/>{lead.phone}</td>
                <td className="px-4 py-3 text-white/70">{lead.package}</td>
                <td className="px-4 py-3 text-white/70">{new Date(lead.date).toLocaleDateString()}</td>
                <td className="px-4 py-3 space-y-1">
                  {renderStatusBadge(lead.status)}
                  <select
                    aria-label="Lead status"
                    value={lead.status}
                    onChange={(e) => updateStatus(lead.id, e.target.value as LeadStatus)}
                    className="mt-1 w-full px-2 py-1 rounded-md bg-black/60 border border-bright-purple/40 text-xs text-white focus:outline-none focus:border-bright-purple"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="joined">Joined</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-xs text-white/70 max-w-xs truncate" title={lead.message}>{lead.message}</td>
                <td className="px-4 py-3">
                  <button
                    aria-label="Delete lead"
                    onClick={() => deleteLead(lead.id)}
                    className="p-2 text-red-500 hover:bg-red-500/20 rounded transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
