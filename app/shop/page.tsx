import { products } from '../lib/products/data';
import { ProductCard } from '../components/products/ProductCard';

export const metadata = {
    title: 'Shop | Origine.Digital',
    description: 'Browse our collection of digital products, templates, and automation tools.',
};

export default function ShopPage() {
    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-4">Shop</h1>
            <p className="text-zinc-600 mb-8">
                Digital products and tools to help you build and scale your business.
            </p>
            
            {products.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-zinc-500">No products available yet.</p>
                </div>
            )}
        </div>
    );
}