import http from '@/utils/http/axios';
import { FeatureModel } from '@/models/FeatureModel';

export const getAll = () => http.get<FeatureModel[]>('/features.json');

export default { getAll };
