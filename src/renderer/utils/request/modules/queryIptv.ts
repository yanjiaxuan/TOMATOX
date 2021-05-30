import Req from '@/utils/request';
import { IPTV_ORIGIN_URL } from '@/utils/constants';

export function queryIptvResource(): any {
    return Req({
        method: 'get',
        url: IPTV_ORIGIN_URL
    });
}
