export interface Service {
    id: string;
    title: string;
    subtitle: string;
    mainText: string;
    features: {
        title: string;
        description: string;
    }[];
    icon: string;
}

export const servicesList: Service[] = [
    {
        id: "essential",
        title: "ESSENTIAL",
        subtitle: "Establish dominance with a robust digital presence.",
        mainText: "Designed for agile projects or developers looking to establish a strong, modern online sales foundation.",
        features: [
            {
                title: "Web Sales App",
                description: "The complete Online Interactive Sales Solution."
            },
            {
                title: "5 Hero Renders",
                description: "Premium Archviz stills to populate the app and marketing channels."
            }
        ],
        icon: "monitor"
    },
    {
        id: "showroom-experience",
        title: "SHOWROOM EXPERIENCE",
        subtitle: "Bring the digital into the physical world.",
        mainText: "Designed for major developments utilizing a physical sales center, providing agents with the ultimate closing tools.",
        features: [
            {
                title: "Everything in Tier 1",
                description: "(Web Sales App)."
            },
            {
                title: "Offline Interactive Showroom Solution",
                description: "Custom software/hardware setup for the sales center."
            },
            {
                title: "10 Hero Renders",
                description: "(5 additional shots added to the Tier 1 package) for comprehensive visual coverage."
            }
        ],
        icon: "harddrive"
    },
    {
        id: "ultimate-immersion",
        title: "ULTIMATE IMMERSION",
        subtitle: "The peak of the interactive sales ecosystem.",
        mainText: "Designed for flagship, luxury, or mega-developments requiring the absolute highest level of emotional engagement and cutting-edge reality technology.",
        features: [
            {
                title: "Everything in Tier 1 & 2",
                description: "(Web App + Offline Showroom + 10 Hero Renders)."
            },
            {
                title: "Cinematic Animation",
                description: "Up to 2 minutes of narrative-driven architectural video."
            },
            {
                title: "XR Experience Integration",
                description: "Custom AR and VR experiences fully integrated into the sales flow."
            }
        ],
        icon: "glasses"
    }
];

export interface Project {
    id: string;
    serviceId: string;
    displayTitle: string;
    title: string;
    category: string;
    year: string;
    location: string;
    area: string;
    image: string;
    description: string;
    gallery: string[];
    timeline: {
        title: string;
        description: string;
        image: string;
    }[];
}

