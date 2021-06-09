import { getTheme } from '@/utils/db/storage';

class Store {
    private state: Record<string, any>;

    private subscribers: Record<string, Function[]>;

    constructor() {
        this.state = {
            SITE_ADDRESS: undefined,
            GLOBAL_LOADING: false, // 全局loading
            SEARCH_KEYWORDS: '', // 搜索关键字
            CURRENT_PATH: '', // 当前页面路径
            GLOBAL_SEARCH_ENABLE: true, // 全局搜索按钮状态
            TOMATOX_THEME: getTheme()
        };
        this.subscribers = {};
    }

    public setState(key: string, value: any) {
        this.state[key] = value;
        this.subscribers[key] &&
            this.subscribers[key].forEach(cb => {
                cb(value);
            });
    }

    public getState(key: string) {
        return this.state[key];
    }

    public subscribe(key: string, cb: Function) {
        this.subscribers[key] = this.subscribers[key] || [];
        this.subscribers[key].push(cb);
        return () => {
            this.unSubscribe(key, cb);
        };
    }

    public unSubscribe(key: string, cb: Function) {
        this.subscribers[key] &&
            this.subscribers[key].indexOf(cb) >= 0 &&
            this.subscribers[key].splice(this.subscribers[key].indexOf(cb), 1);
    }
}

export default new Store();
