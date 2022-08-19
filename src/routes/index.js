// import Layouts
import { HeaderOnly } from '~/component/Layout';

// import Pages
import Following from '~/pages/Following';
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';

// Những routes ko cần đăng nhập vẫn xem đc
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/following', component: Following },
    { path: '/profile', component: Profile },
    { path: '/upload', component: Upload, layout: HeaderOnly },
    { path: '/search', component: Search, layout: null },
];

// Những routes cần đăng nhập mới xem đc
const privateRoutes = [];

export { publicRoutes, privateRoutes };
