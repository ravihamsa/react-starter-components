/**
 * Created by ravi.hamsa on 7/14/16.
 */

import createHistory from 'history/lib/createBrowserHistory';
import createMemoryHistory from 'history/lib/createMemoryHistory';
import useQueries from 'history/lib/useQueries';

const history = useQueries(process.env.BROWSER ? createHistory : createMemoryHistory)();

export default createHistory();