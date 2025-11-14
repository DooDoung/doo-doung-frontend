import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { dayNames } from "@/lib/session-availible-table";

async function getAvailableSlots(
    weekIndex: number,
    courseId: string | undefined,
    accessToken: string | undefined,
): Promise<Array<{ day: string; time: string }>> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/prophet/availability/${courseId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        },
    );

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    const data = responseData.data ?? [];
    const slots: Array<{ day: string; time: string }> = [];

    const today = new Date();
    const currentMonday = new Date(today);
    const dayOfWeek = today.getDay();
    const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    currentMonday.setDate(today.getDate() + daysToMonday);
    currentMonday.setDate(currentMonday.getDate() + weekIndex * 7);

    const weekStart = new Date(currentMonday);
    const weekEnd = new Date(currentMonday);
    weekEnd.setDate(weekEnd.getDate() + 6);

    data.forEach((item: any) => {
        const itemDate = new Date(item.date);

        if (itemDate >= weekStart && itemDate <= weekEnd) {
            const dayName = dayNames[itemDate.getDay()];
            const time = item.startTime; 

            slots.push({ day: dayName, time });
        }
    });

    return slots;
}

async function getBookingSlots(
    prophetId: string | undefined,
    accessToken: string | undefined,
): Promise<Array<{ id: string; day: string; time: string; variant: string }>> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/${prophetId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        },
    );
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseData = await response.json();
    const data = responseData.data ?? [];
    const slots: Array<{ id: string; day: string; time: string; variant: string }> = [];

    const getTimeString = (date: Date): string => {
        const h = String(date.getHours()).padStart(2, "0");
        const m = String(date.getMinutes()).padStart(2, "0");
        return `${h}:${m}`;
    };

    data.forEach((b: any) => {
        const start = new Date(b.startDateTime);
        const end = new Date(b.endDateTime);
        const variant = "TAKEN";
        const day = dayNames[new Date(b.startDateTime).getDay()];  

        for (let t = new Date(start); t < end; t.setUTCMinutes(t.getUTCMinutes() + 15)) {
            slots.push({
                id: b.id,
                day,
                time: getTimeString(new Date(t)),
                variant,
            });
        }
    });
    return slots;
}

export function toDisplaySlot({
  start_datetime,
  end_datetime,
}: {
  start_datetime: string;
  end_datetime: string;
}) {
  const start = new Date(start_datetime);
  const end = new Date(end_datetime);

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const selectedDate = start.toLocaleDateString("en-GB", dateOptions);

  const formatTime = (d: Date) => {
    const h = d.getHours();
    const m = String(d.getMinutes()).padStart(2, "0");
    const suffix = h >= 12 ? "PM" : "AM";
    const hour12 = ((h + 11) % 12) + 1;
    return `${String(hour12).padStart(2, "0")}:${m} ${suffix}`;
  };

  const selectedTime = `${formatTime(start)}-${formatTime(end)}`;

  return { selectedDate, selectedTime };
}

export function useCustomerBookSlot(
    courseId: string | undefined, 
    prophetId: string | undefined,
    accessToken: string | undefined,
) {
    const { data: session } = useSession();
    const [currentWeek, setCurrentWeek] = useState(0);
    const [weeklyAvailableSlot, setWeeklyAvailableSlot] = useState<
        Record<number, Array<{ day: string; time: string }>>
    >({});
    const [bookingSlots, setBookingSlots] = useState<
        Array<{ id: string; day: string; time: string; variant: string }>
    >([]);

    // const accessToken = (session?.user as any)?.accessToken;

    useEffect(() => {
        if (!accessToken) return;

        const fetchAvailData = async () => {
        const availabilityTemp: Record<
            number,
            Array<{ day: string; time: string }>
        > = {};
        for (let week = 0; week < 4; week++) {
            availabilityTemp[week] = await getAvailableSlots(
                week,
                courseId,
                accessToken,
            );
        }
        setWeeklyAvailableSlot(availabilityTemp);
        };
        fetchAvailData();
    }, [accessToken, courseId]);

    
    //get booking slots from prophet api
    useEffect(() => {
        if (!accessToken || !prophetId) return;
        const fetchBookingSlots = async () => {
            const slots = await getBookingSlots(prophetId, accessToken);
            setBookingSlots(slots);
        };
        fetchBookingSlots();
    }, [accessToken, prophetId]);

    const goToPreviousWeek = () => {
        if (currentWeek > 0) {
            setCurrentWeek(currentWeek - 1);
        }
    };

    const goToNextWeek = () => {
        if (currentWeek < 3) {
            setCurrentWeek(currentWeek + 1);
        }
    };

    const availableSlots = weeklyAvailableSlot[currentWeek] || [];

    return {
        currentWeek,
        availableSlots,
        bookingSlots,
        goToPreviousWeek,
        goToNextWeek,
    };
}