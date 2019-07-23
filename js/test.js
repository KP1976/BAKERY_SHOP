const tab1 = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let string = '';

const text = 'd';

switch (text) {
	case 'a':
		break;
	case 'b':
		break;
	case 'c':
		break;
	case 'd':
		tab1[3]++;
		[string] = tab1.toString();
		string++;
		console.log(string, tab1);
		break;
	default:
		break;
}
