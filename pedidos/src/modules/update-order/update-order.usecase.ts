import { prismaClient } from "../../infra/database/prismaClient"
import { KafkaSendMessage } from "../../infra/providers/kafka/producer";

type UpdateOrderequest = {
   id: string,
   status: string
}

export class updateOrderUseCase {
    constructor() {}

    async execute(data: UpdateOrderequest) {
       const orderUpdate = await prismaClient.order.update({
            where: {
                id: data.id
            },
            data: {
                status: data.status
            }
        });

        const kafkaSendMessage = new KafkaSendMessage();
        await kafkaSendMessage.execute('ORDER_STATUS', {
            customerId: orderUpdate.customerId,
            status: orderUpdate.status
        });
    }
}