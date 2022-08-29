import classNames from 'classnames';
import { useState, forwardRef } from 'react';
import images from '~/assests/images';
import styles from './Image.module.scss';

// Do forwardRef nhận prop với ref nên ta tóm những tham số từ
// comp cha truyền xuống vào trong 1 object như là prop luôn
// fallback: nếu ko truyền vào mặc định images.noImage
// (đổi thành customFallback để ko trùng tên fallback trong useState)
const Image = forwardRef(({ src, alt, fallback: customFallback = images.noImage, className }, ref) => {
    // useState này xử lý khi trả vè ảnh lỗi hc src ko có chứa link ảnh
    const [fallback, setFallBack] = useState({
        src: '',
        alt: '',
    });

    // Khi error thì set ảnh noImage vào biến fallback
    const handleError = () => {
        setFallBack({
            src: customFallback,
            alt: 'No image',
        });
    };

    return (
        <img
            className={classNames(styles.wrapper, className)}
            src={fallback.src || src}
            alt={fallback.alt || alt}
            ref={ref}
            onError={handleError}
        />
    );
});

export default Image;
