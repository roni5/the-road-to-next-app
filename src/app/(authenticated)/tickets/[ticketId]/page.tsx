import { TicketItem } from '@/features/ticket/components/ticket-item';
import { getTicket } from '@/features/ticket/queries/get-ticket';
import { prisma } from '@/services/prisma';
import { notFound } from 'next/navigation';

type TicketPageProps = {
  params: {
    ticketId: string;
  };
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const ticket = await getTicket(params.ticketId);

  if (!ticket) {
    notFound();
  }

  return (
    <div className="w-96 flex flex-col gap-y-8">
      <TicketItem ticket={ticket} isDetail />
    </div>
  );
};

export default TicketPage;

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
// export const dynamicParams = false;

export async function generateStaticParams() {
  const tickets = await prisma.ticket.findMany();

  return tickets.map((ticket) => ({
    ticketId: ticket.id,
  }));
}
