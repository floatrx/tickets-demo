import { Prisma, PrismaClient } from '@prisma/client';

console.log('Seeding database...');

const prisma = new PrismaClient();

const airlines: Prisma.AirlineCreateInput[] = [
  { name: 'Airline4Europe', logo: 'a4e.svg' },
  { name: 'Turkish Airlines', logo: 'turkish.svg' },
  { name: 'Emirates', logo: 'emirates.svg' },
];

const directions: Prisma.DirectionCreateInput[] = [{ name: 'Outbound' }, { name: 'Return' }];

const transfers: Prisma.TransferCreateInput[] = [
  { name: 'HKG', description: 'Hong Kong International Airport' },
  { name: 'JNB', description: 'O. R. Tambo International Airport' },
  { name: 'DXB', description: 'Dubai International Airport' },
];

const flights: Prisma.FlightCreateInput[] = [
  {
    number: 'F4U-001',
    departureTime: new Date('2022-01-01T00:00:00Z'),
    arrivalTime: new Date('2022-01-01T00:00:00Z'),
    duration: 1440,
    direction: { connect: { id: 1 } }, // Outbound
    transfers: { connect: [{ id: 1 }] }, // HKG
  },
  {
    number: 'F4U-002',
    departureTime: new Date('2022-01-10T00:00:00Z'),
    arrivalTime: new Date('2022-01-10T06:00:00Z'),
    duration: 360,
    direction: { connect: { id: 2 } }, // Return
    transfers: { connect: [{ id: 1 }] },
  },
];

const tickets: Prisma.TicketCreateInput[] = [
  {
    price: 13300,
    airline: { connect: { id: 1 } }, // Airline4Europe
    flights: {
      // Attach flights to the ticket
      connect: [
        { id: 1 }, // F4U-001
        { id: 2 }, // F4U-002
      ],
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);

  // Create transfers, directions, airlines
  await prisma.transfer.createMany({ data: transfers });
  await prisma.direction.createMany({ data: directions });
  await prisma.airline.createMany({ data: airlines });

  // Create flights
  for (const flight of flights) {
    await prisma.flight.create({ data: flight });
  }

  // Create tickets
  for (const ticket of tickets) {
    await prisma.ticket.create({ data: ticket });
  }

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e.message);
    await prisma.$disconnect();
    process.exit(1);
  });
