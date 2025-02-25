"use client";

import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import {asImageSrc, Content, isFilled} from "@prismicio/client";
import {PrismicRichText, SliceComponentProps} from "@prismicio/react";
import {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";

export type ExperienceProps = SliceComponentProps<Content.ExperienceSlice>;

const Experience = ({slice}: ExperienceProps) => {
    const revealRef = useRef(null);
    const [currentItem, setCurrentItem] = useState<null | number>(null);
    const lastMousePos = useRef({x: 0, y: 0});

    // generate image URLs
    const contentImages = slice.primary.items.map((item) => {
        const image = isFilled.image(item.hover_image) ? item.hover_image : null;
        return image ? asImageSrc(image, {
            fit: "crop",
            w: 220,
            h: 320,
            exp: -10,
        }) : "";
    });

    // preload images
    useEffect(() => {
        contentImages.forEach((url) => {
            if (!url) return;
            const img = new Image();
            img.src = url;
        });
    }, [contentImages]);

    // mouse move handler
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const mousePos = {x: e.clientX, y: e.clientY + window.scrollY};
            const speed = Math.sqrt(Math.pow(mousePos.x - lastMousePos.current.x, 2));

            if (currentItem !== null) {
                gsap.to(revealRef.current, {
                    x: gsap.utils.clamp(0, window.innerWidth - 250, mousePos.x - 110),
                    y: gsap.utils.clamp(0, window.innerHeight - 350, mousePos.y - 110),
                    rotation: speed * (mousePos.x > lastMousePos.current.x ? 1 : -1),
                    ease: "back.out(2)",
                    duration: 1.3,
                    opacity: 1,
                });
            }
            lastMousePos.current = mousePos;
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [currentItem]);

    const onMouseEnter = (index: number) => {
        setCurrentItem(index);
    };

    const onMouseLeave = () => {
        setCurrentItem(null);
    };

    return (
        <Bounded
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            className="relative"
        >
            <Heading as="h2" size="lg">
                {slice.primary.heading}
            </Heading>

            {/* experience stuff */}
            <div className="relative">
                {slice.primary.items.map((item, index) => (
                    <div
                        key={index}
                        className="ml-6 mt-8 max-w-prose md:ml-12 md:mt-16"
                        onMouseEnter={() => onMouseEnter(index)}
                        onMouseLeave={onMouseLeave}
                    >
                        <Heading as="h3" size="sm">
                            {item.title}
                        </Heading>

                        <div className="mt-1 flex w-fit items-center gap-1 text-2xl font-semibold tracking-tight text-slate-400">
                            <span>{item.time_period}</span>
                            <span className="text-3xl font-extralight">/</span>
                            <span>{item.institution}</span>
                        </div>

                        <div className="prose prose-lg prose-invert mt-4">
                            <PrismicRichText field={item.description}/>
                        </div>
                    </div>
                ))}
            </div>

            {/* hover reveal image */}
            <div
                ref={revealRef}
                className="hover-reveal pointer-events-none absolute left-0 top-0 -z-10 h-[320px] w-[220px] rounded-lg bg-cover bg-center opacity-0 transition-[background] duration-300"
                style={{
                    backgroundImage: currentItem !== null ? `url(${contentImages[currentItem]})` : "",
                }}
            />
        </Bounded>
    );
};

export default Experience;
