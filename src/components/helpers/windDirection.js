const windDirection = (deg) => {
    if (deg >= 337.5 || deg < 22.5) return '↑';
    if (deg >= 22.5 && deg < 67.5) return '↗';
    if (deg >= 67.5 && deg < 112.5) return '→';
    if (deg >= 112.5 && deg < 157.5) return '↘';
    if (deg >= 157.5 && deg < 202.5) return '↓';
    if (deg >= 202.5 && deg < 247.5) return '↙';
    if (deg >= 247.5 && deg < 292.5) return '←';
    if (deg >= 292.5 && deg < 337.5) return '↖';
};
export default windDirection;
