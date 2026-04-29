// app/client/layout.tsx
 const useClientAuth = () => ({ apiKey: 'test', isLoading: false });
import '../globals.css';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <!-- ClientAuthProvider removed -->
            {children}
        <!-- /ClientAuthProvider -->
    );
}
