import alfy from 'alfy';
import getConfig from './getConfig.js';

// 获取参数: parentKey, childKey
const [parentKey, childKey] = process.argv[2].trim().split(/[- ]+/)

alfy.output(getConfig({  parentKey, childKey }));
