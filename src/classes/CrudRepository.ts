import {DomainError} from "../exceptions/DomainError.ts";
import {DbService} from "./services/DbService.ts";

export abstract class CrudRepository<T extends {id: number}> extends DbService  {
    protected items: T[] = [];

    async add(item: T): Promise<void> {
        if(this.items.some(i => i.id === item.id)) {
            throw new DomainError(`Element o id ${item.id} już istnieje`);
        }
        this.items.push(item);
    }

    async delete(id: number): Promise<void> {
        const index = this.items.findIndex(i => i.id === id);
        if (index === -1) throw new DomainError(`Element nie istnieje`);
        this.items.splice(index, 1);
    }

    async update(idToUpdate: number, item: T) {
        const index = this.items.findIndex(i => i.id === idToUpdate);
        if(index === -1) {
            throw new DomainError(`Element nie istnieje`);
        }
        this.items[index] = item;
}
    async findById(id: number): Promise<T | null> {
        return this.items.find(i => i.id === id) || null;
    }
}