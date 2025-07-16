function getValueFromLine(lines, key) {
    const line = lines.find(line => line.trim().startsWith(key));
    if (line) {
        return line.split(': ')[1]?.trim() || '';
    }
    return '';
}

module.exports = { getValueFromLine };
