export default function AppLogo() {
    return (
        <>
            <img
                src="/favicon.svg"
                alt="ResourceMS"
                className="h-8 w-8 rounded-lg"
            />
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    ResourceMS
                </span>
            </div>
        </>
    );
}
