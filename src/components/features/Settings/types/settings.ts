export interface UserProfile {
    _id: string;
    name: string;
    email: string;
    role: string;
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ProfileUpdatePayload {
    name: string;
}

export interface ChangePasswordPayload {
    oldPassword: string;
    newPassword: string;
}

export interface SettingsApiResponse<T> {
    status: boolean;
    message: string;
    data: T;
}
