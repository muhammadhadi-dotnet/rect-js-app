import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Eye, Edit, Trash2 } from 'lucide-react'; // Import icons

const getStatusBadge = (status) => {
  const styles = {
    Deployed: 'bg-green-100 text-green-700',
    Available: 'bg-orange-100 text-orange-700',
  };
  return styles[status] || 'bg-gray-100 text-gray-700';
};

const getExpiryBadge = (date) => {
  const now = new Date();
  const expiry = new Date(date);
  return expiry < now
    ? 'bg-red-100 text-red-700'
    : 'bg-yellow-100 text-yellow-800';
};

const initials = (name) =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

const ServiceProviderList = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/get-data')
      .then(res => {
        setProviders(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Delete handler
  const handleDelete = (id) => {
  if (window.confirm('Are you sure you want to delete this service provider?')) {
    axios.delete(`http://localhost:8000/api/delete/${id}`)
      .then(() => {
        setProviders(providers.filter(provider => provider.id !== id));
        alert('Service provider deleted successfully!');
      })
      .catch(err => {
        console.error('Failed to delete:', err);
        alert('Failed to delete the service provider.');
      });
  }
};
  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Service Provider</h1>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Link
            to="/create"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            <Plus size={16} />
            New Employee
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm text-gray-800">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">PassPort No</th>
              <th className="px-4 py-3 text-left">Iqama Expiry</th>
              <th className="px-4 py-3 text-left">Vendor</th>
              <th className="px-4 py-3 text-left">Client</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th> {/* New column */}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="text-center py-6">Loading...</td>
              </tr>
            ) : providers.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500">
                  No service providers found.
                </td>
              </tr>
            ) : (
              providers.map((provider) => (
                <tr key={provider.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{provider.id}</td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-700 text-sm font-bold">
                      {initials(provider.name)}
                    </span>
                    {provider.name}
                  </td>
                  <td className="px-4 py-3">{provider.passport_number || '—'}</td>
                  <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs font-semibold rounded ${getExpiryBadge(provider.iqama_expiry_date)}`}>
                    {provider.iqama_expiry_date 
                      ? new Date(provider.iqama_expiry_date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        }) 
                      : '—'}
                  </span>
                </td>
                  <td className="px-4 py-3">{provider.vendor_name || '—'}</td>
                  <td className="px-4 py-3">{provider.client_name || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs font-semibold rounded ${getStatusBadge(provider.client_status)}`}>
                      {provider.client_status || 'Unknown'}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex space-x-2">
                    <button
                      onClick={() => navigate(`/view/${provider.id}`)}
                      className="text-blue-600 hover:text-blue-800"
                      title="View"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => navigate(`/edit/${provider.id}`)}
                      className="text-green-600 hover:text-green-800"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(provider.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceProviderList;
