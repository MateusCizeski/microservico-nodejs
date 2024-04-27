import { kafkaConsumer } from "../kafka.consumer";
import { prismaClient } from "../../../database/prismaClient";

type ProductConsumer = {
    id: string,
    code: string
}

export async function createProductConsumer() {
    console.log('product product');
    const consumer = await kafkaConsumer("PRODUCT_CREATED");
    await consumer.run({
        eachMessage: async ({ message }) => {
            const messagetoString = message.value!.toString();
            const product = JSON.parse(messagetoString) as ProductConsumer;
            
            await prismaClient.product.create({
                data: {
                    externalId: product.id,
                    code: product.code
                }
            });
        }
    });
}

createProductConsumer();