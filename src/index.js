/**
 * Created by ravi.hamsa on 6/22/16.
 */

import coreIm from './core';
import componentsIm from './components';

export core from './core';
export components from './components';

//hacky solution to enable webpack to exclude react-starter-components from building
export default {core:coreIm, components:componentsIm}