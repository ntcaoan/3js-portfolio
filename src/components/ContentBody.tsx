import {SliceZone} from "@prismicio/react";

import {components} from "@/slices";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import {Content, DateField, isFilled} from "@prismicio/client";


export default async function ContentBody({page}: {
    page: Content.BlogPostDocument | Content.ProjectDocument;
}) {

    function formatDate(date: DateField) {
        if (isFilled.date(date)) {
            const dateOptions: Intl.DateTimeFormatOptions = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            };

            return new Intl.DateTimeFormat("en-US", dateOptions).format(new Date(date));

        }
    }

    const formattedDate = formatDate(page.data.date);


    return (
        <Bounded as={"article" as "section"}>
            <div className="rounded-2xl border-2 border-stone-700 bg-stone-950 px-4 py-10 md:px-10 md:py-20">
                <Heading as="h1">{page.data.title}</Heading>
                <div className="flex gap-4 text-pink-400 text-xl font-bold">
                    {page.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                    ))}
                </div>
                <p className="mt-8 border-b border-stone-600 text-xl font-medium text-stone-300">
                    {formattedDate}
                </p>
                <div className="prose prose-lg prose-invert mt-10 w-full max-w-none [&>*]:max-w-full md:mt-17">
                    <SliceZone slices={page.data.slices} components={components}/>
                </div>
            </div>
        </Bounded>
    );
}
