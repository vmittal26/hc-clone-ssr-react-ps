export const getAPIURL = (pageNumber: number, pageSize: number = 30) => `
https://hn.algolia.com/api/v1/search?page=${pageNumber}&hitsPerPage=${pageSize}

`;
