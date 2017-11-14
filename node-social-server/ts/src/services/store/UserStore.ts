import { inject, injectable } from "inversify";
import { IGraphDb, IDocumentDb} from "../index";
import { TYPES } from "../../constants";
import { User } from "../../database/graph";
import moment = require("moment");

@injectable()
export class UserStore {
    constructor(
        @inject(TYPES.IGraphDb) private db: IGraphDb
    ) {

    }

    async create(username: string, passwordHash: string, email?: string, pictureUrl?: string): Promise<User> {
        if (!username || !passwordHash) {
            throw new Error("username and passwordHash must be provided");
        }
        const exists = await this.exists(username);
        if (exists) {
            throw new Error("User already exists");
        }

        let user = new User();
        user.username = username.trim().toLowerCase();
        user.email = email || `${user.username}@itinetwork.com`;
        user.passwordHash = passwordHash;
        user.enabled = true;
        user.pictureUrl = pictureUrl || "";
        return this.db.createVertex(user);
    }

    find(id: string): Promise<User> {
        return this.db.first<any>( `match (u:User {id: {id}}) return u`, {id} )
            .then( r => r && r.u ? new User(r.u) : null );
    }

    findByName(username: string): Promise<User> {
        return this.db.first<any>( `match (u:User {username: {username}}) return u`, {username} )
            .then( r => r && r.u ? new User(r.u) : null );
    }

    exists(username: string): Promise<boolean> {
        return this.db.first<any>(`match (u:User) where u.username = {username} return u`, { username })
            .then(r => r && r.u ? true : false);
    }

    update(user: User): Promise<User> {
        return this.db.updateVertex(user);
    }
}