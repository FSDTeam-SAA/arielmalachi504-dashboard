export interface UserProfile {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: "admin" | "manager" | "user";
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface PosterInputData {
    title: string;
    subtitle: string;
    description: string;
    brand_name: string;
    primary_color: string;
    secondary_color: string;
    cta: string;
    design_style_prompt: string;
    style_preset: string;
    output_format: string;
    language: string;
    variations: string;
    image: string;
}

export interface LogoInputData {
    brand_name: string;
    tagline: string;
    vision: string;
    industry: string;
    logo_style: string;
    color_palette: string;
    language: string;
}

export interface GenerationBase {
    _id: string;
    generationType: "poster" | "logo";
    jobId: string;
    taskIds: string[];
    status: "completed" | "processing" | "failed";
    creditCost: number;
    creditDeducted: boolean;
    resultUrls: string[];
    error: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface PosterGeneration extends GenerationBase {
    generationType: "poster";
    inputData: PosterInputData;
}

export interface LogoGeneration extends GenerationBase {
    generationType: "logo";
    inputData: LogoInputData;
}

export interface UserGenerationHistory {
    userId: string;
    userName: string;
    userEmail: string;
    posterCount: number;
    logoCount: number;
    totalGenerations: number;
    remainingCredits: number;
    plan: {
        _id: string;
        name: string;
        monthlyPrice: number;
        credits: number;
    } | null;
    subscriptionStatus: {
        isSubscribed: boolean;
        expiryDate: string | null;
        subscribedDate: string | null;
    };
    posters: PosterGeneration[];
    logos: LogoGeneration[];
}

export interface PaginationInfo {
    currentPage: string;
    totalPages: number;
    totalData: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export interface UserListResponse {
    status: boolean;
    message: string;
    data: {
        generationSummary: UserGenerationHistory[];
        paginationInfo: PaginationInfo;
    };
}
