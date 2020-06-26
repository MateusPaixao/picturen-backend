const google = require('googleapis').google
const customSearch = google.customsearch('v1')

module.exports = {
    find: async (req, res) => {
        const { API_KEY: auth, SEARCH_ENGINE_ID: cx } = process.env
        const { word: q } = req.query

        const response = await customSearch.cse.list({
            auth, cx, q,
            searchType: 'image',
            // imgSize: 'huge',
            num: 10
        })

        const images = response.data.items.map((item) => {
            return item.link
        })
        
        return res.json({ images })
    }
}