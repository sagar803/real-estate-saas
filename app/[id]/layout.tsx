import { Header } from "@/components/header";
import { SidebarDesktop } from "@/components/sidebar/sidebar-desktop"
import { supabase } from "@/lib/supabaseClient";
import { redirect } from "next/navigation";

interface ChatLayoutProps {
  children: React.ReactNode,
  params: { id: string }
}

export default async function ChatLayout({ children, params }: ChatLayoutProps) {
  const { id } = params;
  
  // Fetch data from Supabase
  const { data, error } = await supabase
    .from('chatbot')
    .select('*')
    .filter('configuration->>route', 'eq', id)
    .single()

  if (error) console.error('Error fetching chatbot data:', error)
  if(!data) {
    redirect('/not-found');
  }

  return (
    <div className={`flex flex-col min-h-screen ${'bg-'+data?.configuration?.bg_color}`}>
      <Header name={data?.configuration?.app_name}/>
      <main className="flex flex-col flex-1">
        <div className={`relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden`}>
          <SidebarDesktop />
          {children}
        </div>
      </main>
    </div>
  )
}