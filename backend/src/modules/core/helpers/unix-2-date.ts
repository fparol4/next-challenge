export const unix2Date = (unix: number) => {
    const parsed = Number(unix)
    return new Date(parsed * 1000)
}

export const date2Unix = (date: Date) => date.toISOString()