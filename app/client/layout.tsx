// app/client/layout.tsx
import { ClientAuthProvider } from '../../../components/client/ClientAuthProvider';
import '../globals.css';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClientAuthProvider>
            {children}
        </ClientAuthProvider>
    );
}
