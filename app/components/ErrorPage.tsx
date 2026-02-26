import { Link } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface ErrorPageProps {
    status?: number;
    message: string;
    details: string;
    stack?: string;
}

export function ErrorPage({ status, message, details, stack }: ErrorPageProps) {
    const is404 = status === 404;

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-1 flex items-center justify-center p-4">
                <div className="text-center max-w-2xl">
                    <h1 className="text-6xl font-bold text-gray-800 mb-4">{message}</h1>
                    <p className="text-xl text-gray-600 mb-8">{details}</p>

                    {is404 && (
                        <div className="mb-8">
                            <p className="text-gray-500 mb-4">
                                The page you're looking for doesn't exist.
                            </p>
                            <img
                                src="https://via.placeholder.com/400x300?text=404+Not+Found"
                                alt="404"
                                className="mx-auto mb-8 rounded-lg shadow-lg"
                            />
                        </div>
                    )}

                    <Link
                        to="/"
                        className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        Go Back Home
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}
