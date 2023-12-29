export const getFormattedDate = (date: string) => {
    return new Date(date).toLocaleDateString("ko", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    })
}