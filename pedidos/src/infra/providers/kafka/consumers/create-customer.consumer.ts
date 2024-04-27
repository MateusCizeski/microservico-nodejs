import { kafkaConsumer } from "../kafka.consumer";
import { prismaClient } from "../../../database/prismaClient";

type CustomerConsumer = {
    email: string,
    id: string
}

export async function createCustomerConsumer() {
    console.log('customer consumer');
    const consumer = await kafkaConsumer("CUSTOMER_CREATED");
    await consumer.run({
        eachMessage: async ({ message }) => {
            const messagetoString = message.value!.toString();
            const customer = JSON.parse(messagetoString) as CustomerConsumer;
            
            await prismaClient.customer.create({
                data: {
                    externalId: customer.id,
                    email: customer.email
                }
            });
        }
    });
}

createCustomerConsumer();