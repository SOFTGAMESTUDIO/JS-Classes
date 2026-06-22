function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data Loaded");
        }, 2000);
    });
}

async function getData() {
    const data = await fetchData();

    console.log(data);
    console.log("Success");
}

getData();