declare module '*.svg';
declare module '*.scss';

declare interface Iorigin {
    id: string;
    key: string;
    name: string;
    api: string;
    download: string;
    group: string;
    isActive: boolean;
    jiexiUrl: string;
    status: string;
}

declare interface IplayResource {
    id: string;
    type: string;
    picture: string;
    lang: string;
    name: string;
    director: string;
    describe: string;
    area: string;
    actor: string;
    class: string;
    doubanId: string;
    doubanScore: string;
    origin: string;
    remark: string;
    tag: string;
    year: string;
    playList: Map<string, string>;
    lastPlaySrc?: string;
    lastPlayTime?: number;
    lastPlayDate?: number;
    lastPlayDrama?: string;
    collectDate?: number;
    lastPlayDesc?: string;
}
