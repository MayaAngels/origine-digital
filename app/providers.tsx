import { CartProvider as CartProviderComponent } from "@/components/cart/CartProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <CartProviderComponent>
            {children}
        </CartProviderComponent>
    );
}