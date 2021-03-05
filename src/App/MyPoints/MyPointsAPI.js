const baseUrl = 'http://localhost:3000'

const MyPointsAPI = {
    fetchDB: () => fetch(`${baseUrl}/db/my-points.json`).then(response => response.json())
}

export default MyPointsAPI