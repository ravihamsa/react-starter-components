/**
 * Created by ravi.hamsa on 5/3/17.
 */


import RXFormElement from '../SimpleElement';
import chai from 'chai';
const {expect} = chai;

describe("RX Form Element", function(){
    describe('registerModel', function(){
        it('dummy test',function(){
            let controller = new RXFormElement();
            expect(controller).to.be.object
        })
    })
})