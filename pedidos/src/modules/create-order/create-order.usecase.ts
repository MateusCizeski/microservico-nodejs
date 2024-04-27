import { prismaClient } from "../../infra/database/prismaClient"

type CreateOrderequest = {
    customerId: string,
    items: [{
        productId: string,
        quantity: number
    }]
}

export class createOrderUseCase {
    constructor() {}

    async execute(data: CreateOrderequest) {

        //requisição para a api de produtos para verificar se tem estoque do produto
        //axios.get('/products')

        const order = await prismaClient.order.create({
            data: {
                customerId: data.customerId,
                status: "AGUARDANDO_PAGAMENTO",
                OrderItems: {
                    createMany: {
                        data: data.items
                    }
                }
            }
        });

        console.log(order)

        return order;
    }
}