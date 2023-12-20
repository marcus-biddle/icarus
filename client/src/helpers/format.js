export const formatPathname = (path) => {
    const pathSegments = path.split('/');
    return pathSegments[pathSegments.length - 1];
}

export const formatEventType = (event) => {
    let formattedEvent = '';
    if (event === 'pushup') {
        formattedEvent = 'Push-ups'
    } else if (event === 'pullup') {
        formattedEvent = 'Pull-ups'
    } else if (event === 'running') {
        formattedEvent = 'Running'
    }

    return formattedEvent;
} 