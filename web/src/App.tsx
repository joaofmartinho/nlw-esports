import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import logoImage from './assets/nlw-esports-logo.svg'
import { GameCard } from './components/GameCard'
import { NewAdBanner } from './components/NewAdBanner'
import { NewAdModal } from './components/NewAdModal'
import axios from 'axios'

export interface Game {
    id: string
    title: string
    bannerUrl: string
    _count: { ads: number }
}

function App() {
    const [games, setGames] = useState<Game[]>()

    useEffect(() => {
        axios('https://nlw-esports.fly.dev/games').then((response) => {
            setGames(response.data)
        })
    }, [])

    const renderGameCards = () => {
        return games?.map((game) => {
            return (
                <GameCard
                    bannerUrl={game.bannerUrl}
                    title={game.title}
                    adsCount={game._count.ads}
                    key={game.id}
                ></GameCard>
            )
        })
    }

    return (
        <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20 ">
            <img src={logoImage} alt="Next Level Week Exports Logo" />

            <h1 className="text-6xl text-white font-black mt-16 bg-galaxy-gradient bg-clip-text">
                Seu <span className="text-transparent">duo</span> está aqui
            </h1>

            <div className="grid grid-cols-6 gap-6 mt-16">
                {renderGameCards()}
            </div>

            <Dialog.Root>
                <NewAdBanner></NewAdBanner>
                <NewAdModal games={games}></NewAdModal>
            </Dialog.Root>
        </div>
    )
}

export default App
