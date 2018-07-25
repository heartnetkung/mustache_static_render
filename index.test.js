const {getFiles} = require('./index');

test('getFiles',()=>{
	getFiles(__dirname+'/test/test_data').then((ans)=>{
		expect(ans[0].relative).toEqual('abc.json');
		expect(ans[1].relative).toEqual('d/ef/g');
	});
});