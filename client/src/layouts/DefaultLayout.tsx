import { Footer, Header, Pagination } from "../components";

function DefaultLayout({ children }) {
    return (<div className="container-fluid">
        <Header />
        <div>{children}</div>
        <Pagination />
        <Footer />
    </div>);
}

export default DefaultLayout;