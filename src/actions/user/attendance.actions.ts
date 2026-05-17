'use server';
// ** Hooks && Tools
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";




export const getAttendanceListAction = async (
    userId?: string,
    page = 1,
    limit = 10
) => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    if (!userId) {
        return {
            data: [],
            total: 0,
            page: 1,
            totalPages: 1,
        };
    }

    const gym = await prisma.gym.findFirst({
        where: { ownerId: userId },
    });

    const gymId = gym?.id;

    if (!gymId) {
        return {
            data: [],
            total: 0,
            page: 1,
            totalPages: 1,
        };
    }

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
        prisma.attendance.findMany({
            where: {
                gymId,
                checkIn: {
                    gte: startOfDay,
                },
            },
            include: {
                member: {
                    select: {
                        name: true,
                        phone: true,
                        subscriptionType: true,
                        subscriptionStatus: true,
                        startDate: true,
                        endDate: true,
                    },
                },
            },
            orderBy: { checkIn: "desc" },
            skip,
            take: limit,
        }),
        prisma.attendance.count({
            where: { gymId },
        }),
    ]);

    return {
        data,
        total,
        page,
        totalPages: Math.ceil(total / limit),
    };
};



// ** Create
export const createAttendanceAction = async (memberId: string) => {
    const userId = ( await cookies()).get("gym_tank_token" )?.value;
    const gym = await prisma.gym.findFirst({
        where: { ownerId: userId },
    });
    const gymId = gym?.id;
    const now = new Date();

    const member = await prisma.member.findUnique({
        where: { id: memberId },
    });

    if (!member) {
        throw new Error("العضو غير موجود");
    }
    
    if (!gymId) {
        throw new Error("الجيم غير موجود");
    }


    if (member.endDate && member.endDate < now) {
        throw new Error("اشتراك العضو منتهي، يرجى التجديد أولاً");
    }

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const alreadyCheckedIn = await prisma.attendance.findFirst({
        where: {
        memberId,
        checkIn: {
            gte: startOfDay,
        },
        },
    });

    if (alreadyCheckedIn) {
        throw new Error("تم تسجيل دخول هذا العضو بالفعل اليوم");
    }


    const attendance = await prisma.attendance.create({
        data: {
        memberId,
        gymId,
        },
    });
    revalidatePath("/user/members");
    revalidatePath("/user");
    return attendance;
};

export const createCheckoutAction = async (memberId: string) => {
    const userId = (await cookies()).get("gym_tank_token")?.value;

    const gym = await prisma.gym.findFirst({
        where: { ownerId: userId },
    });

    const gymId = gym?.id;
    const now = new Date();

    if (!gymId) {
        throw new Error("الجيم غير موجود");
    }

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const attendance = await prisma.attendance.findFirst({
        where: {
            memberId,
            gymId,
            checkIn: {
                gte: startOfDay,
            },
        },
        orderBy: {
            checkIn: "desc",
        },
    });

    if (!attendance) {
        throw new Error("لم يتم تسجيل دخول هذا العضو اليوم");
    }

    if (attendance.checkOut) {
        throw new Error("تم تسجيل انصراف هذا العضو بالفعل");
    }

    // تحديث الانصراف
    const updatedAttendance = await prisma.attendance.update({
        where: {
            id: attendance.id,
        },
        data: {
            checkOut: now,
        },
    });

    revalidatePath("/user/members");
    revalidatePath("/user");

    return updatedAttendance;
};

