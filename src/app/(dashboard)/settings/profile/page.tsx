import ProfileManagement from "@/components/features/Settings/component/ProfileManagement";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
    return (
        <section className="min-h-screen bg-[#eef4f8] p-4 md:p-6 lg:p-10">
            <div className="mx-auto max-w-[1500px]">
                <div className="mb-8">
                    <Link
                        href="/settings"
                        className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 transition-colors hover:text-primary"
                    >
                        <ChevronLeft size={16} />
                        Back to Settings
                    </Link>
                    <h1 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">My Profile</h1>
                </div>
                
                <ProfileManagement />
            </div>
        </section>
    );
}
