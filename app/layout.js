import "./globals.css"
import Header from "./components/header"
import Footer from "./components/footer"

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <head>
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="robots" content="noindex,nofollow" />
                <meta name="googlebot" content="noindex,nofollow" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
                <meta name="theme-color" content="#FFFFFF" />
                <title>Ryko: Ryko</title>
            </head>

            <body>
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    )
}

export default RootLayout