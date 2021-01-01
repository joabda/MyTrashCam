import { Sponsor } from '../sponsor';

export interface SponsorJSON {
    title: string,
    text: string[],
    download: string,
    sponsors: {class: string, elements: Sponsor[]}[]
}