export const ServiceIcons = {
    lens: (props: any) => (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="8" className="opacity-50" />
            <circle cx="50" cy="50" r="25" fill="currentColor" className="text-cyan-400" />
            <circle cx="50" cy="50" r="10" fill="black" />
        </svg>
    ),
    dive: (props: any) => (
        <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <rect x="2" y="2" width="96" height="56" rx="20" stroke="currentColor" strokeWidth="8" className="opacity-50" />
            <circle cx="70" cy="30" r="12" fill="currentColor" className="text-cyan-400" />
            <circle cx="30" cy="30" r="4" fill="currentColor" />
        </svg>
    ),
    touch: (props: any) => (
        <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <rect x="2" y="2" width="96" height="56" rx="28" stroke="currentColor" strokeWidth="8" className="opacity-50" />
            <circle cx="75" cy="30" r="15" stroke="currentColor" strokeWidth="6" className="text-cyan-400" />
            <circle cx="75" cy="30" r="6" fill="currentColor" className="text-cyan-400" />
        </svg>
    )
};
