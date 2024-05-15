import { calculateDiffBetweenDates } from '@/lib/utils';
import { Prisma, PrismaClient } from '@prisma/client';

import { prisma } from '@/lib/prisma';

console.log('Seeding database...');

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

const tickets: Prisma.TicketCreateInput[] = [
  {
    price: 13300,
    airline: { connect: { id: 1 } }, // Airline4Europe
    flights: {
      // Attach flights to the ticket
      create: [
        {
          number: 'F4U-001',
          departureTime: new Date('2022-01-01T00:00:00Z'),
          arrivalTime: new Date('2022-01-01T08:00:00Z'),
          transfers: { connect: [{ id: 3 }] }, // HKG
          from: { connect: { id: 1 } }, // LHR
          to: { connect: { id: 2 } }, // DXB
        },
        {
          number: 'F4U-002',
          departureTime: new Date('2022-01-02T10:00:00Z'),
          arrivalTime: new Date('2022-01-02T18:00:00Z'),
          transfers: { connect: [{ id: 3 }] }, // HKG
          from: { connect: { id: 2 } }, // DXB
          to: { connect: { id: 1 } }, // LHR
        },
      ],
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);

  // Create countries and airlines
  await prisma.country.createMany({ data: countries });
  await prisma.airline.createMany({ data: airlines });

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
