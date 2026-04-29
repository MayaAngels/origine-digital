import { CartProvider as CartProviderComponent } from "";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <CartProviderComponent>
            {children}
        </CartProviderComponent>
    );
}