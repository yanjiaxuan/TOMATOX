const configName = 'tomatox_play_config';
const enabledOriginName = 'tomatox_enabled_origin';
const tomatoxThemeName = 'tomatox_theme';
let playConfig: IplayConfig = {
    voice: 0.7,
    speed: 1
};
let enabledOrigin: string | null = localStorage.getItem(enabledOriginName);
let tomatoxTheme = localStorage.getItem(tomatoxThemeName);
if (!tomatoxTheme) {
    tomatoxTheme = 'dark';
    localStorage.setItem(tomatoxThemeName, tomatoxTheme);
}

if (!enabledOrigin) {
    enabledOrigin = '默认';
    setEnabledOrigin(enabledOrigin);
}

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

export function getEnabledOrigin() {
    return enabledOrigin;
}

export function setEnabledOrigin(id: string) {
    enabledOrigin = id;
    localStorage.setItem(enabledOriginName, id);
}

export function getTheme(): any {
    return tomatoxTheme;
}

export function setTheme(theme: string) {
    tomatoxTheme = theme;
    localStorage.setItem(tomatoxThemeName, theme);
}
