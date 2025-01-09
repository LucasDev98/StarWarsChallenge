import { Header } from "../components/header/header";



export default function NotFoundPage() {

    return(
        <>
            <Header></Header>
            <section className="container  mx-auto">
                <p className=" font-black text-9xl text-center mb-4 ">404 NOT FOUND</p>
                <img className="mx-auto" src="/images/404-image.png" alt="image 404" />
            </section>
        </>
    )
}   