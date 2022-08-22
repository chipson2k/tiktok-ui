// Layout chỉ có phần header và content
// children là nội dung content đc đưa và qua App.js
import Header from '~/components/Layout/components/Header';
function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="container">
                <div className="content">{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
