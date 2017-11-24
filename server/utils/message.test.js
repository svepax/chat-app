var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message.js');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'John', text = 'Hello my friend';
        
        var msg = generateMessage(from, text);

        expect(msg).toInclude({from, text});
        expect(msg.createAt).toBeA('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location message object', () => {
        var from = 'John', lat = '4711', long = '4712';
        
        var msg = generateLocationMessage(from, lat, long);
        
        expect(msg.createdAt).toBeA('number');        
        expect(msg.url).toBe(`https://www.google.com/maps?q=${lat},${long}`);
    });
});