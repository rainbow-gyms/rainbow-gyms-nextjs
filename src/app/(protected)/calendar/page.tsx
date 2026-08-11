import SimpleCalendar from "@/components/Calendar";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Calendar = async () => {
    const sessions = await prisma.session.findMany({
        select: {
            id: true,
            name: true,
            startTime: true,
            workoutType: true,
            status: true,
            maxPeople: true,
            _count: {
                select: { participants: true },
            },
        }
    });

    return (
        <main>
            <SimpleCalendar sessions={sessions} />
        </main>
    );
}

export default Calendar;