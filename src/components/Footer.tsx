import clsx from "clsx";
import React from "react";
import {createClient} from "@/prismicio";
import {PrismicNextLink} from "@prismicio/next";
import Link from "next/link";
import Bounded from "@/components/Bounded";
import {isFilled} from "@prismicio/client";
import {FaGithub, FaLinkedin} from "react-icons/fa6";
import Image from "next/image";

export default async function Footer() {
    const client = createClient();
    const settings = await client.getSingle("settings");
    return (
        <Bounded as={"footer" as "section"} className="text-slate-600">
            <div className="container mx-auto mt-20 flex flex-col items-center justify-between gap-6 py-8 sm:flex-row ">
                <div
                    className="name flex flex-col items-center justify-center gap-x-4 gap-y-2 sm:flex-row sm:justify-self-start">
                    <Link
                        href="/"
                        className="text-xl font-bold tracking-tighter text-slate-100 transition-colors duration-150 hover:text-pink-400"
                    >
                        <Image
                            src="/anna-logo-pink.png"
                            alt="Logo"
                            width={64}
                            height={64}
                            className="h-7 w-auto ml-1"
                        />
                    </Link>
                    <span
                        className="hidden text-5xl font-extralight leading-[0] text-slate-400 sm:inline"
                        aria-hidden={true}
                    >
                        /
                    </span>
                    <p className=" text-sm text-slate-300 ">
                        © 2025 {settings.data.name}
                    </p>
                </div>
                <nav className="navigation" aria-label="Footer Navigation">
                    <ul className="flex items-center gap-1">
                        {settings.data.nav_items.map(({link, label}, index) => (
                            <React.Fragment key={label}>
                                <li>
                                    <PrismicNextLink
                                        className={clsx(
                                            "group relative block overflow-hidden  rounded px-3 py-1 text-base font-bold text-slate-100 transition-colors duration-150 hover:hover:text-pink-400",
                                        )}
                                        field={link}
                                    >
                                        {label}
                                    </PrismicNextLink>
                                </li>
                                {index < settings.data.nav_items.length - 1 && (
                                    <span
                                        className="text-4xl font-thin leading-[0] text-slate-400"
                                        aria-hidden="true"
                                    >
                                        /
                                    </span>
                                )}
                            </React.Fragment>
                        ))}
                    </ul>
                </nav>
                <div className="socials inline-flex justify-center sm:justify-end">
                    {isFilled.link(settings.data.github_link) && (
                        <PrismicNextLink
                            field={settings.data.github_link}
                            className="p-2 text-2xl text-slate-300 transition-all duration-150 hover:scale-125 hover:text-pink-400"
                            aria-label={settings.data.name + " on GitHub"}
                        >
                            <FaGithub/>
                        </PrismicNextLink>
                    )}
                    {isFilled.link(settings.data.linkedin_link) && (
                        <PrismicNextLink
                            field={settings.data.linkedin_link}
                            className="p-2 text-2xl text-slate-300 transition-all duration-150 hover:scale-125 hover:text-pink-400"
                            aria-label={settings.data.name + " on LinkedIn"}
                        >
                            <FaLinkedin/>
                        </PrismicNextLink>
                    )}
                </div>
            </div>
        </Bounded>
    );
}
