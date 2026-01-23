class MarvelService{
    _apiBase = 'https://marvel-server-zeta.vercel.app'; //https://gateway.marvel.com:443/v1/public/
    _apiKey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df';

    getResource = async (url) => {
        let res = await fetch(url);
        
        if(!res.ok){
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}/characters?${this._apiKey}`);
        return res.data.results.map(this._transformCharacter)
    }

    //async and await are always working together

    getCharacter = async (id) => {
    try {
        const res = await this.getResource(`${this._apiBase}/characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    } catch (error) {
        console.error('Failed to fetch character:', error);
        return null;
    }
}

    _transformCharacter = (char) => {
        return  {
            name: char.name ? char.name : "Person name is undefined",
            description: char.description ? char.description : "Description is undefined",
            thumbnail: char.thumbnail 
            ? `${char.thumbnail.path}.${char.thumbnail.extension}` 
            : "https://nftcalendar.io/storage/uploads/2022/02/21/image-not-found_0221202211372462137974b6c1a.png",
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
}

export default MarvelService