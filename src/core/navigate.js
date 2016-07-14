/**
 * Created by ravi.hamsa on 7/14/16.
 */

import history from './history';

export default function navigate(pageId, params){

    let paramString = [];
    for(let key in params){
        paramString.push(`${key}=${params[key]}`)
    }
    
    history.push({
        pathname:'/',
        hash:'#/'+pageId + (paramString.length ? '/'+paramString.join(';') : '')
    })
}