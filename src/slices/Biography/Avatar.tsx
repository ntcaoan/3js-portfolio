'use client';

import {ImageField} from "@prismicio/types";
import {PrismicNextImage} from "@prismicio/next";
import {useEffect, useRef} from "react";
import clsx from "clsx";
import {gsap} from "gsap";


type AvatarProps = {
    image: ImageField;
    classname?: string;
}

export default function Avatar({
    image, classname
}: AvatarProps) {

    const component = useRef(null);

    useEffect(() => {
        gsap.context(() => {
            gsap.fromTo(
                ".avatar",
                {opacity:0, scale:1.4},
                {scale:1, opacity:1, duration:1.3, ease: "power3.inOut"}
            );

            window.onmousemove = (e) => {
                if (!component.current) return;

                const componentRect = (component.current as HTMLElement).getBoundingClientRect();
                const componentCenterX = componentRect.left + componentRect.width / 2;

                const componentPercent = {
                    x: (e.clientX - componentCenterX) / componentRect.width / 2
                }

                const distFromCenter = 1 - Math.abs(componentPercent.x)

                // pfp can be interactive
                gsap.timeline({
                    defaults: {duration: .5, overwrite: "auto", ease: "power3.out"}
                }).to(".avatar",
                    {
                        rotation: gsap.utils.clamp(-2, 2, 5 * componentPercent.x),
                        duration: .5
                    },
                    0
                ).to(".highlight", {
                    opacity: distFromCenter - 0.7,
                    x: -10 + 20 * componentPercent.x,
                    duration: .5
                },
                    0
                );
            }
        }, component);
    }, []);

    return (
        <div ref={component} className={clsx("relative h-full w-full", classname)}>
            <div className="avatar aspect-square overflow-hidden rounded-3xl border-2 border-slate-700 opacity-0">
                <PrismicNextImage
                    field={image}
                    className="avatar-image h-full w-full object-fill"
                    imgixParams={{q:90}}
                    alt=""
                />
                <div className="highlight absolute inset-0 hidden w-full scale-110 bg-radient-to-tr from-transparent via-white to-transparent opacity-0 md:block">
                </div>
            </div>
        </div>

    );
}
