// * Component: Navbar
export default function Navbar() {
    // * Render
    return (
        <header className="absolute inset-x-0 top-0 z-30">
            <nav
                className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
                aria-label="Global"
            >
                {/* Desktop Navbar */}
                <h2>Desktop Navbar</h2>

                {/* Mobile Navbar */}
                <h2>Mobile Navbar</h2>
            </nav>
        </header>
    );
}
