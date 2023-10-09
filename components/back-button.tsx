import Link from 'next/link';

export default function BackButton() {
    return (
        <div className="flex justify-center w-full">
            <Link href="/">
                <div className="flex items-center rounded-lg shadow-md hover:shadow-lg transition-colors duration-300 border border-black py-2 px-3 mx-auto">
                    <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">

                        <path d="M8,22 L8,14 L16,8 L24,14 L24,22" fill="#fdf6e8" stroke="#000" stroke-width="1" />

                        <path d="M6,14 L16,6 L26,14" fill="none" stroke="#000" stroke-width="1" />

                        <rect x="14" y="18" width="4" height="4" fill="#000" />
                    </svg>
                </div>
            </Link>
        </div>
    );
};