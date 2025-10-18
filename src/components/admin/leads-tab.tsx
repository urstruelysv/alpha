'use client';

import { useState } from 'react';
import { Download, Trash2 } from 'lucide-react';

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  package: string;
  date: string;
  status: 'new' | 'contacted' | 'converted';
}

const mockLeads: Lead[] = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    email: 'rajesh@email.com',
    phone: '9876543210',
    package: '3 Months',
    date: '2024-10-15',
    status: 'new',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    email: 'priya@email.com',
    phone: '9876543211',
    package: '6 Months',
    date: '2024-10-14',
    status: 'contacted',
  },
  {
    id: 3,
    name: 'Arjun Singh',
    email: 'arjun@email.com',
    phone: '9876543212',
    package: 'Personal Training',
    date: '2024-10-13',
    status: 'converted',
  },
];

export default function LeadsTab() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Package', 'Date', 'Status'];
    const rows = leads.map((lead) => [
      lead.name,
      lead.email,
      lead.phone,
      lead.package,
      lead.date,
      lead.status,
    ]);

    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leads.csv';
    a.click();
  };

  const deleteLead = (id: number) => {
    setLeads(leads.filter((lead) => lead.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="heading-md text-white">Leads ({leads.length})</h2>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2 bg-bright-purple text-black font-semibold rounded-lg hover:bg-bright-purple/90 transition-colors"
        >
          <Download size={18} />
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-bright-purple/20">
              <th className="px-4 py-3 text-left text-white font-oswald">Name</th>
              <th className="px-4 py-3 text-left text-white font-oswald">Email</th>
              <th className="px-4 py-3 text-left text-white font-oswald">Phone</th>
              <th className="px-4 py-3 text-left text-white font-oswald">Package</th>
              <th className="px-4 py-3 text-left text-white font-oswald">Date</th>
              <th className="px-4 py-3 text-left text-white font-oswald">Status</th>
              <th className="px-4 py-3 text-left text-white font-oswald">Action</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-bright-purple/10 hover:bg-deep-purple/20 transition-colors">
                <td className="px-4 py-3 text-white">{lead.name}</td>
                <td className="px-4 py-3 text-white/70">{lead.email}</td>
                <td className="px-4 py-3 text-white/70">{lead.phone}</td>
                <td className="px-4 py-3 text-white/70">{lead.package}</td>
                <td className="px-4 py-3 text-white/70">{lead.date}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${lead.status === 'new'
                        ? 'bg-blue-500/20 text-blue-400'
                        : lead.status === 'contacted'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-green-500/20 text-green-400'
                    }`}
                  >
                    {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
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
