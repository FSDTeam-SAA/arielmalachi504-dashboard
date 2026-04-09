export interface AnalyticsStatId {
    year: number;
    month: number;
}

export interface SubscribedUserStat {
    _id: AnalyticsStatId;
    count: number;
}

export interface RevenueStat {
    _id: AnalyticsStatId;
    totalRevenue: number;
    count: number;
}

export interface YearlyAnalytic {
    year: number;
    totalUsers: number;
    totalLogoDesigns: number;
    totalPosterDesigns: number;
    activeUsers: number;
}

export interface AnalyticsData {
    totalUsers: number;
    subscribedUsersStats: SubscribedUserStat[];
    revenueStats: RevenueStat[];
    totalPosterDesigns: number;
    totalLogoDesigns: number;
    totalRevenue: number;
    yearlyAnalytics: YearlyAnalytic[];
}

export interface AnalyticsResponse {
    status: boolean;
    message: string;
    data: AnalyticsData;
}