export const projects: Project[] = [
    {
        id: "sohob-competition",
        serviceId: "standard",
        displayTitle: "SOHOB\nCOMPETITION",
        title: "Sohob Competition",
        category: "Residential Architecture",
        year: "2025",
        location: "Regional",
        area: "Master Plan",
        image: "/showcases/sohob/close-1_upscale01.png",
        description: "A project that drifts down from the serenity of the sky, forming like a cloud that hovers softly above — not just to cast shade, but to whisper light, to glow with presence, and to leave behind a delicate trace in memory.\n\nSohob is a calm, cloud-inspired residential space where architecture flows gently with light and wind. Designed for families, it blends privacy with connection offering shaded paths, shared gardens, and a soft sense of belonging.",
        gallery: [
            "/showcases/sohob/close-1_upscale01.png",
            "/showcases/sohob/2_style_transfer02.png",
            "/showcases/sohob/arial-1_upscale01.png",
            "/showcases/sohob/close-2_upscale01.png",
            "/showcases/sohob/Form-3_upscale01.png",
            "/showcases/sohob/Form-5_upscale01.png"
        ],
        timeline: []
    },
    {
        id: "osoul-towers",
        serviceId: "standard",
        displayTitle: "OSUOL\nTOWERS",
        title: "Osuol Towers",
        category: "Mixed-Use Towers",
        year: "2024",
        location: "Al-Madinah, Saudi Arabia",
        area: "Tower Development",
        image: "/showcases/osoul/Slide27-scaled.webp",
        description: "In a land such as Al-Madinah Al-Munawwarah, architecture is drawn forth from the soil like meanings from ancient texts. The project adopts a Tree-Column structural system where majestic trunks emerge from the heart of the land, bridging what lies below with what lies above. Each structure ascends in the spirit of the palm tree—anchored in the soil yet reaching confidently toward the sky, revealing the cultural memory it holds.",
        gallery: [
            "/showcases/osoul/Slide27-scaled.webp",
            "/showcases/osoul/Slide28-scaled.webp",
            "/showcases/osoul/Slide29-scaled.webp",
            "/showcases/osoul/Slide31-scaled.webp"
        ],
        timeline: []
    },
    {
        id: "zomra-east-compound",
        serviceId: "standard",
        displayTitle: "ZOMRA\nEAST",
        title: "Zomra East Compound",
        category: "Luxury Residential",
        year: "2024",
        location: "New Cairo, Egypt",
        area: "378 Acres",
        image: "/showcases/zomra/Shot-Aerial-2-scaled.png",
        description: "Zomra Compound in Fifth Settlement redefines luxury living with modern architecture and a refined European style. The project stretches across 378 acres, where nature and tranquility take center stage. A large portion of the land is dedicated to green spaces and open landscapes, with a diverse selection of high-end residential units including townhouses and standalone villas.",
        gallery: [
            "/showcases/zomra/Shot-Aerial-2-scaled.png",
            "/showcases/zomra/Standalone-Villa-2-1024x834.webp",
            "/showcases/zomra/Standalone-Villa-3-1024x837.webp",
            "/showcases/zomra/Standalone-Villa-3.1-1024x836.webp",
            "/showcases/zomra/Townhouse-6-e1750868748108-1024x830.webp"
        ],
        timeline: []
    },
    {
        id: "red-hills-resort",
        serviceId: "standard",
        displayTitle: "RED\nHILLS",
        title: "Red Hills Resort",
        category: "Resort Residential",
        year: "2025",
        location: "Sahl Hasheesh, Egypt",
        area: "Coastal Resort",
        image: "/showcases/red-hills/Slide29-1024x585.jpg",
        description: "Red Hills is an exclusive resort-style real estate project on Egypt’s Red Sea coast. Designed with a modern architectural vision, the development offers a harmonious blend of contemporary luxury and coastal beauty. It features a variety of premium residences, from penthouses to chalets, all crafted to provide an elevated lifestyle experience just minutes from pristine beaches.",
        gallery: [
            "/showcases/red-hills/Slide29-1024x585.jpg",
            "/showcases/red-hills/Slide30-1024x585.jpg",
            "/showcases/red-hills/Slide31-1024x585.jpg",
            "/showcases/red-hills/Slide32-1024x585.jpg",
            "/showcases/red-hills/Slide4-1024x585.png",
            "/showcases/red-hills/Slide5-1024x585.png",
            "/showcases/red-hills/Slide6-1024x585.png",
            "/showcases/red-hills/Slide8-1024x585.png"
        ],
        timeline: []
    },
    {
        id: "nebu-capital",
        serviceId: "standard",
        displayTitle: "NEBU\nCAPITAL",
        title: "Nebu New Capital",
        category: "Commercial & Business",
        year: "2024",
        location: "New Capital, Egypt",
        area: "Commercial Hub",
        image: "/showcases/nebu/1.jpeg",
        description: "Nebu, an ancient Egyptian term meaning 'gold', symbolizes wealth, eternity, and divine power. Located in Egypt's New Administrative Capital, this project evokes luxury and timelessness, reflecting deep heritage through its modern architectural language and bead-inspired necklaces patterns.",
        gallery: [
            "/showcases/nebu/1.jpeg",
            "/showcases/nebu/3.jpeg",
            "/showcases/nebu/5.jpeg",
            "/showcases/nebu/Slide9-scaled.jpg"
        ],
        timeline: []
    },
    {
        id: "camlam-chip-city",
        serviceId: "standard",
        displayTitle: "CAMLAM\nCHIP CITY",
        title: "Camlam Chip City",
        category: "Futuristic Urban Planning",
        year: "2025",
        location: "Vietnam",
        area: "Data Center Hub",
        image: "/showcases/camlam/cover.png",
        description: "The Vingroup Chip City embodies a cutting-edge urban and architectural vision inspired by the structure and functionality of a microchip. This vision reflects innovation, interconnectivity, and efficiency, aligning with the city’s role as a global data center hub.\n\nThe Chip Shape and Connectivity vision transforms the Vingroup Chip City into a futuristic metropolis where architecture and urban planning emulate the microchip’s intelligence and efficiency. The city serves as a global benchmark for harmonizing advanced technology with sustainable urban living.",
        gallery: [
            "/showcases/camlam/cover.png",
            "/showcases/camlam/Picture1.jpg",
            "/showcases/camlam/Picture2.jpg",
            "/showcases/camlam/Picture3.png",
            "/showcases/camlam/Picture4.png",
            "/showcases/camlam/Picture5.png",
            "/showcases/camlam/Picture6.png",
            "/showcases/camlam/Picture7.png",
            "/showcases/camlam/Picture8.png"
        ],
        timeline: []
    },
    {
        id: "ecological-hut",
        serviceId: "standard",
        displayTitle: "ECOLOGICAL\nHUT",
        title: "Ecological Hut",
        category: "Eco-Architecture",
        year: "2025",
        location: "Global",
        area: "Experimental",
        image: "/showcases/ecological-hut/Edited-1-gigapixel-text-shapes-4x.png",
        description: "An experimental architectural concept focusing on fluid, organic geometry and seamless integration with the natural environment. The project explores sustainable materiality and innovative forms designed to exist in balance with ecological systems.",
        gallery: [
            "/showcases/ecological-hut/Edited-1-gigapixel-text-shapes-4x.png",
            "/showcases/ecological-hut/2.effectsResult-gigapixel-text-shapes-2x.png",
            "/showcases/ecological-hut/Scene-111_upscale01-gigapixel-text-shapes-2x.png",
            "/showcases/ecological-hut/bea009a9ba823df435859813b5b9db09xbarp-gigapixel-text-shapes-2x.png"
        ],
        timeline: []
    }
];

