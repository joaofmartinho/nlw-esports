import { GameController } from 'phosphor-react'
import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import logoImage from './assets/nlw-esports-logo.svg'
import { GameCard } from './components/GameCard'
import { NewAdBanner } from './components/NewAdBanner'
import { Input } from './components/Form/Input'

interface Game {
    id: string
    title: string
    bannerUrl: string
    _count: { ads: number }
}

function App() {
    const [games, setGames] = useState<Game[]>()

    useEffect(() => {
        fetch('https://nlw-esports.fly.dev/games')
            .then((response) => response.json())
            .then((data) => {
                setGames(data)
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

                <Dialog.Portal>
                    <Dialog.Overlay className="bg-black/80 inset-0 fixed">
                        <Dialog.Content
                            className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounder-lg w-[480px] shadow-xl
                        "
                        >
                            <Dialog.Title className="text-2xl font-black">
                                Publica um anúncio
                            </Dialog.Title>

                            <form className="mt-6 flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="game"
                                        className="font-semibold"
                                    >
                                        Qual o jogo?
                                    </label>
                                    <Input
                                        id="game"
                                        type="text"
                                        placeholder="Seleciona o jogo que queres jogar"
                                    ></Input>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="name" className="block">
                                        O teu nome (ou nickname)?
                                    </label>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="Como te chamas no jogo?"
                                    ></Input>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label
                                            htmlFor="yearsPlaying"
                                            className="block"
                                        >
                                            Jogas há quantos anos?
                                        </label>
                                        <Input
                                            id="yearsPlaying"
                                            type="text"
                                            placeholder="Tudo bem ser zero :)"
                                        ></Input>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label
                                            htmlFor="discord"
                                            className="block"
                                        >
                                            Qual é o teu discord?
                                        </label>
                                        <Input
                                            id="discord"
                                            type="text"
                                            placeholder="User#0000"
                                        ></Input>
                                    </div>
                                </div>

                                <div className="flex gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label
                                            htmlFor="weekDays"
                                            className="block"
                                        >
                                            Quando costumas jogar?
                                        </label>
                                        <Input
                                            id="weekDays"
                                            type="text"
                                        ></Input>
                                    </div>
                                    <div className="flex flex-col gap-2 flex-1">
                                        <label
                                            htmlFor="discord"
                                            className="block"
                                        >
                                            Qual é o teu horário?
                                        </label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <Input
                                                id="hourStart"
                                                type="time"
                                                placeholder="De"
                                            ></Input>
                                            <Input
                                                id="hourEnd"
                                                type="time"
                                                placeholder="Até"
                                            ></Input>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-2 flex gap-2 text-sm">
                                    <Input
                                        id="useVoiceChannel"
                                        type="checkbox"
                                        placeholder="De"
                                    ></Input>
                                    Usas voice chat?
                                </div>

                                <footer className="mt-4 flex justify-end gap-4">
                                    <Dialog.Close className="bg-zinc-500 hover:bg-zinc-600 px-5 h-12 rounded-md font-semibold">
                                        Cancelar
                                    </Dialog.Close>
                                    <button
                                        type="submit"
                                        className="bg-violet-500 hover:bg-violet-600 px-5 h-12 rounded-md font-semibold flex items-center gap-3"
                                    >
                                        <GameController
                                            size={24}
                                        ></GameController>
                                        Encontrar duo
                                    </button>
                                </footer>
                            </form>
                        </Dialog.Content>
                    </Dialog.Overlay>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    )
}

export default App
