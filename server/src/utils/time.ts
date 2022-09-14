export const convertTimeToMinutes = (hoursAmount: string) => {
    const [hours, minutes] = hoursAmount.split(':').map(Number)

    return hours * 60 + minutes
}

export const convertMinutesToTime = (minutesAmount: number) => {
    const hours = Math.floor(minutesAmount / 60)
    const minutes = minutesAmount % 60

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
        2,
        '0'
    )}`
}
