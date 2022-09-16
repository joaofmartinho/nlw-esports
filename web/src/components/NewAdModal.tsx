import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

import { Check, GameController } from 'phosphor-react'
import { Input } from './Form/Input'
import { Game } from '../App'
import { FormEvent, useState } from 'react'
import axios from 'axios'

interface NewAdModalProps {
    games?: Game[]
}

export const NewAdModal = ({ games }: NewAdModalProps) => {
    const [weekDays, setWeekDays] = useState<string[]>([])
    const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false)

    const handleOnSubmit = async (event: FormEvent) => {
        event.preventDefault()

        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData)

        // TODO: Add form validation
        try {
            await axios.post(
                `https://nlw-esports.fly.dev/games/${data.game}/ad`,
                {
                    name: data.name,
                    yearsPlaying: Number(data.yearsPlaying),
                    discord: data.discord,
                    weekDays: weekDays.map(Number),
                    hourStart: data.hourStart,
                    hourEnd: data.hourEnd,
                    useVoiceChannel: useVoiceChannel,
                }
            )

            alert('Ad criado com sucesso')
        } catch (error) {
            alert('Erro ao criar anúncio')
        }
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black/80 inset-0 fixed">
                <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounder-lg w-[480px] shadow-xl">
                    <Dialog.Title className="text-2xl font-black">
                        Publica um anúncio
                    </Dialog.Title>

                    <form
                        className="mt-6 flex flex-col gap-4"
                        onSubmit={handleOnSubmit}
                    >
                        <div className="flex flex-col gap-2">
                            <label htmlFor="game" className="font-semibold">
                                Qual o jogo?
                            </label>
                            <select
                                id="game"
                                name="game"
                                placeholder=""
                                className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
                                defaultValue={'default'}
                            >
                                <option disabled value={'default'}>
                                    Seleciona o jogo que queres jogar
                                </option>
                                {games &&
                                    games.map((game) => {
                                        return (
                                            <option
                                                key={game.id}
                                                value={game.id}
                                            >
                                                {game.title}
                                            </option>
                                        )
                                    })}
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="block">
                                O teu nome (ou nickname)?
                            </label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Como te chamas no jogo?"
                            ></Input>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="yearsPlaying" className="block">
                                    Jogas há quantos anos?
                                </label>
                                <Input
                                    id="yearsPlaying"
                                    name="yearsPlaying"
                                    type="number"
                                    placeholder="Tudo bem ser zero :)"
                                ></Input>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="discord" className="block">
                                    Qual é o teu discord?
                                </label>
                                <Input
                                    id="discord"
                                    name="discord"
                                    type="text"
                                    placeholder="User#0000"
                                ></Input>
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="weekDays" className="block">
                                    Quando costumas jogar?
                                </label>
                                <ToggleGroup.Root
                                    type="multiple"
                                    className="grid grid-cols-4 gap-2"
                                    value={weekDays}
                                    onValueChange={setWeekDays}
                                >
                                    <ToggleGroup.Item
                                        value="0"
                                        className={`w-8 h-8 rounded  ${
                                            weekDays.includes('0')
                                                ? 'bg-violet-500'
                                                : 'bg-zinc-900'
                                        }`}
                                    >
                                        D
                                    </ToggleGroup.Item>
                                    <ToggleGroup.Item
                                        value="1"
                                        className={`w-8 h-8 rounded  ${
                                            weekDays.includes('1')
                                                ? 'bg-violet-500'
                                                : 'bg-zinc-900'
                                        }`}
                                    >
                                        S
                                    </ToggleGroup.Item>
                                    <ToggleGroup.Item
                                        value="2"
                                        className={`w-8 h-8 rounded  ${
                                            weekDays.includes('2')
                                                ? 'bg-violet-500'
                                                : 'bg-zinc-900'
                                        }`}
                                    >
                                        T
                                    </ToggleGroup.Item>
                                    <ToggleGroup.Item
                                        value="3"
                                        className={`w-8 h-8 rounded  ${
                                            weekDays.includes('3')
                                                ? 'bg-violet-500'
                                                : 'bg-zinc-900'
                                        }`}
                                    >
                                        Q
                                    </ToggleGroup.Item>
                                    <ToggleGroup.Item
                                        value="4"
                                        className={`w-8 h-8 rounded  ${
                                            weekDays.includes('4')
                                                ? 'bg-violet-500'
                                                : 'bg-zinc-900'
                                        }`}
                                    >
                                        Q
                                    </ToggleGroup.Item>
                                    <ToggleGroup.Item
                                        value="5"
                                        className={`w-8 h-8 rounded  ${
                                            weekDays.includes('5')
                                                ? 'bg-violet-500'
                                                : 'bg-zinc-900'
                                        }`}
                                    >
                                        S
                                    </ToggleGroup.Item>
                                    <ToggleGroup.Item
                                        value="6"
                                        className={`w-8 h-8 rounded   ${
                                            weekDays.includes('6')
                                                ? 'bg-violet-500'
                                                : 'bg-zinc-900'
                                        }`}
                                    >
                                        S
                                    </ToggleGroup.Item>
                                </ToggleGroup.Root>
                            </div>
                            <div className="flex flex-col gap-2 flex-1">
                                <label htmlFor="discord" className="block">
                                    Qual é o teu horário?
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    <Input
                                        id="hourStart"
                                        name="hourStart"
                                        type="time"
                                        placeholder="De"
                                    ></Input>
                                    <Input
                                        id="hourEnd"
                                        name="hourEnd"
                                        type="time"
                                        placeholder="Até"
                                    ></Input>
                                </div>
                            </div>
                        </div>

                        <label
                            className="mt-2 flex items-center gap-2 text-sm"
                            htmlFor="voiceChat"
                        >
                            <Checkbox.Root
                                className="w-6 h-6 p-1 rounded bg-zinc-900"
                                onCheckedChange={(checked) => {
                                    setUseVoiceChannel(checked ? true : false)
                                }}
                            >
                                <Checkbox.Indicator>
                                    <Check className="w-4 h-4 text-emerald-400" />
                                </Checkbox.Indicator>
                            </Checkbox.Root>
                            Usas voice chat?
                        </label>

                        <footer className="mt-4 flex justify-end gap-4">
                            <Dialog.Close className="bg-zinc-500 hover:bg-zinc-600 px-5 h-12 rounded-md font-semibold">
                                Cancelar
                            </Dialog.Close>
                            <button
                                type="submit"
                                className="bg-violet-500 hover:bg-violet-600 px-5 h-12 rounded-md font-semibold flex items-center gap-3"
                            >
                                <GameController size={24}></GameController>
                                Encontrar duo
                            </button>
                        </footer>
                    </form>
                </Dialog.Content>
            </Dialog.Overlay>
        </Dialog.Portal>
    )
}
