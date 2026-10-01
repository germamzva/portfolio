
export default function ViewPDF() {
    return (
        <div>
            <main
                className="page max-w-4xl mx-auto p-5 shadow-lg"
                style={{ background: "#ffffff", color: "#000" }}
            >
                <header className="mb-3">
                    <h1 className="text-3xl font-bold">Geram S. Alfeche</h1>

                    <p
                        className="text-lg font-medium mt-1"
                        style={{ color: "#22c55e" }}
                    >
                        Full Stack Web Developer
                    </p>

                    <div className="mt-2 text-sm leading-6">
                        <p>Tagum City, Davao del Norte, Philippines</p>

                        <p>Email: ranfeche@gmail.com</p>

                        <p>Mobile: +63 955 778 2072</p>

                        <p>Portfolio: yourportfolio.com</p>

                        <p>GitHub: github.com/username</p>

                        <p>LinkedIn: linkedin.com/in/username</p>
                    </div>
                </header>

                {/* <!-- SUMMARY --> */}
                <section className="mb-3">
                    <h2 className="text-xl font-bold border-b pb-2 mb-4">
                        Professional Summary
                    </h2>

                    <p className="leading-6">
                        Full Stack Web Developer with 12+ years of experience building
                        WordPress websites, WooCommerce stores, and modern web
                        applications. Experienced in React, Next.js, Node.js, Express,
                        PHP, MongoDB, custom WordPress theme development, plugin
                        development, API integrations, SEO, and performance
                        optimization. Successfully delivered projects for clients
                        across Australia, the United States, and Europe.
                    </p>
                </section>

                {/* <!-- SKILLS --> */}
                <section className="mb-3">
                    <h2 className="text-xl font-bold border-b pb-2 mb-3">
                        Technical Skills
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold mb-2">Frontend</h3>

                            <div className="flex flex-wrap gap-2">
                                <span className="py-0 text-sm rounded"> HTML5 </span>
                                <span className="py-0 text-sm rounded"> CSS3 </span>
                                <span className="py-0 text-sm rounded"> JavaScript </span>
                                <span className="py-0 text-sm rounded"> TypeScript </span>
                                <span className="py-0 text-sm rounded"> React </span>
                                <span className="py-0 text-sm rounded"> Next.js </span>
                                <span className="py-0 text-sm rounded">Tailwind CSS</span>
                                <span className="py-0 text-sm rounded"> Bootstrap </span>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2">Backend</h3>

                            <div className="flex flex-wrap gap-2">
                                <span className="py-0 text-sm rounded"> PHP </span>
                                <span className="py-0 text-sm rounded"> Node.js </span>
                                <span className="py-0 text-sm rounded"> Express.js </span>
                                <span className="py-0 text-sm rounded"> Laravel </span>
                                <span className="py-0 text-sm rounded">CodeIgniter</span>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2">CMS</h3>

                            <div className="flex flex-wrap gap-2">
                                <span className="py-0 text-sm rounded">WordPress</span>
                                <span className="py-0 text-sm rounded">WooCommerce</span>
                                <span className="py-0 text-sm rounded">Divi</span>
                                <span className="py-0 text-sm rounded">Elementor</span>
                                <span className="py-0 text-sm rounded">
                                    Plugin Development
                                </span>
                                <span className="py-0 text-sm rounded">
                                    Theme Development
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <!-- EXPERIENCE --> */}
                <section className="mb-3">
                    <h2 className="text-xl font-bold border-b pb-2 mb-3">
                        Professional Experience
                    </h2>

                    <div>
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-lg">
                                Freelance Full Stack Web Developer
                            </h3>

                            <span className="text-xs" style={{ color: "#22c55e" }}>
                                July 2014 – Present
                            </span>
                        </div>

                        <ul className="mt-4 list-none pl-0">
                            <li>
                                - Developed 100+ custom WordPress websites for
                                international clients.
                            </li>

                            <li>- Built custom themes and plugins from scratch.</li>

                            <li>- Developed modern React and Next.js applications.</li>

                            <li>- Created REST APIs using Node.js and Express.</li>

                            <li>- Optimized websites for SEO and Core Web Vitals.</li>

                            <li>
                                - Integrated payment gateways, CRMs, booking systems, and
                                third-party APIs.
                            </li>

                            <li>
                                - Managed projects from planning through deployment.
                            </li>
                        </ul>
                    </div>
                </section>

                {/* <!-- PROJECTS --> */}
                <section className="mb-3">
                    <h2 className="text-xl font-bold border-b pb-2 mb-3">
                        Selected Projects
                    </h2>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-3">
                            <div>
                                <h3 className="font-semibold">The Beach Cabarita</h3>

                                <p className="text-sm" style={{ color: "#4b5563" }}>
                                    WordPress • Divi • Custom Development, Booking
                                    Integration
                                </p>

                                <p className="mt-1 text-xs text-start">
                                    <a
                                        href="https://www.thebeachcabarita.com.au"
                                        className="underline"
                                    >
                                        View site
                                    </a>
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold">Zenith Apartments</h3>

                                <p className="text-sm" style={{ color: "#4b5563" }}>
                                    WordPress • Divi • Custom Development
                                </p>

                                <p className="mt-1 text-xs text-start">
                                    <a
                                        href="https://www.zenithapartments.com.au"
                                        className="underline"
                                    >
                                        View site
                                    </a>
                                </p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <h3 className="font-semibold">
                                    Shores Beach & Lakeside Villas
                                </h3>

                                <p className="text-sm" style={{ color: "#4b5563" }}>
                                    WordPress • Divi • Custom Development, Booking
                                    Integration
                                </p>

                                <p className="mt-1 text-xs text-start">
                                    <a
                                        href="https://www.shoreselizabethbeach.com.au/"
                                        className="underline"
                                    >
                                        View site
                                    </a>
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold">
                                    Ballina Byron Islander Resort
                                </h3>

                                <p className="text-sm" style={{ color: "#4b5563" }}>
                                    WordPress • Divi • Custom Development
                                </p>

                                <p className="mt-1 text-xs text-start">
                                    <a
                                        href="https://www.ballinabyronislanderresortconferencecentre.com.au/"
                                        className="underline"
                                    >
                                        View site
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <!-- EDUCATION --> */}
                <section>
                    <h2 className="text-xl font-bold border-b pb-2 mb-3">
                        Education
                    </h2>

                    <p className="font-medium">
                        Bachelor of Science in Information Technology
                    </p>

                    <p className="text-sm">University of Mindanao</p>
                </section>
            </main>
        </div>
    );
}