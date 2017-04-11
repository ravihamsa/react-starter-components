/**
 * Created by ravi.hamsa on 4/12/17.
 */

import SimpleController from '../SimpleController';
import chai from 'chai';
const {expect} = chai;

describe("Simple Controller", function(){
    describe('registerModel', function(){
        it('dummy test',function(){
            let controller = new SimpleController();
            expect(controller).to.be.object
        })
    })
})