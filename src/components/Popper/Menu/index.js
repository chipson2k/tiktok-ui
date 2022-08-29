import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';
import { useState } from 'react';

const cx = classNames.bind(styles);

const defaultFn = () => {};
// Nếu ko có gì truyền vào onChange thì mặc định là defaultFn (function trống)
function Menu({ children, items = [], onChange = defaultFn }) {
    // Hàm này mỗi khi truy cập vào item nào có children thì sẽ add children đó vô mảng khởi tạo
    const [history, setHistory] = useState([{ data: items }]);
    // Lấy phần tử cuối của mảng
    const current = history[history.length - 1];

    const renderItems = () => {
        // Luôn trả về phần cuối của mảng, để mỗi khi nhấn vào item nào thì sẽ nhận children của item
        // đó vào mảng và render children đó ra luôn (render phần tử cuối => phần tử vừa mới add (children))
        // Thể hiện chức năng bấm vào nút cha, hiển thị thằng con
        return current.data.map((item, index) => {
            // nếu có chilren => isParent = true (!!: convert sang boolean)
            const isParent = !!item.children;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    // Mỗi khi click vào item, check nó có children ko? có thì add chilren
                    //của nó vô mảng. Ko thì truyền item đó vào hàm onChange
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };
    console.log(current);
    return (
        <Tippy
            // interactive: select được trên tippy
            interactive
            // delay: khi tắt cái tippy thì nó mất sau 1 khoảng thời gian delay (ẩn, hiện)
            delay={[0, 800]}
            // offset: căn chỉnh dọc ngang
            offset={[12, 8]}
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {/* Khi vô trang cấp 2 (history.length > 1 ) thì mới hiện header */}
                        {history.length >= 1 && (
                            <Header
                                title="Language"
                                onBack={() => {
                                    // onBack có chức năng xóa phần tử cuối để current nhận phần tử cuối mới
                                    // sau khi xóa để render ra lại phần tử mới (back lại 1 cấp)
                                    // dùng slice để nhận mảng mới ko có phần tử cuối
                                    setHistory((prev) => prev.slice(0, prev.length - 1));
                                }}
                            />
                        )}
                        {/* Render các menuItem ra từ hàm renderItems() */}
                        {renderItems()}
                    </PopperWrapper>
                </div>
            )}
            // khi nó hide sẽ thực hiện function
            // function sẽ xóa để lại ptu đầu tiên (quay về cấp đầu)
            onHide={() => setHistory((prev) => prev.slice(0, 1))}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
