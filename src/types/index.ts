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
    startDate: Date;
    ownerId: string;
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