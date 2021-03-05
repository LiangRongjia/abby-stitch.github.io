const baseUrl = 'https://liangrongjia.github.io/abby-stitch.github.io/db'

const MyPointsAPI = {
    fetchDB: () => fetch(`${baseUrl}/my-points.json`).then(response => response.json())
}

export default MyPointsAPI