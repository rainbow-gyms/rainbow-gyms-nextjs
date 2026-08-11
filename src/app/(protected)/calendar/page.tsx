import SimpleCalendar from "@/components/Calendar";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Calendar = async () => {
    const sessions = await prisma.session.findMany({
        include: {
            host: {
                include: {
                    profile: true,
                },
            },
            participants: {
                include: {
                    user: {
                        include: {
                            profile: true,
                        },
                    },
                },
            },
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