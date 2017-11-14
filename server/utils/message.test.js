var expect = require('expect');

var {generateMessage} = require('./message.js');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'John', text = 'Hello my friend';
        
        var msg = generateMessage(from, text);

        expect(msg).toInclude({from, text});
        expect(msg.createAt).toBeA('number');
    });
});