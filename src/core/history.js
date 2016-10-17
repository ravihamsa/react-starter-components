/**
 * Created by ravi.hamsa on 7/14/16.
 */

import { createHistory } from 'history'

if(global._history === undefined){
    global._history = createHistory()
}

export default global._history;