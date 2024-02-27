import Link from "next/link";
export default function Page() {
    return (
        <div id='Register-success'>
            <div className='success-register-container'>
                <div className='success-div'>
                </div>
                <h1 className='success-header'>Success</h1>
                <p className='success-p-tag'>Your account has been created</p>
                <button className="btn-success button-success  btn-sm" type="button">
                    <Link  className="nav-link" href='/'>
                        CONTINUE
                    </Link>
                </button>
            </div>
        </div>
    );
}