export interface MapItem {
    id: string;
    title: string;
    description: string;
    url: string;
    thumbnail: string;
}

export const maps: MapItem[] = [
    {
        id: "hay-al-wafa",
        title: "Hay Al Wafa",
        description: "Interactive 3D viewing experience for the Hay Al Wafa project.",
        url: "https://hay-alwafa.voom.cc/",
        thumbnail: "/wafa-cover.png"
    },
    {
        id: "factories-map",
        title: "Factories Map",
        description: "Interactive visualization of our industrial factory projects.",
        url: "https://factoriesmap.opetstudios.com/",
        thumbnail: "/factories-cover.png"
    },
    {
        id: "zomra-east",
        title: "Zomra East",
        description: "Comprehensive masterplan and interactive view of Zomra East.",
        url: "https://zomramap.opetstudios.com/",
        thumbnail: "/zomra-cover.png"
    },
    {
        id: "majarah-compound",
        title: "Majarah Compound",
        description: "Modern gated community layout and architectural design.",
        url: "https://factoriesmap.opetstudios.com/",
        thumbnail: "/majarah-cover.jpeg"
    },
    {
        id: "nebu-administrative",
        title: "Nebu Administrative",
        description: "Gold-inspired commercial and business hub masterplan.",
        url: "https://factoriesmap.opetstudios.com/",
        thumbnail: "/nebu-cover.jpeg"
    }
];

export interface TourItem {
    id: string;
    title: string;
    description: string;
    url: string;
    thumbnail: string;
}

export const tours: TourItem[] = [
    {
        id: "tour-1",
        title: "Modern Interior Tour 1",
        description: "Explore the seamless blend of luxury and functionality in this high-end residential interior.",
        url: "https://storage.net-fs.com/hosting/8534624/4/",
        thumbnail: "/tours/tour1.png"
    },
    {
        id: "tour-2",
        title: "Modern Interior Tour 2",
        description: "A deep dive into ultra-modern kitchen and living spaces designed for the future.",
        url: "https://storage.net-fs.com/hosting/8534624/5/",
        thumbnail: "/tours/tour2.png"
    },
    {
        id: "factory-360",
        title: "Factory 360",
        description: "An immersive interactive journey through our state-of-the-art industrial manufacturing facility.",
        url: "https://storage.net-fs.com/hosting/8534624/1/",
        thumbnail: "/tours/factory.png"
    }
];

