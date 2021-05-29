const configName = 'tomatox_play_config';
let playConfig: IplayConfig = {
    voice: 0.7,
    speed: 1
};

const localConf = localStorage.getItem(configName);
if (!localConf) {
    localStorage.setItem(configName, JSON.stringify(playConfig));
}
playConfig = {
    ...playConfig,
    ...JSON.parse(localStorage.getItem(configName)!)
};

export function getPlayConfig(): IplayConfig {
    return playConfig;
}

export function setPlayConfig(config: IplayConfig) {
    playConfig = {
        ...playConfig,
        ...config
    };
    localStorage.setItem(configName, JSON.stringify(playConfig));
}
