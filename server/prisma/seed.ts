import { diffBetweenDates } from '@/lib/transform';
import { Prisma, PrismaClient } from '@prisma/client';

console.log('Seeding database...');

const prisma = new PrismaClient();

const countries: Prisma.CountryCreateInput[] = [
  { code: 'LHR', name: 'London', description: 'London' },
  { code: 'DXB', name: 'Dubai', description: 'Dubai International Airport' },
  { code: 'HKG', name: 'Honk Kong', description: 'Hong Kong International Airport' },
  { code: 'JNB', name: 'Tambo', description: 'O. R. Tambo International Airport' },
];
const airlines: Prisma.AirlineCreateInput[] = [
  { name: 'Airline4Europe', logo: 'a4e.svg' },
  { name: 'Turkish Airlines', logo: 'turkish.svg' },
  { name: 'Emirates', logo: 'emirates.svg' },
];

const flights: Prisma.FlightCreateInput[] = [
  {
    number: 'F4U-001',
    departureTime: new Date('2022-01-01T00:00:00Z'),
    arrivalTime: new Date('2022-01-01T08:00:00Z'),
    duration: diffBetweenDates(new Date('2022-01-01T00:00:00Z'), new Date('2022-01-01T08:00:00Z')),
    transfers: { connect: [{ id: 3 }] }, // HKG
    from: { connect: { id: 1 } }, // LHR
    to: { connect: { id: 2 } }, // DXB
  },
  {
    number: 'F4U-002',
    departureTime: new Date('2022-01-02T10:00:00Z'),
    arrivalTime: new Date('2022-01-02T18:00:00Z'),
    duration: diffBetweenDates(new Date('2022-01-02T10:00:00Z'), new Date('2022-01-02T18:00:00Z')),
    transfers: { connect: [{ id: 3 }] }, // HKG
    from: { connect: { id: 2 } }, // DXB
    to: { connect: { id: 1 } }, // LHR
  },
];

const tickets: Prisma.TicketCreateInput[] = [
  {
    price: 13300,
    airline: { connect: { id: 1 } }, // Airline4Europe
    totalTransfers: 1,
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

  // Create countries and airlines
  await prisma.country.createMany({ data: countries });
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
