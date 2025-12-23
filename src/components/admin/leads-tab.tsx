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

// Fallback mock data so the UI still works if the API is unavailable
const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    email: 'rajesh@email.com',
    phone: '9876543210',
    package: '3 Months',
    message: 'Interested in morning batch.',
    date: '2024-10-15',
    status: 'new',
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya@email.com',
    phone: '9876543211',
    package: '6 Months',
    message: 'Wants a trial session first.',
    date: '2024-10-14',
    status: 'contacted',
  },
  {
    id: '3',
    name: 'Arjun Singh',
    email: 'arjun@email.com',
    phone: '9876543212',
    package: 'Personal Training',
    message: 'Looking for evening slot.',
    date: '2024-10-13',
    status: 'joined',
  },
];

export default function LeadsTab() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch('/api/admin/leads', { cache: 'no-store' });
        if (!res.ok) {
          throw new Error('Failed to load leads');
        }
        const data = (await res.json()) as Lead[];
        setLeads(data);
      } catch (err) {
        console.error(err);
        setError('Could not load leads. Showing sample data.');
        setLeads(mockLeads);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Package', 'Date', 'Status', 'Message'];
    const rows = leads.map((lead) => [
      lead.name,
      lead.email,
      lead.phone,
      lead.package,
      lead.date,
      lead.status,
      lead.message,
    ]);

    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leads.csv';
    a.click();
  };

  const deleteLead = async (id: string) => {
    const previous = leads;
    setLeads(leads.filter((lead) => lead.id !== id));

    try {
      const res = await fetch(`/api/admin/leads?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to delete lead');
      }
    } catch (err) {
      console.error(err);
      // revert UI on error
      setLeads(previous);
    }
  };

  const updateStatus = async (id: string, status: LeadStatus) => {
    const previous = leads;
    setLeads(
      leads.map((lead) =>
        lead.id === id
          ? {
              ...lead,
              status,
            }
          : lead,
      ),
    );

    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) {
        throw new Error('Failed to update status');
      }
    } catch (err) {
      console.error(err);
      // revert UI on error
      setLeads(previous);
    }
  };

  const renderStatusBadge = (status: LeadStatus) => {
    const base = 'px-3 py-1 rounded-full text-xs font-semibold';
    if (status === 'new') {
      return <span className={`${base} bg-blue-500/20 text-blue-400`}>Just filled</span>;
    }
    if (status === 'contacted') {
      return <span className={`${base} bg-yellow-500/20 text-yellow-400`}>Contacted</span>;
    }
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
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-bright-purple text-black font-semibold rounded-lg hover:bg-bright-purple/90 transition-colors w-full sm:w-auto"
        >
          <Download size={18} />
          Export CSV
        </button>
      </div>

      {error && <p className="text-sm text-red-400 mb-3">{error}</p>}

      {/* Mobile cards */}
      <div className="space-y-4 md:hidden">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className="rounded-lg border border-bright-purple/20 bg-deep-purple/30 p-4 flex flex-col gap-2"
          >
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-white font-semibold">{lead.name}</p>
                <p className="text-xs text-white/60">{lead.date}</p>
              </div>
              {renderStatusBadge(lead.status)}
            </div>
            <p className="text-sm text-white/70 break-words">
              {lead.phone} · {lead.email}
            </p>
            {lead.package && (
              <p className="text-xs text-white/60">
                Package: <span className="font-medium">{lead.package}</span>
              </p>
            )}
            {lead.message && (
              <p className="text-xs text-white/70 line-clamp-3">“{lead.message}”</p>
            )}
            <div className="flex items-center justify-between gap-2 pt-2">
              <select
                aria-label="Lead status"
                value={lead.status}
                onChange={(e) => updateStatus(lead.id, e.target.value as LeadStatus)}
                className="flex-1 px-3 py-2 rounded-md bg-black/60 border border-bright-purple/40 text-xs text-white focus:outline-none focus:border-bright-purple"
              >
                <option value="new">Just filled</option>
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
              <th className="px-4 py-3 text-left text-white font-oswald">Email</th>
              <th className="px-4 py-3 text-left text-white font-oswald">Phone</th>
              <th className="px-4 py-3 text-left text-white font-oswald">Package</th>
              <th className="px-4 py-3 text-left text-white font-oswald">Date</th>
              <th className="px-4 py-3 text-left text-white font-oswald">Status</th>
              <th className="px-4 py-3 text-left text-white font-oswald">Message</th>
              <th className="px-4 py-3 text-left text-white font-oswald">Action</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead.id}
                className="border-b border-bright-purple/10 hover:bg-deep-purple/20 transition-colors"
              >
                <td className="px-4 py-3 text-white">{lead.name}</td>
                <td className="px-4 py-3 text-white/70">{lead.email}</td>
                <td className="px-4 py-3 text-white/70">{lead.phone}</td>
                <td className="px-4 py-3 text-white/70">{lead.package}</td>
                <td className="px-4 py-3 text-white/70">{lead.date}</td>
                <td className="px-4 py-3 space-y-1">
                  {renderStatusBadge(lead.status)}
                  <select
                    aria-label="Lead status"
                    value={lead.status}
                    onChange={(e) => updateStatus(lead.id, e.target.value as LeadStatus)}
                    className="mt-1 w-full px-2 py-1 rounded-md bg-black/60 border border-bright-purple/40 text-xs text-white focus:outline-none focus:border-bright-purple"
                  >
                    <option value="new">Just filled</option>
                    <option value="contacted">Contacted</option>
                    <option value="joined">Joined</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-xs text-white/70 max-w-xs truncate">
                  {lead.message}
                </td>
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
