import React from "react";

export const SEO_DATA = {
    home: {
        title: "Professional Book Publishing Services | Bristol Publishers",
        description:
            "Turn your manuscript into a published book. Bristol Publishers offers ghostwriting, editing, cover design, formatting, marketing and global distribution.",
        url: "https://bristolpublishers.com/",
        keywords:
            "Bristol Publishers, Book Publishing Services, Professional Book Publishing, Book Publishing Company, Self Publishing Services, Book Publishing in USA, Book Marketing Services, Professional Publishing Company",
    },
    about: {
        title: "About Bristol Publishers | Book Publishing Experts",
        description:
            "Meet Bristol Publishers, your trusted publishing partner for writing, editing, book design, publishing, and marketing services for authors.",
        url: "https://bristolpublishers.com/about",
        keywords:
            "Bristol Publishers, About Bristol Publishers, Book Publishing Company, Professional Book Publishing Services, Publishing Company for Authors, Book Publishing Experts, Author Publishing Services, Complete Book Publishing Solutions",
    },
    portfolio: {
        title: "Book Publishing Portfolio | Bristol Publishers",
        description:
            "Explore the Bristol Publishers portfolio featuring published books across fantasy, thriller, romance, mystery, science fiction, and more genres.",
        url: "https://bristolpublishers.com/portfolio",
        keywords:
            "Bristol Publishers, Book Publishing Portfolio, Published Books Portfolio, Book Publishing Examples, Professional Book Publishing, Book Design Portfolio, Published Authors, Fiction Book Portfolio, Nonfiction Book Portfolio",
    },
    contact: {
        title: "Contact Bristol Publishers | Free Publishing Consultation",
        description:
            "Contact Bristol Publishers for a free book publishing consultation. Discuss your manuscript, explore publishing services, and request a custom quote.",
        url: "https://bristolpublishers.com/contact",
        keywords:
            "Bristol Publishers, Contact Bristol Publishers, Book Publishing Consultation, Free Publishing Consultation, Book Publishing Quote, Contact Book Publishers, Publishing Services for Authors, Book Publishing Assistance",
    },
    publishing: {
        title: "Book Publishing Services | Bristol Publishers",
        description:
            "Publish your book with Bristol Publishers. Get professional formatting, editing, ISBN support, and global print and ebook distribution services.",
        url: "https://bristolpublishers.com/services/publishing",
        keywords:
            "Bristol Publishers, Book Publishing Services, Professional Book Publishing, Book Publishing Company, Self Publishing Services, Book Publishing and Distribution, Ebook Publishing Services, Paperback Publishing, Hardcover Publishing, Global Book Distribution",
    },
    ghostwriting: {
        title: "Professional Ghostwriting Services | Bristol Publishers",
        description:
            "Turn your ideas into a publish-ready manuscript with Bristol Publishers. Get confidential ghostwriting services for fiction, nonfiction, memoirs, and more.",
        url: "https://bristolpublishers.com/services/ghostwriting",
        keywords:
            "Bristol Publishers, Professional Ghostwriting Services, Book Ghostwriting Services, Ghostwriting Company, Professional Book Writers, Book Writing Services, Fiction Ghostwriting, Nonfiction Ghostwriting, Memoir Ghostwriting, Biography Writing Services, Confidential Ghostwriting",
    },
    formatting: {
        title: "Book Formatting & Proofreading Services | Bristol Publishers",
        description:
            "Prepare your manuscript for publication with Bristol Publishers. Get professional book formatting, proofreading, copyediting, and ebook layout services.",
        url: "https://bristolpublishers.com/services/formatting",
        keywords:
            "Bristol Publishers, Book Formatting Services, Book Proofreading Services, Manuscript Formatting, Professional Book Formatting, Ebook Formatting Services, Print Book Formatting, Copyediting Services, Manuscript Proofreading, Interior Book Layout Design, Amazon KDP Formatting",
    },
    coverDesign: {
        title: "Professional Book Cover Design Services | Bristol Publishers",
        description:
            "Get professional book cover design from Bristol Publishers. Explore custom genre-specific covers designed for Amazon KDP, IngramSpark, and print publishing.",
        url: "https://bristolpublishers.com/services/cover-design",
        keywords:
            "Bristol Publishers, Book Cover Design Services, Professional Book Cover Design, Custom Book Cover Design, Book Cover Designers, Fiction Book Cover Design, Nonfiction Book Cover Design, Ebook Cover Design, Paperback Cover Design, Hardcover Book Design, Amazon KDP Cover Design",
    },
    marketing: {
        title: "Book Marketing Services for Authors | Bristol Publishers",
        description:
            "Promote your book with Bristol Publishers through Amazon SEO, social media marketing, paid advertising, email campaigns, PR, and book launch strategies.",
        url: "https://bristolpublishers.com/services/marketing",
        keywords:
            "Bristol Publishers, Book Marketing Services, Book Promotion Services, Book Marketing for Authors, Author Marketing Services, Amazon Book Marketing, Amazon Book SEO, Social Media Book Marketing, Book Launch Marketing, Book Advertising Services, Book Publicity Services, Author Branding, Book Promotion Company",
    },
    audioBook: {
        title: "Audiobook Production Services | Bristol Publishers",
        description:
            "Turn your manuscript into a professional audiobook with Bristol Publishers. Get narration, studio recording, audio editing, mastering, and distribution.",
        url: "https://bristolpublishers.com/services/audio-book",
        keywords:
            "Bristol Publishers, Audiobook Production Services, Professional Audiobook Production, Audiobook Creation Services, Audiobook Narration Services, Audiobook Recording Services, Audiobook Editing and Mastering, Audiobook Publishing Services, Audible Publishing, ACX Audiobook Production, Audiobook Distribution Services",
    },
} as const;

export type SeoKey = keyof typeof SEO_DATA;

const Seo: React.FC<{ page: SeoKey }> = ({ page }) => {
    const { title, description, url, keywords } = SEO_DATA[page];
    return (
        <>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel="canonical" href={url} />

            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="Bristol Publishers" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
        </>
    );
};

export default Seo;