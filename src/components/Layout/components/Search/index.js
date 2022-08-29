import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
// Thư viện hỗ trợ tạo tooltip
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Search.module.scss';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Search() {
    // useState này xử lý khi nhập vào input thì searchValue sẽ thay đổi theo value
    // và trở về chuỗi rỗng khi nhấn btn delete
    const [searchValue, setSearchValue] = useState('');
    // useState này xử lý là 1 mảng nhận kết quả trả về mỗi khi nhập tìm kiếm
    const [searchResult, setSearchResult] = useState([]);
    // useState này xử lý khi focus vào ô input thì showResult = true,
    // còn khi click ra ngoài phạm vi ô input showResult = false
    const [showResult, setShowResult] = useState(true);
    // useStae này xử lý mỗi khi call API thì loading = true,
    // khi call API xong hc lỗi khi call API thì thành false => tùy chỉnh hiện icon loading
    const [loading, setLoading] = useState(false);

    const inputRef = useRef();

    useEffect(() => {
        // nếu searchValue (trim: loại bỏ khoảng trắng) là !false = true thì
        // return để ngừng useEffect, ko gọi api
        if (!searchValue.trim()) {
            setSearchResult([]);
            return;
        }

        setLoading(true);
        // encodeURIComponent() sẽ mã hóa những kí tự hay bị trùng trên URL: , / ? : @ & = + $ #
        fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(searchValue)}&type=less`)
            .then((res) => res.json())
            .then((res) => {
                setSearchResult(res.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [searchValue]);

    const handleClear = () => {
        setSearchValue('');
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    return (
        <HeadlessTippy
            // interactive: select được trên HeadlessTippy
            interactive
            // visible: điều kiện xuất hiện (true)
            visible={showResult && searchResult.length > 0}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Account</h4>
                        {searchResult.map((result) => (
                            <AccountItem key={result.id} data={result} />
                        ))}
                    </PopperWrapper>
                </div>
            )}
            // onClickOutside: khi bạn bấm ra ngoài thì hàm này sẽ thực hiện
            onClickOutside={handleHideResult}
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    placeholder="Search accounts and videos"
                    spellCheck={false}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setShowResult(true)}
                />
                {/* Chuyển searchValue thành boolean, nếu true và 
                loading false thì hiển thị nút xóa */}
                {!!searchValue && !loading && (
                    <button className={cx('clear')} onClick={handleClear}>
                        {/* Lấy từ thư viện fontawesome */}
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                <button className={cx('search-btn')}>
                    <SearchIcon width="2.4rem" height="2.4rem" />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
