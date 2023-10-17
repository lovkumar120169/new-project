export const getTheDatafromApi = async () => {

    try {
        let data = await fetch('https://hoblist.com/api/movieList', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                category: "movies",
                language: "kannada",
                genre: "all",
                sort: "voting"
            })
        })
        return data.json();

    } catch (err) {
        console.log(err)
    }

}