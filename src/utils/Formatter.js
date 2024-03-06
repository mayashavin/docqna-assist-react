export const CSVToJSON = csv => {
    const lines = csv.split('\n');
    const keys = lines[0].split(',').map(i => i.trim());
    return lines.slice(1).map(line => {
        return line.split(',').reduce((acc, cur, i) => {
            const toAdd = {};
            toAdd[keys[i]] = cur;
            return { ...acc, ...toAdd };
        }, {});
    });
};
