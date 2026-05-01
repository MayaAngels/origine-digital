// app/seller/products/new/page.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewProductPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        tags: '',
        deliverables: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        const token = localStorage.getItem('auth_token');
        const productData = {
            ...formData,
            price: parseFloat(formData.price),
            tags: formData.tags.split(',').map(t => t.trim()),
            deliverables: formData.deliverables.split(',').map(d => d.trim())
        };
        
        try {
            const res = await fetch('/api/marketplace/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(productData)
            });
            
            if (res.ok) {
                router.push('/seller/dashboard');
            } else {
                alert('Failed to create product');
            }
        } catch (error) {
            alert('Error creating product');
        }
        setLoading(false);
    };

    return (
        <div style={{ minHeight: '100vh', background: '#0B0D10', padding: '2rem' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#E6EAF0', marginBottom: '2rem' }}>Add New Product</h1>
                
                <form onSubmit={handleSubmit} style={{ background: '#11151A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '1rem', padding: '2rem' }}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', color: '#E6EAF0', marginBottom: '0.5rem' }}>Product Title</label>
                        <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={{ width: '100%', padding: '0.75rem', background: '#0B0D10', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '0.5rem', color: '#E6EAF0' }} />
                    </div>
                    
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', color: '#E6EAF0', marginBottom: '0.5rem' }}>Description</label>
                        <textarea required rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={{ width: '100%', padding: '0.75rem', background: '#0B0D10', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '0.5rem', color: '#E6EAF0' }} />
                    </div>
                    
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', color: '#E6EAF0', marginBottom: '0.5rem' }}>Price (€)</label>
                        <input type="number" step="0.01" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} style={{ width: '100%', padding: '0.75rem', background: '#0B0D10', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '0.5rem', color: '#E6EAF0' }} />
                    </div>
                    
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', color: '#E6EAF0', marginBottom: '0.5rem' }}>Tags (comma-separated)</label>
                        <input type="text" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} placeholder="AI, Business, Marketing" style={{ width: '100%', padding: '0.75rem', background: '#0B0D10', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '0.5rem', color: '#E6EAF0' }} />
                    </div>
                    
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', color: '#E6EAF0', marginBottom: '0.5rem' }}>Deliverables (comma-separated)</label>
                        <input type="text" value={formData.deliverables} onChange={e => setFormData({...formData, deliverables: e.target.value})} placeholder="PDF Guide, Templates, Checklist" style={{ width: '100%', padding: '0.75rem', background: '#0B0D10', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '0.5rem', color: '#E6EAF0' }} />
                    </div>
                    
                    <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.75rem', background: '#6EE7B7', color: '#0B0D10', border: 'none', borderRadius: '0.5rem', fontWeight: 'bold', cursor: 'pointer', opacity: loading ? 0.5 : 1 }}>
                        {loading ? 'Creating...' : 'Create Product'}
                    </button>
                </form>
            </div>
        </div>
    );
}