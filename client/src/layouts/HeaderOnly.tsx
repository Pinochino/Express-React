import { Header } from "../components";

function HeaderOnly({children}) {
    return (<div className="container">
        <Header />
        <div>{children}</div>
    </div>);
}

export default HeaderOnly;