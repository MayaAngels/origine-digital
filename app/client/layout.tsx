// app/client/layout.tsx
const ClientAuthProvider = ({ children }: any) => children; const useClientAuth = () => ({ apiKey: 'test', isLoading: false });
import '../globals.css';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClientAuthProvider>
            {children}
        </ClientAuthProvider>
    );
}
