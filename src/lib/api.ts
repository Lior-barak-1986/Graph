export const fetchData = async () => {
    const res = await fetch('https://private-39ac1f-exercise16.apiary-mock.com/graph/data');
    const data = await res.json();
    return data;
}
