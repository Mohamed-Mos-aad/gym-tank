import {
  SubscriptionStatus,
  Role
} from "@prisma/client";

//////////////////////////////
// Full Types (with relations)
//////////////////////////////

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: Role;

    gyms: Gym[];

    createdAt: Date;
    updatedAt: Date;
}

export interface Gym {
    id: string;
    name: string;
    specialty: string | null;
    phone: string | null;
    email: string | null;
    address: string | null;
    state: string | null;
    systemLanguage: string;
    capacity: number;
    memberSubscriptionTypes: string[];

    startDate: Date;

    ownerId: string;
    owner: User;

    members: Member[];

    createdAt: Date;
    updatedAt: Date;
}

export interface Member {
    id: string;
    name: string;
    phone: string | null;

    subscriptionType: string | null
    subscriptionStatus: SubscriptionStatus;

    startDate: Date;
    endDate: Date | null;

    gymId: string;
    gym: Gym;

    createdAt: Date;
    updatedAt: Date;
}

//////////////////////////////
// Lite Types (no relations)
//////////////////////////////

export interface UserLite {
    id: string;
    name: string;
    email: string;
    role: Role;
}

export interface GymLite {
    id: string;
    name: string;
    specialty: string | null;
    phone: string | null;
    email: string | null;
    address: string | null;
    state: string | null;
    systemLanguage: string;
    currency?: string;
    capacity?: number;
    memberSubscriptionTypes?: string[];
    memberSubscriptionPrices?: string | null;
    startDate?: Date;
    ownerId: string;
    ownerEmail?: string,
    ownerName?: string,
}

export interface MemberLite {
    id: string;
    name: string;
    phone: string | null;
    subscriptionType: string | null
    subscriptionStatus: SubscriptionStatus;
    startDate: Date;
    endDate: Date | null;
    gymId: string;
}

// ** Attendance
export interface Attendance {
    id: string;

    memberId: string;
    gymId: string;

    checkIn: Date;
    checkOut: Date | null;

    createdAt: Date;
}
export interface AttendanceWithMember {
    id: string;

    memberId: string;
    gymId: string;

    checkIn: Date;
    checkOut: Date | null;

    member: {
        name: string;
        phone: string | null;
        subscriptionType: string | null
        subscriptionStatus: SubscriptionStatus;
        startDate: Date;
        endDate: Date | null;
    };
}