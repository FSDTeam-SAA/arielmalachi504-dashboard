"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { UserGenerationHistory, PosterGeneration, LogoGeneration } from "../types/user";
import { Calendar, CreditCard, Layers, Layout, Palette, Type } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

interface UserGenerationModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: UserGenerationHistory | null;
}

export function UserGenerationModal({ isOpen, onClose, user }: UserGenerationModalProps) {
    const [activeTab, setActiveTab] = useState<"posters" | "logos">("posters");

    if (!user) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                        Generation History: {user.userName}
                    </DialogTitle>
                    <p className="text-sm text-muted-foreground">{user.userEmail}</p>
                </DialogHeader>

                <div className="mt-4 grid grid-cols-2 gap-4 rounded-lg bg-slate-50 p-4 sm:grid-cols-4">
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-500">Remaining Credits</span>
                        <span className="text-lg font-bold">{user.remainingCredits}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-500">Plan</span>
                        <span className="text-lg font-bold">{user.plan?.name || "No Plan"}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-500">Posters</span>
                        <span className="text-lg font-bold">{user.posterCount}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-500">Logos</span>
                        <span className="text-lg font-bold">{user.logoCount}</span>
                    </div>
                </div>

                <div className="mt-6">
                    <div className="flex border-b border-slate-200">
                        <button
                            onClick={() => setActiveTab("posters")}
                            className={`px-4 py-2 text-sm font-medium transition-colors ${
                                activeTab === "posters"
                                    ? "border-b-2 border-primary text-primary"
                                    : "text-slate-500 hover:text-slate-700"
                            }`}
                        >
                            Posters ({user.posters.length})
                        </button>
                        <button
                            onClick={() => setActiveTab("logos")}
                            className={`px-4 py-2 text-sm font-medium transition-colors ${
                                activeTab === "logos"
                                    ? "border-b-2 border-primary text-primary"
                                    : "text-slate-500 hover:text-slate-700"
                            }`}
                        >
                            Logos ({user.logos.length})
                        </button>
                    </div>

                    <div className="mt-4 space-y-6">
                        {activeTab === "posters" ? (
                            user.posters.length > 0 ? (
                                user.posters.map((poster) => (
                                    <PosterCard key={poster._id} poster={poster} />
                                ))
                            ) : (
                                <p className="py-10 text-center text-slate-500">No posters generated yet.</p>
                            )
                        ) : (
                            user.logos.length > 0 ? (
                                user.logos.map((logo) => (
                                    <LogoCard key={logo._id} logo={logo} />
                                ))
                            ) : (
                                <p className="py-10 text-center text-slate-500">No logos generated yet.</p>
                            )
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function PosterCard({ poster }: { poster: PosterGeneration }) {
    return (
        <div className="rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50/50">
            <div className="flex flex-wrap gap-4 sm:flex-nowrap">
                <div className="flex gap-2 overflow-x-auto pb-2 sm:flex-col sm:overflow-visible sm:pb-0">
                    {poster.resultUrls.length > 0 ? (
                        poster.resultUrls.map((url, i) => (
                          <div key={i} className="relative h-40 w-32 shrink-0 overflow-hidden rounded-lg bg-slate-100 shadow-sm sm:h-48 sm:w-36">
                              <img src={url} alt={`Result ${i+1}`} className="h-full w-full object-cover" />
                          </div>
                        ))
                    ) : (
                        <div className="flex h-48 w-36 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
                             No images
                        </div>
                    )}
                </div>
                
                <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-lg font-bold">{poster.inputData.brand_name}</h3>
                            <p className="text-sm font-medium text-primary">{poster.inputData.title}</p>
                        </div>
                        <StatusBadge status={poster.status} cost={poster.creditCost} />
                    </div>

                    <p className="text-sm text-slate-600 italic">{poster.inputData.description}</p>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-lg bg-white p-3 text-xs shadow-sm border border-slate-100">
                        <div className="flex items-center gap-2">
                             <Palette className="h-3 w-3 text-slate-400" />
                             <span className="text-slate-500">Style:</span>
                             <span className="font-medium">{poster.inputData.style_preset}</span>
                        </div>
                        <div className="flex items-center gap-2">
                             <Type className="h-3 w-3 text-slate-400" />
                             <span className="text-slate-500">Language:</span>
                             <span className="font-medium">{poster.inputData.language.toUpperCase()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                             <span className="h-3 w-3 rounded-full border border-slate-200" style={{ backgroundColor: poster.inputData.primary_color }} />
                             <span className="text-slate-500">Colors:</span>
                             <span className="font-medium uppercase">{poster.inputData.primary_color} / {poster.inputData.secondary_color}</span>
                        </div>
                        <div className="flex items-center gap-2">
                             <Calendar className="h-3 w-3 text-slate-400" />
                             <span className="text-slate-500">Date:</span>
                             <span className="font-medium">{format(new Date(poster.createdAt), "MMM d, yyyy")}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function LogoCard({ logo }: { logo: LogoGeneration }) {
    return (
        <div className="rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50/50">
            <div className="flex flex-wrap gap-4 sm:flex-nowrap">
                <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-lg bg-slate-100 shadow-sm sm:h-40 sm:w-40">
                    {logo.resultUrls.length > 0 ? (
                        <img src={logo.resultUrls[0]} alt="Logo Result" className="h-full w-full object-contain p-2" />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-slate-400">
                             Processing...
                        </div>
                    )}
                </div>

                <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-lg font-bold">{logo.inputData.brand_name}</h3>
                            <p className="text-sm font-medium text-slate-500">{logo.inputData.industry}</p>
                        </div>
                        <StatusBadge status={logo.status} cost={logo.creditCost} />
                    </div>

                    {logo.inputData.tagline && (
                        <p className="text-sm font-medium italic text-slate-600">{logo.inputData.tagline}</p>
                    )}

                    <div className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-lg bg-white p-3 text-xs shadow-sm border border-slate-100">
                        <div className="flex items-center gap-2">
                             <Layout className="h-3 w-3 text-slate-400" />
                             <span className="text-slate-500">Style:</span>
                             <span className="font-medium">{logo.inputData.logo_style}</span>
                        </div>
                        <div className="flex items-center gap-2">
                             <Layers className="h-3 w-3 text-slate-400" />
                             <span className="text-slate-500">Vision:</span>
                             <span className="truncate font-medium max-w-[120px]">{logo.inputData.vision}</span>
                        </div>
                         <div className="flex items-center gap-2">
                             <CreditCard className="h-3 w-3 text-slate-400" />
                             <span className="text-slate-500">Credits:</span>
                             <span className="font-bold text-red-500">{logo.creditCost}</span>
                        </div>
                        <div className="flex items-center gap-2">
                             <Calendar className="h-3 w-3 text-slate-400" />
                             <span className="text-slate-500">Date:</span>
                             <span className="font-medium">{format(new Date(logo.createdAt), "MMM d, yyyy")}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatusBadge({ status, cost }: { status: string; cost: number }) {
    const isCompleted = status === "completed";
    return (
        <div className="flex flex-col items-end gap-1">
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                isCompleted ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
            }`}>
                {status}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">Cost: {cost} credits</span>
        </div>
    );
}
