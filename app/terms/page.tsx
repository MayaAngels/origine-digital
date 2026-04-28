export const metadata = {
    title: 'Terms of Service | Origine.Digital',
    description: 'Terms and conditions for using Origine.Digital services and digital products.',
};

export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-zinc-600 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            
            <div className="prose prose-zinc max-w-none">
                <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
                <p className="mb-4">By accessing or using Origine.Digital services, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">2. Digital Products & Services</h2>
                <p className="mb-4">Origine.Digital provides digital products and services including but not limited to templates, tools, automation systems, and consulting services. All products are delivered digitally unless otherwise specified.</p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">3. Payment Terms</h2>
                <p className="mb-4">Payments are processed securely through Stripe. By making a purchase, you agree to pay all applicable fees and taxes associated with your order.</p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">4. Refund Policy</h2>
                <p className="mb-4">Due to the digital nature of our products, all sales are final unless otherwise specified in our Refund Policy. Please review our Refund Policy before making a purchase.</p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">5. Intellectual Property</h2>
                <p className="mb-4">All content, products, designs, and materials available through Origine.Digital are protected by copyright and intellectual property laws. You may not reproduce, distribute, or create derivative works without explicit permission.</p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">6. License to Use</h2>
                <p className="mb-4">Upon purchase, you receive a non-exclusive, non-transferable license to use the digital products for your business or personal use as specified in the product description.</p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">7. Limitation of Liability</h2>
                <p className="mb-4">Origine.Digital shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our products or services.</p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">8. Changes to Terms</h2>
                <p className="mb-4">We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of updated terms.</p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">9. Contact Information</h2>
                <p className="mb-4">Questions about these Terms of Service? Contact us at:</p>
                <p className="mb-2">Email: legal@origine.digital</p>
                <p>Contact form: /contact</p>
            </div>
        </div>
    );
}
