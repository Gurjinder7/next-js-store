import Link from "next/link";

const Header = () => {
    return (
        <>
            <nav className="p-3 navbar navbar-expand-lg navbar-dark bg-dark h-[5vh] flex justify-between bg-cyan-900">
                <div>
                    <img width={30} height={30} src="/vercel.svg" alt="logo"/>
                </div>
                <div>
                    <Link href="/"></Link>
                </div>
                <div>
                    <Link href="/cart">
                        <img src="/cart.svg" width={30} height={30} alt="cart"/>
                    </Link>
                </div>
            </nav>
        </>
    )
}

export default Header