class Store {
    private state: Record<string, any>;

    private subscribers: Record<string, Function[]>;

    constructor() {
        this.state = {
            ORIGIN_LIST: '', // 视频源列表
            GLOBAL_LOADING: false, // 全局loading
            SITE_ADDRESS: undefined, // 当前视频源
            SEARCH_KEYWORDS: '', // 搜索关键字
            CURRENT_PATH: '', // 当前页面路径
            GLOBAL_SEARCH_ENABLE: true // 全局搜索按钮状态
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