// ** Quick Check-in / Out Action
export const quickCheckInAction = async (identifier: string, mode: "CHECKIN" | "CHECKOUT" = "CHECKIN") => {
    try {
        const userId = (await cookies()).get("gym_tank_token")?.value;
        const gym = await prisma.gym.findFirst({
            where: { ownerId: userId },
        });
        const gymId = gym?.id;

        if (!gymId) {
            return {
                success: false,
                code: "NO_GYM",
                message: "الجيم غير موجود أو لم يتم العثور على حسابك",
            };
        }

        const cleanIdentifier = identifier.trim();
        if (!cleanIdentifier) {
            return {
                success: false,
                code: "EMPTY_INPUT",
                message: "يرجى إدخال رقم الموبايل 📱",
            };
        }

        const member = await prisma.member.findFirst({
            where: {
                gymId,
                phone: cleanIdentifier,
            }
        });

        if (!member) {
            return {
                success: false,
                code: "NOT_FOUND",
                message: "رقم الموبايل هذا غير مسجل في هذا النادي ❌",
            };
        }

        const now = new Date();

        // 1. Validation for expired subscriptions
        if (member.subscriptionStatus !== "ACTIVE" || (member.endDate && member.endDate < now)) {
            if (member.subscriptionStatus === "ACTIVE") {
                await prisma.member.update({
                    where: { id: member.id },
                    data: { subscriptionStatus: "EXPIRED" }
                });
            }
            return {
                success: false,
                code: "EXPIRED",
                message: "اشتراك العضو منتهي، يرجى التجديد أولاً ⚠️",
                member: {
                    id: member.id,
                    name: member.name,
                    phone: member.phone,
                    subscriptionType: member.subscriptionType,
                    endDate: member.endDate,
                }
            };
        }

        // 2. CHECK-IN MODE
        if (mode === "CHECKIN") {
            const startOfDay = new Date();
            startOfDay.setHours(0, 0, 0, 0);

            const alreadyCheckedIn = await prisma.attendance.findFirst({
                where: {
                    memberId: member.id,
                    gymId,
                    checkIn: {
                        gte: startOfDay,
                    },
                },
            });

            if (alreadyCheckedIn) {
                return {
                    success: false,
                    code: "ALREADY_CHECKED_IN",
                    message: "العضو سجل حضور بالفعل اليوم 🔁",
                    member: {
                        id: member.id,
                        name: member.name,
                        phone: member.phone,
                        subscriptionType: member.subscriptionType,
                        endDate: member.endDate,
                    }
                };
            }

            const attendance = await prisma.attendance.create({
                data: {
                    memberId: member.id,
                    gymId,
                },
            });

            revalidatePath("/user/members");
            revalidatePath("/user");

            let warningCode = "SUCCESS_CHECKIN";
            let warningMessage = "تم تسجيل الحضور بنجاح ✅";
            if (member.endDate) {
                const diffTime = member.endDate.getTime() - now.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                
                if (diffDays === 1) {
                    warningCode = "EXPIRING_TOMORROW";
                    warningMessage = `تم تسجيل الحضور. تنبيه هام جداً: ينتهي اشتراك العضو غداً! 🚨`;
                } else if (diffDays > 1 && diffDays <= 7) {
                    warningCode = "EXPIRING_SOON";
                    warningMessage = `تم تسجيل الحضور. تنبيه: ينتهي اشتراك العضو بعد ${diffDays} أيام ⚠️`;
                }
            }

            return {
                success: true,
                code: warningCode,
                message: warningMessage,
                member: {
                    id: member.id,
                    name: member.name,
                    phone: member.phone,
                    subscriptionType: member.subscriptionType,
                    endDate: member.endDate,
                },
                attendance,
            };
        }

        // 3. CHECK-OUT MODE
        if (mode === "CHECKOUT") {
            const startOfDay = new Date();
            startOfDay.setHours(0, 0, 0, 0);

            const attendance = await prisma.attendance.findFirst({
                where: {
                    memberId: member.id,
                    gymId,
                    checkIn: {
                        gte: startOfDay,
                    },
                },
                orderBy: {
                    checkIn: "desc",
                },
            });

            if (!attendance) {
                return {
                    success: false,
                    code: "NO_CHECKIN_TODAY",
                    message: "لم يتم تسجيل دخول هذا العضو اليوم ❌",
                    member: {
                        id: member.id,
                        name: member.name,
                        phone: member.phone,
                        subscriptionType: member.subscriptionType,
                        endDate: member.endDate,
                    }
                };
            }

            if (attendance.checkOut) {
                return {
                    success: false,
                    code: "ALREADY_CHECKED_OUT",
                    message: "تم تسجيل انصراف هذا العضو بالفعل اليوم 🔁",
                    member: {
                        id: member.id,
                        name: member.name,
                        phone: member.phone,
                        subscriptionType: member.subscriptionType,
                        endDate: member.endDate,
                    }
                };
            }

            const updatedAttendance = await prisma.attendance.update({
                where: {
                    id: attendance.id,
                },
                data: {
                    checkOut: now,
                },
            });

            revalidatePath("/user/members");
            revalidatePath("/user");

            return {
                success: true,
                code: "SUCCESS_CHECKOUT",
                message: "تم تسجيل الانصراف بنجاح ✅",
                member: {
                    id: member.id,
                    name: member.name,
                    phone: member.phone,
                    subscriptionType: member.subscriptionType,
                    endDate: member.endDate,
                },
                attendance: updatedAttendance,
            };
        }

        return {
            success: false,
            code: "INVALID_MODE",
            message: "الوضع المحدد غير صالح",
        };
    } catch (err: any) {
        return {
            success: false,
            code: "ERROR",
            message: err.message || "حدث خطأ أثناء معالجة الطلب",
        };
    }
};