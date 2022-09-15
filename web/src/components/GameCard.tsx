interface GameCardProps {
    bannerUrl: string
    title: string
    adsCount: number
}

export const GameCard = ({ bannerUrl, title, adsCount }: GameCardProps) => {
    return (
        <a className="relative rounded-lg overflow-hidden" href="#1" key="test">
            <img src={bannerUrl} alt={`Game Card ${title}`} />

            <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 ">
                <strong className="font-bold text-white block">{title}</strong>
                <span className="text-zinc-300 text-sm block">
                    {adsCount} anúncios
                </span>
            </div>
        </a>
    )
}
