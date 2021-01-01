import { FeatureItem } from '../feature-item';

export interface AboutJSON {
    title: string,
    text: string[],
    button: string,
    comp: string,
    introCompet: string[],
    moreInfo: string,
    first: string,
    features: FeatureItem[]
}