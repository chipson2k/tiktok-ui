import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

// Bind chuyển obj styles thành 1 function có chức năng nhận key và return ra
// value có trong (class module trong styles) (Filename_classname_hashkey)
// từ đó giúp ta tạo class mà ko cần theo kiểu camel Case trong file scss
const cx = classNames.bind(styles);
function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <h2>Sidebar</h2>
        </aside>
    );
}

export default Sidebar;
