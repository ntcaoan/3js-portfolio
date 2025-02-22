import {Content} from "@prismicio/client";
import {PrismicRichText, SliceComponentProps} from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

/**
 * Props for `TextBlock`.
 */
export type TextBlockProps = SliceComponentProps<Content.TextBlockSlice>;

/**
 * Component for "TextBlock" Slices.
 */
const TextBlock = ({slice}: TextBlockProps) => {
    return (
        <div className="max-w-prose">
            <PrismicRichText field={slice.primary.text}/>
            <PrismicNextLink field={slice.primary.project_link} className="italic"/>
        </div>
    );
};

export default TextBlock;
