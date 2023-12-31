import {Injectable} from "@nestjs/common";
import {OnEvent} from "@nestjs/event-emitter";
import {UserCreatedEvent} from "../../user/events/user-created.event";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../entities/user.entity";
import {Repository} from "typeorm";

@Injectable()
export class UserCreatedEventHandlerService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    @OnEvent('user.created')
    async handleUserCreatedEvent(event: UserCreatedEvent) {
        const user = this.userRepository.create({
            id: event.payload.id,
            username: event.payload.username,
        });
        return this.userRepository.save(user);
    }
}