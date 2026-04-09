"use client";

import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { CreateSubscriptionPlan, SubscriptionPlan } from "@/components/features/subscriptionManagement/types/subscription";

const subscriptionSchema = z.object({
    name: z.string().min(1, "Name is required"),
    monthlyPrice: z.coerce.number().min(0, "Price must be at least 0"),
    description: z.string().min(1, "Description is required"),
    credits: z.coerce.number().min(0, "Credits must be at least 0"),
    features: z.array(z.string()).min(1, "At least one feature is required"),
});

type SubscriptionFormValues = z.infer<typeof subscriptionSchema>;

interface SubscriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreateSubscriptionPlan) => void;
    initialData?: SubscriptionPlan | null;
    title: string;
    isLoading?: boolean;
}

export function SubscriptionModal({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    title,
    isLoading,
}: SubscriptionModalProps) {
    const [newFeature, setNewFeature] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        getValues,
        watch,
        formState: { errors },
    } = useForm<SubscriptionFormValues>({
        resolver: zodResolver(subscriptionSchema) as Resolver<SubscriptionFormValues>,
        defaultValues: {
            name: "",
            monthlyPrice: 0,
            description: "",
            credits: 0,
            features: [],
        },
    });

    const features = watch("features") || [];

    useEffect(() => {
        if (initialData) {
            reset({
                name: initialData.name,
                monthlyPrice: initialData.monthlyPrice,
                description: initialData.description,
                credits: initialData.credits,
                features: initialData.features,
            });
        } else {
            reset({
                name: "",
                monthlyPrice: 0,
                description: "",
                credits: 0,
                features: [],
            });
        }
    }, [initialData, reset, isOpen]);

    const handleAddFeature = () => {
        if (newFeature.trim()) {
            const currentFeatures = getValues("features") || [];
            const updatedFeatures = [...currentFeatures, newFeature.trim()];
            setValue("features", updatedFeatures, { shouldValidate: true });
            setNewFeature("");
        }
    };

    const handleRemoveFeature = (index: number) => {
        const currentFeatures = getValues("features") || [];
        const updatedFeatures = currentFeatures.filter((_, i) => i !== index);
        setValue("features", updatedFeatures, { shouldValidate: true });
    };

    const onFormSubmit = (data: SubscriptionFormValues) => {
        onSubmit(data);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Plan Name</Label>
                        <Input id="name" {...register("name")} placeholder="e.g. Basic Plan" />
                        {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="monthlyPrice">Monthly Price ($)</Label>
                            <Input
                                id="monthlyPrice"
                                type="number"
                                {...register("monthlyPrice")}
                                placeholder="0"
                            />
                            {errors.monthlyPrice && <p className="text-xs text-red-500">{errors.monthlyPrice.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="credits">Credits</Label>
                            <Input
                                id="credits"
                                type="number"
                                {...register("credits")}
                                placeholder="100"
                            />
                            {errors.credits && <p className="text-xs text-red-500">{errors.credits.message}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Input id="description" {...register("description")} placeholder="Short description of the plan" />
                        {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>Features</Label>
                        <div className="flex gap-2">
                            <Input
                                value={newFeature}
                                onChange={(e) => setNewFeature(e.target.value)}
                                placeholder="Add a feature"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleAddFeature();
                                    }
                                }}
                            />
                            <Button type="button" onClick={handleAddFeature} size="icon">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        {errors.features && <p className="text-xs text-red-500">{errors.features.message}</p>}
                        <div className="mt-2 flex flex-wrap gap-2">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm"
                                >
                                    <span>{feature}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveFeature(index)}
                                        className="text-muted-foreground hover:text-foreground"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose} className="cursor-pointer">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading} className="cursor-pointer">
                            {isLoading ? "Saving..." : "Save Plan"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
