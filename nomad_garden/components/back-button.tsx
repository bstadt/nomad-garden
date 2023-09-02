import Link from 'next/link';

export default function BackButton() {
    return (
        <div className="flex items-center">
            <Link href="/">
                <div className="flex items-center bg-white rounded-lg shadow-md hover:shadow-lg transition-colors duration-300 border border-black-600 py-2 px-3">
                    <svg className="mr-2 h-3 w-3" xmlns="http://www.w3.org/2000/svg"
                         aria-hidden="true" focusable="false" role="img"
                         width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32">
                        <path d="M14 26l1.41-1.41L7.83 17H28v-2H7.83l7.58-7.59L14 6L4 16l10 10z"
                              fill="currentColor"></path>
                    </svg>
                    <span className="text-black-600">Return home</span>
                </div>
            </Link>
        </div>
    );
};