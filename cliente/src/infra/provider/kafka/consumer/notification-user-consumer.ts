import { kafkaConsumer } from "../kafka.consumer";
import { prismaClient } from "../../../database/PrismaClient";

type CustomerConsumer = {
    customerId: string
    status: string
}

export async function createCustomerConsumer() {
    console.log('customer consumer');
    const consumer = await kafkaConsumer("ORDER_STATUS");
    await consumer.run({
        eachMessage: async ({ message }) => {
            const messagetoString = message.value!.toString();
            const statusConsumer = JSON.parse(messagetoString) as CustomerConsumer;
            
            //enviar mensagem port email
            console.log(`ATUALIZACAO DE STATUS - cliente - ${statusConsumer.customerId}  status - ${statusConsumer.status}`)
        }
    });
}

createCustomerConsumer();