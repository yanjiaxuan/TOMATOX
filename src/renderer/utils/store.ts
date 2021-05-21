class Store {
    private state: Record<string, any>

    private subscribers: Record<string, Function[]>

    constructor() {
        this.state = {
            ORIGIN_LIST: '',
            GLOBAL_LOADING: true
        }
        this.subscribers = {}
    }
    
    public setState(key: string, value: any) {
        this.state[key] = value
        this.subscribers[key] && this.subscribers[key].forEach(cb => {
            cb(value)
        })
    }

    public getState(key: string) {
        return this.state[key]
    }
    
    public subscribe(key: string, cb: Function) {
        this.subscribers[key] = this.subscribers[key]||[]
        this.subscribers[key].push(cb)
        return () => {
            this.unSubscribe(key, cb)
        }
    }
    
    public unSubscribe(key: string, cb: Function) {
        this.subscribers[key] && this.subscribers[key].indexOf(cb) >= 0 &&
        this.subscribers[key].splice(this.subscribers[key].indexOf(cb), 1)
    }
}

export default new Store();