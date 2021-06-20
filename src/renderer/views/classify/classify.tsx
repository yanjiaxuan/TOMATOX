import React, { ReactElement } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import TomatoxWaterfall from '@/components/tomatox-waterfall/tomatox-waterfall';
import { Spin } from 'antd';
import CustomSpin from '@/components/custom-spin/custom-spin';
import { queryResources, queryTypes } from '@/utils/request/modules/queryResources';
import store from '@/utils/store';
import { filterResources } from '@/utils/filterResources';
import cssM from './classify.scss';

export default class Classify extends React.Component<any, any> {
    private page = 0;
    private pageCount = 10;

    constructor(props: any) {
        super(props);
        this.state = {
            types: {},
            selectedType: '',
            cardsData: [],
            recommendLoading: false
        };
    }

    async componentWillMount() {
        this.initResource();
        store.subscribe('SITE_ADDRESS', () => {
            this.page = 0;
            this.pageCount = 10;
            this.setState(
                {
                    types: {},
                    selectedType: '',
                    cardsData: [],
                    recommendLoading: false
                },
                this.initResource
            );
        });
    }

    initResource() {
        store.setState('GLOBAL_LOADING', true);
        queryTypes().then(
            (res: any) => {
                if (!res) {
                    store.setState('GLOBAL_LOADING', false);
                    return;
                }
                const types: Record<string, number> = {};
                res.forEach((item: any) => {
                    types[item.text] = item.id;
                });
                this.setState({
                    types,
                    selectedType: Object.keys(types)[0]
                });
                this.getRecommendLst();
            },
            reason => {
                if (store.getState('GLOBAL_LOADING')) {
                    store.setState('GLOBAL_LOADING', false);
                }
            }
        );
    }

    private getRecommendLst() {
        Promise.all([
            queryResources(++this.page, this.state.types[this.state.selectedType]),
            queryResources(++this.page, this.state.types[this.state.selectedType]),
            queryResources(++this.page, this.state.types[this.state.selectedType])
        ]).then(
            reses => {
                const allList: IplayResource[] = [];
                reses.forEach(res => {
                    if (!res) {
                        this.pageCount = 0;
                        return;
                    }
                    const { list, pagecount } = res;
                    this.pageCount = pagecount;
                    allList.push(...list);
                });
                if (store.getState('GLOBAL_LOADING')) {
                    store.setState('GLOBAL_LOADING', false);
                }
                this.setState({
                    recommendLoading: this.page < this.pageCount,
                    cardsData: [...this.state.cardsData, ...allList]
                });
            },
            reason => {
                if (store.getState('GLOBAL_LOADING')) {
                    store.setState('GLOBAL_LOADING', false);
                }
            }
        );
    }

    private changeType(key: string, item: number) {
        store.setState('GLOBAL_LOADING', true);
        this.setState(
            this.setState({
                selectedType: key,
                cardsData: [],
                recommendLoading: false
            }),
            () => {
                this.page = 0;
                this.getRecommendLst();
            }
        );
    }

    renderClassify() {
        const res: ReactElement[] = [];
        Object.keys(this.state.types).forEach(item => {
            res.push(
                <span
                    key={item}
                    className={`${cssM.typeItem} ${
                        item === this.state.selectedType ? cssM.typeItemActive : ''
                    }`}
                    onClick={() => this.changeType(item, this.state.types[item])}>
                    {item}
                </span>
            );
        });
        return res;
    }

    render(): React.ReactNode {
        return (
            <div className={cssM.fullWrapper}>
                <div className={[cssM.typeWrapper, 'theme-2nd-header'].join(' ')}>
                    {this.renderClassify()}
                </div>
                <div className={cssM.scrollWrapper}>
                    <InfiniteScroll
                        initialLoad={false}
                        pageStart={1}
                        hasMore={this.state.recommendLoading}
                        loadMore={this.getRecommendLst.bind(this)}
                        useWindow={false}>
                        <TomatoxWaterfall data={this.state.cardsData} />
                        {this.state.recommendLoading && (
                            <div style={{ height: 100, position: 'relative' }}>
                                <Spin
                                    size={'large'}
                                    indicator={<CustomSpin />}
                                    spinning={this.state.recommendLoading}
                                    />
                            </div>
                        )}
                    </InfiniteScroll>
                </div>
            </div>
        );
    }
}
