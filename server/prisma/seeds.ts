import { PrismaClient } from "@prisma/client";
import log from "utils/logger";

const prisma = new PrismaClient();

async function run() {
   try {
    const user = await prisma.user.upsert({
        where: {email: 'hung@gmail.com'},
        update: {},
        create: {
            username: 'hung',
            email: 'hung@gmail.com',
            password: '123456'
        }
    });
    log.warn(user);
    console.log(user);
   if(user) {
    console.log('success', user);
   } 
   console.log('fail');
   } catch (error) {
    throw new Error(`Error: ${error}`)
   }
}

run()
.catch(e => {
    console.log(e);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect();
})

run();