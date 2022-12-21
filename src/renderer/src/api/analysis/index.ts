import { ANALYSIS_ORIGIN_URL } from '../../utils/constant'
import request from '../../utils/request'

export function queryAnalysisSites(): Promise<IResConfig[]> {
  return request({ method: 'get', url: ANALYSIS_ORIGIN_URL })
}
