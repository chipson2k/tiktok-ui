import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

// to: link nội bộ, href: link bên ngoài
function Button({
    to,
    href,
    primary,
    outline,
    text,
    rounded,
    disabled,
    small,
    large,
    children,
    className,
    leftIcon,
    rightIcon,
    onClick,
    ...passProps
}) {
    let Comp = 'button';

    const props = {
        onClick,
        ...passProps,
    };

    // Nếu nút disbaled thì xóa sự kiện (event listener)
    if (disabled) {
        // Lặp qua các key của object đó (key: value)
        Object.key(props).forEach((key) => {
            // Nếu các key đó bắt đầu bằng từ on và kiểu DL là function thì xóa
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
        delete props.onClick;
    }

    // Dựa vào prop truyền vô để xác định comp là 1 button, hay 1 thẻ link (chuyển hướng trong cục bộ (có to))
    // Hc là 1 thẻ a (truyền hướng ngoài cục bộ (có href))
    if (to) {
        // thêm to và props
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        // truyền value của className vào
        [className]: className,
        primary,
        outline,
        text,
        rounded,
        disabled,
        small,
        large,
    });

    // Comp sẽ nhận obj và dùng spread(...) để rãi các prop vào comp
    return (
        <Comp className={classes} {...props}>
            {/* Truyền icon vào rồi hiện ra */}
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;
//34.45
