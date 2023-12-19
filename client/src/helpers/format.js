export const formatPathname = (path) => {
    const pathSegments = path.split('/');
    return pathSegments[pathSegments.length - 1];
}