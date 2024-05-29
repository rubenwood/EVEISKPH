function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function waitUntil(condition) {
    return new Promise((resolve) => {
        let interval = setInterval(() => {
            if (!condition()) {
                return
            }

            clearInterval(interval)
            resolve()
        }, 100)
    })
}