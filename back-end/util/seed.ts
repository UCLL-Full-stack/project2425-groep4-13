// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { set } from 'date-fns';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.family.deleteMany();
    await prisma.user.deleteMany();
    await prisma.item.deleteMany();
    await prisma.product.deleteMany();


    // users

    const userJohndoe = await prisma.user.create({
        data: {
            email: "john.doe@ucll.be",
            firstName: "John",
            lastName: "Doe",
            password: await bcrypt.hash("Secret123", 10),
            role: "owner",
        },
    });

    const userJanedoe = await prisma.user.create({
        data: {
            email: "jane.doe@ucll.be",
            firstName: "Jane",
            lastName: "Doe",
            password: await bcrypt.hash("Secret123", 10),
            role: "parent",
        },
    });

    const userPlaydoe = await prisma.user.create({
        data: {
            email: "play.doe@ucll.be",
            firstName: "Play",
            lastName: "Doe",
            password: await bcrypt.hash("Secret123", 10),
            role: "child",
        },
    });

    // const userMikedoe = await prisma.user.create({
    //     data: {
    //         email: "mike.doe@ucll.be",
    //         firstName: "Mike",
    //         lastName: "Doe",
    //         password: await bcrypt.hash("Saaaaaaj", 10),
    //         role: "child",
    //     },
    // });

    const userJanesmith = await prisma.user.create({
        data: {
            email: "jane.smith@ucll.be",
            firstName: "Jane",
            lastName: "Smith",
            password: await bcrypt.hash("Secret123", 10),
            role: "owner",
        },
    });

    const userBabysmith = await prisma.user.create({
        data: {
            email: "baby.smith@ucll.be",
            firstName: "Baby",
            lastName: "Smith",
            password: await bcrypt.hash("Secret123", 10),
            role: "child",
        },
    });


    // families

    const familyDoe = await prisma.family.create({
        data: {
            name: "Doe",
            members: {
                connect: [{id: userJohndoe.id}, {id: userJanedoe.id}, {id: userPlaydoe.id}]
            }
        },
    });

    const familySmith = await prisma.family.create({
        data: {
            name: "Smith",
            members: {
                connect: [{id: userJanesmith.id}, {id: userBabysmith.id}]
            }
        },
    });

}

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();
