import Link from 'next/link';

const { SITE_NAME, COMPANY_NAME } = process.env;

const Footer = () => {
    return (
        <footer>
            <div>
                <Link href="/">
                    <span>{SITE_NAME}</span>
                </Link>
            </div>
            <div>
                <Link href="www.github.com/samuelberston">
                    <span>Created by {COMPANY_NAME}</span>
                </Link>
            </div>
        </footer>
    );
}

export default Footer;