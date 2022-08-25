import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('avatar')}
                src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/3a0c74c2e024b8d184627c7f287b44a3~c5_100x100.jpeg?x-expires=1661346000&x-signature=2OtvsFGhQYe%2BNywYKE3xw7KzmHo%3D"
                alt="marvel"
            />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>Marvel</span>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </h4>
                <span className={cx('username')}>marvel</span>
            </div>
        </div>
    );
}

export default AccountItem;
//30p30
