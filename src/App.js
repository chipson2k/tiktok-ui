import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/components/Layout';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;

                        let Layout = DefaultLayout;
                        // Nếu route.layout != null (true) thì Layout = route.layout,
                        // ko thì mặc định DefaultLayout
                        // Còn route.layout = null thì gán Fragment vào Layout
                        // Fragment: là thẻ chỉ để chứa chứ ko sinh ra thẻ thật trong DOM
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    // Layout là biến đc truyền layout tương ứng qua hàm if trên
                                    // Từ đó dùng nó bao comp để comp nhận layout tương ứng
                                    // Truyền layout cho page => <Page /> là children của layout
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
