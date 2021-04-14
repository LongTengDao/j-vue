import version from '../version?text';
import SFC from './SFC/';
import TSD from './TSD/';
import Default from '.default';
export default Default({
	version,
	SFC,
	TSD,
	DOT: require('path').join(__dirname, 'lib', 'DOT.js'),
	UMD: require('path').join(__dirname, 'lib', 'UMD.js'),
	ESM: require('path').join(__dirname, 'lib', 'ESM.js'),
});