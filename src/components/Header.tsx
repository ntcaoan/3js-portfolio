import React from "react";
import { createClient } from "@/prismicio";
import NavBar from "@/components/NavBar";

export default async function Header() {
    const client = createClient();
    const settings = await client.getSingle("settings");

    return (
        <header className="top-0 z-50 mx-auto max-w-7xl md:sticky md:top-4">
            <NavBar settings={settings}/>
            {/*<nav>*/}
            {/*    <ul>*/}
            {/*        <li>*/}
            {/*            <Link href="/" aria-label="HomePage">*/}
            {/*                /!*{settings.data.name}*!/*/}
            {/*                <Image*/}
            {/*                    src="/logo.png"*/}
            {/*                    alt="Logo"*/}
            {/*                    width={64}*/}
            {/*                    height={64}*/}
            {/*                    className="h-8 w-auto"*/}
            {/*                />*/}
            {/*            </Link>*/}
            {/*        </li>*/}
            {/*        {settings.data.nav_items.map(({link, label}, index) => (*/}
            {/*            <li key={index}>*/}
            {/*                <PrismicNextLink field={link} >*/}
            {/*                    {label}*/}
            {/*                </PrismicNextLink>*/}
            {/*            </li>*/}
            {/*        ))}*/}
            {/*    </ul>*/}
            {/*</nav>*/}
        </header>
    );
}
