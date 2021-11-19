import { getRepository } from "typeorm";
import { UpdateResult } from "typeorm";
import { DeleteResult } from "typeorm";
import { Room } from "./../entity/Room.entity";
export interface IRoomDao {
  add: (room: Room) => Promise<Room> | undefined;
  update: (room: Room) => Promise<UpdateResult> | undefined;
  delete: (listID: string[]) => Promise<DeleteResult> | undefined;
  getOne: (id: string) => Promise<Room | undefined>;
  getAll: () => Promise<Room[]> | undefined;
}

export class RoomDao implements IRoomDao {
  add(room: Room): Promise<Room> | undefined {
    return getRepository(Room).save(room);
  }

  update(room: Room): Promise<UpdateResult> | undefined {
    return getRepository(Room).update({ id: room.id }, room);
  }

  delete(listID: string[]): Promise<DeleteResult> | undefined {
    return getRepository(Room).delete(listID);
  }

  getOne(id: string): Promise<Room | undefined> {
    return getRepository(Room).findOne({ id });
  }

  getAll(): Promise<Room[]> | undefined {
    return getRepository(Room).find();
  }
}
