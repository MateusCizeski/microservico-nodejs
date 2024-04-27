import { Request, Response } from 'express';
import { createOrderUseCase } from './create-order.usecase';

export class CreateOrderController {
    constructor() {}

    async handle(request: Request, response: Response) {
        const useCase = new createOrderUseCase();
        const order = await useCase.execute(request.body);

        return response.json(order);
    }
}