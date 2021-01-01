import { Member } from '../member';

export interface TeamJSON {
    location: string,
    description: string,
    members: Member[]
}