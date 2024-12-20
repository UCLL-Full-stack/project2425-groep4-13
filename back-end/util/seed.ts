// Execute:
//npx ts-node util/seed.ts

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

    // products
    const productEgg = await prisma.product.create({
        data: {
            name: "Egg",
        },
    });

    const productCheese = await prisma.product.create({
        data: {
            name: "Cheese",
        },
    });

    // items
    // MERK OP, die datum set() functie, als je daar month doet dat begint te tellen vanaf 0
    // dus januari = 0, december = 11
    const itemEggs = await prisma.item.create({
        data: {
            product: {
                connect: productEgg,
            },
            amount: 5,
            expirationDate: set(new Date(), { date: 29 , month: 11, year: 2024}),
        }
    })

    const itemCheese = await prisma.item.create({
        data: {
            product: {
                connect: productCheese,
            },
            amount: 2,
            expirationDate: set(new Date(), { date: 30 , month: 11, year: 2024}),
        }
    })

    const itemCheese2 = await prisma.item.create({
        data: {
            product: {
                connect: productCheese,
            },
            amount: 1,
            expirationDate: set(new Date(), { date: 25 , month: 11, year: 2024}),
        }
    })


    // families

    const familyDoe = await prisma.family.create({
        data: {
            name: "Doe",
            members: {
                connect: [{id: userJohndoe.id}, {id: userJanedoe.id}, {id: userPlaydoe.id}]
            },
            items: {
                connect: [{id: itemEggs.id}, {id: itemCheese.id}, {id: itemCheese2.id}]
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
