import nav from './components/nav-bar.js';
import mainpage from './components/mainpage.js';
import footernav from './components/footer-Nav.js'
function test() {
    return React.createElement('div',null,[nav(),mainpage(),footernav()]);
}

export default test;