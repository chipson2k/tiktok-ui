// Layout có phần header, sidebar và content
// children là nội dung content đc đưa và qua App.js

import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from '~/components/Layout/components/Header';
import Sidebar from '~/components/Layout/components/Sidebar';

// Bind chuyển obj styles thành 1 function có chức năng nhận key và return ra
// value có trong (class module trong styles) (Filename_classname_hashkey)
// Vd: cx('wrapper') => return ra DefaultLayout_wrapper__1pwR5
// từ đó giúp ta tạo class mà ko cần theo kiểu camel Case trong file scss
// console.log(styles);
// console.log(cx('wrapper'));
const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
